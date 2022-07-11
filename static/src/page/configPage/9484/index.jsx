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
                <ComponentProps id="9485" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                {/* <CustomTab id="9486" position="top-outside"> */}
                    {/**整体概况  */}
                    {/* <CustomTabPane> */}
                        <Custom_Date id='9488' />
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='9489' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='9490' />
                        </div>
                        <CustomTab id="9491" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='9493' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Chart id='9494' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='9498' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='9499' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <CustomSelect id="9500" />
                                    <Chart id='9501' />
                                    <Table id='9502' />
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    {/* </CustomTabPane>
                </CustomTab> */}
                <Jump id='9487' />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;