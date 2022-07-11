'use strict';
import { unitTransformation } from '../../util/format/number';
import { transTableDateType } from '../../util/format/number';
import { getEditTitle } from '../../util/editTemplate/util';
import { transformText } from '../../locales/index';
import { formaDate } from '../../util/format/date';
import i18n from '@/plugin/i18n';

import html2canvas from 'html2canvas';

//格式化数据
export function setFormatFun(axisLabel, value, params) {
    if ((axisLabel instanceof Array) && axisLabel.length) {//数组
        return format_multiple(axisLabel, value, params);
    } else if (Object.prototype.toString.call(axisLabel) === '[object Object]') { //对象
        return getFormatValue(axisLabel, value)
    }
    return value;
}

//获取最大值 最小值
export function getMinOrMaxValue(value, format) {
    let type = format.type;
    if (type == "int") {
        value = transTableDateType(value, { type: "int", bit_number: 0 })
    } else if (type == "float") {
        value = transTableDateType(value, { type: "float", bit_number: 0 })
    } else if (type == "percent") {
    }
    return value;
}



function getFormatValue(axisLabel, value) {
    if (axisLabel.type == "string") {
        //字符串不做处理
        return value;
    } else if (axisLabel.type == "int" || axisLabel.type == "float" || axisLabel.type == "percent") {
        return transTableDateType(value, axisLabel);
    } else if (axisLabel.type == "unit") {
        //近位
        let unit = axisLabel.unit || "百万";
        return unitTransformation(value, unit, axisLabel.bit_number);
    } else if (axisLabel.type == "date") {
        //格式化日期
        let dateType = axisLabel.date_type || "month";
        // return formatChartDate(value, { dateType });
        return formaDate(value, { dateType });
    } else {
        //字符串不做处理
        return value;
    }
}

//多种格式化情况
//"formatBasis_key":"date_type",
//"formatBasis_value":"month",
function format_multiple(axisLabel, value, params) {
    try {
        let first_label = axisLabel[0];
        if (first_label && first_label.formatBasis_key) {
            let formatBasis_key = first_label["formatBasis_key"];
            let formatBasis_value = params[formatBasis_key];
            let obj = axisLabel.find(item => item.formatBasis_value == formatBasis_value);
            return getFormatValue(obj, value)
        } else {
            return getFormatValue(first_label, value)
        }
    } catch (error) {
        return value;
    }
}

//格式化 轴
export function formatData(axis, value, AJAXPARAM) {
    if (!axis) return value;
    if (axis.constructor === Object) {
        let label = axis.format ? axis.format : axis.axisLabel;
        return setFormatFun(label, value, AJAXPARAM)
    } else if (axis.constructor === Array) {
        try {
            let data_type = AJAXPARAM.date_type;
            let obj = axis.find((item) => {
                if (item.axisLabel) return item.axisLabel.type == data_type;
                else if (item.format) return item.format.type == data_type;
            });
            let label = obj.format ? obj.format : obj.axisLabel;
            return setFormatFun(label, value, AJAXPARAM)
        } catch (error) {
            console.log(error)
            return value;
        }
    }
}

//获取下载配置表头
export function getDownColumns(xAxis, xData, AJAXPARAM) {
    let columns = [];
    for (let i = 0, len = xData.length; i < len; i++) {
        let value = xData[i];
        columns.push({
            dataIndex: value,
            title: formatData(xAxis, value, AJAXPARAM)
        })
    }
    columns.unshift({
        dataIndex: "index",
        title: i18n.format("指标")
    })
    return columns;
}

//获取下载配置表头
export function getDownDataSource($this, legend, series, AJAXPARAM) {
    const { templateData, controlledElement } = $this.props;
    let { yAxis } = $this.props
    if (!yAxis) yAxis = templateData.yAxis
    let dataSource = [];
    for (let i = 0, len = series.length; i < len; i++) {
        let arr = series[i];
        let index = templateData.titleOption && legend.length == 1 ? getEditTitle(controlledElement, templateData.titleOption) : (legend.length == 1 ? templateData.title : null);
        let obj = { "index": index ? index : legend[i] };
        for (let c = 0, c_len = arr.length; c < c_len; c++) {
            let temp = arr[c];
            let yAxisFormat = yAxis.constructor === Array ? yAxis[i] : yAxis;
            obj[temp[0]] = formatData(yAxisFormat, temp[1], AJAXPARAM)
        }
        dataSource.push(obj);
    }
    return dataSource;
}

//获取图表下载数据
export function getDownloadData(AJAXPARAM) {
    const { chartData } = this.state;
    const { xAxis, templateData, title, controlledElement } = this.props;
    if (!chartData) return;
    let legend = chartData.legend,
        xData = chartData.xData,
        series = chartData.series;
    let fileName = "";
    if (templateData.titleOption) fileName = getEditTitle(controlledElement, templateData.titleOption)
    else if (title) fileName = i18n.format(title);

    let columns = getDownColumns(xAxis, xData, AJAXPARAM),
        dataSource = getDownDataSource(this, legend, series, AJAXPARAM);

    return {
        title: fileName,
        columns,
        dataSource
    };
}

//
export function getDownloadTitle() {
    let { controlledElement, templateData, title } = this.props;
    let text = "";
    if (templateData.titleOption) text = getEditTitle(controlledElement, templateData.titleOption)
    else if (title) text = i18n.format(title);
    return text;
}

export const chartTheme = {
    default: ["#0454B3", "#00C5C4", "#FFAE00", "#B773F4", "#ADD842", "#4476B2", "#E8C104", "#76B5FF", "#DC6EB1", "#FF9326", "#7F94EF", "#97B0BA", "#C39BE7", "#67E3E2", "#44A0E4", "#E39E7F", "#3E52B2", "#EA7181", "#80B594", "#D14E9A"],
    bar: ["#0454B3", "#00C5C4", "#FFAE00", "#B773F4", "#ADD842", "#4476B2", "#E8C104", "#76B5FF", "#DC6EB1", "#FF9326", "#7F94EF", "#97B0BA", "#C39BE7", "#67E3E2", "#44A0E4", "#E39E7F", "#3E52B2", "#EA7181", "#80B594", "#D14E9A"],
    stack: ["#0454B3", "#00C5C4", "#FFAE00", "#B773F4", "#ADD842", "#4476B2", "#E8C104", "#76B5FF", "#DC6EB1", "#FF9326", "#7F94EF", "#97B0BA", "#C39BE7", "#67E3E2", "#44A0E4", "#E39E7F", "#3E52B2", "#EA7181", "#80B594", "#D14E9A"],
    line: ["#0454B3", "#00C5C4", "#FFAE00", "#B773F4", "#ADD842", "#4476B2", "#E8C104", "#76B5FF", "#DC6EB1", "#FF9326", "#7F94EF", "#97B0BA", "#C39BE7", "#67E3E2", "#44A0E4", "#E39E7F", "#3E52B2", "#EA7181", "#80B594", "#D14E9A"],
    mix: ["#0454B3", "#00C5C4", "#FFAE00", "#B773F4", "#ADD842", "#4476B2", "#E8C104", "#76B5FF", "#DC6EB1", "#FF9326", "#7F94EF", "#97B0BA", "#C39BE7", "#67E3E2", "#44A0E4", "#E39E7F", "#3E52B2", "#EA7181", "#80B594", "#D14E9A"]
}

export const getChartColor = (type) => {
    return chartTheme[type] || chartTheme['default']
}


export const download = (url, filename = '') => {
    if (url) {
        let eleLink = document.createElement('a');
        eleLink.download = filename || url;
        eleLink.style.display = 'none';
        eleLink.href = encodeURI(url);
        document.body.appendChild(eleLink);
        eleLink.click();
        document.body.removeChild(eleLink);
    }
}

export const elemetExportImage = (element, filename) => {
    return new Promise((resolve, reject) => {
        html2canvas(element).then(function (canvas) {
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            download(imgData, filename)
            resolve(imgData);
        });
    })
}