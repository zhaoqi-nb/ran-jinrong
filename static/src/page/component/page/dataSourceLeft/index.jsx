'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAccessState } from '../../util/template';
import Api from '../store/api';
import SecondMenu from '../secondMenu';
import { getSearchCompanyData, getSearchIndustryData } from '../searchUtil';
import { getDataSourceMenuData } from '../util';
import { cloneDeep } from 'lodash'

// gongshi
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidMount() {
        this.initData();
    }

    componentWillUnmount() {
        this.setState(this.getInitialState())
    }

    getInitialState = () => {
        return {
            isReady: false,
            companysList: [],
        }
    }
    initData = async () => {
        const { urlData, isMicroApp } = this.props;
        try {
            let companysList = []
            // if (isMicroApp) {
            const dataSourceList = getDataSourceMenuData()
            companysList = dataSourceList ? this.getAppMenuList(dataSourceList) : []
            console.log('companysList', companysList)
            // } else {
            //     companysList = await this.queryCompanyData();
            // }
            this.setState({ isReady: true, companysList })
        } catch (error) {
            console.log("初始化出错", error);
        }
    }
    queryCompanyData = async () => {
        const param = {
            resAttr: JSON.stringify({ industry_label: '消费' }),
        }
        // const res = await Api.queryResDtoListByAttr(param);
        // let companysList = [];
        // if (res.code == 200) {
        //     let data = res.data.data;
        //     // 遍历+去重 所有公司的行业，构造行业筛选器数组
        //     for (let i = 0, len = data.length; i < len; i++) {
        //         let item = data[i];
        //         let accessState = getAccessState(item.privilegeDtoList) || {};
        //         item.href = `/page/company/${item.resId}`;
        //         item.resAttrJSON = JSON.parse(item.resAttr)
        //         if (accessState.code == 'all') companysList.push(item);
        //     }
        // }
        return await getSearchCompanyData();
        // return companysList;
    }
    getAppMenuList = (menu) => {
        const { isMicroApp } = this.props
        let appMenu = menu?.child[0]?.child[0]?.child // [0]?.child
        let res = []
        let searchList = []
        console.log('appMenu', appMenu)
        appMenu.map(item => {
            // res.push(item?.child[0]?.child)
            res = res.concat(cloneDeep(item?.child))
        })
        res.map(item => {
            const privilegeDtoList = item.privilegeDtoList
            const noViewItem = privilegeDtoList.find(it => it.property && JSON.parse(it.property).accessState === 'noView')
            if (!noViewItem) {
                const localHrefArr = window.location.href.split('/')
                const rootResId = localHrefArr[localHrefArr.length - 3]
                const resAttr = item.resAttr ? JSON.parse(item.resAttr) : {}
                const type = resAttr?.appName === 'app' ? 'appAnalyze' : 'dataSource'
                const newItem = {
                    ...item,
                    href: `/page/${type}/${item.resId}`
                }
                if (rootResId == item.resId) {
                    searchList.unshift(newItem)
                } else {
                    searchList.push(newItem)
                }
            }
        })
        return searchList
    }

    render() {
        const { isReady, companysList } = this.state;
        const { urlData, isMicroApp } = this.props;

        if (!isReady) return null;
        return <SecondMenu type={isMicroApp ? 'appAnalyze' : 'dataSource'} list={companysList} urlData={urlData} />
    }
}

Index.propTypes = {
    urlData: PropTypes.object
};

export default Index;