/*
 * @FileDescription    : api  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-13 14:22:12 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: 2020-06-11 17:21:01
 */

'use strict';

import Server from '../../../../../plugin/Server';

class Api extends Server { 
    async getTemplateInfo(data = {}) {
        return await this.Http({
            url: '/api/config/getTemplateInfo',
            data
        })
    }

    async batchGetTemplateInfo(data= []) {
        return await this.HttpPost({
            url: '/api/config/batchGetTemplateInfo',
            data
        })
    }
    
    //更新模版value
    async updateFrontTemplate(data = {}) {
        return await this.Http({
            url: '/api/limitOperation/updateFrontTemplate',
            type: "POST",
            data
        })
    }
}

export default new Api();