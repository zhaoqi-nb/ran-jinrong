'use strict';
import { i18n } from '@/components/FastIntl';

const moment = require("moment"),
    _ = require("lodash"),
    { getCurrentLanguage } = require("../../locales/index");

/**
 *
 * 格式化日期展示数据
 * @export
 * @param {*} num
 * @param {*} [opt=null]
 *            {
 *              dateType  :""//day、month、week
 *              dateFormat:""//数据解析的格式 例如 20181206 对应的格式就是 YYYYMMDD
 *              format    :""//返回数据的格式 例如 YYYY年MM月DD
 *            }
 * @returns
 */
export function formaDate(num, opt = null) {
    if (!opt || !opt.dateType) return num;
    // let language = getCurrentLanguage();
    const language = i18n.getLocalLanguage();
    let format = "";
    let suffix = "";
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
                num = moment(num, opt.dateFormat).format(opt.format);
                break;
            case 'week_yyyyww':
                format = language == "zh_CN" ? "GGGG-WW周" : "GGGG-WW";
                suffix = language == "en_US" ? "(W)" : "";
                opt = {
                    dateFormat: "GGGGWW",
                    format,
                    ...opt
                }
                num = moment(num, opt.dateFormat).format(opt.format) + suffix;
                break;
            case 'month':
                format = language == "zh_CN" ? "YYYY-MM月" : "YYYY-MM";
                suffix = language == "en_US" ? "(M)" : "";
                opt = {
                    dateFormat: "YYYYMM",
                    format,
                    ...opt
                }
                num = moment(num, opt.dateFormat).format(opt.format) + suffix;
                break;
            case 'quarter':
                (() => {
                    let year = moment(num, "YYYYQ").format("YYYY"),
                        quarter = moment(num, "YYYYQ").format("Q");
                    num = `${year}-Q${quarter}`
                })()
                break;
            case 'quarter_FY':
                (() => {
                    let year = moment(num, "YYYYQ").format("YY"),
                        quarter = moment(num, "YYYYQ").format("Q");
                    num = `FY${year}Q${quarter}`
                })()
                break;
            case 'halfYear':
                (() => {
                    if (num.length == 5) {
                        let year = num.slice(0, 4),
                            helf = num.slice(4, 5);
                        num = `${year}-H${helf}`
                    }
                })()
                break;
            case 'halfYear_FY':
                (() => {
                    if (num.length == 5) {
                        let year = num.slice(2, 4),
                            helf = num.slice(4, 5);
                        num = `FY${year}H${helf}`
                    }
                })()
                break;
            case 'year':
                num = language == "zh_CN" ? `${num}年` : `${num}`;
                break;
        }
    } catch (error) {
        console.log("格式化日期展示方式  出错 ：" + error);
    }
    return num;
}