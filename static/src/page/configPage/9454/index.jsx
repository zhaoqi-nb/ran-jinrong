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
import FilterOption from '@filterOption/config'
import CustomCheckbox from '@checkbox/config'
import ComponentProps from '@componentProps/config'
import Chart from '@chart/config'
import Table from '@table/config';
import FixedParam from '@fixedParam'
import Tooltip from '../../component/chart/common/Tooltip';
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
                privilegeDtoList = pageInfo.privilegeDtoList,
                stock_code = resAttr.stock_code;

            this.setState({ pageInfo, resAttr, stock_code });
        }
    }
    getComponentProps = (pageInfo) => {
        // , stock_code: '6618.HK', menuName: '京东健康' 
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo }
    }

    handleRender = (param, option, chartData) => {
        const _this = this;
        let name = null
        if (option) {
            try {
                let nameFlag = option.series[0].name.split('(')
                if (nameFlag && nameFlag.length > 1) {
                    name = nameFlag[1].replace(')', '')
                    option.yAxis[0].name = name
                }

                option.yAxis[0].axisLabel.formatter = (value, index) => {
                    return _this.formatData(param, value)
                }
                option.tooltip.formatter = (data) => {
                    let result = { title: '', values: [] }
                    let html = [];
                    data.forEach((item, index) => {
                        if (!index) {
                            let label = item.axisValueLabel;
                            html.push(`${label}<br/>`);
                            result.title = label
                        }
                        let value = _this.formatData(param, item.data[1])
                        html.push(`${item.marker} ${item.seriesName}: ${value}<br/>`);
                        result.values.push([item.marker, item.seriesName, value, '#c23531'])
                    })

                    // return html.join('');
                    return Tooltip({ params: result })
                }
            } catch (error) {
                console.log(error)
            }
        }
        return option;
    }

    render() {
        const { pageInfo } = this.state;
        if (!pageInfo) return null;
        return (
            <div>
                <ComponentProps id="9456" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="9457" position="top-outside">
                    <CustomTabPane>
                        <div className='company-title-wrapper'>
                            <CompanyTitle id='9455' />
                            {/* <UpdateTime style={{ marginLeft: '16px' }} id='6986' /> */}
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <FilterOption id="9459" />
                        </div>
                        <div style={{ marginTop: 10 }}>
                            <FilterOption id="9460" />
                            <FilterOption id="9461" style={{ marginLeft: 25 }} />
                        </div>
                        <FixedParam id="9458" />
                        <Chart id="9462" />
                        <Table id="9463" />
                    </CustomTabPane>
                    {/* <CustomTabPane>
                        <Filtrate id="5309" />
                        <Row>
                            <Col span={12}>
                                <Filtrate id="5310" />
                            </Col>
                            <Col span={12}>
                                <Filtrate id="5481" />
                            </Col>
                        </Row>
                        <FixedParam id="5328" />
                        <LineChart id="5311" optionRender={this.handleRender} />
                        <CustomTable id="5312" />
                    </CustomTabPane> */}
                </CustomTab>
            </div>
        );
    }

}

Index.propTypes = {

};

export default Index;