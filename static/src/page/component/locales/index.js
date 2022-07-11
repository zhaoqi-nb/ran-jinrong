'use strict';
//公共模块语言
import common_msgs from './common-msgs';
//api 数据返回
import api_msgs from './api-msgs';

//工具类
import merge from 'lodash/merge';
// import Api from './store/api'


//当前语言类型
let currLanguage = null,
    allLanguage = null;

//更改语言
function changeLanguage(text) {
    if (!text) return;
    currLanguage = text;
}


function getResName(res) {
    let resName = "";
    // try {
    //     let resAttr = res.resAttr;
    //     if(resAttr && resAttr.menuName){
    //         let menuName   = resAttr.menuName,
    //             stock_code = resAttr.stock_code;
    //         if(menuName && stock_code){
    //             resName = `${transformText(menuName)}(${stock_code})`
    //         }
    //     }
    // } catch (error) {
    //     console.log(error);
    // }

    //资源未获取
    if (!resName || true) {
        try {
            let temp = res.resName;
            if (temp.indexOf("(") != -1) {
                let arr = temp.split("(");
                let second = arr[1].split(")");
                resName = `${transformText(arr[0])} (${transformText(second[0])})`
            } else {
                if (res && res.resNameEn) resName = res.resNameEn;
                else resName = transformText(res.resName);
            }

        } catch (error) {
            console.log(error);
        }
    }
    return resName;
}

//转换菜单
function transformMenuText(obj) {
    if (currLanguage == "en_US") return getResName(obj);
    else return obj.resName;
}

//更改文字
/**
 * 
 * @param {*} key 
 * @param {*} forceLanguage 
 * @param {*} ifTranslate 
 */
function transformText(key, forceLanguage, ifTranslate) {
    if (!key) return;
    if (ifTranslate != undefined && !ifTranslate) return key;
    if (!currLanguage || !allLanguage) {
        initLanguageData();
    }
    let data = forceLanguage ? allLanguage[forceLanguage] : allLanguage[currLanguage];

    // if(data[key] === undefined && currLanguage == "en_US"){
    //     Api.notFoundEnglish({name:key})
    // }
    return data[key] === undefined ? key : data[key];
}

//获取当前语言
function getCurrentLanguage() {
    if (!currLanguage) initLanguageData()
    return currLanguage;
}

//初始化
function initLanguageData() {
    let userBehavior = null;
    currLanguage = userBehavior && userBehavior.language ? userBehavior.language : "zh_CN";
    // currLanguage = "en_US";
    //合并语言
    allLanguage = merge({}, common_msgs, api_msgs);
}


export { getCurrentLanguage, changeLanguage, transformMenuText, transformText }