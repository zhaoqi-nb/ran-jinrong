'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import i18n from '@/plugin/i18n'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        document.querySelector("#container").style.overflow = "initial"
        document.querySelector("#container").style.overflowX = "initial"
        this.initData();
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.setState(this.getInitialState())
    }
    getInitialState = () => {
        return {
        }
    }
    initData = async () => {
        let BASE_URL = process.env.API_URL;
        const { urlPath } = this.props;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = false;
        script.src = `${BASE_URL}/public/dist/${urlPath}.js?_t=${(new Date).getTime()}`;
        console.log('loadUrl=>', script.src);
        document.head.appendChild(script);
    }
    render() {
        return (
            <div id="otherSystem"><Spin tip={i18n.format("加载中，请稍后...")} style={{ margin: "50px auto", display: "block" }}></Spin></div>
        );
    }
}

Index.propTypes = {

};

export default Index;