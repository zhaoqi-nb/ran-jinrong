'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gethashcode } from '../../util/hash';
import { setDefault } from '@util';
import { isEmpty } from '../../../../utils/Util';
import { formatZBData } from '../../util/format/number';

import RsIcon from '@/page/component/rsIcon/index';
import Tooltip from '@toolTip'

import './index.less';
import classNames from 'classnames';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        this.initData();
    }

    componentWillReceiveProps(nextProps) {
        const { data, option } = this.props;
        if (JSON.stringify(data) != JSON.stringify(nextProps.data) || JSON.stringify(option) != JSON.stringify(nextProps.option)) {
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
            data: {},
            option: []
        }
    }
    //初始化数据
    initData = (props = this.props) => {
        try {
            let id = setDefault(props.id, "");
            let data = setDefault(props.data, {});
            let option = setDefault(props.option, []);
            this.setState({ id, data, option, isReady: true });
        } catch (error) {
            console.log(`exhibition组件渲染出错：${error}`);
        }
    }
    getRegionHtml = (codes, data) => {
        let html = [];
        for (let i = 0, len = codes.length; i < len; i++) {
            let code = codes[i];
            let obj = data.find(item => item.code == code);
            let value = obj.data;
            html.push(<span className='value'>{formatZBData(obj.operate, value)}</span>)
            if (!i) html.push(<span> ~ </span>)
        }
        return html;
    }
    formatZBTitle = (operate, title) => {
        if (!operate) return title;
        let unit = setDefault(operate.unit);
        //单位
        if (unit) title = `${title}(${unit})`;
        return title
    }
    getContentHtml = (obj) => {
        const { data } = this.state;
        if (isEmpty(obj) || isEmpty(data)) return null;
        const { type, code, style = {}, explain, highlight } = obj;
        let title
        const zbData = data.find(item => item.code == code);
        const value = zbData ? zbData.data : "";
        const ratioValue = zbData ? zbData.ratioData : "";
        title = zbData && zbData.name ? zbData.name : '' //title;
        if (type == 'region') {
            const zbItem = data.find(item => item.code == code[0]);
            title = zbItem.name
        }
        if (obj.title) { title = obj.title }
        if (explain) {
            title = <React.Fragment>
                {title}
                <div style={{ display: 'inline-block', fontSize: '14px', color: '#1890ff' }}>
                    <Tooltip title={explain} placement="bottomLeft" overlayStyle={{ maxWidth: 800 }}>
                        <RsIcon type="icon-shuoming" className="titleIcon" style={highlight ? { color: '#1890ff', verticalAlign: "middle" } : { verticalAlign: "middle" }} />
                    </Tooltip>
                </div>
            </React.Fragment>
        }
        //设置组件状态
        if (type == 'text') {
            return (<div className='exhibition-text'>
                <span className='title'>{title}</span>
                <span className='value' style={style}>{value}</span>
            </div>)
        } else if (type == 'value') {
            return (<div className='exhibition-text'>
                {/* <span className='title'>{title}</span>
                <span className='value'>{formatZBData(zbData.operate, value)}</span> */}
                <span className='title'>{this.formatZBTitle(zbData.operate, title)}</span>
                <span className='value'>{formatZBData(zbData.operate, value, false)}</span>
            </div>)
        } else if (type == 'upValue') {
            let flag = value > 0 ? true : false
            return (<div className='exhibition-upValue'>
                <span className='title'>{title}</span>
                <span className='value'>
                    {
                        value && (flag ?
                            <RsIcon type="icon-shangsheng" style={{ color: '#FF4757', fontSize: 16 }} /> :
                            <RsIcon type="icon-xiajiang" style={{ color: '#46C93A', fontSize: 16 }} />
                        )
                    }
                    {formatZBData(zbData.operate, value)}
                </span>
            </div>)
        } else if (type == 'region') {
            return (<div className='exhibition-text'>
                <span className='title'>{title}</span>
                <span>{this.getRegionHtml(code, data)}</span>
            </div>)
        } else if (type == 'ratioValue') {
            return (<div className='exhibition-text ratio' style={{ flex: 1, ...style }}>
                <span className='title' style={{ margin: 0 }}>
                    <span className="title-text">{i18n.format(zbData.name)}</span>
                    {explain ? <div className="title-explain" style={highlight ? { color: '#1890ff' } : {}}>
                        <Tooltip title={explain} placement="bottomLeft" overlayStyle={{ maxWidth: 800 }}>
                            <RsIcon type="icon-shuoming" className="titleIcon" style={highlight ? { color: '#1890ff', verticalAlign: "middle" } : { verticalAlign: "middle" }} />
                        </Tooltip>
                    </div> : null}
                </span>
                <div className='ratio-content'>
                    <span className='value big-value'>{formatZBData(zbData.operate, value, false)}</span>
                    {ratioValue ?
                        <>
                            <span>{`${i18n.format("同比")}：`}</span>
                            <span className='value' style={ratioValue > 0 ? { color: '#E2492F' } : { color: '#0AAB62' }}>
                                {formatZBData({ format: "percent", bit_number: 0 }, ratioValue, false)}
                            </span>
                        </>
                        : null}
                </div>
            </div>)
        }
    }
    renderContent = () => {
        const { option } = this.state;
        const { style } = this.props
        let html = [];
        for (let i = 0, len = option.length; i < len; i++) {
            let obj = option[i];
            let ele = this.getContentHtml(obj);
            html.push(<div className={classNames('exhibition', {
                highlight: obj.highlight
            })} style={{ display: obj.type === 'ratioValue' ? "flex" : 'inline-block', ...style }}>{ele}</div>);
        }
        return html;
    }
    render() {
        const { isReady } = this.state;
        const { wrapStyle } = this.props
        if (!isReady) return null;
        return (
            <div style={wrapStyle}>
                {this.renderContent()}
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