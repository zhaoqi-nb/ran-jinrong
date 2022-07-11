'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAccessState } from '../../util/template';
import { getSubMenuData } from '../util'
import SecondMenu from '../secondMenu';
import Api from '../store/api';
// kanban
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }
    componentDidMount() {
        this.initData()
    }
    componentWillUnmount() {
        this.setState(this.getInitialState())
    }
    getInitialState = () => {
        return {
            isReady: false,
            boardList: [],
        }
    }
    initData = async () => {
        try {
            let boardData = getSubMenuData();
            let boardList = await this.queryboardData(boardData.resId);
            this.setState({ boardList, isReady: true })

        } catch (error) {
            console.log(error);
        }

    }
    // 递归+遍历定位指定resId的数据
    getTargetByResId(resId, data) {
        if (!data || !data.length) return [];
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let child = item.child;
            if (item.resId == resId) {
                return data;
            } else if (child && child.length) {
                let temp = this.getTargetByResId(resId, child);
                if (temp && temp.length) return temp;
            }
        }
        return null;
    }
    queryboardData = async (resId) => {
        const res = await Api.queryParentAndSubResDtoTreeOnlyPageAccessInfo({
            type: "board"
        });
        let boardList = [];
        if (res.code == 200) {
            let data = this.getTargetByResId(resId, res.data.child);
            // 遍历+去重 所有公司的行业，构造行业筛选器数组
            for (let i = 0, len = data.length; i < len; i++) {
                let item = data[i];
                let accessState = getAccessState(item.privilegeDtoList) || {};
                item.href = `/page/board/${item.resId}`;

                if (accessState.code == 'all') boardList.push(item);
            }
        }
        return boardList;
    }

    render() {
        const {isReady, boardList} = this.state
        const { urlData } = this.props;
        return <SecondMenu type='board' list={boardList} urlData={urlData} />
    }
}

Index.propTypes = {

};

export default Index;