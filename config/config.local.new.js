/*
 * @FileDescription    : 文件描述  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-05-15 14:50:11 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-10-We 02:42:47
 */

'use strict';

const PATH = require('path');

module.exports = appInfo => {
    const config = {
        //api path
        API_DOMAIN: {
            API_URL: 'http://172.24.4.43:28580/research-finance-backend',
            PERMISSIONS_URL: 'http://172.24.4.43:18180/privilege/',
            LOGIN_API_URL: "http://172.24.4.43:7002",
            TEMPLATE_API_URL: "http://172.24.4.43:28580/research-finance-backend",
            PASSPORT_URL: "http://passport.test.inc",
            CRM_URL: "http://172.24.4.43:18380",
            CONTENT_MANAGE_URL: 'http://172.24.4.43:28980'

        },
        //redis cache config
        redis: {
            client: {
                host: '172.24.4.49',
            },
        },
        cors: {
            credentials: true,
            allowMethods: 'GET,POST'
        },
        customLogger: {
            scheduleLogger: {
                // consoleLevel: 'NONE',
                file: PATH.join(appInfo.baseDir, 'logs', 'egg-schedule.log'),
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

            // app三期
            // 对比页面
            appCompareId: "15131",
            // 详情
            appDetailId: "15133",
        },
        //log config
        logger: {
            dir: PATH.join(appInfo.baseDir, './logs/'),
        }
    }

    return config;
}