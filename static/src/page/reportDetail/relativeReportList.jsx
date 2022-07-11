'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { i18n } from '@/components/FastIntl';
import { List } from 'antd';
import Api from './store/api';
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
        }
    }
    componentDidMount() {


    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }



    //点击去详情
    goToDetail = (item) => {
        window.open(`/page/reportDetail?reportId=${item.report_id}`);
    }

    render() {

        const { data, isReady } = this.props;
        if (!isReady) return null;

        return (
            <div className="relative-report-list" style={{ width: '100%' }}>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    header={i18n.format('相关报告')}
                    renderItem={item => (
                        <List.Item key={item.report_id}>
                            <List.Item.Meta
                                avatar={<img onClick={() => {this.goToDetail(item)}} className="report-item-avatar" src={item.report_pic} />}
                                title={<div onClick={() => {this.goToDetail(item)}} className="report-item-title">{item.report_title}</div>}
                                description={<div>{`${item?.open_date?.substring(0,4)}-${item?.open_date?.substring(4,6)}-${item?.open_date?.substring(6,8)}`}</div>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;