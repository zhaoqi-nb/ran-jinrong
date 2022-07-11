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
                <ComponentProps id="6865" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="6853" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <Custom_Date id='6854' />
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='6855' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='6856' />
                        </div>
                        <CustomTab id="6857" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='6858' style={{ width: '300px' }} />
                                    <Chart id="6859" />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='6860' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='6861' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='6862' style={{ marginTop: 0 }} select_style={{ width: '230px' }} />
                                <Chart id='6863' />
                                <Table id='6864' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/* 城市分布 */}
                    <CustomTabPane>
                        <Custom_Date id='7445' />
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='7446' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='7508' />
                        </div>
                        <CustomTab id="7509" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <CustomTab id="7510">
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '88px' : '123px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="7370" style={{ width: '300px' }} />
                                            <Filter id="7371" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="7622" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="7623" style={{ width: '300px' }} />
                                <Table id="7624" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**留存分析 */}
                    <CustomTabPane>
                        <Custom_Date id='6928' />
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='6929' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='6930' />
                        </div>
                        <CustomTab id="6931" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='6932' style={{ width: '300px' }} />
                                    <Chart id="6933" />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='6934' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='6935' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='6936' style={{ marginTop: 0 }} select_style={{ width: '230px' }} />
                                <Chart id='6937' />
                                <Table id='6938' />
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