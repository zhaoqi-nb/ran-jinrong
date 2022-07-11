import Server from "../../../../plugin/Server";

class Api extends Server {
    async queryResDtoListByAttr(data = {}) {
        return await this.Http({
            url: "/api/common/queryResDtoListByAttr",
            type: "GET",
            data,
        });
    }
    
    async queryIndustryDtoListByAttr(data = {}) {
        return await this.Http({
            url: "/api/common/queryIndustryDtoListByAttr",
            type: "GET",
            data,
        });
    }

    async queryParentAndSubResDtoTreeOnlyPageAccessInfo( data = {}) {
        return await this.Http({
          url: '/api/common/queryParentAndSubResDtoTreeOnlyPageAccessInfo',
          type: "GET",
          data
        })
    }

    async queryStockSortListByAttr( data = {}) {
        return await this.Http({
          url: '/api/common/getStockSortList',
          type: "GET",
          data
        })
    }


    async querySearchMapList() {
        return await this.Http({
            url: '/api/common/getSearchMappingList',
            type: "GET",
          })
    }


}

export default new Api();
