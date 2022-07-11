/*
 * @FileDescription    : api  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-13 14:22:12 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: 2020-04-16 13:45:42
 */

'use strict';

import _ from 'lodash'
import { from } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import Server from '../../../../../plugin/Server';

class Api extends Server { 
    //通用模版请求 async await 
    getTemplateData(data = {}) {
        return from(this.Http({
            url: '/api/config/common/templateData',
            data
        }))
        .pipe(
            filter(res => res.code === 200),
            map(res => _.get(res, 'data.result', {}))
        )
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