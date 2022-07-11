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
                <ComponentProps id="11304" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="11305" position="top-outside">
                    {/**整体概况  */}
                    <CustomTabPane>
                        <Custom_Date id='11306' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='11307' />
                            <UpdateTime className="common-margin-left" id='11308' />
                        </div>
                        <CustomTab id="11309" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='11310' style={{ width: "300px" }} />
                                    <Chart id='11311' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='11312' style={{ width: "300px" }} />
                                    <Table id='11313' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <CustomSelect id="11314" className="select-margin-top-remove" />
                                    <Chart id='11315' />
                                    <Table id='11316' />
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