'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import Custom_Date from "@date/config";
import Jump from '@jump/config';
import CompanyTitle from '@title/config';
import UpdateTime from '@updateTime/config';
import { CustomTab, CustomTabPane } from '@tab/config'
import Table from '@table/config';
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
                <ComponentProps id="7787" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="7789" position="top-outside">
                    {/* 整体概况 */}
                    <CustomTabPane>
                        <Custom_Date id="8281" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id="8282" />
                            <UpdateTime className="common-margin-left" id="8283" />
                        </div>
                        <CustomTab id="8284" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id="8285" style={{ width: '300px' }} />
                                <Chart id="8286" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="8287" style={{ width: '300px' }} />
                                <Table id="8288" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id="8289" className="select-margin-top-remove" />
                                <Chart id="8290" />
                                <Table id="8291" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**视频数量分析*/}
                    <CustomTabPane>
                        <Custom_Date id='8521' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8522' />
                            <UpdateTime className="common-margin-left" id='8523' />
                        </div>
                        <CustomTab id="8524" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="8525">
                                    {/**结构分析 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="8526" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="8527" />
                                    </CustomTabPane>
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="8528" style={{ width: '300px' }} />
                                            <Filter id="8529" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="8530" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id="8531" style={{ width: '300px' }} />
                                <Table id="8532" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id="8533" className="select-margin-top-remove" />
                                <Chart id="8534" />
                                <Table id="8535" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**视频热度分析*/}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='8536' />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8537' />
                            <UpdateTime className="common-margin-left" id='8538' />
                        </div>
                        <CustomTab id="8539" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="8540">
                                    {/**结构分析 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="8541" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="8542" />
                                    </CustomTabPane>
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="8543" style={{ width: '300px' }} />
                                            <Filter id="8544" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="8545" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id="8546" style={{ width: '300px' }} />
                                <Table id="8547" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id="8548" className="select-margin-top-remove" />
                                <Chart id="8549" />
                                <Table id="8550" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**节目榜单 */}
                    <CustomTabPane>
                        
                        <Custom_Date id="7790" className="common-margin-right"/>
                        <CustomSelect id="7791" className="common-margin-right"/>
                        <div style={{ display: 'inline-block' }}>
                            <CustomSelect id="7792" className="common-margin-right" />
                            <CustomSelect id="8018" className="common-margin-right"/>
                            <CustomSelect id="8019"/>
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id="7793" />
                            <UpdateTime className="common-margin-left" id="7794" />
                        </div>
                        <CustomTab id="7795" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id="7796" style={{ width: '300px' }} />
                                <Table id="7797" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab>

                <Jump id="7788" />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;