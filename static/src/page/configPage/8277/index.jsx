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
                <ComponentProps id="8279" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="8278" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <Custom_Date id='8827' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8828' />
                            <UpdateTime className="common-margin-left" id='8829' />
                        </div>
                        <CustomTab id="8830" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8831' style={{ width: "300px" }} />
                                    <Chart id='8832' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8833' style={{ width: "300px" }} />
                                    <Table id='8834' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <CustomSelect id="8835" className="select-margin-top-remove" />
                                    <Chart id='8836' />
                                    <Table id='8837' />
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/* 视频分布 */}
                    <CustomTabPane>
                        <Custom_Date id='8190' className="common-margin-right" />
                        <CustomSelect id="8768" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8191' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='8192' />
                        </div>
                        <CustomTab id="8193" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="8194">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='8195' style={{ width: "300px", marginBottom: "10px" }} />
                                        </div>
                                        <Chart id='8196' />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='8197' style={{ width: "300px" }} />
                                            <Filter id='8198' style={{ width: "300px" }} className="common-margin-left" />
                                        </div>
                                        <Chart id='8199' />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8200' style={{ width: "300px" }} />
                                    <Table id='8201' />
                                </div>
                            </CustomTabPane>
                            {/* ,{"title":"图形+表格","value":"3"} */}
                            {/* ,"3":["8202","8203","8204"] */}
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <CustomSelect id='8202' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Chart id='8203' />
                                    <Table id='8204' />
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**用户带货及活跃情况 */}
                    <CustomTabPane>
                        <Custom_Date id='9187' className="common-margin-right" />
                        <CustomSelect id='9510' className="common-margin-right" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='9188' />
                            <UpdateTime className="common-margin-left" id='9189' />
                        </div>
                        <CustomTab id="9190" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="9191">
                                    {/**结构分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="9192" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="9193" />
                                    </CustomTabPane>
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="9194" style={{ width: '300px' }} />
                                            <Filter id="9195" style={{ width: '300px' }} className="common-margin-left" />
                                        </div>
                                        <Chart id='9196' />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='9197' style={{ width: "300px" }} />
                                <Table id='9198' />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id="9199" className="select-margin-top-remove" />
                                <Chart id="9200" />
                                <Table id="9201" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**用户榜单 */}
                    <CustomTabPane>
                        <Custom_Date id='7735' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='7736' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='7737' />
                        </div>
                        <CustomTab id="7738" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='7739' style={{ width: "300px" }} />
                                    <Table id='7740' />
                                    {/* <DrawerChart id="7926" paramRender={this.paramRender} /> */}
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab>
                <Jump id='8280' />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;