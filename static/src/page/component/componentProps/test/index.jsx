import React, { Component } from 'react';
import ComponentProps from '../config/index'
import ControlledElement from '../../controlledElement/config/index';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const data = {
            "path": "6745",
            "ifshowBlock": false,
            "update_type": "月频",
            "analysis_type": "电商",
            "icon": "icon-medical-treatment",
            "menuType": "config",
            "menuName": "阿里健康",
            "stock_code": "0241.HK"
        }
        return (
            <div>
                <br />
                测试组件参数传递
                <ComponentProps id="6749" data={data} />
                <ControlledElement id="6750" />
            </div>
        );
    }
}

export default Index;