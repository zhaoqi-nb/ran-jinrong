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
import CustomCheckbox from '@checkbox/config'
import ComponentProps from '@componentProps/config'
import Chart from '@chart/config'
import Table from '@table/config';
import Explain from '@explain';
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
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo, brand_name: "呷哺呷哺" }
    }
    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;;
        return (
            <div >
                <ComponentProps id="10922" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="10923" position="top-outside">
                    {/**整体概况 */}
                    <CustomTabPane>
                        <Custom_Date id='10924' select_style={{ width: `${i18n.getLocalLanguage() === 'zh_CN' ? '175px' : '280px'}` }} className="common-margin-right" />
                        <CustomSelect id="10925" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='10926' />
                            <UpdateTime className="common-margin-left" id='10927' />
                        </div>
                        <CustomTab id="10928" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='10929' style={{ width: '300px' }} />
                                    <Chart id="10930" />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='10931' style={{ width: "300px" }} />
                                    <Table id='10932' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='10933' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='10934' />
                                <Table id='10935' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**城市分布 */}
                    <CustomTabPane>
                        <Custom_Date id='10936' className="common-margin-right" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='10937' />
                            <UpdateTime className="common-margin-left" id='10938' />
                        </div>
                        <CustomTab id="10939" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="10940">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='11251' style={{ width: '300px' }} />
                                            <Filter id='10941' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="10942" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='10943' style={{ width: '300px' }} />
                                            <Filter id='10944' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="10945" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='10946' style={{ width: "300px" }} />
                                    <Table id='10947' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ display: 'inline-block' }}>
                                    <CustomSelect id='10948' select_style={{ width: '230px' }} className="select-margin-top-remove common-margin-right" />
                                    <Filter id='11250' />
                                </div>
                                <Chart id='10949' />
                                <Table id='10950' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**门店留存 */}
                    <CustomTabPane>
                        <Explain id='10951' style={{ marginTop: '8px' }} />
                        <Custom_Date id='10952' className="common-margin-right" />
                        <CustomSelect id="10953" className="common-margin-right" />
                        <CustomSelect id="10954" />
                        <CustomSelect id="10955" />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='10956' />
                            <UpdateTime className="common-margin-left" id='10957' />
                        </div>
                        <CustomTab id="10958" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='10959' style={{ width: "300px" }} />
                                <Chart id='10960' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='10961' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='10962' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='10963' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='10964' />
                                <Table id='10965' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**新增/流失门店 */}
                    {/* <CustomTabPane>
                        <Custom_Date id='10966' className="common-margin-right" />
                        <CustomSelect id="10967" /> 
                        <div className="company-title-wrapper">
                            <CompanyTitle id='10968' />
                            <UpdateTime className="common-margin-left" id='10969' />
                        </div>
                        <CustomTab id="10970" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id='10971' style={{ width: "300px", marginBottom: "10px" }} />
                                <Chart id='10972' />
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='10973' style={{ width: "300px", marginBottom: "10px" }} />
                                    <Table id='10974' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='10975' select_style={{ width: '230px' }} className="select-margin-top-remove" />
                                <Chart id='10976' />
                                <Table id='10977' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane> */}
                </CustomTab>
            </div >
        );
    }
}

Index.propTypes = {

};

export default Index;