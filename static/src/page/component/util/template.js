/*
 * @Description: 对组件提供公共方法
 * @version: 1.0
 * @Company: fengjr
 * @Author: lin.li@fengjr.com
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-18 14:39:38
 * @LastEditTime: 2022-04-02 17:01:20
 */

'use strict';

import _ from 'lodash';
import { Base64ToJson } from './format';
import { triggerEvnetFun } from './event';
import { pageAccessInfo } from '@pageAccess';
import { getCurrentLanguage } from '../locales/index';
import { isEmpty } from '@util';
import i18n from '@/plugin/i18n';


//获取模版数据
function getTemplateData(id) {
    let data = null;
    try {
        let tempObj = Base64ToJson(TEMPLATELIST);
        if (tempObj) data = tempObj[id];
    } catch (error) {
        console.log(error);
    }
    return data;
}

//判断是否是 json对象
function judgeWhetherObj(data) {
    let result = false;
    try {
        let arr = Object.getOwnPropertyNames(data);
        result = arr.length == 0;
    } catch (error) {
        console.log(error);
    }
    return result;
}

//验证初始化方法，组件调用参数用
function verifyInitFun(ids, callback = () => { }) {
    if (!ids || !ids.length) return callback();
    let index = 0,
        result = {};

    const judgeState = () => {
        for (let key in result) {
            if (!result[key]) return false;
        }
        return true;
    }

    const loop = () => {
        for (let i = 0, len = ids.length; i < len; i++) {
            let id = ids[i];
            if (!result[id]) {
                let temp = triggerEvnetFun(`getParam_${id}`);
                result[id] = temp ? true : false;
            }
        }
        index++;
        if (!judgeState() && index < 5) loop();
        else if (judgeState()) callback();
    }

    loop();
}

//获取组件Api参数
function getComponentParam(ids) {
    if (!ids || !ids.length) return null;
    let result = null;
    for (let i = 0, len = ids.length; i < len; i++) {
        let id = ids[i];
        let temp = triggerEvnetFun(`getParam_${id}`);
        if (!temp) return temp;
        result = {
            ...result,
            ...temp,
        }
    }
    //增加统一参数
    // if (result) result["language"] = getCurrentLanguage()
    if (result) result["language"] = i18n.getLocalLanguage()

    return result;
}

function getComponentNoParam(ids) {
    if (!ids || !ids.length) return null;
    let result = null;
    for (let i = 0, len = ids.length; i < len; i++) {
        let id = ids[i];
        let temp = triggerEvnetFun(`getParam_${id}`);
        // if (!temp) return temp;
        result = {
            ...result,
            ...temp,
        }
    }
    //增加统一参数
    // if (result) result["language"] = getCurrentLanguage()
    if (result) result["language"] = i18n.getLocalLanguage()

    return result;
}

function _getIndustryListParams(temp, industryListCopy) {
    if (!temp) {
        return false;
    }
    for (var i = 0; i < industryListCopy.length; i++) {
        const currItem = industryListCopy[i];

        for (var j = 0; j < currItem.value.length; j++) {
            const key =  currItem.value[j];
            
            Object.keys(temp).forEach(item => {
                const endKey = '_'+ key;
                if (item.endsWith(key)) {
                    const paramsKey = item.replace(endKey, '');
                    if (!currItem.downloadParams) {
                        currItem.downloadParams = {
                            [paramsKey]: temp[item]
                        }
                    } else {
                        currItem.downloadParams[paramsKey]= temp[item]
                    }
                    return true;
                }
            })
        }
    }
}

function getComponentParamNoReturn(ids, industryList) {
    if (!ids || !ids.length) return null;
    let result = null;
    let industry_list = [];
    let industryListCopy = _.cloneDeep(industryList);
    let isInIndustryParams =  false;
    for (let i = 0, len = ids.length; i < len; i++) {
        let id = ids[i];
        let temp = triggerEvnetFun(`getParam_${id}`);
        // if (!temp) return temp;
        if (industryList) {
           _getIndustryListParams(temp, industryListCopy);
        }
    
        result = {
            ...result,
            ...temp,
        }
    }
    //增加统一参数
    // if (result) result["language"] = getCurrentLanguage()
    if (result) result["language"] = i18n.getLocalLanguage()
    industryListCopy && industryListCopy.forEach(item => {
        if (item.downloadParams) {
            if (!result.industry_list) {
                result.industry_list = [item.downloadParams]
            } else {
                result.industry_list.push(item.downloadParams)
            }
        }
    })

    // 处理多选一级行业的
    if (!industryListCopy && result.first_type_name) {
        const splits = result.first_type_name.split(',');
        result.industry_list = [];
        splits.forEach(item => {
            result.industry_list.push({
                first_type_name: item
            })
        })
       
    }

    return result;
}

//set adjust the order
function setAdjustOrder(key, data, mergeId) {
    if (!key || !data || !data.length) return null;
    let temp = [],
        ifSort = false;
    try {
        for (let i = 0, len = data.length; i < len; i++) {
            let obj = data[i],
                privilegeType = obj.privilegeType,
                privilegeName = obj.privilegeName,
                property = JSON.parse(obj.property),
                weight = obj.weight ? obj.weight : (property && property.weight ? property.weight : 0);
            // console.log('privilegeType', obj.privilegeName, 'show_data_app_id')
            if (!ifSort && weight) ifSort = true;
            obj["weight"] = weight;
            if (privilegeType == "APP" && privilegeName == key && Number(weight) >= 0) temp.push(obj);
        }

        if (ifSort) temp.sort((a, b) => b.weight - a.weight);
    } catch (error) {
        console.log(error);
    }

    /**
     * step1 按照privilegeName 分组 上面是完成的
     * step2 按照weight 分组 取优先级最大
     * step3 property中是否有merge需求 有合并所有merge项目
    */
    const dataList = _.chain(temp)
        .map(item => {
            let d;
            try {
                d = JSON.parse(item.property)
            } catch (err) {
                d = item.property

            }

            return { ...item, property: d }
        })
        .groupBy(item => item.weight)
        .toPairs()
        .reduce((acc, [key, value]) => {
            if (_.isNil(acc)) return value;

            if (acc.weight > Number(key)) {
                return value
            }

            return acc;
        }, null)
        .value();
    // const isMerge = mergeId ? _.some(dataList, item => _.get(item, `property.${mergeId}.merge`))
    //     : _.some(dataList, item => _.get(item, 'property.merge'))
    const isMerge = _.some(dataList, item => _.get(item, 'property.merge'))

    if (isMerge) {
        function customizer(objValue, srcValue) {
            if (_.isArray(objValue)) {
                return objValue.concat(srcValue);
            }
        }

        try {
            const result = _.mergeWith({}, ...(dataList), customizer)
            result.property = JSON.stringify(result.property)
            return result
        } catch (err) {
            return result
        }
    }

    return temp && temp.length ? temp[0] : null;
}


//获取数据
function getData(key, privilegeDtoList, mergeId) {
    let value = null;
    if (privilegeDtoList && privilegeDtoList.length) {
        let privilegeDto = setAdjustOrder(key, privilegeDtoList, mergeId);
        if (privilegeDto && privilegeDto.property) {
            value = JSON.parse(privilegeDto.property);
        }
    }
    return value;
}

function copyObj(obj) {
    let temp = {};
    if (!obj) temp;
    for (let key in obj) {
        temp[key] = obj[key];
    }
    return temp
}

//获取应用权限对应关系
function getAccessState(data) {
    if (!data || !data.length) return null;
    let temp_privilege = [];
    for (let i = 0, len = data.length; i < len; i++) {
        let obj = data[i],
            privilegeName = obj.privilegeName,
            privilegeType = obj.privilegeType,
            property = obj.property;
        if (privilegeType == "APP" && privilegeName == "pageAccessInfo" && property) {
            try {
                property = JSON.parse(property);
                let accessState = property.accessState ? property.accessState : property.code,
                    temp_obj = pageAccessInfo.find(item => accessState && (item.code).toLocaleLowerCase() == accessState.toLocaleLowerCase()),
                    accessInfo = copyObj(temp_obj),
                    weight = obj.weight ? obj.weight : accessInfo.weight;

                if (weight == undefined) {
                    if (accessInfo.weight) obj["property"] = JSON.stringify(accessInfo);
                    else obj["property"] = null;
                } else {
                    if (accessState == "noView") {
                        obj.weight = weight;
                        // obj["property"] = null;
                    }
                    else {
                        accessInfo["weight"] = weight
                        obj["property"] = JSON.stringify(accessInfo);
                    }
                }
            } catch (error) {
                console.log("获取菜单权限格式化出错", error);
            }
        }
        temp_privilege.push(obj);
    }
    //获取应用权限
    return getData("pageAccessInfo", temp_privilege);
}

//获取key 对应的应用权限
function getKeyPrivilege(key) {
    const menu = Base64ToJson(PAGEMIXDATA);
    if (menu) {
        let pageInfo = menu.pageInfo,
            privilegeDtoList = pageInfo ? pageInfo.privilegeDtoList : [];
        console.log('auth=>privilegeDtoList=>', privilegeDtoList)
        return getData(key, privilegeDtoList);
    }
    return null;
}


//获取
function getPrivilegeData(list = ["noView", "noView_id", "pageAccessInfo", "ifDownload", "ifChartDownload", "fixDate_range"], mergeId) {
    const menu = Base64ToJson(PAGEMIXDATA);
    console.log('menumenumenumenu', menu)
    let param = {};
    if (menu) {
        let pageInfo = menu.pageInfo,
            resAttr = pageInfo.resAttr,
            privilegeDtoList = pageInfo.privilegeDtoList;

        // param["pageInfo"] = pageInfo;

        for (let i = 0, len = list.length; i < len; i++) {
            let key = list[i];
            let temp = getData(key, privilegeDtoList, mergeId);
            if (temp) param[key] = temp;
        }
    }
    return isEmpty(param) ? null : param;
}

function getPrivilegeDataByPath(list = ["noView", "noView_id", "pageAccessInfo", "ifDownload", "ifChartDownload", "fixDate_range"], path) {
    const menu = Base64ToJson(PAGEMIXDATA);
    let param = {};
    if (menu) {
        let pageInfo = menu.leftMenu.find(v => v.path == path) || menu.pageInfo,
            resAttr = pageInfo.resAttr,
            privilegeDtoList = pageInfo.privilegeDtoList;
        console.log(menu.leftMenu)
        param["pageInfo"] = pageInfo;

        for (let i = 0, len = list.length; i < len; i++) {
            let key = list[i];
            let temp = getData(key, privilegeDtoList);
            if (temp) param[key] = temp;
        }
    }
    return param;
}

//获取用户数据
function getUserBehavior() {
    if (!CACHEDATA) return;
    try {
        return Base64ToJson(CACHEDATA);
    } catch (error) {
        console.log(error)
    }
    return;
}

export { getTemplateData, judgeWhetherObj, verifyInitFun, getComponentParam, getComponentParamNoReturn, getAccessState, getPrivilegeData, getKeyPrivilege, getUserBehavior, getPrivilegeDataByPath, getData, getComponentNoParam };
