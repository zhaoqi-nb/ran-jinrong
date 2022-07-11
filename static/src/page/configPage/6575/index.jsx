'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import Custom_Date from "@date/config";
import CustomSelect from '@select/config';
import CompanyTitle from '@title/config';
import UpdateTime from '@updateTime/config'
import Filter from '@filter/config'
import Table from '@table/config';
import ComponentProps from '@componentProps/config'

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

    getComponentProps = (pageInfo) => {
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo }
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
            <div>
                <ComponentProps id="6585" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <div>
                    <Custom_Date id='6576' style={{marginRight: '24px'}}/>
                    <div style={{display: 'inline-block', marginRight: '24px'}}>
                    <CustomSelect id='6577'  style={{ marginRight: '24px' }}/>
                    <CustomSelect id='6578'  />
                    </div>
                    <CustomSelect id='6579' style={{ marginRight: '24px' }} />
                    <CustomSelect id='6580' select_style={{width: '200px'}}/>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0', borderBottom: '1px solid #E1E8F0' }}>
                    <CompanyTitle id='6581' />
                    <UpdateTime style={{ marginLeft: '16px' }} id='6582' />
                </div>
                <div style={{position: 'relative'}}>
                    <Filter id='6583' style={{ width: '300px' }} />
                </div>
                <Table id="6584" />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;