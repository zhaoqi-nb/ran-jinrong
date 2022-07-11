'use strict';

import React from 'react';
import _ from 'lodash';
import { message, Spin } from 'antd';
import PropTypes from 'prop-types';
import Component from '../util/component';
import EditTemplate from '../util/editTemplate/index';
import FilterGroup from '@/components/FilterGroup';
import Api from './store/api';

import { getTemplateData, getKeyPrivilege, getPrivilegeData } from '../util/template';
import { getExcelData } from './uti';

// import data from './demo.json';

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
      headerOption: null,
      showHeader: true,
      headerValue: undefined,

      groupOptions: [],
      filterValue: {},
      privilegeFilterValue: {},
      //是否展示筛选内容
      ifHideResult: null,
    }
  }

  queryComponentData = () => {
    const { id } = this.props;

    const tempData = getTemplateData(id);
    const templateProperty = _.get(tempData, 'templatePropertyValueJson', {});
    const state = {
      componentState: tempData ? 'DidMount' : 'InMount',
      instantiationId: tempData.instantiationId,
      templateData: templateProperty,
      controlledElement: _.get(templateProperty, 'controlledElement', []),
      effectElement: _.get(templateProperty, 'effectElement', []),
      groupOptionsConfig: _.get(templateProperty, 'groupOptions', []),
      headerOption: _.get(templateProperty, 'headerOption', null),
      showHeader: _.get(templateProperty, 'showHeader', true),
      headerValue: _.get(templateProperty, 'defaultHeaderValue', undefined),
      headerParamKey: _.get(templateProperty, 'headerParamKey', null),
      filterValue: _.get(templateProperty, 'defaultFilterValue', {}),

      ifHideResult: _.get(templateProperty, 'ifHideResult', false),
    }

    const privilegeKeys = _.chain(state.groupOptionsConfig)
      .map(t => t.privilegeKey)
      .filter(t => t)
      .value()
    const privilegeConf = getPrivilegeData(privilegeKeys)
    this.setState({
      ...state,
      privilegeKeys,
      privilegeConf
    }, this.getGroupData)
  }

  getGroupData = async () => {

    const { groupOptionsConfig } = this.state;

    // 配置化的数据  
    const otherOptions = _.filter(groupOptionsConfig, t => (t.type !== 'cascader' && !t.requestType));

    // 级联数据
    const cascaderOptionsConfig = _.filter(groupOptionsConfig, t => t.type === 'cascader');
    const cascaderOptions = await this.getCascaderData(cascaderOptionsConfig)

    // 请求id的
    let cinfigOptions = _.filter(groupOptionsConfig, t => t.requestType);
    if (cinfigOptions.length) {
      cinfigOptions = await this.getConfigData(cinfigOptions)
    }

    this.setState({ groupOptions: [...cascaderOptions, ...cinfigOptions, ...otherOptions] })
    return Promise.resolve(true)
  }

  fetchConfigData = (option) => {
    const params = this.getApiParam();
    if (!_.isNil(option.instantiationId) && _.isNil(option.url)) {
      return Api.getGroupOptions({
        instantiationId: option.instantiationId,
        params
      })
    } else {
      return Api.getTopBrandTag({
        instantiationId: option.instantiationId,
        date_type: params.date_type
      })
    }

  }

  getConfigData = async (options) => {
    const { privilegeConf } = this.state;

    const promiseList = _.map(options, async (option) => {
      if (_.isNil(option.instantiationId) && _.isNil(option.url)) {
        return option;
      }
      const privilegeKey = option.privilegeKey;

      const isNoLimit = _.includes(privilegeKey, 'no_limit');
      const privilegeData = _.get(privilegeConf, `${privilegeKey}.data`, []);
      const res = await this.fetchConfigData(option)
      const data = _.get(res, 'data.result.list');
      let children = _.chain(data)
        .map((item) => ({
          label: item.name,
          value: item.code
        }))
        .filter((item) => item.label != "全部")
        .value()
      let showAll = option.showAll;
      if (_.size(privilegeData)) {
        showAll = false;
        children = _.map(children, child => ({
          ...child,
          disabled: isNoLimit ? _.includes(privilegeData, child.label) : !_.includes(privilegeData, child.label)
        }))
        const filters = _.filter(children, t => !t.disabled)
        this.setState({
          filterValue: { ...this.state.filterValue, [option.key]: _.head(filters).value }
        })
      }
      return { ...option, showAll, children }
    })
    const _options = await Promise.all(promiseList);
    return _options
  }

  getCascaderData = async (config) => {
    const { instantiationId, headerParamKey, headerValue, privilegeConf } = this.state;
    const params = headerParamKey
      ? JSON.stringify({ [headerParamKey]: headerValue })
      : JSON.stringify({})
    const data = await Api.getGroupOptions({
      instantiationId: instantiationId,
      params
    })
    const cascaderList = _.map(_.get(data, 'data.result.list'), item => {
      return {
        label: item.name,
        value: item.code,
        level: item.type_level,
        parentId: item.parent_type_id,
      }
    })
    const levelGroup = _.groupBy(cascaderList, t => t.level);
    return _.chain(config)
      .map(item => {
        let children = levelGroup[item.key]
        if (!children) {
          // this.setState({ privilegeFilterValue: {} })
          return item
        }
        let showAll = item.showAll;
        const privilegeKey = item.privilegeKey;
        const isNoLimit = _.includes(privilegeKey, 'no_limit');
        const privilegeData = _.get(privilegeConf, `${privilegeKey}.data`, []);
        if (_.size(privilegeData)) {
          children = _.map(children, child => ({
            ...child,
            disabled: isNoLimit ? _.includes(privilegeData, child.label) : !_.includes(privilegeData, child.label)
          }))
          const filters = _.filter(children, t => !t.disabled)
          showAll = false;
          this.setState({
            filterValue: { ...this.state.filterValue, [item.key]: _.head(filters).value },
          })
        }
        return {
          ...item,
          showAll,
          children
        }
      })
      .filter((t) => t.children)
      .value()
  }

  isEmptyParam = (params) => {
    const keys = Object.keys(params)
    if (keys.length === 1 && keys.indexOf('language') > -1) {
      return true
    }
    return false
  }

  exportLoadDataFun = () => {
    const { controlledElement, groupOptionsConfig, filterValue } = this.state;
    const params = this.getComponentParam(controlledElement);

    if (!params || this.isEmptyParam(params)) return null

    if (_.get(params, 'type') === 'clear') {
      this.setState({ filterValue: {} })
    }
    const level = _.get(params, 'type_level', undefined)
    if (level === undefined) {
      // message.error('选项错误~~~')
      return;
    }

    const cascaderOptionsConfig = _.filter(groupOptionsConfig, t => t.type === 'cascader');
    const levelConfg = _.reduce(cascaderOptionsConfig, (acc, t) => {
      acc[t.key] = t
      return acc
    }, {})

    const headerValue = level;//_.min([Number(level) + 1, 3])
    const _filterValue = _.reduce(params.selected_type_id_arr, (acc, item) => {
      const isMultiple = _.get(levelConfg, `[${item.type_level}].isMultiple`, true)
      acc[item.type_level] = isMultiple ? [item.type_id] : item.type_id;
      return acc
    }, { ...filterValue })

    this.setState({ headerValue, filterValue: _filterValue }, () => {
      this.getGroupData()
    })
  }

  //对外提供参数方法
  exportParamFun = () => {
    const { componentState } = this.state;
    if (componentState != "DidMount") return;
    const { groupOptionsConfig, filterValue, headerOption, headerValue, privilegeKey, privilegeData } = this.state;
    const headerParam = _.get(headerOption, 'paramKey')
      ? { [headerOption.paramKey]: headerValue }
      : {}
    const paramKeyObj = _.reduce(groupOptionsConfig, (acc, t) => {
      acc[t.key] = {
        paramKey: t.paramKey,
        type: t.type
      };
      return acc
    }, {})
    const groupParam = _.chain(filterValue)
      .toPairs()
      .reduce((acc, [key, value]) => {
        if (!paramKeyObj[key]) return acc;
        const { paramKey, type } = paramKeyObj[key];
        switch (type) {
          case 'range':
            if (_.isArray(paramKey) && _.isArray(value)) {
              !_.isNil(value[0]) && (acc[paramKey[0]] = value[0])
              !_.isNil(value[1]) && (acc[paramKey[1]] = value[1])
            }
            break;
          default:
            !_.isNil(value) && (acc[paramKey] = value);
        }
        return acc
      }, {})
      .value()
    return _.merge(headerParam, groupParam, { [privilegeKey]: _.join(privilegeData, ',') })
  }

  handleHeaderChange = (value) => {
    this.setState({ headerValue: value, filterValue: {} }, () => {
      this.getGroupData().then(() => {
        this.triggerLoadData()
      });
      // this.triggerLoadData();
    })
  }

  handleGroupChange = (value) => {
    this.setState({ filterValue: value }, this.triggerLoadData)
  }

  renderLoading = () => {
    return <Spin tip="Loading..." />
  }

  render() {
    const { componentState, instantiationId } = this.state;
    if (componentState == "WillMount") return null;
    else if (componentState == "InMount") return this.renderLoading();

    const { headerOption, showHeader, headerValue, groupOptions, filterValue, ifHideResult } = this.state;

    const excelData = getExcelData({
      headerValue, headerOption, groupOptions, filterValue, showHeader
    })

    console.log('groupOptionsgroupOptions', groupOptions)
    //渲染内容
    return <div className="excel-filter-group" excel-data={JSON.stringify(excelData)}>
      <EditTemplate instantiationId={instantiationId} >
        {
          !headerOption && !_.size(groupOptions) ? (
            <div style={{ height: 100, border: '1px solid #bfbfbf' }}></div>
          ) : (
            <FilterGroup
              headerOption={headerOption}
              headerValue={headerValue}
              showHeader={showHeader}
              groupOptions={groupOptions}
              filterValue={filterValue}
              ifHideResult={ifHideResult}
              onHeaderChange={this.handleHeaderChange}
              onGroupChange={this.handleGroupChange}
            />
          )
        }
      </EditTemplate>
    </div>
  }
}

Index.propTypes = {
  id: PropTypes.number.isRequired,
};

Index.defaultProps = {
  style: {}
}

export default Index;
