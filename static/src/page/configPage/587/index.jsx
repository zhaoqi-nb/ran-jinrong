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
import DrawerChart from '@drawerChart/config';
import FixedParam from '@fixedParam'
import Table from '@table/config';
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
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo }
    }

    paramRender = (params, record) => {
        let brand_name = record.brand_name_ch
        console.log('record', record)
        return Object.assign({}, params, { brand_name });
    }

    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;

        return (
            <div>
                <CustomTab id="588" position="top-outside">
                    <CustomTabPane>

                        <Custom_Date id="589" style={{ marginRight: '24px', marginTop: 0 }} select_style={{width: `${i18n.getLocalLanguage()==='zh_CN'?'175px':'280px'}`}}/>
                        <CustomSelect id="590" style={{ marginRight: '24px' }} />
                        <div style={{ display: 'inline-block' }}>
                            <CustomSelect id="591" className="select-right" />
                            <CustomSelect id="592" className="select-right" />
                            <CustomSelect id="593" />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0', borderBottom: '1px solid #E1E8F0' }}>
                            <div style={{ display: 'none' }}><Custom_Date id="645" /></div>
                            <CompanyTitle id="594" />
                            {/* <UpdateTime id="595" style={{marginLeft:'16px'}}/> */}
                        </div>
                        <CustomTab id="596">
                            <CustomTabPane>
                                <Table id="597" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    <CustomTabPane>
                        <div>
                            <Custom_Date id="598" style={{ marginRight: '24px' }} />
                            <CustomSelect id="599" style={{ marginRight: '24px' }} />
                            <div style={{ display: 'inline-block' }}>
                                <CustomSelect id="600" />
                                <CustomSelect id="601" />
                                <CustomSelect id="602" />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0', borderBottom: '1px solid #E1E8F0' }}>
                            <div style={{ display: 'none' }}><Custom_Date id="645" /></div>
                            <CompanyTitle id="603" />
                            <UpdateTime id="604" className="common-margin-left" />
                        </div>
                        <FixedParam id='693' />
                        <CustomTab id="605" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <Filter id="606" style={{ width: '300px' }} />
                                <Table id="607" />
                                <DrawerChart id="660" paramRender={this.paramRender} />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="608" style={{ width: '300px' }} />
                                <Chart id="609" />
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