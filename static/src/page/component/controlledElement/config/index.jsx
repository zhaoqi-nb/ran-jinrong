'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Component from '../../util/component';

import { Spin } from 'antd';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        this.queryComponentData();
        //注册事件
        this.registerEvent();
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillUnmount() {
        this.setState(this.getInitialState());
        //销毁事件
        this.destroyEvnet();
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
            //影响元素
            effectElement: null,
            data: null,
        }
    }
    queryComponentData = () => {
        const { id } = this.props;
        const tempData = this.getTemplateData(id);
        //defalut value
        let instantiationId = null,
            templateData = null,
            controlledElement = [],
            effectElement = [],
            //组件状态
            componentState = "InMount";

        //分解数据
        if (tempData) {
            try {
                let templateProperty = tempData.templatePropertyValueJson;

                instantiationId = tempData.instantiationId;
                templateData = templateProperty;

                effectElement = this.setDefault(templateProperty.effectElement, []);
                controlledElement = this.setDefault(templateProperty.controlledElement, []);

                componentState = "DidMount";
            } catch (error) {
                console.log(error);
            }
        }

        this.setState({ instantiationId, templateData, controlledElement, effectElement, componentState }, this.triggerLoadData);
    }
    exportLoadDataFun = () => {
        const { controlledElement } = this.state;
        //受控组件参数
        let params = this.getComponentParam(controlledElement);
        if (!params) return null;
        //设置数据
        this.setState({ data: params })
    }
    renderLoading = () => {
        return <Spin tip="Loading..." />
    }
    render() {
        const { componentState, data } = this.state;
        if (componentState == "WillMount") return null;
        else if (componentState == "InMount") return this.renderLoading();
        //渲染内容
        return (
            <div>
                <div>获取到的参数</div>
                {data ? JSON.stringify(data) : "无"}
            </div>
        )
    }
}

Index.propTypes = {
    id: PropTypes.number.isRequired,
};

Index.defaultProps = {
    id: "",
}

export default Index;
