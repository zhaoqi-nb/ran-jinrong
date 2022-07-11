'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../component/page/header/index';
import Menu from '../../component/page/menu/index';
import CompanyMenu from '../../component/page/companyLeft/index';
import BottomExplain from '../../component/page/bottomExplain';
import { setBottomExplainFun } from '../../../utils/pageData';
import '../index.less';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        setBottomExplainFun(this.changeBottomExplain);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    changeBottomExplain = () => {
        this.setState({
            isBottomExplain: false,
        })
    }

    componentWillUnmount() {
        this.setState(this.getInitialState())
    }
    getInitialState = () => {
        return {
            isReady: false,
            isBottomExplain: true,
        }
    }
    render() {
        const { children, className, match } = this.props;
        const childrenWithProps = React.Children.map(children, child => React.cloneElement(child));
        const params = match.params;
        return (
            <div className='symbol' >
                <Header />
                <div className="contentWrapper">
                    <Menu ifFixExpanded={false} urlData={params} />
                    <div className="rightContnet">
                        <div style={{ display: "flex", height: "calc(100% - 0px)" }}>
                            <div style={{ width: 168, height: "100%" }}>
                                <CompanyMenu urlData={params} />
                            </div>
                            {
                                this.state.isBottomExplain ? <div
                                style={{
                                    height: "calc(100% - 0px)", 
                                    overflow: "auto", 
                                    display: 'flex', 
                                    flexDirection: "column",
                                    padding: 0
                                }} className={className}>
                                <div style={{flex: 1, padding: "0 24px 20px 24px"}}>{childrenWithProps}</div>
                                <BottomExplain />
                            </div> : <div className={className}>{childrenWithProps}</div>
                            }
                           
                        </div>
                       
                    </div>
                </div>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;