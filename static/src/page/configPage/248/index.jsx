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
import ComponentProps from '@componentProps/config'
import Chart from '@chart/config';
import Table from '@table/config';
import { transTableDateType, unitTransformation } from '../../component/util/format/number';
import { formaDate } from '../../component/util/format/date';
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
            resAttr: null,
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
            let pageInfo = menu.pageInfo;
            let resAttr = pageInfo.resAttr,
                privilegeDtoList = pageInfo.privilegeDtoList;
            this.setState({ pageInfo, resAttr });
        }
    }
    getComponentProps = (pageInfo) => {
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo }
    }

    handleOnLineRender = (option, chartData, param) => {
        const transformData = (obj) => {
            if (!obj) return [];
            let data = [];
            for (let key in obj) {
                let temp = obj[key];
                if (temp.text) data.push({ name: i18n.format('发布笔记的头部达人'), value: temp.text, xAxis: key, yAxis: temp.value })
            }
            return data;
        }

        if (option.series && option.series[0]["markPoint"]) {
            option.series[0]["markPoint"]["label"]["show"] = false;
            option.series[0]["markPoint"]["data"] = transformData(option.series[0]["markPoint"]["data"])
        }
        option.tooltip.formatter = (params) => {
            let html = [];
            let result = { title: '', values: [] }
            params.forEach((item, index) => {
                if (!index) {
                    let label = formaDate(item.axisValueLabel, { "dateType": param.date_type });
                    html.push(`${label}<br/>`);
                    result.title = label
                }
                let value = unitTransformation(item.data[1], '万', 0);//(item.data[1],{divide:10000, bit_number:0,thousands:true});
                html.push(`${item.marker} ${item.seriesName}: ${value}<br/>`);
                result.values.push([item.marker, item.seriesName, value])
                if (item.data[2]) {
                    let nameArr = item.data[2].split('、')
                    let nameString = ''
                    if (nameArr.length > 8) {
                        // nameString = '<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
                        nameArr.forEach((v, i) => {
                            if (i % 5 == 0 && i > 0) {
                                nameString += v + '、' //+ '<br/>&nbsp;&nbsp;&nbsp;&nbsp;'
                            } else {
                                nameString += v + '、'
                            }
                        })
                    } else {
                        nameArr.forEach((v, i) => {
                            nameString += v + '、'
                        })
                    }

                    if (nameString[nameString.length - 1] == '、') {
                        nameString = nameString.substring(0, nameString.length - 1)
                    }
                    html.push(`${item.marker} ${i18n.format("发布笔记的头部达人")}: ${nameString}<br/>`);
                    result.values.push([item.marker, i18n.format("发布笔记的头部达人"), nameString, '#c23531'])
                }
            })

            // return html.join('');
            return Tooltip({ params: result })
        }
        option.series[0].name = i18n.format('线上销售额(万)');
        option.yAxis[0].name = i18n.format('线上销售额(万)');

        console.log("option====", option);
        return option;
    }

    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;
        return (
            <div >
                <ComponentProps id="249" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <CustomTab id="250" position="top-outside">
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='251' style={{ marginRight: '24px' }} />
                            <CustomSelect id='252' style={{ marginRight: '50px' }} />
                        </div>
                        <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center', borderBottom: '1px solid #E1E8F0' }}>
                            <CompanyTitle id='253' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='254' />
                        </div>
                        <Chart id="255" optionRender={this.handleOnLineRender} />
                        <FilterOption id='256' style={{ marginTop: "10px" }} />
                        {/* <FilterOption id='543'/> */}
                        <Chart id="257" />
                        <Table id="258" />
                    </CustomTabPane>
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='259' style={{ marginRight: '24px' }} />
                            <CustomSelect id='260' style={{ marginRight: '24px' }} />
                        </div>
                        <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center', borderBottom: '1px solid #E1E8F0' }}>
                            <CompanyTitle id='261' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='262' />
                        </div>
                        <CustomTab id="263" style={{ paddingTop: '8px' }}>
                            <CustomTab id="697">
                                <CustomTabPane>
                                    <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0 }}>
                                        <Filter id='267' />
                                    </div>
                                    <Chart id="268" />
                                </CustomTabPane>
                                <CustomTabPane>
                                    <div style={{ position: 'relative', left: `${i18n.getLocalLanguage() === 'zh_CN' ? '160px' : '250px'}`, zIndex: '10', top: '-32px', height: 0 }}>
                                        <Filter id='9137' style={{ width: '300px' }} />
                                        <Filter id='269' style={{ width: '300px' }} style_btn={{ marginLeft: '16px' }} />
                                    </div>
                                    <Chart id="271" />
                                </CustomTabPane>
                            </CustomTab>
                            <CustomTabPane>
                                <Filter id='273' style={{ width: '300px' }} />
                                <Table id="274" />
                            </CustomTabPane>
                            <CustomTabPane>
                                <CustomSelect id='264' style={{ marginTop: '0' }} />
                                <Chart id="265" />
                                <Table id="266" />
                            </CustomTabPane>
                        </CustomTab>
                    </CustomTabPane>
                    <CustomTabPane>
                        <div>
                            <Custom_Date id='340' style={{ marginRight: '24px' }} />
                        </div>
                        <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center', borderBottom: '1px solid #E1E8F0' }}>
                            <CompanyTitle id='341' />
                            <UpdateTime style={{ marginLeft: '16px' }} id='342' />
                        </div>
                        <CustomTab id="343">
                            <CustomTabPane>
                                <CustomSelect id='344' />
                                <Chart id="345" />
                                <Table id="346" />
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