'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gethashcode } from '../../util/hash';
import { setDefault } from '@util';
import './index.less';
import classnames from 'classnames';
import i18n from '@/plugin/i18n';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        this.initData();
    }

    componentWillReceiveProps(nextProps) {
        const { date_type, stat_date } = this.props;
        if (date_type != nextProps.date_type || stat_date != nextProps.stat_date) {
            this.setState(this.getInitialState(), () => this.initData(nextProps))
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
            title: "",
            date_type: null,
            stat_date: null,
            suffix: null,
            style: {},
            className: [],
        }
    }
    //初始化数据
    initData = (nextProps) => {
        const _props = nextProps || this.props;

        try {
            let id = setDefault(_props.id),
                title = setDefault(_props.title),
                date_type = setDefault(_props.date_type),
                stat_date = setDefault(_props.stat_date),
                suffix = setDefault(_props.suffix, ""),
                style = setDefault(_props.style, {}),
                className = setDefault(_props.className, []);
            //设置组件状态
            this.setState({ id, date_type, stat_date, style, className, title, suffix, isReady: true });
        } catch (error) {
            console.log(`updateTime组件渲染出错：${error}`);
        }
    }

    render() {
        const { isReady, stat_date, title, style, className, suffix } = this.state;
        if (!isReady) return null;
        return (
            <div className={classnames('update-time excel-time', `${className ? className : ""}`)} style={{ display: 'inline-block', color: '#8c8c8c', ...style }}>
                {title || i18n.format("数据周期")}：{stat_date} {suffix}
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