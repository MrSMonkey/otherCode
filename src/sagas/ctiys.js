import { call, put, take } from 'redux-saga/effects'
import api from '../api'

import { actionTypes } from '../reducers/app'

function* getCtiys() {
  try {
    const { data } = yield call(api.getCitys)
    return data
  } catch (err) {
    yield put({
      type: actionTypes.APP_ERROR_MSG,
      payload: '获取城市信息错误！请重试'
    })
  }
}

function* getCtiysFlow() {
  while (true) {
    yield take(actionTypes.GET_CITYS_INFO)
    const data = yield call(getCtiys)
    if (data) {
      yield put({ type: actionTypes.GET_CITYS_INFO_SUCCESS, payload: data })
    }
  }
}

export default getCtiysFlow
