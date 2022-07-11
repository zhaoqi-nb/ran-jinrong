/*
 * @FileDescription    : api  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-13 14:22:12 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-02-We 02:21:27
 */

'use strict';

import Server from '../../../../../plugin/Server';

class Api extends Server { 
    // 通用请求
    async getFilterData(data = {}) {
        return await this.Http({
            url: '/api/config/common/templateData',
            data
        })
    }

    //外部api
    async getOutBusinessApi(data = {},path) {
        return await this.Http({
            url: `/api/commonTemplateBusinessApi/${path}`,
            data,
        })
    }  
}

export default new Api();