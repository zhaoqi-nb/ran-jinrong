'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Select from '../../../select/common/index';

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
            options: null,
            selectValue: null,
            week_min: null,
            week_max: null,
            month_min: null,
            month_max: null,
        }
    }
    initData = async (props = this.props) => {
        let options = props.date_option;
        if (options && options.length) {
            let selectValue = options[0]["code"];
            let temp_week = await this.props.getDateRange("week");
            let week_min = temp_week.min_date;
            let week_max = temp_week.max_date;

            let temp_month = await this.props.getDateRange("month");
            let month_min = temp_month.min_date;
            let month_max = temp_month.max_date;

            this.setState({ selectValue, week_min, week_max, month_min, month_max, options, isReady: true }, () => this.props.onChange(this.exportDate()));
        }
    }
    exportDate = () => {
        const { date_type } = this.props;
        const { selectValue, week_min, week_max, month_max } = this.state;

        let param = {};
        //月和周
        if (selectValue == "month_week") {
            param = {
                date_type: selectValue,
                week_stat: moment(week_max, "YYYYMMDD").format("GGGGWW"),
                month_stat: moment(month_max, "YYYYMMDD").format("YYYYMM"),
                max_date: moment(week_max).format("GGGGWW"),
            }
        } else if (selectValue == "quarter_week") {
            param = {
                date_type: selectValue,
                week_stat: moment(week_max, "YYYYMMDD").format("GGGGWW"),
                quarter_stat: moment(month_max, "YYYYMMDD").format("YYYYQ"),
                max_date: moment(week_max).format("GGGGWW"),
            }
        }
        //周
        else if (selectValue == "week") {
            param = {
                date_type,
                start_date: moment(week_min, "YYYYMMDD").format("GGGGWW"),
                end_date: moment(week_max, "YYYYMMDD").format("GGGGWW"),
            }
        }

        return param;
    }
    handleSelectChange = (value) => {
        this.setState({ selectValue: value }, () => this.props.onChange(this.exportDate()))
    }
    renderContent = () => {
        const { options, selectValue } = this.state;
        const { select_style } = this.props;
        const _style = Object.assign({}, {...select_style});
        let param = {
            options,
            defaultSelectKey: selectValue,
        }
        return <Select getPopupContainer={() => this.props?._refParent?.current} {...param} getSelectValue={this.handleSelectChange} style={{ marginTop: 0}} select_style={_style} />
    }
    render() {
        const { isReady } = this.state;
        if (!isReady) return null;
        return (
            <div className="select-wrapper" style={{ marginTop: 0 }}>
                {this.renderContent()}
            </div>
        );
    }
}

Index.propTypes = {
    date_type: PropTypes.string.isRequired,
    date_option: PropTypes.array.isRequired,
    minDate: PropTypes.string.isRequired,
    maxDate: PropTypes.string.isRequired,
    onChange: PropTypes.func
};

export default Index;