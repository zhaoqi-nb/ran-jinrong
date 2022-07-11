/*
 * @FileDescription    : 文件描述  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-07 15:45:01 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-08-Tu 09:32:55
 */

'use strict';

const ServiceController = require('./serviceController'),
    apiConfig = require('../../config/apiConfig'),
    Base64 = require('js-base64').Base64;

const _ = require('lodash');

class LoginController extends ServiceController {
    async doLogin() {
        const { ctx, config } = this;
        const query = ctx.request.body || {},
            loginName = query.loginName,
            password = query.password,
            verifyCode = query.verifyCode || "1",
            redirectUrl = ctx.service.secretKey.getDecData(query.redirectUrl),
            ipAddress = ctx.header["x-forwarded-for"] ? ctx.header["x-forwarded-for"] : ctx.ip,
            proConfig = {
                systemCode: config.systemCode,
                template: "v1",
                transformMethods: "v5",
            };

        if (!loginName || !password || !verifyCode) {
            this.paramError();
            return;
        }

        const param = {
            loginName,
            password,
            verifyCode,
            ipAddress,
            proConfig: Base64.encode(JSON.stringify(proConfig))
        }

        //query data
        const result = await ctx.service.api.ajax(apiConfig.DOLOGIN, {
            method: "POST",
            data: param,
            basePath: config.API_DOMAIN.LOGIN_API_URL
        });

        if (result.data.code == 200) {
            try {
                let datas = result.data.data;
                let cookieResult = await this.setUserTokenCookie(datas);
                if (!cookieResult) {
                    this.paramError("LE");
                } else {
                    ctx.rotateCsrfSecret();
                    //返回数据
                    this.success({ redirectUrl: redirectUrl ? redirectUrl : "/" });
                }
            } catch (error) {
                this.logErr("登录失败！", error)
                this.paramError("LE")
            }
        } else {
            this.returnData(result.data);
        }
    }

    //退出登录
    async doLogout() {
        const { ctx, config } = this;

        let hostname = ctx.hostname;
        hostname = this.parseUrl(hostname);

        const option = {
            path: "/",
            domain: hostname,
        }

        //delete cookie
        ctx.cookies.set(config.cookieKey.userToken, null, option);

        //跳转页面
        ctx.redirect("/login");
    }

    //query all dept
    async resetPassword() {
        //获取参数
        const query = this.ctx.request.body || {},
            operatorId = await this.getUserId(),
            userId = query.userId,
            oldPassword = query.oldPassword,
            newPassword = query.newPassword,
            isEncoded = (_.get(query, 'isEncoded', 'true') === 'true');

        if (!userId || !oldPassword || !newPassword) {
            this.paramError();
            return;
        }

        //参数
        const param = {
            operatorId,
            userId,
            oldPassword: isEncoded ? Base64.decode(oldPassword) : oldPassword,
            newPassword: isEncoded ? Base64.decode(newPassword) : newPassword
        };
        // console.log('isEncodedisEncoded', typeof isEncoded)
        // console.log('paramparamparam12312312', param)

        //查询数据
        const result = await this.ctx.service.api.ajax(apiConfig.RESETPASSWORD, {
            basePath: this.config.API_DOMAIN.PERMISSIONS_URL,
            data: param
        });

        this.returnData(result.data);
    }
}

module.exports = LoginController;
