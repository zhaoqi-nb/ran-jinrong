'use strict';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { gethashcode } from '../../util/hash';
import { setDefault } from '@util';
import RsIcon from '../../rsIcon/index';
import Tooltip from '@toolTip'
import _ from 'lodash'
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
        const { text } = this.props;
        if (text != nextProps.text) this.setState({ text: nextProps.text })
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
            //数据说明
            explain: "",
            style: {},
        }
    }
    //初始化数据
    initData = () => {
        const _props = this.props;
        try {
            let id = setDefault(_props.id);
            let text = setDefault(_props.text);
            let style = setDefault(_props.style);
            let explain = setDefault(_props.explain)

            console.log('_props_props_props', _props)
            //设置组件状态
            this.setState({ id, text, style, explain, isReady: true });
        } catch (error) {
            console.log(`title组件渲染出错：${error}`);
        }
    }
    renderTitle = () => {
        let { id, text, style, explain } = this.state;
        const { params } = this.props
        const _style = Object.assign({}, style);
        let href = params && _.get(params, 'resId') ? `/redirect/company/${_.get(params, 'resId')}` : null,
            _text = null;
        if (href) {
            let nameArr = text.split('-')
            text = nameArr[0]
            _text = nameArr.slice(1,).length ? `-${nameArr.slice(1,).join('-')}` : ""
        }

        return <div className="compo-title excel-title" key={id} style={_style}>
            {
                href
                    ? <span><a href={href}>{text}</a>{_text}</span>
                    : text
            }
            {
                explain && <Tooltip title={explain} placement="bottomLeft" overlayStyle={{ maxWidth: 800 }}>
                    <RsIcon type="icon-shuoming" className="titleIcon" />
                </Tooltip>

            }

        </div>
    }
    render() {
        const { isReady } = this.state;
        if (!isReady) return null;
        return this.renderTitle();
    }
}

Index.propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    style: PropTypes.object,
};

Index.defaultProps = {
    id: `title_${gethashcode()}`,
    text: "",
    style: {}
}

export default Index;