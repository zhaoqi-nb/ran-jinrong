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
                <ComponentProps id="10601" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="10613" position="top-outside">
                    {/**整体概况  */}
                    <CustomTabPane>
                        <Custom_Date id='10602' />
                        <div style={{ display: "flex", borderBottom: "1px solid #E1E8F0", marginTop: 8, justifyContent: "space-between" }}>
                            <div className="company-title-wrapper" style={{ border: 'none', margin: 0 }}>
                                <CompanyTitle id='10603' />
                                <UpdateTime className="common-margin-left" id='10604' />
                            </div>
                            <CustomSelect id="10757" />
                        </div>
                        <CustomTab id="10605" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='10606' style={{ width: "300px" }} />
                                    <Chart id='10607' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='10608' style={{ width: "300px" }} />
                                    <Table id='10609' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <CustomSelect id="10610" />
                                    <Chart id='10611' />
                                    <Table id='10612' />
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/**地区分布  */}
                    <CustomTabPane>
                        <Custom_Date id='10663' className="common-margin-right" />
                        <div style={{ display: "flex", borderBottom: "1px solid #E1E8F0", marginTop: 8, justifyContent: "space-between" }}>
                            <div className="company-title-wrapper" style={{ border: 'none', margin: 0 }}>
                                <CompanyTitle id='10664' />
                                <UpdateTime className="common-margin-left" id='10665' />
                            </div>
                            <CustomSelect id="10758" />
                        </div>
                        <CustomTab id="10666" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="10667">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='10668' style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="10669" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='10670' style={{ width: '300px' }} />
                                            <Filter id='10671' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="10672" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='10673' style={{ width: "300px" }} />
                                    <Table id='10674' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='10675' className="select-margin-top-remove" />
                                <Chart id="10676" />
                                <Table id='10677' />
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