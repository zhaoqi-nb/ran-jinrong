'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, getPageParam } from '../../../../utils/Util';

import EditProperty from './property/index';
import EditTitle from './title/index';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu-ranshu";

import ConcatRequest from '../concatRequest'
import Api from './store/api';
import { Base64ToJson } from '../format';
import './index.less';

const mergeTempInfo = new ConcatRequest()

class EditTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState()
        const that = this
        this.tempClear = mergeTempInfo.on((data) => {
            console.log('params====yes', this)
            const { instantiationId} = this.props;
            const config = _.find(data, {instantiationId})
            if(config) {
                that.setServerData(config, instantiationId)
            }
            // console.log('TEMPLATELIST', Base64ToJson(TEMPLATELIST), this, data, config)
        })
    }
 
    componentDidMount() {
        this.initData();
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.tempClear.unsubscribe()
        this.setState(this.getInitialState())
    }
    getInitialState = () =>{
        return {
            //组件是否准备就绪
            isReady: false,
        }
    }
    initData = async() =>{
        const { instantiationId} = this.props;
        if(!instantiationId) return;
        // this.getTemplateInfo(instantiationId);

        let isReady      = true;
        let templateData = null,
            templateId   = null;
        
        // 获取用户id
        let menuData = getPageParam(PAGEMIXDATA),
            userInfo = menuData?menuData.userInfo:null;

        let templateInfo = await this.getTemplateInfo(instantiationId);
            if(templateInfo){
                templateData = templateInfo.templatePropertyValueJson
                templateId   = templateInfo.templateId
            }
        this.setState({isReady, instantiationId, templateId, templateData, userInfo })
    }

    setServerData = (templateInfo, instantiationId) => {
        let isReady      = true;
        let templateData = null,
            templateId   = null;
        let menuData = getPageParam(PAGEMIXDATA),
            userInfo = menuData?menuData.userInfo:null;

            if(templateInfo){
                templateData = templateInfo.templatePropertyValueJson
                templateId   = templateInfo.templateId
            }
        this.setState({isReady, instantiationId, templateId, templateData, userInfo })
    }
    
    getTemplateInfo = async(instantiationId)=>{
        // mergeTempInfo.emit({instantiationId})
        let result = await Api.getTemplateInfo({instantiationId});
        // console.log('获取魔板的数据')
        let templateData = null;
        if(result.code==200 && !isEmpty(result.data)){
            templateData = result.data[0];
        }
        return templateData;
    }
    render() {
        const { isReady, instantiationId } = this.state;
        const { children, style } = this.props;
        if(!isReady) return null;
        const _style = Object.assign({}, style);
        if(process.env.NODE_ENV == "production"){
            return <div className="tool-wrapper" style={_style} id={`edit_${instantiationId}`}>
                        {children}
                    </div>
        }else return (
            <div className="tool-wrapper" style={_style}>
                <ContextMenuTrigger id={`edit_${instantiationId}`}>
                    {children}
                </ContextMenuTrigger>
                <ContextMenu id={`edit_${instantiationId}`} className="tool-content">
                    <EditProperty {...this.state}/>
                    <EditTitle {...this.state}/>
                </ContextMenu>
            </div>
        );
    }
}

EditTemplate.propTypes = {
    instantiationId: PropTypes.number,
    children       : PropTypes.element,
    style          : PropTypes.object
};

export default EditTemplate;