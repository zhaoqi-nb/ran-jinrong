'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RsIcon from '../component/rsIcon/index';
import _ from 'lodash';
import classNames from 'classnames';
import i18n from '@/plugin/i18n';
import './index.less';

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
            colorList: {
                "联系申请": "linear-gradient(270deg, #0697FF 0%, #0678FF 100%)",
                "付费使用": "linear-gradient(270deg, #33C292 0%, #00B277 100%)",
                "敬请期待": "linear-gradient(270deg, #FF6C79 0%, #FF4757 100%)",
                "不能访问": "linear-gradient(270deg, #A4B6CC 0%, #90A5BF 100%)"
            }
        }
    }
    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }

    renderItemContent = (item) => {
        const { colorList } = this.state;
        //const disabled = !_.includes(['all', 'view'], _.get(item, 'accessState.code'))
        const isHidden = _.includes(['noView'], _.get(item, 'accessState.code')) || (!item?.accessState?.code) ? true : false
        let _className = item.disabled ? "content-item disabled" : "content-item box-shadow-add";

        return <a href={item.href} style={{ display: isHidden ? "none" : "" }}>
            <div className={_className}>
                {item.disabled ? <span className="content-flag" style={{ background: `${colorList[item.accessState.name]} ` }}>{i18n.format(item.accessState.name)}</span> : null}
                {item.disabled ? (
                    <React.Fragment>
                        {/* <RsIcon type={`${item.resObj.icon}`} style={{ fontSize: '32px', color: '#8C8C8C' }} /> */}
                        <div className="content-item-title" style={{ color: '#8C8C8C' }}>{i18n.format(item.resName)}</div>
                    </React.Fragment>
                ) : (
                        <React.Fragment>
                            {/* <RsIcon type={`${item.resObj.icon}`} style={{ fontSize: '32px', color: "#333333" }} /> */}
                            <div className="content-item-title">{i18n.format(item.resName)}</div>
                        </React.Fragment>
                    )}
            </div>
        </a >
    }

    renderContent = () => {
        const { contentList } = this.props;
        if (!contentList || !Array.isArray(contentList)) return null
        const hasChild = contentList.find(f => f.child && Array.isArray(f.child))
        // 1. contentList 都没有child
        if (!hasChild) {
            return <div className="board-content">
                {contentList.map((item, index) => {
                    return this.renderItemContent(item)
                })}
            </div>
        }
        // 2. contentList 有child
        else {
            return contentList.map((item, index) => {
                if (item.child && Array.isArray(item.child)) {
                    console.log('看板分类item', item)
                    const { icon } = item.resObj || {}
                    //const disabled = !_.includes(['all', 'view'], _.get(item, 'accessState.code'))
                    const isHidden = _.includes(['noView'], _.get(item, 'accessState.code')) || (!item?.accessState?.code) ? true : false
                    return <div style={{ display: isHidden ? "none" : "" }}>
                        <p className="board-category">
                            {icon ? <RsIcon type={icon} style={{ fontSize: 16, marginRight: 4 }} /> : null}
                            {i18n.format(item.resName)}
                        </p>
                        <div className="board-content">
                            {item.child.map((_item, _index) => {
                                return <div className="board-content">
                                    {this.renderItemContent(_item)}
                                </div>
                            })}
                        </div>
                    </div>
                } else {
                    return <div className="board-content">
                        {this.renderItemContent(item)}
                    </div>
                }
            })
        }
    }

    render() {

        // return (
        //     <div className="board-content">
        //         {this.renderContent()}
        //     </div>
        // );
        return this.renderContent()
    }
}

Index.propTypes = {

};

export default Index;