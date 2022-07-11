'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import Custom_Date from "@date/config";
import CustomSelect from '@select/config';
import CompanyTitle from '@title/config';
import UpdateTime from '@updateTime/config';
import { CustomTab, CustomTabPane } from '@tab/config'
import CustomTable from '@table/config';
import CustomChart from '@chart/config';
import FilterOption from '@filterOption/config';
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
        return {...JSON.parse(pageInfo.resAttr), ...pageInfo}
    }

    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;
        return (
            <div>
                <ComponentProps id="6586" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="6555" position="top-outside">
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='6556' />
                            <CustomSelect id='6558' style={{ marginLeft: '24px' }} />
                            <CustomSelect id='6557' style={{ marginLeft: '24px' }} />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='6559' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='6587' />
                        </div>
                        <CustomSelect id='6560' style={{marginTop: 0}}/>
                        <CustomChart id="6561" />
                        <div style={{marginTop:"10px"}}><FilterOption id="6562" /></div>
                        <CustomTable id="6563" />
                    </CustomTabPane>
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='6564' />
                            <CustomSelect id='6565' style={{ marginLeft: '24px' }} />
                            <CustomSelect id='6566' style={{ marginLeft: '24px' }} />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='6567' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='6588' />
                        </div>
                        <div>
                            <CustomSelect id='6568' style={{marginTop: 0}}/>
                            <CustomSelect id='6569' style={{ marginLeft: '24px', marginTop: 0}} />
                        </div>
                        <CustomChart id="6570" />
                        <div style={{marginTop:"10px"}}><FilterOption id="6571" /></div>
                        <CustomTable id="6572" />
                    </CustomTabPane>
                </CustomTab>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;