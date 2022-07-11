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
                <ComponentProps id="7419" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <Custom_Date id='7420' />
                <div className="company-title-wrapper">
                    <CompanyTitle id='7421' />
                    <UpdateTime className="common-margin-left" id='7422' />
                </div>
                <CustomTab id="7423" className="tab-padding-top">
                    <CustomTabPane>
                        <Filter id='7428' style={{ width: "300px"}}/>
                        <Table id='7429' />
                    </CustomTabPane>
                    <CustomTabPane>
                        <CustomTab id="7424">
                            <CustomTabPane>
                                {/* 趋势 */}
                                <div className={this.props.i18n.getLocalLanguage()=="zh_CN"?"filter-wrapper1":"filter-wrapper1-US"}>
                                    <Filter id='7425' style={{ width: '300px' }} />
                                    <Filter id='7426' style={{ width: '300px' }} className="common-margin-left" />
                                </div>
                                <Chart id="7427" />
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