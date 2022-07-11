'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Common from '../common/index';
import Config from '../config/index'

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
        return (
            <div>
                <div style={backClass}>
                    <p>公用组件调用</p>
                    <Common id="测试" type='text' param={{title:'公司名称', value:'南极电商', textColor:'#0678FF'}}/>
                    <Common id="测试" type='value' param={{title:'总市值', value:74784100000, format:{type:"unit", bit_number:1, unit:"亿"}}}/>
                    <Common id="测试" type='upValue' param={{title:'YOY', value:0.3}}/>
                </div>
                <div style={backClass}>
                    <p>配置化组件调用</p>
                    <Config/>
                </div>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;