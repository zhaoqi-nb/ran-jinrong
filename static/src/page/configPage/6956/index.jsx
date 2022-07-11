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
                <ComponentProps id="6957" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="6958" position="top-outside">
                    <CustomTabPane>
                        <Custom_Date id='6959' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='6960' />
                            <UpdateTime className="common-margin-left" id='6961' />
                        </div>
                        <CustomTab id="6962" className="tab-padding-top">
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id="6967" style={{ width: '300px' }} />
                                <CustomTable id="6968" />
                            </CustomTabPane>
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="6963">
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage()=="zh_CN"?"filter-wrapper1":"filter-wrapper1-US"}>
                                            <Filter id="6964" style={{ width: '300px' }} />
                                            <Filter id="6965" className="common-margin-left" />
                                        </div>
                                        <CustomChart id="6966" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    <CustomTabPane>
                        <Custom_Date id='6969' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='6970' />
                            <UpdateTime className="" id='6971' className="common-margin-left"/>
                        </div>
                        <CustomTab id="6972" className="tab-padding-top">
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id="6977" style={{ width: '300px' }} />
                                <CustomTable id="6978" />
                            </CustomTabPane>
                            {/**图形 */}
                            <CustomTabPane>
                                <CustomTab id="6973">
                                    {/**趋势分析 */}
                                    <CustomTabPane>
                                        <div className={this.props.i18n.getLocalLanguage()=="zh_CN"?"filter-wrapper1":"filter-wrapper1-US"}>
                                            <Filter id="6974" style={{ width: '300px' }} />
                                            <Filter id="6975" className="common-margin-left" />
                                        </div>
                                        <CustomChart id="6976" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                </CustomTab>
                {/**同行业公司跳转  6979*/}

            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;