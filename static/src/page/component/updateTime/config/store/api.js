
'use strict';

import Server from '../../../../../plugin/Server';

class Api extends Server { 
    //通用模版请求
    async getUpdateData(data = {}) {
        return await this.Http({
            url: '/api/config/common/templateData',
            data
        })
    } 

    //一级市场数据周期请求
    async getDataCycle(data = {}) {
        return await this.Http({
            url: '/api/common/getDataCycle',
            data
        })
    }
    
}

export default new Api();