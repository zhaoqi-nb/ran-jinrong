/*
 * @FileDescription    : 文件描述  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-07 14:16:37 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: 2018-11-29 17:08:52
 */

'use strict';

import * as action from './action-type';

//set layout collapsed
export const setCollapsed = (data) => {
    return {
        type: action.SETCOLLAPSED,
        data
    }
}

//set compreehensive Select
export const clearData = () => {
    return {
        type: action.CLEARDATA,
    }
}

