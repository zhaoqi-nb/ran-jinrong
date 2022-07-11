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
  app.router.get('/viewpoint-system-backend/viewpoint/getIseRad', verifyApi, app.controller.researchViewpointController.getViewpointIsRead)

  app.router.get('/viewpoint-system-backend/viewpoint/getViewpointInfoAsForeground', verifyApi, app.controller.researchViewpointController.getViewpointList)
  app.router.get('/viewpoint-system-backend/viewpoint/updateIsCollect', verifyApi, app.controller.researchViewpointController.updateViewpointCollectStatus)

  app.router.get('/viewpoint-system-backend/viewpoint/getProsceniumViewpointInfo', verifyApi, app.controller.researchViewpointController.getViewpointInfo)
  app.router.get('/viewpoint-system-backend/viewpoint/getRelevantViewpointList', verifyApi, app.controller.researchViewpointController.getRelevantViewpointList)

  // 通知
  app.router.get('/viewpoint-system-backend/viewpoint/getInform', verifyApi, app.controller.researchViewpointController.getInformList)
  app.router.get('/viewpoint-system-backend/viewpoint/informIsRead', verifyApi, app.controller.researchViewpointController.updateAllInformRead)
};