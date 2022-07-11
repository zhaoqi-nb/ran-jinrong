'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import { CustomTab, CustomTabPane } from '@tab/config'
import Custom_Date from "@date/config";
import FilterOption from '@filterOption/config'
import CustomTable from '@table/config'
import DrawerChart from '@drawerChart/config';
import Chart from '@chart/config'
import Explain from '@explain'

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
        // if (!pageInfo) return null;

        return (
            <div >
                <CustomTab id='631' position="top-outside">
                    <CustomTabPane>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Explain id="6595" />
                            <FilterOption id='632' style={{ width: '300px', marginTop: 12, marginBottom: 2 }} />
                        </div>
                        <Chart id='633' />
                    </CustomTabPane>
                    <CustomTabPane>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Explain id="6595" />
                            <FilterOption id='634' style={{ width: '300px', marginTop: 12, marginBottom: 2 }} />
                        </div>
                        <Chart id='635' />
                    </CustomTabPane>
                </CustomTab>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;