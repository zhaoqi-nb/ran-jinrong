'use strict';

module.exports = app => {
    const verifyApi = app.middleware.verifyApi();
    //api
    app.router.get('/api/config/component/chart', verifyApi, app.controller.configPageController.getChartData);
    app.router.get('/api/config/getQueryTableData', verifyApi, app.controller.configPageController.getQueryTableData);
    app.router.get('/api/config/getLoopIndustryTableData', verifyApi, app.controller.configPageController.getLoopIndustryTableData);
    app.router.get('/api/config/common/templateData', verifyApi, app.controller.configPageController.getTemplateData);

    //配置化指标获取
    app.router.get('/api/zb/getSelectedZbInfo', verifyApi, app.controller.configPageController.getSelectedZbInfo);

    // APP行业对比
    app.router.get('/appDetails/addIndustryContrastId', verifyApi, app.controller.configPageController.addIndustryContrastId);
    app.router.get('/appDetails/getIndustryContrastId', verifyApi, app.controller.configPageController.getIndustryContrastId);
    app.router.get('/appDetails/getIndustryId', verifyApi, app.controller.configPageController.getIndustryId)

    //  获取时间轴数据
    app.router.get('/offlineBrand/getBrandFinanceInfo', verifyApi, app.controller.configPageController.getBrandFinanceInfo);

    // 通用搜索
    // 热门品牌
    app.router.get('/trackSearch/getEcommerceHotList', verifyApi, app.controller.configPageController.getEcommerceHotList);
    // 搜索历史
    app.router.get('/trackSearch/getEcommerceSearchHistoryList', verifyApi, app.controller.configPageController.getEcommerceSearchHistoryList);
    // 搜索列表
    app.router.get('/trackSearch/getSearchList', verifyApi, app.controller.configPageController.getSearchList);
    // 搜索列表
    app.router.get('/trackSearch/getBrandDetailList', verifyApi, app.controller.configPageController.getBrandDetailList);
    // 清空历史记录
    app.router.get('/trackSearch/delEcommerceSearchHistoryList', verifyApi, app.controller.configPageController.delEcommerceSearchHistoryList);
}