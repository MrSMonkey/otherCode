import { call, put, select, take } from 'redux-saga/effects'
import api from '../api'
import { actionTypes } from '../reducers/billList'
import { actionTypes as appActionTypes } from '../reducers/app'

function* getBillsList(phone) {
  try {
    const { data } = yield call(api.getLandlordBillListByPhone, { phone: phone, page: 1 })
    return data
  } catch (err) {
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: '获取账单详情错误！请重试' })
  }
}

function* getMyBillsFlow() {
  while (true) {
    yield take(actionTypes.GET_MY_BILLS)
    const Phone = yield select(state => state.app.landlordInfo.Phone)
    console.log(Phone)
    const data = yield call(getBillsList, Phone)
    if (data) {
      yield put({ type: actionTypes.GET_MY_BILLS_SUCCESS, payload: data.Item })
    }
  }
}

export default getMyBillsFlow
