'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gethashcode } from '../../util/hash';
import { setDefault } from '@util';
import Simple from './simple'
import Complex from './complex'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        this.initData()
    }

    componentWillReceiveProps(nextProps) {
        const { plainOptions } = this.props
        if (JSON.stringify(plainOptions) != JSON.stringify(nextProps.plainOptions)) {
            this.initData(nextProps)
        }
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
            type: null,
            plainOptions: [],
            defaultval: [],
            style: {},
        }
    }
    //初始化数据
    initData = (nextProps) => {
        let { isReady, defaultval } = this.state
        const _props = nextProps || this.props;

        try {
            let id = setDefault(_props.id),
                plainOptions = setDefault(_props.plainOptions, []),
                type = setDefault(_props.type, 'simple'),
                style = setDefault(_props.style, {});

            if (!plainOptions.length) isReady = false
            else {
                isReady = true
                defaultval = setDefault(_props.defaultval, []);
            }
            this.setState({ id, plainOptions, defaultval, type, style, isReady });
        } catch (error) {
            console.log(`filter组件渲染出错：${error}`);
        }
    }

    render() {
        const { isReady, type, style } = this.state;
        if (!isReady) return null;
        let _style = Object.assign({}, style);

        return (
            <div>
                {
                    type == 'simple' ? <Simple {...this.props}  {...this.state} /> : <Complex {...this.props} {...this.state} />
                }

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