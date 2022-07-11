'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '../component/table/test/index';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        this.initData();
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillUnmount() {
        this.setState(this.getInitialState())
    }
    getInitialState = () => {
        return {
            isReady: false
        }
    }
    initData = async () => {
        this.setState({ isReady: true });
    }

    render() {
        const { isReady } = this.state;
        if (!isReady) return null;
        return (
            <div>
                <Table />
            </div >
        );
    }
}

Index.propTypes = {

};

export default Index;