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

class CommonController extends ServiceController {
    //获取时间插件时间范围
    async getTimeRange() {
        const query = this.ctx.query || {},
            transformMethods = query.transformMethods || "v1",
            dateOpenMode = query.dateOpenMode,
            date_type = query.date_type,
            sysId = query.sysId,
            operatorId = await this.getUserId(),
            node_env = this.ctx.service.env.getProjectEnv();

        // if(!operatorId){
        //     this.paramError();
        //     return;
        // }
        let start_date = "20180101";
        let end_date = moment();

        //数据开放模式，可以设定菜单开放时间
        if (dateOpenMode) {
            try {
                let temp_dateOpenMode = JSON.parse(dateOpenMode);
                if (temp_dateOpenMode.constructor === Object) temp_dateOpenMode = [temp_dateOpenMode];
                let temp = this.getTransformMethods_common(date_type, temp_dateOpenMode);
                start_date = temp.start_date;
                end_date = temp.end_date;
            } catch (error) {
                console.log("自定义模式解析出错=" + error)
            }
        } else {
            try {
                let result = await this.getCoachConfig(`transformMethods_${transformMethods}`, sysId)
                // console.log('result=>', result);
                if (result.data.code == 200) {
                    let data = result.data.data,
                        firstData = data[0],
                        config_attr = firstData.config_attr ? JSON.parse(firstData.config_attr) : {};

                    let temp = this.getTransformMethods_common(date_type, config_attr)
                    start_date = temp.start_date;
                    end_date = temp.end_date;
                }
            } catch (error) {
                console.log("固定模式解析出错=" + error)
            }
        }

        //如果是测试 或者开发 或者beta环境访问，默认日期都是前一天test development
        // if (node_env == "test" || node_env == "development" || node_env == "beta") {
        //     end_date = moment().subtract(1, "day").format('YYYYMMDD');
        // }

        this.returnData({
            code: 200,
            data: [start_date, end_date]
        });
    }

    //一级市场日期范围
    async getDataOpenTime() {
        const { ctx, config } = this;
        const query = ctx.query || {},
            params = query.params,
            rootInstantiationId = query.rootInstantiationId;

        let param = {
            rootInstantiationId,
            params
        };

        const result = await ctx.service.api.ajax(apiConfig.GETDATAOPENTIME, {
            method: "get",
            basePath: config.API_DOMAIN.API_URL,
            data: param
        });

        this.returnData(result.data)
    }

    //一级市场数据周期接口
    async getDataCycle() {
        const { ctx, config } = this;
        const query = ctx.query || {},
            params = query.params,
            rootInstantiationId = query.rootInstantiationId;

        let param = {
            rootInstantiationId,
            params
        };

        const result = await ctx.service.api.ajax(apiConfig.GETDATACYCLE, {
            method: "get",
            basePath: config.API_DOMAIN.API_URL,
            data: param
        });

        this.returnData(result.data);
    }

    getTransformMethods_common(date_type, data) {
        let obj = data.find(item => item.date_type == date_type);
        let temp_date = null;
        if (date_type == "day") {
            temp_date = this.getDayInterval(obj);
        } else if (date_type == "week" || date_type == "week_yyyyww") {
            temp_date = this.getWeekInterval(obj);
        } else if (date_type == "month" || date_type == "ytd") {
            temp_date = this.getMonthInterval(obj);
        } else if (date_type == "quarter") {
            temp_date = this.getQuarterInterval(obj);
        } else if (date_type == "halfYear") {
            temp_date = this.getHalfYearInterval(obj);
        } else if (date_type == "year") {
            temp_date = this.getYearInterval(obj);
        }

        return {
            start_date: temp_date && temp_date.start_date ? moment(temp_date.start_date).format('YYYYMMDD') : "20180101",
            end_date: temp_date && temp_date.end_date ? moment(temp_date.end_date).format('YYYYMMDD') : moment().subtract(1, "day").format('YYYYMMDD'),
        };
    }

    //天
    getDayInterval(obj = {}) {
        let end_date = moment();
        let hour = moment().format('HH');
        //如果当前时间 大于8点 向前推1天， 如果小于8点，向前推2天
        let date_interval = parseInt(obj.date_interval || 8);
        if (hour > date_interval) {
            end_date = moment(end_date).subtract(1, "day")
        } else {
            end_date = moment(end_date).subtract(2, "day")
        }
        return {
            end_date
        };
    }

    //周
    getWeekInterval(obj = {}) {
        let end_date = moment();
        //如果showDate 大于 最大日期，则直接返回最大日期
        let nowDay = moment().isoWeekday();
        let date_delay = obj.date_delay ? Number(obj.date_delay) : null;
        let date_interval = parseInt(obj.date_interval || 2)
        if (nowDay > date_interval) {
            if (date_delay) end_date = moment(end_date).subtract(date_delay, "isoWeek");
            else end_date = moment(end_date).subtract(1, "isoWeek");
        } else {
            if (date_delay) end_date = moment(end_date).subtract(date_delay + 1, "isoWeek");
            else end_date = moment(end_date).subtract(2, "isoWeek");
        }

        //设置本周都可以选择
        end_date = moment(end_date).endOf('isoWeek');

        return {
            start_date: moment(end_date).subtract(11, "isoWeek").startOf('isoWeek'),
            end_date
        };
    }

    //月
    getMonthInterval(obj = {}) {
        let end_date = moment();
        let nowDay = moment().format("DD");
        let date_delay = obj.date_delay ? Number(obj.date_delay) : null;
        //如果当天大于本月9号，则向前推1个月，如果小于，则向前推2个月
        let date_interval = parseInt(obj.date_interval || 9);
        if (nowDay > date_interval) {
            if (date_delay) end_date = moment(end_date).subtract(date_delay, "month");
            else end_date = moment(end_date).subtract(1, "month");
        } else {
            if (date_delay) end_date = moment(end_date).subtract(date_delay + 1, "month");
            else end_date = moment(end_date).subtract(2, "month");
        }

        return {
            end_date
        };
    }

    //季度
    getQuarterInterval(obj = {}) {
        let end_date = moment();
        let year = moment().year();
        let month = moment().format("M");
        let day = moment().format("D");
        let quarter = moment().quarter();
        let startMonth = moment(moment(`${year}-01-01`).toDate()).quarter(quarter).format("M");

        //当9号后可以看上季度的数据
        let date_interval = parseInt(obj.date_interval || 9);
        if (month > startMonth || (month == startMonth && day > date_interval)) {
            end_date = moment().subtract(1, 'quarter')
        } else end_date = moment().subtract(2, 'quarter')

        return {
            end_date
        };
    }

    //半年
    getHalfYearInterval(obj = {}) {
        let end_date = moment();
        let year = moment().year();
        let month = moment().format("M");
        let day = moment().format("D");
        //当9号后可以看上半年的数据
        let date_interval = parseInt(obj.date_interval || 9);

        if ((month == 7 && day > date_interval) || month > 7) {
            end_date = moment(`${year}08`, 'YYYYMM');
        } else if ((month == 7 && day <= date_interval) || (day > date_interval)) {
            end_date = moment(`${year}01`, 'YYYYMM');
        } else end_date = moment(`${year - 1}08`, 'YYYYMM');

        return {
            end_date
        };
    }

    //年
    getYearInterval(obj = {}) {
        let end_date = moment();
        let month = moment().format("M");
        let day = moment().format("D");
        //当9号后可以看去年的数据
        let date_interval = parseInt(obj.date_interval || 9);
        if (month > 1 || day > date_interval) {
            end_date = moment(end_date).subtract(1, "year");
        } else end_date = moment(end_date).subtract(2, "year");

        return {
            end_date
        };
    }

    async getMenuTree(resIds, userGroupId, type) {
        let data = [];
        const getSource = (index) => {
            if (!type) return null;
            let source = "";
            if (index == 0) {//a股
                source = "a_stock";
            } else if (index == 1) {//港股
                source = "hk_stock";
            } else if (index == 2) {//美股
                source = "us_stock";
            } else if (index == 3) {//未上市
                source = "unlisted_stock";
            } else if (index == 4) {//海外消费行业上市公司
                source = "overseas_consumption_stock";
            } else if (index == 5) {//特色上市公司
                source = "feature_stock";
            }
            return source;
        }
        try {
            for (let i = 0, len = resIds.length; i < len; i++) {
                let resId = resIds[i];
                //数据来源 A股票，港股，美股
                let source = getSource(i);
                let menu_tree = await this.getRedisCache("menu_tree", resId, userGroupId);
                if (menu_tree && menu_tree.length) {
                    menu_tree = this.getSelectOption(menu_tree, userGroupId, source);
                    data = data.concat(menu_tree);
                }
            }
        } catch (error) {
            ctx.service.logHelper.logErr("从权限中获取多维数据出错", error);
        }
        return data;
    }


    async batchGetTemplateInfo() {
        const { ctx } = this;
        const fetchAll = _.chain(_.get(ctx.request.body, 'data', []))
            .map((current) => {
                const params = _.chain(current)
                    .pick(['rootInstantiationId', 'instantiationId'])
                    .omitBy((value, key) => _.isNil(value))
                    .value()

                if (_.isEmpty(params)) return null;

                return new Promise((resolve, reject) => {
                    ctx.service.api.ajax(apiConfig.GETUSERTEMPLATELIST, {
                        method: "get",
                        data: params
                    })
                        .then(result => {
                            if (result.data.code == 200) {
                                let data = result.data.data.list;
                                let templateData = data.map((item) => {
                                    return {
                                        instantiationId: item.instantiationId,
                                        templatePropertyValueJson: item.templatePropertyValueJson,
                                        templateId: item.templateId
                                    }
                                })
                                resolve(_.head(templateData));
                                return;
                            }

                            resolve({
                                error: true,
                                data: result.data
                            });
                        })
                })
            })
            .filter(v => !_.isNil(v))
            .value()

        const result = await Promise.all(fetchAll)

        this.success(result)
    }


    async getTemplateInfo() {
        const { ctx } = this;
        const query = ctx.query || {},
            rootInstantiationId = query.rootInstantiationId,
            instantiationId = query.instantiationId;

        if (!rootInstantiationId && !instantiationId) {
            this.paramError();
            return;
        }

        let param = {};
        if (rootInstantiationId) param["rootInstantiationId"] = rootInstantiationId;
        else if (instantiationId) param["instantiationId"] = instantiationId;

        const result = await ctx.service.api.ajax(apiConfig.GETUSERTEMPLATELIST, {
            method: "get",
            data: param
        });

        if (result.data.code == 200) {
            let data = result.data.data.list;
            let templateData = data.map((item) => {
                return {
                    instantiationId: item.instantiationId,
                    templatePropertyValueJson: item.templatePropertyValueJson,
                    templateId: item.templateId
                }
            })
            this.success(templateData);
            return;
        }

        this.returnData(result.data);
    }

    // async addAttention() {
    //     const { ctx, config } = this;
    //     const query = ctx.request.body || {},
    //         resId = query.resId,
    //         type = query.type,
    //         resAttr = query.resAttr,
    //         sysUserId = this.getUserId();

    //     if (!resId || !type || !resAttr || !sysUserId) {
    //         this.paramError();
    //         return;
    //     }

    //     let param = {
    //         resId,
    //         type,
    //         resAttr,
    //         sysUserId
    //     };

    //     const result = await ctx.service.api.ajax(apiConfig.ADDATTENTION, {
    //         method: "get",
    //         basePath: config.API_DOMAIN.PERMISSIONS_URL,
    //         data: param
    //     });

    //     this.returnData(result.data);
    // }

    // async delUserAttention() {
    //     const { ctx, config } = this;
    //     const query = ctx.request.body || {},
    //         resId = query.resId,
    //         sysUserId = this.getUserId();

    //     if (!resId || !sysUserId) {
    //         this.paramError();
    //         return;
    //     }

    //     let param = {
    //         resId,
    //         sysUserId
    //     };

    //     const result = await ctx.service.api.ajax(apiConfig.DELUSERATTENTION, {
    //         method: "get",
    //         basePath: config.API_DOMAIN.PERMISSIONS_URL,
    //         data: param
    //     });

    //     this.returnData(result.data);
    // }

    async getUserAttention() {
        const { ctx, config } = this;
        const query = ctx.query || {},
            resId = query.resId,
            sysUserId = this.getUserId();

        if (!sysUserId) {
            this.paramError();
            return;
        }

        let param = {
            sysUserId
        };

        if (resId) param["resId"] = resId;

        const result = await ctx.service.api.ajax(apiConfig.GETUSERATTENTION, {
            method: "get",
            basePath: config.API_DOMAIN.PERMISSIONS_URL,
            data: param
        });

        this.returnData(result.data);
    }

    async queryMenuByResId() {
        const { ctx, config } = this;
        const query = ctx.query || {},
            resId = query.resId,
            userGroupId = query.userGroupId,
            operatorId = this.getUserId();

        if (!resId || !userGroupId) {
            this.paramError();
            return;
        }

        let param = {
            level: 4,
            operatorId,
            sysUniqueCode: config.name,
            resId,
            userGroupId
        };

        const result = await ctx.service.api.ajax(apiConfig.COMMON_QUERYMENUBYRESID, {
            method: "POST",
            basePath: config.API_DOMAIN.LOGIN_API_URL,
            data: param
        });

        this.returnData(result.data);
    }

    async getConfigData() {
        const { ctx } = this;
        const query = ctx.query || {},
            configName = query.configName;

        if (!configName) {
            this.paramError();
            return;
        }

        const result = await this.getCoachConfig(configName)
        this.returnData(result.data);
    }

    async getCoachConfig(configName, sysId) {
        const { ctx, config } = this;
        let param = {
            configName,
        };

        if (sysId) {
            param.sysId = sysId;
        }

        const result = await ctx.service.api.ajax(apiConfig.COMMON_GETCONFIGDATA, {
            method: "get",
            basePath: config.API_DOMAIN.PERMISSIONS_URL,
            data: param
        });

        return result;
    }


    async setConfigData() {
        const { ctx, config } = this;
        const query = ctx.request.body || {},
            configName = query.configName,
            configAttr = query.configAttr;

        if (!configName || !configAttr) {
            this.paramError();
            return;
        }

        let param = {
            configName,
            configAttr
        };

        const result = await ctx.service.api.ajax(apiConfig.COMMON_SETCONFIGDATA, {
            method: "post",
            basePath: config.API_DOMAIN.PERMISSIONS_URL,
            data: param
        });

        this.returnData(result.data);
    }

    async downloadOperation() {
        const { ctx } = this;
        const query = ctx.request.body || {},
            userCookie = this.getUserCookieInfo(),
            sys_user_id = '1', //userCookie.sysUserId,
            accumulation = query.accumulation;

        let paramStr = query.paramStr;

        if (!sys_user_id || !paramStr) {
            this.paramError();
            return;
        }

        try {
            let paramJson = JSON.parse(paramStr)
            // paramJson["ifOutputLog"] = userCookie.ifOutputLog == undefined ? true : ifOutputLog.ifOutputLog;
            paramJson["ifOutputLog"] = true;
            paramStr = JSON.stringify(paramJson);
        } catch (error) {
            this.logErr("下载日志增加ifOutputLog字段出错", error)
        }

        let param = {
            sys_user_id,
            accumulation,
            paramStr
        };

        const result = await ctx.service.api.ajax(apiConfig.COMMON_DOWNLOADOPERATION, {
            method: "get",
            data: param
        });

        this.returnData(result.data);
    }

    async setLanguage() {
        const { ctx } = this;
        const query = ctx.request.body || {},
            language = query.language;

        if (!language) {
            this.paramError();
            return;
        }

        let result = await this.setUserBehaviorTokenCookie({ language });

        this.success(result);
    }

    async getEnglishDict() {
        const { ctx, config } = this;
        const query = ctx.query || {},
            code = query.code,
            currentPage = query.currentPage || 1,
            pageSize = query.pageSize || 10000;

        let param = {
            code,
            currentPage,
            pageSize
        };
        const result = await ctx.service.api.ajax(apiConfig.COMMON_GETENGLISHDICT, {
            method: "get",
            basePath: config.API_DOMAIN.MANAGE_SYSTEM_API_URL,
            data: param
        });

        if (result.data.code == 200) {
            let data = result.data.data;
            data = transformEnglishDictData(data);
            this.success(data);
            return;
        }
        this.returnData(result.data);
    }

    transformEnglishDictData(data) {
        let obj = {};
        for (let i = 0, len = data.length; i < len; i++) {
            let item = data[i];
            obj[item.chinese_code] = item.english_code;
        }
        return {
            "en_US": obj,
            "zh_CN": {
            }
        }
    }

    //刷新语言缓存
    async refreshLanguageCache() {
        const { ctx, config } = this;
        //获取语言版本
        // await creatLanguageFile(ctx, config);
        this.success();
    }

    // 获取语言包
    async getLanguagePackage() {
        const { ctx, config } = this;
        const result = await ctx.service.api.ajax(apiConfig.LANGUAGE_PACKAGE, {
            method: 'get',
            data: ctx.query
        })

        this.returnData(result.data);
    }

    async getTemplateBehavior() {
        const { ctx } = this;
        const query = ctx.query || {},
            instantiationId = query.instantiationId,
            sysUserId = this.getUserId();

        if (!sysUserId || !instantiationId) {
            this.paramError();
            return;
        }
        let param = {
            sysUserId,
            instantiationId,
        };
        const result = await ctx.service.api.ajax(apiConfig.COMMON_GETTEMPLATEBEHAVIOR, {
            method: "get",
            data: param
        });

        this.returnData(result.data);
    }

    async saveTemplateBehavior() {
        const { ctx } = this;
        const query = ctx.request.body || {},
            sysUserId = this.getUserId(),
            instantiationId = query.instantiationId,
            userBehavior = query.userBehavior;

        if (!sysUserId || !userBehavior || !instantiationId) {
            this.paramError();
            return;
        }

        let param = {
            userBehavior,
            sysUserId,
            instantiationId
        };

        const result = await ctx.service.api.ajax(apiConfig.COMMON_SAVETEMPLATEBEHAVIOR, {
            method: "get",
            data: param
        });

        this.returnData(result.data);
    }

    async delTemplateBehavior() {
        const { ctx } = this;
        const query = ctx.request.body || {},
            sysUserId = this.getUserId(),
            instantiationId = query.instantiationId;

        if (!sysUserId || !instantiationId) {
            this.paramError();
            return;
        }

        let param = {
            sysUserId,
            instantiationId
        };

        const result = await ctx.service.api.ajax(apiConfig.COMMON_DELTEMPLATEBEHAVIOR, {
            method: "get",
            data: param
        });

        this.returnData(result.data);
    }

    async notFoundEnglish() {
        const { ctx } = this;
        const query = ctx.query || {},
            name = query.name;

        this.logErr(`翻译未找到：${name}`)
        this.success()
    }

    //获取资源
    async queryResDtoListByAttr() {
        const { ctx, config } = this;
        const query = ctx.query || {},
            level = query.level || 4,
            userGroupId = await this.getUserGroupId(),//query.userGroupId || 0,
            resAttr = query.resAttr,
            operatorId = this.getUserId();

        if (!operatorId) {
            this.paramError();
            return;
        }
        let param = {
            operatorId,
            sysUniqueCode: config.systemCode,
            resId: config.fixedData.companyId,
            level,
            userGroupId,
            resAttr
        };
        console.log("=====", param)
        const result = await ctx.service.api.ajax(apiConfig.COMMON_QUERYRESDTOLISTBYATTR, {
            method: "get",
            basePath: this.config.API_DOMAIN.PERMISSIONS_URL,
            data: param
        });

        this.returnData(result.data);
    }

    // 查询公司排序
    async getStockSortList() {
        const { ctx, config } = this;
        const query = ctx.query || {},
            level = query.level || 4,
            userGroupId = await this.getUserGroupId(),//query.userGroupId || 0,
            industry_label = query.industry_label,
            operatorId = this.getUserId();

        if (!operatorId) {
            this.paramError();
            return;
        }
        let param = {
            operatorId,
            sysUniqueCode: config.systemCode,
            resId: config.fixedData.companyId,
            level,
            userGroupId,
            industry_label
        };

        const result = await ctx.service.api.ajax(apiConfig.COMMON_GETSTOCKSORTLIST, {
            method: "get",
            data: param
        });

        this.returnData(result.data);
    }

    async getSearchMappingList() {
        const { ctx, config } = this;
        const result = await ctx.service.api.ajax(apiConfig.COMMON_GETSEARCHMAPPINGLIST, {
            method: "get",
            data: {}
        });

        this.returnData(result.data);
    }

    // 获取行业分析资源
    async queryIndustryDtoListByAttr() {
        const { ctx, config } = this;
        const query = ctx.query || {},
            resId = query.resId,
            // level    = query.level || 4,
            userGroupId = await this.getUserGroupId(),///query.userGroupId || 0,
            resAttr = query.resAttr,
            operatorId = this.getUserId();

        if (!operatorId) {
            this.paramError();
            return;
        }
        let param = {
            operatorId,
            sysUniqueCode: config.systemCode,
            resId: config.fixedData.industryId,
            userGroupId,
            resAttr
        };
        const result = await ctx.service.api.ajax(apiConfig.COMMON_QUERYINDUSTRYDTOLISTBYATTR, {
            method: "get",
            basePath: this.config.API_DOMAIN.PERMISSIONS_URL,
            data: param
        });

        this.returnData(result.data);
    }

    // 获取看板入口资源、品牌入口资源
    async queryParentAndSubResDtoTreeOnlyPageAccessInfo() {
        const { ctx, config } = this;
        const query = ctx.query || {},
            type = query.type,
            level = query.level || 3,
            userGroupId = await this.getUserGroupId(),//query.userGroupId || 0,
            operatorId = this.getUserId();
        //资源id
        let resId = "";
        if (type == "board") resId = config.fixedData.boardId;
        else if (type == "brand") resId = config.fixedData.brandId;
        else if (type == "dataSource") resId = config.fixedData.dataSourceId;

        if (!operatorId || !resId) {
            this.paramError();
            return;
        }

        let param = {
            operatorId,
            sysUniqueCode: config.systemCode,
            resId,
            level,
            userGroupId,
        };
        const result = await ctx.service.api.ajax(apiConfig.COMMON_QUERYPARENTANDSUBRESDTOTREEONLYPAGEACCESSINFO, {
            method: "get",
            basePath: this.config.API_DOMAIN.PERMISSIONS_URL,
            data: param
        });

        this.returnData(result.data);
    }

    //通用api
    async getCommonTemplateBusinessApi() {
        const { ctx } = this;
        const query = ctx.query || {},
            path = ctx.params[0],
            operatorId = this.getUserId();

        if (!operatorId || !path) {
            this.paramError();
            return;
        }

        let param = {
            operatorId,
            ...query,
        };

        const { instantiationId } = query
        if (instantiationId && instantiationId === "addAttention") {
            param = {
                params: JSON.stringify(param)
            }
        }

        const result = await ctx.service.api.ajax(path, {
            method: "get",
            data: param
        });

        this.returnData(result.data);
    }

    // 公司关注
    async addAttention() {
        const { ctx, config } = this;
        const query = ctx.request.body || {},
            type = 1,//query.type,
            resId = query.resId,
            level = query.level || 3,
            userGroupId = await this.getUserGroupId(),//query.userGroupId || 0,
            resAttr = query.resAttr,
            operatorId = this.getUserId();

        if (!operatorId) {
            this.paramError();
            return;
        }

        let param = {
            sysUserId: operatorId,
            sysUniqueCode: config.systemCode,
            resId,
            resAttr,
            type,
            level,
            userGroupId,
        };
        console.log("关注", param)
        const result = await ctx.service.api.ajax(apiConfig.COMMON_ADDATTENTION, {
            method: "post",
            basePath: this.config.API_DOMAIN.PERMISSIONS_URL,
            data: param
        });

        this.returnData(result.data);
    }

    // 取消公司关注
    async delUserAttention() {
        const { ctx, config } = this;
        const query = ctx.request.body || {},
            type = 1,//query.type,
            resId = query.resId,
            level = query.level || 3,
            userGroupId = await this.getUserGroupId(),//query.userGroupId || 0,
            operatorId = this.getUserId();
        //资源id
        //let resId = type=="board"?config.fixedData.boardId:config.fixedData.brandId;

        if (!operatorId) {
            this.paramError();
            return;
        }

        let param = {
            sysUserId: operatorId,
            sysUniqueCode: config.systemCode,
            resId,
            type,
            level,
            userGroupId,
        };
        console.log("取消关注", param)
        const result = await ctx.service.api.ajax(apiConfig.COMMON_DELUSERATTENTION, {
            method: "post",
            basePath: this.config.API_DOMAIN.PERMISSIONS_URL,
            data: param
        });
        console.log("取消关注返回", result)
        this.returnData(result.data);
    }
    //更新模版value数据
    async updateFrontTemplate() {
        const { ctx } = this;
        const query = ctx.request.body || {},
            instantiationId = query.instantiationId,
            templatePropertyValue = query.templatePropertyValue,
            operatorId = await this.getUserId();

        if (!instantiationId || !templatePropertyValue || !operatorId) {
            this.paramError();
            return;
        }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.COMMON_UPDATEFRONTTEMPLATE, {
            data: {
                instantiationId,
                templatePropertyValue,
                operatorId
            }
        })

        this.returnData(result.data);
    }

    async getUserGuideRecord() {
        const { ctx, config } = this;
        const query = ctx.query || {},
            sysId = query.sysId,
            type = query.type || 1,
            sysUserId = await this.getUserId();

        if (!sysId || !sysUserId) {
            this.paramError();
            return;
        }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.GETUSERGUIDERECORD, {
            basePath: config.API_DOMAIN.PERMISSIONS_URL,
            data: {
                sysId,
                type,
                sysUserId
            }
        })

        this.returnData(result.data);
    }

    //获取用户引导记录 
    async addUserGuideRecord() {
        const { ctx, config } = this;
        const query = ctx.query || {},
            sysId = query.sysId,
            type = query.type,
            sysUserId = await this.getUserId();

        if (!sysId || !sysUserId) {
            this.paramError();
            return;
        }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.ADDUSERGUIDERECORD, {
            basePath: config.API_DOMAIN.PERMISSIONS_URL,
            data: {
                sysId,
                type,
                sysUserId
            }
        })

        this.returnData(result.data);
    }

    //获取用户引导记录 
    async removeUserGuideRecord() {
        const { ctx, config } = this;
        const query = ctx.query || {},
            sysId = query.sysId,
            type = query.type,
            sysUserId = await this.getUserId();

        if (!sysId || !sysUserId) {
            this.paramError();
            return;
        }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.REMOVEUSERGUIDERECORD, {
            basePath: config.API_DOMAIN.PERMISSIONS_URL,
            data: {
                sysId,
                type,
                sysUserId
            }
        })

        this.returnData(result.data);
    }
    //写入引导记录

    //国内电商概念详情
    async getSummaryWordInfo() {
        const { ctx, config } = this;
        const query = ctx.query || {},
            first_type_id = query.first_type_id || null,
            operatorId = await this.getUserId(),
            summary_word = query.summary_word || null;

        let params = {
            first_type_id,
            operatorId,
            summary_word
        }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.GETSUMMARYWORDINFO, {
            data: { params: JSON.stringify(params) }
        })

        this.returnData(result.data);
    }
    //国内电商行业详情
    async getDEIndustrySidebar() {
        const { ctx, config } = this;
        const query = ctx.query || {},
            first_type_id = query.first_type_id || null,
            second_type_id = query.second_type_id || null,
            operatorId = await this.getUserId(),
            third_type_id = query.third_type_id || null;

        let params = {
            first_type_id,
            second_type_id,
            operatorId,
            third_type_id
        }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.GETDEINDUSTRYSIDEBAR, {
            data: { params: JSON.stringify(params) }
        })

        this.returnData(result.data);
    }
    //国内电商品牌 
    async getBoardBrandDetail() {
        const { ctx, config } = this;
        const query = ctx.query || {},
            first_type_name = query.first_type_name || null,
            operatorId = await this.getUserId(),
            brandId = query.brandId || null;

        let params = {
            first_type_name,
            operatorId,
            brandId
        }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.GETBOARDBRANDDETAIL, {
            data: { params: JSON.stringify(params) }
        })

        this.returnData(result.data);
    }
    // 线下门店品牌
    async getOfflineBrandDetail() {
        const { ctx, config } = this;
        const query = ctx.query || {},
            brandId = query.brandId || null,
            operatorId = await this.getUserId(),
            store_type = query.store_type || null;

        let params = {
            brandId,
            operatorId,
            store_type
        }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.GETOFFLINEBRANDDETAIL, {
            data: { params: JSON.stringify(params) }
        })

        this.returnData(result.data);
    }
    // 线下门店行业
    async getIndustryDetail() {
        const { ctx, config } = this;
        const query = ctx.query || {},
            industryId = query.industryId || null,
            operatorId = await this.getUserId(),
            store_type = query.store_type || null;

        let params = {
            industryId,
            store_type,
            operatorId
        }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.GETINDUSTRYDETAIL, {
            data: { params: JSON.stringify(params) }
        })

        this.returnData(result.data);
    }

    // 线下门店行业
    async getTopBrandTag() {
        const { ctx, config } = this;
        const query = ctx.query || {},
            date_type = query.date_type || null;

        let params = {
            date_type
        }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.GETTOPBRANDTAG, {
            data: { params: JSON.stringify(params) }
        })

        this.returnData(result.data);
    }

    //舆情行业左侧详情
    async getRedIndustryDetail() {
        const { ctx, config } = this;
        const query = ctx.query || {},
            operatorId = await this.getUserId(),
            industry_id = query.industry_id || null,
            full_type_id = query.full_type_id || null;

        let params = {
            industry_id,
            full_type_id,
            operatorId
        }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.GETREDINDUSTRYDETAIL, {
            data: { params: JSON.stringify(params) }
        })

        this.returnData(result.data);
    }
    //舆情品牌左侧详情
    async getRedBrandDetail() {
        const { ctx, config } = this;
        const query = ctx.query || {},
            operatorId = await this.getUserId(),
            brand_id = query.brand_id || null;

        let params = {
            brand_id,
            operatorId
        }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.GETREDBRANDDETAIL, {
            data: { params: JSON.stringify(params) }
        })

        this.returnData(result.data);
    }
    //舆情概念左侧详情
    async getRedConceptDetail() {
        const { ctx, config } = this;
        const query = ctx.query || {},
            first_type_id = query.first_type_id || null,
            operatorId = await this.getUserId(),
            summary_word = query.summary_word || null;

        let params = {
            first_type_id,
            summary_word,
            operatorId
        }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.GETREDCONCEPTDETAIL, {
            data: { params: JSON.stringify(params) }
        })

        this.returnData(result.data);
    }

    // 二级市场聚合页-TMT公司列表
    async queryResDtoListBySecondaryTMT() {
        const { ctx, config } = this;
        const sysUniqueCode = config.systemCode,
            userGroupId = await this.getUserGroupId(),
            resId = 9701,
            operatorId = await this.getUserId();

        if (!sysUniqueCode || !operatorId) {
            this.paramError();
            return;
        }

        //query data
        const result = await this.ctx.service.api.ajax(apiConfig.QUERYSMTMTLIST, {
            basePath: config.API_DOMAIN.PERMISSIONS_URL,
            data: {
                sysUniqueCode,
                userGroupId,
                resId,
                operatorId
            }
        })

        this.returnData(result.data);
    }



    // 代理转发url
    async proxyApi() {
        const { ctx } = this;

        const query = ctx.query || {};
        const { url, fetchType = "get", ...params } = query;

        if (!url) return;
        const result = await ctx.service.api.ajax(url, {
            method: fetchType,
            data: params
        });
        if (result.data.code == 200) {
            try {
                this.success(result.data);
            } catch (error) {
                console.log("接口请求错误");
            }
        }

        this.returnData(result.data);

    }

}

module.exports = CommonController;
