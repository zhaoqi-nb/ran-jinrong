'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames'
import { Spin } from 'antd';
import i18n from '@/plugin/i18n';
import NoData from '../../util/noData';
import Watermark from '../../watermark/index';

import {
    getIfDoubleAxis,
    getSeriesData,
    getSeriesDataForBar,
    getLegend,
    getYAxis,
    getXAxis,
    getTooltip,
    setAxisLabelFormat,
    getNewLegend
} from './base';

import Legend from './Legend';

class BaseComponent extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        //绑定
        this.getIfDoubleAxis = getIfDoubleAxis.bind(this);
        this.getSeriesData = getSeriesData.bind(this);
        this.getSeriesDataForBar = getSeriesDataForBar.bind(this);
        this.getLegend = getLegend.bind(this);
        this.getYAxis = getYAxis.bind(this);
        this.getXAxis = getXAxis.bind(this);
        this.getTooltip = getTooltip.bind(this);
        this.setAxisLabelFormat = setAxisLabelFormat.bind(this);
    }

    componentDidMount() {
        //设置组件初始化数据
        this.setComponentInitData();
    }

    componentWillReceiveProps(nextProps) {
        const { data, option, legend, ifStack, title } = this.props;
        if (JSON.stringify(data) != JSON.stringify(nextProps.data)
            || JSON.stringify(option) != JSON.stringify(nextProps.option)
            || JSON.stringify(legend) != JSON.stringify(nextProps.legend)
            || JSON.stringify(ifStack) != JSON.stringify(nextProps.ifStack)
            || JSON.stringify(title) !== JSON.stringify(nextProps.title)

        ) {
            this.setState({ chartData: nextProps.data }, () => this.renderChart(nextProps))
        }
    }

    componentWillUnmount() {
        this.setState(this.getInitialState())
    }
    getInitialState = () => {
        return {
            //组件是否准备就绪
            isReady: false,
            option: {
                title: {
                    // show: false,
                    text: "",
                    left: "center"
                },
                legend: null,
                xAxis: {
                    type: 'category',
                    name: "",
                },
                yAxis: [{
                    type: 'value'
                }],
                tooltip: {
                    trigger: 'axis',
                    confine: true,
                    padding: 0,
                    borderWidth: 0,
                    axisPointer: {
                        // Use axis to trigger tooltip
                        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                    }
                },
                dataZoom: [{
                    show: true,
                    type: 'slider',
                }],
                series: []
            },
            chartData: null,
            //echart对象
            echarts: null,
            titleText: '',
        }
    }
    setComponentInitData = (props = this.props) => {
        const _this = this;
        const { onSetCharts } = props;
        import(/* webpackChunkName: "echarts"*/'@echarts').then(function (echarts) {
            onSetCharts(echarts)
            _this.setState({ echarts, chartData: props.data, isReady: true }, () => _this.renderChart({ ...props, setChartTitle: _this.setChartTitle }));
        }).catch(function (err) {
            console.log('Failed to load echarts', err);
        })
    }

    setChartTitle = (titleText) => {
        this.setState({ titleText })
    }

    renderChart() { return null }
    render() {
        const { isReady, titleText } = this.state;
        const { id, ifWatermark, style, type, colsNum, title, contentStyle, showChangeType, layoutDirection, chartWrapStyle } = this.props;
        //  (colsNum || !showChangeType)? { marginRight: '0px' } : {};
        const Title = _.get(title, 'customShow', false) ? (
            <div
                className='chart-title'
                style={{
                    marginTop: 8
                }}
            >
                {titleText}
            </div>
        ) : null

        // const { color, data, mixType, legend } = this.props

        // const legendData = getNewLegend({ data, color, type, mixType })

        return (
            <div className={classnames("chart-wrapper", {
                'chart-pie-wrapper': type === "pie"
            })} style={chartWrapStyle}>
                <Watermark ifWatermark={ifWatermark}>
                    <Spin spinning={!isReady} tip={`${i18n.format('加载中')}...`}>
                        <div
                            className={type == "pie" ? "" : "chartContent"}
                            style={{ display: 'flex', flexDirection: 'column', ...contentStyle }}
                        >
                            {Title}
                            {/* <Legend
                                data={legendData}
                                selected={_.get(legend, 'selected')}
                                onSelect={this.props.onSelectLegend}
                            /> */}
                            <div id={id} style={{ height: type == "pie" ? 250 : 432, ...style }}><NoData /></div>
                        </div>
                    </Spin>
                </Watermark>
            </div>
        );
    }
}

BaseComponent.propTypes = {
    optionRender: PropTypes.func
};

export default BaseComponent;