'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAccessState } from '../../util/template';
import Api from '../store/api';
import SecondMenu from '../secondMenu';
import { getSearchCompanyData, getSearchIndustryData } from '../searchUtil';

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

    // componentDidUpdate() {
    //     let eventObj = document.createEvent("HTMLEvents")
    //     eventObj.initEvent("resize", true, true);
    //     window.dispatchEvent(eventObj);
    // }

    getInitialState = () => {
        return {
            isReady: false,
            companysList: [],
        }
    }
    initData = async () => {
        try {
            let companysList = await this.queryCompanyData();
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
        const companyData = await getSearchCompanyData();
        return companyData?.filter(f => !f.searchValue);
        // return companysList;
    }

    render() {
        const { isReady, companysList } = this.state;
        const { urlData } = this.props;
        // if (!isReady) return null;
        return <SecondMenu type='company' list={companysList} urlData={urlData} />
    }
}

Index.propTypes = {
    urlData: PropTypes.object
};

export default Index;