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
import Filter from '@filter/config';
import ComponentProps from '@componentProps/config';

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
                <ComponentProps id="11427" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="11428" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='11429' select_style={{ width: `${i18n.getLocalLanguage() === 'zh_CN' ? '175px' : '280px'}` }} />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='11430' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='11431' />
                        </div>
                        <CustomTab id="11432" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <Filter id="11433" style={{ width: '300px' }} />
                                <CustomChart id="11434" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="11435" style={{ width: '300px' }} />
                                <CustomTable id="11436" />
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6817同行业跳转 */}
                                <CustomSelect id="11437" style={{ marginTop: 0 }} />
                                <CustomChart id="11438" />
                                <CustomTable id="11439" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/* 城市级别分布 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='11440' />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='11441' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='11442' />
                        </div>
                        <CustomTab id="11443" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <CustomSelect id="11444" style={{ marginTop: 0 }} />
                                <Filter id="11445" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                <CustomChart id="11446" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="11447" style={{ width: '300px' }} />
                                <CustomTable id="11448" />
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