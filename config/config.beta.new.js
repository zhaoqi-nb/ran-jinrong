/*
 * @FileDescription    : 文件描述  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-05-15 14:50:11 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-08-Sa 04:24:44
 */
 
'use strict';

module.exports = appInfo => {
    const config = {
		//api path
		API_DOMAIN:{
            API_URL         : 'http://172.19.228.109:28580/research-finance-backend', // 测试环境
            PERMISSIONS_URL : 'http://172.19.228.109:18180/privilege/',       // java beta权限系统
            LOGIN_API_URL   : 'http://172.19.228.132', // 权限系统(只能ip，域名还不行)
            PASSPORT_URL    : "http://beta.passport.databurning.com",
            CRM_URL         : "http://172.24.4.37:84"

        },
		//redis cache config
		redis     : {
			client: {
				host: "172.19.228.122",
			},
        },
        cors:{
            origin: ctx => ctx.get('origin'),
            credentials:true,
            allowMethods: 'GET,POST'
        },
		customLogger:{
            scheduleLogger: {
                file: process.env.NODE_SCHEDULELOGGER,
            },
        },
        fixedData:{
           //公司id
           companyId: "13783",
           //行业id
           industryId: "13784",
           //品牌
           brandId  : "13786",
           //看板
           boardId  : "13785",
           //数据源
           dataSourceId: "13787",
           //app分析
           appId       : "14258",
        },
		//日志配置
		logger: {
            dir: process.env.NODE_PROJECT_LOGPATH,
		},
        cluster: {
            listen: {
                port: 7023,
            }
        },
	}

	return config;
}