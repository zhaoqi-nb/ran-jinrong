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
import Chart from '@chart/config'
import Table from '@table/config';
import DrawerChart from '@drawerChart/config';
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

            this.setState({ pageInfo, resAttr });
        }
    }

    paramRender = (params, record) => {
        // let brand_name = record.brand_name;
        const { brand_name, brand_id } = record
        return Object.assign({}, params, { brand_name, brand_id });
    }

    getComponentProps = (pageInfo) => {
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo, brand_name: "helens海伦司" }
    }
    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;
        return (
            <div >
                <ComponentProps id="11204" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="11205" position="top-outside">
                    {/**门店市占率*/}
                    <CustomTabPane>
                        <Custom_Date id='11206' select_style={{ width: `${i18n.getLocalLanguage() === 'zh_CN' ? '175px' : '280px'}` }} className="common-margin-right" />
                        <CustomSelect id="11207" />
                        <CustomSelect id="11208" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='11209' />
                            <UpdateTime className="common-margin-left" id='11210' />
                        </div>
                        <CustomTab id="11211" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='11212' style={{ width: '300px' }} />
                                <Table id='11213' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**品类竞争格局 */}
                    <CustomTabPane>
                        <Custom_Date id='11214' className="common-margin-right" />
                        <CustomSelect id="11215" className="common-margin-right" />
                        <CustomSelect id="11216" />
                        <CustomSelect id="11217" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='11218' />
                            <UpdateTime className="common-margin-left" id='11219' />
                        </div>
                        <CustomTab id="11220" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='11221' style={{ width: "300px" }} />
                                <Table id='11222' />
                                <DrawerChart id='11223' />
                                <Table id='11224' />
                                <DrawerChart id='11225' paramRender={this.paramRender} />
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