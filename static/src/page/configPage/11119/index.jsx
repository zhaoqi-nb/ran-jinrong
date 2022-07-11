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
import Explain from '@explain';
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
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo, brand_name: "太二酸菜鱼" }
    }
    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;;
        return (
            <div >
                <ComponentProps id="11121" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="11122" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <Custom_Date id='11123' select_style={{ width: `${i18n.getLocalLanguage() === 'zh_CN' ? '175px' : '280px'}` }} className="common-margin-right" />
                        <CustomSelect id="11124" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='11125' />
                            <UpdateTime className="common-margin-left" id='11126' />
                        </div>
                        <CustomTab id="11127" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='11128' style={{ width: '300px' }} />
                                <Chart id="11129" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='11130' style={{ width: "300px" }} />
                                <Table id='11131' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='11132' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='11133' />
                                <Table id='11134' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**城市分布 */}
                    <CustomTabPane>
                        <Custom_Date id='11135' className="common-margin-right" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='11136' />
                            <UpdateTime className="common-margin-left" id='11137' />
                        </div>
                        <CustomTab id="11138" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="11139">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='11256' style={{ width: '300px' }} />
                                            <Filter id='11140' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="11141" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='11142' style={{ width: '300px' }} />
                                            <Filter id='11143' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="11144" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='11145' style={{ width: "300px" }} />
                                    <Table id='11146' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='11147' select_style={{ width: '230px' }} className="select-margin-top-remove common-margin-right" />
                                <Filter id='11254' />
                                <Chart id='11148' />
                                <Table id='11149' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**门店留存 */}
                    <CustomTabPane>
                        <Explain id='11150' style={{ marginTop: '8px' }} />
                        <Custom_Date id='11151' className="common-margin-right" />
                        <CustomSelect id="11152" className="common-margin-right" />
                        <CustomSelect id="11153" />
                        <CustomSelect id="11154" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='11155' />
                            <UpdateTime className="common-margin-left" id='11156' />
                        </div>
                        <CustomTab id="11157" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='11158' style={{ width: "300px" }} />
                                <Chart id='11159' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='11160' style={{ width: "300px", marginBottom: "10px" }} />
                                <Table id='11161' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='11162' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='11163' />
                                <Table id='11164' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**新增/流失门店 */}
                    {/* <CustomTabPane>
                        <Custom_Date id='11165' className="common-margin-right" />
                        <CustomSelect id="11166" /> 
                        <div className="company-title-wrapper">
                            <CompanyTitle id='11167' />
                            <UpdateTime className="common-margin-left" id='11168' />
                        </div>
                        <CustomTab id="11169" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='11170' style={{ width: "300px", marginBottom: "10px" }} />
                                <Chart id='11171' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='11172' style={{ width: "300px", marginBottom: "10px" }} />
                                <Table id='11173' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='11174' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='11175' />
                                <Table id='11176' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane> */}
                </CustomTab>
            </div >
        );
    }
}

Index.propTypes = {

};

export default Index;