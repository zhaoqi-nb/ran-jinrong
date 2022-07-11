'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SimpleHeader from '../../component/page/header/simple';
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
        const { children , path } = this.props;
        const childrenWithProps = React.Children.map(children, child => React.cloneElement(child));
        return (
            <div className='symbol' >
                <SimpleHeader />
                <div className="contentWrapper">
                    {childrenWithProps}
                </div>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;