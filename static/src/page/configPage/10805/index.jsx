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
import Explain from '@explain';
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
                <ComponentProps id="10807" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="10808" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <Custom_Date id='10809' select_style={{width: `${i18n.getLocalLanguage()==='zh_CN'?'175px':'280px'}`}} className="common-margin-right"/>
                        <CustomSelect id="10810" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='10811' />
                            <UpdateTime className="common-margin-left" id='10812' />
                        </div>
                        <CustomTab id="10813" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='10814' style={{ width: '300px' }} />
                                    <Chart id="10815" />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='10816' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='10817' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='10818' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='10819' />
                                <Table id='10820' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**城市分布 */}
                    <CustomTabPane>
                        <Custom_Date id='10836' className="common-margin-right" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='10837' />
                            <UpdateTime className="common-margin-left" id='10838' />
                        </div>
                        <CustomTab id="10839" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="10840">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='10841' style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="10842" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='10843' style={{ width: '300px' }} />
                                            <Filter id='10844' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="10845" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='10846' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='10847' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='10848' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='10849' />
                                <Table id='10850' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                     {/**门店留存 */}
                     <CustomTabPane>
                         <Explain id='10866' />
                        <Custom_Date id='10867' className="common-margin-right" />
                        <CustomSelect id="10868" className="common-margin-right"/> 
                        <CustomSelect id="10869" /> 
                        <CustomSelect id="10870" /> 
                        <div className="company-title-wrapper">
                            <CompanyTitle id='10871' />
                            <UpdateTime className="common-margin-left" id='10872' />
                        </div>
                        <CustomTab id="10873" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='10874' style={{ width: "300px", marginBottom: "10px" }} />
                                <Chart id='10875' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='10876' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='10877' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='10878' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='10879' />
                                <Table id='10880' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**新增/流失门店 */}
                    <CustomTabPane>
                        <Custom_Date id='10908' className="common-margin-right" />
                        <CustomSelect id="10909" /> 
              
                        <div className="company-title-wrapper">
                            <CompanyTitle id='10910' />
                            <UpdateTime className="common-margin-left" id='10911' />
                        </div>
                        <CustomTab id="10912" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='10913' style={{ width: "300px", marginBottom: "10px" }} />
                                <Chart id='10914' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='10915' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='10916' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='10917' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='10918' />
                                <Table id='10919' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab>
            </div >
        );
    }
}

Index.propTypes = {

};

export default Index;