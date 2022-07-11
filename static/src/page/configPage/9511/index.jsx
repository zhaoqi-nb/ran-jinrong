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
import Jump from '@jump/config';

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
    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;
        return (
            <div >
                <ComponentProps id="9512" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="9513" position="top-outside">
                    {/**整体概况  */}
                    <CustomTabPane>
                        <Custom_Date id='9515' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='9516' />
                            <UpdateTime className="common-margin-left" id='9517' />
                        </div>
                        <CustomTab id="9518" className="tab-padding-top">
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='9519' style={{ width: "300px" }} />
                                    <Chart id='9520' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='9521' style={{ width: "300px" }} />
                                    <Table id='9522' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <CustomSelect id="9523" />
                                    <Chart id='9524' />
                                    <Table id='9525' />
                                </div>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>


                    {/**品类分布 */}
                    <CustomTabPane>
                        <Custom_Date id='9526' className="common-margin-right" />
                        <CustomSelect id="9527" className="common-margin-right" />
                        <CustomSelect id="9528" />

                        <div className="company-title-wrapper">
                            <CompanyTitle id='9529' />
                            <UpdateTime className="common-margin-left" id='9530' />
                        </div>
                        <CustomTab id="9531" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="9532">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='9533' style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="9534" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='9535' style={{ width: '300px' }} />
                                            <Filter id='9536' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="9537" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='9538' style={{ width: "300px" }} />
                                    <Table id='9539' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='9540' className="select-margin-top-remove" />
                                <Chart id="9541" />
                                <Table id='9542' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/**店铺分布 */}
                    <CustomTabPane>
                        <Custom_Date id='9543' className="common-margin-right" />
                        <CustomSelect id="9544" className="common-margin-right" />
                        <CustomSelect id="9545" />

                        <div className="company-title-wrapper">
                            <CompanyTitle id='9546' />
                            <UpdateTime className="common-margin-left" id='9547' />
                        </div>
                        <CustomTab id="9548" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="9549">
                                    <CustomTabPane>
                                        {/* 结构 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='9550' style={{ width: '300px' }} />
                                        </div>
                                        <Chart id="9551" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        {/* 趋势 */}
                                        <div className={this.props.i18n.getLocalLanguage() == "zh_CN" ? "filter-wrapper2" : "filter-wrapper2-US"}>
                                            <Filter id='9552' style={{ width: '300px' }} />
                                            <Filter id='9553' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <Chart id="9554" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <div style={{ minHeight: '500px' }}>
                                    <Filter id='9555' style={{ width: "300px" }} />
                                    <Table id='9556' />
                                </div>
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='9557' className="select-margin-top-remove" />
                                <Chart id="9558" />
                                <Table id='9559' />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                </CustomTab>
                <Jump id='9514' />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;