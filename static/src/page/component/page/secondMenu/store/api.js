import Server from '../../../../../plugin/Server';


class Api extends Server {
  async addAttention(data = {}) {
      return await this.Http({
          url: '/api/userbehavior/addAttention',
          type: "POST",
          data
      })
  }

  async delUserAttention(data = {}) {
      return await this.Http({
          url: '/api/userbehavior/delUserAttention',
          type: "POST",
          data
      })
  }

  async getUserAttention(data = {}) {
      return await this.Http({
          url: '/api/userbehavior/getUserAttention',
          type: "GET",
          data
      })
  }
  //国内电商概念左侧详情
  async getSummaryWordInfo(data = {}) {
    return await this.Http({
        url: '/api/summaryBrand/getSummaryWordInfo',
        type: "GET",
        data
    })
  }

  //国内电商行业侧边栏
  async getDEIndustrySidebar(data = {}) {
    return await this.Http({
        url: '/api/trackAnalysis/getDEIndustrySidebar',
        type: "GET",
        data
    })
  }

  //获取国内电商品牌侧边栏
  async getBoardBrandDetail(data = {}) {
    return await this.Http({
        url: '/api/trackAnalysis/getBoardBrandDetail',
        type: "GET",
        data
    })
  }

  //获取线下品牌左侧边栏
  async getOfflineBrandDetail(data = {}) {
    return await this.Http({
        url: '/api/offlineBrand/getOfflineBrandDetail',
        type: "GET",
        data
    })
  }

  //获取线下行业左侧边栏
  async getIndustryDetail(data = {}) {
    return await this.Http({
        url: '/api/offlineIndustry/getIndustryDetail',
        type: "GET",
        data
    })
  }

  
  async newAddAttention(data = {}) {
    return await this.Http({
        url: '/api/commonTemplateBusinessApi//trackSearch/addAttention',
        data
    })
  }

  //舆情小红书 行业
  async getRedIndustryDetail(data = {}) {
    return await this.Http({
        url: '/api/redBook/getIndustryDetail',
        type: "GET",
        data
    })
  }

  //舆情小红书 品牌
  async getRedBrandDetail(data = {}) {
    return await this.Http({
        url: '/api/redBook/getBrandDetail',
        type: "GET",
        data
    })
  }

  //舆情小红书 概念
  async getRedConceptDetail(data = {}) {
    return await this.Http({
        url: '/api/redBook/getConceptDetail',
        type: "GET",
        data
    })
  }
}

export default new Api();