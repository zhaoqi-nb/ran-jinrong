'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Component from '../../util/component';

import { Spin } from 'antd';
import Common from '../common/index';

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
    getInitialState = () =>{
        return {
            //组件状态  WillMount/挂载前（组件还未渲染）, InMount/挂载中（组件执行渲染，可能需要获取数据才可以初始化好）  DidMount/挂载完成（组件准备就绪）   
            componentState    : "WillMount",
            instantiationId   : null,
            //组件数据
            templateData      : null,
            
            title             : null,
            list              : null,
            style             : null,

            //受控元素
            controlledElement : null,
        }
    }
    queryComponentData = () =>{
        const { id }          = this.props;
        const tempData        = this.getTemplateData(id);//{templatePropertyValueJson: {title: "子公司跳转", data: [{title:"个护",value:"/"},{title:"生活电器",value:"/error"},{title:"厨房小电",value:"/dianqi"}]}};
        //defalut value
        let instantiationId   = null,
            templateData      = null,
            title             = null,
            list              = null,
           style             = {},
           controlledElement = [],
            //组件状态
           componentState    = "InMount";

        //分解数据
        if(tempData){
            try {
                let templateProperty  = tempData.templatePropertyValueJson;

                    instantiationId   = tempData.instantiationId;
                    templateData      = templateProperty;

                    title             = this.setDefault(templateProperty.title, "");
                    list              = this.setDefault(templateProperty.data,[]);
                    style             = this.setDefault(templateProperty.style, {});
                    controlledElement = this.setDefault(templateProperty.controlledElement, []);

                    //更新组件状态
                    componentState = "DidMount";

            } catch (error) {
                console.log(error);
            }
        }

        this.setState({ instantiationId, templateData, title, list, style, controlledElement, componentState }, this.triggerLoadData);
    }

    renderLoading = () =>{
        return <Spin tip="Loading..."/>
    }

    renderContent = () =>{
        const { instantiationId, title, list, style } = this.state;
        let param = {
            id:instantiationId,
            title, 
            list,
            style
        };
        return <Common {...param}/>
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
    id : PropTypes.number.isRequired,
};

Index.defaultProps = {
    id : "",
}

export default Index;
