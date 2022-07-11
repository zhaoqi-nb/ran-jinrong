import Server from '../../../plugin/Server';

class Api extends Server {

    //报告详情
    async getReportInfoForGuest(data = {}) {
        return await this.Http({
            url: '/api/report/getReportInfoForGuest',
            type: "GET",
            data
        })
    }

    //发送到邮箱
    async addGuestReportJob(data = {}) {
        return await this.Http({
            url: '/api/report/addGuestReportJob',
            type: "POST",
            data
        })
    }
    //获取相关报告列表
    async getRelateShowReportListForSaas(data = {}) {
        return await this.Http({
            url: '/api/report/getRelateShowReportListForSaas',
            type: "GET",
            data
        })
    }

    //收藏
    async collectGuestReport(data = {}) {
        return await this.Http({
            url: '/api/report/collectGuestReport',
            type: "GET",
            data
        })
    }

    //获取用户信息
   async getUserRedisInfo(data = {}) {
    return await this.Http({
        url: '/api/report/collectGuestReport',
        type: "GET",
        data
    })
   }
}

export default new Api();