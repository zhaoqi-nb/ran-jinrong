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
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo }
    }

    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;
        return (
            <div>
                <ComponentProps id="6925" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="6913" position="top-outside">
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='6914' />
                        </div>
                        <div style={{ display: "flex", borderBottom: "1px solid #E1E8F0", marginTop: 8, justifyContent: "space-between" }}>
                            <div className="company-title-wrapper" style={{ border: 'none', margin: 0 }}>
                                <CompanyTitle id='6915' />
                                <UpdateTime className="common-margin-left" id='6916' />
                            </div>
                            <CustomSelect id="9628" />
                        </div>
                        <CustomTab id="6917" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id="6918" style={{ width: '300px' }} />
                                <CustomChart id="6919" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="6920" style={{ width: '300px' }} />
                                <CustomTable id="6921" />
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6817同行业跳转 */}
                                <CustomSelect id="6922" className="select-margin-top-remove" />
                                <CustomChart id="6923" />
                                <CustomTable id="6924" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**行业分布*/}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='7070' />
                        </div>
                        <div style={{ display: "flex", borderBottom: "1px solid #E1E8F0", marginTop: 8, justifyContent: "space-between" }}>
                            <div className="company-title-wrapper" style={{ border: 'none', margin: 0 }}>
                                <CompanyTitle id='7071' />
                                <UpdateTime className="common-margin-left" id='7072' />
                            </div>
                            <CustomSelect id="9629" />
                        </div>
                        <CustomTab id="7073" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="7074">
                                    {/**结构分析 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="7075" style={{ width: '300px' }} />
                                        </div>
                                        <CustomChart id="7076" />
                                    </CustomTabPane>
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="7077" style={{ width: '300px' }} />
                                            <Filter id="7078" style={{ width: '300px' }} className="common-margin-left" />
                                        </div>
                                        <CustomChart id="7079" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id="7080" style={{ width: '300px' }} />
                                <CustomTable id="7081" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id="7082" className="select-margin-top-remove" />
                                <CustomChart id="7083" />
                                <CustomTable id="7084" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**价格区间分布*/}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='7196' />
                        </div>
                        <div style={{ display: "flex", borderBottom: "1px solid #E1E8F0", marginTop: 8, justifyContent: "space-between" }}>
                            <div className="company-title-wrapper" style={{ border: 'none', margin: 0 }}>
                                <CompanyTitle id='7197' />
                                <UpdateTime className="common-margin-left" id='7198' />
                            </div>
                            <CustomSelect id="9630" />
                        </div>
                        <CustomTab id="7199" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="7200">
                                    {/**结构分析 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', display: 'flex' }}>
                                            <Filter id="7201" style={{ width: '300px' }} />
                                        </div>
                                        <CustomChart id="7202" />
                                    </CustomTabPane>
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', display: 'flex' }}>
                                            <Filter id="7203" style={{ width: '300px' }} />
                                            <Filter id="7204" style={{ width: '300px' }} className="common-margin-left" />
                                        </div>
                                        <CustomChart id="7205" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id="7206" style={{ width: '300px' }} />
                                <CustomTable id="7207" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id="7208" className="select-margin-top-remove" />
                                <CustomChart id="7209" />
                                <CustomTable id="7210" />
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