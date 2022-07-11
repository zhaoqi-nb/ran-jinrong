'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../component/page/header/index';
import Menu from '../../component/page/menu/index';
import DataSourceLeft from '../../component/page/dataSourceLeft/index';
import BottomExplain from '../../component/page/bottomExplain'
import '../index.less';
import { init } from '../../../qiankunMaster/index';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        // debugger;
        // console.log('1111========222>')
        if (this.props.isMicroApp) {
            init();
        }
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
        const { children, className, match, isMicroApp } = this.props;
        const childrenWithProps = React.Children.map(children, child => React.cloneElement(child));
        const params = match.params;
        return (
            <div className='symbol' >
                <Header />
                <div className="contentWrapper" style={{ height: 'auto' }}>
                    <Menu ifFixExpanded={false} urlData={params} />
                    <div className="rightContnet" style={{ overflowX: 'hidden' }}>
                        <div style={{ display: "flex", height: isMicroApp ? "100%" : "calc(100% - 32px)" }}>
                            <div style={{ width: 168, height: "100%" }}>
                                <DataSourceLeft isMicroApp={isMicroApp} urlData={params} />
                            </div>
                            <div style={{ overflowX: 'hidden' }} className={className}>{childrenWithProps}</div>
                        </div>
                        {isMicroApp ? null :
                            <BottomExplain />}
                    </div>
                </div>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;