import { call, put, take, select, takeEvery} from 'redux-saga/effects'
import api from '../api'
import { actionTypes } from '../reducers/bankList'
import { actionTypes as appActionTypes } from '../reducers/app'

function* getBankListFlow() {
  try {
    const Id = yield select(state => state.app.landlordInfo.Id)
      const { data } = yield call(api.getBankList, {
        loginId: Id
      })
      if (data && data.success) {
        yield put({ type: actionTypes.GET_BANK_LIST_SUCCESS, payload: {
          bankList: data
        } })
      } else {
        yield put({ type: actionTypes.HIDE_LOADING })
        yield put({ type: appActionTypes.APP_ERROR_MSG, payload: '获取银行卡信息错误！请重试' })
      }
  } catch (err) {
    yield put({ type: actionTypes.HIDE_LOADING })
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: '获取银行卡信息错误！请重试' })
  }
}

function* getBankList() {
  yield takeEvery(actionTypes.GET_BANK_LIST, getBankListFlow)
}

export default getBankList
