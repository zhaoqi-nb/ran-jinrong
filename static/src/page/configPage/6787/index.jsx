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
                <ComponentProps id="6800" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="6788" position="top-outside">
                    <CustomTabPane>
                        <Custom_Date id='6789' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='6790' />
                            <UpdateTime className="common-margin-left" id='6791' />
                        </div>
                        <CustomTab id="6792" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <Filter id='6793' />
                                <CustomChart id="6794" />
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='6795' />
                                <CustomTable id="6796" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id='6797' className="select-margin-top-remove" />
                                <CustomChart id="6798" />
                                <CustomTable id="6799" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**城市分布 */}
                    <CustomTabPane>
                        <Custom_Date id='7497' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='7498' />
                            <UpdateTime className="common-margin-left" id='7499' />
                        </div>
                        <CustomTab id="7500" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                {/**趋势分析 */}
                                <CustomTab id="7501">
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'88px':'123px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='7502' />
                                            <Filter id='7503' className="common-margin-left" />
                                        </div>
                                        <CustomChart id="7504" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='7505' />
                                <CustomTable id="7506" />
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