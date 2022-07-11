'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../baseComponent';
import cloneDeep from 'lodash/cloneDeep';
import _ from 'lodash';

class Index extends BaseComponent {
    renderChart = ({ id, hideDataZoom, legend, title, xAxis, yAxis, grid, params, ifShowSymbol, color, optionRender, minSeriesOption, legendSelected, showTooltipLabel, showAxisLine, ifMultiaxial, setChartTitle }) => {
        const { echarts, option, chartData } = this.state;
        let currOption = cloneDeep(option);

        let ele_id = document.getElementById(id);
        if (!ele_id || !chartData || !echarts) return null;

        let lineChart = echarts.getInstanceByDom(ele_id);
        if (!lineChart) lineChart = echarts.init(ele_id);
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
            currOption.series = this.getSeriesData(series, legendName, markPoint, ifDouble, ifShowSymbol, minSeriesOption);
            console.log('currOptioncurrOption', currOption)
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

            // 图表
            if (grid) {
                currOption.grid = Object.assign({}, currOption.grid, grid);
            }

            //tooltip formatter
            currOption = this.getTooltip(currOption, params, false, showTooltipLabel);

            if (hideDataZoom) {
                currOption.dataZoom[0]["show"] = false;
            }

        } catch (error) {
            console.log(error);
        }

        //定制化更改数据
        if (optionRender) {
            currOption = optionRender(currOption, chartData, params);
        }

        // 设置标题
        setChartTitle && setChartTitle(_.get(currOption, 'title.text'))
        // const {appendToBody} = this.props; appendToBody && 
        _.set(currOption, 'tooltip.appendToBody', true)
        console.log('currOptioncurrOption', currOption)
        //render chart
        lineChart.clear()
        lineChart.setOption(currOption);

        // console.log('currOptioncurrOption', JSON.stringify(currOption, null, 2));

        if (legendSelected && legendSelected instanceof Function) {
            lineChart.on('legendselectchanged', legendSelected)
        }

        //add listener
        window.addEventListener("resize", () => {
            if (lineChart) {
                lineChart.resize();
            }
        });
        window.addEventListener("onload", () => {
            if (lineChart) {
                lineChart.resize();
            }
        });

        this.lineChart = lineChart
    }

    componentWillUnmount() {
        if (this.lineChart) {
            this.lineChart.dispose()
        }
    }
}

Index.propTypes = {
    optionRender: PropTypes.func
};

export default Index;