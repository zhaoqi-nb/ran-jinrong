/*
 * @FileDescription    : api  
 * @Author             : baoping.chen@fengjr.com
 * @Date               : 2018-06-13 14:22:12 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: 2019-06-18 20:37:49
 */

'use strict';

import Server from '../../../plugin/Server';

class Api extends Server {
    //doLogin
    async resetPassword(data = {}) {
        return await this.Http({
            url: '/api/usermanager/resetPassword',
            type: "POST",
            data
        })
    }

}

export default new Api();