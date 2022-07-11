/*
 * @FileDescription    : 文件描述  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-12-26 00:01:23 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-08-Th 02:47:37
 */

'use strict';

module.exports = app => {
    const verifyApi = app.middleware.verifyApi();
    //api
    //获取时间范围
    app.router.get('/api/common/getTimeRange', verifyApi, app.controller.commonController.getTimeRange);
    app.router.get('/api/common/getDataOpenTime', verifyApi, app.controller.commonController.getDataOpenTime);
    //一级市场数据周期获取接口
    app.router.get('/api/common/getDataCycle', verifyApi, app.controller.commonController.getDataCycle);
    //获取模板信息
    app.router.get('/api/config/getTemplateInfo', verifyApi, app.controller.commonController.getTemplateInfo);
    // 批量获取魔板数据
    app.router.post('/api/config/batchGetTemplateInfo', verifyApi, app.controller.commonController.batchGetTemplateInfo);

    //用户关注
    app.router.post('/api/userbehavior/addAttention', verifyApi, app.controller.commonController.addAttention);
    app.router.post('/api/userbehavior/delUserAttention', verifyApi, app.controller.commonController.delUserAttention);
    app.router.get('/api/userbehavior/getUserAttention', verifyApi, app.controller.commonController.getUserAttention);

    //根据资源id获取菜单
    app.router.get('/api/limitOperation/queryMenuByResId', verifyApi, app.controller.commonController.queryMenuByResId);

    //获取存储自定义数据
    app.router.get('/api/limitOperation/getConfigData', verifyApi, app.controller.commonController.getConfigData);
    app.router.post('/api/limitOperation/setConfigData', verifyApi, app.controller.commonController.setConfigData);

    //下载数据记录
    app.router.post('/api/commonOperate/downloadOperation', verifyApi, app.controller.commonController.downloadOperation);

    //设置中英文设置
    app.router.post('/api/userbehavior/setLanguage', app.controller.commonController.setLanguage);
    app.router.get('/api/commonOperate/getEnglishDict', app.controller.commonController.getEnglishDict);
    app.router.get('/api/commonOperate/refreshLanguageCache', app.controller.commonController.refreshLanguageCache);

    // 获取语言包LANGUAGE_PACKAGE
    app.router.get('/api/getLanguagePackage', app.controller.commonController.getLanguagePackage);

    //用户行为
    app.router.get('/api/usertemplate/getTemplateBehavior', app.controller.commonController.getTemplateBehavior);
    app.router.post('/api/usertemplate/saveTemplateBehavior', app.controller.commonController.saveTemplateBehavior);
    app.router.post('/api/usertemplate/delTemplateBehavior', app.controller.commonController.delTemplateBehavior);
    app.router.post('/api/limitOperation/updateFrontTemplate', verifyApi, app.controller.commonController.updateFrontTemplate);

    //未找到英文翻译
    app.router.get('/api/usertemplate/notFoundEnglish', app.controller.commonController.notFoundEnglish);

    app.router.get('/api/common/queryResDtoListByAttr', app.controller.commonController.queryResDtoListByAttr);
    app.router.get('/api/common/queryIndustryDtoListByAttr', app.controller.commonController.queryIndustryDtoListByAttr);
    app.router.get('/api/common/queryParentAndSubResDtoTreeOnlyPageAccessInfo', app.controller.commonController.queryParentAndSubResDtoTreeOnlyPageAccessInfo);

    app.router.get('/api/common/getStockSortList', app.controller.commonController.getStockSortList);
    app.router.get('/api/common/getSearchMappingList', app.controller.commonController.getSearchMappingList);

    // app.router.get('/api/common/addAttention', app.controller.commonController.addAttention);
    // app.router.get('/api/common/delUserAttention', app.controller.commonController.delUserAttention);

    //通用组件api
    app.router.get(/^\/api\/commonTemplateBusinessApi\/([\w\/]+)$/, verifyApi, app.controller.commonController.getCommonTemplateBusinessApi);

    //一级市场国内详情概念左侧详情
    app.router.get('/api/summaryBrand/getSummaryWordInfo', verifyApi, app.controller.commonController.getSummaryWordInfo);
    app.router.get('/api/trackAnalysis/getDEIndustrySidebar', verifyApi, app.controller.commonController.getDEIndustrySidebar);
    app.router.get('/api/trackAnalysis/getBoardBrandDetail', verifyApi, app.controller.commonController.getBoardBrandDetail);
    app.router.get('/api/offlineBrand/getOfflineBrandDetail', verifyApi, app.controller.commonController.getOfflineBrandDetail);
    app.router.get('/api/offlineIndustry/getIndustryDetail', verifyApi, app.controller.commonController.getIndustryDetail);
    app.router.get('/api/trackAnalysis/getTopBrandTag', verifyApi, app.controller.commonController.getTopBrandTag);
    app.router.get('/api/redBook/getIndustryDetail', verifyApi, app.controller.commonController.getRedIndustryDetail);
    app.router.get('/api/redBook/getBrandDetail', verifyApi, app.controller.commonController.getRedBrandDetail);
    app.router.get('/api/redBook/getConceptDetail', verifyApi, app.controller.commonController.getRedConceptDetail);

    //二级市场聚合页
    app.router.get('/api/common/queryResDtoListBySecondaryTMT', verifyApi, app.controller.commonController.queryResDtoListBySecondaryTMT);

    //引导接口
    app.router.get('/api/userbehavior/getUserGuideRecord', app.controller.commonController.getUserGuideRecord);
    app.router.get('/api/userbehavior/addUserGuideRecord', app.controller.commonController.addUserGuideRecord);
    app.router.get('/api/userbehavior/removeUserGuideRecord', app.controller.commonController.removeUserGuideRecord);

    // 代理接口
    app.router.get('/proxy/api', verifyApi, app.controller.commonController.proxyApi)
};