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
    app.router.get('/api/batchDownload/batchDownloadList', verifyApi, app.controller.downloadController.batchDownloadList);
    app.router.get('/api/batchDownload/downloadDetail', verifyApi, app.controller.downloadController.downloadDetail);
    app.router.get('/api/batchDownload/downloadBoardIndustry', verifyApi, app.controller.downloadController.downloadBoardIndustry);
    app.router.get('/api/batchDownload/getDownloadList', verifyApi, app.controller.downloadController.getDownloadList); 
    
    app.router.get('/api/batchDownload/matchNewestData', verifyApi, app.controller.downloadController.matchNewestData);     
    app.router.get('/api/batchDownload/reDownload', verifyApi, app.controller.downloadController.reDownload);
    app.router.get('/api/batchDownload/upDownloadFileName', verifyApi, app.controller.downloadController.upDownloadFileName);  
};