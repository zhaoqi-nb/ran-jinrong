'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import Custom_Date from "@date/config";
import CustomSelect from '@select/config';
import CompanyTitle from '@title/config';
import UpdateTime from '@updateTime/config'
import CustomTable from '@table/config'
import Chart from '@chart/config'
import ResAppPrivilege from '@resAppPrivilege/config'
import {FormattedMessage} from '@/components/FastIntl'

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
        return {...JSON.parse(pageInfo.resAttr), ...pageInfo}
    }

    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;
        
        return (
            <div >
                <ResAppPrivilege id='516' />
                {/* <span><FormattedMessage id="更新频率" /></span> */}
                <Custom_Date id='637' style={{ marginRight: 24, marginTop: 8}} select_style={{width: `${i18n.getLocalLanguage()==='zh_CN'?'175px':'280px'}`}}/>
                {/* <CustomSelect id='638' /> */}
                <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0', borderBottom: '1px solid #E1E8F0'}}>
                    <CompanyTitle id='639' />
                    {/* <UpdateTime style={{ marginLeft: '16px' }} id='640' /> */}
                </div>
                <Chart id='641' />
                <CustomTable id='642' />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;