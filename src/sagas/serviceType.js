import { call, put, take } from 'redux-saga/effects'
import api from '../api'
import { actionTypes } from '../reducers/serviceType'
import { actionTypes as appActionTypes } from '../reducers/app'

function* getServiceTypeList(id) {
  try {
    const { data } = yield call(api.getServiceTypeList, id)
    if (data.code === '000') {
      return data.data
    }
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: data.msg || data.message })
    return []
  } catch (err) {
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: '获取服务类型失败！请重试' })
  }
}

function* getServiceTypeListFlow() {
  while (true) {
    const idType = yield take(actionTypes.GET_SERVICE_TYPE_LIST)
    const data = yield call(getServiceTypeList, idType.id)
    if (data) {
      yield put({ type: actionTypes.GET_SERVICE_TYPE_LIST_SUCCESS, payload: data })
    }
  }
}

export default getServiceTypeListFlow
