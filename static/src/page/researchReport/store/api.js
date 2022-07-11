import Server from '../../../plugin/Server';

class Api extends Server {
    async getShowReportList(data = {}) {
        return await this.Http({
            url: '/api/report/getShowReportList',
            type: "GET",
            data
        })
    }

    async getShowReportListForSaas(data = {}) {
        return await this.Http({
            url: '/api/report/getShowReportListForSaas',
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

    async addGuestReportJob(data = {}) {
        return await this.Http({
            url: '/api/report/addGuestReportJob',
            type: "POST",
            data
        })
    }

    //报告详情
    async getReportInfoForGuest(data = {}) {
        return await this.Http({
            url: '/api/report/getReportInfoForGuest',
            type: "GET",
            data
        })
    }

    //申请查看
    async updateReportApplyInfo(data = {}) {
        return await this.Http({
            url: '/api/report/updateReportApplyInfo',
            type: "POST",
            data
        })
    }
}

export default new Api();