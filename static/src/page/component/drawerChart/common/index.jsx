'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Tabs } from 'antd';
import Chart from '../../chart/common/index';
import RsIcon from '../../rsIcon';
import DownExcel from '@downExcel/common/index'
import { getDownloadData } from '../../downExcel/common/chartUtil'
import i18n from '@/plugin/i18n';
import { getPrivilegeData } from '../../util/template';
import './index.less';

const { TabPane } = Tabs;

class DrawerChart extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        const { visible, data } = this.props;
        if (visible != nextProps.visible) this.setState(this.getInitialState(), () => this.openPopup(nextProps))
        if (JSON.stringify(data) != JSON.stringify(nextProps.data)) this.setState({ data: nextProps.data });
    }

    componentWillUnmount() {
        this.setState(this.getInitialState())
    }

    getInitialState = () => {
        return {
            //组件是否准备就绪
            visible: false,
            chartType: "line",
            option: null,
            data: null
        }
    }
    openPopup = (props = this.props) => {
        let { option, data, noCharts } = props;
        if (!option || !option.length) return;

        if (noCharts && noCharts.length) {
            option = option.filter(item => {
                if (noCharts.some(noChartsItem => noChartsItem == item.code)) { }
                else return item
            })
        }

        let activeKey = option[0]["code"];
        console.log('render data to chart', option, data)
        this.setState({ visible: true, data, option, activeKey }, () => this.props.onChange(activeKey))
    }
    onClose = () => {
        this.componentWillUnmount()
    }

    renderChart = (obj) => {
        const { chartType, data } = this.state;
        const { titleRender, params } = this.props
        if (titleRender) obj = titleRender(obj, params)
        let title = obj.title,
            titleRight = obj.titleRight;
        let option = {
            "yAxis": obj.yAxis,
            "xAxis": obj.xAxis,
            "title": {
                "show": false
            },
            "legend": {
                "show": false
            },
            "type": chartType
        }
        let _style = { height: '350px' }
        if (titleRight) {
            titleRight = titleRight.split('：')
            titleRight = `${i18n.format(titleRight[0])}：${i18n.format(titleRight[1])}`
        }
        const downData = getDownloadData(data, obj, title, option)

        let privilege = getPrivilegeData(["ifDownload"]);
        let ifChartDownload = { show: false }
        if (privilege) {
            ifChartDownload = privilege.ifDownload;
        }

        return (<div className="chratWrapper" key={`chart_${obj.code}`}>
            <div className="toolWrapper">
                <div className="title">
                    <span className="excel-drawer-title">{title}</span>
                    <span style={{ position: 'absolute', right: '0', fontSize: 12, color: "#8C8C8C" }}>{i18n.format(titleRight)}</span>
                </div>
            </div>
            <Chart id={obj.code} option={option} data={data} ifChartDownload={ifChartDownload} downData={downData} style={_style} />
        </div>)
    }

    handleChangeChart = (chartType) => {
        this.setState({
            chartType
        })
    }

    renderTabContent = (data) => {
        if (!data || !data.length) return null;
        const { noCharts } = this.props
        if (noCharts && noCharts.length) {
            data = data.filter(item => {
                if (noCharts.some(noChartsItem => noChartsItem == item.code)) { }
                else return item
            })
        }
        return data.map(item => {
            return (<TabPane tab={item.name} key={item.code}>
                {this.renderChart(item)}
            </TabPane>)
        });
    }
    handleTabChange = (activeKey) => {
        this.setState({ activeKey }, () => this.props.onChange(activeKey))
    }
    render() {
        const { visible, option, activeKey } = this.state;
        const { title = i18n.format("趋势分析"), ifHideTab } = this.props;
        return (
            <Drawer
                className='drawer-chart'
                title={title}
                placement={"bottom"}
                onClose={this.onClose}
                // maskClosable={false}
                closable={false}
                extra={<RsIcon style={{ fontSize: 16, color: '#8C8C8C' }} type="icon-guanbi" onClick={this.onClose} />}
                height={500}
                visible={visible}
                key="trend"

            >
                <Tabs className={ifHideTab ? "hideTab" : "showTab"} tabPosition="left" activeKey={activeKey} onChange={this.handleTabChange}>
                    {this.renderTabContent(option)}
                </Tabs>
            </Drawer>
        );
    }
}

DrawerChart.propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool,
    option: PropTypes.array,
    ifHideTab: PropTypes.bool,
    // data: PropTypes.oneOfType([
    //     PropTypes.array,
    //     PropTypes.object,
    // ]),// PropTypes.array,
    data: PropTypes.array,
    onChange: PropTypes.func
};

DrawerChart.defaultProps = {
    // title: i18n.format("趋势分析"),
    visible: false,
    ifHideTab: false,
    option: [],
    data: {},
    onChange: () => { }
}

export default DrawerChart;