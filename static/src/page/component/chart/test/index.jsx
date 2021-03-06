'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Common from '../common/index';
import Config from '../config/index';
import ControlledElement from '../../componentProps/config/index'
import moment from 'moment';

const backClass = {
    margin: "20px",
    background: "#F5F7FA",
    border: "1px solid #8C8C8C",
    padding: "10px"
}

class Index extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }
    transferData = (data) => {
        const { noView } = this.props;
        const dateRule = noView && noView.dateRule ? noView.dateRule : null;

        const getIfView = (value) => {
            if (dateRule && dateRule.type) {
                let type = dateRule.type,
                    fixDate_range = dateRule.fixDate_range;
                if (type == "month") {
                    let start = fixDate_range[0],
                        end = fixDate_range[1] || moment().format("YYYYMM");
                    if (moment(value, 'YYYYMM').valueOf() >= moment(start, 'YYYYMM').valueOf() && moment(value, 'YYYYMM').valueOf() <= moment(end, 'YYYYMM').valueOf()) return true;
                    else return false;
                }
            }
            return false;
        }

        let xData = data.xData,
            series = data.series;

        let temp_xData = [],
            temp_series = [];
        for (let i = 0, len = xData.length; i < len; i++) {
            let value = xData[i];
            if (!getIfView(value)) temp_xData.push(value);
        }

        for (let i = 0, len = series.length; i < len; i++) {
            let arr = series[i],
                temp_arr = [];
            for (let j = 0, jlen = arr.length; j < jlen; j++) {
                let yData = arr[j];
                if (!getIfView(yData[0])) temp_arr.push(yData);
            }
            if (temp_arr && temp_arr.length) temp_series.push(temp_arr)
        }

        return {
            legend: data.legend,
            xData: temp_xData,
            series: temp_series,
        }
    }

    render() {
        const option = {
            "yAxis": {
                "axisLabel": {
                    "type": "string"
                },
                "name": "",
                "position": "right",
                "type": "category"
            },
            "xAxis": {
                "axisLabel": {
                    "unit": "??????",
                    "bit_number": 0,
                    "type": "unit"
                },
                "inverse": true,
                "name": "???????????????(?????????)",
                "format": {
                    "unit": "??????",
                    "bit_number": 0,
                    "type": "unit"
                },
                "nameGap": 35,
                "nameLocation": "start",
                "type": "value"
            },
            "grid": {
                "top": 0,
                "left": "5%",
                "bottom": "17%",
                "right": 130
            },
            "hideDataZoom": true,
            "title": false,
            "type": "group"
        }

        const data = this.transferData({ "legend": ["??????"], "xData": ["??????", "????????????", "??????", "????????????", "??????", "????????????", "??????", "????????????", "?????????", "??????", "??????", "??????"], "series": [[["??????", 795237142.6812], ["????????????", 1840123363.3109], ["??????", 1985597168.4965], ["????????????", 2634862935.8801], ["??????", 2677642098.9558], ["????????????", 2700445315.1985], ["??????", 3629015290.836], ["????????????", 3732872378.183], ["?????????", 4336385462.5174], ["??????", 6249712734.3188], ["??????", 9365617993.2687], ["??????", 11535079845.1723]]] })
        return (
            <div>
                <div style={backClass}>
                    <p>??????????????????</p>
                    <Common id="test" option={option} data={data} />
                </div>
                <div style={backClass}>
                    <p>?????????????????????</p>
                    {/* <ControlledElement id="180" /> */}
                    {/* <Config id="27" /> */}
                </div>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;