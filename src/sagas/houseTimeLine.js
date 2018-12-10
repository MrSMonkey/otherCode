import { call, put, select, take } from 'redux-saga/effects'
import api from '../api'
import { actionTypes } from '../reducers/myHouse'
import { actionTypes as appActionTypes } from '../reducers/app'

function* getHouseTimeLine(id) {
  try {
    const { data } = yield call(api.getHouseTimeLine, id)
    if (data.code === '000') {
      return data.data
    }
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: data.msg || data.message })
    return []
  } catch (err) {
    yield put({  type: appActionTypes.APP_ERROR_MSG, payload: '获取房源动态错误！请重试' })
  }
}

function* getHouseTimeLineFlow() {
  while (true) {
    const param = yield take(actionTypes.GET_HOUSE_TIMELINE)
    const data = yield call(getHouseTimeLine, param.id)
    if (data && data.length > 0) {
      yield put({ type: actionTypes.HOUSE_TIMELINE, payload: data })
    }
  }
}

export default getHouseTimeLineFlow
