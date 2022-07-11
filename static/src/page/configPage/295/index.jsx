'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import { CustomTab, CustomTabPane } from '@tab/config'
import Custom_Date from "@date/config";
import CustomSelect from '@select/config';
import CompanyTitle from '@title/config';
import UpdateTime from '@updateTime/config'
import Filter from '@filter/config'
import ComponentProps from '@componentProps/config'
import CustomTable from '@table/config'
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

    getComponentProps = (pageInfo) => {
        return {...JSON.parse(pageInfo.resAttr), ...pageInfo}
    }

    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;
        
        return (
            <div >
                <ComponentProps id='296' data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id='297' position="top-outside">
                     <CustomTabPane>
                        <Custom_Date id='298'  style={{marginRight: '24px'}}/>
                        <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center', borderBottom: '1px solid #E1E8F0'}}>
                            <CompanyTitle id='299'  />
                            <UpdateTime style={{marginLeft:'40px'}} id='300' />
                        </div>
                        
                        <CustomTab id='301' >
                            <CustomTabPane>
                                <CustomSelect id='302' />
                                <Chart id='303' />
                                <CustomTable id='304' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    <CustomTabPane>
                        <Custom_Date id='305' style={{marginRight: '24px'}}/>
                        <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center', borderBottom: '1px solid #E1E8F0'}}>
                            <CompanyTitle id='306' />
                            <UpdateTime style={{marginLeft:'40px'}} id='307' />
                        </div>
                        <CustomTab id='308' >
                            <CustomTabPane>
                                <CustomSelect id='309' />
                                <Chart id='310' />
                                <CustomTable id='311' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='379' style={{width:'300px'}}/>
                                <CustomTable id='380'/>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;