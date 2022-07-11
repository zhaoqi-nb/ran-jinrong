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
                <ComponentProps id="7727" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="7726" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <Custom_Date id='8318' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8319' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='8320' />
                        </div>
                        <CustomTab id="8321" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <Filter id='8322' />
                                <Chart id="8323" />
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='8324' />
                                <Table id="8325" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id='8326' className="select-margin-top-remove" />
                                <Chart id="8327" />
                                <Table id="8328" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**商品渠道分析 */}
                    <CustomTabPane>
                        <Custom_Date id='8145' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8146' />
                            <UpdateTime className="common-margin-left" id='8147' />
                        </div>
                        <CustomTab id="8148" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="8149">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='8150' style={{ width: "300px", marginBottom: "10px" }} />
                                        </div>
                                        <Chart id='8151' />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='8152' />
                                            <Filter id='8153' style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id='8154' />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8155' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='8156' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <CustomSelect id='8157' className="select-margin-top-remove" />
                                    <Chart id='8158' />
                                    <Table id='8159' />
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**店铺分析 */}
                    <CustomTabPane>
                        <Custom_Date id='8130' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8131' />
                            <UpdateTime className="common-margin-left" id='8132' />
                        </div>
                        <CustomTab id="8133" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="8134">
                                    {/* 结构 */}
                                    {/* <CustomTabPane>
                                        <div style={{position:'relative',left:`${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`,zIndex:'10', top:'-32px', height:0, display:'flex'}}>
                                            <Filter id='8135' style={{ width: "300px"}}/>
                                        </div>
                                        <Chart id='8136' />
                                    </CustomTabPane> */}
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper1" : "filter-wrapper1-US"}>
                                            <Filter id='8137' />
                                            <Filter id='8138' style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id='8139' />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8140' style={{ width: "300px" }} />
                                    <Table id='8141' />
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**行业分析 */}
                    <CustomTabPane>
                        <Custom_Date id='8160' className="common-margin-right" />
                        <CustomSelect id='8566' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8161' />
                            <UpdateTime className="common-margin-left" id='8162' />
                        </div>
                        <CustomTab id="8163" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="8164">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='8165' style={{ width: "300px", marginBottom: "10px" }} />
                                        </div>
                                        <Chart id='8166' />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='8167' />
                                            <Filter id='8168' style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id='8169' />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8170' style={{ width: "300px" }} />
                                    <Table id='8171' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <CustomSelect id='8172' className="select-margin-top-remove" />
                                    <Chart id='8173' />
                                    <Table id='8174' />
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**价格区间分析 */}
                    <CustomTabPane>
                        <Custom_Date id='8175' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8176' />
                            <UpdateTime className="common-margin-left" id='8177' />
                        </div>
                        <CustomTab id="8178" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="8179">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='8180' style={{ width: "300px", marginBottom: "10px" }} />
                                        </div>
                                        <Chart id='8181' />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='8182' />
                                            <Filter id='8183' style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id='8184' />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8185' style={{ width: "300px" }} />
                                    <Table id='8186' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <CustomSelect id='8187' className="select-margin-top-remove" />
                                    <Chart id='8188' />
                                    <Table id='8189' />
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**品牌榜单  */}
                    <CustomTabPane>
                        <Custom_Date id='7728' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='7729' />
                            <UpdateTime className="common-margin-left" id='7730' />
                        </div>
                        <CustomTab id="7731" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='7732' style={{ width: "300px" }} />
                                    <Table id='7733' />
                                    <DrawerChart id="7925" paramRender={this.paramRender} />
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