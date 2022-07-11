/*
 * @Author: lin.li@fengjr.com 
 * @Date: 2019-05-08 10:40:24 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-02-Mo 05:33:21
 */
'use strict';


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Empty } from 'antd';
import { transformText } from '../locales/index';
import i18n from '@/plugin/i18n'

const vertical = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    margin: "20px auto"
}

class NoData extends Component {
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
        const { style } = this.props;
        const tempStyle = { ...vertical, ...style };
        return (
            <div style={tempStyle}>
                <Empty description={i18n.format("暂无数据")} />
            </div>
        );
    }
}

NoData.propTypes = {
    style: PropTypes.object
};

export default NoData;