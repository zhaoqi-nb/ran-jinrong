'use strict';

import React from 'react';
import _ from 'lodash';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import Component from '../util/component';
import EditTemplate from '../util/editTemplate/index';
import Timeline from '@/components/Timeline';
import Api from './store/api';

import { getTemplateData } from '../util/template';
import getSearchParams from '../../../utils/getSearchParams';

const data = [{
  date: '2020-05-26',
  title: '股权融资(未披露)',
  text: '源星资本，伯藜创投、三七互娱创投基金'
}, {
  date: '2020-05-26',
  title: '股权融资(未披露)',
  text: '源星资本，伯藜创投、三七互娱创投基金发发发顺丰撒asfasfasfasf'
}, {
  date: '2020-05-26',
  title: '股权融资(未披露)',
  text: '源星资本，伯藜创投、三七互娱创投基金'
}, {
  date: '2020-05-26',
  title: '股权融资(未披露)',
  text: '源星资本，伯藜创投、三七互娱创投基金发发发顺丰撒源星资本，伯藜创投、三七互娱创投基金源星资本，伯藜创投、三七互娱创投基金'
}, {
  date: '2020-05-26',
  title: '股权融资(未披露)',
  text: '源星资本，伯藜创投、三七互娱创投基金'
}, {
  date: '2020-05-26',
  title: '股权融资(未披露)',
  text: '源星资本，伯藜创投、三七互娱创投基金发发发顺丰撒'
}, {
  date: '2020-05-26',
  title: '股权融资(未披露)',
  text: '源星资本，伯藜创投、三七互娱创投基金'
}, {
  date: '2020-05-26',
  title: '股权融资(未披露)',
  text: '源星资本，伯藜创投、三七互娱创投基金发发发顺丰撒源星资本，伯藜创投、三七互娱创投基金'
}, {
  date: '2020-05-26',
  title: '股权融资(未披露)',
  text: '源星资本，伯藜创投、三七互娱创投基金源星资本，伯藜创投、三七互娱创投基金源星资本，伯藜创投、三七互娱创投基金源星资本，伯藜创投、三七互娱创投基金'
}, {
  date: '2020-05-26',
  title: '股权融资(未披露)',
  text: '源星资本，伯藜创投、三七互娱创投基金发发发顺丰撒'
}]

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
      data: []
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
    }
    this.setState({ ...state }, this.getData)
  }

  getData = async () => {
    const { instantiationId } = this.state;
    const { brandId, project_type} = getSearchParams(['brandId', 'project_type']);
    const res = await Api.getBrandFinanceInfo({
      instantiationId,
      params: JSON.stringify({ brand_id: brandId, project_type}) //'100674'
    })
    this.setState({
      data: _.map(res.data, item => ({
        id: item.brandId,
        date: item.financeTime,
        title: `${item.stage}(${item.financeAmount})`,
        //改成投资方信息investor
        text: item.investor
      }))
    })
  }

  renderLoading = () => {
    return <Spin tip="Loading..." />
  }

  render() {
    const { componentState, instantiationId, data } = this.state;
    if (componentState == "WillMount") return null;
    else if (componentState == "InMount") return this.renderLoading();

    //渲染内容
    return <EditTemplate instantiationId={instantiationId} >
      <Timeline data={data} />
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
