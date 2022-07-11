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
        if (menu) {
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
                <ComponentProps id="6737" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="6725" position="top-outside">
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='6726' />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='6727' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='6728'/>
                        </div>
                        <CustomTab id="6729" style={{paddingTop: '8px'}}>
                            <CustomTabPane>
                                <Filter id="6730" style={{width:'300px'}}/>
                                <CustomChart id="6731"/>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="6732" style={{width:'300px'}}/>
                                <CustomTable id="6733"/>
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6738同行业跳转 */}
                                <CustomSelect id="6734" style={{marginTop: 0}}/>
                                <CustomChart id="6735"/>
                                <CustomTable id="6736"/>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/* 品类分布 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='7315' />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='7316' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='7317' />
                        </div>
                        <CustomTab id="7318" style={{paddingTop: '8px'}}>
                            <CustomTabPane>
                                <CustomTab id="7319">
                                    <CustomTabPane>
                                        <div style={{position:'relative',left:`${i18n.getLocalLanguage()==='zh_CN'?'88px':'123px'}`,zIndex:'10', top:'-32px', height:0, display:'flex'}}>
                                            <Filter id="7338" style={{width:'300px'}}/>
                                            <Filter id="7339" style={{width:'300px'}} style_btn={{marginLeft:'16px'}}/>
                                        </div>
                                        <CustomChart id="7340"/>
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="7341" style={{width:'300px'}}/>
                                <CustomTable id="7342"/>
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