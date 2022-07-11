'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../component/page/header/index';
import Menu from '../../component/page/menu/index';
import PMDetailMenu from '../../component/page/primary';
import BottomExplain from '../../component/page/bottomExplain';
import { init } from '../../../qiankunMaster/index';
import '../index.less';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        init();
        const dom = document.querySelector('.tab-line-style')
        console.log('domdomdom', dom)
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
    render() {
        const { children, className, match } = this.props;
        const childrenWithProps = React.Children.map(children, child => React.cloneElement(child));
        // const params = match.params;
        const path = location.pathname.replace('/page/', '');
        return (
            <div className='symbol' >
                <Header />
                <div className="contentWrapper">
                    <Menu urlData={{ path }} />
                    <div className="rightContnet">
                        {childrenWithProps}
                        <BottomExplain />
                    </div>
                </div>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;