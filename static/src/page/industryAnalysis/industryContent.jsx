'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RsIcon from '../component/rsIcon/index';
import _ from 'lodash';
import classNames from 'classnames';
import { COMPANY } from './config';
import { i18n } from '@/components/FastIntl';
import './index.less';
const iconStyle = {
    fontSize: '32px'
}
const guanzhuStyle = {
    fontSize: '16px',
    color: '#FFBA00'
}

const NOCOMPANYLIST = ['特色细分行业', 'TMT行业']

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();

    }

    getInitialState = () => {
        return {
            //组件是否准备就绪
            isReady: false,
            //内容
            currSelect: "1",
            colorList: {
                "联系申请": "linear-gradient(270deg, #0697FF 0%, #0678FF 100%)",
                "付费使用": "linear-gradient(270deg, #33C292 0%, #00B277 100%)",
                "敬请期待": "linear-gradient(270deg, #FF6C79 0%, #FF4757 100%)",
                "不能访问": "linear-gradient(270deg, #A4B6CC 0%, #90A5BF 100%)"
            },
            tabData: [{ title: "消费", value: "1" }, { title: "TMT", value: "2" }],
        }
    }
    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }

    renderContent = (category) => {
        const { colorList } = this.state;

        return category.list.map((item, index) => {
            if (!item) return null;
            //const disabled = !_.includes(['all', 'view'], _.get(item, 'accessState.code'))
            const isHidden = _.includes(['noView'], _.get(item, 'accessState.code')) || (!item?.accessState?.code) ? true : false
            let _className = item.disabled ? "content-item disabled " : "content-item box-shadow-add";
            if (!item) return null;
            return <a href={item?.href} target={item && item.href && item.href != 'javascript:void(0);' ? "_blank" : "_self"} style={{ display: isHidden ? "none" : "" }}>
                <div className={classNames(_className)} >
                    {item.disabled ? <span className="content-flag" style={{ background: `${colorList[item.accessState.name]}` }}>{i18n.format(item.accessState.name)}</span> : null}
                    {item.disabled ? (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <RsIcon type={`${item.resObj && item.resObj.icon}`} style={{ ...iconStyle, marginRight: '12px', color: '#8c8c8c' }} />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className="item-name" style={{ color: '#8C8C8C' }}>{item.resName_$name}</div>
                                {NOCOMPANYLIST.indexOf(category.categoryName) === -1 && <div className="item-info">
                                    <span class="company" style={{ color: '#8C8C8C' }}>{COMPANY()}</span><span className="num" style={{ color: '#8C8C8C' }}>{item.companyNum || 0}</span>
                                    {item.attendFlag && (<React.Fragment><span className="vertical-divider" style={{ color: '#E5E5E5' }}></span><RsIcon type="icon-guanzhu" style={guanzhuStyle} /></React.Fragment>)}
                                </div>}
                            </div>
                        </div>
                    ) : (
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <RsIcon type={`${item.resObj && item.resObj.icon}`} style={{ ...iconStyle, marginRight: '12px', color: '#333333' }} />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div className="item-name">{item.resName_$name}</div>
                                    {NOCOMPANYLIST.indexOf(category.categoryName) === -1 && <div className="item-info">
                                        <span class="company">{COMPANY()}</span><span className="num">{item.companyNum || 0}</span>
                                        {item.attendFlag && (<React.Fragment><span className="vertical-divider"></span><RsIcon type="icon-guanzhu" style={guanzhuStyle} /></React.Fragment>)}
                                    </div>}
                                </div>
                            </div>
                        )}
                </div>
            </a>
        })
    }

    render() {
        const { data } = this.props;
        return (
            <div className="industry-content-wrapper">
                <div className="content">

                    {data.map((category, index) => {
                        return <div className="industry-category">
                            <p className="category-name">{category.categoryName_$name}</p>
                            <div className="category-content">
                                {this.renderContent(category)}
                            </div>
                        </div>

                    })}
                </div>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;