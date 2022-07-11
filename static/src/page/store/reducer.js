/*
 * @FileDescription    : 文件描述  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-07 14:17:06 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: 2021-01-Fr 11:07:52
 */
 
'use strict';

import * as model from './action-type';

let defaultState =  {
    collapsed   : false,
};

//model manage
export const commonLayout = (state = defaultState , action = {}) => {
  switch(action.type){
    case model.SETCOLLAPSED:
        return {...state,...{collapsed:action.data}};
    case model.CLEARDATA:
        return {...state,...defaultState};
    default:
      return state;
  }
}