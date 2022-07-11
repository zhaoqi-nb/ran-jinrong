'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import Custom_Date from "@date/config";
import Jump from '@jump/config';
import CompanyTitle from '@title/config';
import UpdateTime from '@updateTime/config';
import { CustomTab, CustomTabPane } from '@tab/config'
import Table from '@table/config';
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
                <ComponentProps id="8423" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="8424" position="top-outside">
                    {/* 整体概况 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="8425" />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id="8426" />
                            <UpdateTime className="common-margin-left"  id="8427" />
                        </div>
                        <CustomTab id="8428" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id="8429" style={{ width: '300px' }} />
                                <Chart id="8430" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="8431" style={{ width: '300px' }} />
                                <Table id="8432" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id="8433" className="select-margin-top-remove"/>
                                <Chart id="8434" />
                                <Table id="8435" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**主播数量分析*/}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='8722' className="common-margin-right" />
                            <CustomSelect id='8727' />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8723' />
                            <UpdateTime className="common-margin-left" id='8724' />
                        </div>
                        <CustomTab id="8725" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="8726">
                                    {/**结构分析 */}
                                    {/* <CustomTabPane>
                                        <div style={{position:'relative',left:`${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`,zIndex:'10', top:'-32px', height:0, display:'flex'}}>
                                            <Filter id="9757" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="9758" />
                                    </CustomTabPane> */}
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage()=="zh_CN"?"filter-wrapper1":"filter-wrapper1-US"}>
                                            <Filter id="8729" style={{ width: '300px' }} />
                                            <Filter id="8730" style={{ width: '300px' }} className="common-margin-left"  />
                                        </div>
                                        <Chart id="8731" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id="8732" style={{ width: '300px' }} />
                                <Table id="8733" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            {/* <CustomTabPane>
                                <CustomSelect id="8734" style={{marginTop: 0}}/>
                                <Chart id="8735" />
                                <Table id="8736" />
                            </CustomTabPane> */}
                        </CustomTab>
                    </CustomTabPane>
                    {/**主播收入分析*/}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='8739'  className="common-margin-right" />
                            <CustomSelect id='8744' />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='8740' />
                            <UpdateTime  className="common-margin-left" id='8741' />
                        </div>
                        <CustomTab id="8742" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="8743">
                                    {/**结构分析 */}
                                    {/* <CustomTabPane>
                                        <div style={{position:'relative',left:`${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`,zIndex:'10', top:'-32px', height:0, display:'flex'}}>
                                            <Filter id="9759" style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="9760" />
                                    </CustomTabPane> */}
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage()=="zh_CN"?"filter-wrapper1":"filter-wrapper1-US"}>
                                            <Filter id="8746" style={{ width: '300px' }} />
                                            <Filter id="8747" style={{ width: '300px' }} className="common-margin-left" />
                                        </div>
                                        <Chart id="8748" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id="8749" style={{ width: '300px' }} />
                                <Table id="8750" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            {/* <CustomTabPane>
                                <CustomSelect id="8751" style={{marginTop: 0}}/>
                                <Chart id="8752" />
                                <Table id="8753" />
                            </CustomTabPane> */}
                        </CustomTab>
                    </CustomTabPane>
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="7745" className="common-margin-right"/>
                            <CustomSelect id="7746" />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id="7747" />
                            <UpdateTime className="common-margin-left" id="7748" />
                        </div>
                        <CustomTab id="7749" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id="7750" style={{ width: '300px' }} />
                                <Table id="7751" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab>

                <Jump id="8436" />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;