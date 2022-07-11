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
                <ComponentProps id="8078" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <Custom_Date id="8041" />
                <div className="company-title-wrapper">
                    <CompanyTitle id="8042" />
                    <UpdateTime style={{ marginLeft: '16px' }} id="8043" />
                </div>
                <CustomTab id="8044" className="tab-padding-top">
                    <CustomTabPane>
                        <CustomSelect id="8045" select_style={{ marginRight: '16px' }} />
                        <Filter id="8046" style={{ width: '300px' }} />
                        <CustomChart id="8047" />
                    </CustomTabPane>
                    <CustomTabPane>
                        <Filter id="8048" style={{ width: '300px' }} style_btn={{ marginTop: '8px' }} />
                        <CustomTable id="8059" />
                    </CustomTabPane>
                </CustomTab>
                <Jump id="8079" />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;