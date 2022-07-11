'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Api from './store/api';
import { getAccessState } from '../component/util/template';
import { getPageData } from '../component/page/util';
import RsIcon from '../component/rsIcon/index';
import Logo from '../component/logo'; 
import BrandContent from './brandContent';
import i18n from '@/plugin/i18n'
import _ from 'lodash';
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
            brandData: {}
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
            type: "brand"
        });

        let brandData = {};
        if (res.code == 200 && res.data && res.data.child) {
            brandData = getTargetByResId(res.data.child);
            if (brandData.child && Array.isArray(brandData.child)) {
                brandData.child.map((brand, i) => {
                    let resObj = brand.resAttr ? JSON.parse(brand.resAttr) : {};
                    brand.resObj = resObj;
                    brand.accessState = getAccessState(brand.privilegeDtoList) || {};
                    brand.disabled = !_.includes(['all', 'view'], _.get(brand, 'accessState.code'))
                    
                    brand.child && Array.isArray(brand.child) && brand.child.map((item, j) => {
                        let resObj = item.resAttr ? JSON.parse(item.resAttr) : {};
                        item.resObj = resObj;
                        item.accessState = getAccessState(item.privilegeDtoList) || {};
                        item.disabled = !_.includes(['all', 'view'], _.get(item, 'accessState.code'))
                        item.href = this.getUrl(item);
                    })
                })
            }

            // 排序： 禁用的放到后面
            brandData.child = _.chain(brandData.child)
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

            this.setState({ brandData });
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
        if (!obj.disabled) {
            return `/page/brand/${obj.resId}`;
        } else {
            return `javascript:void(0);`;
        }
    }

    render() {
        const { brandData } = this.state;
        return (
            <div className="brand-analysis-container">
                {
                    brandData && brandData.child && brandData.child.map((brand, index) => {
                        return (
                            <div className="brand-wrapper">
                                <div className="brand-header">
                                    <div className="hearder-left">
                                        <Logo icon={`${_.get(brand, "resObj.icon")}`} />
                                        {/* <RsIcon type={} style={{ ...iconStyle, borderRadius: '8px' }} /> */}
                                        <div style={{ marginLeft: '8px' }}>
                                            <p className="brand-title">{i18n.format(brand.resName)}</p>
                                            <p className="brand-desc">{i18n.format(_.get(brand, "resObj.desc"))}</p>
                                        </div>
                                    </div>
                                    {/* <RsIcon type="icon-jiantouyou" style={{ fontSize: '16px' }} /> */}
                                </div>
                                <BrandContent contentList={brand.child} />
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