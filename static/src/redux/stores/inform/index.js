import initState from './state';
import * as types from '@/redux/types';

export default function appReduce(state = initState, action) {
  switch (action.type) {
    case types.GET_INFORM_LIST:
      console.log('actionactionaction', action)
      return { ...state, informList: action.payload }
    case types.GET_UN_READ_INFORM_LIST:
      return { ...state, unReadInformList: action.payload }
    default:
      return state;
  }
}
