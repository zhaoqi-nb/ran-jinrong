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
                <ComponentProps id="7246" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="7230" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='9704' />
                        </div>
                        <div style={{ display: "flex", borderBottom: "1px solid #E1E8F0", marginTop: 8, justifyContent: "space-between" }}>
                            <div className="company-title-wrapper" style={{ border: 'none', margin: 0 }}>
                                <CompanyTitle id='9705' />
                                <UpdateTime className="common-margin-left" id='9706' />
                            </div>
                        </div>
                        <CustomTab id="9707" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id="9708" style={{ width: '300px' }} />
                                <Chart id="9709" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="9710" style={{ width: '300px' }} />
                                <Table id="9711" />
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6817同行业跳转 */}
                                <CustomSelect id="9712" className="select-margin-top-remove" />
                                <Chart id="9713" />
                                <Table id="9714" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/**渠道分布 */}
                    <CustomTabPane>
                        <Custom_Date id='9000' style={{ marginRight: '24px' }} />
                        <CustomSelect id="9303" />
                        <CustomSelect id="9304" />
                        <div className='company-title-wrapper'>
                            <CompanyTitle id='9001' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='9002' />
                        </div>
                        <CustomTab id="9003" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="9004">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='9005' style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="9006" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='9007' style={{ width: '300px' }} />
                                            <Filter id='9008' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="9009" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='9010' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='9011' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='9101' style={{ marginTop: 0 }} />
                                <Chart id="9102" />
                                <Table id='9103' />
                            </CustomTabPane>

                        </CustomTab>
                    </CustomTabPane>



                    {/**品类分布 */}
                    <CustomTabPane>
                        <Custom_Date id='9012' style={{ marginRight: '24px' }} />
                        <CustomSelect id="9013" style={{ marginRight: '24px' }} />
                        <CustomSelect id="9014" style={{ marginRight: '0' }} />
                        <CustomSelect id="9111" style={{ marginRight: '10px' }} />
                        <div className='company-title-wrapper'>
                            <CompanyTitle id='9015' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='9016' />
                        </div>
                        <CustomTab id="9017" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="9018">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='9019' style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="9020" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='9021' style={{ width: '300px' }} />
                                            <Filter id='9022' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="9023" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='9024' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='9025' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='9104' style={{ marginTop: 0 }} />
                                <Chart id="9105" />
                                <Table id='9106' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>


                    {/**品牌分布 */}
                    <CustomTabPane>
                        <Custom_Date id='7348' />
                        <div className='company-title-wrapper'>
                            <CompanyTitle id='7349' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='7350' />
                        </div>
                        <CustomTab id="7351" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomSelect id='7352' select_style={{ width: '200px' }} style={{ marginTop: 0 }} />
                                <Filter id='7353' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                <Chart id='7354' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='7355' style={{ width: '300px' }} />
                                <Table id='7356' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>



                    {/**药品分布 */}
                    <CustomTabPane>
                        <Custom_Date id='9026' style={{ marginRight: '24px' }} />
                        <CustomSelect id="9027" style={{ marginRight: '24px' }} />
                        <div style={{ display: "inline-block" }}>
                            <CustomSelect id="9028" />
                            <CustomSelect id="9112" />
                        </div>

                        <div className='company-title-wrapper'>
                            <CompanyTitle id='9029' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='9030' />
                        </div>
                        <CustomTab id="9031" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="9032">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='9033' style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="9034" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='9035' style={{ width: '300px' }} />
                                            <Filter id='9036' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="9037" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='9038' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='9039' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='9107' style={{ marginTop: 0 }} />
                                <Chart id="9108" />
                                <Table id='9109' />
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