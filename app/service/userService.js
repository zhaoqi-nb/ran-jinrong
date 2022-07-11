/*
 * @FileDescription    : 文件描述  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2019-01-21 14:53:51 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-08-Th 02:27:48
 */
 
'use strict';

const Service   = require('egg').Service;
const userAgent = require("../util/userAgent"),
      Base64    = require('js-base64').Base64;

const parseUrl=(url)=>{
    if(!url) return;
    var arr= url.split('.');
    var domain = "";
    //截取域名后两位
    for(let i = arr.length-2;i<arr.length;i++){
        domain+="."+arr[i]
    }
    return domain;
}


/**
 *  
 */
class UserService extends Service {
    //decode
    getDecode(str){
        if(!str) return;
        let obj = this.ctx.service.secretKey.getDecData(str);
        if(!obj) return null;
        return JSON.parse(obj);
    }

    //encrypt
    getEncrypt(obj){
        if(!obj) return;
        return this.ctx.service.secretKey.getEncData(JSON.stringify(obj));
    }
    //get cookie value
    getCookieVal(key){
        if(!key) return;
        const {ctx} = this;
        let hostname = ctx.hostname;
            hostname = parseUrl(hostname);
        const   option   = {
                    path   : "/",
                    domain : hostname,
                    httpOnly:true,
                    signed: false,
                }
        //get cookie
        return ctx.cookies.get(key, option);
    }

    //get cookie
    getCookie(key){
        if(!key) return;
        //get cookie value
        let str  = this.getCookieVal(key);
        return this.getDecode(str);
    }

    //用户cookie
    getUserTockenCookie(){
        //get cookie value
        let key = this.ctx.app.config.cookieKey.userToken;
        return this.getCookie(key);
    }
    
    //设置cookie
    setCookie(data){
        const  {ctx, config} = this;
        try {
            let     hostname = ctx.hostname;
                    hostname = parseUrl(hostname);
            const   option   = {
                        //4小时
                        maxAge  : 4 * 3600 * 1000,
                        path    : "/",
                        domain  : hostname,
                        httpOnly: true,
                        signed  : false
                    }
            //添加版本
            data["version"] = config.systemVersion;
            //encrypt
            const user = this.getEncrypt(data);
            //set cookie
            ctx.cookies.set(config.cookieKey, user, option);
        } catch (error) {
            ctx.logger.error("添加cookie出错 Error= %s",error);
            return false;
        }
        return true;
    }

    //验证用户cookie
    async checkUserCookie(){
        const {ctx, config} = this;

        const checkTimeInterval = (obj) =>{
            if(!obj || !obj.time) return false;
            //验证 时间戳
            let time_interval = new Date().getTime() - parseInt(obj.time);
            if(time_interval>60000 * 60 * 6) return false;
            else return true;
        }

        const checkBrowser = (obj) =>{
            if(!obj || !obj.browser) return false;
            let user_agent = ctx.get('user-agent');
            let browser    = userAgent.judgeTerminalBrowser(user_agent);
            if(JSON.stringify(browser)!=JSON.stringify(obj.browser)) return false;
            else return true;
        }

        try {
            //get cookie
            let auth          = this.getUserTockenCookie();
            if(!auth || !checkTimeInterval(auth) || !checkBrowser(auth)) return false;
            else{
                if(auth.source) return true;
                else{
                    let userCache = await this.queryRedis(auth.sysUserId, auth.tocken);
                    if(userCache) return true;
                    else return false;
                }
            }
        } catch (error) {
            ctx.logger.error(`拦截器checkUserCookie 发生错误=${error}`);
        }
        return false;
    }

    async queryRedis(key, tocken){
        if(!key) return false;
        const { ctx, app, config } = this;
        try {
           let systemCode = config.systemCode;
            let data = await app.redis.get(`${systemCode}_${key}`);
                data = Base64.decode(data);
            ctx.logger.error(`获取key=${systemCode}_${key}_${tocken}`);
            return `${systemCode}_${key}_${tocken}` == data;
        } catch (error) {
            ctx.logger.error(`redis 获取失败 key = ${key}, systemCode = ${config.systemCode} error=${error}`);
        }
        return null;
    }

    //设置用户信息
    async setUserCookieInfo(key, value){
        if(!key || !value) return false;
        try {
            let userCookie = await this.getCookie();
            if(userCookie){
                let user_behavior = userCookie["user_behavior"] || {};
                user_behavior[key] = value;
                userCookie["user_behavior"] = user_behavior;
                this.setCookie(userCookie);
            }
            return true;
        } catch (error) {
            ctx.logger.error(`设置用户信息 发生错误=${error}`);
        }
        return false;
    }
}

module.exports = UserService;