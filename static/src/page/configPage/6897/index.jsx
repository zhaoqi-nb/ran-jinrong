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
                <ComponentProps id="6910" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="6898" position="top-outside">
                    {/**公司概况 */}
                    <CustomTabPane>
                        <Custom_Date id='6899' />
                        <div className="company-title-wrapper">
                            <CompanyTitle id='6900' />
                            <UpdateTime className="common-margin-left" id='6901' />
                        </div>
                        <CustomTab id="6902" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                <Filter id='6903' />
                                <CustomChart id="6904" />
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='6905' />
                                <CustomTable id="6906" />
                            </CustomTabPane>
                            {/**图形+表格 */}
                            <CustomTabPane>
                                <CustomSelect id='6907' className="select-margin-top-remove" />
                                <CustomChart id="6908" />
                                <CustomTable id="6909" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    {/**品类分布 */}
                    <CustomTabPane>
                        <Custom_Date id="7568" />
                        <div className="company-title-wrapper ">
                            <CompanyTitle id="7569" />
                            <UpdateTime className="common-margin-left" id="7570" />
                        </div>
                        <CustomTab id="7571" className="tab-padding-top">
                            {/**图形 */}
                            <CustomTabPane>
                                {/**趋势分析 */}
                                <CustomTab id="7572">
                                    <CustomTabPane>
                                        <div style={{ position: 'relative', left: `${i18n.getLocalLanguage()==='zh_CN'?'88px':'123px'}`, zIndex: '10', top: '-32px', height: 0, display: 'flex' }}>
                                            <Filter id="7573" />
                                            <Filter id="7574" className="common-margin-left" />
                                        </div>
                                        <CustomChart id="7575" />
                                    </CustomTabPane>
                                </CustomTab>
                            </CustomTabPane>
                            {/**表格 */}
                            <CustomTabPane>
                                <Filter id='7576' />
                                <CustomTable id="7577" />
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