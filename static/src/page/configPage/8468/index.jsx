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
                <ComponentProps id="8469" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="8471" position="top-outside">
                    {/**整体概况  */}
                    <CustomTabPane>
                        <Custom_Date id='8345' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8346' />
                            <UpdateTime className="common-margin-left" id='8347' />
                        </div>
                        <CustomTab id="8348" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8349' style={{ width: "300px" }} />
                                    <Chart id='8350' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8351' style={{ width: "300px" }} />
                                    <Table id='8352' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <CustomSelect id="8353" className="select-margin-top-remove" />
                                    <Chart id='8354' />
                                    <Table id='8355' />
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/**活跃主播分析 */}
                    <CustomTabPane>
                        <Custom_Date id='9202' className="common-margin-right" />
                        <CustomSelect id="9203" className="common-margin-right" />
                        <CustomSelect id="9204" style={{ display: 'none' }} />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='9205' />
                            <UpdateTime className="common-margin-left" id='9206' />
                        </div>
                        <CustomTab id="9207" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="9208">
                                    {/**结构分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="9209" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="9210" />
                                    </CustomTabPane>
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="9211" style={{ width: '300px' }} />
                                            <Filter id="9212" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id='9213' />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='9214' style={{ width: "300px" }} />
                                <Table id='9215' />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id="9216" className="select-margin-top-remove" />
                                <Chart id="9217" />
                                <Table id="9218" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**主播积分分析 */}
                    <CustomTabPane>
                        <Custom_Date id='9219' className="common-margin-right" />
                        <CustomSelect id="9220" />
                        <div style={{ display: 'none' }}>
                            <CustomSelect id="9561" />
                        </div>

                        <div className="company-title-wrapper">
                            <CompanyTitle id='9221' />
                            <UpdateTime className="common-margin-left" id='9222' />
                        </div>
                        <CustomTab id="9223" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="9224">
                                    {/**结构分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="9225" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="9226" />
                                    </CustomTabPane>
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="9227" style={{ width: '300px' }} />
                                            <Filter id="9228" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id='9229' />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='9230' style={{ width: "300px" }} />
                                <Table id='9231' />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id="9232" style={{ marginTop: 0 }} />
                                <Chart id="9233" />
                                <Table id="9234" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**主播榜单  */}
                    <CustomTabPane>
                        <Custom_Date id='7886' className="common-margin-right" />
                        <CustomSelect id="7892" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='7887' />
                            <UpdateTime className="common-margin-left" id='7888' />
                        </div>
                        <CustomTab id="7889" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='7890' style={{ width: "300px" }} />
                                    <Table id='7891' />
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