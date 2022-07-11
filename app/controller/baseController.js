/*
 * @FileDescription    : 文件描述  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-05 16:59:59 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-08-Tu 09:32:05
 */
 
'use strict';

//egg 的基类
const   {Controller} = require('egg');
const   Base64       = require('js-base64').Base64;
    
//公共基础Controller
class BaseController extends Controller {
    //----------- 公共方法 -----------------
    parseUrl(url){
        if(!url) return;
        var arr= url.split('.');
        var domain = "";
        //截取域名后两位
        for(let i = arr.length-2;i<arr.length;i++){
            domain+="."+arr[i]
        }
        return domain;
    }

    getCookieOption(maxAge){
        const  {ctx, config} = this;
        
        let     hostname = ctx.hostname;
                hostname = this.parseUrl(hostname);
        
        if(!maxAge) maxAge = config.redis.expire * 1000;

        return {
                    maxAge,
                    path    : "/",
                    domain  : hostname,
                    httpOnly: true,
                    signed  : false
                }
    }

    getCookie(key){
        if(!key) return;
        const   {ctx} = this;
        //get cookie
        try {
            let user = ctx.cookies.get(key, this.getCookieOption());
            return this.getDecode(user);    
        } catch (error) {
            console.log("获取cookie失败!");
        }
        return null;
    }

    //用户cookie
    getUserTockenCookie(){
        //get cookie value
        let key = this.ctx.app.config.cookieKey.userToken;
        return this.getCookie(key);
    }

    //get User cookie info
    getUserCookieInfo(){
        let userInfo = this.getUserTockenCookie();
        if(userInfo) return userInfo;
        return null;
    }

    //get login userId
    getUserId(){
        let userInfo = this.getUserCookieInfo();
        if(userInfo && userInfo.sysUserId) return  userInfo.sysUserId;
        return null;
    }

    //获取userBehavior cookie
    getUserBehaviorTokenCookie(){
        let cookieKey = this.config.cookieKey.userBehavior;
        return this.getCookie(cookieKey);
    }

    //decode
    getDecode(str){
        if(!str) return;
        let obj = this.ctx.service.secretKey.getDecData(str);
        if(!obj) return null;
        try {
            return JSON.parse(obj);
        } catch (error) {
            this.logErr("解析=${str} 出错")
            return obj;
        }
    }

    //encrypt
    getEncrypt(obj){
        if(!obj) return;
        let str = typeof obj == "string"?obj:JSON.stringify(obj);
        return this.ctx.service.secretKey.getEncData(str);
    }
    
     //解密
     getDecodeBase64(value){
        if(!value) return;
        let temp = null;
        try {
            //hash code
            temp = Base64.decode(value);
            //JSON string to Object
            temp = JSON.parse(temp);
        } catch (error) {
            this.logErr(`getDecodeBase64, value=${value} 解密出错`, error);
        }
        return temp;
    }

    //错误日志
    logErr(msg,err){
        this.ctx.service.logHelper.logErr(msg,err);
    }

    //设置redis
    async setRedis(key, str="", expire){
        if(!key) return;
       const { app, config } = this;
       try {
           let systemCode = config.systemCode;
           await app.redis.set(`${systemCode}_${key}`, str, "EX", expire?expire:config.redis.expire);
       } catch (error) {
           this.logErr(`redis 写入失败：key = ${key}, value = ${str}`, error);
       }
    }

    //查询redis
    async queryRedis(key){
        if(!key) return;
        const { app, config } = this;
        try {
           let systemCode = config.systemCode;
            let data = await app.redis.get(`${systemCode}_${key}`);
            return data;
        } catch (error) {
            this.logErr(`redis 获取失败 key = ${key}, systemCode = ${config.systemCode}`, error);
        }
        return null;
    }

    //----------- 跟页面或者Api相关 -----------------
    //没找到页面
    notFound(msg) {
        msg = msg || 'not found';
        this.ctx.throw(404, msg);
    }

    //return ajax data
    returnData(msg){
        //exceptions
        if(!msg){
            this.paramError('SE');
            return;
        }
        const code = msg.code;
        //exceptions
        if(code!=200){
            this.ctx.body = msg;
            return;
        }
        //ajax success
        this.success(msg.data);
    }

    //返回原数据
    returnOriginalData(msg){
        this.ctx.body = msg;
    }
    
    //ajax success
    success(data) {
        this.ctx.body = {
            code: 200,
            message: "",
            data
        };
    }

    //parameters exceptions
    paramError(type) {
        let ErrorObject = null;
        switch(type){
            //service exceptions
            case 'SE':
                ErrorObject = {
                    'code': 505,
                    'message': '服务异常'
                }
            break;
            //login error
            case 'LE':
                ErrorObject = {
                    'code': 505,
                    'message': '登录失败'
                }
            break;
            //the logged in user does not exist
            case 'UN':
                ErrorObject = {
                    'code': 505,
                    'message': '用户不存在'
                }
            break;
            case 'ULE':
                ErrorObject = {
                    'code': 505,
                    'message': '上传出错'
                }
            break;
            //parameters exceptions
            default:
                ErrorObject = {
                    'code': 500,
                    'message': '参数错误'
                }
        }

        this.ctx.body = ErrorObject;
    }

    //redirect login
    goToLogin(ifRedirect=true){
        const { ctx } = this;
        let url  = ctx.url;
        let path = "/login"
        if(url.indexOf("/api/")==-1 && url.indexOf("/login")==-1 && ifRedirect){
            let redirectUrl = ctx.service.secretKey.getEncData(url);
            path+=`?redirectUrl=${redirectUrl}`
        }
        ctx.redirect(path);
    }
}

module.exports = BaseController;