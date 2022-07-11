'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd'
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
import DrawerChart from '@drawerChart/config';
import Hide from '@hide/config';
import FixedParam from '@fixedParam'
import Exhibition from '@exhibition/config'
import Radio from '@radio/config'

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
            <div className='industry-page'>
                <ComponentProps id="398" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <div style={{ display: "none" }}>
                    <Custom_Date id='436' />
                    <Custom_Date id='437' />
                </div>
                <CustomTab id="399" position="top-outside">
                    <CustomTabPane>
                        <div className="company-title-wrapper">
                            <div style={{ display: 'none' }}><CustomSelect id='523' /></div>
                            <CompanyTitle id='400' />
                            <UpdateTime id='542' className="common-margin-left" />
                        </div>
                        <div className='industry-exhibition-wrapper'>
                            <Exhibition id='401' />
                        </div>
                        {/* <div className='industry-chart-wrapper'> */}
                        <Chart id='405' />
                        {/* </div> */}
                    </CustomTabPane>
                    <CustomTabPane>
                        <div className="company-title-wrapper">
                            <div style={{ display: 'none' }}><CustomSelect id='523' /></div>
                            <CompanyTitle id='406' />
                            <UpdateTime id='407' className="common-margin-left" />
                            <div style={{ flex: '1 0 auto', textAlign: 'right' }}><Radio id='9745' /></div>
                        </div>
                        <div className='industry-exhibition-wrapper'>
                            <Exhibition id='408' />
                        </div>
                        <div className='industry-chart-wrapper'>
                            <Chart id='410' />
                        </div>
                        <Row style={{ margin: "10px 0px 0 0" }}>
                            <Col span={8}>
                                <div style={{ border: '1px solid #E1E8F0', borderRadius: '8px', padding: '10px', marginRight: "8px" }}>
                                    <div className="industry-subtitle-wrapper">
                                        <CompanyTitle id='528' />
                                        <div>
                                            <UpdateTime id='529' style={{ display: 'block' }} />
                                        </div>

                                    </div>
                                    <Chart id='411' />
                                </div>
                            </Col>
                            <Col span={8}>
                                <div style={{ border: '1px solid #E1E8F0', borderRadius: '8px', padding: '10px', margin: "0 8px" }}>
                                    <div className="industry-subtitle-wrapper">
                                        <CompanyTitle id='530' />
                                        <div>
                                            <UpdateTime id='531' style={{ display: 'block' }} />
                                        </div>
                                    </div>
                                    <Chart id='412' />
                                </div>
                            </Col>
                            <Col span={8}>
                                <div style={{ border: '1px solid #E1E8F0', borderRadius: '8px', padding: '10px', marginLeft: "8px" }}>
                                    <div className="industry-subtitle-wrapper">
                                        <CompanyTitle id='532' />
                                        <div>
                                            <UpdateTime id='533' style={{ display: 'block' }} />
                                        </div>
                                    </div>
                                    <Chart id='413' />
                                </div>
                            </Col>
                        </Row>
                    </CustomTabPane>
                    <CustomTabPane>
                        <div className="company-title-wrapper">
                            <div style={{ display: 'none' }}><CustomSelect id='523' /></div>
                            <CompanyTitle id='414' />
                            <UpdateTime id='415' className="common-margin-left" />
                        </div>
                        <div className='industry-exhibition-wrapper'>
                            <Exhibition id='416' />
                        </div>
                        {/* <div className='industry-chart-wrapper'> */}
                        <Chart id='419' />
                        {/* </div> */}
                    </CustomTabPane>
                    <CustomTabPane>
                        <div className="company-title-wrapper">
                            <div style={{ display: 'none' }}><CustomSelect id='523' /></div>
                            <CompanyTitle id='420' />
                            <UpdateTime id='421' className="common-margin-left" />
                        </div>
                        <div className='industry-exhibition-wrapper'>
                            <Exhibition id='422' />
                        </div>
                        {/* <div className='industry-chart-wrapper'> */}
                        <Chart id='425' />
                        {/* </div> */}
                    </CustomTabPane>
                    <CustomTabPane>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='427' />
                            <UpdateTime id='428' className="common-margin-left" />
                        </div>
                        <div className='industry-exhibition-wrapper'>
                            <Exhibition id='429' />
                        </div>
                        <Chart id='432' />
                    </CustomTabPane>
                </CustomTab>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;