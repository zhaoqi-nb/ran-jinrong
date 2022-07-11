'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Component from '../../util/component';
import Normal from './normal';
import LoopIndustry from './loopIndustry';
import EditTemplate from '../../util/editTemplate/index';
import { getPrivilegeData } from '../../util/template';
import _ from 'lodash';
import Api from './store/api'


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.onFocus = this.onFocus.bind(this)
    }

    componentWillReceiveProps(nextProps) {
    }

    getInitialState = () => {
        return {
            //组件是否准备就绪
            isReady: false,
            instantiationId: null,
            //组件数据
            templateData: null,
            type: null,
            //循环key
            loopKey: null,
            data: null,
            apiParamNames: null,
            otherParamKeys: [],
            headerMapping: null,
            //受控元素
            controlledElement: null,
            effectElement: null,
            //趋势表格子图标题配置
            chartTitleOption: null,
            //趋势表格配置取值字段
            chartIndex: null,
            ifDownload: null,
            rowSelection: undefined,
            //是否是定制化接口
            url: "",
            //异步排序
            sortConfig: null,
            showFocus: false
        }
    }
    queryComponentData = () => {
        const { id } = this.props;
        const tempData = this.getTemplateData(id);
        //defalut value
        let instantiationId = null,
            templateData = null,
            controlledElement = [],
            effectElement = [],
            type = null,
            loopKey = null,
            titleOption = null,
            apiParamNames = null,
            otherParamKeys = [],
            headerMapping = null,
            chartTitleOption = null,
            ifDownload = { show: false },
            chartIndex = null,
            rowSelection = undefined,
            url = null,
            sortConfig = {},
            pagination = null,
            showFocus = false,
            noZBDataParam = null,
            iconDisplayArr = null,
            download = null;

        //分解数据
        if (tempData) {
            try {
                let templateProperty = tempData.templatePropertyValueJson;

                instantiationId = tempData.instantiationId;
                templateData = templateProperty;
                type = this.setDefault(templateProperty.type, "trend");
                loopKey = this.setDefault(templateProperty.loopKey, "content_name");
                titleOption = this.setDefault(templateProperty.titleOption, null);
                headerMapping = this.setDefault(templateProperty.headerMapping, {});
                apiParamNames = this.setDefault(tempData.backendPropertyValue, null);
                otherParamKeys = this.setDefault(templateProperty.otherParamKeys, []);
                controlledElement = this.setDefault(templateProperty.controlledElement, []);
                effectElement = this.setDefault(templateProperty.effectElement, []);
                chartTitleOption = this.setDefault(templateProperty.chartTitleOption, null);
                chartIndex = this.setDefault(templateProperty.chartIndex, null);
                rowSelection = this.setDefault(templateProperty.rowSelection, undefined);
                url = this.setDefault(templateProperty.url, null);
                sortConfig = this.setDefault(templateProperty.sortConfig, {});
                pagination = this.setDefault(templateProperty.pagination, {});
                showFocus = this.setDefault(templateProperty.showFocus, false);
                noZBDataParam = this.setDefault(templateProperty.noZBDataParam, null);
                download = this.setDefault(templateProperty.download, null)

                //获取权限操作数据
                //ifDownload : {"show":true}
                let privilege = getPrivilegeData(["ifDownload"]);
                if (privilege) {
                    ifDownload = privilege.ifDownload;
                }

            } catch (error) {
                console.log(error);
            }
        }
        this.setState({
            pagination,
            instantiationId,
            type,
            loopKey,
            templateData,
            titleOption,
            apiParamNames,
            otherParamKeys,
            headerMapping,
            controlledElement,
            effectElement,
            chartTitleOption,
            chartIndex,
            ifDownload,
            isReady: true,
            rowSelection,
            url,
            sortConfig,
            showFocus,
            noZBDataParam,
            iconDisplayArr,
            download,
        });  // this.triggerLoadData  暂时先去掉  不知道有啥效果
    }
    exportLoadDataFun = () => {
        const { isReady } = this.state;
        if (this.refs && this.refs.customTable) this.refs.customTable.getQueryTableData();
        const otherParams = this.getOtherParam();
        console.log('otherParamsotherParams', otherParams);
        const { rowSelection } = this.state;
        if (rowSelection) {
            const _rowSelection = { ...rowSelection, selectedRowKeys: _.get(otherParams, `[${rowSelection.key}]`, []) }
            console.log('_rowSelection_rowSelection', _rowSelection);
            this.setState({ rowSelection: _rowSelection })
        }
    }
    //对外提供参数方法
    exportParamFun = () => {
        const { isReady } = this.state;
        if (!isReady) return;
        const { rowSelection } = this.state;
        // console.log('rowSelectionrowSelection', rowSelection)
        return {
            comparisonKeys: _.get(rowSelection, 'selectedRowKeys', [])
        }
    }
    handleRowSelectionChange = (keys) => {
        const { rowSelection } = this.state;
        this.setState({ rowSelection: { ...rowSelection, selectedRowKeys: keys } }, this.triggerLoadData)
    }
    onFocus = async (record, type) => {
        const { controlledElement, isPM } = this.state;
        const controlledParams = this.getComponentParam(controlledElement);
        console.log('controlledParams', controlledParams)
        // 请求修改 attentionFlag
        console.log('record', record)
        console.log('attentionFlag', type)
        const { market, businessType, attentionType } = controlledParams
        let {
            first_type_id,
            first_type_name,
            second_type_id,
            second_type_name,
            third_type_id,
            third_type_name,
            firstIndustryId,
            firstIndustryName,
            secondIndustryId,
            secondIndustryName,
            threeIndustryId,
            threeIndustryName,
            industry_id,
            industry_name,
            industryId,
            industryName,
            type_id,
            type_name,
            brand_id,
            brand_name,
            brandId,
            brandName,
            summary_word,
            first_industry_id,
            first_industry_name,
            second_industry_id,
            second_industry_name,
            third_industry_id,
            third_industry_name
        } = record
        console.log(record, 7868);

        // 兼容后端多个参数名

        first_type_id = first_type_id ? first_type_id : firstIndustryId ? firstIndustryId : first_industry_id
        first_type_name = first_type_name ? first_type_name : firstIndustryName ? firstIndustryName : first_industry_name
        second_type_id = second_type_id ? second_type_id : secondIndustryId ? secondIndustryId : second_industry_id
        second_type_name = second_type_name ? second_type_name : secondIndustryName ? secondIndustryName : second_industry_name
        third_type_id = third_type_id ? third_type_id : threeIndustryId ? threeIndustryId : third_industry_id
        third_type_name = third_type_name ? third_type_name : threeIndustryName ? threeIndustryName : third_industry_name


        const level = (first_type_id == -100 || first_type_id == "-") ? 0 : (second_type_id == -100 || !second_type_id || second_type_id == "-") ? 1 : (third_type_id == -100 || !third_type_id || third_type_id == "-") ? 2 : 3


        brand_id = brand_id ? brand_id : brandId
        brand_name = brand_name ? brand_name : brandName
        industry_id = industry_id ? industry_id : industryId ? industryId : brand_id
        industry_name = industry_name ? industry_name : industryName

        const params = {
            instantiationId: 'addAttention',
            market: market ? market : isPM ? 1 : 2, // 1 一级市场, 2 二级市场
            businessType: record.businessType ? record.businessType : businessType, // 1 国内电商, 2 线下门店, 3 舆情分析
            attentionType: record.attentionType ? record.attentionType : attentionType, // 1 行业, 2 品牌, 3 概念, 4 公司
            extraAttrJson: JSON.stringify({
                first_type_id,
                first_type_name,
                second_type_id,
                second_type_name,
                third_type_id,
                third_type_name,
                level,
                industry_id,
                industry_name,
            }), // json数据，例如三级行业的id和行业级数
            itemId: summary_word ? summary_word : brand_id ? brand_id : industry_id ? industry_id : type_id, // 关注id
            itemName: summary_word ? summary_word : brand_name ? brand_name : industry_name ? industry_name : type_name, // 关注名称
            type // 0 关注, 1 取消关注
        }
        const url = "/trackSearch/addAttention"
        console.log('attentionParams', params)
        const res = await Api.getOutBusinessApi(params, url)
        if (res.data === 1) { // 1 成功, 2失败
            // this.setState({
            //     isUpdate: !this.state.isUpdate
            // })
            return true
        }
    }
    renderContent = () => {
        const { type, chartIndex, sortConfig, noZBDataParam, download } = this.state;
        const { columnsRender, titleRender, sortIndex } = this.props;
        let param = {
            ...this.state,
            onOpenPopup: this.triggerOpenPopup,
            getApiParam: this.getApiParam,
            columnsRender,
            titleRender,
            chartIndex,
            onRowSelectionChange: this.handleRowSelectionChange,
            sortIndex,
            sortConfig,
            onFocus: this.onFocus,
            noZBDataParam,
            download,
        };
        //循环行业，针对子行业页面
        if (type == "loopIndustry") return <LoopIndustry {...param} ref="customTable" />
        else if (type == "loop") return <LoopIndustry {...param} ref="customTable" />
        else return <Normal {...param} ref="customTable" />
    }
    render() {
        const { isReady, instantiationId } = this.state;
        if (!isReady) return null;
        //渲染内容
        return <EditTemplate instantiationId={instantiationId}>
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
