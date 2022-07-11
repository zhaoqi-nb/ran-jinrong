/*
 * @FileDescription    : 文件描述  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-05 16:59:59 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-08-Tu 09:32:05
 */
 
'use strict';

//egg 的基类
const   BaseController = require('./baseController');
const   APICONFIG    = require('../../config/apiConfig'),
        userAgent    = require("../util/userAgent"),
      { getAccessState } = require('../util/index'),
        Base64       = require('js-base64').Base64,
        languageData = require("../../static/src/page/component/locales/api-msgs");
    
//公共基础Controller
class UserController extends BaseController {
     /**
     * 获取权限数据
     */
    getPermissionAuthData(obj = {}){
        let auth = {},
            company = {};
        for(let key in obj){
            let page = obj[key],
                privilegeDtoList = page.privilegeDtoList,
                arr = [],
                com = [];
            privilegeDtoList.forEach((item)=>{
                let property = item.property,
                    privilegeName = item.privilegeName,
                    privilegeType = item.privilegeType;
                if(privilegeType == "APP" && privilegeName=="company"){
                    property = JSON.parse(property);
                    com.push(property);
                } else if(privilegeType == "APP" && property) arr.push(property);
            })
            auth[key] = arr;
            company[key] = com;
        }
        return {
            auth,
            company
        };
    }

    //get user redis info
    async getUserRedisInfo(){
        let userCache = null;
        try {
            let sysUserId = this.getUserId();
            if(sysUserId){
                let data = await this.getPermissionsCache("userInfo");
                userCache = data.userInfo;
            }
        } catch (error) {
            this.logErr("获取getUserRedisInfo出错",error);
        }
        return userCache;
    }
 
    //获取用户数据
    async getUserBehaviorData(pageId, param){
        let user_behavior = null;
        if(pageId == "home" || pageId=="login"){
            user_behavior = await this.getUserBehaviorTokenCookie();
        }else{
            if(param && param.pageInfo && param.userInfo){
               try {
                    let pageInfo    = param.pageInfo,
                        userGroupId = pageInfo.userGroupId,
                        userInfo    = param.userInfo,
                        versionInfo = userInfo.versionInfo;
                    
                    let temp = versionInfo.find(item=>item.id == userGroupId);
                    if(temp && temp.configValue){
                        let configValue = JSON.parse(temp.configValue);
                        user_behavior = { data:configValue }
                    }
               } catch (error) {
                   this.logErr("解析中英文语言 出错", error)
               }
            }
        }

        return user_behavior?user_behavior:{ data:{language:"zh_CN"} };
    }

    async renderPage(pageId, param ={}){
        const { ctx } = this;
        let user_behavior = await this.getUserBehaviorData(pageId, param);
        //添加 title
        param["title"] = this.getPageTitle(param.pageInfo, user_behavior)

        if(user_behavior && user_behavior.data){
            let language = user_behavior.data.language;
            if(language){
                param["loadText"] = "Loading..."//language=="zh_CN"?"加载中请稍后":"Loading, please wait!";
            }
            param["cacheData"] = Base64.encode(JSON.stringify(user_behavior.data));
        }
        return await ctx.render(pageId, param);
    }
    
    getPageTitle(pageInfo, user_behavior){
        let language = user_behavior && user_behavior.data?user_behavior.data.language:"zh_CN";
        if(!pageInfo) return language == "zh_CN"?"燃数科技-新经济洞察引擎":"Data Burning-A new economic insight engine";
        let title = pageInfo.resName;
        try {
            if(language == "en_US"){
                //如果菜单属性里面 有英文，则直接用
                if(pageInfo.resNameEn) title = pageInfo.resNameEn;
                //如果 标题名称 等于  "燃数科技-新经济洞察引擎" 直接翻译
                else if(title == "燃数科技-新经济洞察引擎") title = "Data Burning-A new economic insight engine";
                //如果菜单包含 menuName 则 翻译
                else if(pageInfo.resAttr){
                    let menuName = pageInfo.resAttr.menuName?pageInfo.resAttr.menuName:title;
                    let temp = languageData["en_US"];
                    if(temp && temp[menuName]) title = temp[menuName];
                }
            }else if(pageInfo.resAttr && pageInfo.resAttr.menuName) title = pageInfo.resAttr.menuName;
        } catch (error) {
            console.log(error);
        }
        return title;
    }

    //query the redis in the cache
    async getRedisCache(redis_key, resId, userGroupId){
        if(!redis_key) return;
        const { ctx, config } = this;
        let data = null;
        try {
            const userTocken = this.getUserTockenCookie(),
                  sysUserId  = userTocken.sysUserId,
                  tocken     = userTocken.tocken;

            let param = {
                systemCode:config.systemCode,
                type:redis_key,
                sysUserId,
                redisKey:`${sysUserId}_${tocken}`,
                
            }
            
            if(resId) param["resId"] = resId;
            if(userGroupId) param["userGroupId"] = userGroupId;

            const   result  = await ctx.service.api.ajax(APICONFIG.GETUSERCACHE,{
                        method:"POST",
                        data:param,
                        basePath:config.API_DOMAIN.LOGIN_API_URL
                });
            
            if(result.data.code == 200){
                data = result.data && result.data.data?result.data.data:result.data;
                return data;
            }
        } catch (error) {
            this.logErr("获取userCache出错",error);
        }
   
        return data;
    }

    //get Dashboard data
    async getPermissionsCache(keys, userGroupId, resId, systemCode=this.config.systemCode){
        if(!keys) return;
        const { ctx, config } = this;
        let data = null;
        try {
            let userTocken = this.getUserTockenCookie(),
                sysUserId  = userTocken.sysUserId,
                tocken     = userTocken.tocken;

            let param = {
                systemCode,
                sysUserId,
                tocken,
                keys,
                userGroupId
            }

            if(resId) param["resId"] = resId;

            let result  = await ctx.service.api.ajax(APICONFIG.COMMON_GETPERMISSIONSCACHE,{
                    method:"POST",
                    data:param,
                    basePath:config.API_DOMAIN.LOGIN_API_URL
                });
            
            if(result.data.code == 200 && result.data && result.data.data){
                data = result.data.data;
            }
        } catch (error) {
            this.logErr("获取getPermissionsCache data 出错",error);
        }
        return data;
    }

    async getPermissionsPageCache(userGroupId, resId){
        if(!userGroupId || !resId) return;
        const { ctx, config } = this;
        let data = null;
        try {
            let userTocken = this.getUserTockenCookie(),
                sysUserId  = userTocken.sysUserId,
                tocken     = userTocken.tocken;

            let param = {
                systemCode:config.systemCode,
                sysUserId,
                tocken,
                resId,
                userGroupId
            }
            
            let result  = await ctx.service.api.ajax(APICONFIG.GETPERMISSIONSFORPAGECACHE,{
                    method:"POST",
                    data:param,
                    basePath:config.API_DOMAIN.LOGIN_API_URL
                });
            
            if(result.data.code == 200 && result.data && result.data.data){
                data = result.data.data;
                let menu_page = data.menu_page,
                    privilegeDtoList = menu_page.privilegeDtoList;

                let accessState = getAccessState(privilegeDtoList);
                if(!accessState || accessState.code != "all") throw new Error("获取 accessState 失败， 页面没有访问权限"); 
            }
        } catch (error) {
            this.logErr("获取getPermissionsPageCache data 出错",error);
            data = null;
        }
        return data;
    }

    //query the redis in the caches
    async getRedisCaches(redis_key, resId, menuId){
        if(!redis_key) return;
        const { ctx, config } = this;
        let data = null;
        try {
            const userTocken = this.getUserTockenCookie(),
                  sysUserId  = userTocken.sysUserId,
                  tocken     = userTocken.tocken;

            let param = {
                systemCode:config.systemCode,
                types:redis_key,
                sysUserId,
                redisKey:`${sysUserId}_${tocken}`,
                resId,
                menuId
            }
            
            if(resId) param["resId"] = resId;

            const   result  = await ctx.service.api.ajax(APICONFIG.GETUSERCACHES,{
                        method:"POST",
                        data:param,
                        basePath:config.API_DOMAIN.LOGIN_API_URL
                });
            
            if(result.data.code == 200){
                data = result.data && result.data.data?result.data.data:result.data;
                return data;
            }
        } catch (error) {
            this.logErr("获取userCache出错",error);
        }
   
        return data;
    }

    //query the page redis in the caches
    async getPageCaches(resId, userGroupId){
        if(!resId) return;
        const { ctx, config } = this;
        let data = null;
        try {
            const userTocken = this.getUserTockenCookie(),
                  sysUserId  = userTocken.sysUserId,
                  tocken     = userTocken.tocken;

            let param = {
                systemCode:config.systemCode,
                sysUserId,
                redisKey:`${sysUserId}_${tocken}`,
                resId,
            }
            
            if(userGroupId) param["userGroupId"] = userGroupId;
            
            const   result  = await ctx.service.api.ajax(APICONFIG.GETPAGECACHES,{
                        method:"POST",
                        data:param,
                        basePath:config.API_DOMAIN.LOGIN_API_URL
                });
            
            if(result.data.code == 200){
                data = result.data && result.data.data?result.data.data:result.data;
                return data;
            }
        } catch (error) {
            this.logErr("获取userCache出错",error);
        }
   
        return data;
    }

    async fromPathToResId(resId, path){
        const { ctx, config } = this;
        try {
            let userTocken = this.getUserTockenCookie(),
                sysUserId  = userTocken.sysUserId;

            let param = {
                systemCode:config.systemCode,
                sysUserId,
                path,
                resId
            }
            
            let result  = await ctx.service.api.ajax(APICONFIG.FROMPATHTORESID,{
                    method:"POST",
                    data:param,
                    basePath:config.API_DOMAIN.LOGIN_API_URL
                });
            return result.data && result.data.code == 200?result.data.data:null;
        } catch (error) {
            this.logErr("获取userCache出错",error);
        }
   
        return null;
    }

    //设置用户 token
    async setUserTokenCookie({sysUserId, name, dept, tocken}=data){
        const { ctx, config } = this;
         
        try {
            let user_agent = ctx.get('user-agent');
            let browser    = userAgent.judgeTerminalBrowser(user_agent);
            let ip         = ctx.header["x-forwarded-for"]?ctx.header["x-forwarded-for"]:ctx.ip;
            let version    = config.systemVersion;

            //rs_user: sysUserId + 浏览器信息 + IP + 登录时间
            let rs_user = this.getEncrypt({
                sysUserId,
                name,
                dept,
                browser,
                ip,
                version,
                tocken,
                time:new Date().getTime()
            });

            ctx.cookies.set(config.cookieKey.userToken, rs_user, this.getCookieOption());
            return true;
        } catch (error) {
            this.logErr("设置用户userToken 出错",error);
        }
        return false;
    }

    //设置userBehavior token
    async setUserBehaviorTokenCookie(data){
        if(!data) return;
        const { ctx, config } = this;
        
        try {
            let systemVersion = config.systemCode

            //userBehavior
            let rs_ub_token = this.getEncrypt({
                data,
                systemVersion,
                time:new Date().getTime()
            });
            //设置用户信息永久储存(10年)
            ctx.cookies.set(config.cookieKey.userBehavior, rs_ub_token, this.getCookieOption(10*365*24*60*60*1000));
        } catch (error) {
            this.logErr("设置ApiToken 出错",error);
            return false;
        }
        return true;
    }
 

    //得到用户模版信息
    async getUserTemplateList(rootInstantiationId){
        if(!rootInstantiationId) return null;
        const { ctx } = this;
        const result = await ctx.service.api.ajax(APICONFIG.GETUSERTEMPLATELIST,{
                method:"get",
                data:{
                    rootInstantiationId,
                }
        });
        let template = null;
        if(result.data.code == 200){
            try {
                let data = result.data.data.list;
                template = this.decompositionData(data);
            } catch (error) {
                ctx.service.logHelper.logErr("获取模版信息出错", error);
            }
        }

        return template;
    }

    //分解数据
    decompositionData(datas){
        const {ctx} = this;
        let template = {};
        try {
            for(let i=0,len=datas.length;i<len;i++){
                let obj             = datas[i],
                    instantiationId = obj.instantiationId,
                    templateId      = obj.templateId,
                    subList         = obj.subList;
                //删除 没用项

                delete obj.templatePropertyValue
                if(subList && subList.length){
                    if(templateId && !template[instantiationId]) template[instantiationId] = obj;
                    let result = this.decompositionData(subList);
                    template = Object.assign({}, template, result);
                }else if(templateId && !template[instantiationId]){
                    template[instantiationId] = obj;
                }
            }
        } catch (error) {
            ctx.service.logHelper.logErr("分解模版数据出错", error);
        }
        return template;
    }


}

module.exports = UserController;