'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import { CustomTab, CustomTabPane } from '@tab/config';
import Custom_Date from "@date/config";
import CustomSelect from '@select/config';
import CompanyTitle from '@title/config';
import UpdateTime from '@updateTime/config';
import Filter from '@filter/config';
import CustomCheckbox from '@checkbox/config';
import ComponentProps from '@componentProps/config';
import Chart from '@chart/config';
import Table from '@table/config';
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
    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;;
        return (
            <div >
                <ComponentProps id="8503" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="8505" position="top-outside">
                    {/**音频内容分析*/}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='9464' />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='9465' />
                            <UpdateTime className="common-margin-left" id='9466' />
                        </div>
                        <CustomTab id="9467" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <Filter id="9468" style={{ width: '300px' }} />
                                <Chart id="9469" />
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id="9470" style={{ width: '300px' }} />
                                <Table id="9471" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id="9472" className="select-margin-top-remove" />
                                <Chart id="9473" />
                                <Table id="9474" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>


                    {/**音频内容分析*/}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='8506' />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8507' />
                            <UpdateTime className="common-margin-left" id='8508' />
                        </div>
                        <CustomTab id="8509" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="8510">
                                    {/**结构分析 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="8511" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="8512" />
                                    </CustomTabPane>
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="8513" style={{ width: '300px' }} />
                                            <Filter id="8514" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="8515" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id="8516" style={{ width: '300px' }} />
                                <Table id="8517" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id="8518" className="select-margin-top-remove" />
                                <Chart id="8519" />
                                <Table id="8520" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab>
                <Jump id='8504' />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;