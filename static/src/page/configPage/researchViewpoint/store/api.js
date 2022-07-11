import Server from "../../../../plugin/Server";

class Api extends Server {
  async getViewpointList(data = {}) {
    return await this.Http({
      url: '/viewpoint-system-backend/viewpoint/getViewpointInfoAsForeground',
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