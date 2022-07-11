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
        if (!pageInfo) return null;
        return (
            <div >
                <ComponentProps id="8903" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="8905" position="top-outside">
                    {/**整体概况  */}
                    <CustomTabPane>
                        <Custom_Date id='8906' />
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='8907' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='8908' />
                        </div>
                        <CustomTab id="8909" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8910' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Chart id='8911' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8912' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='8913' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <CustomSelect id="8914" />
                                    <Chart id='8915' />
                                    <Table id='8916' />
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>


                    {/**行业分析*/}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='8917' />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='8918' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='8919' />
                        </div>
                        <CustomTab id="8920" style={{ paddingTop: '8px' }}>
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="8921">
                                    {/**结构分析 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="8922" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="8923" />
                                    </CustomTabPane>
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="8924" style={{ width: '300px' }} />
                                            <Filter id="8925" style={{ width: '330px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="8926" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id="8927" style={{ width: '300px' }} />
                                <Table id="8928" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id="8929" style={{ marginTop: 0 }} />
                                <Chart id="8930" />
                                <Table id="8931" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/**价格区间分析*/}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='8932' />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='8933' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='8934' />
                        </div>
                        <CustomTab id="8935" style={{ paddingTop: '8px' }}>
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="8936">
                                    {/**结构分析 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="8937" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="8938" />
                                    </CustomTabPane>
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="8939" style={{ width: '300px' }} />
                                            <Filter id="8940" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="8941" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id="8942" style={{ width: '300px' }} />
                                <Table id="8943" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id="8944" style={{ marginTop: 0 }} />
                                <Chart id="8945" />
                                <Table id="8946" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab>
                <Jump id='8904' />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;