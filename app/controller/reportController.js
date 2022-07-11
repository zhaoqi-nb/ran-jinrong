/*
 * @FileDescription    : 获取公用属性  
 * @Author             : baoping.chen@fengjr.com
 * @Date               : 2018-09-26 16:59:06 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-08-Th 02:48:01
 */

'use strict';

const ServiceController = require('./serviceController'),
    moment = require('moment'),
    apiConfig = require('../../config/apiConfig'),
    _ = require('lodash');

class ReportController extends ServiceController {


    // 获取报告列表
    async getShowReportList() {
        const {
            ctx,
            config
        } = this;
        const query = ctx.query || {},
            //sysId = query.sysId,
            showType = query.showType || 1,
            currentPage = query.currentPage || 1,
            pageSize = query.pageSize || 10,
            title = query.title || "",
            operator = await this.getUserId();

        // if (!sysId || !sysUserId) {
        //     this.paramError();
        //     return;
        // }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.GETSHOWREPORTLIST, {
            method: "get",
            basePath: config.API_DOMAIN.CRM_URL,
            data: {
                showType,
                currentPage,
                pageSize,
                title,
                operator
            }
        })

        this.returnData(result.data);
    }

    //报告列表
    async getShowReportListForSaas() {
        const {
            ctx,
            config
        } = this;
        const query = ctx.query || {},
            showType = query.showType || 1,
            currentPage = query.currentPage || 1,
            pageSize = query.pageSize || 5,
            title = query.title || "",
            reportView = query.reportView && query.reportView !== '0' ? query.reportView : "",
            company = query.company || "",
            industry = query.industry || "",
            guestType = query.guestType,
            operator = await this.getUserId();


        if (!showType || !guestType) {
            this.paramError();
            return;
        }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.GETSHOWREPORTLISTFORSAAS, {
            method: "get",
            basePath: config.API_DOMAIN.CRM_URL,
            data: {
                // showType,
                // currentPage,
                // pageSize,
                // title,
                // reportView,
                // company,
                // industry,
                // guestType,
                ...query,
                reportView: query.reportView && query.reportView !== '0' ? query.reportView : "",
                operator
            }
        })
        if (result?.data?.data) {
            //遍历报告，加密报告pdf地址
            result?.data?.data?.rsList.map((item) => {
                item.report_addr = ctx.service.secretKey.getEncData(item.report_addr);
            })
        }

        this.returnData(result.data);
    }

    //相关报告列表
    async getRelateShowReportListForSaas() {
        const {
            ctx,
            config
        } = this;
        const query = ctx.query || {},
            currentPage = query.currentPage || 1,
            pageSize = query.pageSize || 5,
            reportId = query.reportId,
            operator = await this.getUserId();


        if (!reportId || !operator) {
            this.paramError();
            return;
        }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.GETRELATESHOWREPORTLISTFORSAAS, {
            method: "get",
            basePath: config.API_DOMAIN.CRM_URL,
            data: {
                currentPage,
                pageSize,
                reportId,
                operator
            }
        })

        this.returnData(result.data);
    }

    //收藏报告
    async collectGuestReport() {
        const {
            ctx,
            config
        } = this;
        const query = this.ctx.query || {},
            reportId = query.reportId,
            operator = await this.getUserId();

        if (!reportId || !operator) {
            this.paramError();
            return;
        }
        let param = {
            reportId,
            operator,
        }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.COLLECTGUESTREPORT, {
            basePath: config.API_DOMAIN.CRM_URL,
            data: param,
        })

        this.returnData(result.data);

    }

    //发送到邮箱录
    async addGuestReportJob() {
        const {
            ctx,
            config
        } = this;
        const query = ctx.request.body || {},
            reportId = query.reportId,
            operator = await this.getUserId();

        if (!reportId || !operator) {
            this.paramError();
            return;
        }

        const param = {
            reportId,
            operator,
        }

        //query data
        const result = await ctx.service.api.ajax(apiConfig.ADDGUESTREPORTJOB, {
            method: "POST",
            basePath: config.API_DOMAIN.CRM_URL,
            data: param,
        });
        this.returnData(result.data);
    }

    async transitionPDF() {
        const query = this.ctx.query || {},
            contractAddr = query.contractAddr,
            operator = await this.getUserId();;
        let param = {
            contractAddr,
            operator
        };
        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.REPORT_TRANSITIONPDF, {
            data: param,
            // method:"POST",
            basePath: this.config.API_DOMAIN.CRM_URL,
            dataType: "text",
            streaming: true,
        })

        this.ctx.set(result.headers);
        this.ctx.set('Content-Type', 'application/octet-stream;charset=utf-8');
        this.ctx.type = 'pdf';
        this.ctx.body = result.res;
    }

    async reportDownload() {
        const query = this.ctx.query || {},
            contractAddr = query.contractAddr,
            operator = await this.getUserId();;
        let param = {
            contractAddr,
            operator
        };
        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.REPORT_DOWNLOAD, {
            data: param,
            basePath: this.config.API_DOMAIN.CRM_URL,
            dataType: "text",
            streaming: true,
        })

        this.ctx.set(result.headers);
        this.ctx.set('Content-Type', 'application/octet-stream;charset=utf-8');
        this.ctx.type = 'pdf';
        this.ctx.body = result.res;
    }

    //报告详情
    async getReportInfoForGuest() {
        const {
            ctx,
            config
        } = this;
        const query = ctx.query || {},
            reportId = query.reportId,
            operator = await this.getUserId();

        if (!reportId || !operator) {
            this.paramError();
            return;
        }

        let param = {
            reportId,
            operator,
        }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.GETREPORTINFOFORGUEST, {
            method: "get",
            basePath: config.API_DOMAIN.CRM_URL,
            data: param,
        })

        if (result.data.code == 200) {
            let data = result.data.data;
            if (data && data.length) data[0]["operator"] = operator;
            //返回加密地址
            data[0].report_addr = ctx.service.secretKey.getEncData(data[0].report_addr);
            // this.success(data);
            // return;
        }

        this.returnData(result.data);
    }

    //申请查看
    async updateReportApplyInfo() {
        const {
            ctx,
            config
        } = this;
        const query = ctx.request.body || {},
            contactSysUserId = await this.getUserId(),
            reportId = query.reportId;
        // const { url, fetchType = "get", ...params} = query;

        console.log("申请报告1", query,ctx.request)
        if ( !reportId || !contactSysUserId) {
            this.paramError();
            return;
        }
        console.log("申请报告", query)
        const param = {
            reportId,
            source: 3,
            contactSysUserId,
        }

        //query data
        const result = await ctx.service.api.ajax(apiConfig.UPDATEREPORTAPPLYINFO, {
            method: "POST",
            basePath: config.API_DOMAIN.CRM_URL,
            data: param,
        });
        this.returnData(result.data);
    }

    //申请查看
    async reportCommonApi() {
        const { ctx, config } = this;
        const query = ctx.query || {},
            operator = await this.getUserId();
        const { url, method = "get", params } = query;

        if (!url || !operator) {
            this.paramError();
            return;
        }

        const param = {
            ...params,
            operator
        }

        //query data
        const result = await ctx.service.api.ajax(url, {
            method,
            basePath: config.API_DOMAIN.CRM_URL,
            data: param,
        });
        this.returnData(result.data);
    }
}

module.exports = ReportController;