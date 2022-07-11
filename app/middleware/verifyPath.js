/*
 * @FileDescription    : 验证登录    
 * @Author             : lin.li@fengjr.com
 * @Date               : 2019-01-21 15:25:57 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: 2019-01-21 16:29:38
 */
 
'use strict';

module.exports = () => {
    //验证 访问路径
    return async function verifyPath(ctx, next) {
        //特殊判断
        if(ctx.hostname == "www.databurning.com" && ctx.path=="/"){
            ctx.redirect("/");
            return false;
        }
        //next
        await next();
    };
};
