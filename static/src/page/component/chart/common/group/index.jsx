'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../baseComponent';
import cloneDeep from 'lodash/cloneDeep';

class Index extends BaseComponent {
    renderChart = ({ id, hideDataZoom, legend, title, xAxis, yAxis, params, grid, color, optionRender, ifBarLabel, legendSelected, setChartTitle }) => {
        const { echarts, option, chartData } = this.state;
        let currOption = cloneDeep(option);

        let ele_id = document.getElementById(id);
        if (!ele_id || !chartData || !echarts) return null;

        let barChart = echarts.getInstanceByDom(ele_id);
        if (!barChart) barChart = echarts.init(ele_id);

        try {
            let legendName = chartData.legend,
                xData = chartData.xData,
                series = chartData.series;


            //add series chartData
            currOption.series = this.getSeriesDataForBar(series, legendName, null, null, null, ifBarLabel);


            //设置其他项
            //设置title
            currOption = this.getLegend(currOption, title, series, legend);

            //设置x轴
            if (xAxis) {
                let xAxis_arr = [];

                let setXAxis = (item, type) => {
                    let yType = item.type || "value",
                        inverse = item.inverse,
                        nameGap = item.nameGap,
                        offset = item.offset,
                        nameLocation = item.nameLocation,
                        splitArea = item.splitArea,
                        name = item.name || "",
                        min = item.min,
                        scaleIndex = 0.8,
                        max = item.max,
                        label = item.axisLabel,
                        axisLabel = this.setAxisLabelFormat(label);
                    let _temp_option = {
                        type: yType,
                        name,
                    }
                    if (type && type == "dobule") _temp_option.splitLine = { show: false }
                    if (axisLabel) _temp_option["axisLabel"] = axisLabel;

                    if (min) {
                        if (min == "fun") _temp_option["min"] = (value) => scaleIndex * value.min;
                        else _temp_option["min"] = min;
                    }
                    if (max) {
                        if (max == "fun") _temp_option["max"] = (value) => scaleIndex * value.max;
                        else _temp_option["max"] = max;
                    }
                    if (inverse) {
                        _temp_option["inverse"] = inverse;
                    }
                    if (nameLocation) {
                        _temp_option["nameLocation"] = nameLocation;
                    }
                    if (nameGap) {
                        _temp_option["nameGap"] = nameGap;
                    }
                    if (offset) {
                        _temp_option["offset"] = offset;
                    }
                    if (splitArea) {
                        _temp_option["splitArea"] = splitArea;
                    }

                    //x
                    xAxis_arr.push(_temp_option)
                }


                setXAxis(xAxis);
                //设置Y坐标轴
                currOption.xAxis = xAxis_arr;
            }

            //设置y轴
            //设置y轴数据
            if (yAxis) {
                let type = yAxis.type || "value",
                    name = yAxis.name || "",
                    show = yAxis.show,
                    position = yAxis.position,
                    label = yAxis.axisLabel,
                    axisLabel = this.setAxisLabelFormat(label);

                //设置Y坐标轴
                currOption.yAxis = {
                    type,
                    name,
                    chartData: xData,
                };

                if (show === false) {
                    currOption.yAxis.show = false;
                }
                if (position) {
                    currOption.yAxis.position = position;
                }

                //
                if (axisLabel) currOption.yAxis.axisLabel = axisLabel;
            }

            //设置颜色
            if (color) {
                currOption.color = color;
            }
            if (grid) {
                currOption.grid = grid;
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

        barChart.group = "groupChart";
        //render chart
        barChart.clear()
        barChart.setOption(currOption);
        echarts.connect('groupChart');

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