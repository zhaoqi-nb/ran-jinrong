'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import { CustomTab, CustomTabPane } from '@tab/config'
import ComponentProps from '@componentProps/config'
import Custom_Date from "@date/config";
import CustomSelect from '@select/config';
import CompanyTitle from '@title/config';
import UpdateTime from '@updateTime/config'
import Filter from '@filter/config'
import DrawerChart from '@drawerChart/config';
import Table from '@table/config';
import Chart from '@chart/config'
import { findIndustryInfo } from '@/page/component/page/util'

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
        console.log(this.props.match.params,'-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-')
        const { boardId: parentId } = this.props.match.params
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo, parentId, redId: findIndustryInfo("47")  }
    }

    paramRender = (params, record) => {
        let type_name = record.show_type_name
        return Object.assign({}, params, { type_name });
    }

    setSelectValue = (value, options) => {
        if (value == '全部') {
            value = options.map(item => {
                return item.code
            })
            value = value.length && value.join(',')
        }
        return value
    }

    setSelectValueSecond = (value) => {
        if (!value) value = '全部'
        return value
    }

    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;

        return (
            <div>
                <ComponentProps id="9562" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="546" position="top-outside">
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="547" style={{ marginRight: '24px', marginTop: 0 }} select_style={{width: `${i18n.getLocalLanguage()==='zh_CN'?'175px':'280px'}`}}/>
                            <CustomSelect id="548" style={{ marginRight: '24px' }} />
                            <div style={{ display: 'inline-block' }}>
                                <CustomSelect id="549" setSelectValue={this.setSelectValue} />
                                <CustomSelect id="550" setSelectValue={this.setSelectValueSecond} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0', borderBottom: '1px solid #E1E8F0' }}>
                            <div style={{ display: 'none' }}><Custom_Date id="643" /></div>
                            <CompanyTitle id="551" />
                            {/* <UpdateTime id="552" style={{marginLeft:'16px'}}/> */}
                        </div>
                        <CustomTab id="553">
                            <CustomTabPane>
                                <Table id="554" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="9505" style={{ width: '300px' }} style_btn={{ marginTop: '8px' }} />
                                <Chart id="9506" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    <CustomTabPane>
                        <div>
                            <Custom_Date id="555" style={{ marginRight: '24px' }} />
                            <CustomSelect id="556" style={{ marginRight: '24px' }} />
                            <div style={{ display: 'inline-block' }}>
                                <CustomSelect id="557" setSelectValue={this.setSelectValue} />
                                <CustomSelect id="558" setSelectValue={this.setSelectValueSecond} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0', borderBottom: '1px solid #E1E8F0' }}>
                            <div style={{ display: 'none' }}><Custom_Date id="643" /></div>
                            <CompanyTitle id="559" />
                            <UpdateTime id="560" style={{ marginLeft: '16px' }} />
                        </div>
                        <CustomTab id="561" style={{ padding: '8px 0' }}>
                            <CustomTabPane>
                                <div style={{ minHeight: 500 }}>
                                    <Filter id="562" style={{ width: '300px' }} />
                                    <Table id="563" />
                                    <DrawerChart id="658" paramRender={this.paramRender} />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="564" style={{ width: '300px' }} />
                                <Chart id="565" />
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