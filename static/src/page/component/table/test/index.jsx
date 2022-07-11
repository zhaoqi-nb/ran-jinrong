'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Common from '../common/index';

const backClass = {
    margin:"20px",
    background:"#F5F7FA",
    border:"1px solid #8C8C8C",
    padding:"10px"
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

    render() {
        const data = {
            "columns": [
                {
                    "title": "指标",
                    "dataIndex": "title",
                    "align": "center"
                },
                {
                    "title": "2019-10月",
                    "dataIndex": "201910",
                    "align": "center"
                },
                {
                    "title": "2019-11月",
                    "dataIndex": "201911",
                    "align": "center"
                },
                {
                    "title": "2019-12月",
                    "dataIndex": "201912",
                    "align": "center"
                },
                {
                    "title": "2020-01月",
                    "dataIndex": "202001",
                    "align": "center"
                },
                {
                    "title": "2020-02月",
                    "dataIndex": "202002",
                    "align": "center"
                },
                {
                    "title": "2020-03月",
                    "dataIndex": "202003",
                    "align": "center"
                },
                {
                    "title": "2020-04月",
                    "dataIndex": "202004",
                    "align": "center"
                },
                {
                    "title": "2020-05月",
                    "dataIndex": "202005",
                    "align": "center"
                },
                {
                    "title": "2020-06月",
                    "dataIndex": "202006",
                    "align": "center"
                },
                {
                    "title": "2020-07月",
                    "dataIndex": "202007",
                    "align": "center"
                },
                {
                    "title": "2020-08月",
                    "dataIndex": "202008",
                    "align": "center"
                },
                {
                    "title": "2020-09月",
                    "dataIndex": "202009",
                    "align": "center"
                },
                {
                    "title": "2020-10月",
                    "dataIndex": "202010",
                    "align": "center"
                },
                {
                    "title": "2020-11月",
                    "dataIndex": "202011",
                    "align": "center"
                },
                {
                    "title": "2020-12月",
                    "dataIndex": "202012",
                    "align": "center"
                },
                {
                    "title": "2021-01月",
                    "dataIndex": "202101",
                    "align": "center"
                },
                {
                    "title": "2021-02月",
                    "dataIndex": "202102",
                    "align": "center"
                },
                {
                    "title": "2021-03月",
                    "dataIndex": "202103",
                    "align": "center"
                },
                {
                    "title": "2021-04月",
                    "dataIndex": "202104",
                    "align": "center"
                },
                {
                    "title": "2021-05月",
                    "dataIndex": "202105",
                    "align": "center"
                },
                {
                    "title": "2021-06月",
                    "dataIndex": "202106",
                    "align": "center"
                }
            ],
            "dataSource": [
                {
                    "title": "线上销售额",
                    "operate": {
                        "format": "percent",
                        "divide": null,
                        "bit_number": 2
                    },
                    "201910": 0.07295433284713315,
                    "201911": 0.2072425212678226,
                    "201912": 0.14300040193715824,
                    "202001": -0.05958451958036204,
                    "202002": -0.2242166379139493,
                    "202003": 0.00972098844165803,
                    "202004": -0.12743361687309107,
                    "202005": 0.09717797940541462,
                    "202006": 0.12386798206716287,
                    "202007": 0.14121610379333505,
                    "202008": 0.24507509534170735,
                    "202009": 0.2806377204123447,
                    "202010": 0.18531242524580538,
                    "202011": 0.0866825840384835,
                    "202012": 0.15317137044090678,
                    "202101": 0.3161168416509137,
                    "202102": 0.8252583287069435,
                    "202103": 0.2450988231578508,
                    "202104": 0.2650771801897016,
                    "202105": -0.01735519843036848,
                    "202106": 0.05532244839754008,
                    "202107": 0.025887343123892625,
                    "202108": -0.08847606477481895,
                    "202109": -0.23659550257969708,
                    "202110": -0.1370599212612882,
                    "202111": -0.044234233595194516,
                    "202112": -0.24221321150395658,
                    "202201": -0.11720027014751044
                },
                {
                    "title": "线上商品均价",
                    "operate": {
                        "format": "percent",
                        "divide": null,
                        "bit_number": 2
                    },
                    "201910": -0.0448733726095083,
                    "201911": 0.007385404216792235,
                    "201912": -0.01117703909859169,
                    "202001": 0.06565257340257524,
                    "202002": 0.04464464228180698,
                    "202003": 0.0407628054460385,
                    "202004": 0.009514709973670543,
                    "202005": 0.00774041174552309,
                    "202006": 0.0719342214402563,
                    "202007": 0.08627317817433244,
                    "202008": 0.15681666030644958,
                    "202009": 0.14037921036490708,
                    "202010": 0.15347134261759154,
                    "202011": 0.11420159309696598,
                    "202012": 0.1255475579182952,
                    "202101": 0.029321142953200097,
                    "202102": 0.09514058154831218,
                    "202103": 0.06777076538141169,
                    "202104": 0.15972587904717317,
                    "202105": 0.05993266983723555,
                    "202106": 0.09279417351348429,
                    "202107": 0.0948606732331132,
                    "202108": 0.06793464770801849,
                    "202109": 0.03698746981145762,
                    "202110": -0.03984760981025859,
                    "202111": 0.06489657153955153,
                    "202112": 0.02094620845241968,
                    "202201": 0.030394634326885717
                }
            ]
        }
        const option = {
            type:"trend",
            chartOption:{
                type:"line",
            },
            headerMapping:{
                "other": {
                    "type": "date",
                    "dateType": "month",
                    "columnStyle": {
                        "width": 130,
                        "align": "center"
                    }
                },
                "title": {
                    "explain": {
                        "text": "1.销售额：在所选时间的统计期内，该公司售出商品的销售额；&&2.销售量：在所选时间的统计期内，该公司售出商品的销量；&&3.商品均价：销售额/销售量；"
                    },
                    "type": "string",
                    "columnStyle": {
                        "width": 130,
                        "fixed": "left",
                        "align": "left"
                    }
                }
            }
        }
        return (
            <div>
                <div style={backClass}>
                    <p>公用组件调用</p>
                    <Common id="test"  option={option} data={data}/>
                </div>
                <div style={backClass}>
                    <p>配置化组件调用</p>
                </div>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;