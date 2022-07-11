/*
 * @FileDescription    : api 配置
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-08 15:13:57 
 * @Last Modified by: lin.li@fengjr.com
 */

'use strict';

const common = require("./api/common"),
    report = require("./api/report"),
    researchViewpoint = require("./api/researchViewpoint"),
    templateOperation = require("./api/templateOperation"),
    config = require("./api/configPage"),
    download = require("./api/download"),
    login = require("./api/login");

//接口api地址
module.exports = {
    //get user from cache
    GETUSERTEMPLATELIST: "/usertemplate/getUserTemplateList",

    //common
    ...common,
    ...report,
    ...researchViewpoint,
    ...templateOperation,
    ...config,
    ...login,
    ...download,
}