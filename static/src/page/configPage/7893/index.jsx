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
                <ComponentProps id="7894" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="7895" position="top-outside">
                    {/* 地域分布 */}
                    <CustomTabPane>
                        <Custom_Date id='7897' />
                        <CustomSelect id='7898' style={{ marginLeft: '20px' }} />
                        <div className='company-title-wrapper'>
                            <CompanyTitle id='7900' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='7901' />
                        </div>
                        <CustomTab id="7902" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>

                                <CustomTab id="7903">
                                    {/**结构 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0 }}>
                                            <Filter id='7907' style={{ width: '300px' }} />
                                        </div>
                                        <CustomChart id="7908" />
                                    </CustomTabPane>
                                    {/**趋势 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0 }}>
                                            <Filter id='7904' style={{ width: '300px' }} />
                                            <Filter id='7905' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <CustomChart id="7906" />
                                    </CustomTabPane>

                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='7909' />
                                <CustomTable id="7910" />
                            </CustomTabPane>

                        </CustomTab>

                    </CustomTabPane>



                    {/* 品类分布 */}
                    <CustomTabPane>
                        <Custom_Date id='7911' />
                        <CustomSelect id='7912' style={{ marginLeft: '20px' }} />
                        <div className='company-title-wrapper'>
                            <CompanyTitle id='7914' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='7915' />
                        </div>
                        <CustomTab id="7916" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>

                                <CustomTab id="7917">
                                    {/**结构 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='7921' style={{ width: '300px' }} />
                                        </div>
                                        <CustomChart id="7922" />
                                    </CustomTabPane>
                                    {/**趋势 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='7918' style={{ width: '300px' }} />
                                            <Filter id='7919' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <CustomChart id="7920" />
                                    </CustomTabPane>

                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='7923' />
                                <CustomTable id="7924" />
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