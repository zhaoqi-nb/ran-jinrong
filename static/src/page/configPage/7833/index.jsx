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
                <ComponentProps id="7835" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="7834" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <Custom_Date id='8357' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8358' />
                            <UpdateTime className="common-margin-left" id='8359' />
                        </div>
                        <CustomTab id="8360" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8361' style={{ width: "300px" }} />
                                    <Chart id='8362' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8363' style={{ width: "300px" }} />
                                    <Table id='8364' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <CustomSelect id='8365' className="select-margin-top-remove" />
                                    <Chart id='8366' />
                                    <Table id='8367' />
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/* UGC社区分析 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='8100' className="common-margin-right" />
                            <CustomSelect id="9453" />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8101' />
                            <UpdateTime className="common-margin-left" id='8102' />
                        </div>
                        <CustomTab id="8103" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="8104">
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="8105" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="8106" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="8107" style={{ width: '300px' }} />
                                            <Filter id="8108" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="8109" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="8110" style={{ width: '300px' }} />
                                <Table id="8111" />
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6643同行业跳转 */}
                                <CustomSelect id="8112" className="select-margin-top-remove" />
                                <Chart id="8113" />
                                <Table id="8114" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/* PGC内容分析 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='8115' />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8116' />
                            <UpdateTime className="common-margin-left" id='8117' />
                        </div>
                        <CustomTab id="8118" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="8119">
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="8120" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="8121" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="8122" style={{ width: '300px' }} />
                                            <Filter id="8123" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="8124" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="8125" style={{ width: '300px' }} />
                                <Table id="8126" />
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6643同行业跳转 */}
                                <CustomSelect id="8127" className="select-margin-top-remove" />
                                <Chart id="8128" />
                                <Table id="8129" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**UP主榜单  */}
                    <CustomTabPane>
                        <Custom_Date id='7836' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='7837' />
                            <UpdateTime className="common-margin-left" id='7838' />
                        </div>
                        <CustomTab id="7839" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='7840' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='7841' />
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**UGC社区榜单  */}
                    <CustomTabPane>
                        <Custom_Date id='7871' className="common-margin-right" />
                        <CustomSelect id="7877" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='7872' />
                            <UpdateTime className="common-margin-left" id='7873' />
                        </div>
                        <CustomTab id="7874" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='7875' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='7876' />
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**PGC内容榜单  */}
                    <CustomTabPane>
                        <Custom_Date id='7878' className="common-margin-right" />
                        <CustomSelect id="7884" className="common-margin-right" />
                        <CustomSelect id="7885" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='7879' />
                            <UpdateTime className="common-margin-left" id='7880' />
                        </div>
                        <CustomTab id="7881" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='7882' style={{ width: "300px" }} />
                                    <Table id='7883' />
                                </div>
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