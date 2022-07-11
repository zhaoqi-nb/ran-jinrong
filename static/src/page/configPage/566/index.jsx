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
import DrawerChart from '@drawerChart/config';
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
            this.setState({ pageInfo, resAttr: JSON.parse(resAttr) });
        }
    }
    getComponentProps = (pageInfo) => {
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo }
    }

    paramRender = (params, record) => {
        let stock_code = record.stock_code
        return Object.assign({}, params, { stock_code });
    }

    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;

        return (
            <div>
                <CustomTab id="567" position="top-outside">
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="568" style={{ marginRight: '24px', marginTop: 0 }} select_style={{width: `${i18n.getLocalLanguage()==='zh_CN'?'175px':'280px'}`}}/>
                            <CustomSelect id="569" style={{ marginRight: '24px' }} />
                            <CustomSelect id="570" select_style={{ width: 175 }} style={{ marginRight: '24px' }} />
                            <CustomSelect id="571" select_style={{ width: 145 }} style={{ marginRight: '24px' }} />
                            <CustomSelect id="572" select_style={{ width: 161 }} style={{ marginRight: '24px' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0', borderBottom: '1px solid #E1E8F0' }}>
                            <div style={{ display: 'none' }}><Custom_Date id="643" /></div>
                            <CompanyTitle id="573" />
                            {/* <UpdateTime id="574" style={{marginLeft:'16px'}}/> */}
                        </div>
                        <CustomTab id="575">
                            <CustomTabPane>
                                <Table id="576" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    <CustomTabPane>
                        <div>
                            <Custom_Date id="577" style={{ marginRight: '24px' }} />
                            <CustomSelect id="578" style={{ marginRight: '24px' }} />
                            <CustomSelect select_style={{ width: 175 }} id="579" style={{ marginRight: '24px' }} />
                            <CustomSelect select_style={{ width: 145 }} id="580" style={{ marginRight: '24px' }} />
                            <CustomSelect select_style={{ width: 161 }} id="581" style={{ marginRight: '24px' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0', borderBottom: '1px solid #E1E8F0' }}>
                            <div style={{ display: 'none' }}><Custom_Date id="644" /></div>
                            <CompanyTitle id="582" />
                            <UpdateTime id="583" className="common-margin-left" />
                        </div>
                        <CustomTab id="584" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <Filter id="585" style={{ width: '300px' }} />
                                <Table id="586" />
                                <DrawerChart id="659" paramRender={this.paramRender} />
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