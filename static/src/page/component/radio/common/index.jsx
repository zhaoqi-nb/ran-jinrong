'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
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
    getInitialState = () => {
        return {
            //组件是否准备就绪
            isReady: false,
            //内容
            id: "",
            text: "",
            style: {},
            data: [],
            defaultSelect: null,
        }
    }
    //初始化数据
    initData = () => {
        let { data, defaultSelect } = this.props
        this.setState({ data, defaultSelect, isReady: true })
    }

    render() {
        const { isReady, data, defaultSelect } = this.state;
        const { getSelectValue, style, type, title} = this.props
        if (!isReady || !data || !data.length) return null;
        return (
            <div style={{display:"flex", alignItems:"center", ...style}}>
                {title?`${title}：`:""}
                <Radio.Group defaultValue={defaultSelect} buttonStyle="solid" onChange={getSelectValue} className={type == "defaultRadio"?"radioStyle":""}>
                    {
                        type == "defaultRadio" ? data.map((item, index) => <Radio key={index} value={item.code}>{item.name}</Radio>)
                                            : data.map((item, index) => <Radio.Button key={index} value={item.code}>{item.name}</Radio.Button>)
                    }
                </Radio.Group>
            </div>
        );
    }
}

Index.propTypes = {
    id: PropTypes.string,
};

Index.defaultProps = {
    id: `title_${gethashcode()}`,
}

export default Index;