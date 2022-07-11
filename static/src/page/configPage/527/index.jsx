'use strict';

import React, { Component } from 'react';
import i18n from '@/plugin/i18n';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd'
import { CustomTab, CustomTabPane } from '@tab/config'
import Custom_Date from "@date/config";
import CustomSelect from '@select/config';
import CompanyTitle from '@title/config';
import ComponentProps from '@componentProps/config'
import Table from '@table/config';

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

  processingColumns = (columns, dataSource, mapping, ajaxParams) => {
    if (!columns || !columns.length) return columns;

    return columns.map((item, index) => {
      let dataIndex = item.dataIndex;
      if (dataIndex == "goods_name") {
        item.render = this.renderProduct;
      }
      return item;
    });
  }

  renderProduct = (text, record) => {
    const { goods_url, goods_pic } = record;
    return (<div style={{ display: "flex", alignItems: "center" }}>
      <img style={{ width: 100, height: 100 }} src={goods_pic} />
      <div style={{ flex: 1, textAlign: "left", lineHeight: "25px", fontSize: 13, marginLeft: 8 }}><Tooltip title={text}><a href={goods_url} target="_blank" className="goodsName">{text}</a></Tooltip></div>
    </div>);
  }

  render() {
    const { pageInfo, resAttr } = this.state;
    if (!pageInfo) return null;
    return (
      <div >
        <ComponentProps id="535" data={pageInfo.resAttr ? this.getComponentProps(pageInfo) : null} />
        <CustomTab id="537" position="top-outside">
          <CustomTabPane>
            <div>
              <Custom_Date id='538' style={{marginRight: '24px'}}/>
              <div style={{display: 'inline-block', marginRight: '24px'}}>
              <CustomSelect id='539'  />
              <CustomSelect id='540'  />
              </div>
              <CustomSelect id='691' />
            </div>
            <div style={{ display: 'flex', padding: '8px 0', alignItems: 'center' }}>
              <CompanyTitle id='534' />
            </div>
            <Table id="541" columnsRender={this.processingColumns} />
          </CustomTabPane>
        </CustomTab>
      </div>
    );
  }
}

Index.propTypes = {

};

export default Index;