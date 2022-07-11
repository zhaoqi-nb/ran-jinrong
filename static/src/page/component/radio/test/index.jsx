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
        return (
            <div>
                <div style={backClass}>
                    <p>公用组件调用</p>
                    <Common id="测试"/>
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