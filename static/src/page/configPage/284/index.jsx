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
                {/* <ComponentProps id='220' data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} /> */}
                <ComponentProps id='285' data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id='286' position="top-outside">
                     <CustomTabPane>
                        <Custom_Date id='287' />
                        <CustomSelect id='288' style={{marginLeft: '50px'}}/>
                        <div style={{ display: 'flex', padding: '10px 0', alignItems:'center' }}>
                            <CompanyTitle id='289'  />
                            <UpdateTime style={{marginLeft:'40px'}} id='290' />
                        </div>
                        <CustomTab id='291' >
                            <CustomTabPane>
                                <CustomSelect id='292' />
                                <Chart id='293' />
                                <CustomTable id='294' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/* <CustomTabPane>
                        <Custom_Date id='330' />
                        <CustomSelect id='331' />
                        <div style={{ display: 'flex', padding: '10px 0', alignItems:'center' }}>
                            <CompanyTitle id='332'  />
                            <UpdateTime style={{marginLeft:'40px'}} id='333' />
                        </div>
                        <CustomTab id='334' >
                            <CustomTabPane>
                                <CustomSelect id='335' />
                                <Chart id='336' />
                                <CustomTable id='337' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='338'/>
                                <CustomTable id='339' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane> */}
                </CustomTab>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;