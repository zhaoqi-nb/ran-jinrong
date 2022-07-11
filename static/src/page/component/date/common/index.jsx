'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gethashcode } from '../../util/hash';
import { setDefault } from '@util';
import moment from 'moment';
import { Radio } from 'antd';
//特殊日期
import SelectWeek from './selectWeek/index';
import Mix from './mix/index';
//截面
import SingleNormal from './single/normal';
//趋势
import Double from './double/index';
//
import { getPrivilegeData, getMenuData } from '../util/index';
import { getCurrSysId } from '../../page/util';
import Api from '../store/api';
import { i18n } from '@/components/FastIntl';
import './index.less';
import classnames from 'classnames';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.dataRef = React.createRef();
    }

    componentDidMount() {

        this.initData();
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
            id: "",
            style: null,
            //日期可选类型 single截面、double趋势
            type: null,
            //当前类型 week, week_yyyyww, month, quarter, year, month_week, quarter_week
            date_type: null,
            //可选日期
            date_types: null,
            //默认最小日期
            minDate: null,
            //默认最大日期
            maxDate: null,
            //是否显示日期选择
            ifShowDate: null,
        }
    }
    getDateTypes(date_types) {
        let arr = [{ "value": "day", "label": i18n.format("日") }, { "value": "week", "label": i18n.format("周") }, { "value": "week_yyyyww", "label": i18n.format("周") }, { "value": "month", "label": i18n.format("月") }, { "value": "quarter", "label": i18n.format("季") }, { "value": "halfYear", "label": i18n.format("半年") }, { "value": "year", "label": i18n.format("年") }, { "value": "month_week", "label": i18n.format("") }, { "value": "quarter_week", "label": i18n.format("季") }, { "value": "ytd", "label": i18n.format("年累计") }];
        let temp = [];
        for (let i = 0, len = arr.length; i < len; i++) {
            let obj = arr[i];
            if (date_types.indexOf(obj.value) != -1) temp.push(obj);
        }
        return temp;
    }
    getDateOption = (option) => {
        if (!option || !option.length) return null;
        let defaultOption = [{
            code: "month_week",
            name: i18n.format("显示频率：月+周频")
        }, {
            code: "quarter_week",
            name: i18n.format("显示频率：季+周频")
        },
        {
            code: "week",
            name: i18n.format("显示频率：周频")
        }]
        let date_option = [];
        for (let i = 0, len = defaultOption.length; i < len; i++) {
            let obj = defaultOption[i];
            if (option.indexOf(obj.code) != -1) date_option.push(obj)
        }
        return date_option;
    }
    //初始化数据
    initData = async (props = this.props) => {
        try {
            let id = setDefault(props.id);
            let type = setDefault(props.type);
            let style = setDefault(props.style);
            let select_style = setDefault(props.select_style);
            let className = setDefault(props.className);
            let date_type = setDefault(props.date_type);
            let date_types = this.getDateTypes(setDefault(props.date_types));
            let date_option = this.getDateOption(setDefault(props.date_option, null));
            //获取时间区间
            let dateRange = await this.getDateRange(date_type);
            let minDate = setDefault(props.minDate, dateRange.min_date);
            let maxDate = setDefault(props.maxDate, dateRange.max_date);
            //
            let ifShowDate = setDefault(props.ifShowDate, true);

            //设置组件状态
            this.setState({ id, style, select_style, className, type, date_type, date_types, date_option, minDate, maxDate, ifShowDate, isReady: true });
        } catch (error) {
            console.log(`double Date 组件渲染出错：${error}`);
        }
    }
    getOpenDate = (templateProperty) => {
        let transformMethods = templateProperty && templateProperty.transformMethods ? templateProperty.transformMethods : "v1",
            dateOpenMode = "";
        let menuData = getMenuData();
        if (menuData) {
            try {
                let pageInfo = menuData.pageInfo,
                    resAttr = pageInfo.resAttr;

                if (resAttr && resAttr.transformMethods) transformMethods = resAttr.transformMethods;
                if (resAttr && resAttr.dateOpenMode) dateOpenMode = JSON.stringify(resAttr.dateOpenMode);
            } catch (error) {
                console.log("获取页面菜单数据")
            }
        }
        return {
            transformMethods,
            dateOpenMode
        }
    }
    getDateRange = async (date_type) => {
        let templateProperty = getPrivilegeData();
        let fixDate_range = [];
        if (fixDate_range) {
            fixDate_range = templateProperty.fixDate_range || [];
        }
        let temp = this.getOpenDate(templateProperty);
        let param = { date_type };
        if (temp) {
            //转换日期的方式
            let transformMethods = temp.transformMethods,
                dateOpenMode = temp.dateOpenMode;

            param["transformMethods"] = transformMethods
            param["dateOpenMode"] = dateOpenMode
            // 添加系统sysId
            let currSysId = getCurrSysId();
            if (currSysId) {
                param['sysId'] = currSysId || null;
            }
        }

        let min_date = null,
            max_date = null;

        if (this.props.isCompleteOpen) {
            // 日期范围完全开放 从2018年开始到当天日期  报告相关的页面用到该属性
            min_date = moment("20180101", 'YYYYMMDD');
            max_date = moment();
        } else {
            if (this.props.isPM === true) {
                // 一级市场
                const { rootInstantiationId, id } = this.props;

                const param = {
                    rootInstantiationId,
                    params: JSON.stringify({ date_type, instantiation_id: id })
                }
                const result = await Api.getDataOpenTime(param);
                let datas = result.data;
                console.log("一级市场日期范围", datas)
                if (result.code == 200 && datas && datas?.length > 0) {

                    let format = "YYYYMMDD";

                    if (date_type == "month") format = "YYYYMM";
                    else if (date_type == "quarter") format = "YYYYQ";
                    else if (date_type == "halfYear") format = "YYYYQ";
                    else if (date_type == "year") format = "YYYY";
                    else if (date_type == "ytd") format = "YYYYMM";

                    try {
                        min_date = String(datas[0]);
                        max_date = String(datas[1]);
                        if (date_type == "halfYear") {
                            min_date = min_date.replace(/[1]$/, '1').replace(/[2]$/, '3');
                            max_date = max_date.replace(/[1]$/, '1').replace(/[2]$/, '3');
                        }
                        min_date = moment(min_date, format);
                        max_date = moment(max_date, format);
                    } catch (error) {
                        console.log("一级市场日期范围格式化错误:", error);
                    }

                } else {
                    min_date = moment("20180101", 'YYYYMMDD');
                    max_date = moment().subtract(1, "day");
                }

            } else {
                //二级市场
                const result = await Api.getTimeRange(param);

                let datas = result.data;
                if (result.code == "200" && datas) {
                    try {
                        min_date = moment(min_date ? min_date : datas[0], 'YYYYMMDD');
                        max_date = moment(max_date ? max_date : datas[1], 'YYYYMMDD');
                    } catch (error) {
                        console.log("格式化最小最大日期出错=" + error);
                    }
                } else {
                    min_date = moment("20180101", 'YYYYMMDD');
                    max_date = moment().subtract(1, "day");
                }

                if (fixDate_range && fixDate_range.length) {
                    if (fixDate_range[0]) min_date = moment(fixDate_range[0], 'YYYYMMDD');
                    if (fixDate_range[1]) max_date = moment(fixDate_range[1], 'YYYYMMDD');
                } else {
                    if (this.props.fixDate_range && this.props.fixDate_range > 0) {
                        min_date = moment(this.props.fixDate_range[0], 'YYYYMMDD');
                    }
                }
            }
        }



        return {
            min_date,
            max_date
        }
    }


    handleChangeRadio = async (e) => {
        let date_type = e.target ? e.target.value : "";
        //获取时间区间
        let dateRange = await this.getDateRange(date_type);

        this.setState({ date_type, minDate: dateRange.min_date, maxDate: dateRange.max_date })
    }
    renderRadio = () => {
        const { date_type, date_types } = this.state;
        if (!date_types || !date_types.length) return null;
        console.log('date_type=>', date_type, date_types)
        return (<Radio.Group optionType="button" buttonStyle="solid" onChange={this.handleChangeRadio} options={date_types} value={date_type} />)
    }
    renderContent = () => {
        const { type, date_type, minDate, maxDate, date_option, ifShowDate, select_style } = this.state;
        const { ifLimitWeekRegion, onChange, isPM } = this.props;
        const param = {
            date_type,
            minDate,
            maxDate,
            ifShowDate,
            date_option,
            ifLimitWeekRegion,
            getDateRange: this.getDateRange,
            onChange,
            _refParent: this.dataRef,
            select_style,
            isPM
        }

        //特殊周，选择下拉
        if (date_type == "week" && date_option && date_option.length) return <SelectWeek {...param} />
        //特殊，月+周，季+周
        else if (date_type == "month_week" || date_type == "quarter_week") return <Mix {...param} />
        //截面
        else if (type == "single") return <SingleNormal {...param} />
        //趋势
        else if (type == "double") return <Double {...param} />

        return null;
    }
    render() {
        const { isReady, id, style, date_type, date_option, className } = this.state;
        if (!isReady) return null;
        const _style = Object.assign({ display: "inline-block", marginTop: "8px" }, style) //date_type == "week" && date_option && date_option.length ? "0px" : 

        return (

            <div ref={this.dataRef} className={classnames('custom-date excel-date', `${className ? className : ""}`)} style={{ ..._style }} key={id}>
                <span style={{ color: '#595959' }}>{this.props.title}{this.props.title ? '：' : ''}</span>
                {this.renderRadio()}
                {this.renderContent()}
            </div>
        );
    }
}

Index.propTypes = {
    id: PropTypes.string.isRequired,
    style: PropTypes.object,
    type: PropTypes.string,
    date_type: PropTypes.string.isRequired,
    date_types: PropTypes.array,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    fixDate_range: PropTypes.any,
    onChange: PropTypes.func
};

Index.defaultProps = {
    id: `title_${gethashcode()}`,
    style: {},
    type: "single",
    date_type: "",
    date_types: [],
    fixDate_range: null,
    minDate: null,
    maxDate: null,
    onChange: () => { }
}

export default Index;