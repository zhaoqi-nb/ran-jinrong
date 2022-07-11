import Server from '../../../plugin/Server';

class Api extends Server {
    async queryIndustryDtoListByAttr( data = {}) {
        return await this.Http({
          url: '/api/common/queryIndustryDtoListByAttr',
          type: "GET",
          data
        })
    }
  
  }
  
  export default new Api();