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
import Table from '@table/config';
import ComponentProps from '@componentProps/config'
import DrawerChart from '@drawerChart/config';
import RsIcon from '@/page/component/rsIcon';
import LinkTo from '@/page/component/url/config';
// import {FormattedMessage} from '@/components/FastIntl';

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
        let brand_id = record.brand_id;

        return Object.assign({}, params, { brand_id });
    }

    titleRender = (obj, option) => {
        if (option.platform_code == 1) obj.titleRight = '平台：天猫+京东'
        else if (option.platform_code == 2) obj.titleRight = '平台：天猫+京东+抖音'
        return obj
    }

    renderTableColmns = (columns) => {
        return columns.map(v => {
            const { dataIndex } = v
            if (dataIndex == 'brand_name') {
                v.render = (text, record) => {
                    let { flag } = record;
                    return (<div style={{ display: "flex", justifyContent: 'center' }}>
                        <div className='brand-name-title'>{text}</div>
                        <div style={{ marginLeft: '4px' }}>
                            {flag == 1 && <RsIcon type="icon-pinpaibiaoqian" style={{ fontSize: "17px", color: "#ff8d1a", width: 20 }} />}
                        </div>
                    </div>);
                }
            }
            return v
        })
    }

    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;
        return (
            <div >
                <ComponentProps id="182" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="183" position="top-outside">
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='184' style={{ marginRight: '24px' }} />
                            <CustomSelect id='185' style={{ marginRight: '24px' }} />
                            <CustomSelect id='186' style={{ marginRight: '24px' }} />
                            <CustomSelect id='187' style={{ marginRight: '24px' }} />
                            {/* <FormattedMessage id="hellow" name="张三"></FormattedMessage>
                            <FormattedMessage id="test" name="张三"></FormattedMessage>
                            <FormattedMessage id="test2" name="张三"></FormattedMessage> */}
                        </div>

                        <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center', borderBottom: '1px solid #E1E8F0' }}>
                            <CompanyTitle id='188' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='189' />
                        </div>
                        <CustomTab id="190">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='191' style={{ width: '300px' }} style_btn={{ marginTop: '8px' }} />
                                    <Table id='192' titleRender={this.titleRender} />
                                    {/* <LinkTo id="9300" /> */}
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='193' style={{ marginRight: '24px' }} />
                            <CustomSelect id='194' style={{ marginRight: '24px' }} />
                            <CustomSelect id='195' style={{ marginRight: '24px' }} />
                            <div style={{ display: 'inline-block' }}>
                                <CustomSelect id='196' style={{ marginRight: '24px' }} />
                                <CustomSelect id='197' style={{ marginRight: '24px' }} />
                            </div>

                        </div>

                        <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center', borderBottom: '1px solid #E1E8F0' }}>
                            <CompanyTitle id='198' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='199' />
                        </div>
                        <CustomTab id="200">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='201' style={{ width: '300px' }} style_btn={{ marginTop: '8px' }} />
                                    <div>
                                        <Table sortIndex={1} id='203' />
                                        <DrawerChart id="206" />
                                    </div>
                                    <div>
                                        <Table sortIndex={2} id='204' columnsRender={this.renderTableColmns} />
                                        <DrawerChart id="207" paramRender={this.paramRender} />
                                    </div>
                                    {/* <LinkTo id="9300" /> */}
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