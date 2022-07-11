'use strict';

import React, {Fragment} from 'react';
import Api from './store/api';
import { getComponentParam } from '../../util/template';
import Common from '../common/index';
import { IconButton } from '@/components/Button'
import RsIcon from '../../rsIcon';
import Component from '../../util/component'
import { getDownloadData } from './downUtil'
import { getYAxisFormat, getXAxisFormat } from './base';
import debounce from 'lodash/debounce';
import { FormattedMessage } from '@/components/FastIntl';
import cloneDeep from 'lodash/cloneDeep'
import './index.less'
import {Checkbox} from 'antd'
import i18n from '@/plugin/i18n'
import _ from 'lodash';

const verticalLayout = {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
}
const horizontalLayout = {
    display: 'flex',
    flexDirection: 'row',
    // flex: '1 1 auto'
}

const iconStyle = {
    fontSize: 16
}

class Normal extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.getChartData = debounce(this.getChartData, 100)
        window.global_download_params = this.getChartParams;
    }

    componentDidMount() {
        const { controlledElement, apiParamNames, layoutDirection, ifShowDataLabel} = this.props
        this.setState({ controlledElement, apiParamNames, layoutDirection, ifShowDataLabel}, () => {
            this.getChartData();
        })
    }
    componentDidUpdate() {
        let eventObj = document.createEvent("HTMLEvents")
        eventObj.initEvent("resize", true, true);
        window.dispatchEvent(eventObj);
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
            data: [],
            //默认垂直布局
            layoutDirection: 'vertical',  // horizonta
            //是否展示数据标签
            ifShowDataLabel: false,
            dataLabelFLag:false,
            AJAXParams: null,
            paramsOptions: null,
            loading: false
        }
    }

    getChartData = async () => {
        const { id, type, controlledElement, apiParamNames, codeKey, url } = this.props;
        const { paramsOptions, loading } = this.state
        if(url) {
            if (!id ) return;
        } else {
            if (!id || !apiParamNames) return;
        }
        
        //get 请求参数
        let params = this.getApiParam();
        if (!params || loading) {
            setTimeout(this.getChartData, 500);
            return null;
        }
        const _paramsOptions = cloneDeep(params)
        if (JSON.stringify(paramsOptions) === JSON.stringify(params)) return null;

        const _params = getComponentParam(controlledElement);
        if (_params && codeKey && !_params[`${codeKey}_data`].length) {
            _params[`${codeKey}_data`] = _params[`${codeKey}`].split(',').map(item => {
                return { zb_code: item, zb_name: '' }
            })
        }
        if (_params && _params[`${codeKey}_data`]) {
            params[`${codeKey}_data`] = []
            _params[`${codeKey}_data`].map(item => {
                params[`${codeKey}_data`].push({
                    zb_code: item.zb_code,
                    zb_name: item.zb_name,
                    zb_name_en: item.zb_name_en,
                })
            })
        }
        if (params) params['codeKey'] = codeKey
        if (_params?.detailCodeId) params['detailCodeId'] = _params?.detailCodeId
        if (_params) _params.codeKey = codeKey
        // params["start_date"] = "202111"
        // params["end_date"] = "202202"
        this.setState({ loading: true })
        let result = await Api.getChartData({
            instantiationId: id,
            type,
            params: JSON.stringify(params),
            url: this.props.url
        })
        let data = {};
        if (result.code == 200) {
            data = result.data;
        }
        this.setState({ data, type, isReady: true, AJAXParams: _params, loading: false, paramsOptions: _paramsOptions })
    }

    getChartParams = async () => {
        const { id, type, controlledElement, apiParamNames, codeKey, url } = this.props;
        const { paramsOptions, loading } = this.state
        if(url) {
            if (!id ) return;
        } else {
            if (!id || !apiParamNames) return;
        }
        
        //get 请求参数
        let params = this.getApiParam();
        if (!params || loading) {
            // setTimeout(this.getChartParams, 500);
            await new Promise((resolve, reject) => { setTimeout(() => { resolve();}, 500);})
            // setTimeout(this.getTableRequestParams, 500);
            await getChartParams(props);
        }
        const _paramsOptions = cloneDeep(params)

        const _params = getComponentParam(controlledElement);
        if (_params && codeKey && !_params[`${codeKey}_data`].length) {
            _params[`${codeKey}_data`] = _params[`${codeKey}`].split(',').map(item => {
                return { zb_code: item, zb_name: '' }
            })
        }
        if (_params && _params[`${codeKey}_data`]) {
            params[`${codeKey}_data`] = []
            _params[`${codeKey}_data`].map(item => {
                params[`${codeKey}_data`].push({
                    zb_code: item.zb_code,
                    zb_name: item.zb_name,
                    zb_name_en: item.zb_name_en,
                })
            })
        }
        if (params) params['codeKey'] = codeKey
        if (_params?.detailCodeId) params['detailCodeId'] = _params?.detailCodeId
        if (_params) _params.codeKey = codeKey;
        console.log('params=<>', params)
        return params;
    }

    changeLayoutDirection = (val) => {
        this.setState({
            layoutDirection: val
        })
    }

    setDataLabel = (e) => {
        this.setState({
            dataLabelFLag: e.target.checked
        })
    }
    render() {
        const { isReady, data, layoutDirection, type, AJAXParams, ifShowDataLabel, dataLabelFLag} = this.state;
        if (!isReady) return null;
        const { id, templateData, style, controlledElement, optionRender, showDataZoomLength } = this.props;
        const { ifChartDownload } = this.props

        const DownloadFlag = _.get(ifChartDownload, 'show')
            && _.get(templateData, 'showDownload')
            && _.get(templateData, 'showChangeType')

        console.log('this.propsthis.propsthis.props', this.props);
        const { colsNum, xAxis } = templateData
        let layout = null,
            itemStyle = style,
            contentStyle = null,
            propsDownStyle = null,
            rapWidth = '50%',
            wrapStyle = null;
        if (colsNum && typeof (colsNum) === 'number' && !isNaN(colsNum)) {
            // 控制一行几个图
            layout = horizontalLayout
            // itemStyle = Object.assign({}, style, { marginRight: 20 })
            // contentStyle = Object.assign({}, style, { marginRight: 20 })
            // propsDownStyle = { right: 20 }
            contentStyle = (DownloadFlag) ? (
                Object.assign({}, style, { marginRight: 20 })
            ) : {}
            propsDownStyle = (DownloadFlag) ? { right: 20 } : {}
            layout.flexWrap = 'wrap'
            // rapWidth = (Math.floor(100 / colsNum) - 1) + '%'
            rapWidth = ((100 / colsNum).toFixed(6)) + '%'
            wrapStyle = { flex: `0 0 calc(${rapWidth})`, }
        } else {
            layout = layoutDirection === 'vertical' ? verticalLayout : horizontalLayout
            // itemStyle = layoutDirection === 'vertical' ? style : Object.assign({}, style, { marginRight: 20 })
            contentStyle = layoutDirection === 'vertical' ? style : Object.assign({}, style, { marginRight: 4 })
            propsDownStyle = layoutDirection === 'vertical' ? {} : { right: 4 }
            wrapStyle = layoutDirection === 'vertical' ? {} : { flex: `0 0 calc(${rapWidth} - 13px)`, marginRight: 24 }
        }
        let title = ''
        return <div className="loop-wrap" style={{ overflow: 'auto', ...layout }}>
            {
                !colsNum ? <div style={{ position: 'absolute', right: 0, transform: 'translateY(-100%)' }}>
                    <div className="loop-layout">
                        {
                            ifShowDataLabel?<Fragment>
                                                <Checkbox onChange={this.setDataLabel}/>
                                                <span style={{marginRight:"10px",marginLeft:"5px"}}>{i18n.format("展示数据标签")}</span>
                                             </Fragment>: null
                        }
                        
                        <span style={{ fontSize: 12, color: '#595959' }}><FormattedMessage id="布局" />：</span>
                        <div className="chart-layout-wrap">
                            <div className="chart-layout" onClick={() => { this.changeLayoutDirection('vertical') }}>
                                <RsIcon type='icon-shangxiabuju' style={layoutDirection === 'vertical' ? { ...iconStyle, color: '#0678FF' } : iconStyle} />
                            </div>
                            <div className="chart-layout" onClick={() => { this.changeLayoutDirection('horizonta') }}>
                                <RsIcon type='icon-zuoyoubuju' style={layoutDirection === 'horizonta' ? { ...iconStyle, color: '#0678FF' } : iconStyle} />
                            </div>
                        </div>
                    </div>
                </div> : null
            }
            {data && data.length > 0 ? data.map((item, index) => {
                if (!item.series.length || !item.xData.length) return <Common layoutDirection={layoutDirection} wrapStyle={wrapStyle} propsDownStyle={propsDownStyle} contentStyle={contentStyle} style={itemStyle} data={null} key={index} />
                const itemId = `${id}_${type}_${index}`
                const zbCode = item.zb_code
                let newTemplateData = null
                if (type && type.indexOf('mix') < 0) {
                    const yAxisFormat = getYAxisFormat(type, item.format, templateData.yAxis);
                    const xAxisFormat = getXAxisFormat(AJAXParams, xAxis);
                    newTemplateData = {
                        type: type.split('_')[1] || 'bar',
                        title: templateData.title,
                        yAxis: Object.assign({}, templateData.yAxis, {
                            type: "value",
                            // name: zbCode.zb_name,
                            name: item.zbNames && item.zbNames[0] ? item.zbNames[0] : `${zbCode.zb_name}${zbCode.unit ? `(${zbCode.unit})` : ''}`,
                            axisLabel: Array.isArray(yAxisFormat) ? yAxisFormat[0].axisLabel : yAxisFormat.axisLabel,
                            format: Array.isArray(yAxisFormat) ? yAxisFormat[0].format : yAxisFormat.format
                        }),
                        xAxis: xAxisFormat // Object.assign({}, xAxisFormat, templateData.xAxis)
                    }
                } else {
                    const formats = item.format
                    const formatArr = item.formatArr
                    let yAxis = []
                    const yAxisFormat = getYAxisFormat(type, item.format, templateData.yAxis);
                    const xAxisFormat = getXAxisFormat(AJAXParams, xAxis);
                    formats.map((_item, index) => {
                        const currentName = formatArr[index].name
                        const _formatArr = []
                        formatArr.map(itemFormat => {
                            const _current = _formatArr.find(item => item.name === itemFormat.name)
                            if (!_current || _current < 0) {
                                _formatArr.push(itemFormat)
                            }
                        })
                        const _index = _formatArr.findIndex(it => it.name === currentName)
                        yAxis[_index] = Object.assign({}, templateData.yAxis, {
                            type: "value",
                            // name: currentName,
                            name: item.zbNames && item.zbNames[index] ? item.zbNames[index] : currentName,
                            axisLabel: yAxisFormat[_index]?.axisLabel,
                            format: yAxisFormat[_index]?.format
                        })
                    })
                    newTemplateData = {
                        type: 'mix',
                        title: templateData.title,
                        yAxis,
                        xAxis: xAxisFormat //Object.assign({}, templateData.xAxis, xAxisFormat)
                    }
                }
                const itemOption = Object.assign({}, templateData, newTemplateData)
                const otherParam = {
                    templateData: itemOption,
                    title,
                    controlledElement
                }
                const downData = getDownloadData(item, AJAXParams, otherParam)
                // 下载所需要的全部参数
                const downParams = {
                    ifChartDownload,
                    // iconStyle,
                    downData,
                    params: AJAXParams
                }
                let param = {
                    id: itemId,
                    option: itemOption,
                    data: item,
                    style: itemStyle,
                    contentStyle,
                    wrapStyle,
                    ...downParams,
                    propsDownStyle,
                    colsNum,
                    optionRender,
                    showDataZoomLength,
                    layoutDirection,
                    onObserver: this.props.onObserver,
                };
                console.log('paramparamparamparam', param)
                return (
                    <React.Fragment>
                        <Common {...param} key={itemId} dataLabelFLag={dataLabelFLag}/>
                    </React.Fragment>)
            }) : <Common layoutDirection={layoutDirection} dataLabelFLag={dataLabelFLag} contentStyle={contentStyle} style={itemStyle} wrapStyle={wrapStyle} propsDownStyle={propsDownStyle} data={null} />}
        </div>;
    }
}

Normal.propTypes = {

};

export default Normal;