import Server from "../../../plugin/Server";

class Api extends Server {
  async getInformList(data = {}) {
    return await this.Http({
      url: '/viewpoint-system-backend/viewpoint/getInform',
      type: "GET",
      data
    })
  }

  async updateAllInformRead(data = {}) {
    return await this.Http({
      url: '/viewpoint-system-backend/viewpoint/informIsRead',
      type: "GET",
      data
    })
  }


}

export default new Api();