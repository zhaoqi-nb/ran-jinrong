'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Api from './store/api';
import { getEditTitle, getEditDrawerChartTitle } from '../../util/editTemplate/util';
import { getComparkeywordConfig } from './utils'
import Common from '../common/index';
import { Spin } from 'antd';
import debounce from 'lodash/debounce';
import { LoopTableTask } from '../common/expand/scheduler';
import LoopTableScrollWrapHoc from '../HOC/LoopTableScrollWrap';
import moment from 'moment';

class LoopIndustry extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.getQueryTableData = debounce(this.getQueryTableData, 100)
        window.global_download_params = this.getTableRequestParams;
    }

    componentDidMount() {
        this.initData();
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.setState(this.getInitialState())
    }
    getInitialState = () => {
        return {
            //组件状态  WillMount/挂载前（组件还未渲染）, InMount/挂载中（组件执行渲染，可能需要获取数据才可以初始化好）  DidMount/挂载完成（组件准备就绪）   
            componentState: "WillMount",
            data: {},
            paramsOptions: {},
        }
    }
    initData = () => {
        this.setState({ componentState: "InMount" })
    }

    // getLoopIndustryTableData = async (params, headerMapping) => {
    //     let { instantiationId } = this.props;
    //     //查询数据
    //     const result = await Api.getLoopIndustryTableData({ instantiationId, params: JSON.stringify(params), headerMapping: JSON.stringify(headerMapping) });
    //     let data = {};
    //     if (result.code == 200 && result.data) {
    //         data = result.data || {};
    //     }
    //     return data;
    // }
    // getLoopData = async (arr, param, headerMapping) => {
    //     let { loopKey } = this.props;
    //     let datas = [];
    //     for (let i = 0, len = arr.length; i < len; i++) {
    //         let code = arr[i];
    //         let newParam = Object.assign({}, param, { [loopKey]: code })
    //         let data = await this.getLoopIndustryTableData(newParam, headerMapping);
    //         datas = datas.concat(data);
    //     }
    //     let { instantiationId } = this.props;
    //     return datas;
    // }
    // 分批加载模式
    getLoopData = (arr, param, headerMapping) => {
        if (this.loopTableTask) {
            this.loopTableTask.destory()
        }

        const { loopKey, instantiationId, url } = this.props;
        this.loopTableTask = LoopTableTask.of({ codes: arr, loopKey, params: param, headerMapping, instantiationId, url }, Api)
            .run({
                next: data => {
                    this.setState({ data, paramsOptions: param, componentState: "DidMount" });
                },
                error: (error) => {
                }
            })
    }
    // TODO 分页暂时无法受控 后面加
    onChange = ({ pagination }, index) => {
        this.loopTableTask.getDataByIndex({ pagination }, index)
            .subscribe({
                next: ({ data: currentData, params }) => {
                    const { data, paramsOptions } = this.state;
                    data[index] = currentData
                    this.setState({ data: [...data], paramsOptions: params });
                }
            })
        // this.getQueryTableData(pagination)
    }
    // 获取模板内数据
    getQueryTableData = async (pagination) => {
        console.log('fasffaafffasfasfasffas');
        let { instantiationId, apiParamNames, loopKey, templateData, headerMapping, controlledElement, url } = this.props;

        // const pageSize = _.get(this.props, 'option.pageSize', 10)
        // console.log('his.props', templateData, this.props)
        if (url) {
            if (!instantiationId) return;
        } else {
            if (!instantiationId || !apiParamNames) return;
        }

        //get 请求参数
        const _params = this.props.getApiParam()
        let params = _params
        //后端分页初始化参数
        if (templateData.ifAsyncPage) {
            if (!pagination) {
                params = Object.assign({}, _params, { currentPage: 1, pageSize: templateData.pageSize || 10 })
            } else {
                params = Object.assign({}, _params, { currentPage: pagination.current, pageSize: pagination.pageSize })
            }
        }
        if (!_params) {
            setTimeout(this.getQueryTableData, 500);
            return null;
        }
        // const allParams = getComponentParam(controlledElement)
        // if (loopKey && allParams[`${loopKey}_data`]) {
        //     params[`${loopKey}_data`] = allParams[`${loopKey}_data`]
        //     params.loopKey = loopKey
        // }
        //循环
        let loopValue = params[loopKey] || '';
        const codes = loopValue.split(",")
        let newHeaderMapping = {}
        let code = null
        codes.map(item => {
            if (item.indexOf('AS') > -1) {
                code = item.split('AS')[1].trim()
            } else {
                code = item
            }
            Object.assign(newHeaderMapping, {
                [code]: {
                    type: "string",
                    columnStyle: {
                        "width": 150,
                        "fixed": "left",
                        "align": "center"
                    }
                }
            })
        })
        const _headerMapping = Object.assign({}, headerMapping, newHeaderMapping)
        // let data = await this.getLoopData(codes, params, _headerMapping);

        this.getLoopData(codes, params, _headerMapping);

        // this.setState({ data, paramsOptions: _params, componentState: "DidMount" });
    }

    getTableRequestParams = async (props = this.props) => {
        //get 请求参数
        let { instantiationId, apiParamNames, loopKey, templateData, headerMapping, controlledElement, url } = props;
        const _params = this.props.getApiParam()
        let params = _params
        //后端分页初始化参数
        if (templateData.ifAsyncPage) {
            if (!pagination) {
                params = Object.assign({}, _params, { currentPage: 1, pageSize: templateData.pageSize || 10 })
            } else {
                params = Object.assign({}, _params, { currentPage: pagination.current, pageSize: pagination.pageSize })
            }
        }
        if (!_params) {
            await new Promise((resolve, reject) => { setTimeout(() => { resolve(); }, 500); })
            // setTimeout(this.getTableRequestParams, 500);
            await getTableRequestParams(props);

        }
        // const allParams = getComponentParam(controlledElement)
        // if (loopKey && allParams[`${loopKey}_data`]) {
        //     params[`${loopKey}_data`] = allParams[`${loopKey}_data`]
        //     params.loopKey = loopKey
        // }
        //循环
        let loopValue = params[loopKey] || '';
        const codes = loopValue.split(",")
        let newHeaderMapping = {}
        let code = null
        codes.map(item => {
            if (item.indexOf('AS') > -1) {
                code = item.split('AS')[1].trim()
            } else {
                code = item
            }
            Object.assign(newHeaderMapping, {
                [code]: {
                    type: "string",
                    columnStyle: {
                        "width": 150,
                        "fixed": "left",
                        "align": "center"
                    }
                }
            })
        })
        //   const _headerMapping = Object.assign({}, headerMapping, newHeaderMapping)

        Object.keys(params).forEach((item) => {
            if (params[item] === undefined) {
                delete params[item];
            }
        })

        return params;
    }
    renderTools = () => {
        return null
    }
    renderContent = () => {
        const { data, paramsOptions } = this.state;
        const { sortIndex, id, titleRender, columnsRender, controlledElement, titleOption, templateData, onOpenPopup, titleKeys, chartTitleOption, chartIndex, ifDownload } = this.props
        let html = [];
        //表格弹出层 标题
        let chartTitleData = chartTitleOption ? getEditDrawerChartTitle(controlledElement, templateData.chartTitleOption) : "";

        // this is table row color setting
        let param = {
            option: { ...templateData, type: "trend", ...paramsOptions, chartTitleData },
            // title,
            titleKeys,
            data,
            onOpenPopup,
            columnsRender,
            titleRender,
            ifDownload,
            chartIndex,
            sortIndex,
            onLoopEvent: this.props.onLoopEvent,
            onAddLoopScrollTableWrap: this.props.onAddLoopScrollTableWrap,
            onAddLoopTableComponent: this.props.onAddLoopTableComponent,
            ...getComparkeywordConfig(controlledElement, this.props),
            // onChange: this.onChange
        }
        for (let i = 0, len = data.length; i < len; i++) {
            let obj = data[i];
            param.downIndex = i;
            param.onChange = (...args) => this.onChange(...args, i)
            let temp = Object.assign({}, param, { "data": obj });
            const title = getEditTitle(controlledElement, templateData.titleOption, {}, '-', i);
            console.log('qiaojie=title=>', temp, title)
            temp.title = titleOption ? title : "";
            console.log('temp=>', temp);
            //如果是周的，显示具体时间
            if (temp.option.type == "trend" && (temp.option.date_type == "week_yyyyww")) {
                //  || currProps.date_type == "week")) {
                temp?.data?.columns.forEach((item, index) => {
                    if (index > 0) {
                        if (item._handelCell) {
                            return;
                        }
                        item._handelCell = true;
                        const str = `${moment(item.title, "YYYY-WW周").startOf('week').format("MM-DD")} ~ ${moment(item.title, "YYYY-WW周").endOf('week').format("MM-DD")}`
                        item.title = moment(item.title, "YYYY-WW周").startOf('week').format("MM-DD") != "Invalid date" ?
                            item.title + `\\n` + str
                            : item.title
                    }
                })
            }
            html.push(<Common {...temp} />);
        }
        return html
    }
    renderLoading = () => {
        return <Spin tip="Loading..." />
    }
    render() {
        const { componentState } = this.state;
        console.log('componentStatecomponentState', componentState)
        if (componentState == "WillMount") return null;
        else if (componentState == "InMount") return this.renderLoading();
        //渲染内容
        return (
            <div>
                {this.renderTools()}
                {this.renderContent()}
            </div>
        )
    }
}
LoopIndustry.propTypes = {

};

export default LoopTableScrollWrapHoc(LoopIndustry);