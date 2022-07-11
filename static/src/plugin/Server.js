/*
 * @FileDescription    : http request  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-08 17:05:54 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-08-Tu 04:14:32
 */

'use strict';
import reqwest from 'reqwest';
import { message } from 'antd';
import * as Cookies from 'js-cookie'
import { transformText, getCurrentLanguage } from '../page/component/locales/index';
import i18n from '@/plugin/i18n'

export default class Server {
    //增加语言字段
    addLanguage(options) {
        if (!options.data) return options;
        const language = i18n.getLocalLanguage() //getCurrentLanguage();
        // console.log('getCurrentLanguage', getCurrentLanguage())
        try {
            if (options.data.instantiationId && options.data.params) {
                let paramsJson = JSON.parse(options.data.params);
                if (!paramsJson.language) {
                    paramsJson["language"] = language;
                }
                options.data.params = JSON.stringify(paramsJson)
            } else if (!options.data.language) {
                options.data["language"] = language;
            }
        } catch (error) {
            console.log("Api增加 language字段出错 " + error)
        }
        return options;
    }

    //增加汇率字段
    // addExchangeRate(options) {
    //     if (!options.data) return options;
    //     const currentExchangeRate = this.getCurrentExchangeRate()
    //     options.data["now_currency"] = currentExchangeRate
    //     return options;
    // }

    // getCurrentExchangeRate() {
    //     return window.localStorage.currentExchangeRate
    // }

    Http(params) {
        let defaultParam = {
            url: "",
            type: "get",
            dataType: "json",
            isLoading: false,
            data: {}
        }
        //get token 
        const csrfToken = Cookies.get('csrfToken') || "";
        // if(!csrfToken){
        //     message.error("请求异常，请重新刷新页面！");
        //     return;
        // }

        //consolidation parameters
        let option = Object.assign({}, defaultParam, params);
        //增加语言
        option = this.addLanguage(option);
        //增加汇率字段
        // option = this.addExchangeRate(option);

        //api request
        function Cons(resolve, reject) {
            let loading = null;
            if (option.isLoading) loading = message.loading(`${i18n.format('加载中')}...`, 0);
            reqwest({
                url: option.url,
                method: option.type,
                data: option.data,
                type: option.dataType,
                timeout: 1200000,
                headers: {
                    'x-csrf-token': csrfToken,
                }
            }).then((msg) => {
                if (loading) setTimeout(loading, 1);
                if (msg.code == 200) {
                    resolve(msg);
                } else if (msg.code == 405) {
                    if ((location.href).indexOf("/api/v1/page/") == -1) location.href = "/login";
                    else location.reload()
                } else {
                    message.error(transformText(msg.message));
                    resolve(msg);
                }
            }).fail(function (err, msg) {
                message.error(err);
                resolve(err);
            }).always(function (resp) {
            })
        }
        return new Promise(Cons);
    }

    HttpPost(params) {
        let defaultParam = {
            url: "",
            type: "post",
            dataType: "json",
            isLoading: false,
            data: {},
        }
        //get token
        const csrfToken = Cookies.get('csrfToken') || "";
        // if(!csrfToken){
        //     message.error("请求异常，请重新刷新页面！");
        //     return;
        // }

        //consolidation parameters
        let option = Object.assign({}, defaultParam, params);
        //增加语言
        option = this.addLanguage(option);

        //api request
        function Cons(resolve, reject) {
            let loading = null;
            if (option.isLoading) loading = message.loading(`${i18n.format('加载中')}...`, 0);
            reqwest({
                url: option.url,
                method: option.type,
                data: JSON.stringify(option.data),
                type: option.dataType,
                timeout: 1200000,
                contentType: "application/json",
                processData: false,
                headers: {
                    'x-csrf-token': csrfToken,
                }
            }).then((msg) => {
                if (loading) setTimeout(loading, 1);
                if (msg.code == 200) {
                    resolve(msg);
                } else if (msg.code == 405) {
                    if ((location.href).indexOf("/api/v1/page/") == -1) location.href = "/login";
                    else location.reload()
                } else {
                    message.error(transformText(msg.message));
                    resolve(msg);
                }
            }).fail(function (err, msg) {
                message.error(err);
                resolve(err);
            }).always(function (resp) {
            })
        }
        return new Promise(Cons);
    }
}