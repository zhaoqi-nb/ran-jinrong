'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import { CustomTab, CustomTabPane } from '@tab/config'
import Custom_Date from "@date/config";
import FilterOption from '@filterOption/config'
import CustomTable from '@table/config'
import DrawerChart from '@drawerChart/config';
import Explain from '@explain'
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
                <CustomTab id='466' position="top-outside">
                    <CustomTabPane>
                        <Custom_Date id='465' />
                        <CustomTable id='469' />
                    </CustomTabPane>
                    <CustomTabPane>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {/* <Explain id="6593" /> */}
                            <Custom_Date id='471' />
                            <FilterOption id='470' style={{ marginTop: 12, marginBottom: 2 }} />
                        </div>
                        <Chart id='467' />
                    </CustomTabPane>
                </CustomTab>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;