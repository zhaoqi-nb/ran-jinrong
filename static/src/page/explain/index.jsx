'use strict'

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import { GetQueryString } from '../../utils/Util';
import User from './user';
import Privacy from './privacy';
import Exemption from './exemption';
import { i18n } from '@/components/FastIntl';
import './index.less';
const { TabPane } = Tabs;

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
        this.setState(this.getInitialState());
    }
    getInitialState = () => {
        return {
            isReady: false,
            current: "",
            tabs: [i18n.format("用户协议"), i18n.format("隐私政策"), i18n.format("免责声明")]
        }
    }
    initData = () => {
        let current = GetQueryString("tab") || 0;
        this.setState({ current, isReady: true })
    }
    renderContent = (data) => {
        const currentLanguage = i18n.getLocalLanguage()
        return data.map((text, index) => {
            let html = null;
            if (!index) html = <User currentLanguage={currentLanguage} />
            else if (index == 1) html = <Privacy currentLanguage={currentLanguage} />
            else if (index == 2) html = <Exemption currentLanguage={currentLanguage} />
            return <TabPane tab={text} key={index}>{html}</TabPane>;
        })
    }
    handleChange = (current) => {
        this.setState({ current });
    }
    render() {
        const { isReady, tabs, current } = this.state;
        if (!isReady) return null;
        return (
            <div className="explain-wrap">
                <Tabs tabPosition={"left"} defaultActiveKey={current} tabBarGutter={4} onChange={this.handleChange}>
                    {this.renderContent(tabs)}
                </Tabs>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;