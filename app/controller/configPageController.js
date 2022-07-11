'use strict';

const ServiceController = require('./serviceController'),
    apiConfig = require('../../config/apiConfig');

class ConfigPageController extends ServiceController {

    async getChartData() {
        const { ctx } = this;
        const query = ctx.query || {},
            instantiationId = query.instantiationId,
            type = query.type,
            params = query.params,
            //url是否是定制化接口
            url = query.url,
            sysUserId = this.getUserId();

        if (!sysUserId || !instantiationId) {
            this.paramError();
            return;
        }
        let param = {
            sysUserId,
            instantiationId,
            params,
        };
        let result = {}
        let datas = {}
        if (type && type.indexOf("loop") > -1) {
            const paramsObj = JSON.parse(params);
            paramsObj.operatorId = sysUserId;
            const codeKey = paramsObj.codeKey
            const select_codes_data = paramsObj[`${codeKey}_data`]
            const loopData = []
            if (Array.isArray(select_codes_data)) {
                for (let i = 0; i < select_codes_data.length; i++) {
                    const item = select_codes_data[i].zb_code
                    let codeParam = {}
                    codeParam[codeKey] = item
                    codeParam["first_content_name"] = select_codes_data[0].zb_code
                    const newParams = Object.assign({}, JSON.parse(params), codeParam)
                    param.params = JSON.stringify(newParams)
                    const res = await ctx.service.api.ajax(url ? url : apiConfig.CONFIG_GETTEMPLATEDATA, {
                        method: "get",
                        data: param
                    });
                    if (res.data.code == 200) {
                        loopData.push(Object.assign({}, res.data.data, { zb_code: select_codes_data[i] }))
                    }
                }
            }
            try {
                datas = this.ctx.service.dataProcess.configPageProcess.processLoopChartData(loopData, JSON.parse(params));
                this.success(datas);
            } catch (e) {
                console.log("转换图表出错");
            }
        } else {
            result = await ctx.service.api.ajax(url ? url : apiConfig.CONFIG_GETTEMPLATEDATA, {
                method: "get",
                data: param // JSON.parse(params)
            });
            console.log("请求图", result, result.data, "哈哈哈", result.data.data)
            if (result.data.code == 200) {
                try {
                    datas = result.data.data;
                    datas = this.ctx.service.dataProcess.configPageProcess.processNormalChartData(datas, JSON.parse(params));
                    this.success(datas);
                } catch (error) {
                    console.log("转换图表出错");
                }
            }
        }

        this.returnData({
            code: 200,
            msg: 'success',
            data: datas
        });
    }


    async getSelectedZbInfo() {
        const { ctx } = this;
        const query = ctx.query || {},
            // date_type = query.date_type,
            params = query.params,
            url = query.url,
            instantiationId = query.instantiationId;

        if (!instantiationId) {
            this.paramError();
            return;
        }
        let param = {
            // date_type,
            ...params,
            instantiationId,
        };
        const result = await ctx.service.api.ajax(url ? url : apiConfig.ZB_GETSELECTEDZBINFO, {
            method: "get",
            data: param
        });

        if (result.data.code == 200) {
            try {
                let datas = result.data.data;
                this.success(datas);
            } catch (error) {
                console.log("转换图表出错");
            }
        }

        this.returnData(result.data);
    }

    async getTemplateData() {
        const { ctx } = this;
        const query = ctx.query || {},
            instantiationId = query.instantiationId,
            params = query.params,
            operatorId = this.getUserId(),
            userGroupId = await this.getUserGroupId();

        if (!operatorId || !instantiationId || !userGroupId) {
            this.paramError();
            return;
        }
        let param = {
            instantiationId,
            params: params
                ? JSON.stringify({ ...JSON.parse(params), operatorId, userGroupId })
                : { operatorId, userGroupId },
        };
        const result = await ctx.service.api.ajax(apiConfig.CONFIG_GETTEMPLATEDATA, {
            method: "get",
            data: param
        });
        this.returnData(result.data);
    }


    //查询配置化表格数据
    async getQueryTableData() {
        const query = this.ctx.query || {},
            instantiationId = query.instantiationId,
            params = query.params,
            type = query.type || "trend",
            operatorId = this.getUserId(),
            userGroupId = await this.getUserGroupId(),
            headerMapping = query.headerMapping,
            //定制化url
            url = query.url;

        if (!instantiationId || !operatorId || !userGroupId) {
            this.paramError();
            return;
        }

        let param = {
            params: params
                ? JSON.stringify({ ...JSON.parse(params), operatorId, userGroupId })
                : { operatorId, userGroupId },
        };
        if (instantiationId !== 'noId') {
            param.instantiationId = instantiationId
        }

        //query data
        const result = await this.ctx.service.api.ajax(url ? url : apiConfig.CONFIG_GETTEMPLATEDATA, {
            data: param
        })

        if (result && result.data && result.data.code == 200) {
            try {
                let datas = result.data.data.result;
                if (type == "trend" || type == "section" || type == "trendChart") datas = this.ctx.service.dataProcess.configPageProcess.processSimpleTableData(datas, JSON.parse(headerMapping), JSON.parse(params));
                this.success(datas);
                return;
            } catch (error) {
                this.logErr('查询配置化表格查询数据出错', error);
            }
        }
        this.success(result && result.data ? result.data : null);
    }

    async getLoopIndustryTableData() {
        const query = this.ctx.query || {},
            instantiationId = query.instantiationId,
            params = query.params,
            headerMapping = query.headerMapping,
            //定制化url
            url = query.url;

        if (!instantiationId) {
            this.paramError();
            return;
        }

        const param = {
            instantiationId,
            params,
        };

        //query data
        const result = await this.ctx.service.api.ajax(url ? url : apiConfig.CONFIG_GETTEMPLATEDATA, {
            data: param
        })

        if (result && result.data && result.data.code == 200) {
            try {
                let datas = result.data.data.result.trend || [result.data.data.result];
                let arr = [];
                for (let i = 0, len = datas.length; i < len; i++) {
                    let obj = datas[i];
                    let temp = this.ctx.service.dataProcess.configPageProcess.processSimpleTableData(obj, JSON.parse(headerMapping), JSON.parse(params));
                    arr.push(temp)
                }
                this.success(arr);
                return;
            } catch (error) {
                this.logErr('查询配置化表格查询数据出错', error);
            }
        }
        this.success(result && result.data ? result.data : null);
    }

    async addIndustryContrastId() {
        const { ctx } = this;
        const query = ctx.query || {};

        const result = await ctx.service.api.ajax(apiConfig.ADD_INDUSTRY_CONTRASTID, {
            method: "post",
            data: query
        });

        console.log('pa12312ramsparamsparams', query)

        if (result.data.code == 200) {
            try {
                let datas = result.data.data;
                this.success(datas);
            } catch (error) {
                console.log("接口请求错误");
            }
        }

        this.returnData(result.data);
    }

    async getIndustryContrastId() {
        const { ctx } = this;
        const query = ctx.query || {}
        // date_type = query.date_type,

        const result = await ctx.service.api.ajax(apiConfig.GET_INDUSTRY_CONTRASTID, {
            method: "get",
            data: query
        });

        if (result.data.code == 200) {
            try {
                let datas = result.data.data;
                this.success(datas);
            } catch (error) {
                console.log("接口请求错误");
            }
        }

        this.returnData(result.data);
    }

    async getIndustryId() {
        const { ctx } = this;
        const query = ctx.query || {}
        // date_type = query.date_type,

        const result = await ctx.service.api.ajax(apiConfig.GET_INDUSTRY_ID, {
            method: "get",
            data: query
        });

        if (result.data.code == 200) {
            try {
                let datas = result.data.data;
                this.success(datas);
            } catch (error) {
                console.log("接口请求错误");
            }
        }

        this.returnData(result.data);
    }

    async getBrandFinanceInfo() {
        const { ctx } = this;
        const query = ctx.query || {}
        const result = await ctx.service.api.ajax(apiConfig.GET_BRAND_FINANCE_INFO, {
            method: "get",
            data: query
        });

        if (result.data.code == 200) {
            try {
                let datas = result.data.data;
                this.success(datas);
            } catch (error) {
                console.log("接口请求错误");
            }
        }

        this.returnData(result.data);
    }

    async getEcommerceHotList() {
        const { ctx } = this;
        const query = ctx.query || {}
        const result = await ctx.service.api.ajax(apiConfig.GET_ECOMMERCE_HOT_LIST, {
            method: "get",
            data: query
        });

        if (result.data.code == 200) {
            try {
                let datas = result.data.data;
                this.success(datas);
            } catch (error) {
                console.log("接口请求错误");
            }
        }

        this.returnData(result.data);
    }

    async getEcommerceSearchHistoryList() {
        const { ctx } = this;
        const query = ctx.query || {}
        const result = await ctx.service.api.ajax(apiConfig.GET_ECOMMERCE_HISTORY_LIST, {
            method: "get",
            data: query
        });

        if (result.data.code == 200) {
            try {
                let datas = result.data.data;
                this.success(datas);
            } catch (error) {
                console.log("接口请求错误");
            }
        }

        this.returnData(result.data);
    }

    async getSearchList() {
        const { ctx } = this;
        const query = ctx.query || {}
        const result = await ctx.service.api.ajax(apiConfig.GET_SEARCH_LIST, {
            method: "get",
            data: query
        });

        if (result.data.code == 200) {
            try {
                let datas = result.data.data;
                this.success(datas);
            } catch (error) {
                console.log("接口请求错误");
            }
        }

        this.returnData(result.data);
    }


    async getBrandDetailList() {
        const { ctx } = this;
        const query = ctx.query || {}
        const result = await ctx.service.api.ajax(apiConfig.GET_BRAND_DETAIL_LIST, {
            method: "get",
            data: query
        });

        if (result.data.code == 200) {
            try {
                let datas = result.data.data;
                this.success(datas);
            } catch (error) {
                console.log("接口请求错误");
            }
        }

        this.returnData(result.data);
    }

    async delEcommerceSearchHistoryList() {
        const { ctx } = this;
        const query = ctx.query || {}
        const result = await ctx.service.api.ajax(apiConfig.DEL_ECOMMERCE_SEARCH_HISTORY_LIST, {
            method: "post",
            data: query
        });

        if (result.data.code == 200) {
            try {
                let datas = result.data.data;
                this.success(datas);
            } catch (error) {
                console.log("接口请求错误");
            }
        }

        this.returnData(result.data);
    }

}

module.exports = ConfigPageController;
