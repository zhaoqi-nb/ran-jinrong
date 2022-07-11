'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Api from './store/api';
import { getEditTitle, getEditDrawerChartTitle } from '../../util/editTemplate/util';
import Common from '../common/index';
import _ from 'lodash';
import moment from 'moment';
import { getPrivilegeData, getKeyPrivilege } from '../../util/template';

import { Spin } from 'antd';

class Normal extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.tableRef = React.createRef();
        this.downloadTableRef = React.createRef();
        window.global_download_params = this.getTableRequestParams;
    }

    componentDidMount() {
        this.initData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        // this.initData(nextProps);
    }

    componentWillUnmount() {
        this.setState(this.getInitialState())
    }
    getInitialState = () => {
        return {
            //组件状态  WillMount/挂载前（组件还未渲染）, InMount/挂载中（组件执行渲染，可能需要获取数据才可以初始化好）  DidMount/挂载完成（组件准备就绪）   
            componentState: "WillMount",
            loading: false,
            data: {},
            paramsOptions: {},
            isUpdate: null,
            //是否是定制化接口
            url: null
        }
    }
    initData = (props) => {
        this.setState({ componentState: "InMount" }, () => {
            this.getQueryTableData(props)
        })
    }
    // 获取模板内数据
    getQueryTableData = async (props = this.props, pagination, sortField, sortType) => {
        let { instantiationId, apiParamNames, type, templateData, headerMapping, url, sortConfig, isUpdate, noZBDataParam } = props;

        if (!this.downloadTableRef.current) {
            this.downloadTableRef.current = {};
        }
        this.downloadTableRef.current.pagination = pagination;
        this.downloadTableRef.current.sortField = sortField;
        this.downloadTableRef.current.sortType = sortType;

        const { paramsOptions, loading } = this.state;
        if (url) {
            if (!instantiationId) return;
        } else {
            if (!instantiationId || !apiParamNames) return;
        }

        //get 请求参数
        const _params = this.props.getApiParam();

        if (!_params || loading) {
            setTimeout(this.getQueryTableData, 500);
            return null;
        }
        let params = _.cloneDeep(_params)
        //后端分页初始化参数
        if (templateData.ifAsyncPage) {
            if (!pagination) {
                params = Object.assign({}, params, { currentPage: 1, pageSize: templateData.pageSize || 10 })
            } else {
                params = Object.assign({}, params, { currentPage: pagination.current, pageSize: pagination.pageSize })
            }
        }
        //后端排序
        if (templateData.ifAsyncSorter) {
            if (!sortField && !sortType) {
                const tableSortField = this.tableRef?.current?.state?.sortField;
                const tableSortType = this.tableRef?.current?.state?.sortType;
                sortField = tableSortField || sortConfig.defaultActive
                sortType = tableSortType || sortConfig.defaultOrder
            }
            params = Object.assign({}, params, { sortField, sortType: sortType == "ascend" ? "asc" : sortType == "descend" ? "desc" : "", noZBDataParam })
        }

        delete params.noZBDataParam
        if (noZBDataParam) {
            if (params.content_name_data) {
                delete params.content_name_data
            } else if (params.select_codes_data) {
                delete params.select_codes_data
            }
        }
        // 获取行业权限
        let privilegeData = getPrivilegeData(["first_type_limit_app"])
        let first_type_limit_app = _.get(privilegeData, 'first_type_limit_app.data', null)
        first_type_limit_app = first_type_limit_app ? first_type_limit_app.join(',') : first_type_limit_app
        let privilegeData1 = getPrivilegeData(["first_type_no_limit_app"])
        let first_type_no_limit_app = _.get(privilegeData1, 'first_type_no_limit_app.data', null)
        first_type_no_limit_app = first_type_no_limit_app ? first_type_no_limit_app.join(',') : first_type_no_limit_app
        let privilegeData2 = getPrivilegeData(["second_type_limit_app"])
        let second_type_limit_app = _.get(privilegeData2, 'second_type_limit_app.data', null)
        second_type_limit_app = second_type_limit_app ? second_type_limit_app.join(',') : second_type_limit_app
        let privilegeData3 = getPrivilegeData(["second_type_no_limit_app"])
        let second_type_no_limit_app = _.get(privilegeData3, 'second_type_no_limit_app.data', null)
        second_type_no_limit_app = second_type_no_limit_app ? second_type_no_limit_app.join(',') : second_type_no_limit_app

        params = Object.assign({}, params, {
            first_type_limit_app, first_type_no_limit_app, second_type_limit_app, second_type_no_limit_app
        })

        //判断前后两次请求参数是否一样，如果一样，则return
        if (JSON.stringify(Object.assign({}, paramsOptions, { isUpdate: this.state.isUpdate })) == JSON.stringify(Object.assign({}, params, { isUpdate }))) return null;


        this.setState({ loading: true })
        // 处理动态url
        if (url === "fromParam") {
            url = params.url
            delete params.url
        }

        //查询数据
        const result = await Api.getQueryTableData({ instantiationId, type, params: JSON.stringify(params), headerMapping: JSON.stringify(headerMapping), url });
        console.log('data=>', result, params, type);

        //如果是周的，显示具体时间
        if (type == "trend" && (params.date_type == "week_yyyyww")) {
            //  || currProps.date_type == "week")) {
            result?.data?.columns.forEach((item, index) => {
                if (index > 0) {
                    const str = `${moment(item.title, "YYYY-WW周").startOf('week').format("MM-DD")} ~ ${moment(item.title, "YYYY-WW周").endOf('week').format("MM-DD")}`
                    item.title = moment(item.title, "YYYY-WW周").startOf('week').format("MM-DD") != "Invalid date" ?
                        item.title + `\\n` + str
                        : item.title
                }
            })
        }

        let data = {};
        if (result.code == 200 && result.data) {
            data = result.data || {};
        }
        this.setState({ data, paramsOptions: params, componentState: "DidMount", loading: false, isUpdate });
    }

    getTableRequestParams = async (props = this.props) => {
        let { instantiationId, apiParamNames, type, templateData, headerMapping, url, sortConfig, isUpdate, noZBDataParam } = props;
        const _params = this.props.getApiParam();
        let { pagination, sortField, sortType } = this.downloadTableRef.current;

        if (!_params) {

            await new Promise((resolve, reject) => { setTimeout(() => { resolve(); }, 500); })
            // setTimeout(this.getTableRequestParams, 500);
            await getTableRequestParams(props);
        }
        let params = _.cloneDeep(_params);
        //后端分页初始化参数
        if (templateData.ifAsyncPage) {
            if (!pagination) {
                params = Object.assign({}, params, { currentPage: 1, pageSize: templateData.pageSize || 10 })
            } else {
                params = Object.assign({}, params, { currentPage: pagination.current, pageSize: pagination.pageSize })
            }
        }
        //后端排序
        if (templateData.ifAsyncSorter) {
            if (!sortField && !sortType) {
                const tableSortField = this.tableRef?.current?.state?.sortField;
                const tableSortType = this.tableRef?.current?.state?.sortType;
                sortField = tableSortField || sortConfig.defaultActive
                sortType = tableSortType || sortConfig.defaultOrder
            }
            params = Object.assign({}, params, { sortField, sortType: sortType == "ascend" ? "asc" : sortType == "descend" ? "desc" : "", noZBDataParam })
        }

        delete params.noZBDataParam
        if (noZBDataParam) {
            if (params.content_name_data) {
                delete params.content_name_data
            } else if (params.select_codes_data) {
                delete params.select_codes_data
            }
        }

        Object.keys(params).forEach((item) => {
            if (params[item] === undefined) {
                delete params[item];
            }
        })
        return params;
    }

    onChange = ({ pagination, sortField, sortType }, index) => {
        // this.props.clearAttentionArr()
        this.getQueryTableData(this.props, pagination, sortField, sortType)
    }
    renderContent = () => {
        const { data, paramsOptions } = this.state;
        const { sortIndex, titleRender, columnsRender, controlledElement, titleOption, templateData, onOpenPopup, titleKeys, chartTitleOption, chartIndex, ifDownload, rowSelection, pagination, showFocus, onFocus, download } = this.props;
        //获取标题
        let title = titleOption ? getEditTitle(controlledElement, templateData.titleOption) : "";
        //表格弹出层 标题
        let chartTitleData = chartTitleOption ? getEditDrawerChartTitle(controlledElement, templateData.chartTitleOption) : "";

        const option = { ...templateData, ...paramsOptions, chartTitleData }

        let param = {
            option,
            title,
            titleKeys,
            data,
            onOpenPopup,
            columnsRender,
            titleRender,
            ifDownload,
            chartIndex,
            rowSelection,
            onRowSelectionChange: this.props.onRowSelectionChange,
            sortIndex,
            paramsOptions,
            onChange: this.onChange,
            pagination,
            showFocus,
            onFocus,
            tableRef: this.tableRef,
            download,
            getTableRequestParams: this.getTableRequestParams,
        };
        return <Common {...param} />
    }
    renderLoading = () => {
        return <Spin tip="Loading..." />
    }
    render() {
        const { componentState } = this.state;
        if (componentState == "WillMount") return null;
        else if (componentState == "InMount") return this.renderLoading();
        //渲染内容
        return this.renderContent();
    }
}
Normal.propTypes = {

};

export default Normal;