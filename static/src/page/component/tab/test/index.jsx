'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CustomTab as CustomTabCommon, CustomTabPane as CustomTabPaneCommon } from '../common';
import { CustomTab, CustomTabPane } from '../config';
const backClass = {
   // margin:"20px",
    background:'#fff',///"#F5F7FA",
    border:"1px solid #8C8C8C",
    padding:"10px"
}

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
            currSelect: "1",
            tabData: [{title:"表格",value:"1"},{title:"图形",value:"2"},{title:"图表",value:"3"}],
            tabData1: [{title:"公司速览",value:"1"},{title:"线上电商",value:"2"},{title:"线下门店",value:"3"}],
            currSelect1: "1"
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }
 
    componentWillUnmount() {

    }

    render() {
        const {currSelect, tabData, tabData1, currSelect1} =this.state;
        return (
            <div>
                <div style={backClass}>
                    <p>Tab公用组件调用</p>
                    <CustomTabCommon id="测试card类型tab" currSelect={currSelect} tabData={tabData} type={"card"}>
                        <CustomTabPaneCommon>
                            <div>card tab1内容</div>
                        </CustomTabPaneCommon>
                        <CustomTabPaneCommon>
                            <span>card tab2内容</span>
                        </CustomTabPaneCommon>
                        <CustomTabPaneCommon>
                            <span>card tab3内容</span>
                        </CustomTabPaneCommon>
                    </CustomTabCommon>
                    <CustomTabCommon id="测试line类型tab" currSelect={currSelect} tabData={tabData} type={"line"}>
                        <CustomTabPaneCommon>
                            <div> line tab1内容</div>
                        </CustomTabPaneCommon>
                        <CustomTabPaneCommon>
                            <span>line tab2内容</span>
                        </CustomTabPaneCommon>
                        <CustomTabPaneCommon>
                            <span>line tab3内容</span>
                        </CustomTabPaneCommon>
                    </CustomTabCommon>
                    <CustomTabCommon id="测试锚点" currSelect={currSelect1} tabData={tabData1} type={"anchor"}>
                        <CustomTabPaneCommon>
                            <div style={{height: 600}}>锚点内容1</div>
                        </CustomTabPaneCommon>
                        <CustomTabPaneCommon>
                            <div style={{height: 500}}>锚点内容2</div>
                        </CustomTabPaneCommon>
                        <CustomTabPaneCommon>
                            <div style={{height: 450}}>锚点内容3</div>
                        </CustomTabPaneCommon>
                    </CustomTabCommon>
                </div>
                <div style={backClass}>
                    <p>Tab配置化组件调用</p>
                    <CustomTab id="5303" >
                        <CustomTabPane>
                            <div>tab1内容</div>
                        </CustomTabPane>
                        <CustomTabPane>
                            <span>tab2内容</span>
                        </CustomTabPane>
                
                    </CustomTab>
                </div>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;