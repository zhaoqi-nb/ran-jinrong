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
                <ComponentProps id="7776" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="7777" position="top-outside">
                    {/* 整体概况 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="8237" />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id="8238" />
                            <UpdateTime style={{ marginLeft: '16px' }} id="8239" />
                        </div>
                        <CustomTab id="8240" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <Filter id="8241" style={{ width: '300px' }} />
                                <Chart id="8242" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="8243" style={{ width: '300px' }} />
                                <CustomTable id="8244" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id="8245" style={{ marginTop: 0 }} />
                                <Chart id="8246" />
                                <CustomTable id="8247" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                   
                    {/* 主播数量分析 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="8682" style={{ marginRight:'16px'}}/>
                            <div style={{display:'inline-block'}}>
                                <CustomSelect id="8694" style={{ marginTop: 0, marginRight:'16px' }} />
                                <CustomSelect id="8695" style={{ marginTop: 0, marginRight:'16px' }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id="8683" />
                            <UpdateTime style={{ marginLeft: '16px' }} id="8684" />
                        </div>
                        <CustomTab id="8685" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <CustomTab id="8686">
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='9735' style={{ width: "300px" }} />
                                        </div>
                                        <Chart id="9736" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='8689' style={{ width: "300px" }} />
                                            <Filter id='8690' style={{ width: "300px" }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="8691" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="8692" style={{ width: '300px' }} />
                                <CustomTable id="8693" />
                            </CustomTabPane>

                            <CustomTabPane>
                                <CustomSelect id="9737" style={{ marginTop: 0 }} />
                                <Chart id="9738" />
                                <CustomTable id="9739" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>


                    {/* 主播收入分析 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="8697" style={{ marginRight:'16px'}}/>
                            <div style={{display:'inline-block'}}>
                                <CustomSelect id="8709" style={{ marginTop: 0, marginRight:'16px' }} />
                                <CustomSelect id="8710" style={{ marginTop: 0, marginRight:'16px' }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id="8698" />
                            <UpdateTime style={{ marginLeft: '16px' }} id="8699" />
                        </div>
                        <CustomTab id="8700" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <CustomTab id="8701">
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='8711' style={{ width: "300px" }} />
                                        </div>
                                        <Chart id="9727" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='8704' style={{ width: "300px" }} />
                                            <Filter id='8705' style={{ width: "300px" }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="8706" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="8707" style={{ width: '300px' }} />
                                <CustomTable id="8708" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id="9728" style={{ marginTop: 0 }} />
                                <Chart id="9729" />
                                <CustomTable id="9730" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                     {/* 主播榜单 */}
                     <CustomTabPane>
                        <div>
                            <Custom_Date id="7778" />
                            <CustomSelect id="7779" style={{ marginLeft: "24px" }} />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id="7780" />
                            <UpdateTime style={{ marginLeft: '16px' }} id="7781" />
                        </div>
                        <CustomTab id="7782" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <Filter id="7783" style={{ width: '300px' }} />
                                <CustomTable id="7784" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>



                </CustomTab>



                <Jump id="7785" />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;