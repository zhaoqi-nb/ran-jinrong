'use strict';
import { getMinOrMaxValue, setFormatFun } from './util';
import moment from 'moment';
import Tooltip from './Tooltip'
import _ from 'lodash'
/**
 * 获取markPoint展示数据
 * @param {array} data Markpoint数据
 */
function getMarkPoint(data) {
    return {
        markPoint: {
            symbol: "circle",
            symbolSize: 10,
            symbolOffset: [0, 0],
            label: {
                show: true,
                position: 'middle',
                color: '#fff',
                fontSize: 14,
                lineHeight: 20,
                backgroundColor: "#1890ff",
                offset: [0, -60],
                padding: 8,
                borderRadius: 4,
            },
            itemStyle: {
                borderWidth: 0,
                borderColor: '#c23531',
                color: "#c23531"
            },
            data
        }
    }
}

/**
 * 获取是否是双轴判断
 * @param {any} yAxis y轴配置
 */
function getIfDoubleAxis(yAxis, series) {
    return yAxis && (yAxis instanceof Array) && yAxis.length > 1 ? true : false;
}


/**
 * 获取曲线图series数据
 * @param {array} series      图数据
 * @param {array} legend      图legend数据
 * @param {object} markPoint  图markPoint数据
 * @param {bool} ifDouble     是否是双轴图
 * @param {bool} ifShowSymbol 是否显示图曲线上的点
 */
function getSeriesData(series, legend, markPoint, ifDouble, ifShowSymbol, minSeriesOption = {}) {
    let arr = [];
    for (let i = 0, len = series.length; i < len; i++) {
        let temp = series[i];
        let name = legend[i];
        let series_data = {
            data: temp,
            name,
            // max:"dataMax",
            // min:0,
            type: 'line',
            ...minSeriesOption
        }
        if (ifDouble) series_data["yAxisIndex"] = i;
        // if (!ifShowSymbol) series_data["showSymbol"] = false;
        series_data["showSymbol"] = false;
        if (markPoint) {
            series_data = Object.assign({}, series_data, getMarkPoint(markPoint[name]))
        }

        arr.push(series_data)
    }
    return arr;
}

/**
 * 获取柱状图 series数据
 * @param {array} series      图数据
 * @param {array} legend      图legend数据
 * @param {object} markPoint  图markPoint数据
 * @param {bool} ifDouble     是否是双轴图
 * @param {bool} ifStack      是否是堆积柱状图
 * @param {bool} ifBarLabel   是否显示柱状图上面的数值
 */
function getSeriesDataForBar(series, legend, markPoint, ifDouble, ifStack, ifBarLabel) {
    let arr = [];
    for (let i = 0, len = series.length; i < len; i++) {
        let temp = series[i];
        let name = legend[i];
        let series_data = {
            data: temp,
            name,
            barGap: 0,
            type: 'bar',
            barMaxWidth: '40%',
            emphasis: {
                disabled: true
            }
        }
        if (ifDouble) series_data["yAxisIndex"] = i;

        if (markPoint) {
            series_data = Object.assign({}, series_data, getMarkPoint(markPoint[name]))
        }

        if (ifStack) series_data["stack"] = "总量";

        //是否显示柱状图 bar label
        if (ifBarLabel) {
            series_data["label"] = {
                show: true,
                position: ifBarLabel.position ? ifBarLabel.position : "insideBottom",
                distance: 15,
                align: "center",
                verticalAlign: 'middle',
                rotate: 0,
                formatter: (value, index) => {
                    return _this.getTooltipFormatValue("yAxis", index, value.data[1])
                },
                color: "rgba(0, 0, 0, 0.85)",
                fontSize: 12,
                rich: {
                    name: {
                        textBorderColor: '#fff'
                    }
                }
            }
        }

        arr.push(series_data)
    }
    return arr;
}

/**
 * 获取 Legend 数据
 * @param {object} option 图数据
 * @param {string} title 图缩略图
 * @param {array} series 图数据
 * @param {object} legend 图设置
 */

const barLegendStyle = {
    itemWidth: 16,
    itemHeight: 8,
    borderRadius: 2,
    itemGap: 16,
    textStyle: {
        fontSize: 12,
        color: '#262626',
        lineHeight: 20
    }
}

const lineLegendStyle = {
    itemWidth: 16,
    itemHeight: 10,
    borderRadius: 2,
    itemGap: 16,
    lineStyle: {
        width: 2,
    },
    textStyle: {
        fontSize: 12,
        color: '#262626',
        lineHeight: 20
    }
}
function getLegend(option, title, series, legend, type = "bar") {

    try {
        option.legend = {
            pageIconColor: '#595959',
            pageIconInactiveColor: '#BFBFBF',
            pageIconSize: 12,
            pageButtonItemGap: 4,
            pageButtonGap: 16,
            pageTextStyle: {
                color: '#595959',
                fontSize: 12,
                fontWeight: 400
            },
            ...legend,
            // ...barLegendStyle
            ...type === 'bar' ? barLegendStyle : lineLegendStyle,
        };

        //设置title
        if (!title) {
            //如果没有title，则legend 向上移动
            // option.legend.top = 0;
        } else if (title) {
            if (title.constructor === String) option.title.text = title;
            else if (title.constructor === Object) option.title = title;
        }

        // if (series && series.length == 1) option.legend.show = false;

    } catch (error) {
        console.log(error)
    }

    return option;
}

/**
 * 设置坐标轴展示效果
 * @param {object} label 
 */
function setAxisLabelFormat(label, param) {
    let axisLabel = null;
    if (label) {
        const hideOverlap = _.get(label, 'hideOverlap', false)
        axisLabel = {
            color: '#595959',
            showMinLabel: true,
            showMaxLabel: true,
            hideOverlap,
            formatter: (value, index) => {
                const a = setFormatFun(label, value, param)
                return a
            }
        }
    }
    return axisLabel;
}

/**
 * 获取Y轴信息
 * @param {any} yAxis y轴配置
 */
function getYAxis(yAxis, param, showAxisLine = true) {
    let yAxis_arr = [];
    let setYAxis = (item, type) => {
        let name = item.name || "",
            label = item.axisLabel,
            format = item.format,
            min = item.min,
            min_scaleIndex = item.min_scaleIndex || 0.8,
            max = item.max,
            max_scaleIndex = item.max_scaleIndex || 1.2,
            axisLabel = setAxisLabelFormat(label, param);

        const formatType = _.get(item.axisLabel, 'type');
        const formatBitNumber = _.get(item.axisLabel, 'bit_number', 0);
        const minInterval = formatType === 'int' ? 1 :
            formatBitNumber ? 1 / (Math.pow(10, formatBitNumber)) : 0

        let temp_option = {
            ...item,
            type: item.type || "value",
            name,
            nameTextStyle: {
                align: "left",
                color: '#262626',
                ...item.nameTextStyle
            },
            nameGap: 15,
            // minInterval: minInterval,
            axisLine: {
                show: showAxisLine,
                lineStyle: {
                    color: "#E1E8F0"
                }
            }
        }
        // if (type && type == "dobule")
        temp_option.splitLine = _.get(item, 'splitLine', { show: false })
        if (axisLabel) temp_option["axisLabel"] = axisLabel;

        //最大最小值
        if (min) {
            if (min == "fun") {
                temp_option["min"] = (value) => {
                    let temp_format = label ? label : format;
                    let temp_value = getMinOrMaxValue(min_scaleIndex * value.min, temp_format);
                    return temp_value
                }
            } else temp_option["min"] = min;
        }
        if (max) {
            if (max == "fun") {
                temp_option["max"] = (value) => {
                    let temp_format = label ? label : format;
                    let temp_value = getMinOrMaxValue(max_scaleIndex * value.max, temp_format);
                    return temp_value;
                }
            }
            else temp_option["max"] = max;
        }

        //y
        yAxis_arr.push(temp_option)
    }

    try {
        //判断是否是 数组
        if (yAxis instanceof Array) {
            for (let y = 0, len = yAxis.length; y < len; y++) {
                let y_temp = yAxis[y];
                setYAxis(y_temp, 'dobule');
            }
        } else {
            setYAxis(yAxis);
        }
    } catch (error) {
        console.log("设置Y轴=" + error);
    }

    return yAxis_arr;
}


/**
 * 获取X轴数据
 * @param {object} option 
 * @param {object} xAxis 
 * @param {array} xData 
 */
function getXAxis(option, xAxis, xData, param, areaColorArr) {
    try {
        let type = xAxis.type || "value",
            name = xAxis.name || "",
            label = xAxis.axisLabel,
            axisLabel = setAxisLabelFormat(label, param);

        //设置X坐标轴
        let temp_xAxis = {
            type,
            name,
            data: xData,
            axisLine: {
                lineStyle: {
                    color: "#E1E8F0"
                }
            }
        };

        if (areaColorArr && areaColorArr.length) {
            temp_xAxis.splitArea = {
                show: true,
                interval: 0,
                areaStyle: {
                    color: areaColorArr
                }
            }
        }

        //
        if (axisLabel) temp_xAxis.axisLabel = axisLabel;

        option.xAxis = temp_xAxis;

    } catch (error) {
        console.log("设置X轴=" + error);
    }
    return option;
}

function setTooltipFormat(type, value, xAxis, yAxis, format) {
    if (type == "xAxis" && xAxis && xAxis.axisLabel) {
        return setFormatFun(xAxis.axisLabel, value, format)
    } else if (type == "yAxis" && yAxis) {
        let axisLabel = yAxis && (yAxis instanceof Array) ? (yAxis[0].format ? yAxis[0].format : yAxis[0].axisLabel) : (yAxis.format ? yAxis.format : yAxis.axisLabel);
        if (axisLabel) return setFormatFun(axisLabel, value, format)
    }
    return value;
}

function getTooltip(option, format, isHorizontal, showTooltipLabel = true) {
    let { xAxis, yAxis } = this.props;
    let { dataLabelFLag } = option
    try {
        let formatter = (params) => {
            let result = { title: '', values: [] }, html = [];
            if (params.length < 16) {
                params.forEach((item, index) => {
                    if (showTooltipLabel) {
                        if (!index) {
                            let label = setTooltipFormat("xAxis", item.axisValueLabel, xAxis, yAxis, format);
                            result.title = `${label}`; //${item.seriesName}
                            html.push(`${label}`); // ${item.seriesName}
                        }
                        const itemData = item.data
                        let data = ''
                        //dataLabelFLag == true 数据格式转换了 [111,"a"] =====> {value:111,...}
                        if (dataLabelFLag) {
                            data = itemData.value
                        } else {
                            if (Array.isArray(itemData)) {
                                data = itemData[1]
                                if (isHorizontal) {
                                    data = itemData[0]
                                }
                            } else {
                                // 添加特殊颜色后，itemData为object
                                data = itemData.value[1]
                                if (isHorizontal) {
                                    data = itemData.value[0]
                                }
                            }
                        }
                        let value = setTooltipFormat("yAxis", data, xAxis, yAxis, format);
                        result.values.push([item.seriesName ? item.marker : "", item.seriesName, value])
                        html.push(`${item.seriesName ? item.marker : ""} ${item.seriesName}: ${value}`);
                    } else {
                        let label = ''
                        if (!index) {
                            label = setTooltipFormat("xAxis", item.axisValueLabel, xAxis, yAxis, format);
                        }
                        // let data = item.data[1]
                        // if (isHorizontal) {
                        //     data = item.data[0]
                        // }
                        const itemData = item.data
                        let data = ''
                        if (Array.isArray(itemData)) {
                            data = itemData[1]
                            if (isHorizontal) {
                                data = itemData[0]
                            }
                        } else {
                            // 添加特殊颜色后，itemData为object
                            data = itemData.value[1]
                            if (isHorizontal) {
                                data = itemData.value[0]
                            }
                        }
                        let value = setTooltipFormat("yAxis", data, xAxis, yAxis, format);
                        result.values.push([item.marker, label, value])
                        html.push(`${item.marker} ${label}: ${value}`);
                    }
                })

                // console.log('htmlhtmlhtmlhtmlhtml', html, result)
                // return html.join('');

                return Tooltip({ params: result, xAxis})
            } else {
                html = ''
                params.forEach((item, index) => {
                    if (showTooltipLabel) {
                        if (!index) {
                            let label = setTooltipFormat("xAxis", item.axisValueLabel, xAxis, yAxis, format);
                            // html.push(`${label}<br/>`);
                            html += `<p style="display: block;height:20px;width: 100%;float:left;">
                                        <i style="width: 10px;height: 10px;display: inline-block;border-radius: 10px;"></i>
                                        <span>${label}</span>
                                    </p>`
                            result.title = label
                        }
                        let data = ""
                        if (dataLabelFLag) {
                            data = item.value
                        } else {
                            data = item.data[1]
                            if (isHorizontal) {
                                data = item.data[0]
                            }
                        }

                        let value = setTooltipFormat("yAxis", data, xAxis, yAxis, format);
                        // html.push(`${item.marker} ${item.seriesName}: ${value}<br/>`);
                        html += `<p style="display: block;height:20px;width: 20%;float:left;">
                                    <i style="width: 10px;height: 10px;display: inline-block;border-radius: 10px;"></i>
                                    <span>${item.marker} <span style="display:inline-block;width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align: bottom;">${item.seriesName}</span>: ${value}</span>
                                </p>`
                        result.values.push([item.marker, item.seriesName, value])
                    } else {
                        let label = ''
                        if (!index) {
                            label = setTooltipFormat("xAxis", item.axisValueLabel, xAxis, yAxis, format);
                        }
                        let data = item.data[1]
                        if (isHorizontal) {
                            data = item.data[0]
                        }
                        let value = setTooltipFormat("yAxis", data, xAxis, yAxis, format);
                        // html.push(`${item.marker} ${label}: ${value}<br/>`);
                        html += `<p style="display: block;height:20px;width: 20%;float:left;">
                                    <i style="width: 10px;height: 10px;display: inline-block;border-radius: 10px;"></i>
                                    <span>${item.marker} <span style="display:inline-block;width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align: bottom;">${label}</span>: ${value}</span>
                                </p>`
                        result.values.push([item.marker, label, value])
                    }
                })

                const text = '<div style="width: 1000px;">' + html + '<div>'
                // return text
                return Tooltip({ params: result, width: 1000, col: 5, xAxis})
            }
        }

        option.tooltip.formatter = formatter
    } catch (error) {
        console.log("Tooltip Formatter 出错", error);
    }
    return option;
}

// function getTooltip(option, format, isHorizontal, showTooltipLabel = true) {
//     let { xAxis, yAxis } = this.props;
//     try {
//         let formatter = (params) => {
//             let html
//             if (params.length < 16) {
//                 html = [];
//                 params.forEach((item, index) => {
//                     if (showTooltipLabel) {
//                         if (!index) {
//                             let label = setTooltipFormat("xAxis", item.axisValueLabel, xAxis, yAxis, format);
//                             html.push(`${label} ${item.seriesName}`);
//                         }
//                         const itemData = item.data
//                         let data = ''
//                         if (Array.isArray(itemData)) {
//                             data = itemData[1]
//                             if (isHorizontal) {
//                                 data = itemData[0]
//                             }
//                         } else {
//                             // 添加特殊颜色后，itemData为object
//                             data = itemData.value[1]
//                             if (isHorizontal) {
//                                 data = itemData.value[0]
//                             }
//                         }
//                         let value = setTooltipFormat("yAxis", data, xAxis, yAxis, format);
//                         html.push(`${item.seriesName ? item.marker : ""} ${item.seriesName}: ${value}`);
//                     } else {
//                         let label = ''
//                         if (!index) {
//                             label = setTooltipFormat("xAxis", item.axisValueLabel, xAxis, yAxis, format);
//                         }
//                         // let data = item.data[1]
//                         // if (isHorizontal) {
//                         //     data = item.data[0]
//                         // }
//                         const itemData = item.data
//                         let data = ''
//                         if (Array.isArray(itemData)) {
//                             data = itemData[1]
//                             if (isHorizontal) {
//                                 data = itemData[0]
//                             }
//                         } else {
//                             // 添加特殊颜色后，itemData为object
//                             data = itemData.value[1]
//                             if (isHorizontal) {
//                                 data = itemData.value[0]
//                             }
//                         }
//                         let value = setTooltipFormat("yAxis", data, xAxis, yAxis, format);
//                         html.push(`${item.marker} ${label}: ${value}`);
//                     }
//                 })

//                 console.log('htmlhtmlhtmlhtmlhtml', html)
//                 // return html.join('');
//                 return Tooltip({ html })
//             } else {
//                 html = ''
//                 params.forEach((item, index) => {
//                     if (showTooltipLabel) {
//                         if (!index) {
//                             let label = setTooltipFormat("xAxis", item.axisValueLabel, xAxis, yAxis, format);
//                             // html.push(`${label}<br/>`);
//                             html += `<p style="display: block;height:20px;width: 100%;float:left;">
//                                         <i style="width: 10px;height: 10px;display: inline-block;border-radius: 10px;"></i>
//                                         <span>${label}</span>
//                                     </p>`
//                         }
//                         let data = item.data[1]
//                         if (isHorizontal) {
//                             data = item.data[0]
//                         }
//                         let value = setTooltipFormat("yAxis", data, xAxis, yAxis, format);
//                         // html.push(`${item.marker} ${item.seriesName}: ${value}<br/>`);
//                         html += `<p style="display: block;height:20px;width: 20%;float:left;">
//                                     <i style="width: 10px;height: 10px;display: inline-block;border-radius: 10px;"></i>
//                                     <span>${item.marker} <span style="display:inline-block;width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align: bottom;">${item.seriesName}</span>: ${value}</span>
//                                 </p>`
//                     } else {
//                         let label = ''
//                         if (!index) {
//                             label = setTooltipFormat("xAxis", item.axisValueLabel, xAxis, yAxis, format);
//                         }
//                         let data = item.data[1]
//                         if (isHorizontal) {
//                             data = item.data[0]
//                         }
//                         let value = setTooltipFormat("yAxis", data, xAxis, yAxis, format);
//                         // html.push(`${item.marker} ${label}: ${value}<br/>`);
//                         html += `<p style="display: block;height:20px;width: 20%;float:left;">
//                                     <i style="width: 10px;height: 10px;display: inline-block;border-radius: 10px;"></i>
//                                     <span>${item.marker} <span style="display:inline-block;width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align: bottom;">${label}</span>: ${value}</span>
//                                 </p>`
//                     }
//                 })

//                 const text = '<div style="width: 1000px;">' + html + '<div>'
//                 return text
//             }
//         }

//         option.tooltip.formatter = formatter
//     } catch (error) {
//         console.log("Tooltip Formatter 出错", error);
//     }
//     return option;
// }

function getNewLegend(params) {
    const { data, color, type, mixType } = params;
    const { legend, formatArr } = data || { legend: [], formatArr: [] };
    return _.map(legend, (item, idx) => {
        const typeIdx = idx % _.size(legend);
        const colorIdx = idx % _.size(color);
        const getType = () => {
            if (type === 'mix') {
                return mixType[typeIdx] || 'bar'
            }
            return type;
        }

        const detail_code = _.get(formatArr, `[${idx}].detail_code`, '')
        return {
            name: `${detail_code}${item}`,
            type: getType(),
            color: color[colorIdx]
        }
    })
}

export {
    getMarkPoint,
    getIfDoubleAxis,
    getSeriesData,
    getSeriesDataForBar,
    getLegend,
    getYAxis,
    getXAxis,
    getTooltip,
    setAxisLabelFormat,
    getNewLegend
}