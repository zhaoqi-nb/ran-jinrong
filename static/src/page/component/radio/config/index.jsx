'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Component from '../../util/component';
import EditTemplate from '../../util/editTemplate/index';

import { Spin } from 'antd';
import Common from '../common/index';
import { getPrivilegeData, getKeyPrivilege } from '../../util/template';
import i18n from '@/plugin/i18n'

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
            data: null,
            defaultSelect: null,
            paramKey: null,
            effectElement: null,
            //受控元素
            controlledElement: null,
            //是button还是默认
            type: null,
            title:null
        }
    }
    queryComponentData = () => {
        const { id } = this.props;
        const tempData = this.getTemplateData(id);
        //defalut value
        let instantiationId = null,
            templateData = null,
            controlledElement = [],
            data = [],
            defaultSelect = null,
            paramKey = null,
            effectElement = [],
            //组件类型
            type = null,
            title = null,
            //组件状态
            componentState = "InMount";

        //分解数据
        if (tempData) {
            try {
                let templateProperty = tempData.templatePropertyValueJson;

                instantiationId = tempData.instantiationId;
                templateData = templateProperty;
                data = this.setDefault(templateProperty.data, [])
                defaultSelect = this.setDefault(templateProperty.defaultSelectKey, null)
                paramKey = this.setDefault(templateProperty.paramKey, null)
                effectElement = this.setDefault(templateProperty.effectElement, [])
                type = this.setDefault(templateProperty.type, null)
                title = this.setDefault(templateProperty.title, null)
                controlledElement = this.setDefault(templateProperty.controlledElement, []);
            } catch (error) {
                console.log(error);
            }
        }

        data = this.optionsAuth(data, instantiationId)
        if (!defaultSelect && data.length) {
            defaultSelect = data[0].code
        }
        data = data.map(item => ({
            code: item.code,
            name: i18n.format(item.name)
        }))

        this.setState({ instantiationId, templateData, controlledElement, type, title, componentState: 'DidMount', data, defaultSelect, paramKey, value: defaultSelect, effectElement }, this.triggerLoadData);
    }
    optionsAuth = (options, instantiationId) => {

        let privilegeData = getKeyPrivilege("show_data_app");
        if (privilegeData && Array.isArray(privilegeData.data)) {
            options = this.processingData(privilegeData.data, options);
        }

        // 获取权限操作数据
        let privilegeDataAppId = getKeyPrivilege('show_data_app_id');
        if (privilegeDataAppId && privilegeDataAppId[instantiationId]?.data) {
            options = this.processingData(privilegeDataAppId[instantiationId].data, options)
        }
        return options;
    }
    // 处理数据
    processingData = (privilegeData, options) => {
        let arr = [];
        for (let i = 0, len = options.length; i < len; i++) {
            let currItem = options[i];
            if (privilegeData.indexOf(currItem.name) != -1) {
                arr.push(currItem);
            }
        }
        return arr;
    }
    renderLoading = () => {
        return <Spin tip="Loading..." />
    }
    getSelectValue = (e) => {
        const { effectElement } = this.state;
        let value = e.target.value
        console.log('修改平台', value)
        this.setState({ value }, () => {
            this.triggerLoadData(effectElement);
        });
    }
    exportParamFun = () => {
        const { componentState, paramKey, value, data } = this.state
        if (componentState != "DidMount" || !paramKey || !value) return null;
        let param = {}
        if (value) {
            param[paramKey] = value;
        }
        if (data && data.length) {
            let temp = data.find(item => item.code == value);
            if (temp) param[`${paramKey}_$name`] = temp.name;
        }
        return param
    }
    renderContent = () => {
        const { instantiationId, data, type, title, defaultSelect } = this.state;
        const { style } = this.props
        let param = {
            id: instantiationId,
            data,
            defaultSelect,
            type, 
            title,
            style,
            getSelectValue: this.getSelectValue
        };
        return <Common {...param} />
    }
    render() {
        const { componentState, instantiationId } = this.state;
        if (componentState == "WillMount") return null;
        else if (componentState == "InMount") return this.renderLoading();
        //渲染内容
        return <EditTemplate instantiationId={instantiationId} style={{ display: "inline-block" }}>
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
