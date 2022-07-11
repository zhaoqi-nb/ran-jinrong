
'use strict';


import Server from "../../../../plugin/Server";
class Api extends Server {
  //通用模版请求
  async getBrandFinanceInfo(data = {}) {
    return await this.Http({
      url: '/offlineBrand/getBrandFinanceInfo',
      data
    })
  }

}

export default new Api();