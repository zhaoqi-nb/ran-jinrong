'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

/**
 * 
 * 混合日期，用到了month_week
 * 
 */
class Mix extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        this.initData();
    }

    componentWillReceiveProps(nextProps) {
        const { date_type } = this.props;
        if(date_type!=nextProps.date_type){
            this.setState(this.getInitialState(), ()=>this.initData(nextProps))
        }
    }

    componentWillUnmount() {
        this.setState(this.getInitialState());
    }
    getInitialState = () =>{
        return {
            isReady   : false,
            week_min  : null,
            week_max  : null,
            month_min : null,
            month_max : null,
        }
    }
    initData = async({ date_type }=this.props) =>{
        let temp_week   = await this.props.getDateRange("week");
        let week_min    = temp_week.min_date;
        let week_max    = temp_week.max_date;

        let month_min   = null;
        let month_max   = null;

        let quarter_min = null;
        let quarter_max = null;

        if(date_type == "month_week"){
            let temp_month = await this.props.getDateRange("month");
            month_min  = temp_month.min_date;
            month_max  = temp_month.max_date;
        }else if(date_type == "quarter_week"){
            let temp_quarter = await this.props.getDateRange("quarter");
            quarter_min  = temp_quarter.min_date;
            quarter_max  = temp_quarter.max_date;
        }
        this.setState({week_min, week_max, month_min, month_max, quarter_min, quarter_max, isReady:true},()=>this.props.onChange(this.exportDate()));
    }
    exportDate = () =>{
        const { date_type } = this.props;
        const { week_max, month_max, quarter_max }  = this.state;

        let param = {
            date_type,
            week_stat : moment(week_max,"YYYYMMDD").format("GGGGWW"),
            max_date  : moment(week_max).format("GGGGWW"),
        }
        if(date_type == "month_week"){
            param = Object.assign(param,{
                month_stat: moment(month_max,"YYYYMMDD").format("YYYYMM"),
            })
        }else if(date_type == "quarter_week"){
            param = Object.assign(param,{
                quarter_stat: moment(quarter_max,"YYYYMMDD").format("YYYYQ"),
            })
        }
        
        return param;
    }
    render() {
        const { isReady } = this.state;
        if(!isReady) return null;
        return null;
    }
}

Mix.propTypes = {
    date_type   : PropTypes.string.isRequired,
    getDateRange: PropTypes.func,
    onChange    : PropTypes.func
};

export default Mix;