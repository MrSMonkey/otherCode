import { call, put, take } from 'redux-saga/effects'
import api from '../api'
import { actionTypes } from '../reducers/serviceOrder'
import { actionTypes as appActionTypes } from '../reducers/app'

function* getServiceList(id) {
  try {
    const { data } = yield call(api.getServiceList, id)
    if (data.code === '000') {
      return data.data
    }
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: data.msg || data.message })
    return []
  } catch (err) {
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: '获取服务订单列表失败！请重试' })
  }
}

function* getServiceListFlow() {
  while (true) {
    const idType = yield take(actionTypes.GET_LANDLORD_LIST)
    const data = yield call(getServiceList,idType.id)
    if (data) {
      yield put({ type: actionTypes.GET_SERVICEORDER_LIST_SUCCESS, payload: data })
    }
  }
}

export default getServiceListFlow
