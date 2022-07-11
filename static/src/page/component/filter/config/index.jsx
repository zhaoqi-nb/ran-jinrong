'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Component from '../../util/component';
import { getTemplateData, getPrivilegeData } from '../../util/template';
import { Spin } from 'antd';
import Common from '../common/index';
import EditTemplate from '../../util/editTemplate/index';
import Api from './store/api';
import i18n from '@/plugin/i18n'
import _ from 'lodash';
import { getTableIsDownload } from '../../../../utils/pageData';
import DownExcel from '@downExcel/common/index';
import { setTableIsDownload } from '../../../../utils/pageData';
import { getPageData } from '../../../../page/component/page/util';
import { getData } from '../../../../page/component/util/template';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        const isDownload = this.isDownload();
        const tabIsDownload = getTableIsDownload();
        if (!tabIsDownload) {
            setTableIsDownload(isDownload);
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    // componentDidMount() {
    //     const isDownload = this.isDownload()
    //     setTableIsDownload(isDownload);
    // }

    getInitialState = () => {
        return {
            value: null,
            valueObj: null,
            //组件状态  WillMount/挂载前（组件还未渲染）, InMount/挂载中（组件执行渲染，可能需要获取数据才可以初始化好）  DidMount/挂载完成（组件准备就绪）   
            componentState: "WillMount",
            instantiationId: null,
            //组件数据
            templateData: null,
            //受控元素
            controlledElement: null,
            title: null,
            //影响元素
            effectElement: null,
            //数据
            plainOptions: null,
            defaultval: null,
            //请求路径
            url: null,
            paramKey: null,
            //默认选中几个
            selectNumber: null,
            //数据说明
            explain: null,
        }
    }
    queryComponentData = () => {
        const { id } = this.props;

        const tempData = getTemplateData(id);
        //defalut value
        let instantiationId = null,
            templateData = null,
            controlledElement = [],
            effectElement = [],
            //类型
            type = null,
            title = null,
            //
            defaultval = [],
            //数据
            plainOptions = [],
            apiParamNames = null,
            paramKey = null,
            url = null,
            paramKeys = [],
            //全选配置
            ifAllSelect = false,
            icon = '',
            //默认选中几个
            selectNumber = null,
            //数据说明
            explain = null,
            isNoApiParam = null,
            downloadDisplay = null,
            //组件状态
            componentState = "InMount";

        //分解数据
        if (tempData) {
            try {
                let templateProperty = tempData.templatePropertyValueJson;

                instantiationId = tempData.instantiationId;
                templateData = templateProperty;
                type = this.setDefault(templateProperty.type, 'simple');
                defaultval = this.setDefault(templateProperty.defaultval, []);
                title = this.setDefault(templateProperty.title, '');
                plainOptions = this.setDefault(templateProperty.plainOptions, []);
                apiParamNames = this.setDefault(tempData.backendPropertyValue, null);
                paramKey = this.setDefault(templateProperty.paramKey);
                controlledElement = this.setDefault(templateProperty.controlledElement, []);
                effectElement = this.setDefault(templateProperty.effectElement, []);
                url = this.setDefault(templateProperty.url, apiParamNames === null ? '/zb/getSelectedZbInfo' : null);
                paramKeys = this.setDefault(templateProperty.paramKeys, ["date_type"]);
                ifAllSelect = this.setDefault(templateProperty.ifAllSelect, false);
                selectNumber = this.setDefault(templateProperty.selectNumber, null);
                icon = this.setDefault(templateProperty.icon, '');
                explain = this.setDefault(templateProperty.explain, '');
                isNoApiParam = this.setDefault(templateProperty.isNoApiParam, null);
                downloadDisplay = this.setDefault(templateProperty.downloadDisplay, null);
                if (plainOptions.length) componentState = "DidMount";
            } catch (error) {
                console.log(error);
            }
        }

        const privilege = getPrivilegeData(['page_type']);
        console.log('privilegeprivilegeprivilege', privilege);
        this.setState({ instantiationId, templateData, controlledElement, effectElement, componentState, type, defaultval, title, plainOptions, apiParamNames, paramKey, url, paramKeys, ifAllSelect, icon, selectNumber, explain, isNoApiParam, downloadDisplay }, () => {
            if (!plainOptions.length) {
                this.getSelectedZbInfo()
            } else {
                this.triggerLoadData(effectElement);
            }
        });
    }
    //获取数据
    getSelectedZbInfo = async () => {
        let { effectElement, url, instantiationId, apiParamNames, defaultval, paramKeys, ifAllSelect, selectNumber, isNoApiParam, downloadDisplay } = this.state;
        const locale = i18n.getLocalLanguage();
        let params = this.getApiParam(downloadDisplay)
        if (!params || params == -1) {
            if (!isNoApiParam && apiParamNames) {
                setTimeout(this.getSelectedZbInfo, 500);
                return null;
            } else if (isNoApiParam) {
                setTimeout(this.getSelectedZbInfo, 500);
                return null;
            }
        }

        let result = null
        if (url) {
            const zbParams = {}
            paramKeys.map(item => {
                zbParams[item] = params ? params[item] : ''
            })
            result = await Api.getSelectedZbInfo({
                instantiationId,
                params: zbParams ? JSON.stringify(zbParams) : ''
                // params == -1 ? {} : JSON.stringify(params)
            }, url)
        } else {
            result = await Api.getTemplateSelectData({ instantiationId, params: params == -1 ? {} : JSON.stringify(params) });

        }

        let plainOptions = []
        if (result.code == 200) {
            let datas = url ? result.data : result.data.result.list
            let defaultvalNew = []
            plainOptions = datas.map(item => {
                if (url) {
                    item.label = locale == "zh_CN" ? item.zb_name : item.zb_name_en
                    item.value = item.zb_code
                    if (item.children && item.children.length) {
                        //获取默认选中值 复杂类型
                        let arr = []
                        item.children = item.children.map(v => {
                            v.label = v.zb_name
                            v.value = v.zb_code
                            //判断是否被选中
                            if (v.default_select == 1) {
                                if (!defaultvalNew.some(j => j == v.value)) arr.push(v.value)
                            }
                            return v
                        })
                        defaultvalNew.push(arr)
                    } else {
                        //获取默认选中值简单类型
                        if (item.default_select == 1) {
                            if (!defaultvalNew.some(v => v == item.value)) defaultvalNew.push(item.value)
                        }
                    }
                } else {
                    item.label = i18n.format(item.name);
                    item.value = item.code;
                    if (ifAllSelect) {
                        defaultvalNew.push(item.code);
                    } else if (defaultvalNew.length < (selectNumber || 2)) {
                        defaultvalNew.push(item.code);
                    }
                }
                return item
            })
            defaultval = defaultvalNew
        }
        this.setState({ plainOptions, componentState: 'DidMount', defaultval }, () => {
            this.triggerLoadData(effectElement)
        })

    }
    exportLoadDataFun = () => {
        // this.setState({ value: [] }, this.getSelectedZbInfo)
        this.getSelectedZbInfo()
    }
    exportParamFun = () => {
        const { value, paramKey, plainOptions, type } = this.state;
        let param = {},
            valueObj = this.getSelectObj(value, plainOptions, type);
        if (value) {
            param[paramKey] = value.join(',');
            param[`${paramKey}_data`] = valueObj
        } else {
            param = null
        }
        return param
    }

    //获取选中value的对象
    getSelectObj = (e, plainOptions, type) => {
        let selectObj = []
        if (type == 'complex') {
            let objArr = []
            plainOptions.forEach(item => {
                item.children.forEach(v => {
                    objArr.push(v)
                })
            })
            e?.forEach(item => {
                objArr.forEach(v => {
                    if (v.value == item) selectObj.push(v)
                })
            })
        } else {
            for (let i in e) {
                let flag = false
                for (let index in plainOptions) {
                    if (plainOptions[index].zb_code == e[i] || plainOptions[index].code == e[i]) {
                        selectObj.push(plainOptions[index])
                        flag = true
                        break;
                    }
                }
            }
        }

        return selectObj
    }


    getObjectData = (obj) => {
        const { controlledElement } = this.state;
        let data = [],
            defaultSelect = null;
        if (obj && (obj instanceof Object)) {
            try {
                let params = getComponentParam(controlledElement) || {};
                for (let key in params) {
                    let value = params[key];
                    if (obj[value]) data = obj[value];
                }
            } catch (error) {
                console.log(error)
            }
        }
        this.setState({ data, defaultSelect })
    }

    getTemplateData = async () => {
        let { instantiationId, controlledElement } = this.state;
        if (!instantiationId) return;
        //get 请求参数
        const params = getComponentParam(controlledElement);
        if (!params) return;
        //查询数据
        const result = await Api.getTemplateData({ instantiationId, params: params == -1 ? {} : JSON.stringify(params) });
        let data = [];
        if (result.code == 200) {
            data = result.data && result.data.result ? result.data.result.list : [];

        }
        this.setState({ plainOptions: data, isReady: true });
    }

    handleChange = (value, valueObj) => {
        const { effectElement } = this.state;
        let arr = _.cloneDeep(value),
            brr = _.cloneDeep(valueObj)
        this.setState({ value: arr, valueObj: brr }, () => {
            this.triggerLoadData(effectElement);
        });
    }

    renderLoading = () => {
        return <Spin tip="Loading..." />
    }

    isDownload = () => {
        let routers = ['646', '6575']; //特殊路由显示下载按钮
        const splits = location.pathname.split('/');
        if (Array.isArray(splits) && splits.length > 1 && routers.indexOf(splits[splits.length - 1]) !== -1) {
            const pageDate = getPageData();
            const privilegeDtoList = pageDate.privilegeDtoList;
            const ifDownload = getData('ifDownload', privilegeDtoList);
            return ifDownload && ifDownload.show;
        }
        return false;
    }

    getFilterParams = (industryList) => {
        const { controlledElement, paramKey } = this.state;
        const params = this.getComponentParamNoReturn(controlledElement, industryList);
        return [params, paramKey];
    }

    renderContent = () => {
        const { instantiationId, plainOptions, type, defaultval, title, ifAllSelect, icon, explain, downloadDisplay } = this.state;
        const { style, style_btn, className, onObserver, isShowiGuid, downloadChange } = this.props
        let param = {
            id: instantiationId,
            plainOptions,
            type,
            style,
            style_btn,
            className,
            title,
            defaultval,
            ifAllSelect,
            icon,
            explain,
            onObserver,
            isShowiGuid,
            downloadDisplay,
            downloadChange,
        };

        return <Common ref="refFiltrate" {...param} handleChange={this.handleChange} />

    }
    render() {
        const { componentState, instantiationId, downloadDisplay } = this.state;
        const tableIsDownload = getTableIsDownload();
        console.log('tableIsDownload', tableIsDownload)
        if (componentState == "WillMount") return null;
        else if (componentState == "InMount") return this.renderLoading();
        //渲染内容
        return <><EditTemplate instantiationId={instantiationId} style={{ display: "inline-block" }}>
            {this.renderContent()}
        </EditTemplate>
            <span style={{ position: 'absolute', top: '13px', right: 0 }}>
                {tableIsDownload && !downloadDisplay ? <DownExcel iconStyle={{ color: '#0678FF' }} downText='下载选中所有指标' downPage config={{ show: true, dataType: "table" }} /> : null}
            </span>
        </>
    }
}

Index.propTypes = {
    id: PropTypes.number.isRequired,
};

Index.defaultProps = {
}

export default Index;
