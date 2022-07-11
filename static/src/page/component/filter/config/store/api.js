/*
 * @FileDescription    : api  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-13 14:22:12 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: 2020-04-16 13:45:42
 */

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
    //外部api
    async getSelectedZbInfo(data = {},path) {
        return await this.Http({
            url: `/api/commonTemplateBusinessApi/${path}`,
            data,
        })
    }  
}


export default new Api();