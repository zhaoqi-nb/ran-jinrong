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
                <ComponentProps id="6611" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="6599" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <Custom_Date id='6600' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='6601' />
                            <UpdateTime className="common-margin-left" id='6602' />
                        </div>
                        <CustomTab id="6603" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='6604' style={{ width: '300px' }} />
                                    <Chart id="6605" />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='6606' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='6607' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='6608' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='6609' />
                                <Table id='6610' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/*城市分布  */}
                    <CustomTabPane>
                        <Custom_Date id='7665' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='7666' />
                            <UpdateTime className="common-margin-left" id='7667' />
                        </div>
                        <CustomTab id="7668" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='7675' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='7676' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomTab id="7669">
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper1" : "filter-wrapper1-US"}>
                                            <Filter id='7673' style={{ width: '300px' }} />
                                            <Filter id='7672' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="7674" />
                                    </CustomTabPane>
                                </CustomTab>
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