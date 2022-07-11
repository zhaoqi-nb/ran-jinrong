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
                <ComponentProps id="6816" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="6804" position="top-outside">
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='6805' select_style={{ width: `${i18n.getLocalLanguage() === 'zh_CN' ? '175px' : '280px'}` }} />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='6806' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='6807' />
                        </div>
                        <CustomTab id="6808" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <Filter id="6809" style={{ width: '300px' }} />
                                <CustomChart id="6810" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="6811" style={{ width: '300px' }} />
                                <CustomTable id="6812" />
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6817同行业跳转 */}
                                <CustomSelect id="6813" style={{ marginTop: 0 }} />
                                <CustomChart id="6814" />
                                <CustomTable id="6815" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>




                    {/* 渠道分布 */}
                    <CustomTabPane>
                        <Custom_Date id='7843' />
                        <CustomSelect id='7844' style={{ marginLeft: "20px" }} />
                        <CustomSelect id='7845' style={{ marginLeft: "20px" }} />
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='7846' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='7847' />
                        </div>
                        <CustomTab id="7848" style={{ paddingTop: '8px' }}>
                            {/**图形 */}
                            <CustomTabPane>

                                <CustomTab id="7849">
                                    {/**结构 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='7850' style={{ width: '300px' }} />
                                        </div>
                                        <CustomChart id="7851" />
                                    </CustomTabPane>
                                    {/**趋势 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='7852' style={{ width: '300px' }} />
                                            <Filter id='7853' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <CustomChart id="7854" />
                                    </CustomTabPane>

                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='7855' />
                                <CustomTable id="7856" />
                            </CustomTabPane>

                        </CustomTab>

                    </CustomTabPane>

                    {/* 行业分布 */}
                    <CustomTabPane>
                        <Custom_Date id='7857' />
                        <CustomSelect id='7858' style={{ marginLeft: "20px" }} />
                        <CustomSelect id='7859' style={{ marginLeft: "20px" }} />
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='7860' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='7861' />
                        </div>
                        <CustomTab id="7862" style={{ paddingTop: '8px' }}>
                            {/**图形 */}
                            <CustomTabPane>

                                <CustomTab id="7863">
                                    {/**结构 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='7864' style={{ width: '300px' }} />
                                        </div>
                                        <CustomChart id="7865" />
                                    </CustomTabPane>
                                    {/**趋势 */}
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id='7866' style={{ width: '300px' }} />
                                            <Filter id='7867' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <CustomChart id="7868" />
                                    </CustomTabPane>

                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='7869' />
                                <CustomTable id="7870" />
                            </CustomTabPane>

                        </CustomTab>

                    </CustomTabPane>


                    {/* 价格区间分布 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='7550' />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='7551' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='7552' />
                        </div>
                        <CustomTab id="7553" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <CustomTab id="7554">
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0 }}>
                                            <Filter id="7555" style={{ width: '7472' }} />
                                        </div>
                                        <CustomChart id="7556" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="7557" style={{ width: '300px' }} />
                                            <Filter id="7558" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <CustomChart id="7559" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="7560" style={{ width: '300px' }} />
                                <CustomTable id="7561" />
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6643同行业跳转 */}
                                <CustomSelect id="7562" style={{ marginTop: 0 }} />
                                <CustomChart id="7563" />
                                <CustomTable id="7564" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>


                    {/* 店铺分布 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='7534' style={{ marginRight: '24px' }} />
                            <CustomSelect id='7535' />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='7536' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='7537' />
                        </div>
                        <CustomTab id="7538" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <CustomTab id="7539">
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0 }}>
                                            <Filter id="7540" style={{ width: '300px' }} />
                                        </div>
                                        <CustomChart id="7541" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="7542" style={{ width: '300px' }} />
                                            <Filter id="7543" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <CustomChart id="7544" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="7545" style={{ width: '300px' }} />
                                <CustomTable id="7546" />
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6643同行业跳转 */}
                                <CustomSelect id="7547" style={{ marginTop: 0 }} />
                                <CustomChart id="7548" />
                                <CustomTable id="7549" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/* 发货地分布 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='11348' />
                        </div>
                        <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
                            <CompanyTitle id='11349' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='11350' />
                        </div>
                        <CustomTab id="11351" style={{ paddingTop: '8px' }}>
                            <CustomTabPane>
                                <CustomTab id="11352">
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0 }}>
                                            <Filter id="11353" style={{ width: '7472' }} />
                                        </div>
                                        <CustomChart id="11354" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="11355" style={{ width: '300px' }} />
                                            <Filter id="11356" style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                        </div>
                                        <CustomChart id="11357" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="11358" style={{ width: '300px' }} />
                                <CustomTable id="11359" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id="11360" style={{ marginTop: 0 }} />
                                <CustomChart id="11361" />
                                <CustomTable id="11362" />
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