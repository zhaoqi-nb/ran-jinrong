'use strict';

import React from 'react';
import _ from 'lodash';
import { message, Spin } from 'antd';
import PropTypes from 'prop-types';
import Component from '../util/component';
import EditTemplate from '../util/editTemplate/index';
import GlobalSearch from '@/components/GlobalSearch';
import Api from './store/api';

import { getUserInfoData } from '@/page/component/page/util';
import { getTemplateData, getKeyPrivilege } from '../util/template';

import './style.less';
import api from './store/api';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  componentWillReceiveProps(nextProps) {
  }

  getInitialState = () => {
    return {
      //组件状态  WillMount/挂载前（组件还未渲染）, InMount/挂载中（组件执行渲染，可能需要获取数据才可以初始化好）  DidMount/挂载完成（组件准备就绪）   
      componentState: "WillMount",
      instantiationId: null,
      //组件数据
      templateData: null,
      //受控元素
      controlledElement: null,
      effectElement: null,
      childrenVisible: false,
      searchType: null,
      hotList: [],
      searchList: [],
      historyList: [],
      value: '',
      record: {}
    }
  }

  queryComponentData = async () => {
    const { id } = this.props;
    const tempData = getTemplateData(id);
    const templateProperty = _.get(tempData, 'templatePropertyValueJson', {});
    const state = {
      componentState: tempData ? 'DidMount' : 'InMount',
      instantiationId: tempData.instantiationId,
      templateData: templateProperty,
      controlledElement: _.get(templateProperty, 'controlledElement', []),
      effectElement: _.get(templateProperty, 'effectElement', []),
      searchType: _.get(templateProperty, 'searchType', null),
      userInfo: getUserInfoData()
    }

    let privilegeData = _.get(getKeyPrivilege("show_data_app_id"), `${state.instantiationId}.data`, []);;
    const industryPrivilege = _.join(privilegeData, ',')

    this.setState({ ...state, industryPrivilege }, () => {
      this.getHotList();
      this.getHistoryList();
    })
  }

  renderLoading = () => {
    return <Spin tip="Loading..." />
  }

  getHotList = async () => {
    const { searchType } = this.state;
    const res = await Api.getEcommerceHotList({ searchType })
    const data = _.get(res, 'data.result.list', []);
    this.setState({
      hotList: _.map(data, item => ({
        label: item.name,
        value: item.code
      }))
    })
  }

  getHistoryList = async () => {
    const { searchType, userInfo, industryPrivilege } = this.state;
    const res = await Api.getEcommerceSearchHistoryList({
      search_type: searchType,
      operatorId: userInfo.sysUserId,
      platform_codes: industryPrivilege,
    })
    const data = _.get(res, 'data.result.list', []);
    this.setState({
      historyList: _.map(data, item => ({
        label: item.name,
        value: item.code
      }))
    })
  }

  getSearchList = async (search) => {
    const { searchType, userInfo, industryPrivilege } = this.state;
    const res = await Api.getSearchList({
      search_type: searchType,
      operatorId: userInfo.sysUserId,
      platform_codes: industryPrivilege,
      search_key: search
    })
    const data = _.get(res, 'data.result.list', []);
    this.setState({
      searchList: _.map(data, item => ({
        label: item.name,
        value: item.code
      }))
    })
  }

  handleChange = (value) => {
    if (value === '') {
      this.getHistoryList()
    }
    this.setState({ value }, () => {
      this.getSearchList(value)
    })
    // this.setState({ childrenVisible: true }, () => {
    //   this.getSearchList(value)
    // })
  }

  handleSearch = (value) => {
    console.log('valuevaluevaluevaluevalue', value);
  }

  //对外提供参数方法
  exportParamFun = () => {
    const { componentState } = this.state;
    if (componentState != "DidMount") return;
    const { record, searchType } = this.state;
    return {
      search_type: searchType,
      item_id: record.value
    }
  }

  handleClickItem = (record) => {
    if (!this.state.value || !record.label.includes(this.state.value)) {
      this.getSearchList(record.label)
    }
    this.setState({ value: record.label, record, childrenVisible: true }, () => {
      this.triggerLoadData(record)
    })
  }

  handleClearHistory = () => {
    const { searchType, userInfo } = this.state;
    Api.delEcommerceSearchHistoryList({
      search_type: searchType,
      operatorId: userInfo.sysUserId,
    }).then(() => {
      message.success('清空成功~')
      this.getHistoryList()
    })
  }

  render() {
    const { componentState, instantiationId } = this.state;
    if (componentState == "WillMount") return null;
    else if (componentState == "InMount") return this.renderLoading();

    const { childrenVisible, hotList, historyList, searchList, value } = this.state;

    const containerStyle = !childrenVisible ? {
      position: "absolute",
      top: '0',
      left: '0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      height: "100%",
      paddingTop: '10%',
      background: `url(./img/bg.png)`
    } : {}

    const headerStyle = childrenVisible ? {
      display: 'none'
    } : {}

    //渲染内容
    return <EditTemplate instantiationId={instantiationId} >
      <div className='global-search-wrapper' style={containerStyle}>
        <div className='header' style={headerStyle}>
          <span className='line left'></span>
          <span className='title'>{i18n.format('品牌搜索')}</span>
          <span className='line right'></span>
        </div>
        <GlobalSearch
          style={{ width: "60%" }}
          value={value}
          placeholder={i18n.format('请输入品牌名称')}
          showSuffix={false}
          childrenVisible={childrenVisible}
          hotList={hotList}
          historyList={historyList}
          searchList={searchList}
          onChange={_.debounce(this.handleChange, 600)}
          // onChange={this.handleChange}
          onSearch={this.handleSearch}
          onClickItem={this.handleClickItem}
          onClearHistory={this.handleClearHistory}
        >
          {this.props.children}
        </GlobalSearch>
      </div>
    </EditTemplate>
  }
}

Index.propTypes = {
  id: PropTypes.number.isRequired,
};

Index.defaultProps = {
  style: {}
}

export default Index;
