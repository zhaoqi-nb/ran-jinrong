'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Filter from '../component/filterOption/common/index';
import './index.less';
import { CustomTab, CustomTabPane } from '../component/tab/common';
import IndustryContent from './industryContent';
import Api from './store/api';
import { getAccessState } from '../../page/component/util/template';
import { i18n } from '@/components/FastIntl';
import { FormattedMessage } from '@/components/FastIntl';
import { COMPARELIST } from './config';
import _ from 'lodash';

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
            currSelect: "1",
            tabData: [{ title: i18n.format("消费"), value: "1" }],
            // tabData: [{ title: i18n.format("消费"), value: "1" }, { title: i18n.format("TMT"), value: "2" }],
            data: []
        }
    }
    componentDidMount() {
        this.queryIndustryDtoListByAttr('消费')
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {

    }


    queryIndustryDtoListByAttr = async (industry_label) => {
        const param = {
            resAttr: JSON.stringify({ industry_label }),
        }
        const res = await Api.queryIndustryDtoListByAttr(param);
        let industryList = res.data || [];
        let newIndustryList = [];
        let industryCategory = [];
        if (res.code == 200) {
            // 遍历+去重  构造所有行业分类数组
            industryList.map((item, index) => {
                let resObj = JSON.parse(item.resAttr) || {};
                item.resObj = resObj;
                item.accessState = getAccessState(item.privilegeDtoList) || {};
                item.href = this.getUrl(item, industry_label);
                item.disabled = !_.includes(["all", "view"], _.get(item, 'accessState.code'));

                if (_.get(resObj, "analysis_type") && industryCategory.indexOf(resObj.analysis_type) < 0) {
                    industryCategory.push(resObj.analysis_type);
                    newIndustryList.push({ categoryName: resObj.analysis_type, categoryName_$name: i18n.format(resObj.analysis_type), list: [] })
                }
            });

            // 根据行业分类数组重新构造数据
            industryCategory.map((category, i) => {
                industryList.map((industryObj, j) => {
                    //industryObj['resObj']['analysis_type'] 
                    if (_.get(industryObj, 'resObj.analysis_type') == category) {
                        let index = newIndustryList.findIndex((element) => element.categoryName == category);
                        newIndustryList[index].list.push({
                            ...industryObj,
                            resName_$name: i18n.format(industryObj.resName),
                        });
                    }
                })
            });

            // 标准行业按指定顺序排序
            const targetIndex = _.findIndex(newIndustryList, ({ categoryName: "标准行业" }))
            const orderList = []
            if (targetIndex > -1) {
                COMPARELIST.map((name) => {
                    const targetObj = _.find(newIndustryList[targetIndex].list, (item) => { return item.resName === name });
                    if (targetObj) {
                        orderList.push(targetObj);
                    }
                })
                newIndustryList[targetIndex].list = orderList;
            }

            // 排序：禁用的行业放后面
            newIndustryList = _.chain(newIndustryList)
                .map((obj) => {
                    let list = _.chain(obj.list).reduce((acc, item) => {
                        const [head, last] = acc;
                        if (item.disabled) {
                            last.push(item)
                        } else {
                            head.push(item)
                        }

                        return acc
                    }, [[], []])
                        .flatten()
                        .value()

                    obj.list = list;
                    return obj
                }).value();


            const SORT = ['标准行业', 'TMT行业', '交通运输行业', '特色细分行业']
            newIndustryList.sort((s1, s2) => SORT.indexOf(s1.categoryName_$name) - SORT.indexOf(s2.categoryName_$name))
            this.setState({ data: newIndustryList })
        }
    }
    // getUrl url处理方法
    getUrl = (obj, industry_label) => {
        if (_.includes(['all', 'view'], _.get(obj, 'accessState.code'))) {
            // /page/appAnalyze
            // /page/appAnalyzeIndustry/:industryId/:resId/
            if (industry_label == "TMT") {
                return `/page/appAnalyze/${obj.resId}`
                // return `/page/appAnalyze?resId=${obj.resId}&resName=${obj.resName}&resAttr=${obj.resAttr}`
            }
            return `/page/industry/${obj.resId}`;
        } else {
            return `javascript:void(0);`;
        }
    }

    renderContent = () => {
        const { tabData, data } = this.state;
        if (!tabData || !tabData.length) return;

        return tabData.map((item, index) => {
            return <CustomTabPane>
                {/**引入内容组件 */}
                <div style={{ padding: '0 24px' }}>
                    <IndustryContent data={data} />
                </div>
            </CustomTabPane>
        })
    }

    handleChange = (key) => {
        this.queryIndustryDtoListByAttr(key == 1 ? '消费' : 'TMT')
        console.log('key=>', key);
    }

    render() {
        const { currSelect, tabData } = this.state;
        return (
            <div className="industry-analysis-container">
                <CustomTab hiddenBottomExplain id='行业入口' currSelect={currSelect} onChange={this.handleChange} style={{ width: "100%" }} type={'line'} tabData={tabData}>
                    {this.renderContent()}
                </CustomTab>
            </div>
        );
    }
}

Index.propTypes = {

};

export default Index;