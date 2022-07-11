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
                <ComponentProps id="6675" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="6663" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='6664' />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='6665' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='6666' />
                        </div>
                        <CustomTab id="6667" style={{paddingTop: '8px'}}>
                            <CustomTabPane>
                                <Filter id="6668" style={{width:'300px'}}/>
                                <CustomChart id="6669"/>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="6670" style={{width:'300px'}}/>
                                <CustomTable id="6671"/>
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6676同行业跳转 */}
                                <CustomSelect id="6672" style={{marginTop: 0}}/>
                                <CustomChart id="6673"/>
                                <CustomTable id="6674"/>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
               
                    {/* 城市级别分布 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='7280' />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='7281' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='7282' />
                        </div>
                        <CustomTab id="7283" style={{ paddingTop: '8px'}}>
                            <CustomTabPane>
                                <CustomTab id="7284">
                                    <CustomTabPane>
                                        <div style={{position:'relative',left:`${i18n.getLocalLanguage()==='zh_CN'?'88px':'123px'}`,zIndex:'10', top:'-32px', height:0, display:'flex'}}>
                                            <Filter id="7287" style={{width:'300px'}}/>
                                            <Filter id="7288" style={{width:'300px'}} style_btn={{marginLeft:'16px'}}/>
                                        </div>
                                        <CustomChart id="7289"/>
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="7290" style={{width:'300px'}}/>
                                <CustomTable id="7291"/>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/* 配送费分布 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='7295' />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='7296' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='7297' />
                        </div>
                        <CustomTab id="7298">
                            <CustomTabPane>
                                <div style={{display:'inline-block', position:'relative'}}>
                                    <CustomSelect id="7299"/>
                                </div>
                                <Filter id="7300" style={{width:'300px'}} style_btn={{marginLeft:'16px'}}/>
                                <CustomChart id="7301"/>
                                
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="7302" style={{width:'300px'}} style_btn={{marginTop: '8px'}}/>
                                <CustomTable id="7303"/>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/* 满减分布 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='7304' />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='7305' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='7306' />
                        </div>
                        <CustomTab id="7307">
                            <CustomTabPane>
                                <div style={{display:'inline-block', position:'relative'}}>
                                    <CustomSelect id="7308" />
                                </div>
                                <Filter id="7309" style={{width:'300px'}}  style_btn={{marginLeft:'10px'}}/>
                                <CustomChart id="7310"/>
                                
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="7311" style={{width:'300px'}} style_btn={{marginTop: '8px'}}/>
                                <CustomTable id="7312"/>
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