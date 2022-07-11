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
import DrawerChart from '@drawerChart/config';
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
    paramRender = (params, record) => {
        let brand_id = record.brand_id,
            shop_dimension = record.shop_dimension;
        return Object.assign({}, params, { brand_id, shop_dimension });
    }
    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;;
        return (
            <div >
                <ComponentProps id="8293" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="8294" position="top-outside">
                    {/**整体概览 */}
                    <CustomTabPane>
                        <Custom_Date id='8296' />
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='8297' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='8298' />
                        </div>
                        <CustomTab id="8299" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <Filter id='8300' style={{ width: "300px" }} />
                                <Chart id='8301' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='8302' style={{ width: "300px" }} />
                                <Table id='8303' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='8304' style={{ marginTop: 0 }} />
                                <Chart id='8305' />
                                <Table id='8306' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>


                    {/**专辑分析 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='9437' style={{marginRight:'24px'}}/>
                            <div style={{display:'inline-block'}}>
                                <CustomSelect id="9449" style={{marginRight:'24px'}}/>
                                {/* <CustomSelect id="9450"/> */}
                            </div>
                            
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='9438' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='9439' />
                        </div>
                        <CustomTab id="9440" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <CustomTab id="9441">
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='9442' style={{ width: "300px" }} />
                                        </div>
                                        <Chart id='9443' />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex'}}>
                                            <Filter id="9444" style={{ width: '300px' }} />
                                            <Filter id="9445" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id='9446' />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id='9447' style={{ width: "300px" }} />
                                <Table id='9448' />
                            </CustomTabPane>
                            {/** 新增 图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id='9751' style={{marginTop: 0}}/>
                                <Chart id='9752'/>
                                <Table id='9753' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab>
                <Jump id='8295' />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;