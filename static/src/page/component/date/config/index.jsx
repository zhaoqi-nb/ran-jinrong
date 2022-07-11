'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Component from '../../util/component';
import { getPrivilegeData } from '../../util/template';
import { Spin } from 'antd';
import Common from '../common/index';
import EditTemplate from '../../util/editTemplate/index';

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
            effectElement: null,
            title: null,
            type: null,
            date_type: null,
            date_types: null,
            fixDate_range: null,
            //特殊周类型，
            date_option: null,
            paramKey: null,

            //组件回传回来的参数值
            value: null,
        }
    }
    queryComponentData = () => {
        const { id } = this.props;
        const tempData = this.getTemplateData(id);
        //defalut value
        let instantiationId = null,
            rootInstantiationId = null,
            templateData = null,
            controlledElement = [],
            effectElement = [],
            title = "",
            type = "",
            date_type = "",
            date_types = [],
            paramKey = {},
            date_option = null,
            fixDate_range = null,
            ifLimitWeekRegion = null,
            isPM = null,
            //组件状态
            componentState = "InMount";

        //分解数据
        if (tempData) {
            try {
                let templateProperty = tempData.templatePropertyValueJson;

                instantiationId = tempData.instantiationId;
                rootInstantiationId = tempData.rootInstantiationId;
                templateData = templateProperty;

                title = this.setDefault(templateData.title);
                type = this.setDefault(templateData.type, "single");
                date_types = this.setDefault(templateData.date_types, ["month"]);
                date_type = this.setDefault(templateData.date_type, date_types[0]);
                date_option = this.setDefault(templateData.date_option, null);
                paramKey = this.setDefault(templateData.paramKey, null);

                effectElement = this.setDefault(templateData.effectElement, []);
                controlledElement = this.setDefault(templateData.controlledElement, []);

                fixDate_range = this.setDefault(templateData.fixDate_range, []);
                ifLimitWeekRegion = this.setDefault(templateData.ifLimitWeekRegion, true);

                //区分一级市场还是二级市场的日期组件 isPM = true 一级市场
                isPM = this.setDefault(this.state.isPM, false);
                componentState = "DidMount";

                //获取权限操作数据
                //date_types_app : {"data":["month"]}
                //date_types_app_id : {"24":{"data":["month"]}}
                let privilege = getPrivilegeData(["date_types_app", "date_types_app_id"]);
                if (privilege) {
                    let date_types_app = privilege.date_types_app;
                    if (date_types_app && date_types_app.data) {
                        date_types = date_types_app.data;
                    }
                    let date_types_app_id = privilege.date_types_app_id;
                    if (date_types_app_id && date_types_app_id[instantiationId]) {
                        let temp = date_types_app_id[instantiationId];
                        date_types = temp.data;
                    }
                    if (date_types && date_types.length) date_type = date_types[0];
                }
            } catch (error) {
                console.log(error);
            }
        }

        // this.setState({ instantiationId, templateData, controlledElement, effectElement, title, type, date_type, date_types, date_option, paramKey, componentState }, this.triggerLoadData);
        this.setState({ instantiationId, rootInstantiationId, templateData, controlledElement, effectElement, title, type, date_type, date_types, date_option, paramKey, fixDate_range, ifLimitWeekRegion, isPM, componentState });
    }
    //对外提供参数方法
    exportParamFun = () => {
        const { componentState, paramKey, value } = this.state;
        //判断组件是否准备就绪
        if (componentState != "DidMount" || !value) return null;
        //调用组件内方法，返回数据
        let exportDate = {};
        if (paramKey && paramKey.constructor == Object) {
            if (paramKey["date_type"]) exportDate[paramKey["date_type"]] = value.date_type;
            if (paramKey["start_date"]) exportDate[paramKey["start_date"]] = value.start_date;
            if (paramKey["end_date"]) exportDate[paramKey["end_date"]] = value.end_date;
            if (paramKey["stat_date"]) exportDate[paramKey["stat_date"]] = value.stat_date;
            if (paramKey["week_stat"]) exportDate[paramKey["week_stat"]] = value.week_stat;
            if (paramKey["month_stat"]) exportDate[paramKey["month_stat"]] = value.month_stat;
            if (paramKey["quarter_stat"]) exportDate[paramKey["quarter_stat"]] = value.quarter_stat;
            if (paramKey["max_date"]) exportDate[paramKey["max_date"]] = value.max_date;
        } else exportDate = value;
        return exportDate;
    }
    renderLoading = () => {
        return <Spin tip="Loading..." />
    }
    handleChange = (obj) => {
        if (obj && obj.date_type) {
            this.setState({ value: obj }, this.triggerLoadData);
        }
    }

    exportLoadDataFun = () => {
        const { controlledElement } = this.state;
        const params = this.getComponentParam(controlledElement);
        console.log('params=>', params);
        if (params && params.download_type) {
            if (params.download_type.indexOf('2') != -1) {
                this.setState({
                    type: null,
                }, () => {
                    this.setState({
                        type: 'double'
                    })
                })
            } else {
                this.setState({
                    type: null,
                }, () => {
                    this.setState({
                        type: 'single'
                    })
                })
            }
        }
        
        // if (!templateData.data) {
        //     this.setState({ value: "" }, this.getTemplateSelectData)
        //     // this.getTemplateSelectData()
        // }
    }

    renderContent = () => {
        const { rootInstantiationId, title, type, date_type, date_types, date_option, fixDate_range, ifLimitWeekRegion, isPM } = this.state;
        const { id, style, className, select_style } = this.props;
        let param = {
            id,
            rootInstantiationId,
            title,
            style,
            select_style,
            className,
            type,
            date_type,
            date_types,
            fixDate_range,
            ifLimitWeekRegion,
            isPM,
            date_option,
            onChange: this.handleChange
        };
        return type && <Common {...param} />
    }
    render() {
        const { componentState, instantiationId } = this.state;
        if (componentState == "WillMount") return null;
        else if (componentState == "InMount") return this.renderLoading();
        //渲染内容
        return <EditTemplate instantiationId={instantiationId} style={{ display: "inline-block" }} >
            {this.renderContent()}
        </EditTemplate>
    }
}

Index.propTypes = {
    id: PropTypes.number.isRequired,
    style: PropTypes.object,
};

Index.defaultProps = {
    style: {}
}

export default Index;
