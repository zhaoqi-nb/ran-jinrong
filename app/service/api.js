/*
 * @FileDescription    : 文件描述  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-27 16:23:34 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-08-Tu 04:20:51
 */

'use strict';

const Service = require('egg').Service;
const { isEmpty } = require('../util/index')
/**
 *  
 */
class ServiceApi extends Service {
    //ajax param object to string
    getObjectToString(param) {
        let arr = [];
        for (let key in param) {
            arr.push(`${key}=${param[key]}`)
        }
        return arr.join("&")
    }

    //增加语言字段
    addLanguage(ctx, options) {
        if (!options.data) return options;

        const getQuery = () => {
            let qus = {};
            if (!isEmpty(ctx.query)) {
                qus = ctx.query;
            } else if (!isEmpty(ctx.request.body)) {
                qus = ctx.request.body;
            }
            return qus;
        }

        const query = getQuery(),
            instantiationId = query.instantiationId,
            language = query.language || "zh_CN";
        try {
            if (instantiationId && options.data.params) {
                let paramsJson = JSON.parse(options.data.params);
                if (!paramsJson.language) {
                    paramsJson["language"] = language;
                }
                options.data.params = JSON.stringify(paramsJson)
            } else if (!options.data.language && options.data.constructor === Object) {
                options.data["language"] = language;
            }
        } catch (error) {
            console.log("Api增加 language字段出错 " + error)
        }
        return options;
    }

    //去掉空值 key
    getRemoveEmpty(obj) {
        if (!obj) return null;
        let newObj = {};
        for (let key in obj) {
            let value = obj[key];
            try {
                if (
                    (value.constructor === String && value != "") ||
                    (value.constructor === Number)
                ) newObj[key] = value;
            } catch (error) {
            }
        }

        return newObj;
    }

    /**
     * 发送请求
     * @Author    lin.li@fengjr.com
     * @DateTime  2018-01-24
     * @copyright [copyright]
     * @license   [license]
     * @version   [version]
     * @param     {[type]}          param [description]
     * @return    {[type]}                [description]
     */
    async ajax(url, options) {
        const { ctx, config } = this;

        let _default = {
            method: "GET",
            basePath: config.API_DOMAIN.API_URL,
            // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
            contentType: "application/x-www-form-urlencoded",
            // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
            dataType: "json",
            timeout: 300000,
            data: {}
        }
        //合并参数
        options = Object.assign({}, _default, options);

        //去除空值 key
        // if (!isEmpty(options.data)) options.data = this.getRemoveEmpty(options.data);

        //增加language字段
        options = this.addLanguage(ctx, options);

        let result = null;
        try {
            result = await ctx.curl(options.basePath + url, options);
        } catch (error) {
            ctx.logger.error("api 调用失败：url = %s, param = %s", url, this.getObjectToString(options.data));
        }

        ctx.service.logHelper.apiLog(`${options.basePath + url}?${this.getObjectToString(options.data)}`);

        return result;
    }
}

module.exports = ServiceApi;