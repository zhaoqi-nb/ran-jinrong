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
        if (menu && menu.pageInfo) {
            let pageInfo = menu.pageInfo,
                resAttr = pageInfo.resAttr,
                privilegeDtoList = pageInfo.privilegeDtoList;
            this.setState({ pageInfo, resAttr: JSON.parse(resAttr) });
        }
    }

    getComponentProps = (pageInfo) => {
        return {...JSON.parse(pageInfo.resAttr), ...pageInfo}
    }

    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;
        return (
            <div>
                <ComponentProps id="9766" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="9768" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='9769' select_style={{width: `${i18n.getLocalLanguage()==='zh_CN'?'175px':'280px'}`}}/>
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='9770' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='9771'/>
                        </div>
                        <CustomTab id="9772" style={{paddingTop: '8px'}}>
                            <CustomTabPane>
                                <Filter id="9773" style={{width:'300px'}}/>
                                <CustomChart id="9774"/>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="9775" style={{width:'300px'}}/>
                                <CustomTable id="9776"/>
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6817同行业跳转 */}
                                <CustomSelect id="9777" style={{marginTop: 0}}/>
                                <CustomChart id="9778"/>
                                <CustomTable id="9779"/>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/* 行业分布 */}
                    <CustomTabPane>
                        <Custom_Date id='9830' className="common-margin-right" />
                        <CustomSelect id='9831' />
                        <div style={{ display: "flex", borderBottom: "1px solid #E1E8F0", marginTop: 8, justifyContent: "space-between" }}>
                            <div className="company-title-wrapper" style={{ border: 'none', margin: 0 }}>
                                <CompanyTitle id='9832' />
                                <UpdateTime className="common-margin-left" id='9833' />
                            </div>
                        </div>
                        <CustomTab id="9834" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>

                                <CustomTab id="9835">
                                    {/**结构 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='9836' style={{ width: '300px' }} />
                                        </div>
                                        <CustomChart id="9837" />
                                    </CustomTabPane>
                                    {/**趋势 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='9838' style={{ width: '400px' }} />
                                            <Filter id='9839' style={{ width: '300px' }} className="common-margin-left" />
                                        </div>
                                        <CustomChart id="9840" />
                                    </CustomTabPane>

                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='9841' style={{ width: '300px' }} />
                                <CustomTable id="9842" />
                            </CustomTabPane>

                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id='9843' style={{ width: '300px' }} />
                                <CustomChart id="9844" />
                                <CustomTable id="9845" />
                            </CustomTabPane>

                        </CustomTab>

                    </CustomTabPane>


                    {/* 价格区间分布 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='9846' />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='9847' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='9848' />
                        </div>
                        <CustomTab id="9849" style={{paddingTop: '8px'}}>
                            <CustomTabPane>
                                <CustomTab id="9850">
                                    <CustomTabPane>
                                        <div style={{position:'relative',left:`${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`,zIndex:'10', top:'-32px', height:0}}>
                                            <Filter id="9851" style={{width:'7472'}}/>
                                        </div>
                                        <CustomChart id="9852"/>
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div style={{position:'relative',left:`${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`,zIndex:'10', top:'-32px', height:0, display:'flex'}}>
                                            <Filter id="9853" style={{width:'300px'}}/>
                                            <Filter id="9854" style={{width:'300px'}} style_btn={{marginLeft:'16px'}}/>
                                        </div>
                                        <CustomChart id="9855"/>
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="9856" style={{width:'300px'}}/>
                                <CustomTable id="9857"/>
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6643同行业跳转 */}
                                <CustomSelect id="9858" style={{marginTop: 0}}/>
                                <CustomChart id="9859"/>
                                <CustomTable id="9860"/>
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