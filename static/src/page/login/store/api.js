/*
 * @FileDescription    : api  
 * @Author             : baoping.chen@fengjr.com
 * @Date               : 2018-06-13 14:22:12 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: 2019-06-18 20:37:49
 */

'use strict';

import Server from '../../../plugin/Server';

class Api extends Server {
    //doLogin
    async doLogin(data = {}){
        return await this.Http({
            url: '/api/doLogin',
            type: "POST",
            data
        })
    }
    
    //getVerificationCode
    async getVerificationCode(data = {}){
        return await this.Http({
            url: '/api/usermanager/getVerificationCode',
            type: "POST",
            data
        })
    }

    //forgetAndResetPassword
    async forgetAndResetPassword(data = {}){
        return await this.Http({
            url: '/api/usermanager/forgetAndResetPassword',
            type: "POST",
            data
        })
    }

    async getResetPasswdVerificationCode(data = {}){
        return await this.Http({
            url: '/api/usermanager/getResetPasswdVerificationCode',
            type: "POST",
            data
        })
    }

    async getWXToken(data = {}){
        return await this.Http({
            url: '/api/wxAuth/getToken',
            data
        })
    }
    
    async getQrcode(data = {}){
        return await this.Http({
            url: '/api/wxAuth/getQrcode',
            data
        })
    }

    async waitToSubscribe(data = {}){
        return await this.Http({
            url: '/api/wxAuth/waitToSubscribe',
            data
        })
    }
    
}

export default new Api();