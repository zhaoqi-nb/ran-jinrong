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
                <ComponentProps id='348' data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id='349' position="top-outside">
                     <CustomTabPane>
                         <div>
                            <Custom_Date id='350' />
                            <CustomSelect id='351' style={{marginLeft:"20px"}}/>  
                         </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems:'center' }}>
                            <CompanyTitle id='352'  />
                            <UpdateTime style={{marginLeft:'16px'}} id='353' />
                        </div>
                        
                        <CustomTab id='354' style={{paddingTop: '8px'}}>
                            <CustomTabPane>
                                <Filter id='355' style={{width:"300px"}}/>
                                <CustomTable id='356' />
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