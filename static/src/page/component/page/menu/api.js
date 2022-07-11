
'use strict';

import Server from '../../../../plugin/Server';

class Api extends Server {
  async getUserGuideRecord(data = {}) {
    return await this.Http({
      url: '/api/userbehavior/getUserGuideRecord',
      type: "GET",
      data
    })
  }
  async addUserGuideRecord(data = {}) {
    return await this.Http({
      url: '/api/userbehavior/addUserGuideRecord',
      type: "GET",
      data
    })
  }
  async removeUserGuideRecord(data = {}) {
    return await this.Http({
      url: '/api/userbehavior/removeUserGuideRecord',
      type: "GET",
      data
    })
  }

  async getViewpointIsRead(data = {}) {
    return await this.Http({
      url: '/viewpoint-system-backend/viewpoint/getIseRad',
      type: "GET",
      data
    })
  }




}

export default new Api();