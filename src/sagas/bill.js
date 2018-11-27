import { call, put, take } from 'redux-saga/effects'
import api from '../api'
import { actionTypes } from '../reducers/bill'
import { actionTypes as appActionTypes } from '../reducers/app'

function* getBill(id) {
  try {
    const { data } = yield call(api.getLandlordBillDetailById, id)
    return data
  } catch (err) {
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: '获取账单详情错误！请重试' })
  }
}

function* getBillFlow() {
  while (true) {
    const idType = yield take(actionTypes.GET_BILLS_INFO)
    const data = yield call(getBill, idType.id)
    if (data) {
      yield put({ type: actionTypes.GET_BILLS_INFO_SUCCESS, payload: data })
    }
  }
}

export default getBillFlow
