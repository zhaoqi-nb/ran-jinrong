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
import Jump from '@jump/config';

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
    paramRender = (params, record) => {
        let brand_id = record.brand_id,
            shop_dimension = record.shop_dimension;
        return Object.assign({}, params, { brand_id, shop_dimension });
    }
    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;;
        return (
            <div >
                <ComponentProps id="8473" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="8474" position="top-outside">
                    {/**整体概览 */}
                    <CustomTabPane>
                        <Custom_Date id='8476' />
                        <div  className="company-title-wrapper">
                            <CompanyTitle id='8477' />
                            <UpdateTime className="common-margin-left" id='8478' />
                        </div>
                        <CustomTab id="8479" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='8480' style={{ width: "300px" }} />
                                <Chart id='8481' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='8482' style={{ width: "300px" }} />
                                <Table id='8483' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='8484' className="select-margin-top-remove" />
                                <Chart id='8485' />
                                <Table id='8486' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**主播数量分析 */}
                    <CustomTabPane>
                        <Custom_Date id='9256' className="common-margin-right"/>
                        <CustomSelect id='9257' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='9258' />
                            <UpdateTime className="common-margin-left" id='9259' />
                        </div>
                        <CustomTab id="9260" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="9261">
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage()=="zh_CN"?"filter-wrapper1":"filter-wrapper1-US"}>
                                            <Filter id="9262" style={{ width: '300px' }} />
                                            <Filter id="9263" style={{ width: '300px' }}  className="common-margin-left"/>
                                        </div>
                                        <Chart id='9264' />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='9265' style={{ width: "300px" }} />
                                <Table id='9266' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**主播收入分析 */}
                    <CustomTabPane>
                        <Custom_Date id='9267' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='9268' />
                            <UpdateTime className="common-margin-left" id='9269' />
                        </div>
                        <CustomTab id="9270" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="9271">
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage()=="zh_CN"?"filter-wrapper1":"filter-wrapper1-US"}>
                                            <Filter id="9272" style={{ width: '300px' }} />
                                            <Filter id="9273" style={{ width: '300px' }} className="common-margin-left" />
                                        </div>
                                        <Chart id='9274' />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='9275' style={{ width: "300px" }} />
                                <Table id='9276' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab>
                <Jump id='8475' />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;