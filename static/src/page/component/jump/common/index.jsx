'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gethashcode } from '../../util/hash';
import { setDefault } from '@util';

import './index.less';

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
        this.setState(this.getInitialState())
    }
    getInitialState = () =>{
        return {
            //组件是否准备就绪
            isReady: false,
            //内容
            id     : "",
            title  : "",
            list   : [],
            style  : {},
        }
    }
    //初始化数据
    initData = () =>{
        const _props = this.props;
        try {
            let id    = setDefault(_props.id);
            let title = setDefault(_props.title);
            let list  = setDefault(_props.list);
            let style = setDefault(_props.style);
            //设置组件状态
            this.setState({ id, title, list, style, isReady:true });
        } catch (error) {
            console.log(`title组件渲染出错：${error}`);
        }
    }
    renderContent = () =>{
        const { id, style, title, list} = this.state;
        return <div className="jump-wrapper" key={id}>
                <div className="title">{title}</div>
                <div className="content">
                {list.map((item,index) => <a href={item.value} key={index}>{item.title}</a>)}
                </div>
                
            </div>
    }
    render() {
        const { isReady } = this.state;
        if(!isReady) return null;
        return this.renderContent();
    }
}

Index.propTypes = {
    id   : PropTypes.string,
    title : PropTypes.string,
    list : PropTypes.array,
    style: PropTypes.object,
};

Index.defaultProps = {
    id   : `title_${gethashcode()}`,
    title : "",
    list : [],
    style : {}
}

export default Index;