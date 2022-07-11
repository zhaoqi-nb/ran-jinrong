'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import { CustomTab, CustomTabPane } from '@tab/config';
import Custom_Date from "@date/config";
import CustomSelect from '@select/config';
import CompanyTitle from '@title/config';
import UpdateTime from '@updateTime/config';
import Filter from '@filter/config';
import ComponentProps from '@componentProps/config';
import Chart from '@chart/config';
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
            <div >
                <ComponentProps id="6631" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="6613" position="top-outside">
                    <CustomTabPane>
                        <Custom_Date id='6614' />
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='6615' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='6616' />
                        </div>
                        <CustomTab id="6617" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <Filter id='6618' style={{ width: '300px' }} />
                                <Chart id="6619" />
                                <Jump id="6644" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='6620' style={{ width: '300px' }} />
                                <Table id='6621' />
                                <Jump id='6622' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='6623' style={{ marginTop: 0 }} />
                                <Chart id="6624" />
                                <Table id='6625' />
                                <Jump id='6626' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/* 城市维度 */}
                    <CustomTabPane>
                        <Custom_Date id='7407' />
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='7408' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='7409' />
                        </div>
                        <CustomTab id="7410" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <Filter id='7415' style={{ width: '300px' }} />
                                <Table id='7416' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomTab id="7411">
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'88px':'123px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='7412' style={{ width: '300px' }} />
                                            <Filter id='7413' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id='7414' />

                                    </CustomTabPane>
                                </CustomTab>
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