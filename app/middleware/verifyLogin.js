/*
 * @FileDescription    : 验证登录    
 * @Author             : lin.li@fengjr.com
 * @Date               : 2019-01-21 15:25:57 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: 2020-04-30 15:08:19
 */

'use strict';



module.exports = () => {
    let goToLogin = (ctx) => {
        const url = ctx.url;
        const query = ctx.query || {},
            language = query.language || "zh_CN";

        let path = "/login"
        if (url.indexOf("/api/") == -1) {
            let redirectUrl = ctx.service.secretKey.getEncData(url);
            path += `/${language}?redirectUrl=${redirectUrl}`
        }
        ctx.redirect(path);
    }
    //验证登录
    return async function verifyLogin(ctx, next) {
        //验证cookie
        let cookieAuth = await ctx.service.userService.checkUserCookie();
        if (!cookieAuth) {
            goToLogin(ctx);
            return false;
        }
        //next
        await next();
    };
};
