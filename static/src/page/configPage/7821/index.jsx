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
import CustomChart from '@chart/config';
import CustomSelect from '@select/config';
import Filter from '@filter/config';
import ComponentProps from '@componentProps/config';
import Chart from '@chart/config'

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
                <ComponentProps id="7822" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="7824" position="top-outside">
                    {/* 整体概况 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="8307" />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id="8308" />
                            <UpdateTime className="common-margin-left" id="8309" />
                        </div>
                        <CustomTab id="8310" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id="8311" style={{ width: '300px' }} />
                                <Chart id="8312" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="8313" style={{ width: '300px' }} />
                                <CustomTable id="8314" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id="8315" className="select-margin-top-remove"/>
                                <Chart id="8316" />
                                <CustomTable id="8317" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/* 视频数量分析 */}
                    <CustomTabPane>
                        <Custom_Date id="8754" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8755' />
                            <UpdateTime className="common-margin-left" id='8756' />
                        </div>
                        <CustomTab id="8757" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="8758">
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="8759" style={{ width: '300px' }} />
                                        </div>
                                        <CustomChart id="8760" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="8761" style={{ width: '300px' }} />
                                            <Filter id="8762" style={{ width: '300px' }} className="common-margin-left" />
                                        </div>
                                        <CustomChart id="8772" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="8773" style={{ width: '300px' }} />
                                <CustomTable id="8774" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id="8775" className="select-margin-top-remove" />
                                <CustomChart id="8776" />
                                <CustomTable id="8777" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/* 视频热度分析 */}
                    <CustomTabPane>
                        <Custom_Date id="9041" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='9042' />
                            <UpdateTime className="common-margin-left" id='9043' />
                        </div>
                        <CustomTab id="9055" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="9044">
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="9045" style={{ width: '300px' }} />
                                        </div>
                                        <CustomChart id="9046" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="9047" style={{ width: '300px' }} />
                                            <Filter id="9048" style={{ width: '300px' }} className="common-margin-left" />
                                        </div>
                                        <CustomChart id="9049" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="9050" style={{ width: '300px' }} />
                                <CustomTable id="9051" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id="9052" className="select-margin-top-remove"/>
                                <CustomChart id="9053" />
                                <CustomTable id="9054" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**节目榜单 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="7825" className="common-margin-right"/>
                            <CustomSelect id="7826" className="common-margin-right"/>
                            <CustomSelect id="7827"  />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id="7828" />
                            <UpdateTime className="common-margin-left" id="7829" />
                        </div>
                        <CustomTab id="7830" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id="7831" style={{ width: '300px' }} />
                                <CustomTable id="7832" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab>

                <Jump id="7823" />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;