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
                <ComponentProps id="11451" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="11452" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <Custom_Date id='11453' select_style={{ width: `${i18n.getLocalLanguage() === 'zh_CN' ? '175px' : '280px'}` }} />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='11454' />
                            <UpdateTime className="common-margin-left" id='11455' />
                        </div>
                        <CustomTab id="11456" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='11457' style={{ width: '300px' }} />
                                    <Chart id="11458" />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='11459' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='11460' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='11461' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='11462' />
                                <Table id='11463' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/**游戏类型分布 */}
                    <CustomTabPane>
                        <Custom_Date id='11464' className="common-margin-right" />
                        <CustomSelect id='11479' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='11465' />
                            <UpdateTime className="common-margin-left" id='11466' />
                        </div>
                        <CustomTab id="11467" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="11468">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='11469' style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="11470" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='11471' style={{ width: '300px' }} />
                                            <Filter id='11472' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="11473" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='11474' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='11475' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='11476' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='11477' />
                                <Table id='11478' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/* 游戏运营榜单 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="11480" />
                            <CustomSelect id="11481" style={{ marginLeft: "24px" }} />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id="11482" />
                            <UpdateTime style={{ marginLeft: '16px' }} id="11483" />
                        </div>
                        <CustomTab id="11484" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <Filter id="11485" style={{ width: '300px' }} />
                                <Table id="11486" />
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