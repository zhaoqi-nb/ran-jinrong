'use strict';

import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Component from '../../util/component';
import { getPrivilegeData } from '../../util/template';
import { Spin } from 'antd';
import EditTemplate from '../../util/editTemplate/index';
import CascaderInline from '@/components/CascaderInline';
import CascaderFilter from './CascaderFilter';
import Api from './store/api';

import './style.less';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.expandRef = React.createRef()
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
            paramValue: null,
            headerValue: undefined,
            headerOption: {},
            filterOptions: [],
            defaultFilterValue: {},
            filterValue: {},
            filterList: [],
            maxLevel: 2,
            defaultLevelGroup: {},
            parentGroup: {},
            industryPrivilege: '',
            expand: true
        }
    }

    getFilterList = async () => {
        const { headerValue, headerParamKey, instantiationId } = this.state;
        const data = await Api.getFilterOptions({
            instantiationId,
            params: JSON.stringify({ [headerParamKey]: headerValue })
        });
        const list = _.get(data, 'data.result.list');
        const filterList = _.map(list, t => ({
            label: i18n.format(t.name),
            value: t.code,
            parentId: t.parent_type_id,
            level: t.type_level
        }))
        const levelConfig = {
            "1": {
                title: i18n.format('所属一级行业'),
                isMultiple: false,
            },
            "2": {
                title: i18n.format('所属二级行业'),
                isMultiple: true,
            }
        }
        const defaultLevelGroup = _.groupBy(filterList, t => t.level);
        const parentGroup = _.groupBy(filterList, t => t.parentId);
        const defaultFilterValue = _.chain(defaultLevelGroup)
            .toPairs()
            .reduce((acc, [level]) => {
                acc[level] = 'all'
                return acc
            }, {})
            .value()

        this.setState({
            filterList,
            defaultLevelGroup,
            levelConfig,
            parentGroup,
            filterValue: defaultFilterValue,
            defaultFilterValue,
        }, () => {
            this.getFilterOptions(defaultLevelGroup)
            this.handleChange(defaultFilterValue)
        })
    }

    getFilterOptions = (group) => {
        const { levelConfig } = this.state;
        const options = _.chain(group)
            .toPairs()
            .map(([level, children]) => {
                if (!_.size(children)) return null
                return {
                    title: levelConfig[level].title,
                    isMultiple: levelConfig[level].isMultiple,
                    key: level,
                    showAll: true,
                    children: [{ label: i18n.format('全部'), value: 'all', isMultiple: false }, ...children]
                }
            })
            .filter(t => !_.isNil(t))
            .value()
        console.log('optionsoptionsoptions', JSON.stringify(options, null, 2))
        this.setState({ filterOptions: options })
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
                title: i18n.format(_.get(templateProperty, 'headerTitle', '行业等级选择')),
                children: _.map(_.get(templateProperty, 'headerOptions', []), t => ({
                    ...t,
                    label: i18n.format(t.label),
                }))
            },
            headerValue: _.get(templateProperty, 'defaultHeaderKey')
        }

        let privilege = getPrivilegeData(["industryPrivilege"]);

        const industryPrivilege = _.get(privilege, 'industryPrivilege.data', []).join(',')

        this.setState({ ...state, industryPrivilege }, this.getFilterList)
    }
    //对外提供参数方法
    exportParamFun = () => {
        const { paramValue, headerValue, industryPrivilege } = this.state;
        if (paramValue === 'root') {
            return { type_level: headerValue, industryPrivilege }
        }
        return {
            industry: _.join(paramValue, ','),
            industryPrivilege,
            type_level: headerValue
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

    getFilterValue = (value) => {
        console.log('valuevaluevaluevalue', value);
        const { parentGroup } = this.state;
        let preKeyChildren = null;
        return _.chain(value)
            .toPairs()
            .reduce((acc, [level, keys]) => {

                // let _keys = keys;
                // if (preKeyChildren) {
                //     _keys = _.filter(_keys, k => _.find(preKeyChildren, t => t.value === k))
                // }
                // if (_keys !== 'all') {
                //     preKeyChildren = _.reduce(_keys, (acc, key) => {
                //         acc.push(...(parentGroup[key] || []))
                //         return acc
                //     }, []);
                // }
                // acc[level] = _.isEmpty(_keys) ? 'all' : _keys
                // return acc
                let _keys = keys;
                const isMultiple = !_.isArray(_keys) ? false : true;
                if (_keys === 'all') {
                    acc[level] = 'all'
                    return acc
                }

                if (preKeyChildren) {
                    if (!isMultiple) {
                        _keys = _.find(preKeyChildren, t => t.value === _keys) ? _keys : 'all'
                    } else {
                        _keys = _.filter(_keys, k => _.find(preKeyChildren, t => t.value === k))
                    }
                }
                if (!isMultiple) {
                    preKeyChildren = parentGroup[_keys];
                    console.log('preKeyChildrenpreKeyChildren', preKeyChildren);
                    acc[level] = _keys
                } else {
                    preKeyChildren = _.reduce(_keys, (acc, key) => {
                        acc.push(...(parentGroup[key] || []))
                        return acc
                    }, []);
                    acc[level] = _.isEmpty(_keys) ? 'all' : _keys
                }

                return acc
            }, {})
            .value()
    }

    parseFilterValue = (value) => {
        return _.chain(value)
            .toPairs()
            .reduce((acc, [level, keys]) => {
                if (keys === 'all') {
                    acc[level] = 'all'
                    return acc
                }
                if (!_.isArray(keys)) {
                    acc[level] = [keys]
                } else {
                    acc[level] = keys;
                }
                return acc
            }, {})
            .value()
    }

    handleChange = (value) => {
        const filterValue = value;//this.getFilterValue(value);
        console.log('valuevaluevaluevalue', value, filterValue);
        const _filterValue = this.parseFilterValue(filterValue);
        const { defaultLevelGroup, parentGroup } = this.state;
        let preValues = null
        const levelGroup = _.chain(defaultLevelGroup)
            .cloneDeep()
            .toPairs()
            .map(([level, children], idx) => {
                if (preValues && preValues !== 'all') {
                    let _preValues = preValues;
                    const _children = _.reduce(_preValues, (acc, key) => {
                        acc.push(...(parentGroup[key] || []))
                        return acc
                    }, [])
                    return [level, _children]
                }
                preValues = _filterValue[level];
                return [level, children]
            })
            .fromPairs()
            .value()
        const paramValue = this.getValue(_filterValue)
        this.getFilterOptions(levelGroup)
        this.setState({ paramValue, filterValue }, () => {
            this.triggerLoadData()
        }); //
    }

    getCascaderFilter = () => {
        const { filterValue, levelConfig, filterList } = this.state;

        function pairsToFilters(pairs) {
            return _.reduce(pairs, (acc, [level, keys]) => {
                const title = levelConfig[level].title;
                const children = _.map(keys, key => {
                    const find = _.find(filterList, t => t.value === key)
                    return {
                        title: title,
                        level: level,
                        label: find.label,
                        value: find.value
                    }
                })
                acc.push(...children)
                return acc
            }, [])
        }

        const pairs = _.chain(this.parseFilterValue(filterValue))
            .toPairs()
            .filter(([, key]) => key !== 'all')
            .value();
        if (!_.size(pairs)) return [];
        return pairsToFilters(_.slice(pairs, _.size(pairs) - 1))
    }

    handleDelFiler = (record) => () => {
        const { level, value } = record;
        const { filterValue } = this.state;
        const _filterValue = _.cloneDeep(filterValue);
        const currentKeys = _filterValue[level];
        _.set(_filterValue, level, _.filter(currentKeys, t => t !== value))
        this.handleChange(_filterValue)
    }

    handleClear = () => {
        const { defaultFilterValue } = this.state;
        this.handleChange(defaultFilterValue)
    }

    handleExpand = (visible) => {
        const { onExpand } = this.expandRef.current;
        onExpand && onExpand(visible);
        if (visible !== undefined) {
            this.setState({ expand: visible })
            return
        }
        const { expand } = this.state;
        this.setState({ expand: !expand })
    }

    renderCascaderFilter = () => {
        const { expand, filterOptions } = this.state;
        const cascaderFilter = this.getCascaderFilter();
        console.log('filterOptionsfilterOptions', cascaderFilter);
        return (_.size(filterOptions) && _.size(cascaderFilter)) ? <CascaderFilter
            expand={expand}
            data={cascaderFilter}
            onExpand={this.handleExpand}
            onClear={this.handleClear}
            onDelete={this.handleDelFiler}
        /> : null
    }

    renderContent = () => {
        const { headerValue, headerOption, filterOptions, filterValue } = this.state;
        return <CascaderInline
            ref={this.expandRef}
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
        return <div>
            {this.renderContent()}
            {this.renderCascaderFilter()}
        </div>
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
