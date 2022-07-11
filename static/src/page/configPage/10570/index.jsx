'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import { CustomTab, CustomTabPane } from '@tab/config'
import Custom_Date from "@date/config";
import CustomSelect from '@select/config';
import CompanyTitle from '@title/config';
import UpdateTime from '@updateTime/config'
import Filter from '@filter/config'
import CustomCheckbox from '@checkbox/config'
import ComponentProps from '@componentProps/config'
import Chart from '@chart/config'
import Table from '@table/config';
import Jump from '@jump/config';

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
        const menu = this.getData(PAGEMIXDATA);
        if (menu) {
            let pageInfo = menu.pageInfo,
                resAttr = pageInfo.resAttr,
                privilegeDtoList = pageInfo.privilegeDtoList;

            this.setState({ pageInfo, resAttr });
        }
    }
    getComponentProps = (pageInfo) => {
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo }
    }
    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;
        return (
            <div >
                <ComponentProps id="10571" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="10572" position="top-outside">
                    {/**整体概况  */}
                    <CustomTabPane>
                        <Custom_Date id='10573' />
                        <div style={{ display: "flex", borderBottom: "1px solid #E1E8F0", marginTop: 8, justifyContent: "space-between" }}>
                            <div className="company-title-wrapper" style={{ border: 'none', margin: 0 }}>
                                <CompanyTitle id='10574' />
                                <UpdateTime className="common-margin-left" id='10575' />
                            </div>
                            <CustomSelect id="10755" />
                        </div>
                        <CustomTab id="10576" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='10577' style={{ width: "300px" }} />
                                    <Chart id='10578' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='10579' style={{ width: "300px" }} />
                                    <Table id='10580' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <CustomSelect id="10581" />
                                    <Chart id='10582' />
                                    <Table id='10583' />
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**地区分布 */}
                    <CustomTabPane>
                        <Custom_Date id='10584' className="common-margin-right" />
                        <div style={{ display: "flex", borderBottom: "1px solid #E1E8F0", marginTop: 8, justifyContent: "space-between" }}>
                            <div className="company-title-wrapper" style={{ border: 'none', margin: 0 }}>
                                <CompanyTitle id='10585' />
                                <UpdateTime className="common-margin-left" id='10586' />
                            </div>
                            <CustomSelect id="10756" />
                        </div>
                        <CustomTab id="10587" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="10588">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='10589' style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="10590" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='10591' style={{ width: '300px' }} />
                                            <Filter id='10592' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="10593" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='10594' style={{ width: "300px" }} />
                                    <Table id='10595' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='10596' className="select-margin-top-remove" />
                                <Chart id="10597" />
                                <Table id='10598' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;