'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Common from '../common';
import './index.less';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
           data: [{name:"全部", code:"全部"},{name:"家用电器", code:"家用电器"},{name:"数码3c", code:"数码3c"}],
        }
    }
    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }

    render() {
        const { data } = this.state;
        return (
            <div>
                <p>filterOption公用组件测试</p>
                <div style={{ marginTop: "10px", display: "flex", height: '24px', flexDirection: "row", alignItems: 'center'}}>
                    <span className='f-title' style={{ minWidth: "70px" }}>行业</span>
                    <Common
                        style={{ display: "inline-block" }}
                        selectId={ '全部' }
                        data={ data }
                        onSelect={(item) => this.handleOnChange(item.code)} />
                </div>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;