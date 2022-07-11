'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Component from '../../util/component';
import { getEditTitle } from '../../util/editTemplate/util';
import EditTemplate from '../../util/editTemplate/index';
import i18n from '@/plugin/i18n'

import { Spin } from 'antd';
import Title from '../common/index';

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
            //受控元素
            controlledElement: null,
            text: null,
            explain: null,
            titleOption: null,
            params: null
        }
    }
    queryComponentData = () => {
        const { id } = this.props;
        const tempData = this.getTemplateData(id);
        //defalut value
        let instantiationId = null,
            templateData = null,
            text = "",
            explain = "",
            style = null,
            connect = null,
            titleOption = null,
            controlledElement = [],
            //组件状态
            componentState = "InMount";

        //分解数据
        if (tempData) {
            try {
                let templateProperty = tempData.templatePropertyValueJson;

                instantiationId = tempData.instantiationId;
                templateData = templateProperty;

                text = this.setDefault(templateProperty.text);
                explain = this.setDefault(templateProperty.explain);
                style = this.setDefault(templateProperty.style, { "lineHeight": "48px", "fontWeight": 500 });
                connect = this.setDefault(templateProperty.connect, "-");
                titleOption = this.setDefault(templateProperty.titleOption, null);
                controlledElement = this.setDefault(templateProperty.controlledElement, []);

                //更新组件状态
                if (titleOption && titleOption.length) componentState = "InMount";
                else componentState = "DidMount";

                if (text) {
                    text = text.split(connect).map(item => i18n.format(item)).join(connect)
                }

            } catch (error) {
                console.log('title-error', error);
            }
        }

        this.setState({ instantiationId, templateData, text, explain, style, connect, titleOption, controlledElement, componentState }, this.exportLoadDataFun);
    }
    exportLoadDataFun = () => {
        let { controlledElement, titleOption, connect, explain } = this.state;
        if (!titleOption) return null;
        //受控组件参数
        let params = this.getComponentParam(controlledElement);
        if (!params) {
            setTimeout(this.exportLoadDataFun, 500);
            return null;
        }

        let text = getEditTitle(controlledElement, titleOption, {}, connect)
        text = text.split(connect).map(item => i18n.format(item)).join(connect)
        //设置数据
        explain = params.explain ? params.explain : explain
        this.setState({ componentState: "DidMount", text, explain, params })
    }
    renderLoading = () => {
        return <Spin tip="Loading..." />
    }
    renderContent = () => {
        const { instantiationId, text, style, explain, params } = this.state;
        let param = {
            id: instantiationId,
            text,
            style,
            explain,
            params
        };

        document.title = text;

        // console.log('text ===', text)
        return <Title {...param} />
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
    style: PropTypes.object
};

Index.defaultProps = {
    style: {}
}

export default Index;
