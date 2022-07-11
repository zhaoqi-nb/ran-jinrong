'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Component from '../../util/component';
import { Spin } from 'antd';
import Filter from '../common/index';
import Api from './store/api'
import EditTemplate from '../../util/editTemplate/index';
import { isEmpty } from '../../../../utils/Util';
import { i18n } from '@/components/FastIntl';
import { resetPageData } from '../../../../utils/pageData'
import { getPrivilegeData, getKeyPrivilege } from '../../util/template';
import _ from 'lodash'

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
            title: null,
            data: null,
            selectId: null,
            url: null,
            ifAjax: null,
            paramKey: null,
            disabled: null,
            //转换后端返回来的参数 例如 {"code":"zb_code","name":"zb_name"}
            transformParam: null,
            // "全部"/"不限"/"全行业" 与其他选项是否 互斥
            isMutualExcluion: null,
            explain: null,
            //是否限制行业
            ifLimit: false,
            first_type_limit_app: [],
            //默认选中最后
            ifLastSelected: false,
            noBg: null,
        }
    }
    queryComponentData = () => {
        const { id } = this.props;
        const tempData = this.getTemplateData(id);
        //defalut value
        let instantiationId = null,
            templateData = null,
            title = null,
            selectId = null,
            ifAjax = null,
            data = null,
            url = null,
            disabled = null,
            transformParam = null,
            isMutualExcluion = null,
            controlledElement = null,
            effectElement = null,
            paramKey = null,
            paramKeys = [],
            explain = null,
            type = null,
            isNoApiParam = null,
            ifLimit = false,
            ifLastSelected = false,
            noBg = false,
            //组件状态
            componentState = "InMount";

        let privilegeData = getPrivilegeData(["first_type_limit_app"])
        const first_type_limit_app = _.get(privilegeData, 'first_type_limit_app.data', [])

        //分解数据
        if (tempData) {
            try {
                let templateProperty = tempData.templatePropertyValueJson;

                instantiationId = tempData.instantiationId;
                templateData = templateProperty;

                selectId = this.setDefault(templateProperty.selectId);
                data = this.setDefault(templateProperty.data, null);
                title = this.setDefault(templateProperty.title, "");
                disabled = this.setDefault(templateProperty.disabled, false);
                url = this.setDefault(templateProperty.url);
                paramKey = this.setDefault(templateProperty.paramKey);
                isMutualExcluion = this.setDefault(templateProperty.isMutualExcluion);
                controlledElement = this.setDefault(templateProperty.controlledElement, []);
                transformParam = this.setDefault(templateProperty.transformParam, null);
                effectElement = this.setDefault(templateProperty.effectElement, {});
                paramKeys = this.setDefault(templateProperty.paramKeys, ["date_type"]);
                explain = this.setDefault(templateProperty.explain, null);
                type = this.setDefault(templateProperty.type, null);
                isNoApiParam = this.setDefault(templateProperty.isNoApiParam, null);
                ifLimit = this.setDefault(templateProperty.ifLimit, false);
                ifAjax = data && data.length ? false : true;
                ifLastSelected = this.setDefault(templateProperty.ifLastSelected, false);
                noBg = this.setDefault(templateProperty.noBg, false);
                if (!selectId && !ifAjax && data && data.length) selectId = data[0]["code"];

                //是否需要获取数据
                if (ifAjax) componentState = "InMount";
                else componentState = "DidMount";

            } catch (error) {
                console.log(error);
            }
        }
        if (!ifAjax) {
            Array.isArray(data) && data.forEach(item => {
                item.disabledName = i18n.format(item.name)
            })
            data = this.optionsAuth(data, instantiationId)
        }

        this.setState({
            instantiationId, templateData, title, disabled, selectId, data, url, transformParam, paramKey, isMutualExcluion,
            ifAjax, effectElement, controlledElement, componentState, paramKeys, explain, type, isNoApiParam, first_type_limit_app, ifLimit,
            ifLastSelected, noBg
        }, () => {
            this.triggerLoadData()
        });
    }
    optionsAuth = (options, instantiationId) => {

        let privilegeData = getKeyPrivilege("show_data_app");
        if (privilegeData && Array.isArray(privilegeData.data)) {
            options = this.processingData(privilegeData.data, options);
        }

        // 获取权限操作数据
        let privilegeDataAppId = getKeyPrivilege('show_data_app_id');
        if (privilegeDataAppId && privilegeDataAppId[instantiationId]?.data) {
            options = this.processingData(privilegeDataAppId[instantiationId].data, options)
        }
        return options;
    }
    // 处理数据
    processingData = (privilegeData, options) => {
        let arr = [];
        for (let i = 0, len = options.length; i < len; i++) {
            let currItem = options[i];
            if (privilegeData.indexOf(currItem.name) != -1) {
                arr.push(currItem);
            }
        }
        return arr;
    }
    exportLoadDataFun = () => {
        const { ifAjax, url, templateData } = this.state;
        if (!ifAjax) return;

        const data = templateData ? templateData.data : null
        if (data && data.length) {
            // 默认取第一个
            if (data.length) {
                let selectId = data[0].code;
                this.setState({ selectId, componentState: "DidMount" });
            }
        } else {
            //外部API
            if (url) this.getOutBusinessApi();
            else this.getFilterData();
        }
    }
    exportParamFun = () => {
        const { paramKey, componentState, data, selectId, originData } = this.state;
        const { transformParam } = this.props
        if (componentState != "DidMount") return null;
        let param = {};
        param[paramKey] = selectId;
        if (data && data.length) {
            let temp = data.find(item => item.code == selectId);
            if (temp) param[`${paramKey}_$name`] = temp.name;
        }
        if (transformParam && typeof (transformParam) === 'function') param = transformParam(param, selectId, originData)
        return param;
    }
    transformData = (data) => {
        const { transformParam } = this.state;
        let arr = [];
        for (let i = 0, len = data.length; i < len; i++) {
            let obj = data[i];
            arr.push({
                "code": obj[transformParam.code],
                "name": obj[transformParam.name],
                disabledName: i18n.format(obj[transformParam.name])
            })
        }
        return arr;
    }
    getOutBusinessApi = async () => {
        const { instantiationId, url, transformParam, paramKeys, ifLastSelected } = this.state;
        if (!instantiationId) return;

        let params = this.getApiParam();
        if (!params) return null;

        const zbParams = {}
        paramKeys.map(item => {
            zbParams[item] = params[item]
        })

        const result = await Api.getOutBusinessApi({
            instantiationId,
            params: JSON.stringify(zbParams) // JSON.stringify(params)
        }, url)

        let data = [];
        let selectId = "";
        if (result.code == 200) {
            data = result.data;
            if (transformParam) data = this.transformData(data);
            if (data && data.length) selectId = data[0]["code"];
        }
        //是否默认选中最后一个
        if (ifLastSelected) {
            let allowSelected = data.filter(item => item.code)
            if (allowSelected.length) {
                selectId = allowSelected[allowSelected.length - 1].code
            }
        }
        this.setState({ data, selectId, componentState: "DidMount" })
    }

    // 是否只要汇率参数
    isHasOnlyNowCurrencyParams(params) {
        const pList = Object.keys(params);
        return pList.length === 1 && pList?.[0] === 'now_currency'
    }
    //调用api获取数据
    getFilterData = async () => {
        const { instantiationId, ifAjax, transformParam, isNoApiParam, first_type_limit_app, ifLimit, ifLastSelected } = this.state;
        if (!instantiationId || !ifAjax) return;

        let params = this.getApiParam();
        // if () return null;

        if (!isNoApiParam && (this.isHasOnlyNowCurrencyParams(params) || isEmpty(params))) return null;

        const result = await Api.getFilterData({
            instantiationId,
            params: JSON.stringify(params)
        })
        let data = [];
        let selectId = "";
        let originData = []
        if (result.code == 200) {
            data = result.data;
            if (data.result && data.result.list) data = data.result.list

            if (ifLimit && first_type_limit_app.length) {
                //是否限制行业
                data = data.filter(item => {
                    let flag = first_type_limit_app.some(v => {
                        if (v == item.name) return true
                    })
                    if (!flag) item.code = null
                    return item
                })
            }

            originData = data
            if (transformParam) data = this.transformData(data);
            if (data && data.length) selectId = data.filter(item => item.code)[0].code
            //是否默认选中最后一个
            if (ifLastSelected) {
                let allowSelected = data.filter(item => item.code)
                if (allowSelected.length) {
                    selectId = allowSelected[allowSelected.length - 1].code
                }
            }
        }
        this.setState({ originData, data, selectId, componentState: "DidMount" }, () => {
            setTimeout(this.triggerLoadData(), 500)
        })
    }

    handleSelectChange = (value) => {
        resetPageData();
        this.setState({ selectId: value.code }, () => {
            this.exportParamFun();
            this.triggerLoadData();
        })
    }

    renderLoading = () => {
        return <Spin tip="Loading..." />
    }

    renderContent = () => {
        const { id, style } = this.props;
        const { title, data, selectId, disabled, isMutualExcluion, explain, type, noBg } = this.state;
        let param = {
            id,
            title,
            data,
            selectId,
            disabled,
            style,
            isMutualExcluion,
            explain,
            type,
            noBg,
            onSelect: this.handleSelectChange
        };
        return <Filter {...param} />
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
    style: PropTypes.object
};

Index.defaultProps = {
    style: {}
}

export default Index;