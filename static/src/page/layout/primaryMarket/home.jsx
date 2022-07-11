'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../component/page/header/index';
import Menu from '../../component/page/menu/index';
import CompanyMenu from '../../component/page/companyLeft/index';
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
                <div className="contentWrapper" style={{height: 0, overflow: 'auto'}}>
                    {/* <Menu ifFixExpanded={false} urlData={{ path }} /> */}
                    <Menu urlData={{ path }} />
                    <div className="rightContnet" style={{ display: 'flex', flexDirection: 'column', width: 'calc(100% - 208px)', overflow: 'auto'}}>
                        <div style={{ flex: 1, padding: "10px 24px", width: '100%' }}>
                            <div className={className}>
                                {childrenWithProps}
                            </div>
                        </div>
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