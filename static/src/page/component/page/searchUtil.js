import { getAccessState } from '../util/template';
import Api from './store/api';
import i18n from '@/plugin/i18n';
import { consumeCompareList, tmtCompareList } from '../../../page/companyAnalysis/config';
import { getPageData, getSubMenuData } from './util';
import { setGuideData, isCompanyAddress } from '../../../utils/guideData';
import _ from 'lodash';
import { isLoginInto } from '@/utils/Util';
let searchCompanyData = [];
let searchIndustryData = [];

function handleData(res, type) {
    const list = [];
    if (res.code === 200) {
        const data = (res.data && res.data.data) || res.data;
        if (!data) {
            return list;
        }
        for (let i = 0, len = data.length; i < len; i++) {
            let item = data[i];
            let accessState = getAccessState(item.privilegeDtoList) || {};
            item.resAttrJSON = JSON.parse(item.resAttr);
            if (type === 'company') {
                item.href = `/page/company/${item.resId}`;
                item.globalDisplayName = `${i18n.format('公司')}：${i18n.format(item.resName)}(${i18n.format(item.resAttrJSON?.stock_code)})`;
                item.globalPageDisplayName = `${i18n.format(item.resName)}(${i18n.format(item.resAttrJSON?.stock_code)})`;
            } else {
                item.href = `/page/industry/${item.resId}`;
                item.globalDisplayName = `${i18n.format('行业')}：${i18n.format(item.resName)}`;
                item.globalPageDisplayName = `${i18n.format(item.resName)}`;
            }
            // console.log(' accessState.code',  accessState.code, !_.includes(['all', 'view'], accessState.code) , item.resName)
            const disabled = !_.includes(['all', 'view'], accessState.code)//item.accessState.code == 'all' || item.accessState.code == 'view'
            const isHidden = _.includes(['noView'], accessState.code) || (!accessState?.code) ? true : false;
            item.disabled = disabled;
            if ((type === 'industry' && accessState.code != 'all') || isHidden) {
                continue;
            }
            item.accessState = accessState;
            list.push(item);
        }
    }
    return list;
}

function sortList(list, currData) {
    if (!currData) {
        return list;
    }
    const resObj = JSON.parse(currData.resAttr) || {}
    const industry = i18n.format(resObj.industry)
    const index = list.findIndex(item => item.code ==industry);
    if (index != -1) {
        const remove = list.splice(index, 1);
        list.unshift(...remove);
    }
    return list;
}

function sortByIndustry(data, industry_label, currData, stockData) {
    let result = _.chain(data)
        .map(item => {
            const resObj = JSON.parse(item.resAttr) || {}

            resObj.industry = i18n.format(resObj.industry)

            return {
                ...item,
                stock_code: resObj?.stock_code || null,
                resObj: { ...resObj, featureModule: resObj.featureModule || "" },
            }
        })
        .groupBy(item => item.resObj.industry)
        .value()


    

    let orderIndustrys = industry_label === "消费"
        ? sortList(consumeCompareList(), currData)
        : sortList(tmtCompareList(), currData)

   
    // 行业排序
    result = _.chain(orderIndustrys)
        .map(item => {
            // console.log('orderIndustrys=>', orderIndustrys, result[item.code]);
            // debugger;
            const stockDataResult ={};
            if (stockData && stockData.data) {
                Object.keys(stockData.data).forEach(item => {
                    stockDataResult[i18n.format(item)] = stockData.data[item];
                })
            }

            const currStockResult = stockDataResult[item.code];
            const currResult = result[item.code];
            const currResultMap = {};
            // Array.isArray(currResult) && currResult.forEach(item => {
            //     currResultMap[item.resName] = item;
            // })
             let newResult = []
             let remainList = []
            // currStockResult?.forEach(item => {
            //     if (currResultMap[item.stock_name]) {
            //         newResult.push(currResultMap[item.stock_name])
            //     }
            //     // currResult.find(item.stock_name === resName)
            // })
            newResult = _.chain(currStockResult)
            .map((item) => {
                const targetObj = _.find(currResult, {"resName": i18n.format(item.stock_name), "stock_code": item.stock_code});
                return targetObj;
            }).compact().value();

            remainList = _.difference(currResult, newResult);
            newResult = _.uniqWith([...newResult,...remainList], _.isEqual)
            return newResult;
        })
        .compact()
        .flatten()
        .value()

    return result;
}

function handelBrandOrPlatformCompany(companyListData, companyBrand, type) {
    let result = [];
    for (const item of companyListData) {
        const stock_code = item.resAttrJSON?.stock_code;
        const brands = (type === '品牌' ? companyBrand[stock_code] : companyBrand[item.resName]) || [];
        result.push(item);
        for (const brand of brands) {
            let cloneItem =  _.cloneDeep(item);
            cloneItem.searchPrefix = i18n.format(type);
            cloneItem.searchValue = brand;
            result.push(cloneItem);
        }
    }
    return result;
}

function handleChildIndustryData(industryData, industryDataSearch) {
    let result = [];
    const industrySearchDataMap = {};
    for (const item in industryDataSearch) {
        const industryList = industryDataSearch[item]; // .[0]?.p;

        for (const industry of industryList) {
            const firstIndustry = industry.p;
            if (industrySearchDataMap[firstIndustry]) {
                industrySearchDataMap[firstIndustry].push(industry.f);
            } else {
                industrySearchDataMap[firstIndustry] = [industry.f];
            }
        }
        
    }

    for (const item of industryData) {
        result.push(item);
        for (const childItem of (industrySearchDataMap[item.resName] || [])) {
            let cloneItem =  _.cloneDeep(item);
            cloneItem.searchPrefix = '-';
            cloneItem.searchValue = childItem[childItem.length-1];
            cloneItem.searchItem = childItem.splice(1, childItem.length);
            result.push(cloneItem);
        }
    }
    return result;
}

async function getSearchMappingList() {
    const isLogin = isLoginInto();
    const currData = localStorage.getItem('global-search-map-list');
    if (isLogin || !currData) {
        const mapList = await Api.querySearchMapList();
        localStorage.setItem('global-search-map-list', JSON.stringify(mapList));
        return mapList;;
    } else {
        try {
            return JSON.parse(currData);
        } catch (error) {
            
        }
       
    }
}

let isLoad = false;

async function getSearchData() {
    isLoad = true;
    const param = {
        resAttr: JSON.stringify({ industry_label: '消费' }),
    }
    const tmtParam = {
        resAttr: JSON.stringify({ industry_label: 'TMT' }),
    }
    let companyList = Api.queryResDtoListByAttr(param); // 消费版的企业 
    let companyTMTList = Api.queryResDtoListByAttr(tmtParam); // 科技版的企业

    let industryList = Api.queryIndustryDtoListByAttr({
        resAttr: JSON.stringify({ industry_label: '消费' }),
    });

    let companyStockSortList = Api.queryStockSortListByAttr({
        industry_label: '消费',
    })

    let industryStockList = Api.queryStockSortListByAttr({
        industry_label: 'TMT',
    })

    

    let searchMapList = getSearchMappingList();

    const companyTMTListRequest =  await Api.queryResDtoListByAttr(tmtParam)
    const companyDataList = handleData(companyTMTListRequest, 'company');
    
    if (isCompanyAddress()) {
        if (companyDataList.length > 0) {
            setGuideData('company', [{name: '消费', path: '.company-analysis-head .ant-tabs-tab', index: 0}, {name: 'TMT', path: '.company-analysis-head .ant-tabs-tab', index: 1}]);
        } else {
            setGuideData('company', [{name: '消费', path: '.company-analysis-head .ant-tabs-tab', index: 0}]);
        }
    }

    const res = await Promise.all([companyList, Promise.resolve('success'), industryList, companyStockSortList, industryStockList, searchMapList]);
    const currData = getSubMenuData();
    // console.log('qiao=>subMenuData', currData, res);
    const currResAttr = (currData && currData.resAttr) ? JSON.parse(currData.resAttr) : null;

    const companyStockSortListData = res[3];
    const industryStockListData = res[4];

    let companyListData = sortByIndustry(handleData(res[0], 'company'), '消费', currData, companyStockSortListData);

  
    let companyTMTListData = sortByIndustry(companyDataList, 'TMT', currData, industryStockListData);

    // 公司根据品牌搜索，TMT可以根据平台搜素
    let searchMapData = res[5]?.data;
    companyListData =  handelBrandOrPlatformCompany(companyListData, searchMapData?.[1], '品牌');
    companyTMTListData =  handelBrandOrPlatformCompany(companyTMTListData, searchMapData?.[2], '平台');
    
    if (currResAttr && currResAttr.industry_label === 'TMT') {
        searchCompanyData = [].concat(companyTMTListData).concat(companyListData);
    } else {
        searchCompanyData = [].concat(companyListData).concat(companyTMTListData);
    }
    searchIndustryData = handleData(res[2], 'industry');
    console.log('searchIndustryData=>', searchIndustryData);
    //根据行业下的耳机行业做匹配
    searchIndustryData = handleChildIndustryData(searchIndustryData, searchMapData?.[3]);

}

async function getSearchCompanyData() {
    if (searchCompanyData.length > 0) {
        return searchCompanyData;
    }
    if (isLoad) {
        await new Promise((resolve, reject) => { setTimeout(() => { resolve() }, 500); });
        return getSearchCompanyData();
    }
    await getSearchData();
    return searchCompanyData;

}

async function getSearchIndustryData() {
    return searchIndustryData
}


export { getSearchData, getSearchCompanyData, getSearchIndustryData }
