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
                <ComponentProps id="9356" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="9357" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <Custom_Date id='8871' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8872' />
                            <UpdateTime className="common-margin-left" id='8873' />
                        </div>
                        <CustomTab id="8874" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8875' style={{ width: '300px' }} />
                                    <Chart id="8876" />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8877' style={{ width: "300px" }} />
                                    <Table id='8878' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='8879' className="select-margin-top-remove" select_style={{ width: '230px' }} />
                                <Chart id='8880' />
                                <Table id='8881' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**品类分布 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='9359' className="common-margin-right" />
                            <CustomSelect id="9374" className="common-margin-right" />
                            <CustomSelect id="9373" />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='9360' />
                            <UpdateTime className="common-margin-left" id='9361' />
                        </div>
                        <CustomTab id="9362" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="9452">
                                    {/**结构分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="9363" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="9364" />
                                    </CustomTabPane>
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="9365" style={{ width: '300px' }} />
                                            <Filter id="9366" style={{ width: '300px' }} className="common-margin-left" />
                                        </div>
                                        <Chart id="9367" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id="9368" style={{ width: '300px' }} />
                                <Table id="9369" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id="9370" className="select-margin-top-remove" />
                                <Chart id="9371" />
                                <Table id="9372" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**品牌渠道分布 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='9375' className="common-margin-right" />
                            <CustomSelect id="9390" />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='9376' />
                            <UpdateTime className="common-margin-left" id='9377' />
                        </div>
                        <CustomTab id="9378" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="9379">
                                    {/**结构分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="9380" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="9381" />
                                    </CustomTabPane>
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="9382" style={{ width: '300px' }} />
                                            <Filter id="9383" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="9384" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id="9385" style={{ width: '300px' }} />
                                <Table id="9386" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id="9387" className="select-margin-top-remove" />
                                <Chart id="9388" />
                                <Table id="9389" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**店铺分布 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='9391' className="common-margin-right" />
                            <CustomSelect id="9406" />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='9392' />
                            <UpdateTime className="common-margin-left" id='9393' />
                        </div>
                        <CustomTab id="9394" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="9395">
                                    {/**结构分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="9396" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="9397" />
                                    </CustomTabPane>
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="9398" style={{ width: '300px' }} />
                                            <Filter id="9399" style={{ width: '300px' }} className="common-margin-left" />
                                        </div>
                                        <Chart id="9400" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id="9401" style={{ width: '300px' }} />
                                <Table id="9402" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id="9403" className="select-margin-top-remove" />
                                <Chart id="9404" />
                                <Table id="9405" />
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