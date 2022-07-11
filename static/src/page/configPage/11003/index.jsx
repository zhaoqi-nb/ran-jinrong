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
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo, brand_name: "凑凑" }
    }
    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;;
        return (
            <div >
                <ComponentProps id="11005" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="11006" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <Custom_Date id='11007' select_style={{ width: `${i18n.getLocalLanguage() === 'zh_CN' ? '175px' : '280px'}` }} className="common-margin-right" />
                        <CustomSelect id="11008" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='11009' />
                            <UpdateTime className="common-margin-left" id='11010' />
                        </div>
                        <CustomTab id="11011" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='11012' style={{ width: '300px' }} />
                                <Chart id="11013" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='11014' style={{ width: "300px" }} />
                                <Table id='11015' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='11016' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='11017' />
                                <Table id='11018' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**城市分布 */}
                    <CustomTabPane>
                        <Custom_Date id='11019' className="common-margin-right" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='11020' />
                            <UpdateTime className="common-margin-left" id='11021' />
                        </div>
                        <CustomTab id="11022" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="11023">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='11252' style={{ width: '300px' }} />
                                            <Filter id='11024' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="11025" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='11026' style={{ width: '300px' }} />
                                            <Filter id='11027' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="11028" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='11029' style={{ width: "300px" }} />
                                    <Table id='11030' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='11031' select_style={{ width: '230px' }} className="select-margin-top-remove common-margin-right" />
                                <Filter id='11255' />
                                <Chart id='11032' />
                                <Table id='11033' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**门店留存 */}
                    <CustomTabPane>
                        <Explain id='11034' style={{ marginTop: '8px' }} />
                        <Custom_Date id='11035' className="common-margin-right" />
                        <CustomSelect id="11036" className="common-margin-right" />
                        <CustomSelect id="11037" />
                        <CustomSelect id="11038" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='11039' />
                            <UpdateTime className="common-margin-left" id='11040' />
                        </div>
                        <CustomTab id="11041" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='11042' style={{ width: "300px" }} />
                                <Chart id='11043' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='11044' style={{ width: "300px", marginBottom: "10px" }} />
                                <Table id='11045' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='11046' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='11047' />
                                <Table id='11048' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**新增/流失门店 */}
                    {/* <CustomTabPane>
                        <Custom_Date id='11049' className="common-margin-right" />
                        <CustomSelect id="11050" /> 
                        <div className="company-title-wrapper">
                            <CompanyTitle id='11051' />
                            <UpdateTime className="common-margin-left" id='11052' />
                        </div>
                        <CustomTab id="11053" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='11054' style={{ width: "300px", marginBottom: "10px" }} />
                                <Chart id='11055' />
                            </CustomTabPane>
                            <CustomTabPane>
                               
                                <Filter id='11056' style={{ width: "300px", marginBottom: "10px" }} />
                                <Table id='11057' />
                             
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='11058' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='11059' />
                                <Table id='11060' />
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