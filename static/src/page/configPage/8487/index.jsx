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
                <ComponentProps id="8488" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="8489" position="top-outside">
                    {/**整体概览 */}
                    <CustomTabPane>
                        <Custom_Date id='8491' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8492' />
                            <UpdateTime className="common-margin-left" id='8493' />
                        </div>
                        <CustomTab id="8494" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='8495' style={{ width: "300px" }} />
                                <Chart id='8496' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='8497' style={{ width: "300px" }} />
                                <Table id='8498' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='8499' className="select-margin-top-remove" />
                                <Chart id='8500' />
                                <Table id='8501' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**主播数量分析 */}
                    <CustomTabPane>
                        <Custom_Date id='9277' className="common-margin-right" />
                        <CustomSelect id='9278' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='9279' />
                            <UpdateTime className="common-margin-left" id='9280' />
                        </div>
                        <CustomTab id="9281" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="9282">
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper1" : "filter-wrapper1-US"}>
                                            <Filter id="9283" style={{ width: '300px' }} />
                                            <Filter id="9284" style={{ width: '300px' }} className="common-margin-left" />
                                        </div>
                                        <Chart id='9285' />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='9286' style={{ width: "300px" }} />
                                <Table id='9287' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**主播收入分析 */}
                    <CustomTabPane>
                        <Custom_Date id='9290' className="common-margin-right" />
                        <CustomSelect id='9726' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='9291' />
                            <UpdateTime className="common-margin-left" id='9292' />
                        </div>
                        <CustomTab id="9293" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="9294">
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper1" : "filter-wrapper1-US"}>
                                            <Filter id="9295" style={{ width: '300px' }} />
                                            <Filter id="9296" style={{ width: '300px' }} className="common-margin-left" />
                                        </div>
                                        <Chart id='9297' />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='9298' style={{ width: "300px" }} />
                                <Table id='9299' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab>
                <Jump id='8490' />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;