import { call, put, select, take } from 'redux-saga/effects'
import api from '../api'
import { actionTypes } from '../reducers/myHouse'
import { actionTypes as appActionTypes } from '../reducers/app'

function* getIncome(Phone) {
  try {
    const { data } = yield call(api.getLandlordBalanceByPhone, Phone)
    return data
  } catch (err) {
    yield put({
      type: appActionTypes.APP_ERROR_MSG,
      payload: '获取房源累计收入出错！请重试'
    })
  }
}

function* getIncomeFlow() {
  while (true) {
    yield take(actionTypes.GET_LANDLORD_INCOME)
    const phone = yield select(state => state.app.landlordInfo.Phone)
    const income = yield call(getIncome, phone)
    if (income) {
      yield put({
        type: actionTypes.GET_LANDLORD_INCOME_SUCCESS,
        payload: income
      })
    }
  }
}

function* getHouseIncomeById(houseId) {
  try {
    const { data } = yield call(api.getHouseIncomeById, houseId)
    return data
  } catch (err) {
    console.log(err)
    yield put({
      type: appActionTypes.APP_ERROR_MSG,
      payload: '获取房源收入信息失败！请重试'
    })
  }
}

function* getHouseIncomeFlow() {
  while (true) {
    const { houseId } = yield take(actionTypes.GET_HOUSE_INCOME)
    const income = yield call(getHouseIncomeById, houseId)

    if (income) {
      yield put({
        type: actionTypes.GET_HOUSE_INCOME_SUCCESS,
        payload: income
      })
    }
  }
}

export { getHouseIncomeFlow, getIncomeFlow }
