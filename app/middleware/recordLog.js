/*
 * @FileDescription    : 记录日志    
 * @Author             : lin.li@fengjr.com
 * @Date               : 2019-01-21 15:25:57 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: 2019-01-21 16:29:38
 */
 
'use strict';

module.exports = () => {
    return async function recordLog(ctx, next) {
        //记录访问日志
        ctx.service.logHelper.accessLog();
        //next
        await next();
    };
};
