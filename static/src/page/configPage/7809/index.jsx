'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import Custom_Date from "@date/config";
import Jump from '@jump/config';
import CompanyTitle from '@title/config';
import UpdateTime from '@updateTime/config';
import { CustomTab, CustomTabPane } from '@tab/config'
import CustomTable from '@table/config';
import CustomSelect from '@select/config';
import Filter from '@filter/config';
import ComponentProps from '@componentProps/config';
import Chart from '@chart/config'

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
            this.setState({ pageInfo, resAttr: JSON.parse(resAttr) });
        }
    }

    getComponentProps = (pageInfo) => {
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo }
    }

    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;
        return (
            <div>
                <ComponentProps id="7810" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="7812" position="top-outside">
                    {/* 整体概况 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="8265" />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id="8266" />
                            <UpdateTime className="common-margin-left" id="8267" />
                        </div>
                        <CustomTab id="8268" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id="8269" style={{ width: '300px' }} />
                                <Chart id="8270" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="8271" style={{ width: '300px' }} />
                                <CustomTable id="8272" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id="8273" className="select-margin-top-remove" />
                                <Chart id="8274" />
                                <CustomTable id="8275" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/* 视频数量分析 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="8276" />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id="8632" />
                            <UpdateTime className="common-margin-left" id="8633" />
                        </div>
                        <CustomTab id="8712" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="8713">
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="8714" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="8715" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="8718" style={{ width: '300px' }} />
                                            <Filter id="8716" style_btn={{ marginLeft: 16 }} style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="8717" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="8719" style={{ width: '300px' }} />
                                <CustomTable id="8720" />
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* <Filter id="8839" style={{ width: '300px' }} /> */}
                                <CustomSelect id="8839" className="select-margin-top-remove" />
                                <Chart id="8721" />
                                <CustomTable id="8838" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/* 视频热度分析 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="8840" />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id="8841" />
                            <UpdateTime className="common-margin-left" id="8842" />
                        </div>
                        <CustomTab id="8843" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="8844">
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="8845" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="8846" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id="8849" style={{ width: '300px' }} />
                                            <Filter id="8847" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="8848" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="8850" style={{ width: '300px' }} />
                                <CustomTable id="8851" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id="8852" className="select-margin-top-remove" />
                                <Chart id="8853" />
                                <CustomTable id="8854" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/* 节目榜单 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="7813" className="common-margin-right" />
                            <CustomSelect id="7814" className="common-margin-right" />
                            <div style={{ display: 'inline-block' }}>
                                <CustomSelect id="7815" className="common-margin-right" />
                                <CustomSelect id="7991" className="common-margin-right" />
                                <CustomSelect id="7992" />
                            </div>
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id="7816" />
                            <UpdateTime className="common-margin-left" id="7817" />
                        </div>
                        <CustomTab id="7818" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id="7819" style={{ width: '300px' }} />
                                <CustomTable id="7820" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                </CustomTab>
                <Jump id="7811" />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;