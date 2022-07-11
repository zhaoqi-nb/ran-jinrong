'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LineChart from './line/index';
import BarChart from './bar/index';
import PieChart from './pie/index';
import MixChart from './mix/index';
import GroupChart from './group/index';
import ChinaMap from './chinaMap/index';
import RsIcon from '../../rsIcon'
import DownExcel from '@downExcel/common/index'

import { gethashcode } from '../../util/hash';
import { setDefault } from '@util';
import { Popover, Button, Checkbox, Tooltip, Dropdown, Menu } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import _ from 'lodash';
import './index.less';
import i18n from '@/plugin/i18n'
import { FormattedMessage } from '@/components/FastIntl'

import { elemetExportImage, getChartColor } from './util';
import { getFilterInfo, getPageName } from '../../downExcel/utils/filterUtil';
import DownloadWrap, { createPortal, deletePortal } from './DownloadWrap';

const CANCHANGETYPE = ['bar', 'line']

const downLoadIconStyle = {
    // position: 'absolute',
    // right: 0,
    // top: 0,
    // zIndex: 9999,
    fontSize: "16px"
}

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        this.queryComponentData();
    }

    componentWillReceiveProps(nextProps) {
        const { data, option, params, dataLabelFLag } = this.props;
        if (JSON.stringify(data) != JSON.stringify(nextProps.data) || JSON.stringify(option) != JSON.stringify(nextProps.option) || JSON.stringify(params) != JSON.stringify(nextProps.params) || dataLabelFLag != nextProps.dataLabelFLag) {
            this.setState(this.getInitialState(), () => this.queryComponentData(nextProps))
        }
    }

    componentWillUnmount() {
        this.setState(this.getInitialState())
    }
    getInitialState = () => {
        return {
            //组件是否准备就绪
            isReady: false,
            // 图表实例
            echarts: null,
            /* 自定义属性 */
            title: null,
            //
            explain: null,
            //类型
            type: null,
            //柱状图和曲线图混合
            mixType: null,
            //颜色
            color: null,
            //X轴
            xAxis: null,
            //Y轴
            yAxis: null,
            //隐藏dataZoom
            hideDataZoom: null,
            //
            grid: null,
            //
            legend: null,
            //是否是堆积图
            ifStack: null,
            //是否显示曲线上面的圈圈
            ifShowSymbol: null,
            //是否在柱状图显示值
            ifBarLabel: null,
            //水印
            ifWatermark: null,
            //饼状图
            radius: null,
            //min图需要的设置
            minSeriesOption: null,
            //多柱多曲线
            ifMultiaxial: null,
            //图例筛选弹窗
            visible: false,
            //使用前端的图例筛选
            legendSelect: true,
            //echarts图例筛选的回调方法
            legendSelected: null,
            //可切换类型配置
            showChangeType: null,
            showChangeStack: null,
            //柱状和折线图可以切换类型
            isBarOrLine: null,
            //横向图
            isHorizontal: null,
            //显示下载
            showDownload: null,
            //弹框不显示标签
            showTooltipLabel: null,
            //显示Y轴线
            showAxisLine: null,
            //是否展示数据表标签
            ifShowDataLabel: null
        }
    }

    setCharts = (echarts) => {
        this.setState({ echarts })
    }

    queryComponentData = ({ option, data, downData } = this.props) => {
        //defalut value
        let title = null,
            explain = null,
            type = null,
            mixType = null,
            color = null,
            xAxis = null,
            yAxis = null,
            hideDataZoom = null,
            grid = null,
            legend = null,
            ifStack = null,
            ifShowSymbol = null,
            ifBarLabel = null,
            ifWatermark = null,
            minSeriesOption = null,
            radius = null,
            ifMultiaxial = null,
            legendSelect = null,
            legendSelected = null,
            checkOptions = [],
            showChangeType = null,
            showChangeStack = null,
            isBarOrLine = null,
            isHorizontal = null,
            showDownload = true,
            showTooltipLabel = null,
            showAxisLine = true,
            ifShowDataLabel = false;

        try {
            //分解数据
            if (option) {
                // title = setDefault(option.title, { show: false })
                title = option.title || { show: false };
                title = { ...title, customShow: _.get(option.title, 'show', false), show: false, }
                if (option.titleOption) {
                    title = {
                        ...title,
                        top: 10
                    } //{ show: false }
                    if (downData) title.text = downData.title
                }
                isHorizontal = setDefault(option.isHorizontal, false)
                showAxisLine = setDefault(option.showAxisLine, true)
                console.log('titletitletitle', option, showAxisLine);
                explain = setDefault(option.explain);
                type = setDefault(option.type, "chinaMap");
                mixType = setDefault(option.mixType, []);
                color = setDefault(option.color, ["#A4BFDD", "#A3D0D0", "#AAD2A3", "#DDD3A3", "#DDC0A3", "#DDA3AA", "#C6ADDD", "#BAAAAC", "#97B5B0", "#C3CEBE", "#73869B", "#729292", "#779372", "#9B9472", "#9B8672", "#9B7277", "#8B799B", "#827778", "#6A7F7B", "#899085"]);
                xAxis = setDefault(option.xAxis);
                yAxis = setDefault(option.yAxis);
                console.log('yAxisyAxisyAxis', option, yAxis);
                hideDataZoom = setDefault(option.hideDataZoom, true);
                grid = setDefault(option.grid, {
                    top: 76,
                    left: 16,
                    right: (_.isArray(yAxis) && _.size(yAxis) === 2) ? 16 : 48,
                    bottom: 16, //(isHorizontal && showAxisLine) ? 16 : 16,
                    containLabel: true,
                });
                console.log('optionoptionoptionoption', option, grid);
                legend = setDefault(option.legend, {
                    type: "scroll",
                    top: 0,
                    padding: [8, 0, 8, 100],
                });

                ifStack = setDefault(option.ifStack, false);
                ifShowSymbol = setDefault(option.ifShowSymbol, true);
                ifBarLabel = setDefault(option.ifBarLabel, false);
                ifWatermark = setDefault(option.ifWatermark, true);
                radius = setDefault(option.radius, ['30%', '50%']);
                minSeriesOption = setDefault(option.minSeriesOption, null);
                ifMultiaxial = setDefault(option.ifMultiaxial, null);
                legendSelect = setDefault(option.legendSelect, true);
                legendSelected = setDefault(option.legendSelected, null);
                showChangeType = setDefault(option.showChangeType, true);
                showChangeStack = setDefault(option.showChangeStack, true);
                isBarOrLine = setDefault(CANCHANGETYPE.indexOf(type) > -1, false)
                showDownload = setDefault(option.showDownload, true)
                showTooltipLabel = setDefault(option.showTooltipLabel, true)
                ifShowDataLabel = setDefault(option.ifShowDataLabel, false)
                if (legendSelect) {
                    const _this = this
                    const { data } = this.props
                    let nameArr = []
                    if (data && data.formatArr) {
                        data.formatArr.map(item => {
                            nameArr.push(`${item.detail_code ? item.detail_code + '-' : ''}${item.name}`)
                        })
                    } else {
                        nameArr = data ? data.legend : []
                    }
                    nameArr.map(item => {
                        checkOptions.push({
                            label: item,
                            value: item
                        })
                    })

                    legendSelected = (param) => {
                        // console.log('自定义legendSelected回调', param)
                        legend.selected = cloneDeep(param.selected)
                        const selectedArr = []
                        for (let key in legend.selected) {
                            if (legend.selected[key]) selectedArr.push(key)
                        }
                        _this.filterChartData(selectedArr)
                        _this.setState({ legend })
                    }
                }

                // 堆积图不可以切换类型
                if (type === 'bar' && ifStack) isBarOrLine = false
            }
        } catch (error) {
            console.log(error);
        }

        this.setState({ title, explain, hideDataZoom, type, mixType, color, xAxis, yAxis, grid, legend, ifStack, ifShowSymbol, ifBarLabel, ifWatermark, radius, minSeriesOption, ifMultiaxial, data, legendSelect, checkOptions, legendSelected, isBarOrLine, showChangeType, showChangeStack, isHorizontal, showDownload, showTooltipLabel, showAxisLine, isReady: true })
    }
    renderContent = (id) => {
        const { type, ifStack, mixType } = this.state;
        const { data, optionRender, style, appendToBody, params, dataLabelFLag, chartWrapStyle, showLabel } = this.props;
        const chartId = id || this.props.id
        // console.log(data)
        let param = {
            ...this.props,
            ...this.state,
            onSetCharts: this.setCharts,
            id: chartId,
            // data,
            // params,
            appendToBody,
            optionRender,
            style,
            color: getChartColor(ifStack ? 'stack' : type),
            onSelectLegend: this.filterChartData,
            dataLabelFLag,
            chartWrapStyle,
            showLabel,
            data
        }
        if (type == "line") return <LineChart {...param} />
        else if (type == "bar") return <BarChart {...param} />
        else if (type == "pie") return <PieChart {...param} />
        else if (type == "mix") return <MixChart {...param} />
        else if (type == "group") return <GroupChart {...param} />
        else if (type == "chinaMap") return <ChinaMap {...param} />
    }

    filterChartData = (values) => {
        console.log('values===', values)
        const { data } = this.props
        let _data = cloneDeep(data)
        let _legend = cloneDeep(this.state.legend)
        if (!_data) return null
        let selectedIndexs = []
        let allLength = null
        _legend.selected = {}
        if (_data && _data.formatArr) {
            values.map(val => {
                const selectedIndex = _data.formatArr.findIndex(item => val === `${item.detail_code ? item.detail_code + '-' : ''}${item.name}`)
                selectedIndexs.push(selectedIndex)
            })
            _data.formatArr.map((item, index) => {
                Object.assign(_legend.selected, { [`${item.detail_code ? item.detail_code + '-' : ''}${item.name}`]: selectedIndexs.indexOf(index) > -1 ? true : false })
            })
            allLength = _data.formatArr.length
        } else {
            values.map(val => {
                const selectedIndex = _data.legend.findIndex(item => val === item)
                selectedIndexs.push(selectedIndex)
            })
            _data.legend.map((item, index) => {
                Object.assign(_legend.selected, { [item]: selectedIndexs.indexOf(index) > -1 ? true : false })
            })
            allLength = _data.legend.length
        }
        let newSeries = []
        const { series } = data
        series.map((item, index) => {
            if (selectedIndexs.indexOf(index) > -1) newSeries.push(item)
            else newSeries.push([])
        })
        _data.series = newSeries
        // if (selectedIndexs.length !== allLength) {
        //     // selectedMode设置用于禁用echarts的图例点击事件
        //     _legend.selectedMode = false
        // } else {
        //     _legend.selectedMode = true
        // }
        this.setState({ data: _data, legend: _legend })
    }

    renderFilter = () => {
        const { visible, checkOptions, legend } = this.state

        if (checkOptions.length < 2) return null
        let defaultSelectArr = []
        if (!legend.selected) {
            defaultSelectArr = checkOptions.map(item => item.value)
        } else {
            for (let key in legend.selected) {
                if (legend.selected[key]) defaultSelectArr.push(key)
            }
        }
        return <Popover
            placement="leftTop"
            overlayStyle={{ maxWidth: '50%', maxHeight: '450px', overflowY: 'auto', }}
            content={<div>
                <Checkbox.Group value={defaultSelectArr} onChange={this.filterChartData} >
                    {
                        checkOptions.map((item, index) => <div key={index} style={{ padding: '5px 0' }}>
                            <Checkbox value={item.value}>{item.label}</Checkbox>
                        </div>)
                    }
                </Checkbox.Group>
            </div>}
            title={(
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormattedMessage id="图例筛选" />
                    <div>
                        <Button
                            type='link'
                            size="small"
                            style={{ padding: '2px', marginLeft: 6 }}
                            onClick={() => this.filterChartData([])}
                        ><FormattedMessage id="取消" /></Button>
                        <Button
                            type='link'
                            size="small"
                            style={{ padding: '2px' }}
                            onClick={() => this.filterChartData(_.map(checkOptions, item => item.value))}
                        ><FormattedMessage id="全选" /></Button>
                    </div>
                </div>
            )}
            trigger="hover"
            visible={visible}
            overlayClassName="popover-config"
            onVisibleChange={this.handleVisibleChange}
        >
            <div className="chart-tools-wrap" style={{ marginBottom: 4 }}>
                <RsIcon className="tilishaixuan-icon" type="icon-tulishaixuan" style={{ cursor: 'pointer', color: '#595959' }} />
            </div>

        </Popover>
    }

    hide = () => {
        this.setState({
            visible: false,
        });
    };

    handleVisibleChange = visible => {
        this.setState({ visible });
    };

    renderChangeType = () => {
        const { type, ifStack, data, showChangeStack } = this.state
        const { series = [] } = data || {}
        return <div className="chart-tools-wrap changeType-wraps" style={showChangeStack && series.length > 1 ? { height: 72 } : { height: 48 }}>
            <Tooltip placement="left" title={`${i18n.format("折线图")}`}>
                <div className="changeType-item" onClick={() => {
                    if (type !== 'line') {
                        this.setState({
                            type: 'line'
                        })
                    }
                }}>
                    <RsIcon className={type === 'line' ? "changeType-icon selected-icon" : "changeType-icon"} type="icon-tubiao-zhexiantu" />
                </div>
            </Tooltip>
            <Tooltip placement="left" title={`${i18n.format("柱状图")}`}>
                <div className="changeType-item" onClick={() => {
                    if (type !== 'bar' || ifStack) {
                        this.setState({
                            type: 'bar',
                            ifStack: false
                        })
                    }
                }}>
                    <RsIcon className={type === 'bar' && !ifStack ? "changeType-icon selected-icon" : "changeType-icon"} type="icon-tubiao-zhuzhuangtu1" />
                </div>
            </Tooltip>
            {
                showChangeStack && series.length > 1 ? <Tooltip placement="left" title={`${i18n.format("堆积柱状图")}`}>
                    <div className="changeType-item" onClick={() => {
                        if (type !== 'bar' || !ifStack) {
                            this.setState({
                                type: 'bar',
                                ifStack: true
                            })
                        }
                    }}>
                        <RsIcon className={type === 'bar' && ifStack ? "changeType-icon selected-icon" : "changeType-icon"} type="icon-tubiao-zhuzhuangduijitu" />
                    </div>
                </Tooltip> : null
            }
        </div>
    }

    renderDownloadChart = () => {
        const { id } = this.props;
        const { echarts } = this.state;
        let myChart = echarts.getInstanceByDom(document.getElementById(id));
        const chartSrc = myChart.getDataURL({
            pixelRatio: 2,
            backgroundColor: '#fff'
        });
        const title = getPageName();
        const filters = getFilterInfo()
        return (
            <DownloadWrap
                title={title}
                chartSrc={chartSrc}
                filters={filters}
            />
        )
    }

    handleToolClick = (type) => () => {
        switch (type) {
            case 'excel':
                break;
            case 'png':
                const { downData } = this.props;
                const filename = downData.title;
                const reactNode = this.renderDownloadChart();
                const element = createPortal(reactNode);
                setTimeout(() => {
                    elemetExportImage(element, filename)
                        .then(() => {
                            deletePortal(element)
                        })
                }, 1000)
                break;
        }
    }

    renderDownLoad = () => {
        const { ifChartDownload, iconStyle, downData, params = null } = this.props;
        if (!ifChartDownload || (ifChartDownload && !ifChartDownload.show)) return null;
        if (!downData) return null;
        const title = downData.title,
            columns = downData.columns,
            dataSource = downData.dataSource,
            excelData = downData.excelData;
        console.log('titletitletit123123le', downData);
        // const _style = Object.assign({ "float": "right", marginRight: "10", marginBottom: 4 }, iconStyle)
        // console.log('qiaojie=>columns=>', this.props, this.state, 'end');

        const overlay = (
            <Menu>
                <Menu.Item key="excel" onClick={this.handleToolClick('excel')}>
                    <DownExcel
                        ifSplitColumns={false}
                        config={{ show: true, dataType: "chart" }}
                        params={params}
                        excelData={excelData}
                        columns={columns}
                        dataSource={dataSource}
                        title={title}
                    // style={_style}
                    >{i18n.format('下载EXCEL')}</DownExcel>
                </Menu.Item>
                <Menu.Item key="png" onClick={this.handleToolClick('png')}>{i18n.format('下载图片')}</Menu.Item>
            </Menu>
        )

        return (
            <Dropdown overlay={overlay}>
                <div className='downIcon-wrap' style={downLoadIconStyle}>
                    <RsIcon className="xiazai-icon" type="icon-xiazai" style={{ color: '#595959', ...iconStyle }} />
                </div>
            </Dropdown>
        )
    }

    renderTools = () => {
        const { legendSelect, isBarOrLine, showChangeType, showDownload } = this.state
        const { propsDownStyle } = this.props
        return <div style={Object.assign({}, { display: 'flex', flexDirection: 'column', position: 'absolute', right: 0, top: 0 }, propsDownStyle)}>
            {/* 0406去掉显示隐藏下载按钮的配置 */}
            {/* {showDownload ? this.renderDownLoad() : null} */}
            {this.renderDownLoad()}
            {legendSelect ? this.renderFilter() : null}
            {showChangeType && isBarOrLine ? this.renderChangeType() : null}
        </div>
    }

    render() {
        const { isReady } = this.state;
        const { wrapStyle, onObserver } = this.props
        onObserver && onObserver()
        if (!isReady) return null;
        return (
            <div className="chart-common-wrap" style={wrapStyle}>
                {this.renderContent()}
                {this.renderTools()}
            </div>
        );
    }
}


Index.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    option: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    params: PropTypes.object,
    optionRender: PropTypes.func
};

Index.defaultProps = {
    id: `chart_${gethashcode()}`,
    style: {},
    data: null,
    params: {},
    option: {}
};

export default Index;