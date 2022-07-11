import Server from '../../../plugin/Server';

class Api extends Server {
  async getDownloadList(data = {}) {
    return await this.Http({
      url: '/api/batchDownload/getDownloadList',
      type: "GET",
      data
    })
  }

  async matchNewestData(data = {}) {
    return await this.Http({
      url: '/api/batchDownload/matchNewestData',
      type: "GET",
      data
    })
  }

  async upDownloadFileName(data = {}) {

    return await this.Http({
      url: '/api/batchDownload/upDownloadFileName',
      type: "GET",
      data,
    })
  }
  // /api/batchDownload/upDownloadFileName

//   async updateViewpointCollectStatus(data = {}) {
//     return await this.Http({
//       url: '/viewpoint-system-backend/viewpoint/updateIsCollect',
//       type: "GET",
//       data
//     })
//   }

}

export default new Api();