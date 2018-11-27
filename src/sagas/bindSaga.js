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
      Phone: phone,
      IdentifyingCode: identifyingCode,
      OpenId: openid,
      AccessToken: access_token
    })
    if (!data.Key) {
      throw new Error(data.Value)
    }
    yield call(getUserInfo) /* 绑定成功后请求用户信息 */
    yield put({
      type: appActionType.SET_USER_BIND_STATE,
      payload: true
    })
    yield put({ type: bindActionType.BIND_SUCCESS })
  } catch (e) {
    yield put({ type: bindActionType.BIND_FAIL })
    yield put({
      type: appActionType.APP_ERROR_MSG,
      payload: e.message
    })
  }
}

function* checkPhone() {
  const { phone } = yield select(state => state.bind)
  yield put({ type: bindActionType.SET_PHONE_CHECK_STATUS, payload: true })
  yield put({
    type: bindActionType.SET_CHECK_ERROR,
    payload: ''
  })
  try {
    const { data } = yield call(api.checkPhoneAccountExist, phone)
    if (!data) {
      throw new Error('未找到可绑定的委托房源')
    }
  } catch (e) {
    yield put({
      type: bindActionType.SET_CHECK_ERROR,
      payload: e.message
    })
  } finally {
    yield put({ type: bindActionType.SET_PHONE_CHECK_STATUS, payload: false })
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
  yield takeLatest(bindActionType.CHECK_PHONE, checkPhone)
  yield takeLatest(bindActionType.GEN_CODE, genCode)
}

export default watchBind
