'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Component from '../../util/component';
import { setEvnetFun, triggerEvnetFun, destroyEvnetFun } from '../../util/event';
import { getTemplateData } from '../../util/template';
import { Spin } from 'antd';
import Checkbox from '../common/index';
import EditTemplate from '../../util/editTemplate/index';

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
        this.setState(this.getInitialState())
        const { id } = this.props;
        if(id) destroyEvnetFun(`getParam_${id}`);
    }
  
    getInitialState = () =>{
        return {
            value : null,
            //组件状态  WillMount/挂载前（组件还未渲染）, InMount/挂载中（组件执行渲染，可能需要获取数据才可以初始化好）  DidMount/挂载完成（组件准备就绪）   
            componentState   : "WillMount",
            instantiationId  : null,
            //组件数据
            templateData     : null,
            //传入多选项
            plainOptions     : [],
            //默认值
            defaultval       : [],
            style            : {},
            //影响元素
            effectElement    : [],
            //清空影响组件对state数据
            clearEffectState : null,
            paramKey         : null,
            required:  null,
            explain: null,
        }
    }

    queryComponentData = () =>{
        const { id }          = this.props;
        const tempData        = this.getTemplateData(id);
        //defalut value
        let instantiationId   = null,
            templateData      = null,
            plainOptions      = [],
            defaultval        = [],
            style             = {},
            clearEffectState  = [],
            effectElement     = [],
            paramKey          = null,
            required          = null,
            explain           = null,
            //组件状态
            componentState    = "InMount";
        //分解数据
        if(tempData){
            try {
                let templateProperty  = tempData.templatePropertyValueJson;

                    instantiationId   = tempData.instantiationId;
                    templateData      = templateProperty;

                    plainOptions      = this.setDefault(templateProperty.plainOptions, []);
                    defaultval        = this.setDefault(templateProperty.defaultval, []);
                    style             = this.setDefault(templateProperty.style || this.props.style, {});
                    effectElement     = templateProperty.effectElement || [],
                    paramKey          = this.setDefault(templateProperty.paramKey);
                    clearEffectState  = templateProperty.clearEffectState || [];
                    required          = this.setDefault(templateProperty.required);
                    explain           = this.setDefault(templateData.explain);
                    //更新组件状态
                    if(!plainOptions.length) componentState = "InMount";
                    else componentState = "DidMount";

            } catch (error) {
                console.log(error);
            }
        }

        this.setState({ instantiationId, explain, templateData, plainOptions, required, defaultval, style, effectElement, clearEffectState, componentState, paramKey},this.triggerLoadData);
    }

    //挂载
    exportParamFun = () =>{
        const {  value, paramKey} = this.state;
        let param = {};
        if(value) param[paramKey] = value.join();
        else param = null
        return param
    }

    renderLoading = () =>{
        return <Spin tip="Loading..."/>
    }

    changeCheckbox = (value) => {
        const { effectElement } = this.state;
        this.setState({value}, ()=> {
            this.triggerLoadData(effectElement);
        });
    }
    renderContent = () =>{
        const { instantiationId, plainOptions, defaultval, required, style, explain} = this.state;
        //onChange调用方法
        let param = {
            id:instantiationId,
            plainOptions,
            defaultval,
            style,
            required,
            explain
        };
        return <Checkbox {...param} ref="refCheckbox" changeCheckbox={this.changeCheckbox}/>
    }
    render() {
        const { componentState, instantiationId } = this.state;
        if(componentState == "WillMount") return null;
        else if(componentState == "InMount") return this.renderLoading();
        //渲染内容
        return <EditTemplate instantiationId={instantiationId} style={{display:"inline-block"}}>
                    {this.renderContent()}
                </EditTemplate>
    }
}

Index.propTypes = {
    id              : PropTypes.number.isRequired,
    plainOptions    : PropTypes.array,
    defaultval      : PropTypes.array,
    changeCheckbox  : PropTypes.func,
    style           : PropTypes.object,
};

Index.defaultProps = {
}

export default Index;
