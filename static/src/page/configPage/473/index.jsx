'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import { CustomTab, CustomTabPane } from '@tab/config'
import Custom_Date from "@date/config";
import Filter from '@filter/config'
import Explain from '@explain'
import CustomTable from '@table/config'
import DrawerChart from '@drawerChart/config';
import FilterOption from '@filterOption/config'
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
                <CustomTab id='474' position="top-outside">
                    <CustomTabPane>
                        <Custom_Date id='475' />
                        <CustomTable id='476' />
                    </CustomTabPane>
                    <CustomTabPane>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Explain id='6589' />
                            <Custom_Date id='477' />
                            <FilterOption id='478' style={{ marginTop: '12px', marginBottom: 2 }} />
                        </div>
                        <Chart id='479' />
                    </CustomTabPane>
                    <CustomTabPane>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Explain id='6590' />
                            <Custom_Date id='480' />
                            <FilterOption id='481' style={{ marginTop: '12px', marginBottom: 2 }} />
                        </div>
                        <Chart id='482' />
                    </CustomTabPane>
                    <CustomTabPane>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Explain id='6591' />
                            <Custom_Date id='483' />
                            <FilterOption id='484' style={{ marginTop: '12px', marginBottom: 2 }} />
                        </div>
                        <Chart id='485' />
                    </CustomTabPane>
                    <CustomTabPane>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Explain id='6592' />
                            <Custom_Date id='486' />
                            <FilterOption id='487' style={{ marginTop: 12, marginBottom: 2 }} />
                        </div>
                        <Chart id='488' />
                    </CustomTabPane>
                </CustomTab>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;