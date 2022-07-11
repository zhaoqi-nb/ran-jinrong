'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import Custom_Date from "@date/config";
import Jump from '@jump/config';
import CompanyTitle from '@title/config';
import UpdateTime from '@updateTime/config';
import { CustomTab, CustomTabPane } from '@tab/config'
import CustomTable from '@table/config';
import CustomChart from '@chart/config';
import CustomSelect from '@select/config';
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
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo }
    }

    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;
        return (
            <div>
                <ComponentProps id="7754" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="7755" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <Custom_Date id='8369' />
                        <div style={{ display: "flex", borderBottom: "1px solid #E1E8F0", marginTop: 8, justifyContent: "space-between" }}>
                            <div className="company-title-wrapper" style={{ border: 'none', margin: 0 }}>
                                <CompanyTitle id='8370' />
                                <UpdateTime className="common-margin-left" id='8371' />
                            </div>
                            <CustomSelect id="8679" />
                        </div>
                        <CustomTab id="8372" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <Filter id='8373' />
                                <CustomChart id="8374" />
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='8375' />
                                <CustomTable id="8376" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id='8377' className="select-margin-top-remove" />
                                <CustomChart id="8378" />
                                <CustomTable id="8379" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/**主播数量分析*/}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='8647' className="common-margin-right" />
                            <CustomSelect id='8652' className="common-margin-right" />
                            <CustomSelect id='8653' />
                        </div>
                        <div style={{ display: "flex", borderBottom: "1px solid #E1E8F0", marginTop: 8, justifyContent: "space-between" }}>
                            <div className="company-title-wrapper" style={{ border: 'none', margin: 0 }}>
                                <CompanyTitle id='8648' />
                                <UpdateTime className="common-margin-left" id='8649' />
                            </div>
                            {/* <CustomSelect id="8680" /> */}
                        </div>
                        <CustomTab id="8650" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="8651">
                                    {/**结构分析 */}
                                    {/* <CustomTabPane>
                                        <div style={{position:'relative',left:`${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`,zIndex:'10', top:'-32px', height:0, display:'flex'}}>
                                            <Filter id="9761" style={{ width: '300px' }} />
                                        </div>
                                        <CustomChart id="9762" />
                                    </CustomTabPane> */}
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper1" : "filter-wrapper1-US"}>
                                            <Filter id="8654" style={{ width: '300px' }} />
                                            <Filter id="8655" style={{ width: '300px' }} className="common-margin-left" />
                                        </div>
                                        <CustomChart id="8656" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id="8657" style={{ width: '300px' }} />
                                <CustomTable id="8658" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            {/* <CustomTabPane>
                                <CustomSelect id="8659" style={{marginTop: 0}}/>
                                <CustomChart id="8660" />
                                <CustomTable id="8661" />
                            </CustomTabPane> */}
                        </CustomTab>
                    </CustomTabPane>
                    {/**主播收入分析 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='8667' className="common-margin-right" />
                            <CustomSelect id='8672' className="common-margin-right" />
                            <CustomSelect id='8673' />
                        </div>
                        <div style={{ display: "flex", borderBottom: "1px solid #E1E8F0", marginTop: 8, justifyContent: "space-between" }}>
                            <div className="company-title-wrapper" style={{ border: 'none', margin: 0 }}>
                                <CompanyTitle id='8668' />
                                <UpdateTime className="common-margin-left" id='8669' />
                            </div>
                            <CustomSelect id="8681" />
                        </div>
                        <CustomTab id="8670" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="8671">
                                    {/**结构分析 */}
                                    {/* <CustomTabPane>
                                        <div style={{position:'relative',left:`${i18n.getLocalLanguage()==='zh_CN'?'160px':'250px'}`,zIndex:'10', top:'-32px', height:0, display:'flex'}}>
                                            <Filter id="9763" style={{ width: '300px' }} />
                                        </div>
                                        <CustomChart id="9764" />
                                    </CustomTabPane> */}
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper1" : "filter-wrapper1-US"}>
                                            <Filter id="8674" style={{ width: '300px' }} />
                                            <Filter id="8675" style={{ width: '300px' }} className="common-margin-left" />
                                        </div>
                                        <CustomChart id="8676" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id="8677" style={{ width: '300px' }} />
                                <CustomTable id="8678" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            {/* <CustomTabPane>
                                <CustomSelect id="9754" style={{marginTop: 0}}/>
                                <CustomChart id="9755" />
                                <CustomTable id="9756" />
                            </CustomTabPane> */}
                        </CustomTab>
                    </CustomTabPane>
                    {/**榜单分析 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id="7756" className="common-margin-right" />
                            <CustomSelect id="7757" />
                        </div>
                        <div style={{ display: "flex", borderBottom: "1px solid #E1E8F0", marginTop: 8, justifyContent: "space-between" }}>
                            <div className="company-title-wrapper" style={{ border: 'none', margin: 0 }}>
                                <CompanyTitle id="7758" />
                                <UpdateTime className="common-margin-left" id="7759" />
                            </div>
                            <CustomSelect id="9635" />
                        </div>
                        <CustomTab id="7760" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id="7761" style={{ width: '300px' }} />
                                <CustomTable id="7762" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab>

                <Jump id="7763" />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;