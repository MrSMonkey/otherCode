import { call, put, take } from 'redux-saga/effects'
import api from '../api'
import { actionTypes } from '../reducers/serviceOrderDetile'
import { actionTypes as appActionTypes } from '../reducers/app'

function* getServiceList(id) {
  try {
    const { data } = yield call(api.getServiceOrderDetile, id)
    if (data.code === '000') {
      return data.data
    }
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: data.msg || data.message })
    return []
  } catch (err) {
    yield put({ type: actionTypes.LOADING_SUCCESS }) // 关闭loading
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: '获取服务订单列表失败！请重试' })
  }
}

function* getServiceDetileFlow() {
  while (true) {
    const idType = yield take(actionTypes.GET_ORDER_DETILE)
    const data = yield call(getServiceList, idType.id)
    if (data) {
      yield put({ type: actionTypes.GET_ORDER_DETILE_SUCCESS, payload: data })
    }
  }
}

export default getServiceDetileFlow
