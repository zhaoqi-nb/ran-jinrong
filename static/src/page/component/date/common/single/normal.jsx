'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, DatePicker} from 'antd';
import moment from 'moment';
import RsIcon from '@/page/component/rsIcon/index';
import i18n from '@/plugin/i18n';

const { Option } = Select;
const LANGUAGE = i18n.getLocalLanguage();

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        this.initData();
    }

    componentWillReceiveProps(nextProps) {
        const { date_type } = this.props;
        if (date_type != nextProps.date_type) {
            this.setState(this.getInitialState(), () => this.initData(nextProps))
        }
    }

    componentWillUnmount() {
        this.setState(this.getInitialState());
    }
    getInitialState = () => {
        return {
            isReady: false,
            options: [],
            stat_date: ""
        }
    }
    initData = (props = this.props) => {
        const { date_type, minDate, maxDate } = props;
        let options = this.getRanges(date_type, minDate, maxDate),
            stat_date = options[0]["code"];
        this.setState({ stat_date, options, disabled: date_type === "ytd" ? true : false, isReady: true }, () => this.props.onChange(this.exportDate()));
    }
    getRanges = (date_type, minDate, maxDate) => {
        let min = moment(minDate, "YYYYMMDD"),
            max = moment(maxDate, "YYYYMMDD");
        let ranges = [];
        if (date_type == "day") ranges = this.getDayRanges(min, max);
        //近30天的周，页面传值是 XX周，但是页面显示是周日
        else if (date_type == "week") ranges = this.getWeekRanges(min, max);
        //当周，页面显示 XX周，传值也是XX周
        else if (date_type == "week_yyyyww") {
            const weekStyle = LANGUAGE === 'zh_CN' ? "GGGG-WW周" : 'GGGG-WW';
            ranges = this.getWeekRanges(min, max, weekStyle);
        }
        else if (date_type == "month") ranges = this.getMonthRanges(min, max);
        else if (date_type == "quarter") ranges = this.getQuarterRanges(min, max);
        else if (date_type == "year") ranges = this.getYearRanges(min, max);
        else if (date_type == "ytd") ranges = this.getYearCumulativeRanges(min, max); // 年累计
        else if (date_type == 'halfYear') ranges = this.props.isPM ? this.getTimeQuantumOfHalfYearPM(min, max) : this.getTimeQuantumOfHalfYear(min, max); //半年度,一级市场和二级市场不一样
        return ranges;

    }

    //获取年累计下拉选项
    getYearCumulativeRanges = (min, max) => {
        let timeArr = [];

        // let endMonth = moment(start).endOf("month");
        let maxMonth = moment(max).endOf("month");
        // if (moment(endMonth).valueOf() <= moment(maxMonth).valueOf()) {
        timeArr.unshift({
            code: moment(maxMonth).format("YYYYMM"),
            name: `${moment().startOf("year").format("YYYY-MM")}~${moment(maxMonth).format("YYYY-MM")}`//moment(endMonth).format(monthStyle),
        });
        // let secondMonth = moment(maxMonth).add(1, 'month');
        // timeArr.unshift({
        //     code: moment(secondMonth).format("YYYYMM"),
        //     name: `${moment().startOf("year").format("YYYY-MM")}~${moment(secondMonth).format("YYYY-MM")}`//moment(endMonth).format(monthStyle),
        // });
        //}

        return timeArr;
    }

    //获取半年度选项
    getTimeQuantumOfHalfYear = (min, max) => {
        let timeArr = [];
        const getText = (value) => {
            let year = moment(value).year(),
                month = moment(value).month() + 1;

            if (month > 6) {
                return `${year}-H1`;
            } else if (!moment(value).isBefore(min, 'month') && !moment(value).isSame(min, 'month')) {
                return `${year - 1}-H2`;
            }
            return null;
        }

        const loop = (start) => {
            if (moment(start).isBefore(max, 'month') || moment(start).isSame(max, 'month')) {
                //记录
                let year = moment(start).year(),
                    month = moment(start).month() + 1;

                let tempDate = "";
                if (month > 6) tempDate = `${year}1`;
                else tempDate = `${year - 1}2`;

                const text = getText(start);
                if (text) {
                    timeArr.unshift({
                        code: tempDate,
                        name: text
                    });
                }

                //往后推6个月
                loop(moment(start).add(6, 'month'))
            }
        }
        //设置年第一天
        let year = moment(min).year();
        loop(moment(`${year}01`, 'YYYYMM'));

        return timeArr
    }

    //一级市场获取半年度选项
    getTimeQuantumOfHalfYearPM = (min, max) => {
        let timeArr = [];

        const getText = (value) => {
            let year = moment(value).year(),
                quarter = moment(value).quarter();

            if (quarter < 3) {
                return `${year}-H1`;
            } else {
                return `${year}-H2`;
            }
        }

        const loop = (start) => {
            let endQuarter = moment(start).endOf("quarter");
            let maxQuarter = moment(max).endOf("quarter");
            if (moment(endQuarter).valueOf() <= moment(maxQuarter).valueOf()) {
                let year = moment(endQuarter).format("YYYY"),
                    quarter = moment(endQuarter).format("Q"),
                    halfYear = quarter < 3 ? 1 : 2;

                //记录
                timeArr.unshift({
                    code: year + halfYear,
                    name: `${year}-H${halfYear}`,
                });
                //往后推一季
                loop(moment(endQuarter).add(2, 'quarter'))
            }
        }

        loop(min);

        return timeArr
    }

    getDayRanges = (min, max) => {
        let timeArr = [];

        const loop = (start) => {
            if (moment(start).valueOf() <= moment(max).valueOf()) {
                //记录日期
                timeArr.unshift({
                    code: moment(start).format("YYYYMMDD"),
                    name: moment(start).format("YYYY-MM-DD"),
                });
                //往后推一天
                loop(moment(start).add(1, 'days'))
            }
        }

        loop(min);

        return timeArr
    }
    getWeekRanges = (min, max, showFormat = "YYYY-MM-DD") => {
        const { ifLimitWeekRegion } = this.props;
        let timeArr = [];

        const loop = (end) => {
            let endWeek = moment(end).endOf('isoWeek');
            let minWeek = moment(min).endOf('isoWeek');
            console.log("lilin=>endWeek=", moment(endWeek).format("YYYY-MM-DD"))
            console.log("lilin=>minWeek=", moment(minWeek).format("YYYY-MM-DD"))
            if (moment(endWeek).valueOf() >= moment(minWeek).valueOf() && ((ifLimitWeekRegion && timeArr.length < 12) || !ifLimitWeekRegion)) {
                //记录
                timeArr.unshift({
                    code: moment(endWeek).format("GGGGWW"),
                    name: moment(endWeek).format(showFormat),
                });
                //往前推一周
                loop(moment(endWeek).subtract(1, 'week'))
            }
        }

        // if (moment(max).endOf('isoWeek').valueOf() > moment(max).valueOf()) max = moment(max).subtract(1, 'week');
        console.log("lilin=>max=", moment(max).format("YYYY-MM-DD"))

        loop(max);

        return timeArr.reverse();
    }
    getMonthRanges = (min, max) => {
        let timeArr = [];

        const loop = (start) => {
            let endMonth = moment(start).endOf("month");
            let maxMonth = moment(max).endOf("month");
            if (moment(endMonth).valueOf() <= moment(maxMonth).valueOf()) {
                const monthStyle = LANGUAGE === 'zh_CN' ? "YYYY-MM月" : 'YYYY-MM';
                //记录
                timeArr.unshift({
                    code: moment(endMonth).format("YYYYMM"),
                    name: moment(endMonth).format(monthStyle),
                });
                //往后推一月
                loop(moment(endMonth).add(1, 'month'))
            }
        }

        loop(min);

        return timeArr
    }
    getQuarterRanges = (min, max) => {
        let timeArr = [];

        const loop = (start) => {
            let endQuarter = moment(start).endOf("quarter");
            let maxQuarter = moment(max).endOf("quarter");
            if (moment(endQuarter).valueOf() <= moment(maxQuarter).valueOf()) {
                let year = moment(endQuarter).format("YYYY"),
                    quarter = moment(endQuarter).format("Q");
                //记录
                timeArr.unshift({
                    code: year + quarter,
                    name: `${year}-Q${quarter}`,
                });
                //往后推一季
                loop(moment(endQuarter).add(1, 'quarter'))
            }
        }

        loop(min);

        return timeArr
    }
    getYearRanges = (min, max) => {
        let timeArr = [];

        const loop = (start) => {
            let startYear = moment(start).endOf("quarter");
            let maxYear = moment(max).endOf("quarter");
            if (moment(startYear).valueOf() <= moment(maxYear).valueOf()) {
                //记录
                timeArr.unshift({
                    code: moment(startYear).format("YYYY"),
                    name: moment(startYear).format("YYYY"),
                });
                //往后推一年
                loop(moment(startYear).add(1, 'year'))
            }
        }

        loop(min);

        return timeArr
    }
    getFormatType = (date_type) => {
        let format = "";
        if (date_type == "day") format = "YYYYMMDD";
        else if (date_type == "week") format = "GGGGWW";
        else if (date_type == "month") format = "YYYYMM";
        else if (date_type == "quarter") format = "YYYYQ";
        else if (date_type == "year") format = "YYYY";
        else if (date_type == "ytd") format = "YYYYMM";
        console.log("格式化===", date_type, format)
        return format;
    }
    exportDate = () => {
        const { date_type, maxDate } = this.props;
        const { stat_date } = this.state;

        let param = {
            date_type,
            stat_date,
            max_date: moment(maxDate).format(this.getFormatType()),
        }

        return param;
    }
    handleChange = (value) => {
        this.setState({ stat_date: value }, () => this.props.onChange(this.exportDate()));
    }

    dateChange = (value) => {
        this.setState({ stat_date: moment(value).format("YYYYWW")}, () => this.props.onChange(this.exportDate()))
    }

    renderOption = (data) => {
        if (!data || !data.length) return null;
        return data.map((obj, index) => {
            return <Option value={obj.code} key={obj.code}>{obj.name}</Option>
        })
    }
    onDropdownVisibleChange = (open) => {
        this.setState({
            open,
        })
    }
    handleClick = () => {
        this.setState({
            open: !this.state.open,
        })
    }

    getShowDateType = () => {
        const { date_type } = this.props;
        return date_type == "week_yyyyww" || date_type == "week" ? "week" : date_type;
    }

    disabledDate = (date) => {
        const { minDate, maxDate } = this.props;
        const date_type = this.getShowDateType();
        if (!date) {
            return false;
        }
        return moment(date).isBefore(moment(minDate, "YYYYMMDD"), date_type) || moment(date).isAfter(moment(maxDate, "YYYYMMDD"), date_type)
    }
    render() {
        const { ifShowDate, suffixIcon, suffixIconRender, date_type} = this.props;
        const { isReady, stat_date, options, open, disabled} = this.state;
        console.log(stat_date,1231231);
        if (!isReady || !ifShowDate) return null;

        let _suffixIcon = suffixIcon || (
            <RsIcon
                onClick={this.handleClick}
                type={(true && open) ? 'icon-tianchongshangjiantou' : "icon-tianchongxiajiantou"}
                style={{ color: '#8C8C8C' }}
            />
        )
        if (suffixIcon && suffixIconRender && typeof (suffixIconRender) === 'function') {
            _suffixIcon = suffixIconRender(open)
        }

        return (
            <div className="select-wrapper" style={{ marginTop: 0, top: 1 }}>
                <div className="select-content">
                        {/* <Select
                            value={stat_date}
                            suffixIcon={_suffixIcon}
                            open={this.state.open}
                            disabled={disabled}
                            onDropdownVisibleChange={this.onDropdownVisibleChange}
                            getPopupContainer={() => this.props?._refParent?.current}
                            onChange={this.handleChange}>
                            {this.renderOption(options)}
                        </Select> */}
                    {
                        date_type == "week_yyyyww"
                        ?<DatePicker
                            picker="week"
                            value={moment(stat_date, "YYYYWW")}
                            onChange={this.dateChange}
                            allowClear={false}
                            disabledDate={this.disabledDate}
                        />
                        :<Select
                            value={stat_date}
                            suffixIcon={_suffixIcon}
                            open={this.state.open}
                            disabled={disabled}
                            onDropdownVisibleChange={this.onDropdownVisibleChange}
                            getPopupContainer={() => this.props?._refParent?.current}
                            onChange={this.handleChange}>
                            {this.renderOption(options)}
                        </Select>
                    }
                </div>
            </div>
        );
    }
}

Index.propTypes = {
    date_type: PropTypes.string.isRequired,
    minDate: PropTypes.string.isRequired,
    maxDate: PropTypes.string.isRequired,
    ifShowDate: PropTypes.bool,
    onChange: PropTypes.func
};

export default Index;