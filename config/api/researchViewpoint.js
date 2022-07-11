/*
 * @FileDescription    : 文件描述  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-12-25 22:29:14 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-08-Th 02:51:17
 */

'use strict';

//接口api地址
module.exports = {
  GET_VIEWPOINT_IS_READ: '/viewpoint-system-backend/viewpoint/getIseRad',

  GET_VIEWPOINT_LIST: "/viewpoint-system-backend/viewpoint/getViewpointInfoAsForeground",
  UPDATE_VIEWPOINT_COLLECT_STATUS: "/viewpoint-system-backend/viewpoint/updateIsCollect",

  GET_VIEWPOINT_INFO: '/viewpoint-system-backend/viewpoint/getProsceniumViewpointInfo',
  GET_RELEVAN_VIEWPOINT_LIST: '/viewpoint-system-backend/viewpoint/getRelevantViewpointList',


  // 通知
  GET_INFORM_LIST: '/viewpoint-system-backend/viewpoint/getInform',
  UPDATE_ALL_INFORM_READ: '/viewpoint-system-backend/viewpoint/informIsRead'
}