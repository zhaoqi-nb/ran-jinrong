'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Api from './store/api';
import { getAccessState } from '../component/util/template';
import { getPageData } from '../component/page/util';
import RsIcon from '../component/rsIcon/index';
import Logo from '../component/logo';
import i18n from '@/plugin/i18n';
import BoardContent from './boardContent';
import _ from 'lodash';

import './index.less';

const iconStyle = {
    fontSize: '40px',
    background: 'linear-gradient(270deg, #0697FF 0%, #0678FF 100%)',
    color: '#fff',
    boxShadow: '0px 2px 4px 0px rgba(6, 120, 255, 0.16)'
}

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
            boardData: {}
        }
    }
    componentDidMount() {
        this.getData();
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this.setState(this.getInitialState());
    }

    getData = async () => {
        let pageInfo = getPageData();
        if (!pageInfo || !pageInfo.resId) return null;

        const res = await Api.queryParentAndSubResDtoTreeOnlyPageAccessInfo({
            type: "board"
        });

        let boardData = {};
        if (res.code == 200 && res.data && res.data.child) {
            boardData = getTargetByResId(res.data.child);//res.data.child.child.child;
            boardData.child.map((board, i) => {
                let resObj = board.resAttr ? JSON.parse(board.resAttr) : {};
                board.resObj = resObj;
                board.accessState = getAccessState(board.privilegeDtoList) || {};
                board.disabled = !_.includes(["all", "view"], _.get(board, 'accessState.code'));

                let isAppSM = false
                board.child.map((item, j) => {
                    let resObj = item.resAttr ? JSON.parse(item.resAttr) : {};
                    item.resObj = resObj;
                    item.accessState = getAccessState(item.privilegeDtoList) || {};
                    item.disabled = !_.includes(["all", "view"], _.get(item, 'accessState.code'));
                    if (item.resName.indexOf('618') > -1) isAppSM = true
                    item.href = this.getUrl(board.resId, item, isAppSM);
                    if (item.child) {
                        item.child.map(it => {
                            let resObj = it.resAttr ? JSON.parse(it.resAttr) : {};
                            it.resObj = resObj;
                            it.accessState = getAccessState(it.privilegeDtoList) || {};
                            it.disabled = !_.includes(["all", "view"], _.get(it, 'accessState.code'));
                            it.href = this.getUrl(board.resId, it, isAppSM);
                        })
                    }
                })

            });

            // 排序：禁用的放后面
            boardData.child = _.chain(boardData.child)
                .map((obj) => {
                    let childList = _.chain(obj.child).reduce((acc, item) => {
                        const [head, last] = acc;

                        if (item.disabled) {
                            last.push(item)
                        } else {
                            head.push(item)
                        }

                        return acc;
                    }, [[], []])
                        .flatten()
                        .value()

                    obj.child = childList;

                    return obj;
                }).value()

            console.log('boardData', boardData)
            this.setState({ boardData })
        }

        // 递归+遍历定位指定resId的数据
        function getTargetByResId(data) {
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                if (item.resId == pageInfo.resId) {
                    return item
                } else {
                    if (i >= data.length - 1) {
                        return getTargetByResId(item.child);
                    }
                }
            }
        }
    }

    // getUrl url处理方法
    getUrl = (parentId, obj, isAppSM) => {
        if (isAppSM && !obj.disabled) {
            return `/page/appSM/${parentId}/${obj.resId}/${obj.resObj.path}`;
        } else if (!obj.disabled) {
            return `/page/board/${parentId}/${obj.resId}/${obj.resObj.path}`;
        } else {
            return `javascript:void(0);`;
        }
    }
    render() {
        const { boardData } = this.state;
        return (
            <div className="board-container">
                {boardData && boardData.child && boardData.child.map((board, index) => {
                    return (
                        <div className="board-wrapper">
                            <div className="board-header">
                                <div className="hearder-left">
                                    <Logo icon={`${board.resObj && board.resObj.icon}`} />
                                    <div style={{ marginLeft: '8px' }}>
                                        <p className="board-title">{i18n.format(board.resName)}</p>
                                        <p className="board-desc">{i18n.format(board.resObj.desc)}</p>
                                    </div>
                                </div>
                                {/* <RsIcon type="icon-jiantouyou" style={{ fontSize: '16px' }} /> */}
                            </div>
                            <BoardContent contentList={board.child} />
                        </div>
                    )
                })}
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;