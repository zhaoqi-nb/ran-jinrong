'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAccessState } from '../../util/template';
import SecondMenu from '../secondMenu';
import Api from '../store/api';
import { COMPARELIST } from '../../../industryAnalysis/config';

// hangye
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
            industryList: [],
        }
    }
    initData = async() => {
        try {
            let industryList = await this.queryIndustryData();
            let listMap = [];
            let noList = [];
            industryList.forEach(item => {
                if (item?.resObj?.analysis_type === '标准行业') {
                    listMap[item.resName] = item;
                } else {
                    noList.push(item);
                }
            })

            let list = [];
            COMPARELIST.forEach(item => {
                list.push(listMap[item]);
            })
          
            this.setState({ industryList: [...list, ...noList], isReady: true})

        } catch (error) {
            console.log(error);
        }
        
    }
    queryIndustryData = async() => {
        const param = {
            resAttr: JSON.stringify({ industry_label: '消费' }),
        }
        const res = await Api.queryIndustryDtoListByAttr(param);
        let industryList = [];
        if(res.code == 200) {
            let data = res.data || [];
             // 遍历+去重 所有公司的行业，构造行业筛选器数组
             for(let i=0,len=data.length;i<len;i++){
                let item        = data[i];
                item.resObj =  JSON.parse(item.resAttr) || {};
                let accessState = getAccessState(item.privilegeDtoList) || {};
                    item.href   = `/page/industry/${item.resId}`;
                    item.globalPageDisplayName = `${i18n.format(item.resName)}`;
                if(accessState.code == 'all') industryList.push(item);
            }
        }
        return industryList;
    }
    render() {
        const {isReady, industryList} = this.state
        const { urlData } = this.props;
        // if(!isReady) return null
        return <SecondMenu type='industry' list={industryList} urlData={urlData} />
    }
}

Index.propTypes = {

};

export default Index;