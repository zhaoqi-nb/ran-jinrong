
'use strict';

import Server from '../../../../../plugin/Server';

class Api extends Server {
  //通用模版请求
  async getFilterOptions(data = {}) {
    return await this.Http({
      url: '/api/config/common/templateData',
      data
    })
  }

}

export default new Api();