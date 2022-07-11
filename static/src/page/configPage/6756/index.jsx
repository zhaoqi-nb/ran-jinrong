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
                <ComponentProps id="6769" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="6757" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <Custom_Date id='6758' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='6759' />
                            <UpdateTime className="common-margin-left" id='6760' />
                        </div>
                        <CustomTab id="6761" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='6762' style={{ width: '300px' }} />
                                    <Chart id="6763" />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='6764' style={{ width: "300px"}} />
                                    <Table id='6765' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='6927' className="select-margin-top-remove" select_style={{ width: '230px' }} />
                                <Chart id='6767' />
                                <Table id='6768' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**城市分布 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='6984' />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='6985' />
                            <UpdateTime className="common-margin-left" id='6986' />
                        </div>
                        <CustomTab id="6987" className="tab-padding-top">
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id="6994" style={{ width: '300px' }} />
                                <Table id="6995" />
                            </CustomTabPane>
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="6988">
                                    {/**结构分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage()=="zh_CN"?"filter-wrapper2":"filter-wrapper2-US"}>
                                            <Filter id="6989" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="6990" />
                                    </CustomTabPane>
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage()=="zh_CN"?"filter-wrapper2":"filter-wrapper2-US"}>
                                            <Filter id="6991" style={{ width: '300px' }} />
                                            <Filter id="6992" style={{ width: '300px' }} className="common-margin-left" />
                                        </div>
                                        <Chart id="6993" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id="6996" className="select-margin-top-remove" />
                                <Chart id="6997" />
                                <Table id="6998" />
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