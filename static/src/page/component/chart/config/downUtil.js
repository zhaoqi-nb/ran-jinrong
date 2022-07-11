import { getEditTitle } from '../../util/editTemplate/util'
import { formatData } from '../common/util'
import { uniqBy, isEqual, groupBy } from 'lodash';
import i18n from '@/plugin/i18n'

export function getDownloadData(chartData, AJAXPARAM, otherParam) {
    const { templateData, title, controlledElement } = otherParam
    console.log('d11111=>', chartData, AJAXPARAM, otherParam)
    const { xAxis, yAxis } = templateData
    if (!chartData) return;
    let legend = chartData.legend,
        xData = chartData.xData,
        series = chartData.series,
        formatArr = chartData.formatArr,
        zbNames = chartData.zbNames,
        zb_code = chartData.zb_code;

    let fileName = "";
    if (templateData.titleOption) fileName = getEditTitle(controlledElement, templateData.titleOption, zb_code)
    else if (title) fileName = title;

    // let columnList = getDownColumnsNew(xAxis, xData, AJAXPARAM, formatArr),
    //     dataSource = getDownDataSource(legend, series, AJAXPARAM, { yAxis, templateData, controlledElement }, formatArr);
    // debugger;
    const excelData = getTableData({ templateData, xAxis, legend, zbNames, xData, series, AJAXPARAM, series, formatArr, otherParam: { yAxis, templateData, controlledElement } })
    return {
        title: fileName,
        excelData
    };
}

function convertTable(data, category = '分类') {
    let newColumns = [];
    let newDataSource = [];
    const columns = data?.columns;

    const dataSourceResult = data.dataSource[0];
    newColumns.push({
        "dataIndex": "category",
        "title": category
    })
    if (Array.isArray(columns) && columns.length > 0) {
        newColumns.push({
            dataIndex: 'index',
            title: dataSourceResult['index']
        });
    }

    for (var i = 1; i < columns.length; i++) {
        const item = columns[i];
        newDataSource.push({
            index: dataSourceResult[item['dataIndex']],
            category: item['dataIndex'],
        })
    }

    return { columns: newColumns, dataSource: newDataSource };
}

function isMultipleFun(formatArr) {

    const isArr = Array.isArray(formatArr);
    if (!isArr) {
        return false;
    }
    const groupMap = groupBy(formatArr, 'name') || {};
    return Object.keys(groupMap).length >= 2;
}

function getTableData({ xAxis, legend, zbNames, xData, AJAXPARAM, series, formatArr, otherParam }) {
    let result = [];
    // const isMultiple = Array.isArray(formatArr) && formatArr?.[0]?.detail_code; // 是否是双轴数据
    const isMultiple = isMultipleFun(formatArr);
    let splitCount = 1;
    let splitData = null;

    let isCategory = false;

    if (isMultiple) {
        splitData = uniqBy(formatArr, 'name');
        splitCount = splitData.length || 1;
    } else {
        // console.log('======>',legend, zbNames)
        // 修复财报对比的下载bug，财报对比 9454
        const isFinancialReportZbNames = zbNames && zbNames.find(f => f !== null);
        if (isFinancialReportZbNames) {
            isCategory = !isEqual(legend, zbNames);
        }

    }

    if (splitCount === 1) {
        let cData = {
            columns: getDownColumns(otherParam, xAxis, xData, AJAXPARAM, isMultiple, isCategory),
            dataSource: getDownDataSource(zbNames, legend, series, AJAXPARAM, otherParam, formatArr, isMultiple, null, isCategory)
        };
        if (otherParam.templateData && otherParam.templateData.type === 'bar' && otherParam.templateData.isHorizontal) {
            cData = convertTable(cData, i18n.format(otherParam.templateData.excelDownCategory || '类别'))
        }
        result.push(cData)
    } else {
        for (var i = 0; i < splitCount; i++) {
            const currResult = {};
            currResult.columns = getDownColumns(otherParam, xAxis, xData, AJAXPARAM, isMultiple),
                currResult.dataSource = getDownDataSource(zbNames, legend, series, AJAXPARAM, otherParam, formatArr, isMultiple, splitData[i].name, isCategory)
            result.push(currResult);
        }
    }


    return result;

}

//获取下载配置表头column
function getDownColumns(otherParam, xAxis, xData, AJAXPARAM, isMultiple, isCategory) {

    const { templateData } = otherParam;;
    let columns = [];
    for (let i = 0, len = xData ? xData.length : 0; i < len; i++) {
        let value = xData[i];
        columns.push({
            dataIndex: value,
            title: formatData(xAxis, value, AJAXPARAM)
        })
    }
    if (isMultiple || isCategory) {
        columns.unshift({
            dataIndex: "category",
            title: i18n.format(templateData.excelDownCategory || '类别')
        })
    }
    if (templateData.type === 'bar' && templateData.isHorizontal) {
        columns = columns.reverse();
    }
    columns.unshift({
        dataIndex: "index",
        title: i18n.format('指标')
    })
    return columns;
}

function getIndexByName(formatArr, name) {
    const idx = [];
    for (let i = 0; i < formatArr.length; i++) {
        const curr = formatArr[i];
        if (curr.name === name) {
            idx.push(i);
        }

    }

    return idx;
}

//获取下载dataSource
function getDownDataSource(zbNames, legend, series, AJAXPARAM, otherParam, formatArr, isMultiple, name, isCategory) {
    const { yAxis, templateData, controlledElement } = otherParam;
    let dataSource = [];

    let idx = null;
    if (isMultiple) {
        idx = getIndexByName(formatArr, name);
    }
    for (let i = 0, len = series ? series.length : 0; i < len; i++) {
        if (idx && idx.indexOf(i) === -1) {
            continue;
        }
        let arr = series[i];
        let index = false;
        // TODO 子行业对比内容获取title有问题，去掉
        // let index = templateData.titleOption && legend.length == 1 ? getEditTitle(controlledElement, templateData.titleOption) : (legend.length == 1 ? templateData.title : null);
        let obj = { "index": index ? index : zbNames[i] || legend[i] };
        if (isMultiple || isCategory) {
            obj['category'] = formatArr[i].detail_code || legend[i];
        }
        for (let c = 0, c_len = arr.length; c < c_len; c++) {
            let temp = arr[c];
            // 适配子行业对比
            if (Object.prototype.toString.call(temp) === '[object Object]') {
                temp = temp.value;
            }
            let yAxisFormat = yAxis.constructor === Array ? yAxis.find(item => item.name === zbNames[i]) : yAxis;
            obj[temp[0]] = formatData(yAxisFormat, temp[1], AJAXPARAM)
        }
        dataSource.push(obj);
    }
    return dataSource;
}