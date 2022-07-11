'use strict';

module.exports = app => {
    const verifyApi = app.middleware.verifyApi();
    //api
    app.router.post('/api/templateOperation/getTemplateList', verifyApi, app.controller.templateOperationController.getTemplateList);
    app.router.post('/api/templateOperation/addTemplate', verifyApi, app.controller.templateOperationController.addTemplate);
    app.router.post('/api/templateOperation/upTemplateInfo',verifyApi, app.controller.templateOperationController.upTemplateInfo);

    app.router.post('/api/templateOperation/addBatchAppend',verifyApi, app.controller.templateOperationController.addBatchAppend);
    app.router.post('/api/templateOperation/createMoreRecord', verifyApi, app.controller.templateOperationController.createMoreRecord);
    app.router.post('/api/templateOperation/copyRecord', verifyApi, app.controller.templateOperationController.copyRecord);
}