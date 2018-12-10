import { select, put, call, takeLatest } from 'redux-saga/effects'
import { actionTypes as appActionType } from '../reducers/app'
import { actionTypes as bindActionType } from '../reducers/bind'
// import { getUserInfo } from './appSaga'
import { localStore } from '../utils'
import api from '../api'

function* bindUser() {
  const { phone, identifyingCode } = yield select(state => state.bind)
  // const { openid, access_token } = yield select(state => state.app.wx)
  try {
    const { data } = yield call(api.bindUser, {
      mobile: phone,
      registerSource: 1,
      verificationCode: identifyingCode
    })
    if (data.code === '000') {
      /**设置token有效期为6天 */
      const date = new Date()
      const time = date.getTime()
      localStore.set('access_token', data.data.access_token)
      localStore.set('refresh_token', data.data.refresh_token)
      localStore.set('userId', data.data.userId)
      localStore.set('tokenTime', time + 30 * 60 * 1000)
      localStore.set('time', time + (6 * 24* 60 * 60 * 1000))
      yield put({ type: appActionType.SET_USER_BIND_TSATE, payload: true })
      yield put({ type: bindActionType.BIND_SUCCESS })
    } else {
      yield put({ type: bindActionType.BIND_FAIL })
      yield put({ type: appActionType.APP_ERROR_MSG, payload: data.msg || data.message})
    }
  } catch (e) {
    yield put({ type: bindActionType.BIND_FAIL })
    yield put({
      type: appActionType.APP_ERROR_MSG,
      payload: '登陆用户失败'
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
