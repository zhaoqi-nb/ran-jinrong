/*
 * @FileDescription    : api  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-13 14:22:12 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: 2019-07-19 22:43:31
 */

'use strict';

import Server from '../../../../plugin/Server';

class Api extends Server {
    //通用请求
    async getExplainData(data = {}) {
        return await this.Http({
            url: '/api/config/common/templateData',
            data
        })
    }

    //数据更新时间
    async getExplainCustomizeData(data = {}) {
        return await this.Http({
            url: '/api/config/customize/getDataUpdateTime',
            data
        })
    }
    //外部api
    async getExplain(data = {}, path) {
        return await this.Http({
            url: `/api/commonTemplateBusinessApi/${path}`,
            data,
        })
    }
}

export default new Api();