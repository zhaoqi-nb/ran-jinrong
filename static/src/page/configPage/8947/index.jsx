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
import Jump from '@jump/config';
import ComponentProps from '@componentProps/config';
import Filter from '@filter/config';

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
                <ComponentProps id="8950" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="8949" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <Custom_Date id='8952' />
                        <div style={{ display: 'none' }}>
                            <CustomSelect id='9110' style={{ marginLeft: '16px' }} />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='8953' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='8954' />
                        </div>
                        <CustomTab id="8955" style={{ paddingTop: '8px' }}>
                            {/**图形 */}
                            <CustomTabPane>
                                <Filter id='8956' />
                                <CustomChart id="8957" />
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='8958' />
                                <CustomTable id="8959" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id='8960' style={{ marginTop: 0 }} />
                                <CustomChart id="8961" />
                                <CustomTable id="8962" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**品牌分布 */}
                    <CustomTabPane>
                        <Custom_Date id='8963' />
                        <CustomSelect id='8983' style={{ marginLeft: '24px' }} />

                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='8964' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='8965' />
                        </div>
                        <CustomTab id="8966" style={{ paddingTop: '8px' }}>
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="8967">
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'88px':'123px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='8968' style={{ width: '300px' }} />
                                            <Filter id='8969' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <CustomChart id="8970" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='8971' />
                                <CustomTable id="8972" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**品类分布 */}
                    <CustomTabPane>
                        <Custom_Date id='8973' />
                        <CustomSelect id='8984' style={{ marginLeft: '24px' }} />

                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='8974' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='8975' />
                        </div>
                        <CustomTab id="8976" style={{ paddingTop: '8px' }}>
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="8977">
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'88px':'123px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='8978' style={{ width: '300px' }} />
                                            <Filter id='8979' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <CustomChart id="8980" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='8981' />
                                <CustomTable id="8982" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab>
                <Jump id='8951' />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;