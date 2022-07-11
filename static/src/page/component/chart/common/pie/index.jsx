'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../baseComponent';
import { transTableDateType } from '../../../util/format/number';

import cloneDeep from 'lodash/cloneDeep';

class Index extends BaseComponent {
    getInitialState = () => {
        return {
            //组件是否准备就绪
            isReady: false,
            option: {
                title: {
                    text: "",
                    left: "center"
                },
                tooltip: {
                    trigger: 'item',
                    confine: true,
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                series: []
            },
            //echart对象
            echarts: null,
            chartType: 'pie'
        }
    }

    translationalData = (data = [], format) => {
        let temp = [];
        //只展示占比
        if (!format || !format.length) {
            for (let i = 0, len = data.length; i < len; i++) {
                let arr = data[i];
                temp.push({ value: arr[1], name: arr[0] })
            }
        } else {
            //占比和数值
            let flagIndexArr = null,    //生成图的下标
                flagIndexBrr = null;    //展示的下标

            format.forEach((item, index) => {
                if (item.format == 'percent') flagIndexArr = index
                else flagIndexBrr = index
            })
            let arr = data[flagIndexArr],
                brr = data[flagIndexBrr];

            arr.forEach((item, index) => {
                let obj = { name: item[0], value: item[1], showValue: brr ? brr[index][1] : item[1], format }
                temp.push(obj)
            })
        }

        return temp;
    }

    setCurrOption = (currOption, arr, title) => {
        if (arr && arr.length > 1) {
            currOption.legend = {
                "type": 'scroll',
                // "orient": 'vertical',
                // "right": 0,
                // "top": 50,
                // "bottom": 20,
                "bottom": 0,
                "icon": "circle",
                itemWidth: 8,
                itemHeight: 8,
                itemGap: 16,
                textStyle: {
                    fontSize: 12,
                    color: '#262626'
                }
            }
            currOption.tooltip = {
                trigger: 'item',
                confine: true,
                formatter: (param) => {
                    let datas = param.data,
                        showValueItem = null,
                        valueIndexItem = null;
                    datas.format.forEach((item, index) => {
                        if (item.format == 'long') showValueItem = item
                        else valueIndexItem = item
                    })
                    // border-bottom: 1px solid #ccc;
                    // let html = `<p style=""></p>` 
                    let html = ``
                        + `${param.marker}  ${datas.name} <span style="font-weight: 500; padding: 0 10px;">${showValueItem && showValueItem.divide ? transTableDateType(datas.showValue, { divide: showValueItem.divide, bit_number: showValueItem.bit_number, thousands: true }) : transTableDateType(datas.showValue, { type: "int", thousands: true })}</span>`
                        + `<span style="background: #E6F1FF; font-family: ArialMT; display: inline-block;border-radius: 4px; padding: 0 3px;">${transTableDateType(datas.value, { type: "percent", bit_number: valueIndexItem.bit_number })}</span>`
                    return html
                }
            }
        } else {
            currOption.legend = {
                "type": 'scroll',
                // "orient": 'vertical',
                // "right": 0,
                // "top": "middle",
                "top": 0,
                // "top": 50,
                // "bottom": 20,
                // "bottom": 0,
                "icon": "circle",
                itemWidth: 8,
                itemHeight: 8,
                itemGap: 16,
                textStyle: {
                    fontSize: 12,
                    color: '#262626'
                }
            }
            currOption.tooltip = {
                trigger: 'item',
                confine: true,
                formatter: (param) => {
                    let datas = param.data,
                        showValueItem = null,
                        valueIndexItem = null;
                    datas.format.forEach((item, index) => {
                        if (item.format == 'long') showValueItem = item
                        else valueIndexItem = item
                    })
                    // border-bottom: 1px solid #ccc;
                    // let html = `<p style=""></p>` 
                    let html = `${param.marker}  ${datas.name} <span style="background: #E6F1FF; font-family: ArialMT; display: inline-block;border-radius: 4px; padding: 0 3px;">${transTableDateType(datas.value, { type: "percent", bit_number: valueIndexItem.bit_number })}</span>`
                    return html
                }
            }
        }
        if (title.constructor === String) {
            currOption.title = {
                text: title,
                left: 'left'
            }
        } else if (title.constructor === Object) {
            currOption.title = Object.assign({ left: 'left' }, title)
        }

        currOption.dataZoom = [{
            show: false,
            type: 'slider',
        }]
        delete currOption.xAxis
        delete currOption.yAxis
        return currOption
    }
    renderChart = ({ id, title, optionRender, color, radius, legendSelected, setChartTitle }) => {
        const { echarts, option, chartData } = this.state;
        const { showLabel } = this.props
        const _this = this
        let currOption = cloneDeep(option);

        let ele_id = document.getElementById(id);
        if (!ele_id || !chartData || !echarts) return null;

        let pieChart = echarts.getInstanceByDom(ele_id);
        if (!pieChart) pieChart = echarts.init(ele_id);

        try {
            let legend = null,
                series = chartData.series;

            const label = showLabel ? {} : {
                show: false,
                position: 'center'
                // position: "outside"
            }
            //add series data
            currOption.series.push({
                data: _this.translationalData(series, chartData.format),
                type: 'pie',
                radius,
                // label: {
                //     formatter: '{d}%'
                // },
                radius: ["45%", "60%"],
                avoidLabelOverlap: true,
                // center: ['30%', '50%'], 
                center: ['50%', '45%'],
                label,
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '24',
                        fontWeight: 'bold',
                        formatter: (param) => {
                            let datas = param.data,
                                showValueItem = null,
                                valueIndexItem = null;
                            datas.format.forEach((item, index) => {
                                if (item.format == 'long') showValueItem = item
                                else valueIndexItem = item
                            })
                            return transTableDateType(datas.value, { type: "percent", bit_number: valueIndexItem.bit_number })
                        }
                    }
                },
            })

            //设置其他项
            //设置title
            // currOption = this.getLegend(currOption, title, series, legend);

            currOption = this.setCurrOption(currOption, chartData.format, title)

            //设置颜色
            if (color) {
                currOption.color = color;
            }
        } catch (error) {
            console.log(error);
        }
        if (optionRender) {
            currOption = optionRender(currOption, chartData);
        }

        // 设置标题
        setChartTitle && setChartTitle(_.get(currOption, 'title.text'))

        //render chart
        pieChart.clear()
        pieChart.setOption(currOption);
        console.log('pieOption', currOption)

        if (legendSelected && legendSelected instanceof Function) {
            pieChart.on('legendselectchanged', legendSelected)
        }

        //add listener
        window.addEventListener("resize", () => {
            if (pieChart) {
                pieChart.resize();
            }
        });
    }
}

Index.propTypes = {
    optionRender: PropTypes.func
};

export default Index;