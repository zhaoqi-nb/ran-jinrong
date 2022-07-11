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
                <ComponentProps id="8330" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="8331" position="top-outside">
                    {/* 整体概况 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="8332" />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id="8333" />
                            <UpdateTime style={{ marginLeft: '16px' }} id="8334" />
                        </div>
                        <CustomTab id="8335" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <Filter id="8336" style={{ width: '300px' }} />
                                <Chart id="8337" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="8338" style={{ width: '300px' }} />
                                <CustomTable id="8339" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id="8340" style={{ marginTop: 0 }} />
                                <Chart id="8341" />
                                <CustomTable id="8342" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/* 音频内容分析 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="8645" />
                            <CustomSelect id="9503" style={{ marginLeft: 20 }} />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id="8646" />
                            <UpdateTime style={{ marginLeft: '16px' }} id="8662" />
                        </div>
                        <CustomTab id="8663" style={{ paddingTop: '8px' }}>
                            {/* 图形 */}
                            <CustomTabPane>
                                <CustomTab id="8778">
                                    {/* 结构分析 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="8779" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="8780" />
                                    </CustomTabPane>
                                    {/* 趋势分析 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="8781" style={{ width: '300px' }} />
                                            <Filter id="8782" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="8783" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/* 表格 */}
                            <CustomTabPane>
                                <Filter id="8784" style={{ width: '300px' }} />
                                <CustomTable id="8785" />
                            </CustomTabPane>
                            {/* 图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id="9077" style={{ marginTop: 0 }} />
                                <Chart id="9078" />
                                <CustomTable id="9079" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    
                    {/* 内容创作者分析 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='9098' />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='9099' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='9424'/>
                        </div>
                        <CustomTab id="9425" style={{paddingTop: '8px'}}>
                            <CustomTabPane>
                                <Filter id="9427" style={{width:'300px'}}/>
                                <Chart id="9428"/>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="9432" style={{width:'300px'}}/>
                                <CustomTable id="9433"/>
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6817同行业跳转 */}
                                <CustomSelect id="9434" style={{marginTop: 0}}/>
                                <Chart id="9435"/>
                                <CustomTable id="9436"/>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/* 播客分析 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="9083" />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id="9084" />
                            <UpdateTime style={{ marginLeft: '16px' }} id="9085" />
                        </div>
                        <CustomTab id="9086" style={{ paddingTop: '8px' }}>
                            {/* 图形 */}
                            <CustomTabPane>
                                <CustomTab id="9087">
                                    {/* 结构分析 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="9088" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="9089" />

                                    </CustomTabPane>
                                    {/* 趋势分析 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="9090" style={{ width: '300px' }} />
                                            <Filter id="9091" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="9092" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/* 表格 */}
                            <CustomTabPane>
                                <Filter id="9093" style={{ width: '300px' }} />
                                <CustomTable id="9094" />
                            </CustomTabPane>
                            {/* 图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id="9095" style={{ marginTop: 0 }} />
                                <Chart id="9096" />
                                <CustomTable id="9097" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab >
                <Jump id="8343" />
            </div >
        );
    }
}

Index.propTypes = {

};

export default Index;