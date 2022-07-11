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
                <ComponentProps id="6705" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="6693" position="top-outside">
                    <CustomTabPane>
                        <Custom_Date id='6694' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='6695' />
                            <UpdateTime className="common-margin-left" id='6696' />
                        </div>
                        <CustomTab id="6697" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <Filter id='6698' />
                                <CustomChart id="6699" />
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='6700' />
                                <CustomTable id="6701" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id='6702' className="select-margin-top-remove" />
                                <CustomChart id="6703" />
                                <CustomTable id="6704" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    <CustomTabPane>
                        <Custom_Date id='6741' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='6742' />
                            <UpdateTime className="common-margin-left" id='6743' />
                        </div>
                        <CustomTab id="6744" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='6745' />
                                <CustomChart id="6746" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='6747' />
                                <CustomTable id="6748" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='6749' className="select-margin-top-remove" />
                                <CustomChart id="6750" />
                                <CustomTable id="6751" />
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