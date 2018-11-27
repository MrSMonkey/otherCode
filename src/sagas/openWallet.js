import { select, put, call, takeLatest } from 'redux-saga/effects'
import { actionTypes as appActionType } from '../reducers/app'
import { actionTypes as openActionType } from '../reducers/openWallet'
import { getUserInfo } from './appSaga'
import api from '../api'

function* submit() {
  try {
    const data = yield select(state => state.openWallet.data)
    console.log('1111111111',data)
    // const {data} = yield call(api.activatewallet, {})
    
  } catch (e) {
    console.log(e)
  }
}


function* watchA() {
  yield takeLatest(openActionType.SUBMIT_FROM, submit)
 
}

export default watchA
