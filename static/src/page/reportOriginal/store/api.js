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
}

export default new Api();