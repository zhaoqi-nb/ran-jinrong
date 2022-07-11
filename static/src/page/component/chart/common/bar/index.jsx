'use strict';

import React from 'react';
import BaseComponent from '../baseComponent';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import { transTableDateType, unitTransformation } from '../../../../../utils/Util';
import _ from 'lodash'

class Index extends BaseComponent {
    renderChart = ({ id, hideDataZoom, title, xAxis, yAxis, ifStack, color, params, optionRender, ifBarLabel, grid, legend, legendSelected, isHorizontal, ifMultiaxial, setChartTitle, showDataZoomLength, dataLabelFLag, showAxisLine }) => {
        const { echarts, option, chartData } = this.state;
        let currOption = cloneDeep(option);

        let ele_id = document.getElementById(id);
        if (!ele_id || !chartData || !echarts) return null;

        let barChart = echarts.getInstanceByDom(ele_id);
        if (!barChart) barChart = echarts.init(ele_id);

        try {
            let legendName = chartData.legend,
                xData = chartData.xData,
                series = chartData.series,
                markPoint = chartData.markPoint,
                areaColorArr = chartData.areaColorArr;

            if (ifMultiaxial && chartData.formatArr) {
                legendName = []
                chartData.formatArr.map(item => {
                    legendName.push(item.detail_code ? `${item.detail_code}${item.name}` : item.name)
                })
            }

            //是否是Y双坐标轴
            let ifDouble = this.getIfDoubleAxis(yAxis);

            //add series chartData
            currOption.series = this.getSeriesDataForBar(series, legendName, markPoint, ifDouble, ifStack, ifBarLabel);

            //设置其他项
            //设置title
            currOption = this.getLegend(currOption, title, series, legend);

            //设置Y轴
            if (yAxis) {
                currOption.yAxis = this.getYAxis(yAxis, params, showAxisLine);
            }

            //设置X轴数据
            if (xAxis) {
                currOption = this.getXAxis(currOption, xAxis, xData, params, areaColorArr);
            }

            //设置颜色
            if (color) {
                currOption.color = color;
            }

            //图表
            if (grid) {
                currOption.grid = Object.assign({}, currOption.grid, grid);
            }

            //tooltip formatter
            currOption = this.getTooltip({ ...currOption, dataLabelFLag }, params, isHorizontal);

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

        //切换方向
        if (isHorizontal) {
            const xAxis = cloneDeep(currOption.xAxis)
            const yAxis = cloneDeep(currOption.yAxis)
            const series = cloneDeep(currOption.series)
            // yAxis[0].nameLocation = 'center'
            // yAxis[0].nameTextStyle.align = 'center'
            // yAxis[0].nameTextStyle.padding = [10, 0, 0, 0]
            yAxis[0].name = ''
            currOption.xAxis = yAxis
            const { ifReverse } = isHorizontal
            if (ifReverse) {
                currOption.yAxis = {
                    ...xAxis,
                    data: xAxis.data.reverse()
                }
            } else {
                currOption.yAxis = {
                    ...xAxis,
                    // data: xAxis.data.reverse()
                }
            }
            // 如果显示数据标签x轴距离左侧加距离
            if (dataLabelFLag) {
                currOption.yAxis.offset = 35
                currOption.grid.left = 51
            }
            try {
                const newSeries = series.map(item => {
                    return {
                        ...item,
                        data: item.data.map(_item => {
                            let new_item = _item
                            if (Array.isArray(_item)) {
                                new_item = _item.reverse()
                                //展示柱状图label normal
                                if (dataLabelFLag) {
                                    new_item = {
                                        value: new_item[0],
                                        label: {
                                            show: true,
                                            position: new_item[0] > 0 ? "right" : "left",
                                            formatter({ value }) {
                                                let format = yAxis[0].format,
                                                    divide = format.divide,
                                                    showValue = _.cloneDeep(value);
                                                if (format.type == "int") {
                                                    if (divide == "10000") {
                                                        showValue = unitTransformation(showValue, "万", format.bit_number)
                                                    } else if (divide == "100000") {
                                                        showValue = unitTransformation(showValue, "十万", format.bit_number)
                                                    } else if (divide == "1000000") {
                                                        showValue = unitTransformation(showValue, "百万", format.bit_number)
                                                    } else {
                                                        showValue = transTableDateType(showValue, { type: "int", thousands: true, bit_number: format.bit_number })
                                                    }
                                                } else if (format.type == "percent") {
                                                    showValue = transTableDateType(showValue, { type: "percent", bit_number: format.bit_number })
                                                }
                                                return `${showValue}`;
                                            }
                                        }
                                    }
                                }
                            } else {
                                new_item = { ..._item, value: _item.value.reverse() }
                            }
                            return new_item
                        })
                    }
                })
                currOption.series = newSeries
                if (showDataZoomLength && newSeries[0].data.length >= showDataZoomLength) {
                    currOption.dataZoom = {
                        show: true,
                        type: 'slider',
                        yAxisIndex: 0,
                        left: 10,
                        startValue: newSeries[0].data.length - showDataZoomLength,
                        textStyle: {
                            //隐藏文字
                            opacity: 0
                        }
                    }
                    currOption.grid.left += 40
                } else {
                    currOption.dataZoom = {
                        show: false
                    }
                }
            } catch (err) {
                console.log('error: 转换series出错，', err)
            }
        }

        // 设置标题
        setChartTitle && setChartTitle(_.get(currOption, 'title.text'))
        //render chart
        barChart.clear()
        barChart.setOption(currOption);

        // console.log('fasfasfasfasfas', JSON.stringify(currOption, null, 2));
        // console.log('fasfasfasfasfas', currOption);

        if (legendSelected && legendSelected instanceof Function) {
            barChart.on('legendselectchanged', legendSelected)
        }

        //add listener
        window.addEventListener("resize", () => {
            if (barChart) {
                barChart.resize();
            }
        });
    }
}

Index.propTypes = {
    optionRender: PropTypes.func
};

export default Index;