import Server from '../../plugin/Server'

class Api extends Server {
    async getTemplateList(data = {}) {
        return await this.Http({
            url: '/api/templateOperation/getTemplateList',
            type: "POST",
            data
        })
    }

    async addTemplate(data = {}) {
        return await this.Http({
            url: '/api/templateOperation/addTemplate',
            type: "POST",
            data
        })
    }

    async addBatchAppend(data = {}) {
        return await this.Http({
            url: '/api/templateOperation/addBatchAppend',
            type: "POST",
            data
        })
    }

    async createMoreRecord(data = {}) {
        return await this.Http({
            url: '/api/templateOperation/createMoreRecord',
            type: "POST",
            data
        })
    }

    async copyRecord(data = {}) {
        return await this.Http({
            url: '/api/templateOperation/copyRecord',
            type: "POST",
            data
        })
    }

    async upTemplateInfo(data = {}) {
        return await this.Http({
            url: '/api/templateOperation/upTemplateInfo',
            type: "POST",
            data
        })
    }
}

export default new Api();