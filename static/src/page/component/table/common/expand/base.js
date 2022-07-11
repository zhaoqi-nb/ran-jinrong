'use strict';
import React from 'react';
import moment from 'moment';
import _ from 'lodash'
// import ToolTip from '../../../util/toolTip';
// import { Tooltip } from 'antd'
import Tooltip from '@toolTip'
import MinAreaChart from '../../../chart/common/index'
import { transTableDateType } from '../../../util/format/number';
// import { i18n.format } from '../../../locales/index';
import replacePath, { checkAuth } from '@/utils/replacePath';
import { getComponentParam } from '../../../util/template'
import i18n from '@/plugin/i18n'
import RsIcon from '../../../rsIcon/index';
import { getPrimaryMarketRouterParams } from '@/utils/primaryMarketUtil';
import { getMaxWidth } from '../../../../../utils/Util'

//添加title的render
function addTitleRender(item) {
    const title_width = item.width || 130;
    return (text, record) => {
        let children = record.children,
            treeLevel = record.treeLevel,
            baseWidth = title_width - 15,
            level = parseInt(treeLevel) * 30,
            maxWidth = `${baseWidth - level}px`;
        // if((!children || !children.length) && treeLevel==1) maxWidth = `${title_width}px`;
        if ((!children) && treeLevel == 1) maxWidth = `${title_width}px`;
        let _style = {
            width: maxWidth,
            lineHeight: "15px"
        }
        return <span className="wordHide" style={_style} title={text}>{text}</span>;
    }
}


// //添加标题备注
// function addExplain(headerMapping, item) {
//     let dataIndex = item.dataIndex,
//         title = i18n.format(item.title),
//         explain = headerMapping[dataIndex]["explain"],
//         placement = explain.placement || "top",
//         text = i18n.format(explain.text || "");

//     return <div>{title}<ToolTip placement={placement} title={text} /></div>
// }

//判断大小
export function judgeSize(dataIndex, dateRule) {
    if (!dateRule) return false;
    let type = dateRule.type,
        fixDate_range = dateRule.fixDate_range,
        iflimit = false;
    try {
        if (type == "month") {
            let start = fixDate_range[0],
                end = fixDate_range[1] || moment().format("YYYYMM");
            if (moment(dataIndex, 'YYYYMM').valueOf() >= moment(start, 'YYYYMM').valueOf() && moment(dataIndex, 'YYYYMM').valueOf() <= moment(end, 'YYYYMM').valueOf()) iflimit = true;
        } else if (type == "week") {
            let start = fixDate_range[0],
                end = fixDate_range[1] || moment().format("GGGGWW");
            if (moment(dataIndex, 'GGGGWW').valueOf() >= moment(start, 'GGGGWW').valueOf() && moment(dataIndex, 'GGGGWW').valueOf() <= moment(end, 'GGGGWW').valueOf()) iflimit = true;
        } else if (type == "day") {
            let start = fixDate_range[0],
                end = fixDate_range[1] || moment().format("YYYYMMDD");
            if (moment(dataIndex, 'YYYYMMDD').valueOf() >= moment(start, 'YYYYMMDD').valueOf() && moment(dataIndex, 'YYYYMMDD').valueOf() <= moment(end, 'YYYYMMDD').valueOf()) iflimit = true;
        }
    } catch (error) {
        console.log(error);
    }

    return iflimit;
}

//添加模糊列
function addNoView(noView, item) {
    const dataIndex = item.dataIndex;
    const dateRule = noView && noView.dateRule ? noView.dateRule : null;
    //限制
    if (dateRule && judgeSize(dataIndex, dateRule)) {
        item["render"] = (text, row, index) => {
            return <div className="rs-noView">{text}</div>
        }
    }
    return item;
}

function setAddIndex($this, columns) {
    if (!columns || !columns.length) return columns;

    columns.unshift({
        align: "center",
        dataIndex: "index",
        fixed: true,
        title: i18n.format("序号"),
        width: 50,
        render: (text, record, index) => {
            let { pagination } = $this.state;
            if (pagination && pagination.current) {
                return index + (pagination.current - 1) * pagination.pageSize + 1;
            } else return index + 1
        }
    })
    return columns;
}

//添加标题备注
function addExplain(headerMapping, item) {
    if (!_.hasIn(headerMapping, `${item.dataIndex}.useExplain`)) {
        // 识别 \n 换行
        item.orginTitle = i18n.format(item.title)
        item.title =
            item.title.indexOf('\\n') > -1
                ? <div className="wrap-head-title">
                    {item.title?.split('\\n').map(til => <div>{til}</div>)}
                </div>
                : i18n.format(item.title)

        return item
    }

    const { dataKey, desc, tooltipProps, target } = _.get(headerMapping, `${item.dataIndex}.useExplain`, {})

    if (_.isNil(dataKey) && !desc) return item;

    const _desc = _.isNil(dataKey) ? i18n.format(desc) : _.get(item, dataKey)

    if (target === 'parent') {
        item.parentInfo = {
            orginTitle: item.header_combine,
            desc: _desc,
            title: (
                <>
                    {i18n.format(item.header_combine)}
                    <Tooltip {...(tooltipProps || {})} title={_desc}>
                        <RsIcon type="icon-shuoming" className="titleIcon"></RsIcon>
                    </Tooltip>
                </>
            )
        }
    } else {
        item.desc = _desc;
        item.orginTitle = item.title
        item.title = (
            <div className="wrap-title-wraper">
                {/* 识别 \n 换行 */}
                {item.title.indexOf('\\n') > -1
                    ? <div className="wrap-head-title">
                        {item.title?.split('\\n').map(til => <div>{til}</div>)}
                    </div>
                    : i18n.format(item.title)}
                < Tooltip {...(tooltipProps || {})} title={_desc}>
                    <RsIcon type="icon-shuoming" className="titleIcon"></RsIcon>
                </Tooltip>
            </div>
        )
    }

    return item
}

//添加表格列信息
export function addBaseColumn(data, currProps) {
    if (!data || !data.length) return data;
    const { headerMapping, noView, ifAddIndex, warnConfig } = currProps || this.props;

    let tempData = data.map((item, index) => {
        let dataIndex = item.dataIndex;
        // //添加备注
        // if (headerMapping[dataIndex] && headerMapping[dataIndex]["explain"]) {
        //     item["original_title"] = item["title"];
        //     item["title"] = addExplain(headerMapping, item)
        // }

        addExplain(headerMapping, item)

        //特殊字段增加最大宽度
        if (dataIndex == "title") {
            item["render"] = addTitleRender(item);
        } else if (isNotANumber(dataIndex)) {
            if (noView) item = addNoView(noView, item)
        } else if (warnConfig) item["render"] = (value, record) => defalutRender(dataIndex, value, record, warnConfig);
        // console.log('colors===render', warnConfig, item)

        return item;
    })

    //是否增加序号列
    if (ifAddIndex) {
        tempData = setAddIndex(this, tempData);
    }

    return tempData;
}

//判断是否是数字
function checkNum(value) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(value) || regNeg.test(value)) {
        return true;
    } else {
        return false;
    }
}

//默认渲染
function defalutRender(dataIndex, value, record, warnConfig) {
    try {
        let configObj = {
            "threshold": 0,
            "color": "#f14848"
        };
        if (warnConfig[dataIndex]) configObj = Object.assign({}, configObj, warnConfig[dataIndex])
        else if (warnConfig["other"]) configObj = Object.assign({}, configObj, warnConfig["other"])

        let front_metadata = record.front_metadata;
        let original_value = front_metadata[dataIndex];

        if (checkNum(original_value)) {
            if (original_value < configObj.threshold) return <span className="limit-color" style={{ color: configObj.color }}>{value}</span>
        }
    } catch (error) {
        console.log(error);
    }
    return value;
}

//判断合并所需要的key
export function judgeMergeKey(mergeRow, columns) {
    console.log("合并行===", mergeRow, columns)
    if (columns && columns.length && mergeRow && mergeRow.length) {
        for (let i = 0, len = mergeRow.length; i < len; i++) {
            let value = mergeRow[i],
                index = columns.findIndex(item => item.dataIndex == value);
            if (index != -1) return true;
        }
    }
    return false;
}

//添加合并行
export function addMergeRow(columns, dataSource) {
    const { mergeRow } = this.props;
    let temp = {},
        obj = {};

    const setTr = (item) => {
        for (let i = 0, len = mergeRow.length; i < len; i++) {
            let key = mergeRow[i],
                value = item[key],
                count = obj[value] || 1;

            if (!temp[key] || (value && temp[key] != value)) {
                temp[key] = value;
                obj[value] = 1;
            }
            else if (value && temp[key] == value) {
                obj[value] = ++count;
                item[key] = "";
                item[`original_${key}`] = value;
            }
        }
        return item;
    }

    const temp_dataSource = dataSource.map((item, index) => {
        return setTr(item);
    })

    const temp_columns = columns.map((item, index) => {
        let dataIndex = item.dataIndex;
        index = mergeRow.findIndex(val => val == dataIndex);
        if (index != -1) {
            item["render"] = (text, row, index) => {
                return {
                    children: text,
                    props: {
                        rowSpan: obj[text] ? obj[text] : 0,
                    }
                };
            }
        }
        return item;
    })

    return {
        columns: temp_columns,
        dataSource: temp_dataSource
    }
}

//异步加载 展开表格
export function addExpandData($this, data) {
    const { openKeys } = $this.state;
    if (!openKeys || !openKeys.length) return data;
    let last = openKeys[openKeys.length - 1];
    const ifEqual = (record) => {
        return last.category_dimension_id == record.category_dimension_id;
    }

    const loop = (arr) => {
        for (let i = 0, len = arr.length; i < len; i++) {
            let obj = arr[i],
                children = obj.children;
            if (ifEqual(obj)) {
                obj.children = data;
                return arr;
            }
            if (children && children.length) {
                let temp = loop(children);
                if (temp && temp.length) {
                    obj["children"] = temp;
                    return arr;
                }
            }
        }
        return null;
    }

    let dataSource = loop($this.state.dataSource)
    return dataSource;
}

//得到复杂表头数据
// function getCompleHeader(data) {
//     let complexHeader = [];
//     for (let i = 0, len = data.length; i < len; i++) {
//         let obj = data[i];
//         let dataIndex = obj.dataIndex;
//         let header_combine = obj.header_combine;

//         if (!header_combine) continue;

//         let index = complexHeader.findIndex(item => item.parentName == header_combine);
//         //不存在
//         if (index == -1) {
//             complexHeader.push({
//                 "parentName": header_combine,
//                 "children": [dataIndex]
//             })
//         } else {
//             let temp = complexHeader[index];
//             let children = temp.children;
//             children.push(dataIndex);
//             complexHeader[index] = temp;
//         }
//     }

//     return complexHeader;
// }

//合并列
export const getComplexHeader = (columns, props) => {

    const flag = _.some(columns, item => _.has(item, 'header_combine'))
    // console.log('columns', columns, flag)
    // item =>({...item, title: i18n.format(item.title)})
    const callback = item => ({
        ...item,
        title: i18n.format(item.title),
        nilShow: emptyDisplay(props)
    })//addTableColumnRender

    if (!flag) return _.map(columns, callback)

    const newColumns = _.chain(columns)
        .groupBy(item => item.header_combine)
        .toPairs()
        .map(([parent, children]) => {
            if (parent === 'undefined') {
                return _.map(children, callback)
            }

            const option = _.find(children, item => _.has(item, 'parentInfo')) || { parentInfo: {} };

            return {
                title: i18n.format(parent),
                ...option.parentInfo,
                children: _.map(children, callback)
            }
        })
        .flatten()
        .value()

    return newColumns //[]
}

// export function getComplexHeader(data) {
//     const complexHeader = getCompleHeader(data);
//     if (!complexHeader || !complexHeader.length) return data;
//     let getFieldParent = (key) => {
//         for (let i = 0, len = complexHeader.length; i < len; i++) {
//             let obj = complexHeader[i],
//                 parentName = obj.parentName,
//                 children = obj.children,
//                 index = children.findIndex(item => item == key);
//             if (index != -1) return obj;
//         }
//         return null;
//     }

//     let newArr = [],
//         temp_parent = null;
//     for (let i = 0, len = data.length; i < len; i++) {
//         let obj = data[i],
//             dataIndex = obj.dataIndex;

//         let parent = getFieldParent(dataIndex);
//         //翻译
//         obj["title"] = i18n.format(obj["title"]);

//         if (!parent) {
//             if (temp_parent && temp_parent.title) {
//                 newArr.push(temp_parent)
//                 temp_parent = null;
//             }
//             newArr.push(obj);
//         } else {
//             if (temp_parent && temp_parent.text && parent.parentName != temp_parent.text) {
//                 newArr.push(temp_parent);
//                 temp_parent = null;
//             }
//             if (temp_parent && temp_parent.title) {
//                 temp_parent.children.push(obj)
//             } else {
//                 let title = i18n.format(parent.parentName),
//                     text = parent.parentName;
//                 if (parent.explain) {
//                     let placement = parent.explain.placement || "top";
//                     title = <div>{i18n.format(parent.parentName)}<Tool_Tip placement={placement} title={i18n.format(parent.explain.text)} /></div>
//                 }
//                 temp_parent = {
//                     title,
//                     text,
//                     original_title: text,
//                     children: new Array(obj)
//                 }
//             }
//         }
//     }
//     //防止最后一个
//     if (temp_parent && temp_parent.title) {
//         newArr.push(temp_parent)
//         temp_parent = null;
//     }
//     return newArr;
// }


export function isNotANumber(inputData) {
    //isNaN(inputData)不能判断空串或一个空格
    //如果是一个空串或是一个空格，而isNaN是做为数字0进行处理的，而parseInt与parseFloat是返回一个错误消息，这个isNaN检查不严密而导致的。
    const newNumber = parseFloat(inputData).toString()
    if (newNumber == "NaN" || newNumber != inputData) { // 双等判断值parse前后是否一致
        //alert(“请输入数字……”);
        return false;
    } else {
        return true;
    }
}

//获取格式化 方式
export function getFormatMode(operate, default_bit_number) {
    let format = operate && operate.format ? operate.format : null,
        divide = operate && operate.divide ? operate.divide : null,
        bit_number = default_bit_number != undefined ? default_bit_number : operate && operate.bit_number ? operate.bit_number : 2,
        param = null;

    if (format == "long" || format == "int") {
        param = { type: "int", thousands: true, bit_number: 0 };
        //单位近位
        if (divide) param["divide"] = divide;
    }
    else if (format == "double") {
        param = { type: "float", bit_number, thousands: true };
        //单位近位
        if (divide) param["divide"] = divide;
    }
    else if (format == "percent") param = { type: "percent", bit_number };
    else if (format == "pct") param = { type: "percent", bit_number, ifSuffix: "pct" };
    else if (format == "string") param = { type: "string" };

    return param;
}

export function formatData(operate, value) {
    if (!operate) return value;
    let param = getFormatMode(operate);
    //单位近位
    // if(divide) value = transTableDateType(value, {divide, bit_number});
    //格式化
    if (param) value = transTableDateType(value, param);

    return value;
}

// 空值显示
const emptyDisplay = (props) => {
    const config = _.get(props, 'option.emptyDisplay')

    if (_.isNil(config)) return '-'

    if (_.isBoolean(config)) return config ? '-' : ''

    return config//'-'
}

//格式化数据
export function getFormatData(dataSource, props) {
    const { format_forbidden = ["title", "operate", "key", "children", "front_metadata", "index", "treeLevel", "parentTitle", "first_type_name"], ifShowChart = true, ifAsyncExpanded } = this.props;
    const loop = (datas, parentData) => {
        if (!datas || !datas.length) return [];
        let arr = [];
        for (let i = 0, len = datas.length; i < len; i++) {
            let item = datas[i],
                operate = item.operate,
                operate_multiple = item.operate_multiple,
                children = item.children,
                //序号列
                obj = { "front_metadata": _.cloneDeep(item) };

            try {
                for (let key in item) {
                    let value = item[key];
                    if (key == "children" && (!children || !children.length) && !ifAsyncExpanded) continue;

                    if (key != "children" && format_forbidden.indexOf(key) == -1 && isNotANumber(value) && key.indexOf('_id') == -1) {
                        if (operate) obj[key] = formatData(operate, value);
                        else if (operate_multiple && operate_multiple[key]) obj[key] = formatData(operate_multiple[key], value);
                        else obj[key] = value;
                    } else {
                        if (key == "title" && operate && operate.name && !parentData) {
                            obj[key] = item[key] = `${value}(${operate.name})`
                        }
                        else obj[key] = value ? value : emptyDisplay(props); //"-";
                    }
                }

                if (ifShowChart) {
                    if (parentData && parentData.title) obj["parentName"] = parentData.title;
                }
            } catch (error) {
                console.log(error)
            }

            if (children && children.length) obj.children = loop(children, item);
            arr.push(obj);
        }
        return arr;
    }


    dataSource = loop(dataSource);

    return dataSource;
}

function transformData(data, title) {
    if (!data) return data;

    let series = [],
        xData = [];
    if (data.constructor === Array) {
        for (let i = 0, len = data.length; i < len; i++) {
            let xValue = Object.keys(data[i])[0],
                yValue = data[i][xValue];
            series.push([xValue, yValue]);
            xData.push(xValue)
        }
    } else if (data.constructor === Object) {
        xData = Object.keys(data)
        for (let i = 0, len = xData.length; i < len; i++) {
            let xValue = xData[i],
                yValue = data[xValue];
            series.push([xValue, yValue]);
        }
    }


    return {
        xData,
        series: [series],
        legend: [title]
    }
}

export function addMinChartColumn(columns, minChartOption, dataSource) {
    if (!columns || !columns.length) return columns
    const { date_type } = this.props
    const minChartCode = Object.keys(minChartOption)
    if (!minChartCode.length) return columns
    return columns.map((v, index) => {
        const { dataIndex, title, } = v
        if (minChartCode.indexOf(dataIndex) >= 0) {
            const { type = 'line', color, areaStyle } = minChartOption[dataIndex]
            let dateType = minChartOption[dataIndex].dateType || date_type
            let minChartArr = dataSource.map(minChartItem => {
                return minChartItem[dataIndex]
            })
            let maxLenth = getMaxWidth(minChartArr) + 10
            if (!v.width) v.width = 300
            v.render = (text, record, columnsIndex) => {
                const trendData = transformData(record[`${dataIndex}_json`], title);
                const format = getFormatMode(record.operate_multiple[dataIndex])
                const option = {
                    type,
                    color,
                    // tooltip: {
                    //     position: {
                    //         top: 5,
                    //         left: "10%"
                    //     },
                    //     trigger: 'axis',
                    // },
                    // tooltip: {
                    //     appendToBody: true
                    // },
                    grid: {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        show: false,
                        borderWidth: 0,
                    },
                    // legend: null,
                    legend: {
                        show: false
                    },
                    xAxis: {
                        type: "category",
                        name: "",
                        "axisLabel": { "date_type": dateType, "type": "date" }
                    },
                    yAxis: [{
                        format
                    }],
                    ifShowSymbol: false,
                    hideDataZoom: true,
                    minSeriesOption: {
                        smooth: true,
                        areaStyle: Object.assign({}, {
                            opacity: '0.1'
                        }, areaStyle)
                    },
                    ifWatermark: false,
                    showTooltipLabel: false,
                    showAxisLine: false,
                    showChangeType: false
                }

                const boxStyle = {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    padding: '5px 12px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }
                console.log('minChartOptionminChartOption', option)
                return <div style={boxStyle}>
                    <div className='min-chart' style={{ flex: 1 }}>
                        <MinAreaChart
                            wrapStyle={{ bottom: 5 }}
                            // chartWrapStyle={{ marginRight: 10 }}
                            chartWrapStyle={{ marginRight: 0 }}
                            style={{ height: 30, margin: 0 }}
                            option={option}
                            id={`${dataIndex}_${index}_${columnsIndex}_${text}`}
                            data={trendData}
                            appendToBody
                        />
                    </div>
                    <div style={{ width: `${maxLenth}px`, textAlign: "right" }}>{text}</div>
                </div>
            }
            return v
        } else return v
    })
}

const isNeg = (v) => /^-\d+\.?\d+%?/.test(_.toString(v))

// 自定义渲染
export const addRenderToColumn = (columns) => {
    const deepAdd = _.partialRight(_.each, item => {
        if (item.children) {
            deepAdd(item.children)
        } else {
            if (!item.render) {
                item.render = (value) => {

                    return _.isNil(value)
                        ? item.nilShow
                        : isNeg(value)
                            ? <span style={{ color: '#FF4757' }}>{value}</span>
                            : value
                }
            }
        }
    })

    deepAdd(columns)

    return columns
}

export const enhanceColumn = _.flowRight(addRenderToColumn, getComplexHeader)

export const addTableColumnRender = function (columns, props) {
    const newColumns = enhanceColumn(columns, props)
    const settingLink = _.get(props, 'option.settingLink')
    const openTable = _.get(props, 'option.openTable')

    if (!settingLink) return newColumns // && !openTable

    const deepColumn = _.partialRight(_.each, item => {
        let current = settingLink[item.dataIndex]
        // const openCurrent = openTable[item.dataIndex]
        const openCurrent = _.get(openTable, `[${item.dataIndex}]`)
        if (current) {
            //是否是公司跳转
            let resIdFlag = (current.path.indexOf("resId") != -1 && current.path.indexOf("company") != -1) ? true : false
            // 添加链接的列需要重写
            const tmpRender = item.render

            item.render = (v, record) => {
                const routParams = getPrimaryMarketRouterParams(settingLink?.pmMapKeyName);
                return !resIdFlag ? <div style={{ display: "flex", alignItems: "center", justifyContent: tmpRender(v, record) != v ? "left" : "center" }}>
                    <a target="_blank" href={replacePath(current.path, { ...routParams, ...getComponentParam(props.controlledElement), ...record })}>{v}</a>
                    {
                        tmpRender(v, record) != v ? tmpRender(v, record) : null
                    }
                </div>
                    : (checkAuth(current.path, record) && (v != '-' && v)) ?
                        <a
                            target="_blank"
                            href={replacePath(current.path, { ...getComponentParam(props.controlledElement), ...record })}
                        >
                            {v}
                        </a> : v
            }
        }
        if (openCurrent) {
            item.render = (v, record) => {
                return <a onClick={() => {
                    this.showTable(record, openCurrent)
                }}>
                    {v || '查看'}
                </a>
            }
        }

        if (item.children) return deepColumn(item.children)
    })

    deepColumn(newColumns)

    return newColumns
}

// 表格基础增强 // this.state.columns
const addColumnSort = ({ props, state }, length, column, index) => {
    const { start, end, columnKeys } = _.get(props, 'option.sortConfig', { start: 0, end: 0 })

    const flag = _.isNil(columnKeys) ? false : _.includes(columnKeys, column.dataIndex)

    if ((props.ifSorter || props.ifAsyncSorter) && (start < index && index < length + end || flag)) {
        return {
            ...column,
            key: column.dataIndex,
            // TODO 中文排序前端暂时不做
            // sorter: (a, b) => parseFloat(_.replace(a[column.dataIndex], ',', '')) - parseFloat(_.replace(b[column.dataIndex], ',', '')),//true,
            sorter: props.ifAsyncSorter ? true : (a, b) => {
                // if(!a["front_metadata"]){
                //     return parseFloat(_.replace(a[column.dataIndex], ',', '')) - parseFloat(_.replace(b[column.dataIndex], ',', ''))
                // }else {
                return a["front_metadata"][column.dataIndex] - b["front_metadata"][column.dataIndex]
                // }
            },//true,
            sortOrder: state.sorter === column.dataIndex && state.sortDirections//'ascend'
        }
    }
    return { ...column }
}
export const basicColumnReset = (column, config) => {
    const addColumnSortCb = _.partial(addColumnSort, config, _.size(column))

    return _.map(column, _.flowRight(addColumnSortCb))
}

// 表格添加颜色
/**
 * 配置规则
 "comparkeyword": {
    "Abbott/雅培": {
      "keys": ["key1", "key2"],
      "rowColorTheme": "1"
    }
  }
 */
export const tableRowAddColor = (props) => {
    const [comparkeyword, comparkeywordByKeys] = _.chain(_.get(props, 'comparkeyword') || _.get(props, 'option.comparkeyword'))
        .toPairs()
        .reduce((acc, [key, value]) => {
            const [comparkeyword, comparkeywordByKeys] = acc
            if (_.isEmpty(_.get(value, 'keys'))) {
                comparkeyword.push({ ...(value || {}), kwd: key })
            } else {
                comparkeywordByKeys.push({ ...(value || {}), kwd: key })
            }

            return acc
        }, [[], []])
        .value()

    return (record) => {
        if (_.isEmpty(comparkeyword) && _.isEmpty(comparkeywordByKeys)) return '';


        const conditionBykeys = () => _.find(comparkeywordByKeys, ({ kwd, keys }) => {
            return kwd === _.map(keys, item => record[item]).join('')
        })

        const conditionByValues = () => {
            const values = _.values(record)
            // console.log('highlight==', values, comparkeyword)
            return _.find(comparkeyword, ({ kwd }) => {
                return _.includes(values, kwd)
            })
        }

        const conf = conditionBykeys() || conditionByValues()

        return conf ? `highlight-${conf.rowColorTheme}` : ''
    }
}

// 重置最后一列(包括children)的宽度，自适应并添加最小宽度
export const resetLastColumnWidth = (columns) => {

    const resetChildrenWidth = (children) => {
        return _.map(children, (child) => {
            if (child.children) {
                return resetChildrenWidth(child.children)
            }
            const width = child['width'];
            delete child['width']
            return {
                ...child,
                onHeaderCell: () => {
                    return {
                        style: {
                            minWidth: width
                        }
                    }
                }

            };
        })
    }

    return _.map(_.cloneDeep(columns), (col, idx) => {
        if (idx === _.size(columns) - 1) {
            if (col.children) {
                return {
                    ...col,
                    children: resetChildrenWidth(col.children)
                }
            }
            const width = child['width'];
            delete col['width']
            return {
                ...col,
                onHeaderCell: () => {
                    return {
                        style: {
                            minWidth: width
                        }
                    }
                }
            };
        }
        return col
    })
}