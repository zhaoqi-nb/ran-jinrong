'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';
// import locale from 'antd/es/date-picker/locale/zh_CN';
import { i18n } from '@/components/FastIntl';
import RsIcon from '../../../rsIcon';
const { RangePicker } = DatePicker;

// moment.locale('zh_CN');

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
            startValue: null,
            endValue: null,
        }
    }
    initData = (props = this.props) => {
        const { minDate, maxDate } = props;
        let startValue = moment(minDate, "YYYYMMDD");
        let endValue = moment(maxDate, "YYYYMMDD");

        this.setState({ isReady: true, startValue, endValue }, () => this.props.onChange(this.exportDate()));
    }
    handleTimeChange = (dates, dateStrings) => {
        if (!dates || !dates.length) return;
        const {date_type} = this.props;
        let startValue = dates[0];
        let endValue = dates[1];
        // let startValueDisplay = dateStrings[0];
        // let endValueDisplay = dateStrings[1];
        // if (date_type === 'semi-annual') {
        //     startValueDisplay = startValueDisplay.replace(/Q3|Q4/, 'H2').replace(/Q1|Q2/, 'H1');
        //     endValueDisplay = endValueDisplay.replace(/Q3|Q4/, 'H2').replace(/Q1|Q2/, 'H1');
        //   }
        console.log("change=>",startValue, endValue, dateStrings)
        this.setState({ startValue, endValue }, () => this.props.onChange(this.exportDate()));
    }
    handleOk = () => {
        this.props.onChange(this.exportDate())
    }
    getShowDateType = () => {
        const { date_type } = this.props;
        return date_type == "week_yyyyww" || date_type == "week" ? "week" : date_type;
    }
    exportDate = () => {
        const { date_type, maxDate } = this.props;
        const { startValue, endValue } = this.state;

        let format = "YYYYMMDD";

        if (date_type == "day") format = "YYYYMMDD";
        else if (date_type == "week" || date_type == "week_yyyyww") format = "GGGGWW";
        else if (date_type == "month") format = "YYYYMM";
        else if (date_type == "quarter") format = "YYYYQ";
        else if (date_type == "year") format = "YYYY";
        else if (date_type == "halfYear") format = "YYYYQ";
        let param = {
            date_type,
            start_date: moment(startValue).format(format),
            end_date: moment(endValue).format(format),
            max_date: moment(maxDate).format(format),
        }
   
        if(date_type == "halfYear") {
            param["start_date"] = param["start_date"].replace(/[1｜2]$/,'1').replace(/[3｜4]$/,'2');
            param["end_date"] = param["end_date"].replace(/[1｜2]$/,'1').replace(/[3｜4]$/,'2');
            param["max_date"] = param["max_date"].replace(/[1｜2]$/,'1').replace(/[3｜4]$/,'2');
        }

        return param;
    }
    disabledDate = (date) => {
        const { minDate, maxDate } = this.props;
        const date_type = this.getShowDateType();
        if (!date) {
            return false;
        }
        return moment(date).isBefore(moment(minDate, "YYYYMMDD"), date_type) || moment(date).isAfter(moment(maxDate, "YYYYMMDD"), date_type)
    }
    getDatePickerFormat = () => {
        const { date_type } = this.props;
        let format = "YYYY-MM-DD";
        const isEN = i18n.getLocalLanguage() === 'en_US';
        if (date_type == "day") format = "YYYY-MM-DD";
        else if (date_type == "week_yyyyww") {
            format = isEN ? `GGGG-WW` : `GGGG-WW周`;
        }
        else if (date_type == "week") format = (value) => {
            return [moment(value).endOf('week').format('YYYY-MM-DD')]
        }
        else if (date_type == "month") format = `YYYY-MM${isEN ? '' : '月'}`;
        else if (date_type == "quarter") format = "YYYY-[Q]Q";
        else if (date_type == "year") format = "YYYY";
        else if (date_type == "halfYear") format = "YYYY-[Q]Q";
        return format
    }
    render() {
        const date_type = this.getShowDateType();
        const { isReady, startValue, endValue } = this.state;
        if (!isReady) return null;
        return (
            <RangePicker
                suffixIcon={<RsIcon type="icon-riqi" style={{ fontSize: 16, color: "#8C8C8C" }} />}
                // locale={locale}
                picker={date_type === "halfYear" ? "semi-annual" : date_type === 'day' ? 'date' : date_type}
                getPopupContainer={() => this.props?._refParent?.current}
                format={this.getDatePickerFormat()}
                allowClear={false}
                value={[startValue, endValue]}
                placeholder={[i18n.format("开始时间"),i18n.format("结束时间")]}
                disabledDate={this.disabledDate}
                onChange={this.handleTimeChange}
            />
        );
    }
}

Index.propTypes = {
    date_type: PropTypes.string.isRequired,
    minDate: PropTypes.string.isRequired,
    maxDate: PropTypes.string.isRequired,
    onChange: PropTypes.func
};

export default Index;