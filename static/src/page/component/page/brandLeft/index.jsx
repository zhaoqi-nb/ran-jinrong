'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Layout, Menu, Input} from 'antd'
import { getAccessState } from '../../util/template';
import SecondMenu from '../secondMenu';
import { getSubMenuData } from '../util'
import { i18n } from '@/components/FastIntl';
import Api from '../store/api';


const { Header, Sider, Content } = Layout;
// pinpai
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }
 
    componentDidMount() {
        this.initData()
    }

    componentWillReceiveProps(nextProps) {

    }
 
    componentWillUnmount() {
        this.setState(this.getInitialState())
    }
    getInitialState = () =>{
        return {
            isReady     : false,
            collapsed   : false,
            leftMenu    : {},
            pageInfo    : {},
            brandData: {},
            inputValue  : null,
            visible     : false,
            //全部行业
            brandList: [],
            //下拉显示
            selectOption: []
        }
    }
    initData = async() => {
        try {
            let brandData = getSubMenuData();
            let brandList    = await this.querybrandData(brandData.resId);
            // TODO 线上消费品牌分析。先写死，后期要搞成通用的
            brandData.displayResName = i18n.format('线上消费品牌分析');
            let resAttr = brandData.resAttr ? JSON.parse(brandData.resAttr) : {};

            brandData.resAttr = JSON.stringify({...resAttr, "icon":"icon-xianshangxiaofeipinpaifenxi"})

            this.setState({ brandList, isReady: true})

        } catch (error) {
            console.log(error);
        }
        
    }
    // 递归+遍历定位指定resId的数据
    getTargetByResId(resId, data) {
        if(!data || !data.length) return [];
        for (let i = 0; i < data.length; i++) {
            let item   = data[i];
            let child = item.child;
            if (item.resId == resId) {
                return data;
            } else if(child && child.length){
                let temp = this.getTargetByResId(resId, child);
                if(temp && temp.length) return temp;
            }
        }
        return null;
    }
    querybrandData = async(resId) => {
        const res = await Api.queryParentAndSubResDtoTreeOnlyPageAccessInfo({
            type: "brand"
        });
        let brandList = [];
        if(res.code == 200) {
            let data = this.getTargetByResId(resId, res.data.child);
             // 遍历+去重 所有公司的行业，构造行业筛选器数组
             for(let i=0,len=data.length;i<len;i++){
                let item        = data[i];
                let accessState = getAccessState(item.privilegeDtoList) || {};
                    item.href   = `/page/brand/${item.resId}`;

                if(accessState.code == 'all') brandList.push(item);
            }
        }
        return brandList;
    }

    render() {
        const {isReady, brandList} = this.state;
        console.log('brandList->', brandList);
        const { urlData } = this.props;
        // if(!isReady) return null
        return <SecondMenu type='brand' list={brandList} urlData={urlData} />
    }
}

Index.propTypes = {

};

export default Index;