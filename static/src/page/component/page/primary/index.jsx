'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getAccessState } from '../../util/template';
import { GetQueryString, GetDecodeURIComponent } from '@util';
import Api from '../secondMenu/store/api';
import SecondMenu from '../secondMenu';
import { unitTransformation, transTableDateType } from '../../util/format/number';

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
            boardList: [],
            urlParams: {}
        }
    }
    initData = async () => {
        try {

            let type = GetQueryString("type"),
                pageType = GetQueryString("pageType"),
                type_name = GetDecodeURIComponent(GetQueryString("type_name")),
                summary_word = GetDecodeURIComponent(GetQueryString("summary_word")),
                first_type_id = GetQueryString("first_type_id"),
                second_type_id = GetQueryString("second_type_id"),
                third_type_id = GetQueryString("third_type_id"),
                industry_id = GetQueryString("industry_id"),
                store_type = GetQueryString("store_type"),
                brand_id = GetQueryString("brand_id"),
                first_type_name = GetDecodeURIComponent(GetQueryString("first_type_name")),
                second_type_name = GetDecodeURIComponent(GetQueryString("second_type_name")),
                third_type_name = GetDecodeURIComponent(GetQueryString("third_type_name")),
                brandName = GetDecodeURIComponent(GetQueryString("brandName")),
                brand_name = GetDecodeURIComponent(GetQueryString("brand_name")),
                industry_name = GetDecodeURIComponent(GetQueryString("industry_name")),
                brandId = GetQueryString("brandId");
            let boardList = []

            //pageType brand:品牌 industry:行业 concept:概念
            //type 1:国内电商 2:线下门店 3:舆情分析
            //type_name 展示的name
            if (type == 1) {
                //国内电商
                if (pageType == "brand") {
                    first_type_name = first_type_id
                    boardList = await this.getBoardBrandDetail({ brandId: brand_id || brandId, first_type_name: first_type_name || first_type_id });
                } else if (pageType == "industry") {
                    boardList = await this.getDEIndustrySidebar({ first_type_id, second_type_id, third_type_id });
                } else if (pageType == "concept") {
                    boardList = await this.getSummaryWordInfo({ first_type_id, summary_word });
                }

            } else if (type == 2) {
                //线下门店
                if (pageType == "brand") {
                    boardList = await this.getOfflineBrandDetail({ brandId: brand_id || brandId, store_type });
                    type_name = brandName
                } else if (pageType == "industry") {
                    boardList = await this.getIndustryDetail({ industryId: industry_id, store_type });
                }
            } else if (type == 3) {
                //舆情分析
                if (pageType == "brand") {
                    boardList = await this.getRedBrandDetail({ brand_id });
                    type_name = brand_name
                } else if (pageType == "industry") {
                    console.log('firstId', first_type_id, second_type_id, third_type_id)
                    let full_type_id = first_type_id
                    if (second_type_id && second_type_id != 'undefined' && second_type_id != 'null') {
                        full_type_id += `>${second_type_id}`
                    }
                    if (third_type_id && third_type_id != 'undefined' && third_type_id != 'null') {
                        full_type_id += `>${third_type_id}`
                    }
                    boardList = await this.getRedIndustryDetail({ industry_id, full_type_id });
                } else if (pageType == "concept") {
                    boardList = await this.getRedConceptDetail({ summary_word, first_type_id });
                    type_name = summary_word
                }
            }

            boardList = this.setFormatValue(boardList)
            let attentionFlag = boardList[0].attentionFlag == 1 ? true : false
            let urlParams = {
                type_name,
                type,
                pageType,
                summary_word,
                first_type_id,
                second_type_id,
                third_type_id,
                industry_id,
                industry_name,
                store_type,
                brand_id: brand_id || brandId,
                first_type_name,
                second_type_name,
                third_type_name,
                attentionFlag,
                brand_name,
                brandName
            }
            this.setState({ isReady: true, boardList, urlParams })
        } catch (error) {
            console.log("初始化出错", error);
        }
    }
    //国内电商行业
    getDEIndustrySidebar = async (params) => {
        const result = await Api.getDEIndustrySidebar(params)
        let boardList = []
        if (result.code == 200) {
            boardList = result.data

            let minArr = [],
                maxArr = [];
            boardList.forEach(item => {
                if (item.title) maxArr.push(item)
                else minArr.push(item)
            })
            boardList = [...minArr, ...maxArr]
        }
        return boardList
    }
    //国内电商品牌
    getBoardBrandDetail = async (params) => {
        const result = await Api.getBoardBrandDetail(params)
        let boardList = []
        if (result.code == 200) {
            boardList = result.data
        }
        return boardList
    }
    //国内电商概念
    getSummaryWordInfo = async (params) => {
        const result = await Api.getSummaryWordInfo(params)
        let boardList = []
        if (result.code == 200) {
            boardList = result.data
        }
        return boardList
    }
    //线下门店品牌
    getOfflineBrandDetail = async (params) => {
        const result = await Api.getOfflineBrandDetail(params)
        let boardList = []
        if (result.code == 200) {
            boardList = result.data
        }
        return boardList
    }
    //线下门店行业
    getIndustryDetail = async (params) => {
        const result = await Api.getIndustryDetail(params)
        let boardList = []
        if (result.code == 200) {
            boardList = result.data
        }
        return boardList
    }
    // 舆情行业
    getRedIndustryDetail = async (params) => {
        const result = await Api.getRedIndustryDetail(params)
        let boardList = []
        if (result.code == 200) {
            boardList = result.data
        }
        return boardList
    }
    // 舆情品牌
    getRedBrandDetail = async (params) => {
        const result = await Api.getRedBrandDetail(params)
        let boardList = []
        if (result.code == 200) {
            boardList = result.data
        }
        return boardList
    }
    // 舆情概念
    getRedConceptDetail = async (params) => {
        const result = await Api.getRedConceptDetail(params)
        let boardList = []
        if (result.code == 200) {
            boardList = result.data
        }
        return boardList
    }

    getFormatData = (format, value, bit = 0, divide) => {
        if (format == "int" || format == "long") {
            if (divide == "10000") {
                return unitTransformation(value, "万", bit)
            } else if (divide == "1000000") {
                return unitTransformation(value, "百万", bit)
            } else if (divide == "10000000") {
                return unitTransformation(value, "千万", bit)
            } else if (divide == "100000000") {
                return unitTransformation(value, "亿", bit)
            } else {
                return transTableDateType(value, { type: "int", bit_number: bit, thousands: true })
            }
        } else if (format == "percent") {
            return transTableDateType(value, { type: "percent", bit_number: 2 })
        } else if (format == "float") {
            return transTableDateType(value, { type: "float", bit_number: bit })
        }
    }

    setFormatValue = (arr) => {
        arr = arr.map(item => {
            item.children = item.children.map(itemChild => {
                let { format, divide, bit_number } = itemChild.operate_multiple
                itemChild.value = format != "string" ? this.getFormatData(format, itemChild.value, bit_number, divide) : this.setBrand(itemChild.value)
                return itemChild
            })
            return item
        })
        return arr
    }
    setBrand = (arr) => {
        return arr
        // return arr.map(item=>{
        //     item.brand_name = item.brand_name.replace('（','(').replace('）',')')
        //     return item
        // })
    }


    render() {
        const { isReady, boardList, urlParams } = this.state;
        const { urlData } = this.props;
        return <SecondMenu type='primary' list={boardList} urlData={urlData} urlParams={urlParams} />
    }
}

Index.propTypes = {
    urlData: PropTypes.object
};

export default Index;