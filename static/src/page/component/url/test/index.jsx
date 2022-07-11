import React, { Component } from 'react';
import ControlledElement from '../../controlledElement/config/index';
import Url from '../config/index'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <br />
                测试url参数
                <Url id='6751' />
                <ControlledElement id="6754" />
            </div>
        );
    }
}

export default Index;