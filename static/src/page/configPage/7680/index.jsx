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
                <ComponentProps id="7697" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="7681" position="top-outside">
                    {/**城市级别分布  */}
                    <CustomTabPane>
                        <Custom_Date id='7682' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='7683' />
                            <UpdateTime className="common-margin-left" id='7684' />
                        </div>
                        <CustomTab id="7685" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='7692' style={{ width: "300px" }} />
                                    <Table id='7693' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomTab id="7686">
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage()=="zh_CN"?"filter-wrapper1":"filter-wrapper1-US"}>
                                            <Filter id='7689' style={{ width: '300px' }} />
                                            <Filter id='7690' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="7691" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**重点城市分布 */}
                    <CustomTabPane>
                        <Custom_Date id='7699' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='7700' />
                            <UpdateTime className="common-margin-left" id='7701' />
                        </div>
                        <CustomTab id="7702" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='7709' style={{ width: "300px" }} />
                                    <Table id='7710' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomTab id="7703">
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage()=="zh_CN"?"filter-wrapper1":"filter-wrapper1-US"}>
                                            <Filter id='7714' style={{ width: '300px' }} />
                                            <Filter id='7706' style={{ width: '300px' }} className="common-margin-left" />
                                        </div>
                                        <Chart id="7708" />
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