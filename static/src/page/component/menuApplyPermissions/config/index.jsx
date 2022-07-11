'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Component from '../../util/component';
import { gethashcode } from '../../util/hash';
import { getTemplateData } from '../../util/template';
import { setEvnetFun, destroyEvnetFun } from '../../util/event';

class MenuApplyPermissions extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentWillReceiveProps(nextProps) {

    }
    getInitialState = () => {
        return {
            //模版数据
            templateData: null,
            //参数列表
            params: {},
            //影响元素
            effectElement: [],
            //组件状态
            componentState: 'WillMount',
        }
    }
    queryComponentData = () => {
        const { id } = this.props;
        const tempData = getTemplateData(id);

        //defalut value
        let templateData = null,
            params = {},
            effectElement = [],
            componentState = 'InMount';

        //分解数据
        if (tempData) {
            try {
                let templateProperty = tempData.templatePropertyValueJson;

                templateData = templateProperty;
                effectElement = templateProperty.effectElement;

                params = templateProperty.params;

                //更新组件状态
                // if (templateStr) componentState = "InMount";
                // else
                componentState = "DidMount";
            } catch (error) {
                console.log(error);
            }
        }

        this.setState({ templateData, params, effectElement, componentState }, this.triggerLoadData);
    }
    getPrivilegeValue = (key, data) => {
        if (!data || !data.length) return {};
        //获取属性
        const getProperty = (str) => {
            let param = {};
            try {
                param = JSON.parse(str);
            } catch (error) {
            }
            return param;
        }

        let temp = [],
            maxWeight = 0;
        for (let i = 0, len = data.length; i < len; i++) {
            let obj = data[i],
                weight = obj.weight,
                privilegeType = obj.privilegeType;
            //应用权限
            if (privilegeType != "APP") continue;
            //权限名称
            let privilegeName = obj.privilegeName,
                property = getProperty(obj.property);
            //如果没有权限，则从属性中获取，如果还没有，则设置默认值为0
            if (!weight) weight = property.weight ? property.weight : 0;

            if (key == privilegeName) {
                if (maxWeight >= weight) temp.push(obj);
                else {
                    maxWeight = weight;
                    temp.unshift(obj);
                }
            }
        }
        return temp && temp.length ? temp[0] : {};
    }
    exportParamFun = () => {
        const { componentState, params } = this.state;
        if (componentState != "DidMount") return componentState;
        const { data } = this.props;
        let result = {};
        for (let i = 0, len = params.length; i < len; i++) {
            let key = params[i];
            let obj = this.getPrivilegeValue(key, data),
                privilegeName = obj.privilegeName,
                property = obj.property;
            if (privilegeName && property) result[privilegeName] = JSON.parse(property)
        }
        return result;
    }
    render() {
        return null;
    }
}

MenuApplyPermissions.propTypes = {
    id: PropTypes.string,
    data: PropTypes.array
};

MenuApplyPermissions.defaultProps = {
    id: `title_${gethashcode()}`,
    data: null
}

export default MenuApplyPermissions;