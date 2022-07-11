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
                <ComponentProps id="7765" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="7766" position="top-outside">
                    {/* 整体概况 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="8395" />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id="8396" />
                            <UpdateTime style={{ marginLeft: '16px' }} id="8397" />
                        </div>
                        <CustomTab id="8398" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <Filter id="8399" style={{ width: '300px' }} />
                                <Chart id="8400" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="8401" style={{ width: '300px' }} />
                                <CustomTable id="8402" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id="8403" style={{ marginTop: 0 }} />
                                <Chart id="8404" />
                                <CustomTable id="8405" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/* 主播数量分析 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="8598" style={{ marginRight:'16px'}}/>
                            <div style={{display:'inline-block'}}>
                                <CustomSelect id="8610" style={{ marginTop: 0, marginRight:'16px' }} />
                                <CustomSelect id="8611" style={{ marginTop: 0, marginRight:'16px' }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id="8599" />
                            <UpdateTime style={{ marginLeft: '16px' }} id="8600" />
                        </div>
                        <CustomTab id="8601" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <CustomTab id="8602">
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='9740' style={{ width: "300px" }} />
                                        </div>
                                        <Chart id="9741" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='8605' style={{ width: "300px" }} />
                                            <Filter id='8606' style={{ width: "300px" }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="8607" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="8608" style={{ width: '300px' }} />
                                <CustomTable id="8609" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id="9742" style={{ width: '300px' }} />
                                <Chart id="9743" />
                                <CustomTable id="9744" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>


                    {/* 主播收入分析 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="8613" style={{ marginRight:'16px'}}/>
                            <div style={{display:'inline-block'}}>
                                <CustomSelect id="8625" style={{ marginTop: 0, marginRight:'16px' }} />
                                <CustomSelect id="8626" style={{ marginTop: 0, marginRight:'16px' }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id="8614" />
                            <UpdateTime style={{ marginLeft: '16px' }} id="8615" />
                        </div>
                        <CustomTab id="8616" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <CustomTab id="8617">
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='8627' style={{ width: "300px" }} />
                                        </div>
                                        <Chart id="9731" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='8620' style={{ width: "300px" }} />
                                            <Filter id='8621' style={{ width: "300px" }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="8622" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="8623" style={{ width: '300px' }} />
                                <CustomTable id="8624" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id="9732" style={{ marginTop: 0 }} />
                                <Chart id="9733" />
                                <CustomTable id="9734" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/* 主播榜单 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="7767" />
                            <CustomSelect id="7768" style={{ marginLeft: "24px" }} />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id="7769" />
                            <UpdateTime style={{ marginLeft: '16px' }} id="7770" />
                        </div>
                        <CustomTab id="7771" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <Filter id="7772" style={{ width: '300px' }} />
                                <CustomTable id="7773" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>


                </CustomTab>

                <Jump id="7774" />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;