/*
 * @Description: 文件描述
 * @version: 1.0
 * @Company: fengjr
 * @Author: lin.li@fengjr.com
 * @LastEditors: OBKoro1
 * @Date: 2019-03-15 17:16:25
 * @LastEditTime: 2019-03-18 14:38:56
 */

'use strict';

const Base64 = require('js-base64').Base64;

//格式化 base64 到 json数据
export function Base64ToJson(data){
    let obj = {};
    if(data){
        try {
            let tempObj = Base64.decode(data);
                obj     = JSON.parse(tempObj);
        } catch (error) {
            console.log(error);
        }
    }
    return obj;
}
