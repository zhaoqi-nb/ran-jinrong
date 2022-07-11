/*
 * @FileDescription    : 文件描述  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-06-12 17:40:19 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: yyyy-08-Th 10:03:37
 */
 
'use strict';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { createLogger }  from 'redux-logger';
import * as commonLayout from './reducer';

import thunk from 'redux-thunk';

const logger = createLogger();

let store = createStore(
  combineReducers({
    ...commonLayout,
  }),
  applyMiddleware(thunk, logger)
);



export default store;