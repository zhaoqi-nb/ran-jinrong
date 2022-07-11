
'use strict';

import Server from '../../../../../plugin/Server';

class Api extends Server {
    //通用模版请求
    async getTemplateSelectData(data = {}) {
        return await this.Http({
            url: '/api/config/common/templateData',
            data
        })
    }
    async getOptions(data = {}, path) {
        return await this.Http({
            url: `/api/commonTemplateBusinessApi/${path}`,
            data,
        })
    }
}

export default new Api();