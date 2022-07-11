
'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getTemplateData } from '../util/template';
import { setEvnetFun, triggerEvnetFun, destroyEvnetFun } from '../util/event';


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        const { id } = this.props;
        if(id){
            this.queryComponentData();
            // 声明一个自定义事件
            // 在组件装载完成以后
            setEvnetFun(`getParam_${id}`, this.exportParamFun);
        }
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
            //组件是否准备就绪
            isReady      : false,
            //模版数据
            templateData : null,
            //参数列表
            params       : {},
            //影响元素
            effectElement: [],
        }
    }
    triggerLoadData = () =>{
        const { effectElement } = this.state;
        for(let i=0,len=effectElement.length;i<len;i++){
            let id = effectElement[i];
            triggerEvnetFun(`getData_${id}`);
        }
    }
    queryComponentData = () =>{
        const { id } = this.props;
        const tempData = getTemplateData(id);
        //defalut value
        let templateData  = null,
            params        = {},
            effectElement = [];

        //分解数据
        if(tempData){
            try {
                let templateProperty = tempData.templatePropertyValueJson;
    
                templateData  = templateProperty;
                effectElement = templateProperty.effectElement;
                params        = templateProperty.params || {};

            } catch (error) {
                console.log(error);
            }
        }
       
        this.setState({templateData, params, effectElement, isReady:true},this.triggerLoadData);
    }
    exportParamFun = () =>{
        const { isReady, params } = this.state;
        if(!isReady) return null;
        return params;
    }
    render() {
        return null;
    }
}

Index.propTypes = {
    id: PropTypes.number.isRequired,
};

export default Index;