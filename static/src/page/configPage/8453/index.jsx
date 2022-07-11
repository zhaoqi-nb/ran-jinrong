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
                <ComponentProps id="8454" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="8455" position="top-outside">
                    {/**整体概览 */}
                    <CustomTabPane>
                        <Custom_Date id='8457' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8458' />
                            <UpdateTime className="common-margin-left" id='8459' />
                        </div>
                        <CustomTab id="8460" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='8461' style={{ width: "300px" }} />
                                <Chart id='8462' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='8463' style={{ width: "300px" }} />
                                <Table id='8464' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='8465' className="select-margin-top-remove"  />
                                <Chart id='8466' />
                                <Table id='8467' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**主播数量分析 */}
                    <CustomTabPane>
                        <Custom_Date id='9235'  className="common-margin-right"/>
                        <CustomSelect id='9236'/>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='9237' />
                            <UpdateTime className="common-margin-left" id='9238' />
                        </div>
                        <CustomTab id="9239" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="9240">
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage()=="zh_CN"?"filter-wrapper1":"filter-wrapper1-US"}>
                                            <Filter id="9241" style={{ width: '300px' }} />
                                            <Filter id="9242" style={{ width: '300px' }}  className="common-margin-left" />
                                        </div>
                                        <Chart id='9243' />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='9244' style={{ width: "300px" }} />
                                <Table id='9245' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**主播收入分析 */}
                    <CustomTabPane>
                        <Custom_Date id='9246' />
                        <div  className="company-title-wrapper">
                            <CompanyTitle id='9247' />
                            <UpdateTime className="common-margin-left" id='9248' />
                        </div>
                        <CustomTab id="9249" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="9250">
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage()=="zh_CN"?"filter-wrapper1":"filter-wrapper1-US"}>
                                            <Filter id="9251" style={{ width: '300px' }} />
                                            <Filter id="9252" style={{ width: '300px' }} className="common-margin-left" />
                                        </div>
                                        <Chart id='9253' />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='9254' style={{ width: "300px" }} />
                                <Table id='9255' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab>
                <Jump id='8456' />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;