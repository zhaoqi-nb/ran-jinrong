'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../component/page/header/index';
import Menu from '../../component/page/menu/index';
import BoardMenu from '../../component/page/boardLeft/index';
import BottomExplain from '../../component/page/bottomExplain';
import { init } from '../../../qiankunMaster/index';
import { setBottomExplainFun } from '../../../utils/pageData';
import KeepAlive from 'react-activation'
import '../index.less';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        setBottomExplainFun(this.changeBottomExplain);

    }

    componentDidMount() {
        init();
    }

    changeBottomExplain = () => {
        this.setState({
            isBottomExplain: false,
        })
    }

    componentWillReceiveProps(nextProps) {
        // init();
    }

    componentWillUnmount() {
        this.setState(this.getInitialState())
    }
    getInitialState = () => {
        return {
            isReady: false,
            visible: false,
            isBottomExplain: true,
        }
    }


    render() {
        const { children, className, match } = this.props;

        // const childrenWithProps = React.Children.map(children, child => React.cloneElement(child));
        // const params = match.params;
        const pathStr = location.pathname.replace('/page/', '').replace('appSM/', '');
        const [boardId, resId, path] = pathStr.split("/")
        console.log('secondary-path', { boardId, resId, path }, children)
        const myChildren = <KeepAlive cacheKey="123123123123123">{children}</KeepAlive>
        return (
            <div className='symbol' >
                <Header />
                <div className="contentWrapper" >
                    <Menu ifFixExpanded={false} urlData={{ boardId, resId, path }} />
                    <div className="rightContnet">
                        {/* <div style={{ display: "flex", height: "calc(100% - 32px)" }}> */}
                        <div style={{ display: "flex", height: "100%" }}>
                            <div style={{ width: 168, height: "100%" }}>
                                <BoardMenu urlData={{ boardId, resId, path }} />
                            </div>
                            {
                                this.state.isBottomExplain ? <div
                                    style={{
                                        height: "calc(100% - 0px)",
                                        overflow: "auto",
                                        display: 'flex',
                                        flexDirection: "column",
                                        padding: 0
                                    }} className={className + ' paddingWrap'}>
                                    {/* 0 24px 20px 24px */}
                                    <div style={{ flex: 1, padding: "0" }}><React.Fragment key="11111">{myChildren}</React.Fragment></div>
                                    <BottomExplain />
                                </div> : <div className={className + ' paddingWrap'} style={{ padding: 0 }}><React.Fragment key="11111">{myChildren}</React.Fragment></div>
                            }
                            {/* <div className={className} style={{ padding: 0 }}>{childrenWithProps}</div> */}
                        </div>
                        {/* <BottomExplain /> */}
                    </div>
                </div>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;