import { call, put, take } from 'redux-saga/effects'
import api from '../api'
import { actionTypes } from '../reducers/myHouse'
import { actionTypes as appActionTypes } from '../reducers/app'

function* houseInfo(id) {
  try {
    const { data } = yield call(api.getHouseInfo, id)
    if (data.code === '000') {
      return data.data
    }
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: data.msg || data.message })
    return {}
  } catch (err) {
    yield put({  type: appActionTypes.APP_ERROR_MSG, payload: '获取房源详情错误！请重试' })
  }
}

function* houseInfoFlow() {
  while (true) {
    const param = yield take(actionTypes.GET_HOUSE_INFO)
    const houseData = yield call(houseInfo, param.id)
    if (houseData && houseData.id) {
      yield put({ type: actionTypes.HOUSE_INFO, payload: houseData })
    }
  }
}

export default houseInfoFlow
