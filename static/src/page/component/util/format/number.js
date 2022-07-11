'use strict';

import formatNumber from "../../../../../../app/service/formatNumber";
import { setDefault } from '@util';

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

//获取格式化 方式
function getFormatMode(operate) {
    let format = operate && operate.format ? operate.format : null,
        divide = operate && operate.divide ? operate.divide : null,
        bit_number = operate && operate.bit_number ? operate.bit_number : 2,
        param = null;

    if (format == "long" || format == "int") {
        param = { type: "int", thousands: true, bit_number: 0 };
        //单位近位
        if (divide) param["divide"] = divide;
    }
    else if (format == "double") {
        param = { type: "float", bit_number, thousands: true };
        //单位近位
        if (divide) param["divide"] = divide;
    }
    else if (format == "percent") param = { type: "percent", bit_number };
    else if (format == "pct") param = { type: "percent", bit_number, ifSuffix: "pct" };
    else if (format == "string") param = { type: "string" };

    return param;
}

//格式化表格数据
export function formatData(operate, value) {
    if (!operate) return value;
    let param = getFormatMode(operate);
    //格式化
    if (param) value = transTableDateType(value, param);

    return value;
}



//获取指标格式化方式
export function getZBFormatMode(operate) {
    let data_type = setDefault(operate.data_type || operate.format),
        divide = setDefault(operate.divide),
        bit_number = setDefault(operate.precision || operate.bit_number);

    let param = null;

    if (data_type == "long" || data_type == "int") {
        param = { type: "int", thousands: true, bit_number: 0 };
        //单位近位
        if (divide) param["divide"] = divide;
    }
    else if (data_type == "double") {
        param = { type: "float", bit_number, thousands: true };
        //单位近位
        if (divide) param["divide"] = divide;
    }
    else if (data_type == "percent") param = { type: "percent", bit_number };
    else if (data_type == "pct") param = { type: "percent", bit_number, ifSuffix: "pct" };
    else if (data_type == "string") param = { type: "string" };

    return param;
}

//格式化指标数据
export function formatZBData(operate, value, showUnit = true) {
    if (!operate) return value;
    let param = getZBFormatMode(operate);
    let unit = setDefault(operate.unit);
    //格式化
    if (param) value = transTableDateType(value, param);
    //单位
    if (unit && showUnit) value = `${value}(${unit})`;
    //
    return value;
}