import { select, put, call, takeLatest,take } from 'redux-saga/effects'
import { actionTypes as appActionType } from '../reducers/app'
import { actionTypes as applyActionType } from '../reducers/apply'
import { getUserInfo } from './appSaga'
import api from '../api'

function* getBankList() {
  try {
    const Id = yield select(state => state.app.landlordInfo.Id)
    const usbaleAmount = yield select(state => state.myWallet.data.UsableAmount)
    let match = window.location.pathname // 获取页面路由
    if (match === '/wallet/apply') {
      // const { data } = yield call(api.getBankList, {
      //   loginId: Id
      // })
      yield put({
        type: applyActionType.GET_USABLE_AMOUNT,
        payload: usbaleAmount || 0
      })
    }
  } catch (err) {
    yield put({ type: appActionType.APP_ERROR_MSG, payload: '获取银行卡信息错误！请重试' })
  }
}

function* watchAdd() {
  yield takeLatest(applyActionType.GET_CARD_BIN, getBankList)
}
export default watchAdd

