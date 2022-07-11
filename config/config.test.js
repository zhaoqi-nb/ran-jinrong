/*
 * @FileDescription    : 文件描述  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-05-15 14:50:11 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-08-Sa 04:25:01
 */

'use strict';

module.exports = appInfo => {
    const config = {
        //api path
        API_DOMAIN: {
            API_URL: 'http://172.19.228.122:28580/research-finance-backend',
            PERMISSIONS_URL: 'http://172.19.228.122:18180/privilege/',
            LOGIN_API_URL: "http://172.19.228.123",
            PASSPORT_URL: "http://passport.test.inc",
            CRM_URL: "http://172.19.228.122:18380",
            CONTENT_MANAGE_URL: 'http://172.19.228.122:28980'
        },
        //redis cache config
        redis: {
            client: {
                host: '172.19.228.122',
            },
        },
        cors: {
            origin: ctx => ctx.get('origin'),
            credentials: true,
            allowMethods: 'GET,POST'
        },
        customLogger: {
            scheduleLogger: {
                file: process.env.NODE_SCHEDULELOGGER,
            },
        },
        fixedData: {
            //公司id
            companyId: "9701",
            //行业id
            industryId: "9702",
            //品牌
            brandId: "9802",
            //看板
            boardId: "9786",
            //数据源
            dataSourceId: "14422",
            //app分析
            appId: "14423",
        },
        //日志配置
        logger: {
            dir: process.env.NODE_PROJECT_LOGPATH,
        }
    }

    return config;
}