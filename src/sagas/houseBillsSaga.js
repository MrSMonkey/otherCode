import { call, put, take } from 'redux-saga/effects'
import api from '../api'
import { actionTypes } from '../reducers/houseBills'
import { actionTypes as appActionTypes } from '../reducers/app'

function* getHousebills(houseId, page = 1) {
  try {
    const { data } = yield call(api.getLandlordHouseBillList, {
      houseId,
      page
    })
    return data
  } catch (err) {
    yield put({
      type: appActionTypes.APP_ERROR_MSG,
      payload: '获取房源账单错误！请重试'
    })
  }
}

function* getHouseBillsFlow() {
  while (true) {
    const idType = yield take(actionTypes.GET_HOUSE_BILLS)
    const data = yield call(getHousebills, idType.houseId, idType.page)
    if (data.Items) {
      yield put({ type: actionTypes.GET_HOUSE_BILLS_SUCCESS, payload: data })
    }
  }
}

export default getHouseBillsFlow
