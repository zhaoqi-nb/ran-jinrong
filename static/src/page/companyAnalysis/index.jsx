'use strict';
import React, { useCallback, useState, useEffect } from 'react';
import _ from 'lodash'
import { useObservable } from 'rxjs-hooks'
import { of } from 'rxjs'
import { switchMap, map, tap, catchError } from 'rxjs/operators'
import { CustomTab, CustomTabPane } from '../component/tab/common';
import Filter from '../component/filterOption/common/index';
import Api from './store/api';
import Card from '@/components/Card'
import ScrollView from '../../components/ScrollView';
import { FormattedMessage } from '@/components/FastIntl';
import i18n from '@/plugin/i18n'
import './index.less';
import classNames from 'classnames';
import RsIcon from '../component/rsIcon/index';
import Img from '@/components/Img'
import { setCompany } from '../../utils/guideData';
import BottomExplain from '../component/page/bottomExplain'

const locale = i18n.getLocalLanguage();

import { addressFilterList, companyFollowList } from './config'

const CompanyAnalysis = React.memo((props) => {
    const [searchData, setSearchData] = useState({ industry: i18n.format('全部'), follow: i18n.format('全部'), address: i18n.format('全部') })
    const [tabActive, setTabActive] = useState('消费');
    const [loading, setLoading] = useState(false)
    const [_className, setClassName] = useState(locale == 'zh_CN' ? "company-analysis-filter-warp" : "company-analysis-filter-warp company-analysis-filter-warp-block")
    const [_classNameItem, setClassNameItem] = useState(locale == 'zh_CN' ? "company-analysis-filter-item" : "company-analysis-filter-item company-analysis-filter-item-block")

    const { tabData, dataList, industrys, features } = useObservable((state$, inputs$) => {
        return inputs$.pipe(
            switchMap(([industry_label]) => {
                setSearchData({ industry: i18n.format('全部'), follow: i18n.format('全部'), address: i18n.format('全部'), featureModule: i18n.format('不限') })
                setLoading(true)
                const result = Api.queryResDtoListByAttr2({
                    resAttr: JSON.stringify({ industry_label }),
                });
                console.log('rrr=>', result);
                return result;
            }),
            tap(() => {
                setCompany();
                setLoading(false)
            }),
            catchError((error) => {
                console.log("=========" + error)
                setLoading(false)
                return of({ tabData: [], dataList: [], industrys: [], features: [] })
            })
        )
    }, { tabData: [], dataList: [], industrys: [], features: [] }, [tabActive])

    const datasource = useObservable((state$, inputs$) => {
        return inputs$.pipe(
            map(([dataList, searchData]) => {

                const flag = _.every(_.values(searchData), item => item === i18n.format('全部'))
                console.log('flag', flag, searchData, dataList)
                if (flag) return dataList;

                const keyMap = {
                    industry: (item, value) => {
                        if (value.indexOf(",") > -1) {
                            // 多选模式
                            const multipleFilter = value.split(",");
                            if (multipleFilter.indexOf(_.get(item, 'resObj.industry')) > -1) {
                                return true
                            } else {
                                return false
                            }
                        } else {
                            // 单选
                            return _.get(item, 'resObj.industry') === value
                        }
                    },
                    address: (item, value) => {
                        if (value.indexOf(",") > -1) {
                            // 多选模式
                            const multipleFilter = value.split(",");
                            if (multipleFilter.indexOf(_.get(item, 'resObj.location')) > -1) {
                                return true
                            } else {
                                return false
                            }
                        } else {
                            // 单选
                            return _.get(item, 'resObj.location') === value
                        }
                    },
                    follow: (item, value) => (item.attendFlag || 0) == Number(value),
                    featureModule: (item, value) => {
                        if (value.indexOf(",") > -1) {
                            // 多选
                            const multipleFilter = value.split(",");
                            const featureModuleArr = item.resObj.featureModule.split(",");
                            // console.log("多选标签数组","multipleFilter=",multipleFilter,"featureModuleArr=",featureModuleArr,"value= ",value,"item=",item);
                            const result = _.intersection(multipleFilter, featureModuleArr)
                            if (result.length) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            // 单选
                            if (item?.resObj?.featureModule.split(",").indexOf(value) > -1) {
                                return true
                            } else {
                                return false
                            }
                        }
                    }
                }

                const filterList = _.chain(searchData)
                    .pickBy(value => value !== i18n.format('全部') && value !== i18n.format('不限'))
                    .toPairs()
                    .value()

                return _.filter(dataList, item => {
                    return _.every(filterList, ([key, value]) => {
                        const keyOrFunc = keyMap[key]

                        return _.isFunction(keyOrFunc)
                            ? keyOrFunc(item, value)
                            : _.get(item, keyOrFunc) === value
                    })
                })
            })
        )
    }, [], [dataList, searchData])

    const handleChange = useCallback((key) => (selectItem) => {
        setSearchData(state => {
            return { ...state, [key]: selectItem.code }
        })
    }, [])
    console.log('industrys=>', industrys);
    console.log('datasource', _.filter(datasource, t => t.resName === '叮咚买菜'))

    const showTotal = _.chain(datasource).filter(item => {
        const isHidden = _.includes(['noView'], _.get(item, 'accessState.code')) || (!item?.accessState?.code) ? true : false;
        return !isHidden
    }).value().length;

    return (
        <div className='company-analysis'>
            <div className="company-analysis-head">
                <div style={{ height: 40, overflow: 'hidden', marginTop:12, marginLeft: 20 }}>
                    {/* <Guide.Item guideStep='3' guideTip='消费' element={document.querySelectorAll(".company-analysis-head .ant-tabs-tab")[0]} />
                    <Guide.Item guideStep='4' guideTip='TMT' element={document.querySelectorAll(".company-analysis-head .ant-tabs-tab")[1]} /> */}
                    <CustomTab
                        id='公司入口'
                        tabData={tabData}
                        currSelect={tabActive}
                        style={{ width: "100%" }}
                        type="button"
                        getCurrSelect={setTabActive}
                    >
                        <CustomTabPane></CustomTabPane>
                        <CustomTabPane></CustomTabPane>
                    </CustomTab>
                </div>
                <div className="company-analysis-filter">
                    <div className={classNames(_className)}>
                        <div className={classNames(_classNameItem)}>
                            <span className="company-analysis-filter-label" style={{ marginRight: '8px' }}>
                                <FormattedMessage id="行业" />
                            </span>
                            <Filter
                                type="multiple"
                                style={{ display: "inline-block" }}
                                data={industrys}
                                selectId={searchData.industry}
                                isMutualExcluion={true}
                                onSelect={handleChange('industry')}
                            />
                        </div>
                    </div>

                    <div className={classNames(_className)}>
                        <div className={classNames(_classNameItem)}>
                            <span className="company-analysis-filter-label">
                                <FormattedMessage id="上市地点" />
                            </span>
                            <Filter
                                type="multiple"
                                style={{ display: "inline-block" }}
                                data={addressFilterList()}
                                selectId={searchData.address}
                                isMutualExcluion={true}
                                onSelect={handleChange('address')}
                            />
                        </div>

                        {/* <div className="company-analysis-filter-warp"> */}
                        <div className={classNames(_classNameItem)} style={{ marginLeft: '30px' }}>
                            <span className="company-analysis-filter-label" >
                                <FormattedMessage id="公司标签" />
                            </span>
                            <Filter
                                style={{ display: "inline-block" }}
                                // type="multiple"
                                data={companyFollowList()}
                                selectId={searchData.follow}
                                // isMutualExcluion={true}
                                onSelect={handleChange('follow')}
                            />
                        </div>
                        {/* </div> */}
                        {tabActive == "消费" && features.length > 0 ? (
                            // <div className="company-analysis-filter-warp">
                            <div className={classNames(_classNameItem)} style={{ marginLeft: '36px' }}>
                                <span className="company-analysis-filter-label" >{i18n.format("特色模块")}</span>
                                <Filter
                                    type="multiple"
                                    style={{ display: "inline-block" }}
                                    data={features}
                                    selectId={searchData.featureModule}
                                    onSelect={handleChange('featureModule')}
                                />
                            </div>
                            // </div>
                        ) : null}
                    </div>

                </div>
            </div>
            <div className="company-analysis-body">
                <div className="company-num">
                    <FormattedMessage id="共{total}个公司" total={showTotal || 0} />
                </div>
                <ScrollView>
                    <div style={{ minHeight: 'calc(100% - 32px)' }}>
                        <Card>

                            {
                                _.map(datasource, (item, index) => {
                                    const disabled = !_.includes(['all', 'view'], _.get(item, 'accessState.code'))//item.accessState.code == 'all' || item.accessState.code == 'view'
                                    const isHidden = _.includes(['noView'], _.get(item, 'accessState.code')) || (!item?.accessState?.code) ? true : false;
                                    return (
                                        <Card.Item
                                            key={item.resId}
                                            icon={<Img src={item.img} />}
                                            disabled={disabled}
                                            name={item.resName}
                                            desc={_.compact(
                                                [_.get(item.resObj, 'stock_code'), <Card.Split key="1"></Card.Split>, _.get(item.resObj, 'industry')]
                                            )}
                                            attendFlag={item.attendFlag}
                                            onClick={() => {
                                                window.open(`/page/company/${item.resId}`)
                                                //props.history.push(`/page/company/${item.resId}`)
                                            }}
                                            isHidden={isHidden}
                                            {...(disabled
                                                ? { tagType: _.get(item, 'accessState.name'), tagName: i18n.format(_.get(item, 'accessState.name')) }
                                                : item.newTag
                                                    ? { tagType: _.get(item, 'newTag.tagType'), tagName: i18n.format(_.get(item, 'newTag.tagName')) }
                                                    : {})
                                            }
                                        ></Card.Item>
                                    )
                                })
                            }

                        </Card>
                    </div>
                    <BottomExplain />
                </ScrollView>
            </div>
        </div>
    )
})

export default CompanyAnalysis;