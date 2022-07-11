'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../baseComponent';
import { setFormatFun, getMinOrMaxValue } from '../util';
import { transformText } from '../../../locales/index';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';
import i18n from '@/plugin/i18n'
import Tooltip from '../Tooltip';
import _ from 'lodash';

const LANGUAGE = i18n.getLocalLanguage()

class Index extends BaseComponent {
    getTooltipFormatValue = (type, seriesIndex, value, seriesName) => {
        let { xAxis, yAxis } = this.props;
        if (type == "xAxis" && xAxis && xAxis.axisLabel) {
            return setFormatFun(xAxis.axisLabel, value)
        } else if (type == "yAxis" && yAxis) {
            let axisLabel = null;
            if (yAxis && (yAxis instanceof Array)) {
                if (yAxis[seriesIndex]) {
                    axisLabel = yAxis[seriesIndex].format ? yAxis[seriesIndex].format : yAxis[seriesIndex].axisLabel
                } else if (yAxis.length === 1) {
                    axisLabel = yAxis[0].format
                } else if (seriesIndex > 1) {
                    // 解决多条数据，无法分类的情况
                    const seriesKey = LANGUAGE === "zh_CN" ? "同比增速" : "YoY"
                    if (seriesName.indexOf(seriesKey) > -1) {
                        axisLabel = yAxis[1].format ? yAxis[1].format : yAxis[1].axisLabel
                    } else {
                        axisLabel = yAxis[0].format
                    }
                } else {
                    axisLabel = yAxis[1].format ? yAxis[1].format : yAxis[1].axisLabel
                }
            } else {
                axisLabel = yAxis.format ? yAxis.format : yAxis.axisLabel;
            }
            if (axisLabel) return setFormatFun(axisLabel, value)
        }
        return value;
    }
    getTooltipFormatText = (value) => {
        let { xAxis } = this.props;
        if (!xAxis) return "";
        let format = xAxis.axisLabel;
        let text = "";
        if (format.constructor == Array) {
            format = format[0]
        }
        try {
            if (format.date_type == "week") {
                let startDate = moment(value, "GGGGWW").startOf('isoWeek').format('YYYY-MM-DD'),
                    endDate = moment(value, "GGGGWW").endOf('isoWeek').format('YYYY-MM-DD');
                text = `（${startDate} ${transformText("common_to")} ${endDate}）`;
            }
        } catch (error) {
            console.log("格式化图表日期展示方式  出错 ：" + error);
        }
        return text;
    }
    //设置坐标轴 格式化单位
    setAxisLabelFormat = (label) => {
        let axisLabel = null;
        if (label) {
            axisLabel = {
                color: '#595959',
                showMinLabel: true,
                showMaxLabel: true,
                formatter: (value, index) => {
                    return setFormatFun(label, value)
                }
            }
        }
        return axisLabel;
    }
    renderChart = ({ id, hideDataZoom, title, legend, mixType, xAxis, yAxis, grid, ifShowSymbol, color, optionRender, ifStack, ifMultiaxial, legendSelected, showAxisLine, setChartTitle }) => {
        const _this = this;
        const { echarts, option, chartData } = _this.state;
        let currOption = cloneDeep(option);

        let ele_id = document.getElementById(id);
        if (!ele_id || !chartData || !echarts) return null;

        console.log('chartDatachartData', chartData);

        let lineChart = echarts.getInstanceByDom(ele_id);
        if (!lineChart) lineChart = echarts.init(ele_id);

        try {
            let legendName = chartData.legend,
                xData = chartData.xData,
                series = chartData.series,
                markPoint = chartData.markPoint,
                formatArr = chartData.formatArr,
                areaColorArr = chartData.areaColorArr;

            //是否是Y双坐标轴
            let ifDouble = _this.getIfDoubleAxis(yAxis, series);

            const getShowAxisLine = (idx) => {
                const values = _.map(series[idx], ([, value]) => value)
                const flag = (series[idx] && !_.isEmpty(values)) ? true : false;

                if (idx === 1 && !flag) {
                    _.set(grid, 'right', 48)
                }
                return flag
            }

            // 多柱多曲线
            if (ifMultiaxial) {//&& series.length > 2) {
                for (let i = 0, len = series.length; i < len; i++) {
                    let name = legendName[i];
                    const index = legendName.indexOf(name)
                    const _name = formatArr ? `${formatArr[i].detail_code ? formatArr[i].detail_code + '-' : ''}${name}` : name
                    let temp = series[i];
                    let series_data = {
                        data: temp,
                        name: _name,
                        max: "dataMax",
                        min: 0,
                        type: mixType[index] || "line",
                        barMaxWidth: '40%',
                        emphasis: {
                            disabled: mixType[i] === 'bar' ? true : false
                        }
                    }
                    if (ifDouble) {
                        // 解决多条数据，无法分类的情况
                        if (index > 1) {
                            const seriesKey = LANGUAGE === "zh_CN" ? "同比增速" : "YoY"
                            if (name.indexOf(seriesKey) > -1) {
                                series_data["yAxisIndex"] = 1;
                            } else {
                                series_data["yAxisIndex"] = 0;
                            }
                        } else {
                            series_data["yAxisIndex"] = index;
                        }
                    }
                    // if (!ifShowSymbol) series_data["showSymbol"] = false;
                    series_data["showSymbol"] = false
                    if (markPoint) {
                        series_data = Object.assign({}, series_data, _this.getMarkPoint(markPoint[name]))
                    }
                    // 堆积图+折线图，仅支持柱状图堆积
                    if (mixType[i] == 'bar' && ifStack) { series_data["stack"] = i18n.format("全部"); series_data.yAxisIndex = 0 }
                    else if (ifStack) { series_data.yAxisIndex = 1 }

                    currOption.series.push(series_data)
                }
                //设置其他项
                //设置title
                currOption = _this.getLegend(currOption, title, series, legend);
                //设置Y轴
                if (yAxis) {
                    let yAxis_arr = [];

                    let setYAxis = (item, type, idx) => {
                        let yType = item.type || "value",
                            name = i18n.format(item.name || ""),
                            label = item.axisLabel,
                            format = item.format,
                            min = item.min,
                            min_scaleIndex = item.min_scaleIndex || 0.8,
                            max = item.max,
                            max_scaleIndex = item.max_scaleIndex || 1.2,
                            axisLabel = _this.setAxisLabelFormat(label);

                        let _temp_option = {
                            type: yType,
                            name: i18n.format(name),
                            nameTextStyle: {
                                align: idx === 0 ? "left" : 'right',
                                // padding: [0, 0, 0, -50],
                                color: '#262626'
                            },
                            axisLine: {
                                show: getShowAxisLine(idx) && showAxisLine,
                                lineStyle: {
                                    color: "#E1E8F0"
                                }
                            }
                        }
                        if (type && type == "dobule") _temp_option.splitLine = { show: false }
                        if (axisLabel) _temp_option["axisLabel"] = axisLabel;

                        //最大最小值
                        if (min) {
                            if (min == "fun") {
                                _temp_option["min"] = (value) => {
                                    let temp_format = label ? label : format;
                                    let temp_value = getMinOrMaxValue(min_scaleIndex * value.min, temp_format);
                                    return temp_value
                                }
                            } else _temp_option["min"] = min;
                        }
                        if (max) {
                            if (max == "fun") {
                                _temp_option["max"] = (value) => {
                                    let temp_format = label ? label : format;
                                    let temp_value = getMinOrMaxValue(max_scaleIndex * value.max, temp_format);
                                    return temp_value;
                                }
                            }
                            else _temp_option["max"] = max;
                        }

                        //y
                        yAxis_arr.push(_temp_option)
                    }

                    //判断是否是 数组
                    const len = yAxis.length > 2 ? 2 : yAxis.length
                    // const len = yAxis.length
                    if (yAxis instanceof Array) {
                        // if (len === 1) {
                        //     setYAxis(yAxis[0]);
                        // } else {
                        for (let y = 0; y < len; y++) {
                            let y_temp = yAxis[y];
                            setYAxis(y_temp, 'dobule', y);
                        }
                        // }
                    } else {
                        setYAxis(yAxis);
                    }
                    //设置Y坐标轴
                    currOption.yAxis = yAxis_arr;
                }

            } else {
                // 普通mix
                //add series data
                for (let i = 0, len = series.length; i < len; i++) {
                    let temp = series[i];
                    let name = legendName[i];
                    let series_data = {
                        data: temp,
                        name,
                        max: "dataMax",
                        min: 0,
                        type: mixType[i] || "line",
                        barMaxWidth: '40%',
                        emphasis: {
                            disabled: mixType[i] === 'bar' ? true : false
                        }
                    }
                    if (ifDouble) series_data["yAxisIndex"] = i;
                    // if (!ifShowSymbol) series_data["showSymbol"] = false;
                    series_data["showSymbol"] = false
                    if (markPoint) {
                        series_data = Object.assign({}, series_data, _this.getMarkPoint(markPoint[name]))
                    }
                    // 堆积图+折线图，仅支持柱状图堆积
                    if (mixType[i] == 'bar' && ifStack) { series_data["stack"] = i18n.format("全部"); series_data.yAxisIndex = 0 }
                    else if (ifStack) { series_data.yAxisIndex = 1 }

                    currOption.series.push(series_data)
                }

                //设置其他项
                //设置title
                currOption = _this.getLegend(currOption, title, series, legend);

                //设置Y轴
                if (yAxis) {
                    let yAxis_arr = [];

                    let setYAxis = (item, type, index) => {
                        console.log('fafsfasfasfasfasfas', getShowAxisLine(index));
                        let yType = item.type || "value",
                            name = i18n.format(item.name || ""),
                            label = item.axisLabel,
                            format = item.format,
                            min = item.min,
                            min_scaleIndex = item.min_scaleIndex || 0.8,
                            max = item.max,
                            max_scaleIndex = item.max_scaleIndex || 1.2,
                            axisLabel = _this.setAxisLabelFormat(label);

                        let _temp_option = {
                            type: yType,
                            name: i18n.format(name),
                            nameTextStyle: {
                                align: index === 0 ? "left" : 'right',
                                // padding: [0, 0, 0, -50],
                                color: '#262626'
                            },
                            axisLine: {
                                show: getShowAxisLine(index) && showAxisLine,
                                lineStyle: {
                                    color: "#E1E8F0"
                                }
                            }
                        }
                        if (type && type == "dobule") _temp_option.splitLine = { show: false }
                        if (axisLabel) _temp_option["axisLabel"] = axisLabel;

                        //最大最小值
                        if (min) {
                            if (min == "fun") {
                                _temp_option["min"] = (value) => {
                                    let temp_format = label ? label : format;
                                    let temp_value = getMinOrMaxValue(min_scaleIndex * value.min, temp_format);
                                    return temp_value
                                }
                            } else _temp_option["min"] = min;
                        }
                        if (max) {
                            if (max == "fun") {
                                _temp_option["max"] = (value) => {
                                    let temp_format = label ? label : format;
                                    let temp_value = getMinOrMaxValue(max_scaleIndex * value.max, temp_format);
                                    return temp_value;
                                }
                            }
                            else _temp_option["max"] = max;
                        }

                        //y
                        yAxis_arr.push(_temp_option)
                    }

                    //判断是否是 数组
                    if (yAxis instanceof Array) {
                        for (let y = 0, len = yAxis.length; y < len; y++) {
                            let y_temp = yAxis[y];
                            setYAxis(y_temp, 'dobule', y);
                        }
                    } else {
                        setYAxis(yAxis);
                    }
                    //设置Y坐标轴
                    currOption.yAxis = yAxis_arr;
                }
            }



            //设置X轴数据
            if (xAxis) {
                currOption = _this.getXAxis(currOption, xAxis, xData, {}, areaColorArr);
            }

            //tooltip formatter
            currOption.tooltip.formatter = (params) => {
                const ifStack = _this.props.ifStack
                let html = [];
                let result = { title: '', values: [] }
                let stackSum = 0;
                let stackMarker = ''
                let isAllStackBar = false
                const len = params.length
                params.forEach((item, index) => {
                    if (!index) {
                        let label = _this.getTooltipFormatValue("xAxis", item.seriesIndex, item.axisValueLabel, item.seriesName),
                            axislabel = _this.getTooltipFormatText(item.axisValueLabel);
                        html.push(`${label}${axislabel}<br/>`);
                        result.title = label;
                    }

                    let value = ''

                    let yData
                    // 添加特殊颜色后，不是数组，是对象
                    if (Array.isArray(item.data)) {
                        yData = item.data[1]
                    } else {
                        yData = item.data.value[1]
                    }

                    // 堆积图累加
                    if (ifStack && item.seriesType === 'bar') {
                        value = _this.getTooltipFormatValue("yAxis", 0, yData)
                        stackSum += yData;
                        stackMarker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#c4ebad;"></span>';
                        // 最后一个
                        if (index === params.length - 1) {
                            isAllStackBar = true
                        }
                    } else {
                        if (ifStack && index === params.length - 1) {
                            // 最后一个不是堆积
                            // 堆积 && 最后一个
                            value = _this.getTooltipFormatValue("yAxis", 1, yData)
                            //params[0].seriesIndex
                            if (item.seriesName == i18n.format("同比增速") && params.length <= 1) {

                            } else {
                                html.push(`${stackMarker} ${i18n.format("全部")}: ${_this.getTooltipFormatValue("yAxis", 0, stackSum)}<br/>`);
                                result.values.push([stackMarker, i18n.format("全部"), _this.getTooltipFormatValue("yAxis", 0, stackSum)])
                            }

                        } else {
                            // 不是堆积
                            value = _this.getTooltipFormatValue("yAxis", item.seriesIndex, yData, item.seriesName)
                        }
                    }
                    if (len < 16) {
                        html.push(`${item.marker} ${item.seriesName}: ${value}<br/>`);
                        result.values.push([item.marker, item.seriesName, value])
                    } else {
                        html.push(`<p style="display: block;height:20px;width: 20%;float:left;">
                                        <i style="width: 10px;height: 10px;display: inline-block;border-radius: 10px;"></i>
                                        <span>${item.marker} <span style="display:inline-block;width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align: bottom;">${item.seriesName}</span>: ${value}</span>
                                    </p>`)
                        result.values.push([item.marker, item.seriesName, value])
                    }
                    // 只有堆积数据时，添加累计
                    if (isAllStackBar) {
                        if (len < 16) {
                            html.push(`${stackMarker} ${i18n.format("全部")}: ${_this.getTooltipFormatValue("yAxis", 0, stackSum)}<br/>`);
                            result.values.push([stackMarker, i18n.format("全部"), _this.getTooltipFormatValue("yAxis", 0, stackSum)])
                        } else {
                            html.push(`<p style="display: block;height:20px;width: 20%;float:left;">
                                    <i style="width: 10px;height: 10px;display: inline-block;border-radius: 10px;"></i>
                                    <span>${stackMarker} <span style="display:inline-block;width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align: bottom;"> ${i18n.format("全部")}</span>: ${_this.getTooltipFormatValue("yAxis", 0, stackSum)}</span>
                                </p>`)
                            result.values.push([stackMarker, i18n.format("全部"), _this.getTooltipFormatValue("yAxis", 0, stackSum)])
                        }
                    }
                })
                let _html = ''
                if (len < 16) {
                    // _html = html.join('');
                    return Tooltip({
                        params: result,
                        xAxis
                    })
                } else {
                    // _html = '<div style="width: 1000px;padding-right: 10px ">' + html.join('') + '<div>'
                    return Tooltip({
                        params: result,
                        width: 1000,
                        col: 5,
                        xAxis
                    })
                }
                // return _html
                return Tooltip({
                    params: result,
                    xAxis

                })
            }

            //设置颜色
            if (color) {
                currOption.color = color;
            }

            //图表
            if (grid) {
                if (!currOption.grid) {
                    currOption.grid = {}
                }
                currOption.grid.right = '80px'
                // currOption.grid.right = '7%'
                currOption.grid = Object.assign({}, currOption.grid, grid);
            }

            if (hideDataZoom) {
                currOption.dataZoom[0]["show"] = false;
            }
        } catch (error) {
            console.log(error);
        }

        //定制化更改数据
        if (optionRender) {
            currOption = optionRender(currOption, chartData);
        }

        // 设置标题
        setChartTitle && setChartTitle(_.get(currOption, 'title.text'))

        //render chart
        // if (currOption.series && currOption.series.length && currOption.series[0].data && currOption.series[0].data.length <= 5) currOption.series[0].barMaxWidth = '10%';
        // console.log('fasafsafsfasffasfas', JSON.stringify(currOption, null, 2))
        // console.log('fasafsafsfasfaasfasfs', currOption)
        lineChart.clear()
        lineChart.setOption(currOption);

        if (legendSelected && legendSelected instanceof Function) {
            lineChart.on('legendselectchanged', legendSelected)
        }

        //add listener
        window.addEventListener("resize", () => {
            if (lineChart) {
                lineChart.resize();
            }
        });
    }
}

Index.propTypes = {
    optionRender: PropTypes.func
};

export default Index;