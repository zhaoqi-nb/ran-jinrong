'use strict';
import React from 'react';
import _ from 'lodash';
import { getPageParam } from '../../../utils/Util';
import i18n from '@/plugin/i18n'


//页面缓存数据，页面加载时候一次加载
let pageMixData = null,
    templateList = null,
    urlParam = null;

let globalData = {};

const setupPageData = _.flowRight(setPageMixDataEN, getPageParam)
function initPageData() {
    try {
        pageMixData = setupPageData(PAGEMIXDATA); // getPageParam
        templateList = getPageParam(TEMPLATELIST);
        urlParam = getPageParam(URLPARAM);
    } catch (error) {
        console.log("error" + error);
    }
}

function setPageMixDataEN(pageMixData) {
    if (!pageMixData) return pageMixData
    const translateLeftMenu = _.partialRight(_.each, (item) => {
        item.displayResName = i18n.format(item.resName)
        if (_.isArray(item.child)) {
            translateLeftMenu(item.child)
        }
    })

    if (!_.isNil(pageMixData.leftMenu)) {
        translateLeftMenu([pageMixData.leftMenu])
    }

    const translatePageInfo = (pageInfo) => {
        _.set(pageInfo, 'displayParentName', i18n.format(_.get(pageInfo, 'parentName')))
        _.set(pageInfo, 'displayResNameEn', i18n.format(_.get(pageInfo, 'resName')))
    }

    if (!_.isNil(pageMixData.pageInfo)) {
        translatePageInfo(pageMixData.pageInfo)
    }

    const translateMenuData = _.partialRight(_.each, (item) => {
        item.displayResName = i18n.format(item.resName)
        if (_.isArray(item.child)) {
            translateLeftMenu(item.child)
        }
    })

    if (!_.isNil(pageMixData.menuData)) {
        translateMenuData(pageMixData.menuData)
    }

    console.log('pageMixData', pageMixData)
    return pageMixData
}

function getUserInfoData() {
    return pageMixData ? pageMixData.userInfo : null;
}

function getSystemData() {
    return pageMixData ? pageMixData.systemList : null;
}

function findIndustryInfo(id) {
    const current = _.chain(pageMixData)
        .get('leftMenu.child')
        .find(item => {
            return JSON.parse(item.resAttr).path === id
        })
        .value()

    return _.get(current, 'resId')
}

function findParentInfo() {
    let pageInfo = getPageData();
    let leftMenu = getSubMenuData();
    let parentObj = null;
    let loop = (data, id, parentObj) => {
        for (let i = 0, len = data.length; i < len; i++) {
            let obj = data[i];
            let resId = obj.resId;
            let child = obj.child;
            if (resId == id) return parentObj
            if (child && child.length) {
                let temp = loop(child, id, obj);
                if (temp) return temp;
            }
        }
        return null;
    }

    if (pageInfo) {
        let resId = pageInfo.resId;
        parentObj = loop(leftMenu.child, resId);
    }

    return parentObj;
}

function getMenuData() {
    console.log('pageMixData', pageMixData)
    return pageMixData ? pageMixData.menuData : null;
}

function getDataSourceMenuData() {
    return pageMixData ? pageMixData.dataSourceMenu : null;
}

function getSubMenuData() {
    return pageMixData ? pageMixData.leftMenu : null;
}

function getUrlParam() {
    return urlParam;
}

function getPageData() {
    console.log('qiaojie=>pageMixData', pageMixData)
    return pageMixData ? pageMixData.pageInfo : null;
}

function getTemplateData() {
    return templateList;
}

//获取子元素
function getChildren(children) {
    return React.Children.map(children, child => {
        if (typeof child === "object") return React.cloneElement(child)
        else return child;
    });
}


function getCurrSysId() {
    return globalData.sysId;
}

function setCurrSysId(sid) {
    globalData.sysId = sid;
}

export { getCurrSysId, setCurrSysId, initPageData, getUserInfoData, getSystemData, getMenuData, getUrlParam, getPageData, getTemplateData, getSubMenuData, getChildren, findIndustryInfo, findParentInfo, getDataSourceMenuData }