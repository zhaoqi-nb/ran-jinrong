'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import { CustomTab, CustomTabPane } from '@tab/config'
import CustomSelect from '@select/config';
import Custom_Date from "@date/config";
import CompanyTitle from '@title/config';
import Filter from '@filter/config'
import ComponentProps from '@componentProps/config'
import Chart from '@chart/config'
import Table from '@table/config';
import Jump from '@jump/config';
import FilterOption from '@filterOption/config'
import Explain from '@explain'
import LinkTo from '@/page/component/url/config';
import DownExcel from '@downExcel/common/index';
import { findIndustryInfo } from '@/page/component/page/util'
import FixedParam from '@fixedParam'
import { getData } from '../../component/util/template'

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
                ifDownload = getData('ifDownload', privilegeDtoList);
            // ifDownload = { "show": false };

            this.setState({ pageInfo, resAttr, ifDownload });
        }
    }
    getComponentProps = (pageInfo) => {
        // , stock_code: "2020.HK", menuName: '李宁'
        const { companyId, resId } = this.props.match.params
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo, companyId, resId }
    }
    render() {
        const { pageInfo, resAttr, ifDownload } = this.state;
        if (!pageInfo) return null;;
        return (
            <div>
                <ComponentProps id="9143" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <Custom_Date id="9156" style={{ display: 'none' }} />
                <Custom_Date id="9157" style={{ display: 'none' }} />
                <CustomTab id="9144" position="top-outside">
                    {/**营收对比  */}
                    <CustomTabPane>
                        <div style={{ margin: '10px 0 10px 0' }}>
                            <FilterOption id='9145' style={{ width: '300px' }} />
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <FilterOption id='9146' style={{ width: '300px' }} />
                        </div>
                        <div style={{ marginBottom: 10, display: 'flex' }}>
                            <FilterOption id='9750' style={{ marginRight: 48 }} />
                            <FilterOption id='9147' style={{ width: 'auto' }} />
                        </div>
                        <FixedParam id="9627" />
                        <Chart id="9148" />
                        <Table id="9149" />
                    </CustomTabPane>
                    {/**线上数据对比  */}
                    <CustomTabPane>
                        {/* <div style={{ display: "flex", borderBottom: "1px solid #E1E8F0", marginTop: 8, justifyContent: "space-between" }}> */}
                        <CompanyTitle id='9150' />
                        <span style={{ float: 'right', marginTop: 13 }}>
                            {ifDownload && ifDownload.show ? <DownExcel downPage config={{ show: true, dataType: "table" }} /> : null}
                        </span>
                        {/* <CustomSelect id="9627" /> */}
                        {/* </div> */}
                        <div className="explain">
                            <Explain id="9151" ifShowIcon={false} style={{ margin: '0 0 10px 0' }} />
                        </div>
                        {/* */}
                        <div style={{ marginTop: -30 }}>
                            <Filter id='9153' style_btn={{ display: "none" }} />
                            <Table id="9154" />
                        </div>
                        <LinkTo id="9155"></LinkTo>
                    </CustomTabPane>
                </CustomTab>
                {/* <Jump id='9155' /> */}
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;