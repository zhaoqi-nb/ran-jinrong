/*
 * @FileDescription    : 格式化数字  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-12-04 15:19:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-06-Fr 10:20:31
 */

'use strict';

const numeral = require('numeral');

/**
 * 格式化数字
 * param
 *    num     需要格式化的数字
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
const formatNumber = (num = 0, option = null) => {

    //如果option没有配置对数据的处理，默认返回数据
    if (!option || option.type == "string") return num;

    if (num.constructor == String && !isNaN(Number(num))) num = Number(num);

    //判断 如果后台返回指定数据，前端是否转换成默认值
    if (option && option["default"]) {
        var defaultObj = option.default,
            dataValue = defaultObj.dataValue || null,
            showValue = defaultObj.showValue || 0;

        if ((!num && num != 0) || (num == dataValue)) return showValue;
    }

    //返回需要保留的小数位
    function getNumBit(bit = 2) {
        bit = parseInt(bit);

        let str = "";

        //是否增加千分位
        if (option.thousands) str = "0,0.";
        else str = "0.";

        for (let i = 0; i < bit; i++) {
            str += "0";
        }

        return str;
    }

    let bit_number = getNumBit(option && option.bit_number ? option.bit_number : 0);

    //进位
    if (option.divide) return numeral(num).divide(option.divide).format(bit_number);

    try {
        //格式化数据
        switch (option.type) {
            // 整数
            case "int":
                var int_format = bit_number;
                return numeral(num).format(int_format);
            //浮点数
            case "float":
                var float_format = bit_number;
                return numeral(num).format(float_format);
            //3代表百分数,percent
            case "percent":
                var percent_format = bit_number + "%";
                if (option.ifSuffix == undefined) {
                    return numeral(num).format(percent_format).indexOf('NaN') > -1 ?
                        numeral(0).format(percent_format) : numeral(num).format(percent_format);
                } else if (option.ifSuffix) {
                    let ifSuffix = option.ifSuffix;
                    let value = numeral(num).format(percent_format);
                    return value.split("%")[0] + ifSuffix;
                }
            default:
                return num;
        }
    } catch (error) {
        console.log(error)
    }

}

//导出
exports.formatNumber = formatNumber;
module.exports = formatNumber;