/*
 * @FileDescription    : plugin config
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-05-15 14:57:49 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: 2019-05-18 16:10:26
 */
 
'use strict';

module.exports = {
	//template
	nunjucks: {
		enable : true,
		package: 'egg-view-nunjucks',
	},
	//redis cache
	redis: {
		enable: true,
		package: 'egg-redis',
    },
	//Print log 
	logrotator: {
		enable: true,
		package: 'egg-logrotator',
    },
    cors: {
		enable: true,
		package: 'egg-cors',
    },
	httpProxy: {
		enable: false,
		package: 'egg-http-proxy',
	}
}