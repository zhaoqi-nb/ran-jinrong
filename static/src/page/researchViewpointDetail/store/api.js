import Server from '../../../plugin/Server';

class Api extends Server {
  async getViewpointInfo(data = {}) {
    return await this.Http({
      url: '/viewpoint-system-backend/viewpoint/getProsceniumViewpointInfo',
      type: "GET",
      data
    })
  }

  async getRelevantViewpointList(data = {}) {
    return await this.Http({
      url: '/viewpoint-system-backend/viewpoint/getRelevantViewpointList',
      type: "GET",
      data
    })
  }

  async updateViewpointCollectStatus(data = {}) {
    return await this.Http({
      url: '/viewpoint-system-backend/viewpoint/updateIsCollect',
      type: "GET",
      data
    })
  }
}

export default new Api();