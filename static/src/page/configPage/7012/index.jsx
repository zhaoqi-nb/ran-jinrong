'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import Custom_Date from "@date/config";
import Jump from '@jump/config';
import CompanyTitle from '@title/config';
import UpdateTime from '@updateTime/config';
import { CustomTab, CustomTabPane } from '@tab/config'
import CustomTable from '@table/config';
import CustomChart from '@chart/config';
import Filter from '@filter/config';
import ComponentProps from '@componentProps/config';

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
        // , menuName:'百胜中国',"storeName":"肯德基数据","store_code":"KFC"
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo }
    }

    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;
        return (
            <div>
                <ComponentProps id="7017" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <div>
                    <Custom_Date id='7014' />
                </div>
                <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                    <CompanyTitle id='7015' />
                    <UpdateTime style={{ marginLeft: '16px' }} id='7016' />
                </div>
                <CustomTab id="7018" style={{ paddingTop: '8px' }}>
                    <CustomTabPane>
                        <Filter id="7365" style={{ width: '300px' }} />
                        <CustomTable id="7368" />
                    </CustomTabPane>
                    <CustomTabPane>
                        <CustomTab id="7019">
                            <CustomTabPane>
                                <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'88px':'123px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                    <Filter id="7021" style={{ width: '300px' }} />
                                    <Filter id="7023" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                </div>
                                <CustomChart id="7263" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    
                </CustomTab>
                <Jump id="7369" />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;