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
                <ComponentProps id="6785" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="6773" position="top-outside">
                    {/* 整体概况 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='6774' />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='6775' />
                            <UpdateTime className="common-margin-left" id='6776' />
                        </div>
                        <CustomTab id="6777" className="tab-padding-top">
                            <CustomTabPane>
                                <Filter id="6778" style={{ width: '300px' }} />
                                <CustomChart id="6779" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="6780" style={{ width: '300px' }} />
                                <CustomTable id="6781" />
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6786同行业跳转 */}
                                <CustomSelect id="6782" className="select-margin-top-remove" />
                                <CustomChart id="6783" />
                                <CustomTable id="6784" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/* 行业分布 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='7467' />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='7468' />
                            <UpdateTime className="common-margin-left" id='7469' />
                        </div>
                        <CustomTab id="7470" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="7471">
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage()=="zh_CN"?"filter-wrapper2":"filter-wrapper2-US"}>
                                            <Filter id="7472" style={{ width: '300px' }} />
                                        </div>
                                        <CustomChart id="7473" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage()=="zh_CN"?"filter-wrapper2":"filter-wrapper2-US"}>
                                            <Filter id="7474" style={{ width: '300px' }} iconType="dimension" />
                                            <Filter id="7475" style={{ width: '300px' }} className="common-margin-left" />
                                        </div>
                                        <CustomChart id="7476" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="7477" style={{ width: '300px' }} />
                                <CustomTable id="7478" />
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6643同行业跳转 */}
                                <CustomSelect id="7479" className="select-margin-top-remove" />
                                <CustomChart id="7480" />
                                <CustomTable id="7481" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>

                    {/* 价格区间分布 */}
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='7482' />
                        </div>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='7483' />
                            <UpdateTime className="common-margin-left" id='7484' />
                        </div>
                        <CustomTab id="7485" className="tab-padding-top">
                            <CustomTabPane>
                                <CustomTab id="7486">
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage()=="zh_CN"?"filter-wrapper2":"filter-wrapper2-US"}>
                                            <Filter id="7487" style={{ width: '7472' }} />
                                        </div>
                                        <CustomChart id="7488" />
                                    </CustomTabPane>
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage()=="zh_CN"?"filter-wrapper2":"filter-wrapper2-US"}>
                                            <Filter id="7489" style={{ width: '300px' }} />
                                            <Filter id="7490" style={{ width: '300px' }} className="common-margin-left" />
                                        </div>
                                        <CustomChart id="7491" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            <CustomTabPane>
                                <Filter id="7492" style={{ width: '300px' }} />
                                <CustomTable id="7493" />
                            </CustomTabPane>
                            <CustomTabPane>
                                {/* 6643同行业跳转 */}
                                <CustomSelect id="7494" className="select-margin-top-remove" />
                                <CustomChart id="7495" />
                                <CustomTable id="7496" />
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