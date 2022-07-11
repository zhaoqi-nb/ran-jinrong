/*
 * @FileDescription    : api  
 * @Author             : baoping.chen@fengjr.com
 * @Date               : 2018-09-29 14:22:12 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: 2018-10-08 14:45:22
 */

'use strict';

import Server from '../../../../plugin/Server';

class Api extends Server {
    //get time range
    async getTimeRange(data = {}){
        return await this.Http({
            url: '/api/common/getTimeRange',
            data
        })
    }
    //一级市场获取时间范围
    async getDataOpenTime(data = {}){
        return await this.Http({
            url: '/api/common/getDataOpenTime',
            data
        })
    }
}

export default new Api();