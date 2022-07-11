'use strict';

import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Component from '../../util/component';
import { getUserInfoData } from '@/page/component/page/util';
import { Spin } from 'antd';
import EditTemplate from '../../util/editTemplate/index';
import Comparison from '@/components/Comparison';
import Api from './store/api';
import { getRootId, getSearchParams } from './util'
import { getPrimaryMarketRouterParams } from '@/utils/primaryMarketUtil';
import replacePath, { checkAuth } from '@/utils/replacePath';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.dropdownRef = React.createRef()
    }

    componentWillReceiveProps(nextProps) {
        this.queryComponentData(nextProps);
    }

    getInitialState = () => {
        return {
            userInfo: {},
            //组件状态  WillMount/挂载前（组件还未渲染）, InMount/挂载中（组件执行渲染，可能需要获取数据才可以初始化好）  DidMount/挂载完成（组件准备就绪）   
            componentState: "WillMount",
            instantiationId: null,
            //组件数据
            templateData: null,
            //受控元素
            controlledElement: null,
            effectElement: null,
            headerParamKey: null,
            paramKey: null,
            searchList: [],
            otherParamKeys: [],
            activeItems: [],
            visible: false,
            searchListVisible: false,
            isAddFetch: true,
        }
    }


    getSearchList = async (search) => {
        const { instantiationId } = this.state
        const data = await Api.getSearchList({
            instantiationId,
            params: JSON.stringify({ type_name: search })
        });
        const list = _.get(data, 'data.result.list', [])
        this.setState({
            searchList: _.map(list, item => ({
                value: item.code,
                label: i18n.format(item.name)
            })),
            searchListVisible: true
        })
    }

    addIndustryContrastId = (values) => {
        const { userInfo } = this.state;
        return Api.addIndustryContrastId({
            userId: userInfo.sysUserId,
            paramsStr: _.join(values, ','),
            rootId: getRootId(window.location),
            type: 'search',
        });
    }

    getIndustryContrastId = (userId) => {
        return Api.getIndustryContrastId({
            userId: userId,
            rootId: getRootId(window.location),
            type: 'search'
        });
    }

    queryComponentData = async (props = this.props) => {
        const { id } = props;
        const tempData = this.getTemplateData(id);
        const templateProperty = _.get(tempData, 'templatePropertyValueJson', {});
        const state = {
            componentState: tempData ? 'DidMount' : 'InMount',
            instantiationId: tempData.instantiationId,
            templateData: templateProperty,
            controlledElement: _.get(templateProperty, 'controlledElement', []),
            effectElement: _.get(templateProperty, 'effectElement', []),
            otherParamKeys: _.get(templateProperty, 'otherParamKeys', []),
            isAddFetch: _.get(templateProperty, 'isAddFetch', true),
        }
        const { compareIds } = getSearchParams(['compareIds']);
        const userInfo = getUserInfoData();
        let res = null;
        if (compareIds) {
            res = await Api.getIndustryId({
                ids: compareIds
            });
        } else {
            res = await this.getIndustryContrastId(userInfo.sysUserId);
        }
        const activeItems = _.chain(res.data)
            .map((item) => ({
                value: item.type_id,
                label: i18n.format(item.type_name)
            }))
            .value();

        this.setState({ ...state, userInfo, activeItems }, this.triggerLoadData)
    }

    exportLoadDataFun = async () => {
        const { componentState } = this.state;
        if (componentState != "DidMount") return;
        const otherParams = this.getOtherParam();
        const values = _.get(otherParams, 'comparisonKeys', []);
        const res = await this.addIndustryContrastId(values);
        if (res.code === 200) {
            this.setState({
                activeItems: values,
            }, () => {
                const { onChangeVisible } = this.dropdownRef.current
                onChangeVisible && onChangeVisible()
            })
        }

    }

    //对外提供参数方法
    exportParamFun = () => {
        const { componentState } = this.state;
        if (componentState != "DidMount") return;
        const { activeItems } = this.state
        return {
            comparisonKeys: activeItems
        }
    }
    renderLoading = () => {
        return <Spin tip="Loading..." />
    }

    handleChange = async (activeKeys, activeItems) => {

        const { isAddFetch } = this.state;

        if (!isAddFetch) {
            this.setState({ activeItems }, this.triggerLoadData)
            return
        }
        const res = await this.addIndustryContrastId(activeKeys);
        if (res.code === 200) {
            this.setState({ activeItems }, this.triggerLoadData)
        }
    }

    handleToAppAnalyzeCompare = () => {
        const { activeItems } = this.state;
        const param = activeItems.map((item, index) => item.value).join(",");
        // window.location.href = `/redirect/appAnalyze/compare?compareIds=${param}`;
        // /redirect/appAnalyze/detail/:parentId/:resId/9862?
        const routParams = getPrimaryMarketRouterParams("app分析-行业对比");
        let href = `/redirect/appAnalyze/compare/:parentId/:resId/9876?compareIds=${param}`
        href = replacePath(href, routParams)
        // window.location.href = href;
        window.open(href)
    }

    clickToDetail = (record) => {
        console.log('recordrecord', record)
        const { label, value } = record
        const labelArr = label.split('/')
        const type_level = labelArr.length
        const routParams = getPrimaryMarketRouterParams("app分析-行业详情");
        let href = `/redirect/appAnalyze/detail/:parentId/:resId/9862?compareIds=${value}&&industryName=${labelArr.join('>')}&&type_level=${type_level}`
        href = replacePath(href, routParams)
        console.log('hrefhref', href)
        window.open(href)
    }

    renderContent = () => {
        const { searchList, activeItems, searchListVisible } = this.state;
        return <Comparison
            ref={this.dropdownRef}
            searchListVisible={searchListVisible}
            activeItems={activeItems}
            onSearch={this.getSearchList}
            onCompare={this.handleToAppAnalyzeCompare}
            searchList={searchList}
            onChange={this.handleChange}
            onClickToDetail={this.clickToDetail}
        />
    }
    render() {
        const { componentState, instantiationId } = this.state;
        if (componentState == "WillMount") return null;
        else if (componentState == "InMount") return this.renderLoading();
        //渲染内容
        return <EditTemplate instantiationId={instantiationId} style={{ display: "inline-block" }} >
            {this.renderContent()}
        </EditTemplate>
    }
}

Index.propTypes = {
    id: PropTypes.number.isRequired,
    style: PropTypes.object,
};

Index.defaultProps = {
    style: {}
}

export default Index;
