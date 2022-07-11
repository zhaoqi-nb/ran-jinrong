'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import { CustomTab, CustomTabPane } from '@tab/config'
import Custom_Date from "@date/config";
import FilterOption from '@filterOption/config'
import CustomTable from '@table/config'
import DrawerChart from '@drawerChart/config';
import Chart from '@chart/config'

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

    render() {
        const { pageInfo } = this.state;
        if (!pageInfo) return null;

        return (
            <div >
                <CustomTab id='503' position="top-outside">
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='504' />
                        </div>
                        <CustomTable id='505' />
                    </CustomTabPane>
                    <CustomTabPane>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Custom_Date id='506' />
                            <FilterOption id='507' style={{ marginTop: 12, marginBottom: 2 }} />
                        </div>
                        <Chart id='508' />
                    </CustomTabPane>
                </CustomTab>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;