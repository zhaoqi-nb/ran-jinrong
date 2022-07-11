'use strict';
import { unitTransformation, transTableDateType} from '../../util/format/number';
import { formaDate } from '../../util/format/date';
// import { transformText } from '../../locales/index';
import { i18n } from '@/components/FastIntl';
import _ from 'lodash';

//格式化数据
export function setFormatFun(axisLabel, value, params) {
    if ((axisLabel instanceof Array) && axisLabel.length) {//数组
        return format_multiple(axisLabel, value, params);
    } else if (Object.prototype.toString.call(axisLabel) === '[object Object]') { //对象
        return getFormatValue(axisLabel, value)
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
    } else if (axisLabel.type == "t_unit" || axisLabel.type == "_unit") {
        let unit = axisLabel.unit || "万";
        return unitTransformation(value, unit, axisLabel.bit_number);
    } else if (axisLabel.type == "date") {
        //格式化日期
        let dateType = axisLabel.date_type || "month";
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
function formatData(axis, value, config) {
    if (!axis) return value;
    if (axis.constructor === Object) {
        let label = axis.format ? axis.format : axis.axisLabel;
        return setFormatFun(label, value, config)
    } else if (axis.constructor === Array) {
        try {
            let data_type = config.date_type;
            let obj = axis.find((item) => {
                if (item.axisLabel) return item.axisLabel.type == data_type;
                else if (item.format) return item.format.type == data_type;
            });
            let label = obj.format ? obj.format : obj.axisLabel;
            return setFormatFun(label, value, config)
        } catch (error) {
            console.log(error)
            return value;
        }
    }
}

//获取下载配置表头
function getColumns(xData, config) {
    const { xAxis } = config;
    let columns = [];
    for (let i = 0, len = xData.length; i < len; i++) {
        let value = xData[i];
        columns.push({
            dataIndex: value,
            title: formatData(xAxis, value, config)
        })
    }
    columns.unshift({
        dataIndex: "index",
        title: i18n.format("指标")
    })
    return columns;
}


function getRowData(yAxisFormat, data, config) {
    let row = {};
    for (let i = 0, len = data.length; i < len; i++) {
        let temp = data[i];
        row[temp[0]] = formatData(yAxisFormat, temp[1], config)
    }
    return row;
}

//获取下载配置表头
function getDataSource(legend, series, config, option) {
    const { yAxis } = config;
    let dataSource = [];
    //单条线
    if (legend && legend.length == 1 && yAxis) {
        let yAxisFormat = yAxis.constructor === Array ? yAxis[0] : yAxis;
        let temp = getRowData(yAxisFormat, series[0], config);
        let obj = { "index": _.get(option,'yAxis.name') || legend[0], ...temp };
        dataSource.push(obj)
    }
    //多条线
    else if (legend && legend.length > 1 && yAxis) {
        for (let i = 0, len = series.length; i < len; i++) {
            let arr = series[i];
            let yAxisFormat = yAxis.constructor === Array ? yAxis[i] : yAxis;
            //多条曲线
            let temp = getRowData(yAxisFormat, arr, config);
            let obj = { "index": legend[i], ...temp };
            dataSource.push(obj);
        }
    }
    return dataSource;
}

//获取图表下载数据
/*
* chartData => {legend, xData, series}
* config    => { yAxis}
*/
function getDownloadData(chartData, config, title, option = {}) {
    let columns = [],
        dataSource = [];

    if (chartData) {
        try {
            let legend = chartData.legend,
                xData = chartData.xData,
                series = chartData.series;

            columns = getColumns(xData, config),
                dataSource = getDataSource(legend, series, config, option);
        } catch (error) {
            console.log(error);
        }
    }

    return {
        columns,
        dataSource,
        excelData: [{
            columns,
            dataSource
        }],
        title
    }
}

export { getDownloadData }