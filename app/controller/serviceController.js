/*
 * @FileDescription    : 文件描述  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-05 16:59:59 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-08-Tu 09:32:05
 */

'use strict';

//egg 的基类
const UserController = require('./userController');
const APICONFIG = require('../../config/apiConfig');
const Base64 = require('js-base64').Base64;
const { getAccessState } = require('../util/index');

// 需要转换的字段
const MENU_NAP_NAME_LIST = ['工作台', '燃数研究'];
//公共基础Controller
class ServiceController extends UserController {

    async getUserGroupId() {
        let userGroupId = -1;
        //用户信息
        let userInfo = await this.getUserRedisInfo();
        if (userInfo) {
            try {
                let versionInfo = userInfo.versionInfo;
                userGroupId = versionInfo[0]["id"];
            } catch (error) {
                this.logErr("获取用户userGroupId 出错", error);
            }
        }
        return userGroupId;
    }


    async handlePrimaryMarketMenuPath(childList) {

        const find = (list) => {
            for (const item of list) {
                if (item.resAttr) {
                    const res = JSON.parse(item.resAttr);
                    if (res && res.path) {
                        const splitList = res.path.split('/');
                        splitList.splice(splitList.length - 1, 0, item.resId);
                        res.path = splitList.join('/');
                    }
                    item.resAttr = JSON.stringify(res);
                }
                if (item.child) {
                    find(item.child);
                }
            }
        }

        find(childList);

    }

    handlePrimaryMarketFocusOptions(menus, primaryMarketFocusOptions) {

        const mapData = {
            business_type: {
                '国内电商': {
                    value: 1,
                },
                '线下门店': {
                    value: 2,
                },
                '舆情分析': {
                    value: 3,
                }
            },
            attention_type: {
                '行业分析': {
                    value: 1,
                    name: '行业'
                },
                '品牌分析': {
                    value: 2,
                    name: '品牌'
                },
                '概念分析': {
                    value: 3,
                    name: '概念'
                }
            }
        }

        const assess = (obj) => {
            let accessState = getAccessState(obj.privilegeDtoList);
            if (accessState && accessState.code == "all") {
                return true;
            }
            return false;;
        }
        primaryMarketFocusOptions.business_type = []
        primaryMarketFocusOptions.attention_type = []
        for (var i = 0; i < menus.length; i++) {
            const item = menus[i];
            const currBusinessType = mapData.business_type[item.resName];
            if (assess(item) && currBusinessType) {
                primaryMarketFocusOptions.business_type.push({
                    label: item.resName,
                    value: currBusinessType.value
                })
            }
            if (Array.isArray(item.child)) {
                for (let j = 0; j < item.child.length; j++) {
                    const childItem = item.child[j];
                    const currAttentionType = mapData.attention_type[childItem.resName];
                    if (assess(childItem) && currAttentionType) {
                        primaryMarketFocusOptions.attention_type.push({
                            label: currAttentionType.name,
                            value: currAttentionType.value,
                            business_type_value: currBusinessType.value
                        })
                    }
                }
            }
        }
    }

    async handlePrimaryMarketMenu(menuData, primaryMarketFocusOptions) {

        const find = async (list) => {
            for (const item of list) {
                if (item.resName === '一级市场研究') {
                    const currMenuResult = await this.getMenuData(item.resId, 5);
                    // resAttr
                    item.child = currMenuResult.child;
                    this.handlePrimaryMarketFocusOptions(currMenuResult.child, primaryMarketFocusOptions);
                    this.handlePrimaryMarketMenuPath(item.child);
                    break;
                }

                if (item.child) {
                    await find(item.child);
                }
            }
        }
        await find(menuData.child || []);

    }

    async handleMenuPath(menuData, resNameList) {
        for (const item of menuData?.child) {
            if (resNameList.indexOf(item.resName) > -1) {
                this.handlePrimaryMarketMenuPath(item.child);
            }
        }
    }

    /**
     * 获取页面资源
     * @param {string} resId 
     * @param {string} parentId  
     * @param {string} path      通过path 获取当前页面
     */
    async getPageMixData(resId, parentId, path) {
        //用户信息
        let userInfo = await this.getUserRedisInfo();

        //登录用户所有系统
        let systemList = await this.getUserAllSystem();

        //页面信息
        let pageInfo = null;
        if (resId) {
            pageInfo = await this.getResInfoData(resId);
            if (!pageInfo) pageInfo = await this.getMenuData(resId);
        }

        //增加 userGroupId
        if (userInfo && pageInfo) {
            try {
                let versionInfo = userInfo.versionInfo;
                let userGroupId = versionInfo[0]["id"];
                pageInfo["userGroupId"] = userGroupId;
            } catch (error) {
                this.logErr("给页面信息增加用户userGroupId 出错");
            }
        }

        //菜单数据
        let menuData = await this.getMenuData(null, 3);

        // 处理一级市场的三级菜单
        let primaryMarketFocusOptions = {};
        await this.handlePrimaryMarketMenu(menuData, primaryMarketFocusOptions);
        // 处理需要对菜单的path添加资源id
        await this.handleMenuPath(menuData, MENU_NAP_NAME_LIST)
        if (!pageInfo && menuData && path) {
            // 二级市场聚合页获取看板信息用
            // if (path === '11342') path = 'comprehensiveBoard'
            let temp
            if (path === '11342') {
                let temp1 = this.getResDataByPath(menuData.child, 'appSM/11342');
                let temp2 = this.getResDataByPath(menuData.child, 'comprehensiveBoard');
                temp = Object.assign({}, temp2, temp1)
            } else {
                temp = this.getResDataByPath(menuData.child, path);
            }

            if (temp) pageInfo = temp;
        }

        userInfo.primaryMarketFocusOptions = primaryMarketFocusOptions;
        return {
            userInfo,
            pageInfo,
            systemList,
            menuData: menuData ? menuData.child : null
        }
    }

    //获取资源信息数据
    async getResInfoData(resId, level = 5) {
        let pageInfo = null;
        try {
            let result = await this.getResLinkTreeBy(resId, level);
            if (result && result.child) {
                pageInfo = await this.getParentResDataById(result.child, resId);
            }
        } catch (error) {
            this.logErr("获取资源数据", error)
        }
        return pageInfo;
    }

    //根据资源id 查找父亲
    getParentResDataById(datas, resId, parentInfo) {
        if (!datas || datas.constructor != Array || (datas.constructor == Array && !datas.length)) return null;
        for (let i = 0, len = datas.length; i < len; i++) {
            let obj = datas[i],
                child = obj.child;
            if (resId == obj.resId) {
                let accessState = getAccessState(obj.privilegeDtoList);
                if (accessState && accessState.code == "all") {
                    // if(child) delete obj.child;
                    return { ...obj, parentId: parentInfo.resId, parentName: parentInfo.resName };
                }
            } else if (child && child.length) {
                let res = this.getParentResDataById(child, resId, obj);
                if (res) return res;
            }
        }
        return null;
    }

    //从资源属性获取页面
    getResDataByPath(datas, path, parentInfo) {
        if (!datas || datas.constructor != Array || (datas.constructor == Array && !datas.length)) return null;
        for (let i = 0, len = datas.length; i < len; i++) {
            let obj = datas[i],
                child = obj.child,
                resAttr = obj.resAttr ? JSON.parse(obj.resAttr) : {};

            if (path == resAttr.path) {
                let accessState = getAccessState(obj.privilegeDtoList);
                if (accessState && accessState.code == "all") {
                    // if(child) delete obj.child;
                    return { ...obj, parentId: parentInfo.resId, parentName: parentInfo.resName };
                }
            } else if (child && child.length) {
                let res = this.getResDataByPath(child, path, obj);
                if (res) return res;
            }
        }
        return null;
    }


    //获取资源数据
    async getResDtoTree(resId, sysUniqueCode = this.config.systemCode) {
        const { ctx, config } = this;
        const sysUserId = this.getUserId();

        const result = await ctx.service.api.ajax(APICONFIG.COMMON_GETRESDTOTREE, {
            method: "POST",
            data: {
                operatorId: sysUserId,
                sysUniqueCode,
                resId,
            },
            basePath: config.API_DOMAIN.LOGIN_API_URL
        });

        return result && result.data.code == 200 ? result.data.data : null;
    }

    //获取资源链路数据
    async getResLinkTreeBy(resId, level, sysUniqueCode = this.config.systemCode) {
        const { ctx, config } = this;
        const sysUserId = this.getUserId();
        const userGroupId = await this.getUserGroupId();
        let param = {
            sysUniqueCode,
            operatorId: sysUserId,
            userGroupId,
            accessFlag: 1
        };
        //资源id
        if (resId) param["resId"] = resId;
        //
        if (level) param["level"] = level;

        const result = await ctx.service.api.ajax(APICONFIG.COMMON_QUERYPARENTANDSUBRESDTOTREEFORSEARCH, {
            method: "POST",
            data: param,
            basePath: config.API_DOMAIN.PERMISSIONS_URL
        });

        return result && result.data.code == 200 ? result.data.data : null;
    }

    //获取配置化模版数据
    async getTemplateList(path) {
        let templateList = null;
        try {
            if (path) {
                templateList = await this.getUserTemplateList(path);
                templateList = Base64.encode(JSON.stringify(templateList));
            }
        } catch (error) {
            console.log("获取配置模版数据出错")
        }
        return templateList;
    }

    //获取菜单数据
    async getMenuData(resId, level) {
        const { ctx, config } = this;
        const sysUserId = this.getUserId();
        const param = {
            sysUniqueCode: config.systemCode,
            operatorId: sysUserId
        };
        //资源id
        if (resId) param["resId"] = resId;
        //
        if (level) param["level"] = level;

        const result = await ctx.service.api.ajax(APICONFIG.COMMON_QUERYRESDTOTREE, {
            method: "POST",
            data: param,
            basePath: config.API_DOMAIN.PERMISSIONS_URL
        });

        return result && result.data.code == 200 ? result.data.data : null;
    }

    //查询用户所有系统
    async getUserAllSystem() {
        const { ctx, config } = this;
        const sysUserId = this.getUserId();

        const result = await ctx.service.api.ajax(APICONFIG.COMMON_GETALLSYSTEMANDVERSION, {
            method: "get",
            basePath: config.API_DOMAIN.PERMISSIONS_URL,
            data: {
                sysUserId,
            }
        });
        return result && result.data.code == 200 ? result.data.data : null;
    }

    getLoopMenuData(data) {
        if (!data || !data.length) return null;
        for (let i = 0, len = data.length; i < len; i++) {
            let obj = data[i],
                child = obj.child,
                resAttr = obj.resAttr ? JSON.parse(obj.resAttr) : {},
                path = resAttr.path;
            // if(obj && path && (!child || (child && resAttr.ifHideSubMenu)) && obj.menuState && !resAttr.ifHideMenu){
            if (obj && path) {
                let accessState = getAccessState(obj.privilegeDtoList);
                if (accessState && accessState.code == "all") return { ...obj, path };
            } else if (child && child.length) {
                let res = this.getLoopMenuData(child);
                if (res) return res;
            }
        }
        return null;
    }

    async getUserFirstMenu(data) {
        //菜单数据
        let resId = null;
        let path = null;
        try {
            let menuData = data && data.child ? data : await this.getMenuData(null, 3);
            this.handleMenuPath(menuData, MENU_NAP_NAME_LIST)
            let firstObj = this.getLoopMenuData(menuData.child);
            if (firstObj) {
                resId = firstObj.resId;
                path = firstObj.path;
            }
        } catch (error) {
            this.logErr(`获取用户登录后第一个可访问菜单出错`, error);
        }
        return {
            resId,
            path
        };
    }

    async getUserSecondMenu(data) {
        //菜单数据
        let resId = null;
        let path = null;
        try {
            let menuData = data && data.child ? data : await this.getMenuData(null, 3);
            let secondObj = this.getLoopMenuData(menuData.child.splice(1,));
            if (secondObj) {
                resId = secondObj.resId;
                path = secondObj.path;
            }
        } catch (error) {
            this.logErr(`获取用户登录后第一个可访问菜单出错`, error);
        }
        return {
            resId,
            path
        };
    }

    async hasMenuByResName(name) {
        try {
            let menuData = data && data.child ? data : await this.getMenuData(null, 3);

            if (!menuData || !menuData.length) return null;
            let hasAccessMenuList = [];
            for (let i = 0, len = menuData.length; i < len; i++) {
                let obj = menuData[i],
                    // child = obj.child,
                    resAttr = obj.resAttr ? JSON.parse(obj.resAttr) : {},
                    path = resAttr.path;
                obj.path = path;
                let accessState = getAccessState(obj.privilegeDtoList);
                if (accessState && accessState.code == "all") {
                    hasAccessMenuList.push(obj);
                }
            }

            return hasAccessMenuList.find(f => f.resName === name);

        } catch (error) {
            this.logErr(`判断当前用户是否该资源`, error);
        }
        return null;
    }

    async getUserGuideRecord({ sysId, type }) {
        const { ctx, config } = this;
        // const type          = 1,
        const sysUserId = await this.getUserId();

        if (!sysId || !sysUserId) {
            this.paramError();
            return;
        }

        //query data
        const result = await this.ctx.service.api.ajax(APICONFIG.GETUSERGUIDERECORD, {
            basePath: config.API_DOMAIN.PERMISSIONS_URL,
            data: {
                sysId,
                type,
                sysUserId
            }
        })

        return result && result.data.code == 200 ? result.data.data : null;
    }
}

module.exports = ServiceController;