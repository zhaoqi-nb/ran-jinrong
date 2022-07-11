/*
 * @FileDescription    : 文件描述  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-05 16:59:06 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-08-We 10:48:21
 */

'use strict';

const ServiceController = require('./serviceController');
const Base64 = require('js-base64').Base64,
    apiConfig = require('../../config/apiConfig');

class DownloadController extends ServiceController {
    async batchDownloadList() {
        const {
            ctx,
            config
        } = this;
        const query = ctx.query || {};
        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.BATCHDOWNLOADLIST, {
            data: {
                ...query
            },
            // basePath: config.API_DOMAIN.PERMISSIONS_URL,
            // method: "POST",
            method: "GET",
            dataType: "text",
            streaming: true,
        })
        console.log('batch-download-list', result)

        this.returnData({
            code: 200,
            message: '成功',
            data: result?.data,
        });
    }

    async downloadDetail() {
        const {
            ctx,
            config
        } = this;
        const query = ctx.query || {};
        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.DOWNLOADDETAIL, {
            data: {
                ...query
            },
            // basePath: config.API_DOMAIN.PERMISSIONS_URL,
            // method: "POST",
            method: "GET",
            dataType: "text",
            streaming: true,
        })

        this.returnData({
            code: 200,
            message: '成功',
            data: result.data,
        });
    }

    async downloadBoardIndustry() {
        const {
            ctx,
            config
        } = this;
        const query = ctx.query || {};
        //query data
        // console.log('query=>', query)
        const result = await this.ctx.service.api.ajax(apiConfig.DOWNLOADBOARDINDUSTRY, {
            data: {
                ...query
            },
            // basePath: config.API_DOMAIN.PERMISSIONS_URL,
            // method:"POST",
            method: "GET",
            dataType: "text",
            streaming: true,
        })
        // console.log('query=>result', result)
        this.returnData({
            code: 200,
            message: '成功',
            data: result.data,
        });
    }


    async getDownloadList() {
        const { ctx } = this;
        const query = ctx.query || {};

        const result = await this.ctx.service.api.ajax(apiConfig.GETDOWNLOADLIST, {
            method: "POST",
            data: query,
            contentType: "json"
        })
        console.log('download-list', result);
        this.returnData(result?.data);
    }

    async matchNewestData() {
        const {
            ctx,
            config
        } = this;
        const query = ctx.query || {};
        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.MATCHNEWESTDATA, {
            data: {
                ...query
            },
            method: "GET",
            dataType: "text",
            streaming: true,
        })
        this.returnData({
            code: 200,
            message: '成功',
            data: result.data,
        });
    }

    async reDownload() {
        const {
            ctx,
            config
        } = this;
        const query = ctx.query || {};
        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.REDOWNLOAD, {
            data: {
                ...query
            },
            method: "GET",
            dataType: "text",
            streaming: true,
        })
        this.ctx.set(result.headers);
        this.ctx.set('Content-Type', 'application/octet-stream;charset=utf-8');
        this.ctx.type = 'xlsx';
        this.ctx.body = result.res;
    }


    async upDownloadFileName() {
        const {
            ctx,
            config
        } = this;
        const query = ctx.query || {};
        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.UPDOWNLOADFILENAME, {
            data: {
                ...query
            },
            method: "POST",
            contentType: "json"
        })
        this.returnData(result.data);
    }
}

module.exports = DownloadController;
