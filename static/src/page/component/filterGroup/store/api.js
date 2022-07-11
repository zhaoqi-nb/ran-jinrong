
'use strict';

import Server from '../../../../plugin/Server';

class Api extends Server {
  //通用模版请求
  async getGroupOptions(data = {}) {
    return await this.Http({
      url: '/api/config/common/templateData',
      data
    })
  }

  async getTopBrandTag(data) {
    return await this.Http({
      url: '/api/trackAnalysis/getTopBrandTag',
      data,
    })
  }



}

export default new Api();