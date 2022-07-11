'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Api from './store/api';
import Common from '../common/index';
import Component from '../../util/component'
import cloneDeep from 'lodash/cloneDeep';
import { getYAxisFormat, getXAxisFormat } from './base';
import { getDownloadData } from './downUtil'
import { isEmpty } from '../../../../utils/Util';
import { getComponentParam } from '../../util/template';
import { formatZBData } from '../../util/format/number'

class Normal extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        window.global_download_params = this.getChartParams;
    }

    componentDidMount() {
        const { controlledElement, apiParamNames } = this.props
        this.setState({ controlledElement, apiParamNames }, () => {
            this.getChartData();
        })
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillUnmount() {
        this.setState(this.getInitialState())
    }
    getInitialState = () => {
        return {
            //组件是否准备就绪
            isReady: false,
            data: {},
            option: {},
            params: {},
            paramsOptions: null,
            loading: false
        }
    }
    getChartData = async () => {
        const { id, apiParamNames, controlledElement, codeKey, url, isNoApiParam, type, changeChartType } = this.props;
        if (url) {
            if (!id) return;
        } else {
            if (!id || !apiParamNames) return;
        }

        const { paramsOptions, loading } = this.state
        let params = {}, _paramsOptions = {};
        if (!isNoApiParam) {
            //get 请求参数
            params = this.getApiParam();
            if (isEmpty(params) || loading) {
                setTimeout(this.getChartData, 500);
                return null;
            }
            _paramsOptions = cloneDeep(params)

            const _params = getComponentParam(controlledElement);
            if (_params && _params[`${codeKey}_$name`]) params[`${codeKey}_$name`] = _params[`${codeKey}_$name`]
            if (params) params.codeKey = codeKey
            this.setState({ loading: true })
        }
        let _type = type
        if (params && JSON.stringify(params) !== "{}" && changeChartType) {
            const { paramKey, paramValue } = changeChartType
            if (params.hasOwnProperty(paramKey) && params[paramKey] === paramValue) {
                _type = changeChartType.type
            }
        }
        let result = await Api.getChartData({
            instantiationId: id,
            type: _type,
            params: JSON.stringify(params),
            url
        })
        let data = {};
        if (result.code == 200) {
            data = result.data;
        }
        this.initOption(data, params, _paramsOptions, _type);
    }
   

    getChartParams = async () => {
        const { id, type, apiParamNames, controlledElement, codeKey, url, isNoApiParam } = this.props;
        if (url) {
            if (!id) return;
        } else {
            if (!id || !apiParamNames) return;
        }

        const { paramsOptions, loading } = this.state
        let params = {}, _paramsOptions = {};
        if (!isNoApiParam) {
            //get 请求参数
            params = this.getApiParam();
            if (isEmpty(params) || loading) {
                // setTimeout(this.getChartParams, 500);
                await new Promise((resolve, reject) => { setTimeout(() => { resolve();}, 500);})
                // setTimeout(this.getTableRequestParams, 500);
                await getChartParams(props);
            }
            _paramsOptions = cloneDeep(params)
            if (JSON.stringify(paramsOptions) === JSON.stringify(params)) return null;

            const _params = getComponentParam(controlledElement);
            if (_params && _params[`${codeKey}_$name`]) params[`${codeKey}_$name`] = _params[`${codeKey}_$name`]
            if (params) params.codeKey = codeKey
            // this.setState({ loading: true })
        }
        return params;
    }
    initOption = (data, params, _paramsOptions, type) => {
        const { templateData, codeKey, changeChartType } = this.props;

        let option = cloneDeep(templateData);
        console.log('optionoptiofsafasfnoption', templateData, option)
        let _type = type
        let mixType = null
        if (params && JSON.stringify(params) !== "{}" && changeChartType) {
            const { paramKey, paramValue } = changeChartType
            if (params.hasOwnProperty(paramKey) && params[paramKey] === paramValue) {
                _type = changeChartType.type
                if (_type === 'mix') {
                    mixType = changeChartType.mixType
                }
            }
        }
        option.type = _type
        if (mixType) {
            option.mixType = mixType
            option.grid.right = option.grid.left
        }
        if (data) {
            let yAxisFormat = getYAxisFormat(_type, data.format, option.yAxis);
            let xAxisFormat = getXAxisFormat(params, option && option.xAxis);
            // const codeName = data.zbNames[0]
            if (!Array.isArray(yAxisFormat)) {
                const codeName = data.zbNames && data.zbNames[0] ? data.zbNames[0] : params[`${codeKey}_$name`]
                option.yAxis = yAxisFormat && yAxisFormat.axisLabel ? { ...option.yAxis, ...yAxisFormat, name: codeName } : option.yAxis;
            } else {
                yAxisFormat.map((item, index) => item.name = data.zbNames[index])
                option.yAxis = yAxisFormat
            }
            // y轴配置添加max限制
            //option&&option.yAxis&&option.yAxis.hasOwnProperty('max')  ? {max: option.yAxis.max, ...yAxisFormat}
            option.xAxis = xAxisFormat;
        }
        this.setState({ data, params, option, isReady: true, loading: false, paramsOptions: _paramsOptions })
    }
    getDownloadParams = () => {
        const { controlledElement, codeKey, ifChartDownload } = this.props;
        const { params, option, data } = this.state
        const otherParam = {
            templateData: option,
            title: option.title,
            controlledElement
        }
        const downData = getDownloadData(data, params, otherParam)

        const downParams = {
            ifChartDownload,
            // iconStyle,
            downData,
            params
        }
        return downParams
    }
    render() {
        const { isReady, data, option, params } = this.state;
        if (!isReady) return null;
        const { id, style, optionRender, showDataZoomLength, showLabel } = this.props;
        const downParams = this.getDownloadParams()
        let param = {
            id,
            option,
            data,
            params,
            style,
            optionRender,
            ...downParams,
            showDataZoomLength,
            showLabel
        };
        return <Common {...param} />;
    }
}

Normal.propTypes = {

};

export default Normal;