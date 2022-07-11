'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Api from './store/api';
import { getAccessState } from '../../page/component/util/template';
import { i18n } from '@/components/FastIntl';
import { FormattedMessage } from '@/components/FastIntl';
import _ from 'lodash';

import { Select, Input, Row, Col, Pagination } from 'antd';
import CustomSelect from '@select/common';
import FilterOption from '@filterOption/common';
import Custom_Date from "@date/common";
import ReportList from './reportList';


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
            //行业选择 -二级市场
            industryOption: [{ name: i18n.format("不限"), code: '1' }, { name: i18n.format("消费"), code: '2' }, { name: i18n.format("互联网"), code: '3' }],
            // 行业选择-一级市场
            industryOptionPM: [{ name: i18n.format("不限"), code: '1' }, { name: i18n.format("消费"), code: '2' }],
            //报告类型
            reportTypeOption: [{ name: i18n.format("不限"), code: '0' }, { name: i18n.format("常规报告"), code: '1' }, { name: i18n.format("特殊事件"), code: '2' }, { name: i18n.format("深度报告"), code: '3' }],
            //报告列表
            data: [],
            //分页数据
            pageProps: { pageSize: 5, currentPage: 1 },
            // 筛选项
            filterObj: { title: "", showType: '1', reportView: '0' },
            //表格加载
            loading: true
        }
    }
    componentDidMount() {
        const { filterObj, pageProps } = this.state;
        this.getShowReportListForSaas({ ...filterObj, ...pageProps })
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }

    getShowReportListForSaas = async (param) => {
        const { guestType } = this.props;
        const result = await Api.getShowReportListForSaas({ ...param, guestType });
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
        const { pageProps } = this.state;
        this.setState({ loading: true }, () => {
            this.getShowReportListForSaas({
                ...this.state.filterObj,
                pageSize: pageProps.pageSize,
                currentPage: pageProps.currentPage
            })
        })
    }

    onSearch = (type, value) => {
        console.log("搜索", type, value)
        const { pageProps, filterObj } = this.state;
        if (type == "reportTitle") {
            this.setState({ filterObj: { ...filterObj, title: value || "" }, loading: true }, () => {
                this.getShowReportListForSaas({
                    ...this.state.filterObj,
                    pageSize: pageProps.pageSize,
                    currentPage: 1
                })
            })
        } else if (type == "date") {
            const { start_date, end_date } = value
            this.setState({ filterObj: { ...filterObj, startDate: start_date, endDate: end_date }, loading: true }, () => {
                this.getShowReportListForSaas({
                    ...this.state.filterObj,
                    pageSize: pageProps.pageSize || 5,
                    currentPage: 1
                })
            })
        } else if (type == "industry") {
            this.setState({ filterObj: { ...filterObj, showType: value?.code }, loading: true }, () => {
                this.getShowReportListForSaas({
                    ...this.state.filterObj,
                    pageSize: pageProps.pageSize,
                    currentPage: 1
                })
            })
        } else if (type == "reportView") {
            this.setState({ filterObj: { ...filterObj, reportView: value?.code }, loading: true }, () => {
                this.getShowReportListForSaas({
                    ...this.state.filterObj,
                    pageSize: pageProps.pageSize,
                    currentPage: 1
                })
            })
        }
    }

    onChange = (pageNumber, pageSize) => {
        console.log('Page: ', pageNumber, pageSize);
        const { pageProps, filterObj } = this.state;
        //请求分页数据
        this.setState({ loading: true }, () => {
            this.getShowReportListForSaas({ ...filterObj, currentPage: pageNumber, pageSize })
        })
    }

    render() {
        const { guestType } = this.props;
        const { reportTypeOption, industryOption, industryOptionPM, data, pageProps, filterObj, loading } = this.state;

        return (
            <div style={{ padding: '16px 24px 47px' }}>
                <Row>
                    <Col span={24}>
                        <Search
                            style={{ width: 400, height: '32px' }}
                            onSearch={(value) => { this.onSearch('reportTitle', value) }}
                            placeholder={i18n.format("请输入报告标题查询")}
                            enterButton={i18n.format("搜索")}
                            allowClear
                            bordered
                            className="search-input"
                        />
                    </Col>
                </Row>
                <div className="filter-container">

                    <FilterOption title={`${i18n.format("行业选择")}`} type="multiple" style={{ marginRight: '44px', marginBottom: '16px' }} isMutualExcluion={guestType == "二级市场" ? true : false} data={guestType == "二级市场" ? industryOption : industryOptionPM} selectId={filterObj.showType} onSelect={(value) => { this.onSearch('industry', value) }} />
                    <FilterOption title={`${i18n.format("报告类型")}`} type="multiple" isMutualExcluion={true} style={{ marginBottom: '16px', marginRight: '48px' }} data={reportTypeOption} selectId={'0'} onSelect={(value) => { this.onSearch('reportView', value) }} />
                    <Custom_Date title={`${i18n.format("发布时间")}`} isCompleteOpen={true} date_type={"day"} type={"double"} style={{ marginTop: 0, marginBottom: '16px' }} onChange={(value) => { this.onSearch('date', value) }} />
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