'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gethashcode } from '../../util/hash';
import { setDefault } from '@util';
import { Checkbox } from 'antd'
import Tooltip from '@toolTip'
import RsIcon from '../../rsIcon/index';

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
            id             : "",
            plainOptions   : [],
            defaultval     : [],
            style          : {},
            selectValue    : []
        }
    }
    //初始化数据
    initData = () =>{
        let {isReady, defaultval, selectValue} = this.state
        const _props = this.props;

        try{
            let id            = setDefault(_props.id),
                plainOptions  = setDefault(_props.plainOptions, []),
                style         = setDefault(_props.style, {});

            if(!plainOptions.length) isReady = false
            else{
                isReady = true
                defaultval = _props.defaultval?_props.defaultval:[plainOptions[0].value]
                selectValue = defaultval
            }
            //设置组件状态
            this.setState({ id, plainOptions, defaultval, selectValue, style, isReady },()=>this.props.changeCheckbox(defaultval));
        } catch (error) {
            console.log(`checkbox组件渲染出错：${error}`);
        }
    }

    onChange = (e) => {
        const {required} = this.props;
        if (required) {
            if(e.length === 0) return;
        }
        this.setState({selectValue: e}, ()=>this.props.changeCheckbox(e))
    }
    render() {
        const { isReady, plainOptions, defaultval, selectValue, style} = this.state;
        const { explain }  = this.props;
        if(!isReady) return null;
        return (
            <div className='check-box-download' style={{...style}}>
                <Checkbox.Group options={plainOptions} defaultValue={defaultval} value={selectValue} onChange={this.onChange} />
                {
                    explain && <Tooltip title={explain} placement="bottomLeft" overlayStyle={{ maxWidth: 800 }}>
                        <RsIcon type="icon-shuoming" className="titleIcon" />
                    </Tooltip>

                }
            </div>
        );
    }
}

Index.propTypes = {
    id              : PropTypes.string,
    plainOptions    : PropTypes.array,
    defaultval      : PropTypes.array,
    changeCheckbox  : PropTypes.func,
    style           : PropTypes.object,
};

Index.defaultProps = {
    id   : `title_${gethashcode()}`,
}

export default Index;