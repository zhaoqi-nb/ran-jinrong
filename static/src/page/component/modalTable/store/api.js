import Server from '../../../../plugin/Server';
class Api extends Server {
    //通用表格请求
    async getTableData(data = {}) {
        return await this.Http({
            url: '/api/config/getQueryTableData',
            data
        })
    }
}

export default new Api();