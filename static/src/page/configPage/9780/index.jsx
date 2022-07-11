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
                <ComponentProps id="9781" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="9783" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='9784' select_style={{width: `${i18n.getLocalLanguage()==='zh_CN'?'175px':'280px'}`}}/>
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='9785' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='9786'/>
                        </div>
                        <CustomTab id="9787" style={{paddingTop: '8px'}}>
                            <CustomTabPane>
                                <Filter id="9788" style={{width:'300px'}}/>
                                <CustomChart id="9789"/>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="9790" style={{width:'300px'}}/>
                                <CustomTable id="9791"/>
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6817同行业跳转 */}
                                <CustomSelect id="9792" style={{marginTop: 0}}/>
                                <CustomChart id="9793"/>
                                <CustomTable id="9794"/>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/* 价格区间分布 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='9795' />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='9796' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='9797' />
                        </div>
                        <CustomTab id="9798" style={{paddingTop: '8px'}}>
                            <CustomTabPane>
                                <CustomTab id="9799">
                                    <CustomTabPane>
                                        <div style={{position:'relative',left:`${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`,zIndex:'10', top:'-32px', height:0}}>
                                            <Filter id="9820" style={{width:'7472'}}/>
                                        </div>
                                        <CustomChart id="9821"/>
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div style={{position:'relative',left:`${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`,zIndex:'10', top:'-32px', height:0, display:'flex'}}>
                                            <Filter id="9822" style={{width:'300px'}}/>
                                            <Filter id="9823" style={{width:'300px'}} style_btn={{marginLeft:'16px'}}/>
                                        </div>
                                        <CustomChart id="9824"/>
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="9825" style={{width:'300px'}}/>
                                <CustomTable id="9826"/>
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6643同行业跳转 */}
                                <CustomSelect id="9827" style={{marginTop: 0}}/>
                                <CustomChart id="9828"/>
                                <CustomTable id="9829"/>
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