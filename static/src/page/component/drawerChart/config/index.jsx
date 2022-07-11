'use strict';

import React from 'react';
import _ from 'lodash'
import PropTypes from 'prop-types';
import Component from '../../util/component';
import Common from '../common/index';
import { getEditDrawerChartTitle } from '../../util/editTemplate/util';
import { getFormatMode } from '../../table/common/expand/base'
import { getChartTitle } from '../../table/common/expand/openChart';
import Api from './store/api'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.getChartTitle = getChartTitle.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    }

    getInitialState = () => {
        return {
            //组件状态  WillMount/挂载前（组件还未渲染）, InMount/挂载中（组件执行渲染，可能需要获取数据才可以初始化好）  DidMount/挂载完成（组件准备就绪）   
            componentState: "WillMount",
            instantiationId: null,
            //组件数据
            templateData: null,
            //受控元素
            controlledElement: null,
            apiParamNames: null,
            chartData: {},
            propsKey: null,
            paramKey: null,
            visible: false,
            rowData: null,
            //是否追加title
            addTitle: null,
            titleKeys: null,
            //不需要左侧tab
            noCharts: null,
            //定制化请求url
            url: null

        }
    }
    queryComponentData = () => {
        const { id } = this.props;
        const tempData = this.getTemplateData(id);
        //defalut value
        let instantiationId = null,
            templateData = null,
            controlledElement = [],
            apiParamNames = null,
            //获取其他组件隐藏数据 
            propsKey = null,
            //给api 接口用的参数
            paramKey = null,
            //图标标题
            titleOption = null,
            //不需要左侧tab
            noCharts = [],
            //url
            url = "",
            //组件状态
            componentState = "InMount";

        //分解数据
        if (tempData) {
            try {
                let templateProperty = tempData.templatePropertyValueJson;

                instantiationId = tempData.instantiationId;
                templateData = templateProperty;
                apiParamNames = this.setDefault(tempData.backendPropertyValue, null);
                propsKey = this.setDefault(templateProperty.propsKey, "");
                paramKey = this.setDefault(templateProperty.paramKey, "");
                controlledElement = this.setDefault(templateProperty.controlledElement, []);
                titleOption = this.setDefault(templateProperty.titleOption, []);
                noCharts = this.setDefault(templateProperty.noCharts, []);
                url = this.setDefault(templateProperty.url, []);
            } catch (error) {
                console.log(error);
            }
        }

        this.setState({ instantiationId, templateData, propsKey, paramKey, componentState, apiParamNames, controlledElement, titleOption, noCharts, url });
    }

    excludeMetric = (data) => {
        const { templateData } = this.state

        if (!_.has(templateData, 'metric.exclude')) return data

        return _.filter(data, item => _.every(templateData.metric.exclude, d => item.zb_code !== d))
    }

    getChartParam = (date_type, data, rowData) => {
        let result = [];
        data = this.excludeMetric(data)
        const { controlledElement, titleOption } = this.state
        let prefix = getEditDrawerChartTitle(controlledElement, titleOption, rowData);
        prefix = this.getChartTitle(prefix, rowData)

        for (let i = 0, len = data.length; i < len; i++) {
            let obj = data[i];
            let unit = obj.unit ? `(${obj.unit})` : '';
            let code = obj.zb_code;

            let name = `${obj.zb_name}${unit}`;
            let title = `${prefix}-${name}`;
            let format = getFormatMode({
                "divide": obj.divide,
                "bit_number": obj.precision,
                "format": obj.data_type
            })
            result.push({
                code,
                name,
                title,
                yAxis: {
                    "type": "value",
                    "name": name,
                    "axisLabel": format
                },
                "xAxis": {
                    "axisLabel": {
                        date_type,
                        "type": "date"
                    },
                    "name": "",
                    "type": "category"
                }
            })
        }
        return result;
    }
    getChartData = async (date_type, data, rowData) => {
        let chartOption = this.getChartParam(date_type, data, rowData);
        this.setState({ chartData: null, chartOption, visible: !this.state.visible, rowData, componentState: 'DidMount' })
    }
    exportOpenPopup = (record) => {
        const { propsKey, controlledElement } = this.state;
        const params = this.getComponentParam(controlledElement);
        if (params && params[propsKey]) {
            let datas = params[propsKey];
            this.getChartData(params["date_type"], datas, record);
        }
    }
    //调用api获取数据
    getDrawerChartData = async (code) => {
        const { instantiationId, paramKey, rowData, chartOption, url } = this.state;
        const { paramRender } = this.props;
        if (!instantiationId) return;

        let params = this.getApiParam();
        if (!params) return null;
        if (paramRender) {
            params = paramRender(params, rowData)
        }
        const result = await Api.getDrawerChartData({
            instantiationId,
            type: "line",
            url,
            params: JSON.stringify({
                ...params,
                [paramKey]: code,
                codeName: chartOption.find(v => v.code == code).name
            })
        })
        let chartData = [];
        if (result.code == 200) {
            chartData = result.data;

            // 20220516，趋势图标题调整
            // const { zbNames = [] } = chartData
            // zbNames.map((zbName, index) => {
            //     if (zbName) {
            //         chartOption[index].title = chartOption[index].title.split('-')[0] + '-' + zbName
            //         chartOption[index].name = zbName
            //         chartOption[index].yAxis.name = zbName
            //     }
            // })
        }
        this.setState({ chartData, chartOption })
    }
    renderContent = () => {
        const { instantiationId, visible, chartOption, chartData, noCharts } = this.state;
        let param = {
            id: instantiationId,
            option: chartOption,
            visible,
            data: chartData,
            noCharts,
            onChange: this.getDrawerChartData
        };

        return <Common {...param} />
    }
    render() {
        const { componentState } = this.state;
        if (componentState == "WillMount") return null;
        //渲染内容
        return this.renderContent();
    }
}

Index.propTypes = {
    id: PropTypes.number.isRequired,
    paramRender: PropTypes.func
};

Index.defaultProps = {
}

export default Index;
