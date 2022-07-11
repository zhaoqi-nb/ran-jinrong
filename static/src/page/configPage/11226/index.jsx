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
        // return Object.assign({}, params, { brand_name });
        const { brand_name, brand_id } = record
        return Object.assign({}, params, { brand_name, brand_id });
    }

    getComponentProps = (pageInfo) => {
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo, brand_name: "太二酸菜鱼" }
    }
    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;;
        return (
            <div >
                <ComponentProps id="11228" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="11229" position="top-outside">
                    {/**门店市占率*/}
                    <CustomTabPane>
                        <Custom_Date id='11230' select_style={{ width: `${i18n.getLocalLanguage() === 'zh_CN' ? '175px' : '280px'}` }} className="common-margin-right" />
                        <CustomSelect id="11231" />
                        <CustomSelect id="11232" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='11233' />
                            <UpdateTime className="common-margin-left" id='11234' />
                        </div>
                        <CustomTab id="11235" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='11236' style={{ width: '300px' }} />
                                <Table id='11237' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**品类竞争格局 */}
                    <CustomTabPane>
                        <Custom_Date id='11238' className="common-margin-right" />
                        <CustomSelect id="11239" className="common-margin-right" />
                        <CustomSelect id="11240" />
                        <CustomSelect id="11241" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='11242' />
                            <UpdateTime className="common-margin-left" id='11243' />
                        </div>
                        <CustomTab id="11244" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='11245' style={{ width: "300px" }} />
                                <Table id='11246' />
                                <DrawerChart id='11247' />
                                <Table id='11248' />
                                <DrawerChart id='11249' paramRender={this.paramRender} />
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