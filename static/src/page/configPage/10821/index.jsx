'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import Custom_Date from "@date/config";
import CustomSelect from '@select/config';
import CompanyTitle from '@title/config';
import UpdateTime from '@updateTime/config';
import { CustomTab, CustomTabPane } from '@tab/config'
import CustomTable from '@table/config';
import CustomChart from '@chart/config';
import Filter from '@filter/config';
import ComponentProps from '@componentProps/config';
import Explain from '@explain'

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
                <ComponentProps id="10822" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="10823" position="top-outside">
                    <CustomTabPane>
                        {/* 整体概况 */}
                        <div>
                            <Custom_Date id='10824' select_style={{ width: `${i18n.getLocalLanguage() === 'zh_CN' ? '175px' : '280px'}` }} />
                            <CustomSelect id="10825" />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='10826' />
                            <UpdateTime className="common-margin-left" id='10827' />
                        </div>
                        <CustomTab id="10828" className="tab-padding-top">
                            <CustomTabPane style={{ minHeight: '500px' }}>
                                <Filter id="10829" style={{ width: '300px' }} />
                                <CustomChart id="10830" />
                            </CustomTabPane>
                            <CustomTabPane style={{ minHeight: '500px' }}>
                                <Filter id="10831" style={{ width: '300px' }} />
                                <CustomTable id="10832" />
                            </CustomTabPane>
                            <CustomTabPane style={{ minHeight: '500px' }}>
                                <CustomSelect id="10833" style={{ marginTop: 0 }} />
                                <CustomChart id="10834" />
                                <CustomTable id="10835" />
                            </CustomTabPane>
                        </CustomTab>

                        {/* 门店分布 */}
                        <CustomTabPane>
                            <Custom_Date id='10851' />
                            <div className="company-title-wrapper">
                                <CompanyTitle id='10852' />
                                <UpdateTime className="common-margin-left" id='10853' />
                            </div>
                            <CustomTab id="10854" className="tab-padding-top">
                                <CustomTabPane>
                                    <CustomTab id="10855">
                                        <CustomTabPane>
                                            {/* 结构 */}
                                            <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                                <Filter id='10856' style={{ width: '300px' }} />
                                            </div>
                                            <Chart id="10857" />
                                        </CustomTabPane>
                                        <CustomTabPane>
                                            {/* 趋势 */}
                                            <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                                <Filter id='10858' style={{ width: '300px' }} />
                                                <Filter id='10859' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                            </div>
                                            <Chart id="10860" />
                                        </CustomTabPane>
                                    </CustomTab>
                                </CustomTabPane>
                                <CustomTabPane>
                                    <div style={{ minHeight: '500px' }}>
                                        <Filter id='10861' style={{ width: "300px" }} />
                                        <Table id='10862' />
                                    </div>
                                </CustomTabPane>
                                <CustomTabPane>
                                    <CustomSelect id='10863' className="select-margin-top-remove" />
                                    <Chart id="10864" />
                                    <Table id='10865' />
                                </CustomTabPane>
                            </CustomTab>
                        </CustomTabPane>

                        {/* 门店留存 */}
                        <CustomTabPane>
                            <Explain id='10881' />
                            <Custom_Date id='10882' />
                            <CustomSelect id="10883" />
                            <CustomSelect id="10884" />
                            <CustomSelect id="10885" />
                            <div className="company-title-wrapper">
                                <CompanyTitle id='10886' />
                                <UpdateTime className="common-margin-left" id='10887' />
                            </div>
                            <CustomTab id="10888" className="tab-padding-top">
                                <CustomTabPane>
                                    <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                        <Filter id='10889' style={{ width: '300px' }} />
                                    </div>
                                    <Chart id="10890" />
                                </CustomTabPane>
                                <CustomTabPane>
                                    <div style={{ minHeight: '500px' }}>
                                        <Filter id='10891' style={{ width: "300px" }} />
                                        <Table id='10892' />
                                    </div>
                                </CustomTabPane>
                                <CustomTabPane>
                                    <CustomSelect id='10893' className="select-margin-top-remove" />
                                    <Chart id="10894" />
                                    <Table id='10895' />
                                </CustomTabPane>
                            </CustomTab>
                        </CustomTabPane>

                        {/* 新增/流失门店 */}
                        {/* <CustomTabPane>
                            <Custom_Date id='10896' />
                            <CustomSelect id="10897" />
                            <div className="company-title-wrapper">
                                <CompanyTitle id='10898' />
                                <UpdateTime className="common-margin-left" id='10899' />
                            </div>
                            <CustomTab id="10900" className="tab-padding-top">
                                <CustomTabPane>
                                    <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                        <Filter id='10901' style={{ width: '300px' }} />
                                    </div>
                                    <Chart id="10902" />
                                </CustomTabPane>
                                <CustomTabPane>
                                    <div style={{ minHeight: '500px' }}>
                                        <Filter id='10903' style={{ width: "300px" }} />
                                        <Table id='10904' />
                                    </div>
                                </CustomTabPane>
                                <CustomTabPane>
                                    <CustomSelect id='10905' className="select-margin-top-remove" />
                                    <Chart id="10906" />
                                    <Table id='10907' />
                                </CustomTabPane>
                            </CustomTab>
                        </CustomTabPane> */}

                    </CustomTabPane>
                </CustomTab>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;