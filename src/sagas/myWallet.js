import { call, put, take, select, takeEvery} from 'redux-saga/effects'
import api from '../api'
import { actionTypes } from '../reducers/myWallet'
import { actionTypes as appActionTypes } from '../reducers/app'

function* getWalletInfo() {
  try {
  
    // yield take(appActionTypes.GET_USER_SUCCESS) // 获取用户信息
    const Id = yield select(state => state.app.landlordInfo.Id)
    console.log(Id)
    
      const { data } = yield call(api.getwalletstate, {
        loginId: Id
      })
      yield put({ type: actionTypes.IS_FROZEN ,payload: data})
      if (data) {
        const  res  = yield call(api.getwalletinfo, {
          loginId: Id
        })
        console.log('res', res)
        if (res && res.status === 200) {
          yield put({ type: actionTypes.GET_WALLET_SUCCESS ,payload: res.data})
        } else {
          yield put({ type: appActionTypes.APP_ERROR_MSG, payload: '获取钱包信息错误！请重试' })
        }
    }
  } catch (err) {
    yield put({ type: actionTypes.HIDE_LOADING })
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: '获取钱包信息错误！请重试' })
  }
}

function* getWalletInfoFlow() {
  yield takeEvery(actionTypes.GET_WALLET_INFO, getWalletInfo)
}
export default getWalletInfoFlow
