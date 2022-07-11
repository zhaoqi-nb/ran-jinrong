'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import Custom_Date from "@date/config";
import Jump from '@jump/config';
import CompanyTitle from '@title/config';
import UpdateTime from '@updateTime/config';
import { CustomTab, CustomTabPane } from '@tab/config'
import CustomTable from '@table/config';
import Chart from '@chart/config';
import CustomSelect from '@select/config';
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
                <ComponentProps id="7716" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="7717" position="top-outside">
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="7718" />
                            <CustomSelect id="7719" style={{ marginLeft: "24px" }} />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id="7720" />
                            <UpdateTime style={{ marginLeft: '16px' }} id="7721" />
                        </div>
                        <CustomTab id="7722" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <Filter id="7723" style={{ width: '300px' }} />
                                <CustomTable id="7724" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>


                    {/* UGC社区分析 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='8205' />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='8206' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='8207' />
                        </div>
                        <CustomTab id="8208" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <CustomTab id="8209">
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="8210" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="8211" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="8212" style={{ width: '300px' }} />
                                            <Filter id="8213" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="8214" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="8215" style={{ width: '300px' }} />
                                <CustomTable id="8216" />
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6643同行业跳转 */}
                                <CustomSelect id="8217" style={{ marginTop: 0 }} />
                                <Chart id="8218" />
                                <CustomTable id="8219" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/* PGC内容分析 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='8220' />
                            <CustomSelect id="8597" style={{ marginLeft: '24px' }} />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='8221' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='8222' />
                        </div>
                        <CustomTab id="8223" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <CustomTab id="8224">
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="8225" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="8226" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="8227" style={{ width: '300px' }} />
                                            <Filter id="8228" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="8229" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="8230" style={{ width: '300px' }} />
                                <CustomTable id="8231" />
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6643同行业跳转 */}
                                <CustomSelect id="8232" style={{ marginTop: 0 }} />
                                <Chart id="8233" />
                                <CustomTable id="8234" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab>




                <Jump id="7741" />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;