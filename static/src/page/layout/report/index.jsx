'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../component/page/header/index';
import Menu from '../../component/page/menu/index';
import BottomExplain from '../../component/page/bottomExplain'
import '../index.less';

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
        this.setState(this.getInitialState())
    }
    getInitialState = () => {
        return {
            isReady: false
        }
    }
    render() {
        const { children, className, path } = this.props;
        const childrenWithProps = React.Children.map(children, child => React.cloneElement(child));
        console.log("使用报告详情模板>>>>>", childrenWithProps, this.props)
        return (
            <div className='symbol' >
                <Header />
                <div className="contentWrapper">
                    <Menu ifFixExpanded={false} urlData={{path}}/>
                    <div className="rightContnet">
                        <div className={className}>{childrenWithProps}</div>
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