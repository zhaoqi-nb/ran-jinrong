'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RsIcon from '../../../component/rsIcon/index';
import i18n from '@/plugin/i18n'
import {FormattedMessage} from '@/components/FastIntl';

import './index.less';

const iconStyle = {
    fontSize: "20px",
    color: "#333333"
}

class Simple extends Component {
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
            isReady: false,
            currentLanguage: i18n.getLocalLanguage(),//'ranshu-finance-node',
        }
    }
    initData = () => {
        this.setState({ isReady: true });
    }
    // 切换语言
    changeLanguage = () => {
        let currentLanguage = this.state.currentLanguage;
        if (currentLanguage == "en_US") {
            i18n.switchLanguage('')
            this.setState({ currentLanguage: "" });
        } else {
            i18n.switchLanguage('en_US')
            this.setState({ currentLanguage: "en_US" });
        }
    }

    render() {
        const { isReady, currentLanguage } = this.state;
        if (!isReady) return null;
        return (
            <div className="header-container">
                <div className="header-left">
                    <a href="/">
                        <img src={require("../../../image/logo.png")} alt="logo" className="logo" />
                    </a>
                </div>
                <div className="header-right">
                    <div className="menu-item">
                        <Link to={"/page/index"} key="index" className="menu-link">
                            <RsIcon type="icon-shouye" style={iconStyle} />
                            <div><FormattedMessage id="首页"/></div>
                        </Link>
                    </div>
                    <div className="menu-item" onClick={this.changeLanguage}>
                        {currentLanguage == "en_US" ? (
                            <React.Fragment>
                                <RsIcon type="icon-zhongwen" style={iconStyle} />
                                <div><FormattedMessage id="中文"/></div>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <RsIcon type="icon-fanyi" style={iconStyle} />
                                <div>English</div>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

Simple.propTypes = {

};

export default Simple;