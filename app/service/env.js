'use strict'

//
const Service   = require('egg').Service;

/**
 *  获取项目环境变量
 */
class EnvService extends Service {
    //获取项目环境变量
    getProjectEnv(){
        return process.env.EGG_SERVER_ENV || process.env.NODE_ENV;
    }
}

module.exports = EnvService;