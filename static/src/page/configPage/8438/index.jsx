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
import DrawerChart from '@drawerChart/config';
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
    paramRender = (params, record) => {
        let brand_id = record.brand_id,
            shop_dimension = record.shop_dimension;
        return Object.assign({}, params, { brand_id, shop_dimension });
    }
    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;;
        return (
            <div >
                <ComponentProps id="8439" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="8440" position="top-outside">
                    {/**整体概览 */}
                    <CustomTabPane>
                        <Custom_Date id='8442' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8443' />
                            <UpdateTime className="common-margin-left" id='8444' />
                        </div>
                        <CustomTab id="8445" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='8446' style={{ width: "300px" }} />
                                <Chart id='8447' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='8448' style={{ width: "300px" }} />
                                <Table id='8449' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='8450' className="select-margin-top-remove" />
                                <Chart id='8451' />
                                <Table id='8452' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**影片供给分析 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='9321' className="common-margin-right" />
                            <CustomSelect id="9351" />
                            <CustomSelect id="9352" />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='9322' />
                            <UpdateTime className="common-margin-left" id='9323' />
                        </div>
                        <CustomTab id="9324" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="9325">
                                    {/**结构分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="9326" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="9327" />
                                    </CustomTabPane>
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="9328" style={{ width: '300px' }} />
                                            <Filter id="9329" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="9330" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id="9331" style={{ width: '300px' }} />
                                <Table id="9332" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id="9333" className="select-margin-top-remove" />
                                <Chart id="9334" />
                                <Table id="9335" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**影片消费分析 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='9336' className="common-margin-right" />
                            <CustomSelect id="9353" />
                            <CustomSelect id="9354" />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='9337' />
                            <UpdateTime className="common-margin-left" id='9338' />
                        </div>
                        <CustomTab id="9339" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="9340">
                                    {/**结构分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="9341" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="9342" />
                                    </CustomTabPane>
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="9343" style={{ width: '300px' }} />
                                            <Filter id="9344" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="9345" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id="9346" style={{ width: '300px' }} />
                                <Table id="9347" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id="9348" className="select-margin-top-remove" />
                                <Chart id="9349" />
                                <Table id="9350" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab>
                <Jump id='8441' />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;