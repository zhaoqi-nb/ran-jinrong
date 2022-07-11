/*
 * @Description: 对组件提供公共方法
 * @version: 1.0
 * @Company: fengjr
 * @Author: lin.li@fengjr.com
 * @LastEditors: OBKoro1
 * @Date: 2019-03-18 14:39:38
 * @LastEditTime: 2019-03-26 19:12:46
 */

'use strict';

import { Base64ToJson } from './format';
// import { triggerEvnetFun } from './event';
// import { pageAccessInfo } from '../../page/commonData';
import { pageAccessInfo } from '@pageAccess';
// import { getCurrentLanguage } from '../../util/locales/index';


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
// function verifyInitFun(ids, callback = () => { }) {
//     if (!ids || !ids.length) return callback();
//     let index = 0,
//         result = {};

//     const judgeState = () => {
//         for (let key in result) {
//             if (!result[key]) return false;
//         }
//         return true;
//     }

//     const loop = () => {
//         for (let i = 0, len = ids.length; i < len; i++) {
//             let id = ids[i];
//             if (!result[id]) {
//                 let temp = triggerEvnetFun(`getParam_${id}`);
//                 result[id] = temp ? true : false;
//             }
//         }
//         index++;
//         if (!judgeState() && index < 5) loop();
//         else if (judgeState()) callback();
//     }

//     loop();
// }

//获取组件Api参数
// function getComponentParam(ids) {
//     if (!ids || !ids.length) return -1;
//     let result = null;
//     for (let i = 0, len = ids.length; i < len; i++) {
//         let id = ids[i];
//         let temp = triggerEvnetFun(`getParam_${id}`);
//         // if(!temp) continue;
//         if (!temp) return null;
//         result = {
//             ...result,
//             ...temp,
//         }
//     }
//     //增加统一参数
//     if (result) result["language"] = getCurrentLanguage()

//     return result;
// }


//set adjust the order
function setAdjustOrder(key, data) {
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

            if (!ifSort && weight) ifSort = true;
            obj["weight"] = weight;
            if (privilegeType == "APP" && privilegeName == key && Number(weight) >= 0) temp.push(obj);
        }

        if (ifSort) temp.sort((a, b) => b.weight - a.weight);
    } catch (error) {
        console.log(error);
    }

    return temp && temp.length ? temp[0] : null;
}


//获取数据
function getData(key, privilegeDtoList) {
    let value = null;
    if (privilegeDtoList && privilegeDtoList.length) {
        let privilegeDto = setAdjustOrder(key, privilegeDtoList);
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
                    weight = property.weight,
                    temp_obj = pageAccessInfo.find(item => accessState && (item.code).toLocaleLowerCase() == accessState.toLocaleLowerCase()),
                    accessInfo = copyObj(temp_obj);

                if (weight == undefined) {
                    if (accessInfo.weight) obj["property"] = JSON.stringify(accessInfo);
                    else obj["property"] = null;
                } else {
                    if (accessState == "noView") {
                        obj.weight = weight;
                        obj["property"] = null;
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
// function getKeyPrivilege(key) {
//     const menu = Base64ToJson(PAGEMIXDATA);
//     if (menu) {
//         let pageInfo = menu.pageInfo,
//             privilegeDtoList = pageInfo.privilegeDtoList;

//         return getData(key, privilegeDtoList);
//     }
//     return null;
// }


//获取
function getPrivilegeData(list = ["noView", "noView_id", "pageAccessInfo", "ifDownload", "ifChartDownload", "fixDate_range"]) {
    const menu = Base64ToJson(PAGEMIXDATA);
    let param = {};
    if (menu) {
        let pageInfo = menu.pageInfo,
            resAttr = pageInfo.resAttr,
            privilegeDtoList = pageInfo.privilegeDtoList;

        param["pageInfo"] = pageInfo;

        for (let i = 0, len = list.length; i < len; i++) {
            let key = list[i];
            let temp = getData(key, privilegeDtoList);
            if (temp) param[key] = temp;
        }
    }
    return param;
}

// function getPrivilegeDataByPath(list = ["noView", "noView_id", "pageAccessInfo", "ifDownload", "ifChartDownload", "fixDate_range"], path) {
//     const menu = Base64ToJson(PAGEMIXDATA);
//     let param = {};
//     if (menu) {
//         let pageInfo = menu.leftMenu.find(v => v.path == path) || menu.pageInfo,
//             resAttr = pageInfo.resAttr,
//             privilegeDtoList = pageInfo.privilegeDtoList;
//         console.log(menu.leftMenu)
//         param["pageInfo"] = pageInfo;

//         for (let i = 0, len = list.length; i < len; i++) {
//             let key = list[i];
//             let temp = getData(key, privilegeDtoList);
//             if (temp) param[key] = temp;
//         }
//     }
//     return param;
// }

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

export {
    //  judgeWhetherObj, verifyInitFun, getComponentParam, 
    getTemplateData, getAccessState, getUserBehavior, getPrivilegeData
    // getKeyPrivilege, getPrivilegeDataByPath
};