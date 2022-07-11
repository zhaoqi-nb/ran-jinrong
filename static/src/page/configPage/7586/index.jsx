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
    getComponentProps = (pageInfo) => {
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo }
    }
    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;;
        return (
            <div >
                <ComponentProps id="7602" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <Custom_Date id='7587' />
                <div className="company-title-wrapper">
                    <CompanyTitle id='7588' />
                    <UpdateTime className="common-margin-left" id='7589' />
                </div>
                <CustomTab id="7590" className="tab-padding-top">
                    <CustomTabPane>
                        <div style={{ minHeight: '500px' }}>
                            <Filter id='7597' style={{ width: "300px", marginBottom: "10px" }} />
                            <Table id='7598' />
                        </div>
                    </CustomTabPane>
                    <CustomTabPane>
                        <CustomTab id="7591">
                            <CustomTabPane>
                                {/* 结构 */}
                                <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                    <Filter id='7592' style={{ width: '300px' }} />
                                </div>
                                <Chart id="7593" />
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 趋势 */}
                                <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                    <Filter id='7594' style={{ width: '300px' }} />
                                    <Filter id='7595' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                </div>
                                <Chart id="7596" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                   
                    <CustomTabPane>
                        <CustomSelect id='7599' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                        <Chart id='7600' />
                        <Table id='7601' />
                    </CustomTabPane>
                </CustomTab>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;