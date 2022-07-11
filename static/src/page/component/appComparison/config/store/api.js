
'use strict';

import Server from '../../../../../plugin/Server';

class Api extends Server {
  //通用模版请求
  async getSearchList(data = {}) {
    return await this.Http({
      url: '/api/config/common/templateData',
      data
    })
  }

  async addIndustryContrastId(data = {}) {
    return await this.Http({
      url: '/appDetails/addIndustryContrastId',
      data
    })
  }

  async getIndustryContrastId(data = {}) {
    return await this.Http({
      url: '/appDetails/getIndustryContrastId',
      data
    })
  }

  async getIndustryId(data = {}) {
    return await this.Http({
      url: '/appDetails/getIndustryId',
      data
    })
  }

}

export default new Api();