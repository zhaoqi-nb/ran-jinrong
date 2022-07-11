/*
 * @FileDescription    : 文件描述  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-05-15 14:50:11 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-10-We 10:42:45
 */
 
'use strict';


module.exports = appInfo => {

	const config = {
		//api path
		API_DOMAIN:{
            API_URL : 'http://172.19.228.125/research/',
            PERMISSIONS_URL: 'http://172.19.228.122:18180/privilege/',
        },
		//redis cache config
		redis     : {
			client: {
				host: "r-8vb6y8kzb3s9kj51vo.redis.zhangbei.rds.aliyuncs.com",
			},
        },
        cors:{
            credentials:true,
            allowMethods: 'GET,POST'
        },
		customLogger:{
            scheduleLogger: {
                file: process.env.NODE_SCHEDULELOGGER,
            },
        },
        fixedData:{
        },
		//日志配置
		logger: {
            dir: process.env.NODE_PROJECT_LOGPATH,
		}
	}

	return config;
}