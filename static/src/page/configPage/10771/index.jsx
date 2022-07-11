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
        if (!pageInfo) return null;;
        return (
            <div >
                <ComponentProps id="10773" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="10774" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <Custom_Date id='10775' select_style={{width: `${i18n.getLocalLanguage()==='zh_CN'?'175px':'280px'}`}}/>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='10776' />
                            <UpdateTime className="common-margin-left" id='10777' />
                        </div>
                        <CustomTab id="10778" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='10779' style={{ width: '300px' }} />
                                    <Chart id="10780" />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='10781' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='10782' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='10783' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='10784' />
                                <Table id='10785' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**行业分布 */}
                    <CustomTabPane>
                        <Custom_Date id='10790' className="common-margin-right" />
                        <CustomSelect id='10978' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='10791' />
                            <UpdateTime className="common-margin-left" id='10792' />
                        </div>
                        <CustomTab id="10793" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="10794">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='10795' style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="10796" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='10797' style={{ width: '300px' }} />
                                            <Filter id='10798' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="10799" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='10800' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='10801' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='10802' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='10803' />
                                <Table id='10804' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab>
            </div >
        );
    }
}

Index.propTypes = {

};

export default Index;