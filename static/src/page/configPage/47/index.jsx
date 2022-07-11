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
import ComponentProps from '@componentProps/config'
import Chart from '@chart/config'
import Table from '@table/config';
import FixedParam from '@fixedParam'
import LinkTo from '@/page/component/url/config';

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
            resAttr: null,
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
        const { pageInfo } = this.state;
        if (!pageInfo) return null;
        return (
            <div>
                <ComponentProps id="94" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomSelect id='48' style={{ marginTop: '8px' }} />
                <CustomSelect id='49' />
                <CustomSelect id='50' />
                <FixedParam id="9576" />
                <div style={{ position: 'absolute', top: 48, left: 0, width: '100%', height: 'calc(100% - 48px)' }}>
                    <CustomTab id="51" position="top-outside">
                        {/**整体概况 */}
                        <CustomTabPane>
                            <Custom_Date id='52' style={{ marginRight: '24px', marginTop: 0 }} select_style={{width: `${i18n.getLocalLanguage()==='zh_CN'?'175px':'280px'}`}}/>
                            <CustomSelect id='53' />

                            <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center', borderBottom: '1px solid #E1E8F0' }}>
                                <CompanyTitle id='54' />
                                <UpdateTime style={{ marginLeft: '16px' }} id='55' />
                            </div>
                            <CustomTab id="56" style={{ paddingTop: '8px' }}>
                                <CustomTabPane>
                                    <CustomSelect id='57' select_style={{ width: '220px' }} style={{ marginTop: '0px' }} />
                                    <Chart id="58" />
                                    <Table id="59" />
                                    <LinkTo id="9575" />
                                </CustomTabPane>
                                <CustomTabPane>
                                    <Filter id='60' style={{ width: '300px' }} />
                                    <Chart id="61" />
                                    <LinkTo id="9575" />
                                </CustomTabPane>
                                <CustomTabPane>
                                    <div>
                                        <Filter id='62' style={{ width: '300px', marginBottom: "10px" }} />
                                        <Table id='63' />
                                        <LinkTo id="9575" />
                                    </div>
                                </CustomTabPane>
                            </CustomTab>
                        </CustomTabPane>
                        {/**品牌集中度 */}
                        <CustomTabPane>
                            <div>
                                <Custom_Date id='64' style={{ marginRight: '24px' }} />
                                <CustomSelect id='65' />
                            </div>
                            <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center', borderBottom: '1px solid #E1E8F0' }}>
                                <CompanyTitle id='66' />
                                <UpdateTime style={{ marginLeft: '16px' }} id='67' />
                            </div>
                            <CustomTab id="68" style={{ paddingTop: '8px' }}>
                                <CustomTab id="696" >
                                    <CustomTabPane >
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-31px', height: 0 }}>
                                            <Filter id='72' style={{ width: '300px' }} />
                                        </div>

                                        <Chart id="73" />
                                        <LinkTo id="9575" />
                                    </CustomTabPane>
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-31px', height: 0 }}>
                                            <Filter id='9138' style={{ width: '300px' }} />
                                            <Filter id='75' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <FixedParam id='6596' />
                                        <Chart id="77" />
                                        <LinkTo id="9575" />
                                    </CustomTabPane>
                                </CustomTab>
                                <CustomTabPane>
                                    {/*  style={{ height: '500px' }} */}
                                    <div>
                                        <Filter id='78' style={{ width: '300px' }} />
                                        <Table id='275' />
                                        <LinkTo id="9575" />
                                    </div>
                                </CustomTabPane>
                                <CustomTabPane>
                                    <CustomSelect id='69' style={{ marginTop: 0 }} />
                                    <Chart id="70" />
                                    <Table id="71" />
                                    <LinkTo id="9575" />
                                </CustomTabPane>
                            </CustomTab>
                        </CustomTabPane>
                        {/**价格段分布 */}
                        <CustomTabPane>
                            <div>
                                <Custom_Date id='79' style={{ marginRight: '24px' }} />
                                <CustomSelect id='80' />
                            </div>
                            <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center', borderBottom: '1px solid #E1E8F0' }}>
                                <CompanyTitle id='81' />
                                <UpdateTime style={{ marginLeft: '16px' }} id='82' />
                            </div>
                            <CustomTab id="83" style={{ paddingTop: '8px' }}>
                                <CustomTab id="701">
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-31px', height: 0 }}>
                                            <Filter id='87' style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="88" />
                                        <LinkTo id="9575" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-31px', height: 0 }}>
                                            <Filter id='9139' style={{ width: '300px' }} />
                                            <Filter id='89' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                            <FixedParam id='6597' />
                                        </div>
                                        <Chart id="91" />
                                        <LinkTo id="9575" />
                                    </CustomTabPane>
                                </CustomTab>
                                <CustomTabPane>
                                    <div style={{ minHeight: '500px' }}>
                                        <Filter id='92' style={{ width: '300px' }} />
                                        <Table id='93' />
                                        <LinkTo id="9575" />
                                    </div>
                                </CustomTabPane>
                                <CustomTabPane>
                                    <CustomSelect id='84' style={{ marginTop: 0 }} />
                                    <Chart id="85" />
                                    <Table id='86' />
                                    <LinkTo id="9575" />
                                </CustomTabPane>

                            </CustomTab>
                        </CustomTabPane>
                    </CustomTab>


                </div>

            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;