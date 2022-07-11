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
        if (!pageInfo) return null;
        return (
            <div >
                <ComponentProps id="8802" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="8801" position="top-outside">
                    {/**整体概况  */}
                    <CustomTabPane>
                        <Custom_Date id='8804' />
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='8805' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='8806' />
                        </div>
                        <CustomTab id="8807" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8808' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Chart id='8809' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8810' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='8811' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <CustomSelect id="8812" style={{ marginTop: 0 }} />
                                    <Chart id='8813' />
                                    <Table id='8814' />
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>



                    {/**游戏分析 */}
                    <CustomTabPane>
                        <Custom_Date id='9636' />
                        <div className='company-title-wrapper'>
                            <CompanyTitle id='9637' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='9638' />
                        </div>
                        <CustomTab id="9639" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomSelect id='9640' select_style={{ width: '200px' }} style={{ marginTop: 0 }} />
                                <Filter id='9641' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                <Chart id='9642' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='9643' style={{ width: '300px' }} />
                                <Table id='9644' />
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