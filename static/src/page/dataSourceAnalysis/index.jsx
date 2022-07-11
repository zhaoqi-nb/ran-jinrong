'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Api from './store/api';
import { getAccessState } from '../component/util/template';
import { getPageData } from '../component/page/util';
import RsIcon from '../component/rsIcon/index';
import Logo from '../component/logo'; 
import SourceContent from './sourceContent';
import { i18n } from '@/components/FastIntl';
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
            dataSourceData: {}
        }
    }
    componentDidMount() {
        this.getData();
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }

    getData = async() => {
        let pageInfo = getPageData();
        if(!pageInfo || !pageInfo.resId) return null;

        const res = await Api.queryParentAndSubResDtoTreeOnlyPageAccessInfo({
            type: "dataSource"
        });

        let dataSourceData = {};
        if (res.code == 200 && res.data && res.data.child) {
            dataSourceData = getTargetByResId(res.data.child);
            if (dataSourceData.child && Array.isArray(dataSourceData.child)) {
                dataSourceData.child.map((dataSource, i) => {
                    let resObj = dataSource.resAttr ? JSON.parse(dataSource.resAttr) : {};
                    dataSource.resObj = resObj;
                    dataSource.accessState = getAccessState(dataSource.privilegeDtoList) || {};
                    dataSource.child && Array.isArray(dataSource.child) && dataSource.child.map((item, j) => {
                        let resObj = item.resAttr ? JSON.parse(item.resAttr) : {};
                        item.resObj = resObj;
                        item.accessState = getAccessState(item.privilegeDtoList) || {};
                        item.href = this.getUrl(item);
                    })
                })
            }
            this.setState({ dataSourceData });
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
    getUrl = ( obj) => {
        if (obj.accessState && (obj.accessState.code == 'all' || obj.accessState.code == 'view')) {
            if (obj.resObj && obj.resObj.appName) {
                return `/page/appAnalyze/${obj.resId}`;
            }
            return `/page/dataSource/${obj.resId}`;
        } else {
            return `javascript:void(0);`;
        }
    }

    render() {
        const { dataSourceData } = this.state;
        return (
            <div className="dataSource-analysis-container">
                {
                    dataSourceData && dataSourceData.child && dataSourceData.child.map((dataSource, index) => {
                        return (
                            <div className="dataSource-wrapper">
                                <div className="dataSource-header">
                                    <div className="hearder-left">
                                        <Logo icon={`${dataSource.resObj&&dataSource.resObj.icon}`} />
                                        {/* <RsIcon type={} style={{ ...iconStyle, borderRadius: '8px' }} /> */}
                                        <div style={{ marginLeft: '8px' }}>
                                            <p className="dataSource-title">{i18n.format(dataSource.resName)}</p>
                                            <p className="dataSource-desc">{i18n.format(dataSource.resObj.desc)}</p>
                                        </div>
                                    </div>
                                    {/* <RsIcon type="icon-jiantouyou" style={{ fontSize: '16px' }} /> */}
                                </div>
                                <SourceContent contentList={dataSource.child} />
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;