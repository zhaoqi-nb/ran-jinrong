/*
 * @FileDescription    : api  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-13 14:22:12 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-02-We 05:50:42
 */

'use strict';

import Server from '../../../../../plugin/Server';

class Api extends Server {
    //通用表格请求
    async getQueryTableData(data = {}) {
        return await this.Http({
            url: '/api/config/getQueryTableData',
            data
        })
    }

    //通用循环行业
    async getLoopIndustryTableData(data = {}) {
        return await this.Http({
            url: '/api/config/getLoopIndustryTableData',
            data
        })
    }

    //外部api
    async getOutBusinessApi(data = {}, path) {
        return await this.Http({
            url: `/api/commonTemplateBusinessApi/${path}`,
            data,
        })
    }
}

export default new Api();