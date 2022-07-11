'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Component from '../../util/component';
import { getTemplateData, getPrivilegeData } from '../../util/template';

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
            templateData : null,
            //参数列表
            params       : {},
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
            privilegeData = null,
            componentState = 'InMount';

        //分解数据
        if (tempData) {
            try {
                let templateProperty = tempData.templatePropertyValueJson;

                templateData         = templateProperty;
                effectElement        = templateProperty.effectElement;

                params               = templateProperty.params;

                privilegeData        = getPrivilegeData(params)

                //更新组件状态
                componentState       = "DidMount";
            } catch (error) {
                console.log(error);
            }
        }

        this.setState({ templateData, params, privilegeData, effectElement, componentState },this.triggerLoadData);
    }
    exportParamFun = () => {
        const { componentState, params, privilegeData } = this.state;
        if (componentState!="DidMount") return componentState;
        let obj = {};
        for (let i = 0, len = params.length; i < len; i++) {
            let code = params[i];
            if (privilegeData && privilegeData[`${code}`]) obj[`${code}`] = privilegeData[`${code}`]
        }
        return obj;
    }
    render() {
        return null;
    }
}

Index.propTypes = {
    id: PropTypes.string.isRequired,
};

Index.defaultProps = {
    id: ""
}

export default Index;