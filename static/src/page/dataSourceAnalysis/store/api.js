import Server from '../../../plugin/Server';

class Api extends Server {
    async queryParentAndSubResDtoTreeOnlyPageAccessInfo( data = {}) {
        return await this.Http({
          url: '/api/common/queryParentAndSubResDtoTreeOnlyPageAccessInfo',
          type: "GET",
          data
        })
    }
  
  }
  
export default new Api();