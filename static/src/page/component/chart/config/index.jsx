'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Component from '../../util/component';
import EditTemplate from '../../util/editTemplate/index';
import { getPrivilegeData } from '../../util/template';

import { Spin } from 'antd';
import LoopChart from './loop';
import Normal from './normal';

import './index.less';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
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
            type: null,
            //受控元素
            controlledElement: null,
            //是否有下载功能
            ifChartDownload: null,
            //默认布局
            layoutDirection: null,
            //是否展示数据标签
            ifShowDataLabel: false,
            // 饼图展示label
            showLabel: false,
            // 根据参数切换图类型
            changeChartType: null

        }
    }
    queryComponentData = () => {
        const { id } = this.props;
        const tempData = this.getTemplateData(id);
        //defalut value
        let instantiationId = null,
            templateData = null,
            type = null,
            controlledElement = null,
            apiParamNames = null,
            ifChartDownload = { show: false },
            // 指标筛选的key，默认content_name
            codeKey = null,
            layoutDirection = null,
            showDataZoomLength = null,
            url = null,
            isNoApiParam = false,
            ifShowDataLabel = false,
            showLabel = false,
            changeChartType = null;


        //分解数据
        if (tempData) {
            try {
                let templateProperty = tempData.templatePropertyValueJson;

                instantiationId = tempData.instantiationId;
                templateData = templateProperty;

                apiParamNames = this.setDefault(tempData.backendPropertyValue, null);

                type = this.setDefault(templateProperty.type, "line");
                codeKey = this.setDefault(templateProperty.codeKey, "content_name");
                controlledElement = this.setDefault(templateProperty.controlledElement, []);
                layoutDirection = this.setDefault(templateProperty.layoutDirection, 'vertical'); // horizonta
                showDataZoomLength = this.setDefault(templateProperty.showDataZoomLength, null);
                url = this.setDefault(templateProperty.url, null);
                isNoApiParam = _.get(templateProperty, 'isNoApiParam', false);
                ifShowDataLabel = this.setDefault(templateProperty.ifShowDataLabel, false);
                showLabel = this.setDefault(templateProperty.showLabel, false);
                changeChartType = this.setDefault(templateProperty.changeChartType, null);
                //获取权限操作数据
                //ifChartDownload : {"show":true}
                // let privilege = getPrivilegeData(["ifChartDownload"]);
                let privilege = getPrivilegeData(["ifDownload"]);
                if (privilege) {
                    // ifChartDownload = privilege.ifChartDownload;
                    ifChartDownload = privilege.ifDownload;
                }


            } catch (error) {
                console.log(error);
            }
        }

        this.setState({ instantiationId, templateData, apiParamNames, type, controlledElement, ifChartDownload, codeKey, layoutDirection, showDataZoomLength, url, componentState: "DidMount", isNoApiParam, ifShowDataLabel, showLabel, changeChartType }, this.triggerLoadData);
    }
    renderLoading = () => {
        return <Spin tip="Loading..." />
    }
    exportLoadDataFun = () => {
        if (this.refs && this.refs.customChart) this.refs.customChart.getChartData();
    }
    renderContent = () => {
        const { id, style, optionRender, onObserver } = this.props;
        const { templateData, type, controlledElement, ifChartDownload, apiParamNames, codeKey, layoutDirection, showDataZoomLength, url, isNoApiParam, ifShowDataLabel, showLabel, changeChartType } = this.state;
        let param = {
            id,
            style,
            optionRender,
            templateData,
            type,
            controlledElement,
            ifChartDownload,
            apiParamNames,
            codeKey,
            layoutDirection,
            showDataZoomLength,
            url,
            onObserver,
            isNoApiParam,
            ifShowDataLabel,
            showLabel,
            changeChartType
        }
        if (type && type.indexOf("loop") > -1) return <LoopChart {...param} ref="customChart" />
        else return <Normal {...param} ref="customChart" />
    }
    render() {
        const { componentState, instantiationId } = this.state
        if (componentState == "WillMount") return null;
        //渲染内容
        return <EditTemplate instantiationId={instantiationId}>
            {this.renderContent()}
        </EditTemplate>
    }
}

Index.propTypes = {
    id: PropTypes.number.isRequired,
    style: PropTypes.object
};

Index.defaultProps = {
    style: {}
}

export default Index;
