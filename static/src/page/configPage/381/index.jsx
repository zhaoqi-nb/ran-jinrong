'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd'
import { CustomTab, CustomTabPane } from '../../component/tab/config'
import Custom_Date from "../../component/date/config";
import CustomSelect from '../../component/select/config';
import CompanyTitle from '../../component/title/config';
import UpdateTime from '../../component/updateTime/config'
import Filter from '../../component/filter/config'
import CustomCheckbox from '../../component/checkbox/config'
import ComponentProps from '../../component/componentProps/config'
import Chart from '../../component/chart/config'
import Table from '../../component/table/config';
import Hide from '../../component/hide/config';
import FixedParam from '../../component/fixedParam';
import Exhibition from '../../component/exhibition/config';
import RsIcon from '../../component/rsIcon';
import Radio from '@radio/config'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
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
            pageInfo: null,
            resAttr: {},
            industryId: null
        }
    }
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
    initData = () => {
        const params = this.props.match.params;
        const industryId = params ? params.industryId : "";
        const menu = this.getData(PAGEMIXDATA);
        if (menu) {
            let pageInfo = menu.pageInfo,
                resAttr = pageInfo.resAttr,
                privilegeDtoList = pageInfo.privilegeDtoList;
            this.setState({ pageInfo, resAttr: JSON.parse(resAttr), industryId });
        }
    }

    getComponentProps = (pageInfo) => {
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo }
    }

    render() {
        const { pageInfo, industryId } = this.state;
        if (!pageInfo) return null;
        let redirectPath = industryId ? `/redirect/industry/${industryId}/13` : "javascript:void(0);"
        return (
            <div className='industry-page'>
                <ComponentProps id="396" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <div style={{ display: 'none' }}>
                    <FixedParam id='439' />
                    <FixedParam id='440' />
                    <FixedParam id='441' />
                    <FixedParam id='442' />
                    <FixedParam id='461' />
                    <Custom_Date id="434" style={{ display: "none" }} />
                    <Filter id='462' style_btn={{ display: 'none' }} />
                </div>
                <CustomTab id="382" bodyStyle={{ border: 'none' }} position="top-outside">
                    <CustomTabPane>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='383' />
                            <UpdateTime id='385' className="common-margin-left" />
                            <div style={{ flex: '1 0 auto', textAlign: 'right' }}><Radio id='9746' /></div>
                        </div>
                        <div className='industry-exhibition-wrapper'>
                            <Exhibition id='384' />
                        </div>
                        <div className='industry-chart-wrapper'>
                            <Chart id='386' />
                        </div>
                        <div className="company-title-wrapper" style={{ position: "relative" }}>
                            <CompanyTitle id='387' />
                            <UpdateTime id='388' className="common-margin-left" />
                            <a href={redirectPath} style={{ position: "absolute", right: "0", lineHeight: "46px" }}>{i18n.format('跳转查看')}<RsIcon type="icon-jiantouyou" style={{ fontSize: 12, color: '#8C8C8C', marginLeft: 4 }} /></a>
                        </div>
                        <div className='industry-loopchart-wrapper'>
                            <Chart id='389' />
                        </div>
                    </CustomTabPane>
                    <CustomTabPane>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='390' />
                            <UpdateTime id='391' className="common-margin-left" />
                            <div style={{ flex: '1 0 auto', textAlign: 'right' }}><Radio id='9747' /></div>
                        </div>
                        <Row gutter={32}>
                            <Col span={12}>
                                <Table id='392' />
                            </Col>
                            <Col span={12}>
                                {/* <div className="company-title-wrapper">
                                    <CompanyTitle id='393' />
                                    <UpdateTime id='394' className="common-margin-left" />
                                </div> */}
                                <Table id='395' />
                            </Col>
                        </Row>
                    </CustomTabPane>
                </CustomTab>
            </div >
        );
    }
}

Index.propTypes = {

};

export default Index;