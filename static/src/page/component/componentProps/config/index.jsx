'use strict';

import React from 'react';
import _ from 'lodash'
import PropTypes from 'prop-types';
import Component from '../../util/component';
import { gethashcode } from '../../util/hash';
import { getTemplateData } from '../../util/template';
import { setEvnetFun, destroyEvnetFun, triggerEvnetFun } from '../../util/event';
import { isEmpty } from '../../../../utils/Util';

class Index extends Component {
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
    exportParamFun = () => {
        const { componentState, params } = this.state;
        if (componentState != "DidMount") return componentState;
        const { data } = this.props;

        let temp = _.reduce(params, (acc, item) => {
            let code = item.code || item;
            let paramKey = item.paramKey || item;
            if (data[code]) acc[paramKey] = data[code]

            return acc
        }, {})

        // console.log('componentState=>params', temp, this.state.effectElement)
        return isEmpty(temp)?null:temp;
    }
    render() {
        return null;
    }
}

Index.propTypes = {
    id: PropTypes.number.isRequired,
};

Index.defaultProps = {
    id: ""
}

export default Index;