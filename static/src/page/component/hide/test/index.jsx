'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Config from '../config/index';

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

    onChangeCheckbox = (value) => {
        console.log(value);
    }

    render() {
        return (
            <div>
                <div style={backClass}>
                    <p>配置化组件checkbox调用</p>
                    <Config id="6724" />
                </div>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;