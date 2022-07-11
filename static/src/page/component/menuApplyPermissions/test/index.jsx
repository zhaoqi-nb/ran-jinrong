import React, { Component } from 'react';
import MenuApplyPermissions from '../config/index'
import ControlledElement from '../../controlledElement/config/index';
import { getPageInfo } from '../../util/privilege'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        const pageInfo = getPageInfo()
        const data = pageInfo ? pageInfo.privilegeDtoList : {}
        console.log(data)
        return (
            <div>
                <MenuApplyPermissions id="6755" data={data} />
                <ControlledElement id="6756" />
            </div>
        );
    }
}

export default Index;