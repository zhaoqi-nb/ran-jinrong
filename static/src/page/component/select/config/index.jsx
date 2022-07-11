'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Component from '../../util/component';
import EditTemplate from '../../util/editTemplate/index';

import { Spin } from 'antd';
import Common from '../common/index';
import ExchangeRate from './exchangeRate'
import { getPrivilegeData, getKeyPrivilege } from '../../util/template';
import { isEmpty } from '../../../../utils/Util';
import Api from './store/api';
import i18n from '@/plugin/i18n'
import debounce from 'lodash/debounce';
import RsIcon from '../../rsIcon';
import _ from 'lodash'

const ICONARRAY = ["天猫+京东", "天猫+京东+抖音", "抖音", "天猫", "京东", "大众点评/地图"]

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.onSearch = debounce(this.onSearch, 500)
    }


    componentDidMount() {
        this.queryComponentData();
        //注册事件
        this.registerEvent();
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillUnmount() {
        this.setState(this.getInitialState());
        //销毁事件
        this.destroyEvnet();
    }

    getInitialState = () => {
        return {
            value: null,
            //组件状态  WillMount/挂载前（组件还未渲染）, InMount/挂载中（组件执行渲染，可能需要获取数据才可以初始化好）  DidMount/挂载完成（组件准备就绪）   
            componentState: "WillMount",
            instantiationId: null,
            //组件数据
            templateData: null,

            // 数据
            title: null,
            options: null,
            placeholder: null,
            defaultSelectKey: null,
            moreText: null,
            dropdownMatchSelectWidth: null,
            ifEmptyHide: null,
            ifDefaultSelect: null,
            disabled: null,
            // 单选  多选模式
            mode: null, // single  multiple
            // 限制最多显示条数
            maxTagCount: null,
            // 限制最多可选条数
            maxSelectCount: null,
            // 是否限制显示条数
            ifLimitMaxTagCount: null,
            // 是否模拟44类型筛选器传出数据
            ifAnalogyFilter: null,
            //清空影响组件对state数据
            clearEffectState: null,
            ajaxBackParam: null,
            paramKey: null,
            select_limitData_app: null,
            select_limitData_app_id: null,
            // 影响元素
            effectElement: null,
            //受控元素
            controlledElement: null,
            //获取默认选中值的key
            getDefaultKey: null,
            //url默认选中
            locationSearchKey: null,
            // 是否开启下拉框条件显示： 适用于前一个关联下拉框选中指定的值的条件下显示
            ifConditionShow: null,
            // 前一个下拉框传进来的参数名
            conditionShowParamKey: null,
            // 前一个下拉框选中指定条件值
            conditionShowCode: null,
            // 控制隐藏 默认显示
            ifHidden: null,
            // 后端搜索
            ifSearchAsync: null,
            search_name: null,
            // 指标说明
            explain: null,
            // 不需要配置api，但需要参数
            isNoApiParam: null,
            // 汇率下拉框
            isExchangeRate: null,
            // 类型
            type: 'nomal',
            authIsCode: null,
            //请求参数的间隔
            timeInterval: null,
            showSearch: null,
            noBorder: null,
        }
    }

    // 处理数据
    processingData = (privilegeData, options, isCode) => {
        let arr = [];
        for (let i = 0, len = options.length; i < len; i++) {
            let currItem = options[i];
            const name = isCode ? currItem.code : currItem.name;
            if (privilegeData.indexOf(name) != -1) {
                arr.push(currItem);
            }
        }
        return arr;
    }

    queryComponentData = () => {
        const { id } = this.props;
        const tempData = this.getTemplateData(id);//{templatePropertyValueJson:{"title":"线上电商平台选择","data":[{"name":"全部","code":"全部"},{"name":"新一线城市","code":"新一线城市"}],"defaultSelectKey":"全部","paramKey":"platform_name","effectElement":["909","911"]}};//
        //defalut value
        let instantiationId = null,
            templateData = null,
            title = null,
            options = null,
            placeholder = null,
            defaultSelectKey = null,
            moreText = null,
            dropdownMatchSelectWidth = null,
            ifEmptyHide = null,
            ifDefaultSelect = null,
            disabled = null,
            mode = null,
            maxTagCount = null,
            maxSelectCount = null,
            ifLimitMaxTagCount = null,
            ifAnalogyFilter = null,
            clearEffectState = null,
            ajaxBackParam = null,
            paramKey = null,
            effectElement = [],
            select_limitData_app = null,
            select_limitData_app_id = null,
            controlledElement = [],
            url = null,
            //组件状态
            componentState = "InMount",
            apiParamNames = [],
            paramKeys = [],
            getDefaultKey = null,
            locationSearchKey = null,
            ifConditionShow = null,
            conditionShowParamKey = null,
            conditionShowCode = null,
            ifHidden = null,
            ifSearchAsync = null,
            search_name = null,
            explain = null,
            isNoApiParam = null,
            isExchangeRate = null,
            isMultipleI18n = true,
            type = 'nomal',
            authIsCode = null,
            timeInterval = null,
            showSearch = null,
            noBorder = null;
        //分解数据
        if (tempData) {
            try {
                let templateProperty = tempData.templatePropertyValueJson;

                instantiationId = tempData.instantiationId;
                templateData = templateProperty;
                title = this.setDefault(templateProperty.title);
                options = this.setDefault(templateProperty.data, []);
                placeholder = this.setDefault(templateProperty.placeholder, `${i18n.format("请选择")}`);
                defaultSelectKey = this.setDefault(templateProperty.defaultSelectKey);
                moreText = this.setDefault(templateProperty.moreText, i18n.format("默认显示100项，更多请搜索"));
                dropdownMatchSelectWidth = this.setDefault(templateProperty.dropdownMatchSelectWidth, true);
                ifEmptyHide = this.setDefault(templateProperty.ifEmptyHide, false);
                ifDefaultSelect = this.setDefault(templateProperty.ifDefaultSelect, true);
                disabled = this.setDefault(templateProperty.disabled, false);
                mode = this.setDefault(templateProperty.mode);
                maxTagCount = this.setDefault(templateProperty.maxTagCount, 5);
                maxSelectCount = this.setDefault(templateProperty.maxSelectCount, 99);
                ifLimitMaxTagCount = this.setDefault(templateProperty.ifLimitMaxTagCount, true);
                ifAnalogyFilter = this.setDefault(templateProperty.ifAnalogyFilter);
                clearEffectState = this.setDefault(templateProperty.clearEffectState, null);
                ajaxBackParam = this.setDefault(templateProperty.ajaxBackParam);
                paramKey = this.setDefault(templateProperty.paramKey);
                select_limitData_app = this.setDefault(templateProperty.select_limitData_app);
                select_limitData_app_id = this.setDefault(templateProperty.select_limitData_app_id);
                effectElement = this.setDefault(templateProperty.effectElement, []);
                controlledElement = this.setDefault(templateProperty.controlledElement, []);
                url = this.setDefault(templateProperty.url, '');
                apiParamNames = this.setDefault(tempData.backendPropertyValue, null);
                getDefaultKey = this.setDefault(templateProperty.getDefaultKey, null);
                paramKeys = this.setDefault(templateProperty.paramKeys, ["date_type"]);
                // url默认选中
                locationSearchKey = this.setDefault(templateProperty.key, null);
                ifConditionShow = this.setDefault(templateProperty.ifConditionShow);
                conditionShowParamKey = this.setDefault(templateProperty.conditionShowParamKey);
                conditionShowCode = this.setDefault(templateProperty.conditionShowCode);
                ifHidden = this.setDefault(templateProperty.ifHidden, false);
                ifSearchAsync = this.setDefault(templateProperty.ifSearchAsync, false);
                search_name = this.setDefault(templateProperty.search_name, "search_name");
                explain = this.setDefault(templateProperty.explain, '');
                isNoApiParam = this.setDefault(templateProperty.isNoApiParam, false);
                isExchangeRate = this.setDefault(templateProperty.isExchangeRate, false);
                isMultipleI18n = this.setDefault(templateProperty?.isMultipleI18n, true); // 是否多选国际化
                type = this.setDefault(templateProperty?.type, 'nomal'); // 是否多选国际化
                authIsCode = this.setDefault(templateProperty?.authIsCode, true); // 是否用code判断权限
                timeInterval = this.setDefault(templateProperty?.timeInterval, 500);
                showSearch = this.setDefault(templateProperty?.showSearch, true);
                noBorder = this.setDefault(templateProperty?.noBorder, false);
                // 更新组件状态
                if (!options || !options.length) componentState = "InMount";
                else componentState = "DidMount";
            } catch (error) {
                console.log(error);
            }
        }
        Array.isArray(options) && options.forEach(item => {
            item.disabledName = i18n.format(item.name)
        })
        options = this.optionsAuth(options, instantiationId);
        defaultSelectKey = this.getNewSelectKey(options, defaultSelectKey)

        this.setState({
            instantiationId, ifSearchAsync, templateData, title, options, placeholder, defaultSelectKey, moreText,
            dropdownMatchSelectWidth, ifEmptyHide, ifDefaultSelect, disabled, mode, maxTagCount, maxSelectCount, ifLimitMaxTagCount,
            ifAnalogyFilter, clearEffectState, controlledElement, componentState, ajaxBackParam, paramKey, select_limitData_app,
            select_limitData_app_id, apiParamNames, effectElement, url, getDefaultKey, paramKeys, locationSearchKey, ifConditionShow,
            conditionShowParamKey, conditionShowCode, ifHidden, explain, isExchangeRate, search_name, isMultipleI18n, isNoApiParam, type,
            authIsCode, timeInterval, showSearch, noBorder
        }, () => {
            if (!templateData || !templateData.data) {
                this.getTemplateSelectData()
            }
        });
    }

    optionsAuth = (options, instantiationId, isCode) => {
        let privilegeData = getKeyPrivilege("show_data_app");
        if (privilegeData && Array.isArray(privilegeData.data)) {
            options = this.processingData(privilegeData.data, options, isCode);
        }

        // 获取权限操作数据
        // let privilegeDataAppId = getKeyPrivilege('show_data_app_id');
        let privilegeDataAppId = getPrivilegeData(["show_data_app_id"], instantiationId)
        const show_data_app_id = _.get(privilegeDataAppId, `show_data_app_id.${instantiationId}.data`, [])
        if (show_data_app_id && show_data_app_id.length) {
            options = this.processingData(show_data_app_id, options, isCode)
        }
        // if (privilegeDataAppId && privilegeDataAppId[instantiationId]?.data) {
        //     options = this.processingData(privilegeDataAppId[instantiationId].data, options, isCode)
        // }
        return options;
    }

    getNewSelectKey = (options, defaultSelectKey) => {
        if (!options || !defaultSelectKey) return defaultSelectKey
        const selectItem = options.find(item => item.code == defaultSelectKey)
        if (!selectItem) {
            defaultSelectKey = options.length ? options[0].code : ''
        }
        return defaultSelectKey
    }

    exportLoadDataFun = () => {
        const { templateData } = this.state;
        if (!templateData.data) {
            this.setState({ value: "" }, this.getTemplateSelectData)
            // this.getTemplateSelectData()
        }
    }
    // 获取模板内数据
    getTemplateSelectData = async (searchVal) => {
        let { instantiationId, controlledElement, apiParamNames, templateData, ajaxBackParam, optionRenderFun, url, getDefaultKey, defaultSelectKey, ifDefaultSelect, paramKeys, ifConditionShow, conditionShowParamKey, conditionShowCode, ifHidden, search_name, isNoApiParam, authIsCode, timeInterval } = this.state;
        if (!instantiationId) return;
        const { apiId } = this.props
        //get 请求参数
        const params = this.getApiParam();
        // if (!params) {
        //     setTimeout(this.getTemplateSelectData, 500);
        //     return null;
        // }
        if (!params || params == -1) {
            if (!isNoApiParam && apiParamNames) {
                setTimeout(() => { this.getTemplateSelectData(searchVal) }, timeInterval);
                return null;
            } else if (isNoApiParam) {
                setTimeout(() => { this.getTemplateSelectData(searchVal) }, timeInterval);
                return null;
            }
        }
        const _params = this.getComponentParam(controlledElement)
        // 条件显示下拉框判断
        let _ifHidden = ifHidden;
        if (ifConditionShow) {
            // 接收到指定的name参数时，显示下拉框
            if (_params.hasOwnProperty(conditionShowParamKey) && _params[conditionShowParamKey] == conditionShowCode) {
                _ifHidden = false;
            } else {
                _ifHidden = true;
            }
        }
        const zbParams = {}
        paramKeys.map(item => {
            zbParams[item] = params[item]
        })
        if (searchVal) {
            params[search_name] = searchVal
        }
        //查询数据
        let result = null
        let urlParams = { ...this.getApiParam(), [search_name]: searchVal }
        if (url) result = await Api.getSelectedZbInfo({
            instantiationId,
            // date_type: params.date_type
            params: JSON.stringify(url != "/zb/getSelectedZbInfo" ? urlParams : zbParams),
            url: url != "/zb/getSelectedZbInfo" ? url : ""
        }, url);
        else result = await Api.getTemplateSelectData({ instantiationId, params: params == -1 ? {} : JSON.stringify(params) });


        let options = [];
        if (templateData.data) {
            options = templateData.data;
        }

        if (result.code == 200 && result.data) {
            if (url) {
                options = result.data || [];
                let newOptions = [];
                options.map((item, index) => {
                    newOptions.push({ code: item.zb_code, name: item.zb_name });
                })
                options = this.transformData(newOptions);
            } else {
                if (result.data.result) {
                    options = result.data.result.list || [];
                    if (ajaxBackParam) options = translationalData(options, ajaxBackParam);
                    if (optionRenderFun) options = optionRenderFun(options, params);
                    options = this.transformData(options);
                }
            }
        }
        if (getDefaultKey) {
            defaultSelectKey = _params[getDefaultKey]
            ifDefaultSelect = true
        }
        options = this.optionsAuth(options, instantiationId, authIsCode);
        defaultSelectKey = this.getNewSelectKey(options, defaultSelectKey)
        this.setState({ options, componentState: "DidMount", defaultSelectKey, ifDefaultSelect, ifHidden: _ifHidden, searchVal });
    }


    transformData = (data) => {
        let arr = [];
        const { instantiationId, select_limitData_app, select_limitData_app_id } = this.state;
        if (!data || !data.length || (!select_limitData_app && !select_limitData_app_id)) {
            data.map((item, index) => {
                arr.push({ ...item, name: item.name, disabledName: i18n.format(item.name) })
            })
            return arr;
        }

        let limitData = select_limitData_app && select_limitData_app.data ? select_limitData_app.data : (select_limitData_app_id && select_limitData_app_id[instantiationId] ? select_limitData_app_id[instantiationId]["data"] : null);

        for (let i = 0, len = data.length; i < len; i++) {
            let obj = data[i];
            if (!limitData || limitData.indexOf(obj.code) != -1) arr.push({ ...obj, name: item.name, disabledName: i18n.format(item.name) });
        }

        return arr;
    }

    translationalData = (data, ajaxBackParam) => {
        if (!data || !data.length) return data;
        let arr = [];
        try {
            for (let i = 0, len = data.length; i < len; i++) {
                let obj = data[i];
                arr.push({
                    "code": obj[ajaxBackParam.code],
                    "name": i18n.format(obj[ajaxBackParam.name]),
                    "displayName": i18n.format(obj[ajaxBackParam.name]),
                })
            }
        } catch (error) {
            console.log("转化出错：" + error);
        }
        return arr;
    }

    // exportloadDataFun = () => {
    //     const _this = this;
    //     const { ifDefaultSelect, effectElement, clearEffectState, defaultSelectKey } = _this.state;
    //     _this.getTemplateSelectData((options)=>{
    //         if(ifDefaultSelect){
    //             let value
    //             if (defaultSelectKey) {
    //                 value = defaultSelectKey;
    //             } else {
    //                 value = options && options.length?options[0]["code"]:"";
    //             }

    //             this.setState({value},()=>{
    //                 this.triggerClearStateData(clearEffectState)
    //                 this.triggerLoadData(effectElement)
    //             });
    //         }
    //     })
    // }

    exportParamFun = () => {
        const { componentState, value, options, paramKey, ifDefaultSelect, templateData, ifAnalogyFilter } = this.state;
        if (ifDefaultSelect && (componentState != "DidMount" || !paramKey || !value)) return null;
        if (!ifDefaultSelect && (componentState != "DidMount" || !paramKey)) return null;
        let param = {};
        if (value) {
            if (Array.isArray(value)) {
                param[paramKey] = value.join(",");
            } else {
                if (value == "EMPTY") {
                    param[paramKey] = null;
                } else {
                    param[paramKey] = value;
                }

            }

            // 下载的时候重新组装一下
            const id = '_' + this.props.id;
            if (Array.isArray(value)) {
                param[paramKey + id] = value.join(",");
            } else {
                if (value == "EMPTY") {
                    param[paramKey + id] = null;
                } else {
                    param[paramKey + id] = value;
                }

            }

            // 模拟筛选器的输出参数，二级消费行业趋势页面用到
            let paramKey_data = [];
            if (templateData.data && ifAnalogyFilter) {
                let newValue
                if (Array.isArray(value)) {
                    newValue = value;
                } else {
                    newValue = value.split(",");
                }
                newValue.map((code, index) => {
                    let obj = options.find(item => item.code == code);
                    paramKey_data.push({ zb_name: obj.name, zb_code: obj.code })
                })
                param[`${paramKey}_data`] = paramKey_data;
            }
        }
        if (options && options.length) {
            let temp = options.find(item => item.code == value);
            if (temp) param[`${paramKey}_$name`] = temp.name;


            //param['codeKey'] = `${paramKey}`;
        }
        return param
    }

    exportClearStateFun = () => {
        this.setState({
            value: "",
        })
    }

    getSelectValue = (value) => {
        const { effectElement, clearEffectState } = this.state;
        this.triggerClearStateData(clearEffectState)
        this.setState({ value }, () => {
            this.triggerLoadData(effectElement);
        });
    }

    onSearch = async (searchVal) => {
        await this.getTemplateSelectData(searchVal)
    }

    rerenderOption = (text, name) => {
        let optionContent = text
        const iconStyle = { width: 20, height: 20, fontSize: 16, color: "#8c8c8c", verticalAlign: "middle" }
        if (ICONARRAY.indexOf(name) === 0) {
            optionContent = <>
                <span style={{ marginRight: 2 }}>{text}</span>
                <RsIcon style={iconStyle} type="icon-tianmao" />
                <RsIcon style={iconStyle} type="icon-jingdong" />
            </>
        } else if (ICONARRAY.indexOf(name) === 1) {
            optionContent = <>
                <span style={{ marginRight: 2 }}>{text}</span>
                <RsIcon style={iconStyle} type="icon-tianmao" />
                <RsIcon style={iconStyle} type="icon-jingdong" />
                <RsIcon style={iconStyle} type="icon-douyin" />
            </>
        } else if (ICONARRAY.indexOf(name) === 2) {
            optionContent = <>
                <span style={{ marginRight: 2 }}>{text}</span>
                <RsIcon style={iconStyle} type="icon-douyin" />
            </>
        } else if (ICONARRAY.indexOf(name) === 3) {
            optionContent = <>
                <span style={{ marginRight: 2 }}>{text}</span>
                <RsIcon style={iconStyle} type="icon-tianmao" />
            </>
        } else if (ICONARRAY.indexOf(name) === 4) {
            optionContent = <>
                <span style={{ marginRight: 2 }}>{text}</span>
                <RsIcon style={iconStyle} type="icon-jingdong" />
            </>
        } else if (ICONARRAY.indexOf(name) === 5) {
            optionContent = <>
                <span style={{ marginRight: 2 }}>{text}</span>
                <RsIcon style={iconStyle} type="icon-dazhongdianping" />
                <RsIcon style={iconStyle} type="icon-baiduditu" />
                <RsIcon style={iconStyle} type="icon-gaodeditu" />
            </>
        }
        return optionContent

    }

    renderLoading = () => {
        return <Spin tip="Loading..." />
    }
    renderContent = () => {
        const { showSearch, isMultipleI18n, instantiationId, controlledElement, searchVal, ifSearchAsync, title, options, placeholder,
            defaultSelectKey, moreText, dropdownMatchSelectWidth, ifEmptyHide, ifDefaultSelect, disabled, mode, maxTagCount, maxSelectCount,
            ifLimitMaxTagCount, locationSearchKey, ifConditionShow, conditionShowCode, ifHidden, explain, isExchangeRate, type, noBorder } = this.state;
        const { excludeDown, style, select_style, className, setSelectValue } = this.props;
        let _style = {}
        options.some(item => {
            if (ICONARRAY.indexOf(item.name) === 1) {
                _style = {
                    width: "180px"
                }
            } else if (ICONARRAY.indexOf(item.name) === 0) {
                _style = {
                    width: "215px"
                }
            }
        })
        let param = {
            id: instantiationId,
            title,
            options,
            placeholder,
            defaultSelectKey,
            moreText,
            dropdownMatchSelectWidth,
            ifEmptyHide,
            ifDefaultSelect,
            disabled,
            mode,
            maxTagCount,
            maxSelectCount,
            ifLimitMaxTagCount,
            style,
            className,
            select_style: { ...select_style, ..._style },
            locationSearchKey,
            ifConditionShow,
            conditionShowCode,
            ifHidden,
            setSelectValue,
            ifSearchAsync,
            searchVal,
            explain,
            isExchangeRate,
            controlledElement,
            isMultipleI18n,
            excludeDown,
            type,
            showSearch,
            bordered: noBorder ? false : true,
            onSearch: this.onSearch,
            rerenderOption: this.rerenderOption
        };
        if (isExchangeRate) return <ExchangeRate param={param} getSelectValue={this.getSelectValue} />
        return <Common {...param} getSelectValue={this.getSelectValue} />
    }
    render() {
        const { componentState, instantiationId } = this.state;
        if (componentState == "WillMount") return null;
        else if (componentState == "InMount") return this.renderLoading();
        //渲染内容
        return <EditTemplate instantiationId={instantiationId} style={{ display: "inline-block" }}>
            {this.renderContent()}
        </EditTemplate>
    }
}

Index.propTypes = {
    id: PropTypes.number.isRequired,
};

Index.defaultProps = {
}

export default Index;
