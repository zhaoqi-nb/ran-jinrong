'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import Custom_Date from "@date/config";
import CustomSelect from '@select/config';
import CompanyTitle from '@title/config';
import UpdateTime from '@updateTime/config'
import Filter from '@filter/config'
import ComponentProps from '@componentProps/config'
import CustomTable from '@table/config'
import DrawerChart from '@drawerChart/config';

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

    renderTableColmns = (columns) => {
        return columns.map(v => {
            const { dataIndex } = v
            if (dataIndex == 'goods_name') {
                v.render = (text, record, index) => {
                    let src = record.goods_pic;
                    let href = record.goods_url;
                    let is_top100 = record.is_top100;
                    return (<div style={{ display: "flex" }}>
                        <img className="img" style={{ height: "100px", width: "100px" }} src={src} />
                        <div style={{ flex: 1, textAlign: "left", lineHeight: "25px", fontSize: 13, marginLeft: 8 }}>
                            <span className="best-icon">{is_top100 == "1" ? <img src={require("../../image/best_icon.png")} style={{ marginBottom: 5 }} /> : ""}</span>
                            <a href={href} target="_blank" className="">{text}</a>
                        </div>
                    </div>);
                }
            }
            return v
        })
    }

    paramRender = (params, record) => {
        let goods_id = record.goods_id;
        return Object.assign({}, params, { goods_id });
    }

    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;

        return (
            <div >
                <ComponentProps id='520' data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <Custom_Date id='521' />
                <CustomSelect id='519' style={{ marginLeft: '24px' }} />
                <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center'}} >
                    <CompanyTitle id='518' />
                    <UpdateTime style={{ marginLeft: '16px' }} id='522' />
                </div>
                <Filter id='524' style_btn={{ display: 'none' }} style={{ width: '300px'}} />
                <CustomTable columnsRender={this.renderTableColmns} id='525' />
                <DrawerChart id="526" paramRender={this.paramRender} />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;