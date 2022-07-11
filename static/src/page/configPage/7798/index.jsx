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
                <ComponentProps id="7800" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="7799" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <Custom_Date id='8816' />
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='8817' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='8818' />
                        </div>
                        <CustomTab id="8819" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8820' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Chart id='8821' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8822' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='8823' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <CustomSelect id="8824" style={{ marginTop: 0 }} />
                                    <Chart id='8825' />
                                    <Table id='8826' />
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/**游戏分析 */}
                    <CustomTabPane>
                        <Custom_Date id='9618' />
                        <div className='company-title-wrapper'>
                            <CompanyTitle id='9619' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='9620' />
                        </div>
                        <CustomTab id="9621" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomSelect id='9622' select_style={{ width: '200px' }} style={{ marginTop: 0 }} />
                                <Filter id='9623' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                <Chart id='9624' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='9625' style={{ width: '300px' }} />
                                <Table id='9626' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>


                    {/**游戏厂商分析  */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='9564' style={{marginRight:'24px'}}/>
                            <CustomSelect id='9573' style={{marginRight:'24px'}}/>
                            <CustomSelect id='9574'/>
                        </div>
                        
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='9565' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='9566' />
                        </div>
                        <CustomTab id="9567" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <CustomSelect id='9568' select_style={{ width: '200px' }} style={{ marginTop: 0 }} />
                                <Filter id='9569' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                <Chart id='9570' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='9571' style={{ width: '300px' }} />
                                <Table id='9572' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/* <CustomTabPane>
                        <Custom_Date id='8551' />
                        <CustomSelect id='8770' style={{ marginLeft: 25 }} />
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='8552' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='8553' />
                        </div>
                        <CustomTab id="8554" style={{ paddingTop: '8px' }}>
                            <CustomTab id="8555">
                                <CustomTabPane>
                                    <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                        <Filter id='8556' style={{ width: "300px" }} />
                                    </div>
                                    <Chart id='8557' />
                                </CustomTabPane>
                                <CustomTabPane>
                                    <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                        <Filter id="8558" style={{ width: '300px' }} />
                                        <Filter id="8559" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                    </div>
                                    <Chart id='8560' />
                                </CustomTabPane>
                            </CustomTab>
                            <CustomTabPane>
                                <Filter id="8561" style={{ width: '300px' }} />
                                <Table id='8562' />
                            </CustomTabPane>

                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='8563' style={{ width: "300px" }} />
                                    <Chart id="8564" />
                                    <Table id='8565' />
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane> */}

                    {/**榜单分析  */}
                    <CustomTabPane>
                        <Custom_Date id='7801' />
                        <CustomSelect id='7808' style={{ marginLeft: 25 }} />
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='7802' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='7803' />
                        </div>
                        <CustomTab id="7804" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='7805' style={{ width: "300px" }} />
                                    <Table id='7806' />
                                </div>
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