'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { watermark } from './watermark';
import './index.css';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState()
    }

    componentDidMount() {
        const getRandom = () =>{
            return parseInt(Math.random() * 10000);
        }
        const id = `watermarkWarpper_${getRandom()}`;

        this.setState({id},this.renderWatermark);
    }

    componentWillReceiveProps(nextProps) {
        this.renderWatermark();
    }

    componentWillUnmount() {
        this.setState(this.getInitialState())
    }
    getInitialState = () =>{
        return {
            id:null
        }
    }
    screenChange =() =>{
        const { id }         = this.state;
        let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
        let observer         = new MutationObserver(this.renderWatermark);
        const element        = document.getElementById(id);
        observer.observe(element, { characterData:true });
     }
    renderWatermark = () =>{
        const { ifWatermark } = this.props;
        const { id }          = this.state;
        const ele             = document.getElementById(id);
        if(ifWatermark && ele){
            //创建
            setTimeout(()=>{
                watermark(ele); 
            },800)
        }
    }
    render() {
        const { id } = this.state;
        if(!id) return null;
        const { children , style, ifWatermark} = this.props;

        const childrenWithProps = React.Children.map(children, child => child?React.cloneElement(child):null);
        return (
            <div className={ifWatermark ? "watermarkContent" : ''} id={id} style={style}>
                {childrenWithProps}
            </div>
        );
    }
}

Index.propTypes = {
    children   : PropTypes.node.isRequired,
    ifWatermark: PropTypes.bool,
    style      : PropTypes.object
};

Index.defaultProps = {
    ifWatermark: true,
    style      : {}
}

export default Index;