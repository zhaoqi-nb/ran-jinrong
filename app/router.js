/*
 * @FileDescription    : 文件描述  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-05 19:29:14 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-08-We 10:45:54
 */

'use strict';

module.exports = app => {
    const { router, controller } = app;
    const verifyLogin = app.middleware.verifyLogin();
    // const verifyPath = app.middleware.verifyPath();

    //---------- page ----------------
    router.get('/', verifyLogin, controller.homeController.index);
    //错误页面
    router.get('/page/error/:code', controller.homeController.browseError);
    //特殊
    router.get('/page/explain', controller.homeController.browserCustomPage);


    //跳转国内电商行业详情
    router.get('/redirect/pmIndustryName/:resId/:path', verifyLogin, controller.homeController.redirectPmIndustryName);

    router.get('/page/:path', verifyLogin, controller.homeController.browserCustomPage);
    router.get('/page/config/:path', verifyLogin, controller.homeController.browserConfigPage);
    router.get('/page/config/:resId/:path', verifyLogin, controller.homeController.browserConfigPage);
    router.get('/page/config/:resId/:path', verifyLogin, controller.homeController.browserConfigPage);


    // 一级市场
    router.get('/page/appPM/:resId/:path', verifyLogin, controller.homeController.browserConfigPage);
    // 二级市场子应用
    // 聚合页
    router.get('/page/appSM/:path', verifyLogin, controller.homeController.browserCustomPage);
    // 关注
    router.get('/page/appSM/:resId/:path', verifyLogin, controller.homeController.browserConfigPage);
    // 618
    router.get('/page/appSM/:parentId/:resId/:path', verifyLogin, controller.homeController.browserAnalysisPage);

    //访问 行业/公司/品牌/看板
    router.get('/page/:type/:resId', verifyLogin, controller.homeController.redirectAnalysisPage);
    router.get('/page/:type/:parentId/:resId/:path', verifyLogin, controller.homeController.browserAnalysisPage);

    //访问报告详情
    // router.get('/page/custom/vv/vv/ww/reportDetail', verifyLogin, controller.reportController.redirectReportDeatil);
    //重定向页面
    //特殊跳转 - app
    router.get('/redirect/app/:type', verifyLogin, controller.homeController.redirectAppPath);
    router.get('/redirect/app/:type/:path', verifyLogin, controller.homeController.redirectAppPath);

    // app三期行业对比、行业详情
    router.get('/redirect/appAnalyze/compare/:parentId/:resId/:path', verifyLogin, controller.homeController.redirectAppCompare);
    router.get('/redirect/appAnalyze/detail/:parentId/:resId/:path', verifyLogin, controller.homeController.redirectAppDetail);

    //通过行业名称跳转
    router.get('/redirect/industryName/:industryName/:path', verifyLogin, controller.homeController.redirectIndustryName);
    //通过资源id跳转公司
    router.get('/redirect/company/:resId', verifyLogin, controller.homeController.redirectCompany);
    router.get('/redirect/company/:resId/:path', verifyLogin, controller.homeController.redirectCompany);

    //通用跳转
    //跳转到统一页面的统一菜单
    router.get('/redirect/:type/:resId', verifyLogin, controller.homeController.redirectResId);
    router.get('/redirect/:type/:parentId/:path', verifyLogin, controller.homeController.redirectPath);


    //登录
    router.get('/login', controller.homeController.browseLogin);
    router.get('/login/:language', controller.homeController.browseLogin);
    // router.get('/resetpass', controller.homeController.browseLogin);
    // router.get('/login', controller.homeController.redirectLangueLogin);
    router.get('/doLogout', controller.homeController.doLogout);

    //公共
    require('./router/common')(app);
    require('./router/templateOperation')(app);
    //配置化
    require('./router/configPage')(app);
    //登录
    require('./router/login')(app);
    //报告
    require('./router/report')(app);
    //观点
    require('./router/researchViewpoint')(app);

    //一级市场
    require('./router/primaryMarket')(app);

    //下载
    require('./router/download')(app);

};