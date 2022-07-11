'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import { CustomTab, CustomTabPane } from '@tab/config';
import Custom_Date from "@date/config";
import CustomSelect from '@select/config';
import CompanyTitle from '@title/config';
import UpdateTime from '@updateTime/config';
import Filter from '@filter/config';
import ComponentProps from '@componentProps/config';
import Chart from '@chart/config';
import Table from '@table/config';
import DrawerChart from '@drawerChart/config';
import FixedParam from '@fixedParam';

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

    paramRender = (params, record) => {
        let brand_name = record.brand_name_ch
        return Object.assign({}, params, {brand_name});
    }

    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;

        return (
            <div >
                <ComponentProps id="663" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="664"  position="top-outside">
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='665' style={{marginRight: '24px', marginTop: 0}} select_style={{width: `${i18n.getLocalLanguage()==='zh_CN'?'175px':'280px'}`}}/>
                            <CustomSelect id='666' style={{ marginRight: '24px' }} />
                            <div style={{display:'inline-block', marginRight: '24px'}}>
                            <CustomSelect id='667' />
                            <CustomSelect id='668' />
                            <CustomSelect id='669' />
                            </div>
                            {/* <div style={{marginTop: '10px'}}> */}
                            <CustomSelect id='670'/>
                            {/* </div> */}
                        </div>
                        <div style={{  display: 'flex', alignItems: 'center', margin: '8px 0', borderBottom: '1px solid #E1E8F0'}}>
                            <div style={{ display: 'none' }}><Custom_Date id='689' /></div>
                            <CompanyTitle id='671' />
                            {/* <UpdateTime style={{ marginLeft: '16px' }} id='672' /> */}
                        </div>
                        <CustomTab id="673">
                            <CustomTabPane>
                                <Table id='674' />
                                <DrawerChart id="690" paramRender={this.paramRender} />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='675' style={{ marginRight: '24px' }}/>
                            <CustomSelect id='676' style={{ marginRight: '24px' }} />
                            <div style={{display: 'inline-block', marginRight: '24px'}}>
                            <CustomSelect id='677'  />
                            <CustomSelect id='678' />
                            <CustomSelect id='679' />
                            </div>
                            {/* <div style={{marginTop: '10px'}}> */}
                            <CustomSelect id='680' />
                            {/* </div> */}

                        </div>
                        <div style={{  display: 'flex', alignItems: 'center', margin: '8px 0', borderBottom: '1px solid #E1E8F0' }}>
                            <div style={{ display: 'none' }}><Custom_Date id='689' /></div>
                            <CompanyTitle id='681' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='682' />
                        </div>
                        <CustomTab id="683" >
                            <CustomTabPane>
                                <Filter id='686' style={{ width: '300px' }} style_btn={{marginTop: '8px'}}/>
                                <Table id="687" />
                                <DrawerChart id='688' paramRender={this.paramRender} />
                            </CustomTabPane>
                            <CustomTabPane>
                                <FixedParam id='695' />
                                <Filter id='684' style={{ width: '300px' }} style_btn={{marginTop: '8px'}} />
                                <Chart id="685" />
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