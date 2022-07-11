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
import ComponentProps from '@componentProps/config'
import Table from '@table/config'
import DrawerChart from '@drawerChart/config';
import LinkTo from '@/page/component/url/config';
import RsIcon from '@/page/component/rsIcon';
import Img from '@/components/Img'


import './index.less'

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

    renderTableColmns = (columns) => {
        return columns.map(v => {
            const { dataIndex } = v
            if (dataIndex == 'product_name') {
                v.render = (text, record) => {
                    let { product_pic, product_url, top5_flag } = record;
                    return (<div style={{ display: "flex" }}>
                        {/* <img className="img" src={product_pic} /> */}
                        <Img className="img" src={product_pic} />
                        <div className='img-title' style={{}}><a href={product_url} target="_blank" className="">{text}</a></div>
                        <div style={{ lineHeight: "50px" }}>
                            {top5_flag == 1 && <RsIcon type="icon-shangpinpaiming" style={{ fontSize: "17px", color: "#ff8d1a", width: 20 }} />}
                        </div>
                    </div>);
                }
            }
            return v
        })
    }
    getComponentProps = (pageInfo) => {
        return { ...JSON.parse(pageInfo.resAttr), ...pageInfo }
    }

    paramRender = (params, record) => {
        let product_id = record.product_id,
            shop_dimension = record.shop_dimension;
        return Object.assign({}, params, { product_id, shop_dimension });
    }

    render() {
        const { pageInfo, resAttr } = this.state;
        if (!pageInfo) return null;
        return (
            <div className='scroll-inner'>
                <ComponentProps id='218' data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
                <Custom_Date id='209' style={{ marginRight: '24px' }} />
                <CustomSelect id='9907' style={{ marginRight: '24px' }} />
                <CustomSelect id='210' />
                <div style={{ display: 'flex', margin: '8px 0', alignItems: 'center', borderBottom: '1px solid #E1E8F0' }}>
                    <CompanyTitle id='211' />
                    <UpdateTime style={{ marginLeft: '16px' }} id='212' />
                </div>
                <CustomTab id='213' style={{ paddingTop: '8px' }} >
                    <CustomTabPane>
                        <div style={{ minHeight: '500px' }}>
                            <Filter id='214' style={{ width: '300px' }} />
                            <Table columnsRender={this.renderTableColmns} id='216' />
                            <DrawerChart id="217" paramRender={this.paramRender} />
                            {/* <LinkTo id="9301"></LinkTo> */}
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