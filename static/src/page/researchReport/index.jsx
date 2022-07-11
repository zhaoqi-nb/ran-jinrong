'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Api from './store/api';
import { getAccessState } from '../../page/component/util/template';
import { i18n } from '@/components/FastIntl';
import {FormattedMessage} from '@/components/FastIntl';
import _ from 'lodash';

import { Select, Tabs, Divider, Spin } from 'antd';
import CustomSelect from '@select/common';
import Filter from '@filter/common';
import Custom_Date from "@date/common";
import { CustomTab, CustomTabPane } from '@tab/common';
import MyCollect from './myCollect';
import SecondMarketresport from './secondMarketReport';
import './index.less';

const { TabPane } = Tabs;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
            //组件是否准备就绪
            isReady: false,
            //内容
            currSelect: "1",
            tabData: [{ title: i18n.format("二级市场研究"), value: "1" }, { title: i18n.format("一级市场研究"), value: "2" }, { title: i18n.format("我的收藏"), value: "3" }],
            //tabData: [{ title: i18n.format("二级市场研究"), value: "1" }, { title: i18n.format("我的收藏"), value: "2" }]
        }
    }
    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }

    renderTabPane = () => {
        const { tabData } = this.state;
        return tabData.map((item, index) => {
            return  <TabPane tab={item.title} key={item.value}>
            {/* {item.value == 1 ? <SecondMarketresport guestType={"一级市场"}/> : null} */}
            {item.value == 1 ? <SecondMarketresport guestType={"二级市场"}/> : null}
            {item.value == 2 ? <MyCollect /> : null}
        </TabPane>
        })
    }

    handleTabChange = (key) => {
        console.log("tab回调", key)
        this.setState({currSelect: key})
    }

    render() {
        return (
            <div className="research-report-container">
                {/* <Tabs defaultActiveKey="0" destroyInactiveTabPane>
                    {this.renderTabPane()}
                </Tabs> */}
                <CustomTab
                    id="报告入口"
                    tabData={this.state.tabData}
                    currSelect={this.state.currSelect}
                    onChange={this.handleTabChange}
                    type="line"
                    hiddenBottomExplain={true}
                >
                    <CustomTabPane>
                        <SecondMarketresport guestType={"二级市场"} />
                    </CustomTabPane>
                    <CustomTabPane>
                       <SecondMarketresport guestType={"一级市场"}/>
                    </CustomTabPane>
                    <CustomTabPane>
                        <MyCollect />
                    </CustomTabPane>
                </CustomTab>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;