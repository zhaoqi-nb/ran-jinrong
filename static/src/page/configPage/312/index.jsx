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
                <ComponentProps id='313' data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id='314' position="top-outside">
                     <CustomTabPane>
                        <Custom_Date id='315' />
                        <div style={{ display: 'flex', padding: '10px 0', alignItems:'center' }}>
                            <CompanyTitle id='316'  />
                            <UpdateTime style={{marginLeft:'40px'}} id='317' />
                        </div>
                        
                        <CustomTab id='318' >
                            <CustomTabPane>
                                <CustomSelect id='319' />
                                <Chart id='320' />
                                <CustomTable id='321' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    <CustomTabPane>
                        <Custom_Date id='322' />
                        <div style={{ display: 'flex', padding: '10px 0', alignItems:'center' }}>
                            <CompanyTitle id='323' />
                            <UpdateTime style={{marginLeft:'40px'}} id='324' />
                        </div>
                        <CustomTab id='325' >
                            <CustomTabPane>
                                <CustomSelect id='326' />
                                <Chart id='327' />
                                <CustomTable id='328' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='377' style={{width:"300px"}}/>
                                <CustomTable id='378'/>
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