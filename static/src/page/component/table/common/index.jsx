/*
 * @Description: 文件描述
 * @version: 1.0
 * @Company: fengjr
 * @Author: lin.li@fengjr.com
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-18 14:36:03
 * @LastEditTime: 2022-03-16 13:46:03
 */

'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setDefault } from '../../../../utils/Util';
import TrendTable from './trendTable';
import SectionTable from './sectionTable';
import TrendChartTable from './trendChartTable';
import { gethashcode } from '../../util/hash';
import { QueryScheduler } from './expand/scheduler'
import { setTableData, getTableData } from './expand/util';
import './index.less';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.queryScheduler = new QueryScheduler()
        this.queryScheduler.run((props) => {
            // 新的state抛出type类型，防止组件重新渲染
            const { isTableDestroy } = getTableData();
            const { isReady, ...newState } = this.getInitialState();
            if (!isTableDestroy) {
                delete newState.type;
                setTableData({ isTableDestroy: true })
            }
            this.setState(newState, () => this.queryComponentData(props))
            // this.queryComponentData(props)
        })
        this.typeRef = React.createRef();
    }

    componentDidMount() {
        this.queryScheduler.emit(this.props)
        // this.queryComponentData();
    }

    componentWillReceiveProps(nextProps) {
        const { data } = this.props;
        // const { isReady } = this.state;
        // console.log('colors===render 卸载 componentWillReceiveProps', data, nextProps.data)
        if (JSON.stringify(data) != JSON.stringify(nextProps.data)) {
            this.queryScheduler.emit(nextProps)
            // this.setState({...this.getInitialState(), isReady}, () => this.queryComponentData(nextProps))
        }
    }

    componentWillUnmount() {
        // this.setState(this.getInitialState());
        console.log('colors===render 卸载 parent=>index')
        this.queryScheduler.destory()
    }
    getInitialState = () => {
        return {
            //组件是否准备就绪
            isReady: false,
            //表格类型 simple
            type: null,
            date_type: null,
            //数据格式化
            headerMapping: null,
            //是否分页
            ifPage: null,
            //是否异步分页
            ifAsyncPage: null,
            //
            pageSize: null,
            //是否排序
            ifSorter: null,
            //师傅异步排序
            ifAsyncSorter: null,
            //图配置
            chartOption: null,
            //是否显示序号列
            ifAddIndex: null,
            //是否显示图
            ifShowChart: null,
            //合并行
            mergeRow: null,
            //复杂表头
            complexHeader: null,
            //默认展开行
            defaultExpanded: null,
            //异步展开
            ifAsyncExpanded: null,
            //展开字段
            expandedParamKeys: null,
            //表格弹出层标题对象
            chartTitleData: null,
            //影响元素
            effectElement: null,
            //受控元素
            controlledElement: null,
        }
    }
    queryComponentData = ({ option } = this.props) => {
        //defalut value
        let type = null,
            date_type = null,
            ifPage = null,
            ifAsyncPage = null,
            pageSize = null,
            ifSorter = null,
            ifAsyncSorter = null,
            chartOption = null,
            ifShowChart = null,
            ifAddIndex = null,
            mergeRow = null,
            complexHeader = null,
            headerMapping = null,
            defaultExpanded = null,
            ifAsyncExpanded = null,
            expandedParamKeys = null,
            effectElement = null,
            minChartOption = null,
            dateType = null,
            controlledElement = null,
            chartTitleData = null,
            pagination = null;

        //分解数据
        if (option) {
            try {
                //trend/趋势, section/截面  trendChart/表格里带趋势缩略图   
                type = setDefault(option.type, "trend");
                date_type = setDefault(option.date_type, "month");
                ifPage = setDefault(option.ifPage, false);
                ifAsyncPage = setDefault(option.ifAsyncPage, false);
                pageSize = setDefault(option.pageSize, 10);
                ifSorter = setDefault(option.ifSorter, false);
                ifAsyncSorter = setDefault(option.ifAsyncSorter, false);
                chartOption = setDefault(option.chartOption, { type: "line" });
                ifAddIndex = setDefault(option.ifAddIndex, false);
                mergeRow = setDefault(option.mergeRow, ["classify"]);
                complexHeader = setDefault(option.complexHeader, null);
                //可选值 all firstRow
                defaultExpanded = setDefault(option.defaultExpanded, "none");
                ifAsyncExpanded = setDefault(option.ifAsyncExpanded, true);
                expandedParamKeys = setDefault(option.expandedParamKeys, ["category_dimension_id", "type_level"]);
                headerMapping = setDefault(option.headerMapping, {});
                ifShowChart = setDefault(option.ifShowChart, true);
                controlledElement = setDefault(option.controlledElement, []);
                minChartOption = setDefault(option.minChartOption, {});
                dateType = setDefault(option.dateType, '');
                effectElement = setDefault(option.effectElement, []);
                chartTitleData = setDefault(option.chartTitleData, null);
                pagination = setDefault(option.pagination, null);
            } catch (error) {
                console.log(error);
            }
        }

        this.typeRef.current = type;
        //数据
        this.setState({ type, date_type, ifPage, ifAsyncPage, pageSize, ifSorter, ifAsyncSorter, chartOption, ifAddIndex, mergeRow, complexHeader, ifShowChart, headerMapping, defaultExpanded, ifAsyncExpanded, expandedParamKeys, controlledElement, effectElement, minChartOption, dateType, chartTitleData, isReady: true, pagination });
    }
    renderContent = () => {
        // const { type } = this.state;
        const type = this.typeRef.current;
        const { pagination, sortIndex, id, title, ifDownload, columnsRender, dataSourceRender, onChange, onOpenPopup, data, titleRender, option, chartIndex, comparkeyword, downIndex, rowSelection, paramsOptions, showFocus, onFocus,
            onAddLoopScrollTableWrap,
            download,
            getTableRequestParams,
        } = this.props;
        let param = {
            ...this.state,
            id,
            title,
            data,
            ifDownload,
            columnsRender,
            dataSourceRender,
            comparkeyword,
            onChange,
            onOpenPopup,
            titleRender,
            option,
            chartIndex,
            downIndex,
            rowSelection,
            onRowSelectionChange: this.props.onRowSelectionChange,
            sortIndex,
            paramsOptions,
            pagination,
            showFocus,
            onFocus,
            tableRef: this.props.tableRef,
            onLoopEvent: this.props.onLoopEvent,
            onAddLoopScrollTableWrap,
            onAddLoopTableComponent: this.props.onAddLoopTableComponent,
            download,
            getTableRequestParams
        };
        console.log('colors===render 卸载 parent11', data, type)
        //渲染表格
        if (type == "trend") return <TrendTable {...param} />
        else if (type == "section") return <SectionTable {...param} />
        else if (type == "trendChart") return <TrendChartTable {...param} />
        return null;
    }
    render() {
        const { isReady, id } = this.state;
        console.log('colors===render 卸载 parent', isReady)
        if (!isReady) return null;
        const { style } = this.props;
        const temp_style = Object.assign({}, { position: "relative" }, style);
        return (
            <div style={temp_style} className="customTable" key={id}>
                {this.renderContent()}
            </div>
        );
    }
}


Index.defaultProps = {
    id: `table_${gethashcode()}`,
    style: {},
    option: {},
    title: "",
    data: {},
    ifWatermark: true,
    onChange: () => { },
    onOpenPopup: () => { }
}

Index.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    option: PropTypes.object,
    title: PropTypes.string,
    data: PropTypes.object,
    columnsRender: PropTypes.func,
    dataSourceRender: PropTypes.func,
    onChange: PropTypes.func,
    onOpenPopup: PropTypes.func,
    ifWatermark: PropTypes.bool,
};

export default Index;