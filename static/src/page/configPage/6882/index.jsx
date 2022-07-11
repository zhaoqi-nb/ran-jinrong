'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import Custom_Date from "@date/config";
import CustomSelect from '@select/config';
import CompanyTitle from '@title/config';
import UpdateTime from '@updateTime/config';
import { CustomTab, CustomTabPane } from '@tab/config'
import CustomTable from '@table/config';
import CustomChart from '@chart/config';

import ComponentProps from '@componentProps/config';
import Filter from '@filter/config';

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
            this.setState({ pageInfo, resAttr: JSON.parse(resAttr) });
        }
    }

    getComponentProps = (pageInfo) => {
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo }
    }

    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;

        return (
            <div>
                <ComponentProps id="6895" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="6883" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <Custom_Date id='6884' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='6885' />
                            <UpdateTime className="common-margin-left" id='6886' />
                        </div>
                        <CustomTab id="6887" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <Filter id='6888' />
                                <CustomChart id="6889" />
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='6890' />
                                <CustomTable id="6891" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id='6892' className="select-margin-top-remove" />
                                <CustomChart id="6893" />
                                <CustomTable id="6894" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**地域分布 */}
                    <CustomTabPane>
                        <Custom_Date id='8884' className="common-margin-right" />
                        <CustomSelect id='8900' className="common-margin-right" />
                        <CustomSelect id='8899' className="common-margin-right" />
                        <CustomSelect id='8901' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8885' />
                            <UpdateTime className="common-margin-left" id='8886' />
                        </div>
                        <CustomTab id="8887" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="8888">
                                    {/**结构分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage()=="zh_CN"?"filter-wrapper2":"filter-wrapper2-US"}>
                                            <Filter id='8889' />
                                        </div>
                                        <CustomChart id="8890" />
                                    </CustomTabPane>
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage()=="zh_CN"?"filter-wrapper2":"filter-wrapper2-US"}>
                                            <Filter id='8891' style={{ width: '300px' }} />
                                            <Filter id='8892' style={{ width: '300px' }} className="common-margin-left" />
                                        </div>
                                        <CustomChart id="8893" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='8894' />
                                <CustomTable id="8895" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id='8896' className="select-margin-top-remove" />
                                <CustomChart id="8897" />
                                <CustomTable id="8898" />
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