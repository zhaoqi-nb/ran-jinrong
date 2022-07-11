import _ from 'lodash';
import Api from './api';

import * as types from '@/redux/types';

export const getInformList = (payload) => {
  return (dispatch) =>
    Api.getInformList(payload)
      .then((res) => {
        if (res.code !== 200) return
        dispatch({
          type: types.GET_INFORM_LIST,
          payload: _.get(res, 'data', [])
        })
      })
}

export const getUnReadInformList = (payload) => {
  return (dispatch) =>
    Api.getInformList(payload)
      .then((res) => {
        if (res.code !== 200) return
        dispatch({
          type: types.GET_UN_READ_INFORM_LIST,
          payload: _.get(res, 'data')
        })
      })
}

export const updateAllInformRead = (payload) => {
  return (dispatch) =>
    Api.updateAllInformRead(payload)
      .then((res) => {
        if (res.code !== 200) return
        dispatch(getUnReadInformList({
          userId: payload.userId,
          isRead: 0
        }))
      })
}