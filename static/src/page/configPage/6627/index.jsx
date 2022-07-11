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
                <ComponentProps id="6642" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="6628" position="top-outside">
                    {/* 整体概况 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='6629' />
                        </div>
                        <div className='company-title-wrapper'>
                            <CompanyTitle id='6632' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='6633' />
                        </div>
                        <CustomTab id="6634" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id="6635" style={{ width: '300px' }} style_btn={{ marginTop: '8px' }} />
                                <CustomChart id="6636" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="6637" style={{ width: '300px' }} style_btn={{ marginTop: '8px' }} />
                                <CustomTable id="6638" />
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6643同行业跳转 */}
                                <CustomSelect id="6639" />
                                <CustomChart id="6640" />
                                <CustomTable id="6641" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/* 城市级别分布 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='7024' />
                        </div>
                        <div className='company-title-wrapper'>
                            <CompanyTitle id='7025' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='7026' />
                        </div>
                        <CustomTab id="7027" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="7028">
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0 }}>
                                            <Filter id="7029" style={{ width: '300px' }} />
                                        </div>
                                        <CustomChart id="7030" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0 }}>
                                            <Filter id="7031" style={{ width: '300px' }} />
                                            <Filter id="7032" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <CustomChart id="7033" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="7034" style={{ width: '300px' }} />
                                <CustomTable id="7035" />
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6643同行业跳转 */}
                                <CustomSelect id="7036" style={{ marginTop: 0 }} />
                                <CustomChart id="7037" />
                                <CustomTable id="7038" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>


                    {/* 门店分析 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='7054' />
                        </div>
                        <div className='company-title-wrapper'>
                            <CompanyTitle id='7055' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='7056' />
                        </div>
                        <CustomTab id="7095" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="7096">
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '88px' : '143px'}`, zIndex: '10', top: '-32px', height: 0 }}>
                                            <Filter id="7097" style={{ width: '300px' }} />
                                        </div>
                                        <CustomChart id="7098" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="7102" style={{ width: '300px' }} />
                                <CustomTable id="7103" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id="7104" style={{ marginTop: 0 }} />
                                <CustomChart id="7105" />
                                <CustomTable id="7106" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/* 品类分析 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='7039' />
                        </div>
                        <div className='company-title-wrapper'>
                            <CompanyTitle id='7040' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='7041' />
                        </div>
                        <CustomTab id="7042" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="7043">
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0 }}>
                                            <Filter id="7044" style={{ width: '300px' }} />
                                        </div>
                                        <CustomChart id="7045" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0 }}>
                                            <Filter id="7046" style={{ width: '300px' }} />
                                            <Filter id="7047" style={{ width: '300px' }} style_btn={{ marginLeft: "16px" }} />
                                        </div>
                                        <CustomChart id="7048" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="7049" style={{ width: '300px' }} />
                                <CustomTable id="7050" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id="7051" style={{ marginTop: 0 }} />
                                <CustomChart id="7052" />
                                <CustomTable id="7053" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>



                    {/* 配送费分布 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='7107' />
                        </div>
                        <div className='company-title-wrapper'>
                            <CompanyTitle id='7108' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='7109' />
                        </div>
                        <CustomTab id="7110" className="tab-padding-top">
                            <CustomTabPane>

                                <CustomSelect id="7111" />

                                <Filter id="7112" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                <CustomChart id="7113" />

                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="7114" style={{ width: '300px' }} style_btn={{ marginTop: '8px' }} />
                                <CustomTable id="7115" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/* 满减分布 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='7116' />
                        </div>
                        <div className='company-title-wrapper'>
                            <CompanyTitle id='7117' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='7118' />
                        </div>
                        <CustomTab id="7119" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomSelect id="7120" />
                                <Filter id="7121" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                <CustomChart id="7122" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="7123" style={{ width: '300px' }} style_btn={{ marginTop: '8px' }} />
                                <CustomTable id="7124" />
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