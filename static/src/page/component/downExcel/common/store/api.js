/*
 * @FileDescription    : api  
 * @Author             : baoping.chen@fengjr.com
 * @Date               : 2020-02-20 14:22:12 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-08-Th 02:55:04
 */

'use strict';

import Server from '../../../../../plugin/Server'

class Api extends Server {
    async downloadOperation(data = {}) {
        return await this.Http({
            url: '/api/commonOperate/downloadOperation',
            type: "POST",
            data
        })
    }
}

export default new Api();