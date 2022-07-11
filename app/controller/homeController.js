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

class HomeController extends ServiceController {
    async index() {
        const { ctx, config } = this;
        //用户所有系统
        let allSystem = await this.getUserAllSystem();
        // let getUserGuideRecord = await this.getUserGuideRecord
        //
        let obj = allSystem.find(item => item.sysUniqueCode == config.systemCode);


        if (obj && obj.sysId) {
            const guidResult = await this.getUserGuideRecord({
                sysId: obj.sysId,
                type: 1
            })
            if (guidResult.length == 0 && this.hasMenuByResName('公司分析')) {
                ctx.redirect(`/page/companyAnalysis`);
                return;
            }
        }
        if (obj) {
            let firstObj = await this.getUserFirstMenu();
            let path = firstObj ? firstObj.path : "";
            if (path) {
                ctx.redirect(`/page/${path}`);
                return;
            }
        }
        ctx.redirect(`/page/error/504`);
    }

    async browserCustomPage() {
        const { ctx, config } = this;
        const query = this.ctx.query || {};
        const path = ctx.params.path;
        const node_env = ctx.service.env.getProjectEnv();

        if (
            node_env === 'production'
            && path.toLocaleLowerCase().indexOf('EntryRecord'.toLocaleLowerCase())
        ) { //  path === 'EntryRecord'
            return ctx.redirect(`/`);
        }

        try {
            let templateList = await this.getTemplateList(path);
            //菜单数据
            let mixData = await this.getPageMixData(null, null, path);
            //混合好的数据
            let pageMixData = Base64.encode(JSON.stringify(Object.assign({}, mixData, { fixedData: config.fixedData })));
            console.log("访问带参数页面", mixData)
            await this.renderPage("index", { templateList, pageMixData });
        } catch (error) {
            this.logErr("访问带参数的定制化页面 方法 browseFilterPath 出错", error)
            ctx.redirect("/page/error/410");
        }
    }

    //配置页面
    async browserConfigPage() {
        const { ctx } = this;
        const resId = ctx.params.resId || "9716",
            path = ctx.params.path;

        try {
            let templateList = await this.getTemplateList(path);
            //菜单数据
            let mixData = await this.getPageMixData(resId);
            //混合好的数据
            let pageMixData = Base64.encode(JSON.stringify(mixData));

            await this.renderPage("index", { templateList, pageMixData });
        } catch (error) {
            this.logErr("访问配置化页面browserConfigPage 出错", error)
            ctx.redirect("/page/error/410");
        }
    }

    //行业/公司/品牌/看板
    async redirectAnalysisPage() {
        const { ctx, config } = this;
        const resId = ctx.params.resId;
        const type = ctx.params.type;
        const querystring = ctx.querystring;

        try {
            let pageInfo = await this.getResDtoTree(resId);
            let firstObj = await this.getUserFirstMenu(pageInfo);
            let firstResId = firstObj["resId"];
            let firstPath = firstObj["path"];

            //用户所有系统
            let allSystem = await this.getUserAllSystem();

            let obj = allSystem.find(item => item.sysUniqueCode == config.systemCode);

            if (obj && obj.sysId) {
                // 获取引导记录
                const guidResult = await this.getUserGuideRecord({
                    sysId: obj.sysId,
                    type: 2
                })
                if (guidResult.length == 0 && firstPath == 397) {
                    firstPath = 97
                    firstObj = await this.getUserSecondMenu(pageInfo);
                    firstResId = firstObj["resId"];
                    firstPath = firstObj["path"];
                    //如果没有整体概况，就没有引导
                    if (firstObj.path != "97") {
                        firstObj = await this.getUserFirstMenu(pageInfo);
                        firstResId = firstObj["resId"];
                        firstPath = firstObj["path"];
                    }
                }
            }

            console.log("访问公司==", type, resId, querystring, firstResId, firstPath)

            if (querystring) ctx.redirect(`/page/${type}/${resId}/${firstResId}/${firstPath}?${querystring}`);
            else ctx.redirect(`/page/${type}/${resId}/${firstResId}/${firstPath}`);
        } catch (error) {
            this.logErr("访问公司browserCompanyPage 出错", error)
            ctx.redirect("/page/error/412");
        }
    }

    //访问公司/行业内容页面
    async browserAnalysisPage() {
        const { ctx, config } = this;
        const resId = ctx.params.resId,
            parentId = ctx.params.parentId,
            type = ctx.params.type,
            path = ctx.params.path,
            level = ctx.query.level || 3,
            userGroupId = await this.getUserGroupId(),//query.userGroupId || 0,
            operatorId = this.getUserId();

        try {
            //菜单数据
            let mixData = await this.getPageMixData(resId, parentId);
            let companyLeftMenu = await this.getMenuData(parentId, 7);
            let dataSourceMenu = null

            // app行业分析，补充dataSource的菜单
            if (type === 'appAnalyze' || type === 'dataSource') {
                let param = {
                    operatorId,
                    sysUniqueCode: config.systemCode,
                    resId: config.fixedData.dataSourceId,
                    level,
                    userGroupId,
                };
                const res = await ctx.service.api.ajax(apiConfig.COMMON_QUERYPARENTANDSUBRESDTOTREEONLYPAGEACCESSINFO, {
                    method: "get",
                    basePath: this.config.API_DOMAIN.PERMISSIONS_URL,
                    data: param
                });
                dataSourceMenu = res.data.data
            }

            //混合好的数据
            let pageMixData = Base64.encode(JSON.stringify({ "leftMenu": companyLeftMenu, ...mixData, 'dataSourceMenu': dataSourceMenu }));
            if (path === "reportAnalysis") {
                console.log("数据1==", companyLeftMenu, "数据2==", mixData)
                await this.renderPage("index", { pageMixData });
            } else {
                let templateList = await this.getTemplateList(path);
                await this.renderPage("index", { templateList, pageMixData });
            }
        } catch (error) {
            this.logErr("访问公司内容页面browserCompanyPage 出错", error)
            ctx.redirect("/page/error/413");
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

    //登录
    async browseLogin() {
        const { ctx, config } = this;
        const query = ctx.query || {};
        const params = ctx.params,
            language = params.language;
        let redirectUrl = ctx.origin;
        if (query.redirectUrl) redirectUrl += ctx.service.secretKey.getDecData(query.redirectUrl);
        let redirectData = ctx.service.secretKey.getEncData(JSON.stringify({ redirectUrl, "systemCode": config.systemCode }));
        ctx.redirect(`${config.API_DOMAIN.PASSPORT_URL}/login/${redirectData}/${language}`);
    }

    async redirectLangueLogin() {
        const { ctx } = this;
        let language = ctx.params.language;
        await this.setUserBehaviorTokenCookie({ language });
        //跳转登录
        this.goToLogin(false);
    }

    //匹配资源
    getMatchResId(datas, path) {
        const loop = (data) => {
            for (let i = 0, len = data.length; i < len; i++) {
                let obj = data[i];
                let resId = obj.resId;
                let resAttr = obj.resAttr ? JSON.parse(obj.resAttr) : {};
                let child = obj.child;
                if (path == resAttr.path) return resId;
                if (child && child.length) {
                    let temp = loop(child);
                    if (temp) return temp;
                }
            }
            return null;
        }
        return loop(datas)
    }

    async redirectPath() {
        const { ctx } = this;
        const params = ctx.params,
            parentId = params.parentId,
            type = params.type,
            path = params.path,
            querystring = ctx.querystring;
        try {
            //菜单数据
            let pageInfo = await this.getResDtoTree(parentId);
            let resId = this.getMatchResId(pageInfo.child, path);
            if (querystring) ctx.redirect(`/page/${type}/${parentId}/${resId}/${path}?${ctx.querystring}`);
            else ctx.redirect(`/page/${type}/${parentId}/${resId}/${path}`);
        } catch (error) {
            this.logErr("访问公司内容页面browserCompanyPage 出错", error)
            ctx.redirect("/page/error/505");
        }
    }

    getLoopData(data, type, value) {
        if (!data || !data.length) return null;
        try {
            for (let i = 0, len = data.length; i < len; i++) {
                let obj = data[i],
                    child = obj.child;
                if (obj[type] == value) {
                    return obj;
                } else if (child && child.length) {
                    let res = this.getLoopData(child, type, value);
                    if (res) return res;
                }
            }
        } catch (error) {
            this.logErr("循环遍历菜单出错", error)
        }
        return null;
    }

    //获取指定一级菜单
    getAppointData(data, level, resId) {
        if (!data || !data.length) return null;
        try {
            //获取特定一级数据
            let appointResData = this.getLoopData(data, "level", level);
            let currentResData = this.getLoopData(data, "resId", resId);
            return { appointResData, currentResData };
        } catch (error) {
            this.logErr("查询指定一级菜单出错", error)
        }
        return null;
    }

    async redirectResId() {
        const { ctx } = this;
        const params = ctx.params,
            type = params.type,
            resId = params.resId,
            querystring = ctx.querystring;
        try {
            //菜单数据
            let result = await this.getResLinkTreeBy(resId);
            let appointResData = null;
            let currentResData = null;
            let path = "";
            if (type == "company") {
                let temp = this.getAppointData(result.child, 4, resId);
                if (temp) {
                    appointResData = temp.appointResData;
                    currentResData = temp.currentResData;
                    if (currentResData) {
                        let resAttr = currentResData.resAttr ? JSON.parse(currentResData.resAttr) : {};
                        path = resAttr.path;
                    }
                }
            }
            if (!appointResData || !currentResData) {
                throw new Error('获取菜单出错');
            }
            if (querystring) ctx.redirect(`/page/${type}/${appointResData.resId}/${currentResData.resId}/${path}?${ctx.querystring}`);
            else ctx.redirect(`/page/${type}/${appointResData.resId}/${currentResData.resId}/${path}`);
        } catch (error) {
            this.logErr("访问公司菜单 出错", error)
            ctx.redirect("/page/error/506");
        }
    }

    async redirectCompany() {
        const { ctx } = this;
        const params = ctx.params,
            resId = params.resId,
            path = params.path,
            querystring = ctx.querystring;
        try {
            //菜单数据
            let result = await this.getResLinkTreeBy(resId);
            let resData = this.getLoopData(result.child, "level", 4);
            if (!resData) {
                throw new Error('获取菜单出错');
            }

            let url = null;
            if (path) {
                url = `/page/company/${resData.resId}/${resId}/${path}`;
            } else {
                url = `/page/company/${resData.resId}`;
            }

            if (!url) {
                throw new Error('获取App 跳转菜单出错');
            }

            if (querystring) ctx.redirect(`${url}?${ctx.querystring}`);
            else ctx.redirect(url);
        } catch (error) {
            this.logErr("访问公司菜单 出错", error)
            ctx.redirect("/page/error/506");
        }
    }

    getLoopAttrData(data, type, value) {
        if (!data || !data.length) return null;
        try {
            for (let i = 0, len = data.length; i < len; i++) {
                let obj = data[i],
                    child = obj.child,
                    resAttr = obj.resAttr ? JSON.parse(obj.resAttr) : {};

                if (resAttr[type] == value) {
                    return obj;
                } else if (child && child.length) {
                    let res = this.getLoopAttrData(child, type, value);
                    if (res) return res;
                }
            }
        } catch (error) {
            this.logErr("循环遍历App菜单出错", error)
        }
        return null;
    }

    async redirectAppPath() {
        const { ctx, config } = this;
        const params = ctx.params,
            type = params.type,
            path = params.path,
            querystring = ctx.querystring;
        try {
            //菜单数据
            let result = await this.getMenuData(config.fixedData.appId, 5);
            let resData = this.getLoopAttrData(result.child, "type", type);
            if (!resData) {
                throw new Error('获取菜单出错');
            }

            let url = null;
            if (path) {
                url = `/redirect/dataSource/${resData.resId}/${path}`;
            } else {
                url = `/page/dataSource/${resData.resId}`;
            }

            if (!url) {
                throw new Error('获取App 跳转菜单出错');
            }

            if (querystring) {
                if (querystring.indexOf('param') > -1) {
                    ctx.redirect(`${url}?${querystring}`);
                } else {
                    const queryArr = querystring.split('&')
                    const app_id = queryArr.find(f => f.indexOf('app_id') > -1).split('=')[1]
                    const app_name = queryArr.find(f => f.indexOf('app_name') > -1).split('=')[1]
                    const linkurl = queryArr.find(f => f.indexOf('linkurl') > -1).split('=')[1]
                    const paramString = Base64.encode(JSON.stringify({
                        app_id, app_name, linkurl
                    }))
                    ctx.redirect(`${url}?${paramString}`);
                }
            }
            else ctx.redirect(url);
        } catch (error) {
            this.logErr("访问公司菜单 出错", error)
            ctx.redirect("/page/error/507");
        }
    }


    async redirectAppCompare() {
        const { ctx, config } = this;
        // const   resId = config.fixedData.appCompareId;
        // const type = 'appAnalyze';
        // const querystring = ctx.querystring;

        // try {
        //     let pageInfo = await this.getResDtoTree(resId);
        //     let firstObj = await this.getUserFirstMenu(pageInfo);
        //     let firstResId = firstObj["resId"];
        //     let firstPath = firstObj["path"];

        //     // console.log("访问公司==", type, resId, firstResId, firstPath)
        //     if (querystring) ctx.redirect(`/page/${type}/${resId}/${firstResId}/${firstPath}?${querystring}`);
        //     else ctx.redirect(`/page/${type}/${resId}/${firstResId}/${firstPath}`);

        const params = ctx.params,
            parentId = params.parentId,
            resId = params.resId,
            path = params.path,
            querystring = ctx.querystring;
        try {
            let url = `/page/appAnalyze/${parentId}/${resId}/${path}`;
            if (querystring) ctx.redirect(`${url}?${querystring}`);
            else ctx.redirect(url);

        } catch (error) {
            this.logErr("访问公司browserCompanyPage 出错", error)
            ctx.redirect("/page/error/412");
        }
    }

    async redirectAppDetail() {
        const { ctx, config } = this;
        // const resId = config.fixedData.appDetailId;
        // const type = 'appAnalyze';
        // const querystring = `industry_app=detail&${ctx.querystring}`;

        // try {
        //     let pageInfo = await this.getResDtoTree(resId);
        //     let firstObj = await this.getUserFirstMenu(pageInfo);
        //     let firstResId = firstObj["resId"];
        //     let firstPath = firstObj["path"];

        //     // console.log("访问公司==", type, resId, firstResId, firstPath)
        //     if (querystring) ctx.redirect(`/page/${type}/${resId}/${firstResId}/${firstPath}?${querystring}`);
        //     else ctx.redirect(`/page/${type}/${resId}/${firstResId}/${firstPath}`);

        const params = ctx.params,
            parentId = params.parentId,
            resId = params.resId,
            path = params.path,
            querystring = ctx.querystring;
        try {
            let url = `/page/appAnalyze/${parentId}/${resId}/${path}`;
            if (querystring) ctx.redirect(`${url}?${querystring}`);
            else ctx.redirect(url);

        } catch (error) {
            this.logErr("访问公司browserCompanyPage 出错", error)
            ctx.redirect("/page/error/412");
        }
    }


    getIndustryLoopData(data, value) {
        if (!data || !data.length) return null;
        try {
            for (let i = 0, len = data.length; i < len; i++) {
                let obj = data[i],
                    child = obj.child;

                if (obj.resName == value) {
                    return obj;
                } else if (child && child.length) {
                    let res = this.getIndustryLoopData(child, value);
                    if (res) return res;
                }
            }
        } catch (error) {
            this.logErr("循环遍历Industry菜单出错", error)
        }
        return null;
    }

    async redirectIndustryName() {
        const { ctx, config } = this;
        const params = ctx.params,
            industryName = params.industryName,
            path = params.path,
            querystring = ctx.querystring;
        try {
            //菜单数据
            let result = await this.getMenuData(config.fixedData.industryId, 5);
            let resData = this.getIndustryLoopData(result.child, industryName);
            let childResData = this.getLoopAttrData(resData.child, "path", path);
            if (!resData) {
                throw new Error('获取菜单出错');
            }
            let url = `/page/industry/${resData.resId}/${childResData.resId}/${path}`;
            if (querystring) ctx.redirect(`${url}?${querystring}`);
            else ctx.redirect(url);
        } catch (error) {
            this.logErr("访问公司菜单 出错", error)
            ctx.redirect("/page/error/506");
        }
    }

    /**
     * sourceType 国内电商
     */
    async redirectPmIndustryName() {
        const { ctx, config } = this;
        const params = ctx.params,
            resId = params.resId,
            path = params.path,
            querystring = ctx.querystring;
        // { resId } = ctx.query;
        try {
            // //菜单数据
            // let result       = await this.getMenuData(config.fixedData.industryId, 5);
            // let resData      = this.getIndustryLoopData(result.child, industryName);
            // let childResData = this.getLoopAttrData(resData.child, "path", path);
            // if(!resData){
            //     throw new Error('获取菜单出错');
            // }
            let url = `/page/appPM/${resId}/${path}`;
            if (querystring) ctx.redirect(`${url}?${querystring}`);
            else ctx.redirect(url);
        } catch (error) {
            this.logErr("访问公司菜单 出错", error)
            ctx.redirect("/page/error/506");
        }
    }



    async browseError() {
        await this.renderPage('index');
    }
}

module.exports = HomeController;
