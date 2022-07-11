'use strict';
import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { setEvnetFun, destroyEvnetFun, triggerEvnetFun } from './event';
import { setDefault } from '@util';
import { getComponentParam, getComponentParamNoReturn, getComponentNoParam } from './template'; // getTemplateData, 
import { getTemplateData } from './templateStrategy'

class CommonComponent extends Component {
    constructor(props) {
        super(props);
        //
        this.state = this.getInitialState();
        //注册方法
        this.setDefault = setDefault.bind(this);
        this.getTemplateData = getTemplateData.bind(this);
        this.triggerEvnetFun = triggerEvnetFun.bind(this);
        this.getComponentParam = getComponentParam.bind(this);
        this.getComponentParamNoReturn = getComponentParamNoReturn.bind(this);
        this.getComponentNoParam = getComponentNoParam.bind(this);
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
            apiParamNames: "",
            effectElement: []
        }
    }
    queryComponentData() { return null; }
    //注册事件
    registerEvent = () => {
        const { id } = this.props;
        if (id) {
            //通用事件注册
            //获取组件参数
            console.log('isaffasfasfsafassfa', id);
            setEvnetFun(`getParam_${id}`, this.exportParamFun);
            //重新加载组件数据
            setEvnetFun(`getData_${id}`, this.exportLoadDataFun);
            //获取组件状态
            setEvnetFun(`getState_${id}`, this.exportComponentState);

            //个性事件注册
            //目前用于select组件
            setEvnetFun(`clearSlect_${id}`, this.exportClearData);
            //目前用于弹出层组件
            setEvnetFun(`openPopup_${id}`, this.exportOpenPopup);

        }
    }
    //销毁事件
    destroyEvnet = () => {
        const { id } = this.props;
        if (id) {
            destroyEvnetFun(`getParam_${id}`);
            destroyEvnetFun(`getData_${id}`);
            destroyEvnetFun(`getState_${id}`);
            destroyEvnetFun(`clearSlect_${id}`);
            destroyEvnetFun(`openPopup_${id}`);
        }
    }
    //初始化方法
    triggerLoadData = () => {
        const { effectElement } = this.state;
        console.log('effectElementeffectElement', effectElement)
        if (!effectElement || !effectElement.length) return null;
        for (let i = 0, len = effectElement.length; i < len; i++) {
            let id = effectElement[i];
            this.triggerEvnetFun(`getData_${id}`);
        }
    }
    //触发打卡弹出层
    triggerOpenPopup = (data) => {
        const { effectElement } = this.state;
        if (!effectElement || !effectElement.length) return null;
        for (let i = 0, len = effectElement.length; i < len; i++) {
            let id = effectElement[i];
            this.triggerEvnetFun(`openPopup_${id}`, data);
        }
    }
    triggerClearStateData = () => {
        const { effectElement } = this.state;
        if (!effectElement || !effectElement.length) return null;
        for (let i = 0, len = effectElement.length; i < len; i++) {
            let id = effectElement[i];
            this.triggerEvnetFun(`clearSlect_${id}`);
        }
    }
    exportComponentState = () => {
        return this.state.componentState;
    }
    exportLoadDataFun() { return null; }
    exportParamFun() { return null; }
    exportClearData() { return null; }
    exportOpenPopup() { return null; }

    //
    getApiParam = (downloadDisplay) => {
        const { apiParamNames, controlledElement, isNoApiParam } = this.state;
        window.cc = this.getComponentNoParam;
        const params = downloadDisplay? this.getComponentNoParam(controlledElement) : this.getComponentParam(controlledElement);
        console.log('params123123', downloadDisplay, params);
        if ((!params || params == -1) && apiParamNames) return null;
        else if ((!params || params == -1) && isNoApiParam) return null;
        let temp = apiParamNames ? apiParamNames.split(",") : null;
        let result = {};
        if (temp && temp.length) {
            for (let i = 0, len = temp.length; i < len; i++) {
                let key = temp[i];
                // if(params[key] == undefined) return null;
                if (params[key] !== 'EMPTY') {
                    result[key] = params[key];
                } else if (params[key] === 'EMPTY') {
                    result[key] = ''
                }
            }
        } else if (params && !apiParamNames) {
            result = params
        }
        if (result && result instanceof Object && JSON.stringify(result) !== '{}') {
            result['now_currency'] = this.getCurrentExchangeRate()
        }
        return result;
    }

    getOtherParam = () => {
        const { controlledElement, otherParamKeys } = this.state;
        const params = this.getComponentParam(controlledElement);
        // console.log('paramsparamsparams', params, otherParamKeys)
        if (!params) return {};
        return _.reduce(otherParamKeys, (acc, item) => {
            acc[item] = params[item]
            return acc
        }, {})
    }

    getCurrentExchangeRate() {
        return window.localStorage.currentExchangeRate
    }

    render() { return null; }
}

CommonComponent.propTypes = {
    id: PropTypes.string
};

export default CommonComponent;