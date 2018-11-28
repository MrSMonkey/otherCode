import { select, put, call, takeLatest,take } from 'redux-saga/effects'
import { actionTypes as appActionType } from '../reducers/app'
import { actionTypes as applyActionType } from '../reducers/apply'
import { push } from 'connected-react-router'
import api from '../api'

function* getBankList() {
  try {
    const Id = yield select(state => state.app.landlordInfo.Id)
    const usbaleAmount = yield select(state => state.myWallet.data.UsableAmount)
    console.log('usbaleAmount',usbaleAmount)
    const data = yield call(api.getBankList, {
      loginId: Id
    })

    if (data && data.length > 0) {
      const res = yield call(api.getwalletinfo, {
        loginId: Id
      })
      // 可用余额
      if ( res && res.success) {
        yield put({
          type: applyActionType.GET_USABLE_AMOUNT,
          payload: res.data.UsableAmount || 0
        })
      }
    } else {
      yield put(push('/wallet/bandCard'))
    }
      
  } catch (err) {
    yield put({ type: appActionType.APP_ERROR_MSG, payload: '获取银行卡信息错误！请重试' })
  }
}

function* watchApply() {
  yield takeLatest(applyActionType.GET_CARD_BIN, getBankList)
}
export default watchApply

