'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import { CustomTab, CustomTabPane } from '@tab/config'
import Custom_Date from "@date/config";
import CustomSelect from '@select/config';
import CompanyTitle from '@title/config';
import Filter from '@filter/config'
import FilterOption from '@filterOption/config'
import ComponentProps from '@componentProps/config'
import Table from '@table/config';
import DownExcel from '@downExcel/common/index';
import { getData } from '../../component/util/template'

import Explain from '@explain'
import './index.less'

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
                privilegeDtoList = pageInfo.privilegeDtoList,
                stock_code = resAttr.stock_code,
                ifDownload = getData('ifDownload', privilegeDtoList);

            this.setState({ pageInfo, resAttr, stock_code, ifDownload });
        }
    }
    getComponentProps = (pageInfo) => {
        // , stock_code: '6618.HK', menuName: '京东健康' 
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo }
    }

    getCompanyData = (resAttr) => {
        return JSON.parse(resAttr)
    }

    transformParam = (param, selectedId, originData) => {
        const item = originData.find(item => item.stockCode === selectedId)
        const resAttr = item.resAttr ? JSON.parse(item.resAttr) : {}
        return { ...param, ...resAttr, ...item }
    }
    downPage = () => {
        console.log('2342=>')
    }

    render() {
        const { pageInfo, ifDownload } = this.state;
        if (!pageInfo) return null;
        return <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ComponentProps id="9480" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
            {/* <div style={{ padding: '8px 0' }}>
                <CompanyTitle id='9476' />
            </div> */}
            <div style={{ marginTop: 8 }}>
                <FilterOption id="9477" transformParam={this.transformParam} />
            </div>
            <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center', borderBottom: '1px solid #E1E8F0' }}>
                <CompanyTitle id='9478' />
                <div style={{ flex: '1', textAlign: 'right' }}>
                    {ifDownload && ifDownload.show ? <DownExcel downPage config={{ show: true, dataType: "table" }} /> : null}
                </div>
            </div>
            <div>
                <Explain id="9479" ifShowIcon={false} style={{ margin: '0 0 10px 0' }} />
            </div>

            <div style={{ marginTop: -30 }}>

                <Filter id='9481' style_btn={{ display: "none" }} />
                <Table id="9482" />
            </div>
        </div>
    }
}

export default Index;