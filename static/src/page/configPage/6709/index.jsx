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
                <ComponentProps id="6722" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="6710" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <Custom_Date id='6711' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='6712' />
                            <UpdateTime className="common-margin-left" id='6713' />
                        </div>
                        <CustomTab id="6714" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='6715' style={{ width: '300px' }} />
                                    <Chart id="6716" />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='6717' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='6718' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='6719' className="select-margin-top-remove" select_style={{ width: '230px' }} />
                                <Chart id='6720' />
                                <Table id='6721' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**行业分布 */}
                    <CustomTabPane>
                        <Custom_Date id='7085' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='7086' />
                            <UpdateTime className="common-margin-left" id='7087' />
                        </div>
                        <CustomTab id="7088" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="7094">
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper1" : "filter-wrapper1-US"}>
                                            <Filter id='7090' style={{ width: '300px' }} />
                                            <Filter id='7089' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="7091" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='7092' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='7093' />
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**价格区间分布 */}
                    <CustomTabPane>
                        <Custom_Date id='7144' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='7145' />
                            <UpdateTime className="common-margin-left" id='7146' />
                        </div>
                        <CustomTab id="7147" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="7151">
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper1" : "filter-wrapper1-US"}>
                                            <Filter id='7149' style={{ width: '300px' }} />
                                            <Filter id='7148' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="7150" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='7152' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='7153' />
                                </div>
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