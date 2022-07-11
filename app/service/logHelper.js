/*
 * @FileDescription    : 文件描述  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2019-01-21 15:06:41 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: 2020-05-15 16:49:05
 */
 
'use strict';

const   Service = require('egg').Service,
        parser  = require('ua-parser-js'),
        Base64  = require('js-base64').Base64;



const getLogStr = (ctx, type, other) =>{
    let logStr = "";

    try {
        let userInfo    = ctx.service.userService.getUserTockenCookie() || {},
            userId      = userInfo.sysUserId,
            userName    = userInfo.name,
            ifOutputLog = userInfo.ifOutputLog == undefined?true: userInfo.ifOutputLog,
            dept        = userInfo.dept,
            //device
            ip          = ctx.header["x-forwarded-for"]?ctx.header["x-forwarded-for"]: ctx.ip,
            ua          = parser(ctx.get('user-agent')),
            timeStamp   = (new Date).getTime();
        
        if(ifOutputLog) logStr  = `${type} - |${ip}|+|${ua.browser.name}|+|${ua.browser.version}|+|${ua.os.name}|+|${ua.os.version}|+|${ua.engine.name}|+|${userId}|+|${userName}|+|${dept}|+|${timeStamp}|+|${other}`
   } catch (error) {
        ctx.logger.error(new Error('解析日志字符串出错='+error));
   }
   return logStr;
}

const judgeNumber = (str)=>{
    var regex = /^[0-9,]*$/;
    return regex.test(str);
}


const getDecodeUrl = (ctx, url) =>{
    const getResId = (str) =>{
        try {
            let  temp = Base64.decode(str);
                temp = JSON.parse(temp);
            return temp.resId;
        } catch (error) {
            // ctx.logger.error(new Error('解析日志字符串出错='+error));
        }
        return null;
    }

    let arr = url.split("/");
    if(arr[4] == "config" && !judgeNumber(arr[5])){
        let temp = getResId(arr[5]);
        if(temp) arr[5] = temp;
    }else if(arr[3] == "page" && !judgeNumber(arr[4])){
        let temp = getResId(arr[4]);
        if(temp) arr[4] = temp;
    }
    
    return arr.join("/");
}

/**
 *  
 */
class LogHelper extends Service {
    //page access log
    accessLog(){
        const { ctx } = this;
        let node_env = ctx.service.env.getProjectEnv();
        if(node_env == "development") return;
        let url = getDecodeUrl(ctx, ctx.href);
        ctx.logger.info(getLogStr(ctx, "accessLog",`|+|${url}|+|`));
    }

    //log error
    logErr(msg,err){
        this.ctx.logger.error("-------------------------");
        this.ctx.logger.error(`异常报错 - ${msg} --- ${err}`);
        this.ctx.logger.error("-------------------------");
    }

    //page api log
    apiLog(url){
        const { ctx } = this;
        let node_env = ctx.service.env.getProjectEnv();
        let temp_url = getDecodeUrl(ctx, url);
        let temp_referer = ctx.accept.headers && ctx.accept.headers.referer?getDecodeUrl(ctx, ctx.accept.headers.referer):"";
        if(node_env == "development") ctx.logger.debug(temp_url);
        else ctx.logger.info(getLogStr(ctx, "apiLog",`|+|${temp_url}|+|${temp_referer}|+|`));
    }
}

module.exports = LogHelper;