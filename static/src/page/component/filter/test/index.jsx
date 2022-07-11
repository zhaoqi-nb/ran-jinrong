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

    onOK = (e) => {
        console.log(e);
    }

    render() {
        const plainOptions = [
            {
                title:'基础指标',
                children:[
                    {name: '线上销售额', code: '线上销售额'},
                    {name: '商品均价', code: '商品均价'},
                    {name: '同比增速', code: '同比增速'},
                ],
            },{
                title:'品牌集中度',
                children:[
                    {name: '中', code: '中'},
                    {name: '高', code: '高'},
                    {name: '低', code: '低'},
                ],
            },{
                title:'价格段分布',
                children:[
                    {name: '0-50', code: '0-50'},
                    {name: '50-200', code: '50-200'},
                    {name: '200-500', code: '200-500'},
                    {name: '500-1000', code: '500-1000'},
                    {name: '1000-2000', code: '1000-2000'},
                    {name: '200-5000', code: '200-5000'},
                    {name: '5000-10000', code: '5000-10000'},
                    {name: '10000-50000', code: '10000-50000'},
                    {name: '50000+', code: '50000+'},
                ],
            }
        ]
        return (
            <div>
                <div style={backClass}>
                    <p>公用组件调用</p>
                    <Common id="测试" type="complex" plainOptions={plainOptions} defaultval={[234]} onOk={this.onOK}/>
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