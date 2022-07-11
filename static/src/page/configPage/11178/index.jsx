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
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo, brand_name: "凑凑" }
    }
    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;;
        return (
            <div >
                <ComponentProps id="11180" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="11181" position="top-outside">
                    {/**门店市占率*/}
                    <CustomTabPane>
                        <Custom_Date id='11182' select_style={{ width: `${i18n.getLocalLanguage() === 'zh_CN' ? '175px' : '280px'}` }} className="common-margin-right" />
                        <CustomSelect id="11183" />
                        <CustomSelect id="11184" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='11185' />
                            <UpdateTime className="common-margin-left" id='11186' />
                        </div>
                        <CustomTab id="11187" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='11188' style={{ width: '300px' }} />
                                <Table id='11189' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**品类竞争格局 */}
                    <CustomTabPane>
                        <Custom_Date id='11190' className="common-margin-right" />
                        <CustomSelect id="11191" className="common-margin-right" />
                        <CustomSelect id="11192" />
                        <CustomSelect id="11193" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='11194' />
                            <UpdateTime className="common-margin-left" id='11195' />
                        </div>
                        <CustomTab id="11196" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='11197' style={{ width: "300px" }} />
                                <Table id='11198' />
                                <DrawerChart id='11199' />
                                <Table id='11200' />
                                <DrawerChart id='11201' paramRender={this.paramRender} />
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