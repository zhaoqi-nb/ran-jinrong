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
                <ComponentProps id="6690" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="6678" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <Custom_Date id='6679' select_style={{ width: `${i18n.getLocalLanguage() === 'zh_CN' ? '175px' : '280px'}` }} />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='6680' />
                            <UpdateTime className="common-margin-left" id='6681' />
                        </div>
                        <CustomTab id="6682" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='6683' style={{ width: '300px' }} />
                                    <Chart id="6684" />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='6685' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='6686' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='6687' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='6688' />
                                <Table id='6689' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/**渠道分布 */}
                    <CustomTabPane>
                        <Custom_Date id='11318' className="common-margin-right" />
                        <CustomSelect id="11319" className="common-margin-right" />
                        <CustomSelect id="11320" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='11321' />
                            <UpdateTime className="common-margin-left" id='11322' />
                        </div>
                        <CustomTab id="11323" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="11324">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='11325' style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="11326" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='11327' style={{ width: '300px' }} />
                                            <Filter id='11334' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="11328" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='11329' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='11330' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='11331' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='11332' />
                                <Table id='11333' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/**行业分布 */}
                    <CustomTabPane>
                        <Custom_Date id='6941' className="common-margin-right" />
                        <CustomSelect id="6942" className="common-margin-right" />
                        <CustomSelect id="11317" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='6943' />
                            <UpdateTime className="common-margin-left" id='6944' />
                        </div>
                        <CustomTab id="6945" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="6946">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='6947' style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="6948" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='7020' style={{ width: '300px' }} />
                                            <Filter id='6949' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="6950" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='6951' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='6952' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='6953' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='6954' />
                                <Table id='6955' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**价格区间分布 */}
                    <CustomTabPane>
                        <Custom_Date id='6999' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='7000' />
                            <UpdateTime className="common-margin-left" id='7001' />
                        </div>
                        <CustomTab id="7002" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="7003">
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            {/* 结构 */}
                                            <Filter id='7004' style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="7005" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            {/* 趋势 */}
                                            <Filter id='7022' style={{ width: '300px' }} />
                                            <Filter id='7006' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="7007" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='7008' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='7009' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='7010' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='7011' />
                                <Table id='7013' />
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