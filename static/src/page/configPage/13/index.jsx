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
import CustomCheckbox from '@checkbox/config'
import ComponentProps from '@componentProps/config'
import Chart from '@chart/config'
import Table from '@table/config';
import DrawerChart from '@drawerChart/config';
import Hide from '@hide/config';
import FixedParam from '@fixedParam'
import LinkTo from '@/page/component/url/config';
import { findIndustryInfo } from '@/page/component/page/util'

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
    paramRender = (params, record) => {
        let type_name = (record.third_type_name && record.third_type_name != '全部') ? record.third_type_name : record.second_type_name;
        return Object.assign({}, params, { type_name });
    }

    getComponentProps = (pageInfo) => {
        const { industryId: parentId } = this.props.match.params
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo, parentId, redId: findIndustryInfo("47") }
    }

    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;

        return (
            <div >
                <ComponentProps id="46" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <Custom_Date id='9509' style={{ display: 'none' }} />
                <CustomTab id="14" position="top-outside">
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='15' style={{ marginRight: '24px' }} />
                            <CustomSelect id='16' style={{ marginRight: '24px' }} />
                            <div style={{ display: 'inline-flex' }}>
                                <div style={{ display: 'none' }}><CustomSelect id='17' /></div>
                                <CustomSelect id='18' />
                            </div>
                        </div>
                        <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center', borderBottom: '1px solid #E1E8F0' }}>
                            <CompanyTitle id='19' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='20' />
                        </div>
                        <CustomTab id="21" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <div style={{ display: 'flex' }}>
                                        <Filter id='22' style={{ width: '750px !importment' }} />
                                        <CustomCheckbox id='23' style={{ marginLeft: '30px', paddingTop: '5px' }} />
                                    </div>
                                    <Hide id="370"><div><Table id="24" /><DrawerChart id="95" paramRender={this.paramRender} /></div></Hide>
                                    <div><Table id="74" /><DrawerChart id="96" paramRender={this.paramRender} /></div>
                                    {/* <LinkTo id="9320" /> */}
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <div style={{ display: 'flex' }}>
                                        <Filter id='25' style={{ width: '300px' }} />
                                        <CustomCheckbox id='26' style={{ marginLeft: '30px', paddingTop: '5px' }} />
                                    </div>
                                    <Chart id="27" />
                                </div>
                                {/* <LinkTo id="9320" /> */}
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='29' style={{ marginRight: '24px' }} />
                            <CustomSelect id='30' style={{ marginRight: '24px' }} />
                            <div style={{ display: 'inline-block' }}>
                                <div style={{ display: 'none' }}><CustomSelect id='31' /></div>
                                <CustomSelect id='32' />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0', borderBottom: '1px solid #E1E8F0' }}>
                            <CompanyTitle id='33' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='35' />
                        </div>
                        <FixedParam id='9577' />
                        <CustomTab id="34" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <div style={{ display: 'flex' }}>
                                        <Filter id='40' style={{ width: '300px' }} />
                                        <CustomCheckbox id='41' style={{ marginLeft: '30px', paddingTop: '5px' }} />
                                    </div>
                                    <Chart id="42" />
                                </div>
                                {/* <LinkTo id="9320" /> */}
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ display: 'flex', marginBottom: "8px" }}>
                                    <Filter id='43' style={{ width: '300px' }} />
                                    <CustomCheckbox id='44' style={{ marginLeft: '30px', paddingTop: '5px' }} />
                                </div>
                                <Table id="45" />
                                {/* <LinkTo id="9320" /> */}
                            </CustomTabPane>
                            <CustomTabPane>
                                <FixedParam id='372' />
                                <CustomSelect id='37' style={{ marginTop: '0px' }} />
                                <Chart id="38" />
                                <Table id="39" />
                                {/* <LinkTo id="9320" /> */}
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab>
            </div >
        );
    }
}

Index.propTypes = {

};

export default Index;