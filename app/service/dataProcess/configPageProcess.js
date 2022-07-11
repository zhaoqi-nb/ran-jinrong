/*
 * @FileDescription    : 文件描述  
 * @Author             : baoping.chen@fengjr.com
 * @Date               : 2018-10-08 15:56:56 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-09-Th 10:17:47
 */

'use strict';

const BaseProcess = require('./baseProcess');
const uuidV1 = require('uuid/v1');

/**
 *  配置化页面数据转换方法
 */
class ConfigPageProcess extends BaseProcess {

    //process simple table data
    processSimpleTableData(data, mapping, params) {
        if (!data) return;
        let language = params.language || "zh_CN";
        let columns = [],
            dataSource = [];

        let header = data.header || [],
            list = data.list || data.rsList || [],
            pages = data.pages;

        //loop header
        for (let i = 0, len = header.length; i < len; i++) {
            let obj = header[i],
                name = obj.name,
                header_combine = obj.header_combine,
                key = obj.key;

            let param = {
                title: name,
                dataIndex: key,
            };

            if (header_combine) param["header_combine"] = header_combine;

            let format = null;
            if (mapping[key]) format = mapping[key];
            else if (mapping["other"]) {
                let tempOther = mapping["other"];
                if (tempOther.type == "date" && !tempOther.dateType && params && params.date_type) {
                    format = { dateType: params.date_type, type: 'date', columnStyle: mapping["other"]["columnStyle"] }
                } else format = tempOther;
            }

            //格式化数据
            if (format) {
                param["title"] = this.transTableDateType(obj.name, format, language);
                if (format.columnStyle) param = { ...param, ...format.columnStyle }
                if (format.sorter) param["sorter"] = format.sorter;
                if (format.defaultSortOrder) param["defaultSortOrder"] = format.defaultSortOrder;
            }
            columns.push(param);
        }

        let index = 1;
        const loop = (datas, treeLevel = 1, parentTitle = []) => {
            let arr = [];
            for (let i = 0, len = datas.length; i < len; i++) {
                let item = datas[i],
                    children = item.children,
                    //所有父及祖先的title   parentTitle
                    newParentTitle = [...parentTitle],
                    //序号列
                    obj = { index: index++, key: uuidV1(), treeLevel, parentTitle: [...parentTitle] };

                try {
                    for (let key in item) {
                        let value = item[key];
                        if (key == "title" && children && children.length) {
                            newParentTitle.push(value)
                        }
                        if (key == "children" && (!children || !children.length) && (!params || !params.ifAsyncExpanded)) continue;
                        obj[key] = value;
                    }

                } catch (error) {
                    console.log(error)
                }
                if (children && children.length) obj.children = loop(children, treeLevel + 1, newParentTitle);
                arr.push(obj);
            }
            return arr;
        }

        //表格数据
        dataSource = loop(list);

        return {
            columns,
            dataSource,
            pages
        }
    }

    //复杂表头
    processComplexHeaderTableData(data, mapping, params) {
        if (!data) return;
        let dataSource = [];
        let language = params.language || "zh_CN";

        let header = data.header || [],
            headerKeys = [],
            list = data.list || [],
            pages = data.pages;


        const setColumns = (data) => {
            let columns = [];

            let setTd = (obj) => {
                let title = obj.name;
                let key = title;
                let param = {
                    title,
                    dataIndex: key,
                    align: "center"
                }


                let format = null;
                if (mapping[obj.key]) format = mapping[obj.key];
                else if (mapping["other"]) {
                    let tempOther = mapping["other"];
                    if (tempOther.type == "date" && !tempOther.dateType && params && params.date_type) {
                        format = { dateType: params.date_type, type: 'date', columnStyle: mapping["other"]["columnStyle"] }
                    } else format = tempOther;
                }

                //格式化数据
                if (format) {
                    param["title"] = this.transTableDateType(obj.name, format, language);
                    if (format.columnStyle) param = { ...param, ...format.columnStyle }
                    if (format.sorter) param["sorter"] = format.sorter;
                    if (format.defaultSortOrder) param["defaultSortOrder"] = format.defaultSortOrder;
                }
                return param;
            }


            let setChildren = (td, obj) => {
                if (td && td.children) {
                    setChildren(td.children[0], obj)
                } else if (td) {
                    td["children"] = [setTd(obj)]
                }
                return td;
            }
            let setValue = (tr) => {
                for (let i = 0, len = tr.length; i < len; i++) {
                    let obj = tr[i];
                    let key = obj.name;
                    headerKeys[i] = key;
                    if (columns[i]) {
                        let temp = columns[i];
                        if (temp.dataIndex != key) {
                            columns[i] = setChildren(temp, obj);
                        }
                    } else columns.push(setTd(obj))
                }
            }

            for (let i = 0, len = data.length; i < len; i++) {
                let arr = data[i];
                setValue(arr)
            }
            return columns;
        }
        //循环表头
        let columns = setColumns(header)

        let index = 1;
        const loop = (datas, treeLevel = 1) => {
            let obj = { index: index++, treeLevel },
                operate = {};
            for (let i = 0, len = datas.length; i < len; i++) {
                let item = datas[i];
                let code = headerKeys[i];
                obj[code] = item.name;
                operate[code] = item.operate;
            }
            obj["operate_multiple"] = operate;
            return obj;
        }

        //循环数据
        for (let i = 0, len = list.length; i < len; i++) {
            let arr = list[i];
            let temp = loop(arr);
            dataSource.push(temp);
        }

        return {
            columns,
            dataSource,
            pages
        }
    }

    //复杂表头
    processComplexHeaderTableDataTree(data, mapping, params) {
        if (!data) return;
        let dataSource = [];
        let language = params.language || "zh_CN";

        let header = data.header || [],
            headerKeys = [],
            list = data.list || [],
            pages = data.pages;


        const setColumns = (data) => {
            let columns = [];

            let setTd = (obj) => {
                let title = obj.name;
                let key = title;
                let param = {
                    title,
                    dataIndex: key,
                    align: "center"
                }

                let format = null;
                if (mapping[obj.key]) format = mapping[obj.key];
                else if (mapping["other"]) {
                    let tempOther = mapping["other"];
                    if (tempOther.type == "date" && !tempOther.dateType && params && params.date_type) {
                        format = { dateType: params.date_type, type: 'date', columnStyle: mapping["other"]["columnStyle"] }
                    } else format = tempOther;
                }

                //格式化数据
                if (format) {
                    param["title"] = this.transTableDateType(obj.name, format, language);
                    if (format.columnStyle) param = { ...param, ...format.columnStyle }
                    if (format.sorter) param["sorter"] = format.sorter;
                    if (format.defaultSortOrder) param["defaultSortOrder"] = format.defaultSortOrder;
                }
                return param;
            }

            let setChildren = (td, obj) => {
                if (td && td.children) {
                    setChildren(td.children[0], obj)
                } else if (td) {
                    td["children"] = [setTd(obj)]
                }
                return td;
            }

            let setValue = (tr) => {
                for (let i = 0, len = tr.length; i < len; i++) {
                    let obj = tr[i];
                    let key = obj.name;
                    headerKeys[i] = key;
                    if (columns[i]) {
                        let temp = columns[i];
                        if (temp.dataIndex != key) {
                            columns[i] = setChildren(temp, obj);
                        }
                    } else columns.push(setTd(obj))
                }
            }

            for (let i = 0, len = data.length; i < len; i++) {
                let arr = data[i];
                setValue(arr)
            }
            return columns;
        }
        //循环表头
        let columns = setColumns(header)

        let index = 1;
        const loop = (datas, treeLevel = 1, parentTitle = []) => {
            let arr = [];
            for (let i = 0, len = datas.length; i < len; i++) {
                let item = datas[i],
                    children = item.children,
                    //所有父及祖先的title   parentTitle
                    newParentTitle = [...parentTitle],
                    //序号列
                    obj = { index: index++, treeLevel, parentTitle: [...parentTitle] };

                try {
                    for (let key in item) {
                        let value = item[key];
                        if (key == "title" && children && children.length) {
                            newParentTitle.push(value)
                        }
                        if (key == "children" && (!children || !children.length) && (!params || !params.ifAsyncExpanded)) continue;
                        obj[key] = value;
                    }

                } catch (error) {
                    console.log(error)
                }
                if (children && children.length) obj.children = loop(children, treeLevel + 1, newParentTitle);
                arr.push(obj);
            }
            return arr;
        }

        //表格数据
        dataSource = loop(list);

        return {
            columns,
            dataSource,
            pages
        }
    }

    isNotANumber(text) {
        if (!text) return false;
        let prefix = text.substring(0, 4);
        if (/^[0-9]+$/.test(prefix)) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * 曲线图转换，适合多条曲线
     * @param {*} data 
     * 
     * 适用例子
     * { 
        *  电脑、办公: {
                201901: 0.23,
                201902: 0.22,
                201903: 0.24
            },
            数码: {
                201901: 0.32,
                201902: 0.34,
                201903: 0.35
            }
        }
     */
    getTransformObjectData(data, markPoint = {}) {
        if (!data) return;
        let legend = [],
            xData = [],
            series = [];

        try {
            let tempKeys = Object.getOwnPropertyNames(data);
            for (let i = 0, len = tempKeys.length; i < len; i++) {
                let seriesName = tempKeys[i],
                    seriesData = data[seriesName],
                    markPointData = markPoint[seriesName],
                    keysArr = Object.getOwnPropertyNames(seriesData);
                //图例
                legend.push(seriesName);
                let temp = [];
                for (let j = 0, jLen = keysArr.length; j < jLen; j++) {
                    let xAxis = keysArr[j],
                        yAxis = seriesData[xAxis];
                    if (xData.indexOf(xAxis) == -1) xData.push(xAxis);
                    let pointValue = [xAxis, yAxis];
                    if (markPointData && markPointData[xAxis]) {
                        let obj = markPointData[xAxis];
                        pointValue.push(obj.text);
                    }
                    temp.push(pointValue);
                }
                series.push(temp);
            }
        } catch (error) {
            this.logErr('转化图表数据出错', error)
        }

        if (this.isNotANumber(xData[0])) xData = xData.sort();

        return {
            legend,
            xData,
            series
        };
    }


    /**
     * 曲线图转换，适合多条曲线
     * @param {*} data 
     * 
     * 适用例子
     * [
     *  {
     *      "name":"电脑、办公"，
     *      "data":[[201901,0.23],[201902,0.22],[201903,0.4]]
     *  },
     * {
     *      "name":"数码"，
     *      "data":[[201901,0.23],[201902,0.22],[201903,0.4]]
     *  }
     * ] 
     */
    getTransformArrayData(data, markPoint = {}) {
        if (!data) return;
        let legend = [],
            xData = [],
            series = [],
            format = [],
            zbNames = [];

        const areaColorArr = []
        try {
            for (let i = 0, len = data.length; i < len; i++) {
                let obj = data[i],
                    seriesName = obj.name || obj.yName,
                    operate_multiple = obj.operate_multiple ? obj.operate_multiple : obj.operate,
                    seriesData = obj.data,
                    yName = obj.yName,
                    detail_code = obj.detail_code,
                    colour = obj.colour || [],
                    markPointData = markPoint[seriesName];
                //图例
                // legend.push(detail_code?`${detail_code}${seriesName}`:seriesName);
                legend.push(seriesName);
                format.push(operate_multiple);
                //带单位的指标名称
                zbNames.push(yName);
                let temp = [];
                for (let j = 0, jLen = seriesData.length; j < jLen; j++) {
                    let arr = seriesData[j],
                        xAxis = arr[0],
                        yAxis = arr[1];

                    if (xData.indexOf(xAxis) == -1) xData.push(xAxis);

                    let pointValue = [xAxis, yAxis];
                    if (markPointData && markPointData[xAxis]) {
                        let obj = markPointData[xAxis];
                        pointValue.push(obj.text);
                    }
                    temp.push(pointValue);
                }
                series.push(temp);
            }
        } catch (error) {
            this.logErr('转化图表数据出错', error)
        }

        if (this.isNotANumber(xData[0])) xData = xData.sort();

        const colour = data[0].colour || []
        xData.map(item => {
            if (colour.length) {
                if (colour.indexOf(item) > -1) {
                    areaColorArr.push('#E6F1FF')
                } else {
                    areaColorArr.push('#ffffff')
                }
            }
        })


        return {
            legend,
            xData,
            series,
            format,
            zbNames,
            areaColorArr
        };
    }

    /**
     * 转化曲线图数据
     * @param {Object OR Array} data 
     * @param {Object} markPoint 
     */
    processLineChartData(data, markPoint = {}) {
        if (!data) return;
        //数据类型是 array
        if (data.constructor === Array) return this.getTransformArrayData(data, markPoint);
        //数据类型是 object
        else if (data.constructor === Object) return this.getTransformObjectData(data, markPoint);
        return null;
    }


    //pie图表 & 表格
    processChartAndTableData(datas, mapping, chartParam) {
        if (!datas || !datas.list || !datas.list.length) return datas;

        let chart = this.processChartPieData(datas, chartParam),
            table = this.processSimpleTableData(datas, mapping);

        return {
            chart,
            table
        };
    }

    //转换line数据  支持多条线
    processLineData(datas) {
        if (!datas || !datas.length) return datas;

        let legend = [],
            series = {};

        for (let i = 0, len = datas.length; i < len; i++) {
            let obj = datas[i],
                name = obj.name || obj.yName,
                data = obj.data;
            legend.push(name);
            series[name] = data;
        }

        return {
            legend,
            series
        };
    }

    //图表 pie
    processChartPieData(datas, chartParam) {
        if (!datas || !datas.list || !datas.list.length) return datas;
        try {
            let header = datas.header,
                list = datas.list;

            let xAxis = chartParam.xAxis,
                yAxis = chartParam.yAxis;

            let legend = [],
                series = [];

            for (let i = 0, len = list.length; i < len; i++) {
                let obj = list[i],
                    x = obj[xAxis],
                    y = obj[yAxis];

                let arr = null;
                if (yAxis.constructor === String) {
                    y = obj[yAxis];
                    arr = [x, y];
                } else if (yAxis.constructor === Array) {
                    arr = [x];
                    for (let y = 0, y_len = yAxis.length; y < y_len; y++) {
                        let key = yAxis[y];
                        arr.push(obj[key])
                    }
                }

                legend.push(x);
                series.push(arr);
            }

            return {
                legend,
                series
            }
        } catch (error) {
            console.log("解析获取图表数据出错")
        }
        return null;
    }

    //循环图表
    processLoopChartData(datas, chartParam) {
        // datas.result.trend
        // if (!datas || !datas.list || !datas.list.length) return datas;
        if (!datas || !datas.length) return null;
        let chartDatas = []
        datas.map((item, index) => {
            if (!item.result || !item.result.trend || !item.result.trend.length) {
                chartDatas.push({
                    xData: [],
                    series: [],
                    zb_code: item.zb_code,
                    // formatArr: []
                })
            } else {
                const trend = item.result.trend,
                    markPoint = item.result.markPoint,
                    zb_code = item.zb_code;

                let formatArr = []
                trend.map(_item => {
                    formatArr.push({
                        name: _item.name || _item.yName,
                        operate: _item.operate_multiple,
                        detail_code: _item.detail_code
                    })
                })

                chartDatas.push(this.processLineChartData(trend, markPoint))
                if (markPoint && chartData[index]) chartDatas[index]["markPoint"] = markPoint
                chartDatas[index]["zb_code"] = zb_code
                chartDatas[index]["formatArr"] = formatArr
            }
        })
        return chartDatas;
    }

    //正常图表
    processNormalChartData(datas, chartParam) {
        // if (!datas || !datas.list || !datas.list.length) return datas;)
        if (!datas || !datas.result || !datas.result.trend || !datas.result.trend.length) return null;
        const trend = datas.result.trend,
            markPoint = datas.result.markPoint;

        let formatArr = []
        if (trend && trend.length) {
            trend.map(_item => {
                formatArr.push({
                    name: _item.name || _item.yName,
                    operate: _item.operate_multiple,
                    detail_code: _item.detail_code
                })
            })
        }

        let chartData = this.processLineChartData(trend, markPoint);
        if (markPoint && chartData) chartData["markPoint"] = markPoint;
        // chartData["zb_code"] = zb_code
        chartData["formatArr"] = formatArr
        // normal图只需要一个format
        // if (Array.isArray(chartData["format"]) && chartData["format"].length > 1) chartData["format"] = chartData["format"].splice(0, 1)
        return chartData;
    }
}

module.exports = ConfigPageProcess;