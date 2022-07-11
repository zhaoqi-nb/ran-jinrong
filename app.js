/*
 * @FileDescription    : 文件描述  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-05 19:29:14 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-09-Sa 10:06:29
 */
 
'use strict';

const moment  = require('moment'),
      path    = require('path'),
      getSize = require('get-folder-size');

class AppBootHook {
    constructor(app) {
      this.app = app;
    }

    async didReady() {
    }

    async serverDidReady() {
        // Server is listening.
        //设置 启动项目版本
        getSize(path.join(__dirname, 'app'),/\/view\/|\/public\/|\/upload\//,(err, size) => {
            if (err) { throw err; }
            this.app.config.systemVersion = `${this.app.config.systemCode}-${moment().format("YYYYMMDD")}-${size}`;
        });
    }
}
  
module.exports = AppBootHook;