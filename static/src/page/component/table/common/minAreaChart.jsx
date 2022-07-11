'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formaDate } from '../../util/format/date';
import { formatData } from './expand/base';

class MinAreaChart extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        const { color } = this.props;
        this.setState({
            option: {
                ...this.state.option,
                ...{
                    color: color,
                }
            }
        }, this.initData);
    }

    componentWillReceiveProps(nextProps) {
        const { data } = this.props;
        if (JSON.stringify(data || {}) != JSON.stringify(nextProps.data || {})) {
            this.initData(nextProps.data)
        }
    }

    componentWillUnmount() {
        this.setState(this.getInitialState())
    }
    getInitialState = () => {
        return {
            //组件是否准备就绪
            option: {
                tooltip: {
                    position: {
                        top: 5,
                        left: "10%"
                    },
                    trigger: 'axis',
                },
                grid: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    show: false,
                    borderWidth: 0,
                },
                xAxis: [
                    {
                        type: 'category',
                        show: false,
                        boundaryGap: false,
                        containLabel: false,
                        data: []
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        show: false,
                        min: function (value) {
                            if (value.min < 0) return value.min * 1.5
                            return value.min / 1.5;
                        }
                    }
                ],
                series: [
                    {
                        type: 'line',
                        symbol: 'none',
                        smooth: true,
                        data: [],
                        areaStyle: {
                            opacity: '0.3'
                        }
                    }
                ]
            }
        }
    }

    transferData = (data) => {
        if (!data) return data;
        let xData = Object.keys(data).sort();

        let series = [];
        for (let i = 0, len = xData.length; i < len; i++) {
            let xValue = xData[i],
                yValue = data[xValue];
            series.push([xValue, yValue]);
        }

        return {
            xData,
            series
        }
    }
    initData = (data = this.props.data) => {
        let chartData = this.transferData(data);
        setTimeout(() => {
            this.renderChart(chartData)
        }, 100)
    }
    renderChart = (chartData) => {
        const _this = this,
            { id, xAxisFormat, yAxisFormat, suffix = '', type } = this.props;
        let { option } = _this.state;
        option.series[0].type = type
        import(/* webpackChunkName: "echarts"*/'@echarts').then(function (echarts) {
            let trendChart = echarts.getInstanceByDom(document.getElementById(id));
            if (trendChart) {
                //清空，销毁
                trendChart.clear();
                trendChart.dispose();

                option.series[0].data = [];
            }
            if (!chartData) return;
            trendChart = echarts.init(document.getElementById(id));
            if (!trendChart) return;
            try {
                let xData = chartData.xData,
                    series = chartData.series;
                option.xAxis[0].data = xData;
                option.series[0].data = series;
            } catch (error) {
                console.log(error);
            }

            option.tooltip.formatter = (params) => {
                let html = [];
                params.forEach((item, index) => {
                    let seriesName = formaDate(item.data[0], { dateType: xAxisFormat.date_type });
                    let value = formatData(yAxisFormat, item.data[1]);
                    html.push(`${item.marker} ${seriesName}: ${value}${suffix}`);
                })
                return html.join('');
            }

            // option.tooltip.appendToBody = true

            // console.log('option===', JSON.stringify(option, null, 2))

            //render chart
            trendChart.setOption(option);

            //add listener
            window.addEventListener("resize", () => {
                if (trendChart) {
                    trendChart.resize();
                }
            });
        }).catch(function (err) {
            console.log('Failed to load echarts', err);
        })
    }
    render() {
        const { id } = this.props;
        return (
            <div>
                <div className="relaContent" id={id} style={{ height: 30, width: "100%", display: "inline-block" }}></div>
            </div>
        );
    }
}

MinAreaChart.defaultProps = {
    id: "",
    data: []
}

MinAreaChart.propTypes = {
    id: PropTypes.string,
    xAxisFormat: PropTypes.object,
    yAxisFormat: PropTypes.object,
    suffix: PropTypes.string,
    color: PropTypes.string,
    data: PropTypes.array
}

export default MinAreaChart;