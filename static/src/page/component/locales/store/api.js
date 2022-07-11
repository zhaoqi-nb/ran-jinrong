/*
 * @FileDescription    : api  
 * @Author             : baoping.chen@fengjr.com
 * @Date               : 2018-09-27 14:22:12 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: 2019-04-28 14:29:31
 */

'use strict';

import Server from '../../../../../plugin/Server';

class Api extends Server {
     //无英文翻译接口
     async notFoundEnglish(data = {}) {
        return await this.Http({
            url: '/api/usertemplate/notFoundEnglish',
            data
        })
    }
}

export default new Api();