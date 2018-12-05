import { call, put, select, take } from 'redux-saga/effects'
import api from '../api'
import { push } from 'connected-react-router'
import { actionTypes as appActionType } from '../reducers/app'
import { actionTypes as entrustActionType } from '../reducers/entrust'
import { localStore } from '../utils'

const isLogin = !!localStore.get('userId')

/**提交委托表单 */
function* sublimtEntrust(form) {
  try {
    const { data } = yield call(api.postEntrust, form)
    if (data.code !== '000') {
      yield put({ type: appActionType.APP_ERROR_MSG, payload: data.msg })
    }
    return data.code === '000'
  } catch (err) {
    yield put({ type: appActionType.APP_ERROR_MSG, payload: '获取提交委托错误！请重试' })
    yield put({ type: entrustActionType.CHANGE_ENTRUS_SUBLIMT_LODING, payload: false })
  }
}

/**登录绑定 */
function* bindUser(form) {
  try {
    const { data } = yield call(api.bindUser, {
      mobile: form.phone,
      grantType: 'mobile',
      registerSource: 1,
      scope: 'server',
      verificationCode: form.varityCold
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
      return true
    }

    yield put({ type: appActionType.APP_ERROR_MSG, payload: data.msg })
    return false
  } catch (e) {
    yield put({type: appActionType.APP_ERROR_MSG,payload: e.message})
  }
}

function* sublimtEntrustFlow() {
  while (true) {
    yield take(entrustActionType.SUBLIMT_FORM)
    yield put({ type: entrustActionType.CHANGE_ENTRUS_SUBLIMT_LODING, payload: true })
    const form = yield select(state => state.entrust.form)
    let isBind = true
    if (!isLogin) { 
      isBind = yield call(bindUser, form) 
    }
    if (isBind) {
      const isSuccess = yield call(sublimtEntrust, form)
      if (isSuccess) {
        yield put({type:appActionType.APP_SUCCESS_MSG, payload:'提交成功!'})
        yield put({ type: entrustActionType.SUBLIMT_FORM_SUCCESS, payload: form.phone})
      }
    }
    yield put({ type: entrustActionType.CHANGE_ENTRUS_SUBLIMT_LODING, payload: false })
  }
}

export default sublimtEntrustFlow;
