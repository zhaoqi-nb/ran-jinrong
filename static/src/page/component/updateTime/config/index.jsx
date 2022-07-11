'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Component from '../../util/component';
import { Spin } from 'antd';
import Common from '../common/index';
import Api from './store/api';
import EditTemplate from '../../util/editTemplate/index';
import i18n from '@/plugin/i18n';
import moment from 'moment';

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
            //日期类型，时间,title
            title: null,
            date_type: null,
            stat_date: null,
            //是否展示为过去30日的形式   应用在618行业整体分析里
            isLast30Days: null
        }
    }
    queryComponentData = async () => {
        const { id } = this.props;
        const tempData = this.getTemplateData(id);
        //defalut value
        let instantiationId = null,
            rootInstantiationId = null,
            templateData = null,
            controlledElement = [],
            componentState = "InMount",
            apiParamNames = null,
            title = null,
            suffix = null,
            isLast30Days = null;
        //分解数据
        if (tempData) {
            try {
                let templateProperty = tempData.templatePropertyValueJson;

                instantiationId = tempData.instantiationId;
                rootInstantiationId = tempData.rootInstantiationId;
                templateData = templateProperty;
                title = this.setDefault(templateProperty.title, []);
                suffix = this.setDefault(templateProperty.suffix, "");
                isLast30Days = this.setDefault(templateProperty.isLast30Days, false);
                apiParamNames = this.setDefault(tempData.backendPropertyValue, null);
                controlledElement = this.setDefault(templateProperty.controlledElement, []);
            } catch (error) {
                console.log(error);
            }
        }

        this.setState({ instantiationId, rootInstantiationId, templateData, controlledElement, title, suffix, isLast30Days, apiParamNames, componentState }, this.getUpdateData);
    }

    exportLoadDataFun = () => {
        this.getUpdateData();
    }
    //调用api获取日期
    getUpdateData = async () => {
        let { instantiationId, apiParamNames, isPM, isLast30Days, rootInstantiationId } = this.state;

        let stat_date = null;
        let params = null;
        if (isPM) {
            //一级市场
            if (!instantiationId) return;

            params = this.getApiParam();
            console.log('数据周期params=>', params);
            if (!params) {
                setTimeout(this.getUpdateData, 500);
                return null;
            }

            if(isLast30Days) {
                let new_stat_date = moment(params.stat_date, 'YYYYMMDD').format("YYYY-MM-DD");
                stat_date = `${i18n.format("截止")}${new_stat_date}${i18n.format("过去30日")}`
            } else {
                const pmParam = {
                    params: JSON.stringify({ ...params, tab_type: params?.end_date ? "trend" : "section"}),
                    rootInstantiationId
                }
                const result = await Api.getDataCycle(pmParam);
                console.log("一级数据周期", result)
                if(result.code == 200) {
                    try {
                        stat_date = result.data;
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
           
        } else {
            //二级市场
            if (!instantiationId || !apiParamNames) return;

            params = this.getApiParam();
            console.log('数据周期params=>', params);
            if (!params) {
                setTimeout(this.getUpdateData, 500);
                return null;
            }

            const result = await Api.getUpdateData({
                instantiationId,
                params: params == -1 ? {} : JSON.stringify(params)
            })

            if (result.code == 200) {
                try {
                    stat_date = result.data.result.data;
                } catch (error) {
                    console.log(error)
                }
            }
        }

        this.setState({ date_type: params.date_type, stat_date, componentState: 'DidMount' })
    }

    renderLoading = () => {
        return <Spin tip="Loading..." />
    }

    renderContent = () => {
        const { instantiationId, stat_date, date_type, title, suffix } = this.state;
        let param = {
            id: instantiationId,
            title,
            date_type,
            stat_date,
            suffix,
            style: this.props.style,
            className: this.props.className
        };
        return <Common {...param} />
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
};

Index.defaultProps = {
}

export default Index;
