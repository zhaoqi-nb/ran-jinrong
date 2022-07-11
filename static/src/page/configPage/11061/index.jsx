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
import Explain from '@explain';
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
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo, brand_name: "helens海伦司" }
    }
    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;;
        return (
            <div >
                <ComponentProps id="11063" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="11064" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <Custom_Date id='11065' select_style={{ width: `${i18n.getLocalLanguage() === 'zh_CN' ? '175px' : '280px'}` }} className="common-margin-right" />
                        <CustomSelect id="11066" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='11067' />
                            <UpdateTime className="common-margin-left" id='11068' />
                        </div>
                        <CustomTab id="11069" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='11070' style={{ width: '300px' }} />
                                <Chart id="11071" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='11072' style={{ width: "300px" }} />
                                <Table id='11073' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='11074' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='11075' />
                                <Table id='11076' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**城市分布 */}
                    <CustomTabPane>
                        <Custom_Date id='11077' className="common-margin-right" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='11078' />
                            <UpdateTime className="common-margin-left" id='11079' />
                        </div>
                        <CustomTab id="11080" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="11081">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='11257' style={{ width: '300px' }} />
                                            <Filter id='11082' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="11083" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='11084' style={{ width: '300px' }} />
                                            <Filter id='11085' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="11086" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='11087' style={{ width: "300px" }} />
                                    <Table id='11088' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='11089' select_style={{ width: '230px' }} className="select-margin-top-remove common-margin-right" />
                                <Filter id='11253' />
                                <Chart id='11090' />
                                <Table id='11091' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**门店留存 */}
                    <CustomTabPane>
                        <Explain id='11092' style={{ marginTop: '8px' }} />
                        <Custom_Date id='11093' className="common-margin-right" />
                        <CustomSelect id="11094" className="common-margin-right" />
                        <CustomSelect id="11095" />
                        <CustomSelect id="11096" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='11097' />
                            <UpdateTime className="common-margin-left" id='11098' />
                        </div>
                        <CustomTab id="11099" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='11100' style={{ width: "300px" }} />
                                <Chart id='11101' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='11102' style={{ width: "300px", marginBottom: "10px" }} />
                                <Table id='11103' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='11104' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='11105' />
                                <Table id='11106' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**新增/流失门店 */}
                    {/* <CustomTabPane>
                        <Custom_Date id='11107' className="common-margin-right" />
                        <CustomSelect id="11108" /> 
                        <div className="company-title-wrapper">
                            <CompanyTitle id='11109' />
                            <UpdateTime className="common-margin-left" id='11110' />
                        </div>
                        <CustomTab id="11111" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='11112' style={{ width: "300px", marginBottom: "10px" }} />
                                <Chart id='11113' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='11114' style={{ width: "300px", marginBottom: "10px" }} />
                                <Table id='11115' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='11116' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='11117' />
                                <Table id='11118' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane> */}
                </CustomTab>
            </div >
        );
    }
}

Index.propTypes = {

};

export default Index;