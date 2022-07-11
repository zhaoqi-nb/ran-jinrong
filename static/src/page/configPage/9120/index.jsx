'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import { CustomTab, CustomTabPane } from '@tab/config'
import CustomSelect from '@select/config';
import Custom_Date from "@date/config";
import CompanyTitle from '@title/config';
import Filter from '@filter/config'
import ComponentProps from '@componentProps/config'
import Chart from '@chart/config'
import Table from '@table/config';
import Jump from '@jump/config';
import FilterOption from '@filterOption/config'
import Explain from '@explain'
import LinkTo from '@/page/component/url/config';
import FixedParam from '@fixedParam'
import DownExcel from '@downExcel/common/index';
import { getData } from '../../component/util/template'

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
                ifDownload = getData('ifDownload', privilegeDtoList);

            this.setState({ pageInfo, resAttr, ifDownload });
        }
    }
    getComponentProps = (pageInfo) => {
        // , menuName: '安踏', stock_code: "603486.SH"
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo }
    }

    // handleRender = (param, option, chartData) => {
    //     const _this = this;
    //     let name = null
    //     if (option) {
    //         try {
    //             let nameFlag = option.series[0].name.split('(')
    //             if (nameFlag && nameFlag.length > 1) {
    //                 name = nameFlag[1].replace(')', '')
    //                 option.yAxis[0].name = name
    //             }

    //             option.yAxis[0].axisLabel.formatter = (value, index) => {
    //                 return _this.formatData(param, value)
    //             }
    //             option.tooltip.formatter = (data) => {
    //                 let html = [];
    //                 data.forEach((item, index) => {
    //                     if (!index) {
    //                         let label = item.axisValueLabel;
    //                         html.push(`${label}<br/>`);
    //                     }
    //                     let value = _this.formatData(param, item.data[1])
    //                     html.push(`${item.marker} ${item.seriesName}: ${value}<br/>`);
    //                 })

    //                 return html.join('');
    //             }
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     return option;
    // }

    render() {
        const { pageInfo, resAttr, ifDownload } = this.state;
        if (!pageInfo) return null;;
        return (
            <div >
                <ComponentProps id="9121" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <Custom_Date id="9140" style={{ display: 'none' }} />
                <Custom_Date id="9141" style={{ display: 'none' }} />
                <CustomTab id="9122" position="top-outside">
                    {/**营收对比  */}
                    <CustomTabPane>
                        <div style={{ margin: '10px 0 10px 0' }}>
                            <FilterOption id='9123' style={{ width: '300px' }} />
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <FilterOption id='9124' style={{ width: '300px' }} />
                        </div>
                        <div style={{ marginBottom: 10, display: 'flex' }}>
                            <FilterOption id='9749' style={{ marginRight: 48 }} />
                            <FilterOption id='9125' style={{ width: 'auto' }} />
                        </div>
                        <FixedParam id="9703" />
                        <Chart id="9126" />
                        <Table id="9127" />
                    </CustomTabPane>
                    {/**线上数据对比  */}
                    <CustomTabPane>
                        <CompanyTitle id='9128' />
                        <span style={{ float: 'right', marginTop: 13 }}>
                            {ifDownload && ifDownload.show ? <DownExcel downPage config={{ show: true, dataType: "table" }} /> : null}
                        </span>
                        <div className="explain">
                            <Explain id="9129" ifShowIcon={false} style={{ margin: '0 0 10px 0' }} />
                        </div>
                        {/* <CompanyTitle id='9130' /> */}
                        {/* */}
                        <div style={{ marginTop: -30 }}>
                            <Filter id='9131' style_btn={{ display: "none" }} />
                            <Table id="9132" />
                        </div>
                        <LinkTo id="9136"></LinkTo>
                    </CustomTabPane>
                    {/* 旧的线上数据对比 */}
                    <CustomTabPane>
                        <div style={{ margin: "10px 0 10px 0" }}>
                            <FilterOption id="9504" />
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <FilterOption id="9645" />
                            <FilterOption id="9646" style={{ marginLeft: 25 }} />
                        </div>
                        <FixedParam id="9647" />
                        {/* optionRender={this.handleRender} */}
                        <Chart id="9648" />
                        <Table id="9649" />
                    </CustomTabPane>
                </CustomTab>
                {/* <Jump id='9136' /> */}
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;