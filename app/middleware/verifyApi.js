/*
 * @FileDescription    : 验证登录    
 * @Author             : lin.li@fengjr.com
 * @Date               : 2019-01-21 15:25:57 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: 2019-11-15 17:07:16
 */

'use strict';

const { getErrorCode } = require('../util/errorCode');

module.exports = () => {
    //验证 api cookie
    return async function verifyLogin(ctx, next) {
        //验证cookie
        let cookieAuth = await ctx.service.userService.checkUserCookie();
        if(!cookieAuth){
            ctx.body = getErrorCode('LOGIN_ERROR');
            return false;
        }
        //next
        await next();
    };
};
