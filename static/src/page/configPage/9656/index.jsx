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
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo, stock_code: '9992.HK', menuName: "泡泡玛特" }
    }

    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;
        return (
            <div className='industry-page'>
                <ComponentProps id="9657" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <div style={{ display: "none" }}>
                    <Custom_Date id='9692' />
                    <Custom_Date id='9693' />
                </div>
                <CustomTab id="9658" position="top-outside">
                    <CustomTabPane>
                        <div className="company-title-wrapper">
                            <div style={{ display: 'none' }}><CustomSelect id='9695' /></div>
                            <CompanyTitle id='9659' />
                            <UpdateTime id='9702' className="common-margin-left" />
                        </div>
                        <div className='industry-exhibition-wrapper'>
                            <Exhibition id='9660' />
                        </div>
                        {/* <div className='industry-chart-wrapper'> */}
                        <Chart id='9664' />
                        {/* </div> */}
                    </CustomTabPane>
                    <CustomTabPane>
                        <div className="company-title-wrapper">
                            <div style={{ display: 'none' }}><CustomSelect id='9695' /></div>
                            <CompanyTitle id='9665' />
                            <UpdateTime id='9666' className="common-margin-left" />
                            <div style={{ flex: '1 0 auto', textAlign: 'right' }}><Radio id='9748' /></div>
                        </div>
                        <div className='industry-exhibition-wrapper'>
                            <Exhibition id='9667' />
                        </div>
                        <div className='industry-chart-wrapper'>
                            <Chart id='9669' />
                        </div>
                        <Row style={{ margin: "10px 0px 0 0" }}>
                            <Col span={8}>
                                <div style={{ border: '1px solid #E1E8F0', borderRadius: '8px', padding: '10px', marginRight: "8px" }}>
                                    <div className="industry-subtitle-wrapper">
                                        <CompanyTitle id='9696' />
                                        <div>
                                            <UpdateTime id='9697' style={{ display: 'block' }} />
                                        </div>

                                    </div>
                                    <Chart id='9670' />
                                </div>
                            </Col>
                            <Col span={8}>
                                <div style={{ border: '1px solid #E1E8F0', borderRadius: '8px', padding: '10px', margin: "0 8px" }}>
                                    <div className="industry-subtitle-wrapper">
                                        <CompanyTitle id='9698' />
                                        <div>
                                            <UpdateTime id='9699' style={{ display: 'block' }} />
                                        </div>
                                    </div>
                                    <Chart id='9671' />
                                </div>
                            </Col>
                            <Col span={8}>
                                <div style={{ border: '1px solid #E1E8F0', borderRadius: '8px', padding: '10px', marginLeft: "8px" }}>
                                    <div className="industry-subtitle-wrapper">
                                        <CompanyTitle id='9700' />
                                        <div>
                                            <UpdateTime id='9701' style={{ display: 'block' }} />
                                        </div>
                                    </div>
                                    <Chart id='9672' />
                                </div>
                            </Col>
                        </Row>
                    </CustomTabPane>
                    <CustomTabPane>
                        <div className="company-title-wrapper">
                            <div style={{ display: 'none' }}><CustomSelect id='9695' /></div>
                            <CompanyTitle id='9673' />
                            <UpdateTime id='9674' className="common-margin-left" />
                        </div>
                        <div className='industry-exhibition-wrapper'>
                            <Exhibition id='9675' />
                        </div>
                        {/* <div className='industry-chart-wrapper'> */}
                        <Chart id='9678' />
                        {/* </div> */}
                    </CustomTabPane>
                    <CustomTabPane>
                        <div className="company-title-wrapper">
                            <div style={{ display: 'none' }}><CustomSelect id='523' /></div>
                            <CompanyTitle id='9679' />
                            <UpdateTime id='9680' className="common-margin-left" />
                        </div>
                        <div className='industry-exhibition-wrapper'>
                            <Exhibition id='9681' />
                        </div>
                        {/* <div className='industry-chart-wrapper'> */}
                        <Chart id='9684' />
                        {/* </div> */}
                    </CustomTabPane>
                    <CustomTabPane>
                        <div className="company-title-wrapper">
                            <CompanyTitle id='9686' />
                            <UpdateTime id='9687' className="common-margin-left" />
                        </div>
                        <div className='industry-exhibition-wrapper'>
                            <Exhibition id='9688' />
                        </div>
                        <Chart id='9691' />
                    </CustomTabPane>
                </CustomTab>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;