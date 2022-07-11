import downLoadExcelFactory, {DownloadExcel} from './excelUtil';
import { i18n } from '@/components/FastIntl';
import Server from '../../../../plugin/Server';
import { getFilterInfo } from './filterUtil';
import {getPageId} from '@/utils/Util';
import { notification } from 'antd';
import _ from 'lodash';
import { getUserInfoData } from '@/page/component/page/util';
import { getMenuPathByKeys } from '@/utils/primaryMarketUtil';


function getDownloadDataType(config) {

    if (config.dataType == "table") {
        if (config.ifComplexTable) return DownloadExcel.dataType.complexTable;
        return DownloadExcel.dataType.normalTable
    } else if(config.dataType == "chart") {
        return DownloadExcel.dataType.chart;
    }
}

export function downLoad(excelData, fileName, config, indicatorData, sheetName = i18n.format('数据')) {
    const dataType = getDownloadDataType(config);

    console.log('excelData=>', excelData, config)

    downLoadExcelFactory({
        data: excelData,
        sheetName,
        downFileName: fileName,
        dataConfig: {
            dataType
        },
        indicatorData
    })
}

function getUseId() {
    const userInfo = getUserInfoData();
    const userId = userInfo.sysUserId;
    return userId;
}

export async function downloadBackEnd({download_type, type, ...otherParams}) {
     const filterInfo = getFilterInfo();
     const pageId = getPageId();

    // const screen_params = {};
    // console.log('filterInfo=>', filterInfo);
    // filterInfo.forEach(item => {
    //     screen_params[item.title] = item.value
    // })

     const params = {
        download_type,
        ...otherParams,
        screen_params: filterInfo,
        root_instantiation_id: pageId,
        operatorId: getUseId(),
     };
  
    let url = '';
    if (type === 'list') {
        url = '/api/batchDownload/batchDownloadList';
    } else if (type === 'detail') {
        url = '/api/batchDownload/downloadDetail';
    }
    // if (type === 'list') {
    //     download(encodeURI(url));
    //     return;
    // }
    
    new Server().Http({
        url,
        type: "GET",
        data: {
            params: JSON.stringify(params)
        }
    })
    openNotification();
}


export async function downloadBrandBackEnd({download_type, screen_condition_name, type, ...otherParams}) {
    let filterInfo = getFilterInfo(true);
    const pageId = getPageId();
//    const screen_params = {};
   filterInfo.forEach(item => {
       item.title = item.title.replace('：', '');
   })

   filterInfo =  filterInfo.filter(item => item.title != i18n.format('行业'))

    const params = {
       download_type,
       ...otherParams,
       screen_params: filterInfo,
       root_instantiation_id: pageId,
       operatorId: getUseId(),
    };

    if (otherParams.industry_list && otherParams.industry_list.length > 0) {
       params.screen_condition_name = i18n.format('行业')
    }
 
   let url = '';
   url = '/api/batchDownload/downloadBoardIndustry';
    new Server().Http({
        url,
        type: "GET",
        data: {
            params: JSON.stringify(params)
        }
    })
    openNotification();
}

const openNotification = () => {
    const url = getMenuPathByKeys(['工作台', '我的下载'])
    notification.info({
      message: i18n.format(`下载任务已完成`),
      description: <span>{i18n.format('请前往')}<a target="_blank" href={url}>{i18n.format('工作台-我的下载')}</a>{i18n.format('查看')}</span>,
      placement: 'bottomRight',
    });
};

function download(url) {
    const a = document.createElement('a');
    // a. = 'demo.xlsx';
    a.href = url;
    a.click();
}
/**
 * TODO 需要合并单元格的
 * http://local.test.inc:7019/page/board/9793/9789/636
 */