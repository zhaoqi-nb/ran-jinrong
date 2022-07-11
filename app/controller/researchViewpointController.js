/*
 * @FileDescription    : 获取公用属性  
 * @Author             : baoping.chen@fengjr.com
 * @Date               : 2018-09-26 16:59:06 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-08-Th 02:48:01
 */

'use strict';

const ServiceController = require('./serviceController'),
  moment = require('moment'),
  apiConfig = require('../../config/apiConfig'),
  _ = require('lodash');

class ReportController extends ServiceController {

  constructor(app) {
    super(app);
    this.basePath = this.config.API_DOMAIN.CONTENT_MANAGE_URL;
  }

  async getViewpointIsRead() {
    const { ctx } = this;
    const query = ctx.query || {};

    const result = await this.ctx.service.api.ajax(apiConfig.GET_VIEWPOINT_IS_READ, {
      method: "get",
      basePath: this.basePath,
      data: query
    })

    this.returnData(result.data);
  }

  async getViewpointList() {
    const { ctx } = this;
    const query = ctx.query || {},
      operatorId = this.getUserId();

    query.createId = operatorId

    const result = await this.ctx.service.api.ajax(apiConfig.GET_VIEWPOINT_LIST, {
      method: "get",
      basePath: this.basePath,
      data: query
    })

    this.returnData(result.data);
  }

  async getViewpointInfo() {
    const { ctx } = this;
    const query = ctx.query || {};

    const result = await this.ctx.service.api.ajax(apiConfig.GET_VIEWPOINT_INFO, {
      method: "get",
      basePath: this.basePath,
      data: query
    })

    this.returnData(result.data);
  }

  async updateViewpointCollectStatus() {
    const { ctx } = this;
    const query = ctx.query || {};

    const result = await this.ctx.service.api.ajax(apiConfig.UPDATE_VIEWPOINT_COLLECT_STATUS, {
      method: "PUT",
      basePath: this.basePath,
      data: query
    })

    this.returnData(result.data);
  }

  async getRelevantViewpointList() {
    const { ctx } = this;
    const query = ctx.query || {};

    const result = await this.ctx.service.api.ajax(apiConfig.GET_RELEVAN_VIEWPOINT_LIST, {
      method: "get",
      basePath: this.basePath,
      data: query
    })

    this.returnData(result.data);
  }


  async getInformList() {
    const { ctx } = this;
    const query = ctx.query || {};

    const result = await this.ctx.service.api.ajax(apiConfig.GET_INFORM_LIST, {
      method: "get",
      basePath: this.basePath,
      data: query
    })

    this.returnData(result.data);
  }

  async updateAllInformRead() {
    const { ctx } = this;
    const query = ctx.query || {};

    const result = await this.ctx.service.api.ajax(apiConfig.UPDATE_ALL_INFORM_READ, {
      method: "PUT",
      basePath: this.basePath,
      data: query
    })

    this.returnData(result.data);
  }

}

module.exports = ReportController;