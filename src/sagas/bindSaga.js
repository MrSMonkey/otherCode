import { select, put, call, takeLatest } from 'redux-saga/effects'
import { actionTypes as appActionType } from '../reducers/app'
import { actionTypes as bindActionType } from '../reducers/bind'
import { getUserInfo } from './appSaga'
import api from '../api'

function* bindUser() {
  const { phone, identifyingCode } = yield select(state => state.bind)
  const { openid, access_token } = yield select(state => state.app.wx)
  try {
    const { data } = yield call(api.bindUser, {
      mobile: phone,
      grantType: 'mobile',
      registerSource: 1,
      scope: 'server',
      verificationCode: identifyingCode
    })
    console.log(data)
    if (!data.data) {
      throw new Error(data.message)
    }
    yield put({ type: appActionType.SET_USER_BIND_STATE, payload: true })
    yield put({ type: appActionType.USER_INFO, payload: data.data || {} })
    yield put({ type: bindActionType.BIND_SUCCESS })
  } catch (e) {
    yield put({ type: bindActionType.BIND_FAIL })
    yield put({
      type: appActionType.APP_ERROR_MSG,
      payload: e.message
    })
  }
}

function* genCode() {
  const { phone } = yield select(state => state.bind)
  try {
    yield call(api.genValidateCode, phone)
  } catch (e) {
    yield put({
      type: appActionType.APP_ERROR_MSG,
      payload: '获取验证码失败!请重试'
    })
  }
}

function* watchBind() {
  yield takeLatest(bindActionType.BIND_START, bindUser)
  yield takeLatest(bindActionType.GEN_CODE, genCode)
}

export default watchBind
