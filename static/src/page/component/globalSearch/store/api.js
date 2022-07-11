
'use strict';


import Server from "../../../../plugin/Server";
class Api extends Server {
  async getEcommerceHotList(data = {}) {
    return await this.Http({
      url: '/trackSearch/getEcommerceHotList',
      data
    })
  }

  async getEcommerceSearchHistoryList(data = {}) {
    return await this.Http({
      url: '/trackSearch/getEcommerceSearchHistoryList',
      data
    })
  }

  async getSearchList(data = {}) {
    return await this.Http({
      url: '/trackSearch/getSearchList',
      data
    })
  }

  async delEcommerceSearchHistoryList(data = {}) {
    return await this.Http({
      url: '/trackSearch/delEcommerceSearchHistoryList',
      data
    })
  }

  async getBrandDetailList(data = {}) {
    return await this.Http({
      url: '/trackSearch/getBrandDetailList',
      data
    })
  }

}

export default new Api();