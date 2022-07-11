/*
 * @FileDescription    : 文件描述  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-26 10:04:42 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-09-Fr 03:44:32
 */

'use strict';
const formatNumber = require("../../../app/service/formatNumber"),
    moment = require("moment"),
    crypto = require('crypto'),
    _ = require("lodash"),
    {
        getCurrentLanguage
    } = require("../page/component/locales/index");

import { pathToRegexp, match } from 'path-to-regexp';



//格式化数字
export function transTableDateType(num, opt) {
    if ((num && num != '-') || num === 0 || num === "0") {
        return formatNumber(num, opt);
    } else {
        return "-";
    }
}
//转化数值单位
export function unitTransformation(num, type, bit_number = 1) {
    if (num === 0 || num === "0") return "0.0";
    if (!num || !type) return "-";
    switch (type) {
        case "十":
            return num = transTableDateType(num, { divide: 10, bit_number });
        case "百":
            return num = transTableDateType(num, { divide: 100, bit_number });
        case "千":
            return num = transTableDateType(num, { divide: 1000, bit_number, thousands: true });
        case "万":
            return num = transTableDateType(num, { divide: 10000, bit_number, thousands: true });
        case "十万":
            return num = transTableDateType(num, { divide: 100000, bit_number, thousands: true });
        case "百万":
            return num = transTableDateType(num, { divide: 1000000, bit_number, thousands: true });
        case "千万":
            return num = transTableDateType(num, { divide: 10000000, bit_number, thousands: true });
        case "亿":
            return num = transTableDateType(num, { divide: 100000000, bit_number, thousands: true });
        default:
            return "";
    }
}
//get url param
export function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        var result = decodeURI(r[2])
        if (/.*[\u4e00-\u9fa5]+.*$/.test(result)) return result;
        return unescape(r[2]);
    }
    return null;
}
//GetDecodeURIComponent
export function GetDecodeURIComponent(str) {
    return str ? decodeURIComponent(str) : str
}

export function checkNum(value) {
    var reg = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 ，判断正整数用/^[1-9]+[0-9]*]*$/
    if (!reg.test(value)) return false;
    else return true;
}


//get page store data
export function getPageParam(str) {
    if (!str) return null;
    try {
        let param = Base64.decode(str);
        return JSON.parse(param);
    } catch (error) {
        console.log(error);
    }
    return null;
}

export function getParamData() {
    try {
        let pageData = getPageParam(URLPARAM);
        let param = pageData.param;
        return param.split(",");
    } catch (error) {
        console.log(error);
    }
    return [];
}


//Remove string whitespace
export function Trim(str) {
    if (!str) return str;
    str = str.replace(/^(\s|\u00A0)+/, '');
    for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return str;
}

//判断是否为空
export function isEmpty(obj) {
    let type = typeof obj;
    if (type == "string" || type == "number" || type == "boolean") {
        if (obj) return false;
        else return true;
    } else if (type == "object") {
        if (obj instanceof Array) {
            let arr = _.filter(obj, item => item);
            //数组
            if (arr.length) return false;
            else return true;
        } else if (Object.prototype.toString.call(obj) === '[object Object]') { //对象
            if (JSON.stringify(obj) == "{}") return true;
            else return false;
        }
    }
    //other
    if (obj) return false;
    else return true;
}

//设置默认值
export function setDefault(value, defaultValue = "") {
    let temp = value;
    if (value == undefined) temp = defaultValue;
    return temp;
}


//Disable browser operations
export function DisableBrowserOperations(disabled = ["contextmenu", "keydown", "copy", "select"]) {
    if (!disabled || !(disabled instanceof Array)) return;

    const disabledContent = (type) => {
        switch (type) {
            //禁用鼠标右边
            case "contextmenu":
                document.oncontextmenu = function () {
                    return false;
                }
                break;
            //禁用ctrl+c功能
            case "keydown":
                document.onkeydown = function () {
                    if (event.ctrlKey && window.event.keyCode == 67) {
                        return false;
                    }
                }
                break;
            case "copy":
                document.body.oncopy = function () {
                    return false;
                }
                break;
            case "select":
                document.body.onselectstart = function () {
                    return false;
                }
                break;
        }
    }

    for (let i = 0, len = disabled.length; i < len; i++) {
        let type = disabled[i];
        disabledContent(type)
    }
}


// 柯理化函数  设置一个既定条件数组  通过累积传参达成条件  然后执行回调
export function desire(condition = [], callback) {
    let arg = [];
    let finish = false;
    return function fn() {
        if (!finish) {
            arg = arg.concat([arguments[0]]);
            if (condition && condition.length && condition.every(it => arg.includes(it))) {
                finish = true;
                callback();
            }
            // 严格模式下不能在arguments上访问callee
            // return arguments.callee;
            return fn;
        }
    }
};


//获取url
export function getUrlPath() {
    let protocol = location.protocol,
        host = location.host,
        pathname = location.pathname;
    return `${protocol}//${host}${pathname}`;
}

export function checkImgUrl(imgurl) {
    return new Promise(function (resolve, reject) {
        var ImgObj = new Image(); //判断图片是否存在
        ImgObj.src = imgurl;
        ImgObj.onload = function (res) {
            resolve(res);
        }
        ImgObj.onerror = function (err) {
            reject(err)
        }
    }).catch((e) => {
        console.log('---无效的图片地址，请核对')
    }); // 加上这句不会报错（Uncaught (in promise)）
}


export function isMatchRoute(route) {
    const pathReg = pathToRegexp(route);
    return pathReg.exec(window.location.pathname);
}

export function getData(data) {
    if (!data) return;
    data = Base64.decode(data);
    if (!data) return;
    try {
        data = JSON.parse(data);
    } catch (error) {
        return null;
    }
    return data;
}

/**
 * @aes192解密模块
 * @param str string 要解密的字符串
 * @param secret string 要使用的解密密钥(要和密码的加密密钥对应,不然就解不了密啦)
 * @retrun string 解密后的字符串
 * */
export function getDecData(str) {
    try {
        const secret = "rs_user";//this.config.keys;
        let decipher = crypto.createDecipher("aes192", secret);
        let dec = decipher.update(str, "hex", "utf8"); //编码方式从hex转为utf-8;
        dec += decipher.final("utf8"); //编码方式从utf-8;
        return dec;
    } catch (error) {
        return null;
    }
}

/**
 * 判断是否是从登录跳转过来的
 */
export function isLoginInto() {
    console.log('isLoginInto=>', location.pathname == '/page/comprehensiveBoard')
    return location.pathname == '/page/comprehensiveBoard'
    // return document.referrer.indexOf('//passport.') > -1 ? true : false;
}

// 获取数组最大width长度
export function getMaxWidth(data, fontSize = 12) {
    const text = _.chain(data)
        .map((item) => [item.length, `${item}：`])
        .maxBy(item => item[0])
        .value()[1]
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    context.font = `normal ${fontSize}px sans-serif`;
    let metrics = context.measureText(text);
    return Math.ceil(metrics.width)
}

export function getPageId() {
    const splitList = location.pathname.split("/");
    return splitList[splitList.length -1];
}

window.isMatchRoute = isMatchRoute;