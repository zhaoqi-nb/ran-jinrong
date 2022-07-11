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
                <ComponentProps id="7389" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="7373" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='9715' />
                        </div>
                        <div style={{ display: "flex", borderBottom: "1px solid #E1E8F0", marginTop: 8, justifyContent: "space-between" }}>
                            <div className="company-title-wrapper" style={{ border: 'none', margin: 0 }}>
                                <CompanyTitle id='9716' />
                                <UpdateTime className="common-margin-left" id='9717' />
                            </div>
                        </div>
                        <CustomTab id="9718" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id="9719" style={{ width: '300px' }} />
                                <Chart id="9720" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="9721" style={{ width: '300px' }} />
                                <Table id="9722" />
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6817同行业跳转 */}
                                <CustomSelect id="9723" className="select-margin-top-remove" />
                                <Chart id="9724" />
                                <Table id="9725" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/* 渠道分布 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='9408' className="common-margin-right" />
                            <CustomSelect id="9423" />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='9409' />
                            <UpdateTime className="common-margin-left" id='9410' />
                        </div>
                        <CustomTab id="9411" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="9412">
                                    {/**结构分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="9413" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="9414" />
                                    </CustomTabPane>
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="9415" style={{ width: '300px' }} />
                                            <Filter id="9416" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="9417" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id="9418" style={{ width: '300px' }} />
                                <Table id="9419" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            {/* <CustomTabPane>
                                <CustomSelect id="9420" style={{ marginTop: 0 }} />
                                <Chart id="9421" />
                                <Table id="9422" />
                            </CustomTabPane> */}
                        </CustomTab>
                    </CustomTabPane>
                    {/**品类分布 */}
                    <CustomTabPane>
                        <Custom_Date className="common-margin-right" id='9159' />
                        <CustomSelect id="9160" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='9161' />
                            <UpdateTime className="common-margin-left" id='9162' />
                        </div>
                        <CustomTab id="9163" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="9164">
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='9165' style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="9166" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='9167' style={{ width: '300px' }} />
                                            <Filter id='9168' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="9169" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='9170' style={{ width: '300px' }} />
                                <Table id='9171' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**品牌分布 */}
                    <CustomTabPane>
                        <Custom_Date id='7391' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='7392' />
                            <UpdateTime className="common-margin-left" id='7393' />
                        </div>
                        <CustomTab id="7394" className="tab-padding-top">
                            <CustomTabPane>
                                {/* <div style={{display:'inline-block', position:'relative', top:'-3px'}}> */}
                                <CustomSelect id='7395' select_style={{ width: '200px' }} className="select-margin-top-remove" />
                                <Filter id='7396' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                <Chart id='7397' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='7398' style={{ width: '300px' }} />
                                <Table id='7399' />
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