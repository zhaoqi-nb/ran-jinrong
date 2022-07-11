'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CustomTab, CustomTabPane } from '../component/tab/common';
import CompanyContent from './companyContent';
import Filter from '../component/filterOption/common/index';
import './index.less';
import Api from './store/api';
import { getAccessState } from '../../page/component/util/template';
import Card from '@/components/Card'
// import { cloneDeep } from 'lodash';
import { i18n } from '@/components/FastIntl';
import _ from 'lodash'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        return {
            //组件是否准备就绪
            isReady           : false,
            //内容
            currSelect        : "1",
            tabData           : [{ title: i18n.format("消费"), value: "1" }, { title: "TMT", value: "2", disabled : true }],
            industryFilterList: [],
            locationFilterList: [{ name : i18n.format("全部"), code : i18n.format("全部") }, { name: i18n.format("A股"), code  : i18n.format("A股") }, { name: i18n.format("港股"), code : i18n.format("港股") }, { name: i18n.format("海外"), code: i18n.format("海外") }],
            companyFilterList : [{ name : i18n.format("全部"), code : i18n.format("全部") }, { name: i18n.format("关注"), code  : i18n.format("关注") }, { name: i18n.format("未关注"), code: i18n.format("未关注") }],
            allData           : [],
            data              : [],
            filterSelectedObj: {}
        }
    }

    componentDidMount() {
        this.queryResDtoListByAttr("消费");

    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }

    queryResDtoListByAttr = async (industry_label) => {
        const param = {
            resAttr: JSON.stringify({ industry_label }),
        }
        const res = await Api.queryResDtoListByAttr(param);
        let companys = res.data.data;
        let industryList = [];
        let industryArr = [i18n.format('全部')];
        let compareArr = [i18n.format('全部'),i18n.format('纺织服装'),i18n.format('食品饮料'),'家用电器','3C数码','轻工制造','家具家装','医药保健','美妆个护','其他行业'];

        const filterSelectedObj = {
            industry: '全部',
            location: '全部',
            company: '全部'
        }
        if (res.code == 200) {
            // 遍历+去重 所有公司的行业，构造行业筛选器数组
            companys.map((item, index) => {
                let resObj = JSON.parse(item.resAttr) || {};
                item.resObj = resObj;
                item.accessState = getAccessState(item.privilegeDtoList) || {};
                item.href = this.getUrl(item);
                if (resObj && resObj.industry && industryArr.indexOf(resObj.industry) < 0) {
                    //industryList.push({ code: resObj.industry, name: resObj.industry });
                    industryArr.push(resObj.industry)
                }
            });
            // 根据指定的行业数组顺序排序
            compareArr.map((element, index) => {
                if(industryArr.indexOf(element) !== -1) {
                    industryList.push({code: element, name: element});
                }
            });
            // 处理数据：未开通的移动到数组末尾
            let newCompanys = []; 
            companys.map((obj, index) => {
                if((obj.accessState && (obj.accessState.code == 'all' || obj.accessState.code == 'view'))){
                    let obj_haveAccess = obj;
                    newCompanys.push(obj_haveAccess);
                }
            });
            companys.map((obj, index) => {
                if(!(obj.accessState && (obj.accessState.code == 'all' || obj.accessState.code == 'view'))){
                    let obj_noAccess = obj;
                    newCompanys.push(obj_noAccess);
                }
            })
            this.setState({ data: newCompanys, allData: newCompanys, filterSelectedObj, isReady: true, industryFilterList: industryList });
        }
    }

    // getUrl url处理方法
    getUrl = (obj) => {
        if (obj.accessState && (obj.accessState.code == 'all' || obj.accessState.code == 'view')) {
            return `/page/company/${obj.resId}`;
        } else {
            return `javascript:void(0);`;
        }
    }
    handleOnChange = (type, code) => {
        console.log('筛选器返回', type, code);
        this.setState({ isReady: false });
        const { allData, filterSelectedObj } = this.state;
        let filterData = [];
        let tempObj = {
            ...filterSelectedObj,
            [type]: code
        }

        allData.map((item, index) => {
            if (item.resObj && (tempObj['industry'] == '全部' ? true : item.resObj['industry'] === tempObj['industry']) && (tempObj['location'] == '全部' ? true : item.resObj['location'] === tempObj['location']) && (tempObj['attention'] == '全部' ? true : tempObj['attention'] == "关注" ? item['attendFlag'] == 1 : Number(item['attendFlag']) == 0)) {
                filterData.push(item);
            }
        });
        this.setState({ data: filterData, filterSelectedObj: tempObj, isReady: true });
    }

    getCurrSelect = (currSelect) => {
        console.log("当前tab", currSelect)
        this.setState({ currSelect })
        if(currSelect == 2) {
            this.queryResDtoListByAttr("TMT")
        } else {
            this.queryResDtoListByAttr("消费")
        }
    }

    renderContent = () => {
        const { tabData, data, isReady, currSelect, filterSelectedObj, industryFilterList, locationFilterList, companyFilterList } = this.state;
        if (!tabData || !tabData.length) return;

        return tabData.map((item, index) => {
            return <CustomTabPane>
                <div style={{ padding: '0 24px', background: '#F5F7FA' }}>
                    <div className="filter-wrapper">
                        <div style={{ marginTop: "10px", display: "flex", height: '24px', flexDirection: "row", alignItems: 'center' }}>
                            <span className='f-title' style={{ minWidth: "48px" }}>行业</span>
                            <Filter
                                style={{ display: "inline-block" }}
                                data={industryFilterList}
                                selectId={filterSelectedObj.industry}
                                onSelect={(selectItem) => this.handleOnChange('industry', selectItem.code)}
                            />
                        </div>
                        <div className="filter-container2">
                            <div style={{ marginTop: "10px", display: "flex", height: '24px', flexDirection: "row", alignItems: 'center' }}>
                                <span className='f-title' style={{ minWidth: "48px" }}>上市地点</span>
                                <Filter
                                    style={{ display: "inline-block" }}
                                    data={locationFilterList}
                                    selectId={filterSelectedObj.location}
                                    onSelect={(selectItem) => this.handleOnChange('location', selectItem.code)}
                                />
                            </div>
                            <div style={{ marginTop: "10px", display: "flex", height: '24px', flexDirection: "row", alignItems: 'center' }}>
                                <span className='f-title' style={{ minWidth: "70px" }}>公司标签</span>
                                <Filter
                                    style={{ display: "inline-block" }}
                                    data={companyFilterList}
                                    selectId={filterSelectedObj.company}
                                    onSelect={(selectItem) => this.handleOnChange('attention', selectItem.code)}
                                />
                            </div>

                        </div>
                    </div>
                    {/**引入内容组件 */}
                    <Card>
                        {
                            _.map(data, item => {
                                const disabled = !_.includes(['all', 'view'], _.get(item.accessState, 'code'))//item.accessState.code == 'all' || item.accessState.code == 'view'
                                return (
                                    <Card.Item 
                                        disabled={disabled}
                                        name={item.resName} 
                                        desc={_.compact(
                                            [_.get(item.resObj, 'stock_code'), _.get(item.resObj, 'industry')].join(' | ')
                                        )}
                                        onClick={() => {
                                            this.props.history.push(`/page/company/${item.resId}`)
                                        }}
                                        {...(disabled ? {tagType: _.get(item, 'accessState.name'), tagName: _.get(item, 'accessState.name')} : {})}
                                    ></Card.Item>
                                )
                            })
                        }
                    </Card>
                    {/* <CompanyContent data={data} isReady={isReady} /> */}
                </div>
            </CustomTabPane>
        })
    }

    render() {
        const { currSelect, tabData } = this.state;
        return (
            <div className="company-analysis-container">
                <CustomTab id='公司入口' currSelect={currSelect} style={{ width: "100%" }} tabData={tabData} getCurrSelect={this.getCurrSelect}>
                    {this.renderContent()}
                </CustomTab>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;