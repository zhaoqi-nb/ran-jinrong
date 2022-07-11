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
    //获取报告接口
    app.router.get('/api/report/getShowReportList', verifyApi, app.controller.reportController.getShowReportList);
    app.router.get('/api/report/getShowReportListForSaas', verifyApi, app.controller.reportController.getShowReportListForSaas);
    //相关报告列表
    app.router.get('/api/report/getRelateShowReportListForSaas', verifyApi, app.controller.reportController.getRelateShowReportListForSaas);
    //收藏报告
    app.router.get('/api/report/collectGuestReport', verifyApi, app.controller.reportController.collectGuestReport);

    app.router.post('/api/report/addGuestReportJob', verifyApi, app.controller.reportController.addGuestReportJob);
    //报告详情
    app.router.get('/api/report/getReportInfoForGuest', verifyApi, app.controller.reportController.getReportInfoForGuest);
    //申请查看
    app.router.post('/api/report/updateReportApplyInfo', verifyApi, app.controller.reportController.updateReportApplyInfo);
    //预览pdf
    app.router.get('/api/report/PDF', verifyApi, app.controller.reportController.transitionPDF);
    //下载pdf
    app.router.get('/api/report/reportDownload', verifyApi, app.controller.reportController.reportDownload);
    //通用api
    app.router.get('/api/report/reportCommonApi', verifyApi, app.controller.reportController.reportCommonApi);
};