import { call, put, select, take } from 'redux-saga/effects'
import api from '../api'
import { actionTypes } from '../reducers/houseList'
import { actionTypes as appActionTypes } from '../reducers/app'

function* getHouseList() {
  try {
    const { data } = yield call(api.getHouseList)
    if (data.code === '000') {
      return data.data
    }
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: data.msg || data.message })
    yield put({ type: actionTypes.GET_HOUSE_LIST_FAIL })
    return []
  } catch (err) {
    yield put({ type: actionTypes.GET_HOUSE_LIST_FAIL })
    yield put({
      type: appActionTypes.APP_ERROR_MSG,
      payload: '获取房源列表错误！请重试'
    })
  }
}

function* getHouseListFlow() {
  while (true) {
    yield take(actionTypes.GET_HOUSE_LIST)
    const houseData = yield call(getHouseList)
    if (houseData) {
      yield put({ type: actionTypes.GET_HOUSE_LIST_SUCCESS, payload: houseData })
    }
    yield put({ type: actionTypes.CHANGE_HOUSE_LIST_LOADING, payload: false})
  }
}

export default getHouseListFlow
