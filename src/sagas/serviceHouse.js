import { call, put, take } from 'redux-saga/effects'
import api from '../api'
import { actionTypes } from '../reducers/serviceHouse'
import { actionTypes as appActionTypes } from '../reducers/app'

function* getPushService(id) {
  try {
    const { data } = yield call(api.getPushService, id)
    if (data.code === '000') {
      return data.data
    }
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: data.msg || data.message })
    return []
  } catch (err) {
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: '获取房源信息失败！请重试' })
  }
}

function* getServiceHouseFlow() {
  while (true) {
    const idType = yield take(actionTypes.GET_PUSH_SERVICE_DETILE)
    const data = yield call(getPushService, idType.id)
    if (data) {
      yield put({ type: actionTypes.GET_SERVICE_DETILE_SUCCESS, payload: data })
    }
  }
}

export default getServiceHouseFlow
