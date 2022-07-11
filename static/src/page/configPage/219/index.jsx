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
                <ComponentProps id='220' data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />

                <CustomTab id='221' position="top-outside">
                     <CustomTabPane>
                        <Custom_Date id='222' style={{marginRight: '24px', marginTop: '8px'}}/>
                        <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center', borderBottom: '1px solid #E1E8F0'}}>
                            <CompanyTitle id='223'/>
                            <UpdateTime style={{marginLeft:'16px'}} id='224' />
                        </div>
                        
                        <CustomTab id='225' >
                            <CustomTabPane>
                                <CustomSelect id='226' />
                                <Chart id='227' />
                                <CustomTable id='228' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    <CustomTabPane>
                        <Custom_Date id='229'  style={{marginRight: '24px', marginTop: '8px'}}/>
                        <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center', borderBottom: '1px solid #E1E8F0'}}>
                            <CompanyTitle id='230'/>
                            <UpdateTime style={{marginLeft:'16px'}} id='231' />
                        </div>
                        <CustomTab id='232' >
                            <CustomTabPane>
                                <Filter id='236' style={{ width: "300px" }} style_btn={{ marginTop: '8px' }}/>
                                <CustomTable id='237' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='233' />
                                <Chart id='234' />
                                <CustomTable id='235' />
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