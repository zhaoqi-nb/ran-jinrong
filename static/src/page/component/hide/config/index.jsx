'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Component from '../../util/component';
import { Spin } from 'antd';
import { gethashcode } from '../../util/hash';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentWillReceiveProps(nextProps) {
    }
  
    getInitialState = () =>{
        return {
            value : null,
            //组件状态  WillMount/挂载前（组件还未渲染）, InMount/挂载中（组件执行渲染，可能需要获取数据才可以初始化好）  DidMount/挂载完成（组件准备就绪）   
            componentState   : "WillMount",
            instantiationId  : null,
            //组件数据
            templateData     : null,
           
            //影响元素
            effectElement    : [],
            //判断逻辑
            /*
            {
                "code":"content_name",
                "value":true,//当vaule相等，则隐藏元素
            }*/
            judgeParamLogic   : {},
            //当前显示状态
            show              : false,
        }
    }

    queryComponentData = () =>{
        const { id }          = this.props;
        const tempData        = this.getTemplateData(id);
        //defalut value
        let instantiationId   = null,
            templateData      = null,
            controlledElement = [],
            effectElement     = [],
            judgeParamLogic   = null,
            show              = null,
            //组件状态
            componentState    = "DidMount";
        //分解数据
        if(tempData){
            try {
                let templateProperty  = tempData.templatePropertyValueJson;

                    instantiationId   = tempData.instantiationId;
                    templateData      = templateProperty;

                    controlledElement = this.setDefault(templateProperty.controlledElement, []);
                    effectElement     = this.setDefault(templateProperty.effectElement, []);
                    judgeParamLogic   = this.setDefault(templateProperty.judgeParamLogic,{});
                    show              = this.setDefault(templateProperty.defaultShow,false);
            } catch (error) {
                console.log(error);
            }
        }

        this.setState({ instantiationId, templateData,  effectElement, controlledElement, componentState, judgeParamLogic, show },this.triggerLoadData);
    }
    exportLoadDataFun = () =>{
        const { judgeParamLogic, controlledElement } = this.state;
        //get 请求参数
        const params = this.getComponentParam(controlledElement);
        if(!params || !judgeParamLogic) return null;
        let code  = judgeParamLogic.code;
        let value = judgeParamLogic.value;
        this.setState({show:params[code] == value});
    }
    renderLoading = () =>{
        return <Spin tip="Loading..."/>
    }
    renderContent = () =>{
        const { show } = this.state;
        const { children, style } = this.props;
        const childrenWithProps = React.Children.map(children, child => React.cloneElement(child));

        let _style = Object.assign({},style);
        if(!show) _style = Object.assign({opacity: 0,height: 0},_style);

        return <div style={_style}>{childrenWithProps}</div>
    }
    render() {
        const { componentState } = this.state;
        if(componentState == "WillMount") return null;
        else if(componentState == "InMount") return this.renderLoading();
        //渲染内容
        return this.renderContent();
    }
}

Index.propTypes = {
    id  : PropTypes.number.isRequired,
    style:PropTypes.object,
};

Index.defaultProps = {
    style:{}
}

export default Index;
