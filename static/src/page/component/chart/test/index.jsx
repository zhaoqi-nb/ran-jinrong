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
                    "unit": "百万",
                    "bit_number": 0,
                    "type": "unit"
                },
                "inverse": true,
                "name": "线上销售额(百万元)",
                "format": {
                    "unit": "百万",
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

        const data = this.transferData({ "legend": ["图形"], "xData": ["童鞋", "服饰配件", "女鞋", "居家布艺", "男鞋", "运动服饰", "童装", "床上用品", "运动鞋", "内衣", "男装", "女装"], "series": [[["童鞋", 795237142.6812], ["服饰配件", 1840123363.3109], ["女鞋", 1985597168.4965], ["居家布艺", 2634862935.8801], ["男鞋", 2677642098.9558], ["运动服饰", 2700445315.1985], ["童装", 3629015290.836], ["床上用品", 3732872378.183], ["运动鞋", 4336385462.5174], ["内衣", 6249712734.3188], ["男装", 9365617993.2687], ["女装", 11535079845.1723]]] })
        return (
            <div>
                <div style={backClass}>
                    <p>公用组件调用</p>
                    <Common id="test" option={option} data={data} />
                </div>
                <div style={backClass}>
                    <p>配置化组件调用</p>
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