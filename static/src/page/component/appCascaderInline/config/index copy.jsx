'use strict';

import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Component from '../../util/component';
import { getPrivilegeData } from '../../util/template';
import { Spin } from 'antd';
import EditTemplate from '../../util/editTemplate/index';
import CascaderInline from '@/components/CascaderInline';
import Api from './store/api';
// import { setEvnetFun, triggerEvnetFun, destroyEvnetFun } from '../util/event';


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
            headerParamKey: null,
            paramKey: null,
            headerValue: undefined,
            headerOption: {},
            filterOptions: [],
            filterValue: {},
            filterList: [],
            maxLevel: 2,
            // title: null,
            // type: null,
            // date_type: null,
            // date_types: null,
            // fixDate_range: null,
            // //特殊周类型，
            // date_option: null,
            // paramKey: null,

            // //组件回传回来的参数值
            // value: null,
            levelConfig: {},
            filterGroup: {}
        }
    }

    getFilterList = async () => {
        const { headerValue, headerParamKey, instantiationId } = this.state;
        const data = await Api.getFilterOptions({
            instantiationId,
            params: JSON.stringify({ [headerParamKey]: headerValue })
        });
        const list = _.get(data, 'data.result.list');

        // const filterList = [{
        //     label: '电商',
        //     value: '1000',
        //     level: 1
        // }, {
        //     label: '社交',
        //     value: '1001',
        //     level: 1
        // }, {
        //     label: '生活服务',
        //     value: '1002',
        //     level: 1
        // }, {
        //     label: '娱乐',
        //     value: '1003',
        //     level: 1
        // }, {
        //     label: '电商-child',
        //     value: '2000',
        //     parentId: '1000',
        //     level: 2
        // }, {
        //     label: '社交-child',
        //     value: '2001',
        //     parentId: '1000',
        //     level: 2
        // }, {
        //     label: '生活服务-child',
        //     value: '2002',
        //     parentId: '1001',
        //     level: 2
        // }, {
        //     label: '娱乐-child',
        //     value: '2003',
        //     parentId: '1001',
        //     level: 2
        // }]

        const filterList = _.map(list, t => ({
            label: t.name,
            value: t.code,
            parentId: t.parent_type_id,
            level: t.type_level
        }))


        const levelConfig = {
            '1': {
                title: '所属一级行业',
                parentId: '-999'
            },
            '2': {
                title: '所属二级行业',
                parentId: _.chain(filterList)
                    .filter(t => t.level == 2)
                    .map(t => t.parentId)
                    .uniq()
                    .value()
            }
        }

        const filterValue = {
            1: 'all',
            2: 'all'
        }

        const group = _.groupBy(filterList, t => t.parentId || headerValue);
        this.setState({
            filterList,
            filterGroup: group,
            levelConfig,
            defaultLevelConfig: _.cloneDeep(levelConfig),
            filterValue
        }, () => {
            this.handleChange(filterValue)
            this.getFilterOptions()
        })
    }

    getFilterOptions = () => {
        const { levelConfig, filterGroup } = this.state;
        console.log('filterGroupfilterGroupfilterGroup', levelConfig, filterGroup);
        const filterOptions = _.chain(levelConfig)
            .toPairs()
            .map(([level, { title, parentId }]) => {
                const children = !_.isArray(parentId) ? filterGroup[parentId] : _.reduce(parentId, (acc, item) => {
                    return [...acc, ...(filterGroup[item] || [])]
                }, [])
                return {
                    title,
                    key: level,
                    children: _.size(children) ? [{ label: '全部', value: 'all', isMultiple: false }, ...children] : []
                }
            })
            .value()
        this.setState({ filterOptions })
    }

    queryComponentData = () => {
        const { id } = this.props;
        const tempData = this.getTemplateData(id);
        const templateProperty = _.get(tempData, 'templatePropertyValueJson', {});
        const state = {
            componentState: tempData ? 'DidMount' : 'InMount',
            instantiationId: tempData.instantiationId,
            templateData: templateProperty,
            controlledElement: _.get(templateProperty, 'controlledElement', []),
            effectElement: _.get(templateProperty, 'effectElement', []),
            headerParamKey: _.get(templateProperty, 'headerParamKey', null),
            headerOption: {
                title: '行业等级选择',
                children: _.get(templateProperty, 'headerOptions', [])
            },
            headerValue: _.get(templateProperty, 'defaultHeaderKey')
        }

        let privilege = getPrivilegeData(["industryPrivilege"]);

        console.log('privilegeprivilege', privilege);

        this.setState({ ...state }, this.getFilterList)
    }
    //对外提供参数方法
    exportParamFun = () => {
        // const { value, headerValue } = this.state
        // if (value === 'root') {
        //     return { type_level: headerValue }
        // }
        // const industry = _.isArray(value) ? _.join(value, ',') : value
        // console.log('industryindustryindustry', value, industry);
        // return { type_level: 1, industry } //industryPrivilege
        return {
            "industry": "100001,100002,100003,100004,100005,100006,100007,100008,100009",
            "industryPrivilege": "美妆个护,家用电器",
            type_level: 1
        }
    }
    renderLoading = () => {
        return <Spin tip="Loading..." />
    }

    handleHeaderChange = (value) => {

        this.setState({ headerValue: value }, this.getFilterList);
    }

    getValue = (value) => {
        const { headerValue } = this.state;
        const everyALL = _.chain(value)
            .values()
            .flatten()
            .every(item => item === "all")
            .value()
        if (everyALL) {
            return 'root'
        }

        const lastALL = _.chain(value)
            .values()
            .last()
            .value()
        const parentKeys = _.chain(value)
            .values()
            .head()
            .value()
        if (lastALL === 'all') {
            return parentKeys
        }
        return lastALL
    }

    handleChange = (value) => {
        const { levelConfig, filterGroup, defaultLevelConfig, filterValue } = this.state;
        _.chain(value)
            .toPairs()
            .forEach(([level, keys]) => {
                if (levelConfig[Number(level) + 1]) {
                    const _levelConfig = keys !== 'all'
                        ? _.set(_.cloneDeep(levelConfig), `${Number(level) + 1}.parentId`, keys)
                        : _.set(_.cloneDeep(levelConfig), `${Number(level) + 1}`, defaultLevelConfig[Number(level) + 1])
                    console.log('fsaffasfasafs', defaultLevelConfig, Number(level) + 1);
                    this.setState({
                        levelConfig: _levelConfig
                    })
                }
            })
            .value()

        this.setState({ value: this.getValue(value), filterValue: { ...filterValue, ...value } }, () => {
            this.getFilterOptions()
            this.triggerLoadData()
            // this._getFilterOptions(value)
        }); //
    }
    renderContent = () => {
        const { headerValue, headerOption, filterOptions, filterValue } = this.state;
        console.log('filterOptionsfilterOptionsfilterOptions', filterOptions);
        return <CascaderInline
            headerValue={headerValue}
            headerOption={headerOption}
            filterOptions={filterOptions}
            filterValue={filterValue}
            onHeaderChange={this.handleHeaderChange}
            onChange={this.handleChange}
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
