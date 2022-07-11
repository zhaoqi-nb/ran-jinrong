/*
 * @FileDescription    : api  
 * @Author             : baoping.chen@fengjr.com
 * @Date               : 2018-09-29 14:22:12 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-02-Tu 02:32:53
 */

'use strict';

import Server from '../../../../../plugin/Server';
import cloneDeep from 'lodash/cloneDeep';
import i18n from '@/plugin/i18n'

class Api extends Server {
    translateData(data) {
        let _data = cloneDeep(data)
        if (Array.isArray(_data)) {
            _data = _data.map((item, index) => {
                return item = {
                    ...item,
                    ...i18n.batchFormat(item, ['legend', 'xData', 'formatArr'])
                }
            })
        } else {
            _data = i18n.batchFormat(item, ['legend', 'xData', 'formatArr'])
        }
        return _data
    }
    //get chart data
    async getChartData(data = {}) {
        return await this.Http({
            url: '/api/config/component/chart',
            data
        })
        // .then(res=> {
        //     return {
        //         ...res,
        //         data: this.translateData(res.data)
        //     }
        // })
    }
}

export default new Api();