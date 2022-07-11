'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }
 
    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.setState(this.getInitialState());
    }
    getInitialState = () => {
        return {
            isReady : false,
        }
    }
    render() {
        return (
            <div>
                事件洞察的页面
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;