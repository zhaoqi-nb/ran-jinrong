/*
 * @FileDescription    : 格式化日期 
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-12-04 15:19:13 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-09-Fr 04:02:23
 */

'use strict';

const moment = require("moment");

/**
 * 格式化日期
 * param
 *    num     需要格式化的字符串
 *    option  格式化参数 
 *          {   
 *              //默认值  例如：如果数据是null，则展示0，或者如果数据是null，则展示 ‘-’
 *              default:{
 *                          dataValue:null,
 *                          showValue:0
 *                       },
 *              type     :"",   //int、float、percent
 *              thousands:false,//千分位
 *              bit_number:2,   //保留几位小数
 *              divide    : 100 //进位，比如数据是 100000 进位到万，则divide是10000，返回结果则是 10
 *          }
 * 
 */
const formatDate = (str = "", opt = null, language = "zh_CN") => {
    if (!opt || !opt.type) return str;
    let format = "";

    try {
        switch (opt.dateType) {
            case 'day':
            case 'week':
            case 'month_week':
            case 'quarter_week':
                opt = {
                    dateFormat: "YYYYMMDD",
                    format: "YYYY-MM-DD",
                    ...opt
                }
                str = moment(str, opt.dateFormat).format(opt.format);
                break;
            case 'week_yyyyww':
                format = language == "zh_CN" ? "GGGG-WW周" : "GGGG-WW"
                opt = {
                    dateFormat: "GGGGWW",
                    format,
                    ...opt
                }
                str = moment(str, opt.dateFormat).format(opt.format);
                break;
            case 'month':
                format = language == "zh_CN" ? "YYYY-MM月" : "YYYY-MM"
                opt = {
                    dateFormat: "YYYYMM",
                    format,
                    ...opt
                }
                str = moment(str, opt.dateFormat).format(opt.format);
                break;
            case 'quarter':
                (() => {
                    let year = moment(str, "YYYYQ").format("YYYY"),
                        quarter = moment(str, "YYYYQ").format("Q");
                    str = `${year}-Q${quarter}`
                })()
                break;
            case 'halfYear':
                (() => {
                    str = String(str);
                    if (str.length == 5) {
                        let year = str.slice(0, 4),
                            helf = str.slice(4, 5);
                        str = `${year}-H${helf}`
                    }
                })()
                break;
            case 'year':
                str = language == "zh_CN" ? `${str}年` : str;
                break;
        }
    } catch (error) {
        console.log("格式化图表日期展示方式  出错 ：" + error);
    }
    return str;
}

//导出
exports.formatDate = formatDate;
module.exports = formatDate;