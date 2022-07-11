import Server from '../../../plugin/Server';

class Api extends Server {
    async getHtml( data = {}) {
        return await this.Http({
          url: 'http://local.test.inc:7022/page/-1/9527/industry_overview_zhuanti',
          type: "GET",
          dataType:"text",
          data
        })
    }
  
  }
  
  export default new Api();