'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import Custom_Date from "@date/config";
import CustomSelect from '@select/config';
import CompanyTitle from '@title/config';
import UpdateTime from '@updateTime/config';
import { CustomTab, CustomTabPane } from '@tab/config'
import CustomTable from '@table/config';
import CustomChart from '@chart/config';

import ComponentProps from '@componentProps/config';
import Filter from '@filter/config';

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
                <ComponentProps id="6659" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="6645" position="top-outside">
                    <CustomTabPane>
                        <Custom_Date id='6646' />
                        <div style={{ display: "flex", borderBottom: "1px solid #E1E8F0", marginTop: 8, justifyContent: "space-between" }}>
                            <div className="company-title-wrapper" style={{ border: 'none', margin: 0 }}>
                                <CompanyTitle id='6647' />
                                <UpdateTime className="common-margin-left" id='6648' />
                            </div>
                            <CustomSelect id="9614" />
                        </div>
                        <CustomTab id="6649" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <Filter id='6650' />
                                <CustomChart id="6651" />
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='6652' />
                                <CustomTable id="6653" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id='6654' className="select-margin-top-remove" />
                                <CustomChart id="6655" />
                                <CustomTable id="6656" />
                            </CustomTabPane>
                        </CustomTab>

                    </CustomTabPane>

                    {/* 地区分布 */}
                    <CustomTabPane>
                        <Custom_Date id='7963' className="common-margin-right " />
                        <CustomSelect id='7964' />
                        <div style={{ display: "flex", borderBottom: "1px solid #E1E8F0", marginTop: 8, justifyContent: "space-between" }}>
                            <div className="company-title-wrapper" style={{ border: 'none', margin: 0 }}>
                                <CompanyTitle id='7966' />
                                <UpdateTime className="common-margin-left" id='7967' />
                            </div>
                            <CustomSelect id="9615" />
                        </div>
                        <CustomTab id="7968" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>

                                <CustomTab id="7969">
                                    {/**结构 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='7973' style={{ width: '300px' }} />
                                        </div>
                                        <CustomChart id="7974" />
                                    </CustomTabPane>
                                    {/**趋势 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='7970' style={{ width: '400px' }} />
                                            <Filter id='7971' style={{ width: '300px' }} className="common-margin-left" />
                                        </div>
                                        <CustomChart id="7972" />
                                    </CustomTabPane>

                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='7975' style={{ width: '300px' }} />
                                <CustomTable id="7976" />
                            </CustomTabPane>

                        </CustomTab>

                    </CustomTabPane>

                    {/* 行业分布 */}
                    <CustomTabPane>
                        <Custom_Date id='7977' className="common-margin-right" />
                        <CustomSelect id='7978' />
                        <div style={{ display: "flex", borderBottom: "1px solid #E1E8F0", marginTop: 8, justifyContent: "space-between" }}>
                            <div className="company-title-wrapper" style={{ border: 'none', margin: 0 }}>
                                <CompanyTitle id='7980' />
                                <UpdateTime className="common-margin-left" id='7981' />
                            </div>
                            <CustomSelect id="9616" />
                        </div>
                        <CustomTab id="7982" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>

                                <CustomTab id="7983">
                                    {/**结构 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='7987' style={{ width: '300px' }} />
                                        </div>
                                        <CustomChart id="7988" />
                                    </CustomTabPane>
                                    {/**趋势 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='7984' style={{ width: '400px' }} />
                                            <Filter id='7985' style={{ width: '300px' }} className="common-margin-left" />
                                        </div>
                                        <CustomChart id="7986" />
                                    </CustomTabPane>

                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='7989' style={{ width: '300px' }} />
                                <CustomTable id="7990" />
                            </CustomTabPane>

                        </CustomTab>

                    </CustomTabPane>

                    {/* 价格区间分布 */}
                    <CustomTabPane>
                        <Custom_Date id='8985' />
                        <div style={{ display: "flex", borderBottom: "1px solid #E1E8F0", marginTop: 8, justifyContent: "space-between" }}>
                            <div className="company-title-wrapper" style={{ border: 'none', margin: 0 }}>
                                <CompanyTitle id='8986' />
                                <UpdateTime style={{ marginLeft: '16px' }} id='8987' />
                            </div>
                            <CustomSelect id="9617" />
                        </div>
                        <CustomTab id="8988" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <CustomTab id="8989">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='8990' style={{ width: "300px", marginBottom: "10px" }} />
                                        </div>
                                        <CustomChart id='8991' />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='8992' />
                                            <Filter id='8993' style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <CustomChart id='8994' />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8995' style={{ width: "300px", marginBottom: "10px" }} />
                                    <CustomTable id='8996' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <CustomSelect id='8997' style={{ marginTop: 0 }} />
                                    <CustomChart id='8998' />
                                    <CustomTable id='8999' />
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