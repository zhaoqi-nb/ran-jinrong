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
                <ComponentProps id="7647" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="7631" position="top-outside">
                    {/**租房成交分析 */}
                    <CustomTabPane>
                        <Custom_Date id='7649' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='7650' />
                            <UpdateTime className="common-margin-left" id='7651' />
                        </div>
                        <CustomTab id="7652" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='7659' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='7660' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomTab id="7653">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='7654' style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="7655" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='7657' style={{ width: '300px' }} />
                                            <Filter id='7656' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="7658" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='7661' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='7662' />
                                <Table id='7663' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/**租房在租分析 */}
                    <CustomTabPane>
                        <Custom_Date id='7632' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='7633' />
                            <UpdateTime className="common-margin-left" id='7634' />
                        </div>
                        <CustomTab id="7635" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='7642' style={{ width: "300px" }} />
                                    <Table id='7643' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomTab id="7636">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='7637' style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="7638" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='7639' style={{ width: '300px' }} />
                                            <Filter id='7640' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="7641" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='7644' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='7645' />
                                <Table id='7646' />
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