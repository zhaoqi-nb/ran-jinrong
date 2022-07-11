'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Api from './store/api';
import { i18n } from '@/components/FastIntl';
import _ from 'lodash';

import { Input, Row, Col, Pagination } from 'antd';
import FilterOption from '@filterOption/common';
import Custom_Date from "@date/common";
import ReportList from './reportList';
import { GetQueryString, getUrlPath } from '@util';
import './index.less';

const { Search } = Input;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
            //组件是否准备就绪
            isReady: false,
            //行业选择
            industryOption: [{ name: i18n.format("不限"), code: '1' }, { name: i18n.format("消费"), code: '2' }, { name: i18n.format("互联网"), code: '3' }],
            //报告类型
            reportTypeOption: [{ name: i18n.format("不限"), code: '0' }, { name: i18n.format("常规报告"), code: '1' }, { name: i18n.format("特殊事件"), code: '2' }, { name: i18n.format("深度报告"), code: '3' }],
            //报告列表
            data: [],
            //分页数据
            pageProps: {pageSize: 5, currentPage: 1},
            // 筛选项
            filterObj: { reportView: '0' },
            //表格加载
            loading: true,
            //类型：公司、行业
            queryType: "",
            //公司名称/行业名称
            resName: ""
        }
    }
    componentDidMount() {
        this.initData()
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }

    initData = () => {
        const { filterObj, pageProps } = this.state;
        const menu = this.getData(PAGEMIXDATA);
        console.log("用户", menu)
        const resName = menu.leftMenu.resName;
        //判断公司、行业类型
        const path = getUrlPath();
        let queryType = '';
        if (path.indexOf('company') !== -1) {
            queryType = "company"
        } else {
            queryType = "industry"
        }
        this.setState({ resName, queryType, loading: true }, () => {
            this.getShowReportListForSaas({
                ...filterObj,
                ...pageProps,
                [queryType]: resName
            })
        })
    }

    getShowReportListForSaas = async (param) => {
        const result = await Api.getShowReportListForSaas({ ...param, guestType: "二级市场" });
        if (result.code == 200) {
            console.log("报告列表", result)
            const list = result?.data?.rsList || [];
            const pageProps = result?.data?.pages || {};

            if (Array.isArray(list) && list.length) {
                list.map((item, index) => {
                    switch (item.inFlag) {
                        case 0:
                            item['status'] = '';
                            item['haveAccess'] = false;
                            break;
                        case 1:
                            item['haveAccess'] = true;
                            break;
                        case 2:
                            item['status'] = 'auditing';
                            item['haveAccess'] = false;
                            break;
                        case 3:
                            item['status'] = 'haveAudited';
                            item['haveAccess'] = true;
                            break;
                        case 4:
                            item['status'] = 'noPass';
                            item['haveAccess'] = false;
                            break;
                        default:
                            break;
                    }
                })
            }
            console.log("格式化===", list)
            this.setState({ data: list, pageProps, loading: false })
        }
    }

    updateList = async () => {
        const { pageProps, queryType, resName } = this.state;
        this.setState({ loading: true }, () => {
            this.getShowReportListForSaas({
                ...this.state.filterObj,
                [queryType]: resName,
                pageSize: pageProps.pageSize,
                currentPage: pageProps.currentPage
            })
        })

    }

    //获取登录用户信息
    getData = (data) => {
        if (!data) return;
        data = Base64.decode(data);
        if (!data) return;
        try {
            data = JSON.parse(data);
        } catch (error) {
            return null;
        }
        return data;
    }

    onSearch = (type, value) => {
        console.log("搜索", type, value)
        const { pageProps, filterObj, queryType, resName } = this.state;
        if (type == "date") {
            const {start_date, end_date} = value;
            this.setState({filterObj: {...filterObj, startDate: start_date, endDate: end_date}, loading: true}, ()=> {
                this.getShowReportListForSaas({
                    ...this.state.filterObj,
                    [queryType]: resName,
                    pageSize: pageProps.pageSize || 5,
                    currentPage: 1
                })
            })
        } else if (type == "reportView") {
            this.setState({ filterObj: { ...filterObj, reportView: value?.code }, loading: true}, () => {
                this.getShowReportListForSaas({
                    ...this.state.filterObj,
                    [queryType]: resName,
                    pageSize: pageProps.pageSize,
                    currentPage: 1
                })
            })
        }
    }

    onChange = (pageNumber, pageSize) => {
        console.log('Page: ', pageNumber, pageSize);
        const { pageProps, queryType, resName, filterObj} = this.state;
        //请求分页数据
        this.setState({loading: true}, () => {
            this.getShowReportListForSaas({
                ...filterObj,
                [queryType]: resName,
                currentPage: pageNumber,
                pageSize
            })
        })
    }


    render() {
        const { reportTypeOption, data, pageProps, loading } = this.state;

        return (
            <div style={{ padding: '16px 0px 47px' }} className="report-analysis-container">
                <div className="filter-container">
                    <FilterOption title={`${i18n.format("报告类型")}`} type="multiple" isMutualExcluion={true} style={{ marginBottom: '16px', marginRight: '48px'}} data={reportTypeOption} selectId={'0'} onSelect={(value) => { this.onSearch('reportView', value) }} />
                    <Custom_Date title={`${i18n.format("发布时间")}`} date_type={"day"} isCompleteOpen={true} type={"double"} style={{ marginTop: 0, marginBottom: '16px' }} onChange={(value) => { this.onSearch('date', value) }} />
                </div>
                <ReportList data={data} total={pageProps?.totalCount || 0} loading={loading} updateList={this.updateList} />
                <Pagination style={{ textAlign: 'right' }} pageSizeOptions={[5, 10, 15, 20]} showSizeChanger current={pageProps.currentPage} total={pageProps.totalCount} defaultPageSize={5} onChange={this.onChange} />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;