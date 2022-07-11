'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Component from '../../util/component';
import { Spin } from 'antd';
import Common from '../common/index';
import Api from './store/api';
// import widgetData from '@/page/component/util/ApiFactory'
import EditTemplate from '../../util/editTemplate/index';
import { cloneDeep } from 'lodash';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount() {
        this.queryComponentData()
        this.registerEvent();
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
            data: {},
            option: [],
            title: {},
            type: null,
            transformType: null,
            wrapStyle: null,
            style: null,
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
            option = null,
            transformType = null,
            wrapStyle = null,
            style = null,
            //组件状态
            componentState = "InMount";

        //分解数据
        if (tempData) {
            try {
                let templateProperty = tempData.templatePropertyValueJson;

                instantiationId = tempData.instantiationId;
                templateData = templateProperty;
                apiParamNames = this.setDefault(tempData.backendPropertyValue, null);
                //type = text、value、upValue
                //option [{"code":"","name":"", "type":"text"}]
                option = this.setDefault(templateProperty.option, []);
                transformType = this.setDefault(templateProperty.transformType, null);
                controlledElement = this.setDefault(templateProperty.controlledElement, []);
                wrapStyle = this.setDefault(templateProperty.wrapStyle, null);
                style = this.setDefault(templateProperty.style, null);

            } catch (error) {
                console.log(error);
            }
        }

        this.setState({ instantiationId, templateData, componentState, apiParamNames, option, controlledElement, transformType, wrapStyle, style }, this.getTemplateDatas);
    }
    exportLoadDataFun = () => {
        this.getTemplateDatas();
    }
    //调用api获取数据
    getTemplateDatas = async () => {
        let { instantiationId, apiParamNames, transformType, option } = this.state
        if (!instantiationId || !apiParamNames) return;
        const params = this.getApiParam();
        if (!params) {
            setTimeout(this.getTemplateDatas, 500);
            return null;
        }

        // widgetData.emit({
        //     instantiationId,  'templateData', 
        //     params: params == -1 ? {} : JSON.stringify(params)
        // })

        const result = await Api.getTemplateData({
            instantiationId,
            params: params == -1 ? {} : JSON.stringify(params)
        })
        let data = {};
        if (result.code == 200 && result.data.result) {
            data = result.data.result.list;
        }
        let _data = cloneDeep(data)
        if (transformType) {
            if (transformType === "keyValue") {
                _data = []
                option.map(item => {
                    const currentData = data.find(f => f.hasOwnProperty(item.code))
                    if (currentData) {
                        _data.push(Object.assign({}, item, {
                            data: currentData[item.code],
                            ratioData: currentData[`${item.code}_tb`]
                        }))
                    } else {
                        _data.push(item)
                    }
                })
            }
        }
        this.setState({ data: _data, componentState: 'DidMount' })
    }

    renderLoading = () => {
        return <Spin tip="Loading..." />
    }
    renderContent = () => {
        const { instantiationId, data, option, wrapStyle, style } = this.state;
        let param = {
            id: instantiationId,
            data,
            option,
            wrapStyle,
            style
        };
        return <Common {...param} />
    }
    render() {
        const { componentState, instantiationId } = this.state;
        if (componentState == "WillMount") return null;
        else if (componentState == "InMount") return this.renderLoading();
        //渲染内容
        return <EditTemplate instantiationId={instantiationId} style={{ display: "inline-block", width: '100%' }}>
            {this.renderContent()}
        </EditTemplate>
    }
}

Index.propTypes = {
    id: PropTypes.number.isRequired,
};

Index.defaultProps = {
    id: "",
}

export default Index;
