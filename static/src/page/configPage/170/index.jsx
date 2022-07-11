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
import Table from '@table/config';
import ComponentProps from '@componentProps/config'
import LinkTo from '@/page/component/url/config';

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

    titleRender = (obj, option) => {
        if (option.platform_code == 1) obj.titleRight = '平台：天猫+京东'
        else if (option.platform_code == 2) obj.titleRight = '平台：天猫+京东+抖音'
        return obj
    }
    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;
        return (
            <div>
                <ComponentProps id="171" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <div>
                    <Custom_Date id='172' style={{ marginRight: '24px' }} />
                    <CustomSelect id='173' style={{ marginRight: '24px' }} />
                    <CustomSelect id='174' style={{ marginRight: '24px' }} select_style={{ width: "300px" }} />
                </div>

                <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center', borderBottom: '1px solid #E1E8F0' }}>
                    <CompanyTitle id='175' />
                    <UpdateTime style={{ marginLeft: '16px' }} id='176' />
                </div>
                <CustomTab id="177" style={{ paddingTop: '8px' }}>
                    <CustomTabPane>
                        <div style={{ minHeight: '500px' }}>
                            <Filter id='178' style={{ width: '300px' }} />
                            <Table id='179' titleRender={this.titleRender} />
                            {/* <LinkTo id="9289"></LinkTo> */}
                        </div>
                    </CustomTabPane>
                </CustomTab>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;