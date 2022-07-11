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
import Jump from '@jump/config';

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
                <ComponentProps id="8382" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="8381" position="top-outside">
                    {/**整体概况  */}
                    <CustomTabPane>
                        <Custom_Date id='8384' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8385' />
                            <UpdateTime className="common-margin-left" id='8386' />
                        </div>
                        <CustomTab id="8387" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8388' style={{ width: "300px" }} />
                                    <Chart id='8389' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8390' style={{ width: "300px" }} />
                                    <Table id='8391' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <CustomSelect id="8392" className="select-margin-top-remove" />
                                    <Chart id='8393' />
                                    <Table id='8394' />
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**主播数量分析  */}
                    <CustomTabPane>
                        <Custom_Date id='8567' className="common-margin-right"/>
                        <CustomSelect id='9507' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8568' />
                            <UpdateTime className="common-margin-left" id='8569' />
                        </div>
                        <CustomTab id="8570" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="8571">
                                    <CustomTabPane>
                                    {/* 结构 */}
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='8572' style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="8573" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='8574' style={{ width: '300px' }} />
                                            <Filter id='8575' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="8576" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8577' style={{ width: "300px" }} />
                                    <Table id='8578' />
                                </div>
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id='8579' select_style={{ width: '230px' }} style={{ marginTop: 0 }} />
                                <Chart id='8580' />
                                <Table id='8581' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**主播收入分析  */}
                    <CustomTabPane>
                        <Custom_Date id='8582' className="common-margin-right"/>
                        <CustomSelect id='9508' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8583' />
                            <UpdateTime className="common-margin-left" id='8584' />
                        </div>
                        <CustomTab id="8585" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="8586">
                                    <CustomTabPane>
                                    {/* 结构 */}
                                    <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='8587' style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="8588" /> 
                                   </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 className={this.props.i18n.getLocalLanguage()=="zh_CN"?"filter-wrapper1":"filter-wrapper1-US"}*/}
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='8589' style={{ width: '300px' }} />
                                            <Filter id='8590' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="8591" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8592' style={{ width: "300px" }} />
                                    <Table id='8593' />
                                </div>
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id='8594' select_style={{ width: '230px' }} style={{ marginTop: 0 }} />
                                <Chart id='8595' />
                                <Table id='8596' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/* 榜单分析 */}
                    <CustomTabPane>
                        <Custom_Date id='9113' />
                        <CustomSelect id="9114" style={{ marginLeft: 25 }} />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='9115' />
                            <UpdateTime className="common-margin-left" id='9116' />
                        </div>
                        <CustomTab id="9117" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='9118' style={{ width: "300px" }} />
                                    <Table id='9119' />
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab>
                <Jump id='8383' />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;