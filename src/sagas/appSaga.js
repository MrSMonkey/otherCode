import { delay } from 'redux-saga'
import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects'
import { actionTypes } from '../reducers/app'
import api from '../api'
import { APP_TYPE } from '../utils/const'
import { parseQuery, localStore } from '../utils'

/* 获取微信配置(appid,scope,跳转地址等) */
function* getWechatConfig() {
  try {
    const { data } = yield call(api.getWechatConfig)
    const payload = {
      appid: data.AppId,
      scope: data.Scope,
      transferUrl: data.TransferUrl
    }

    yield put({
      type: actionTypes.SAVE_WX,
      payload
    })
    return payload
  } catch (e) {
    yield put({
      type: actionTypes.APP_ERROR_MSG,
      payload: '获取appId错误!请重试'
    })
    throw e
  }
}

/* 跳转微信授权后端中转页 */
function toAuth({ appid, transferUrl, scope }) {
  const cur = window.location
  const url = `${transferUrl}?appid=${appid}&scope=${scope}&callback=${cur}`
  return (window.location.href = url)
}

/* 获取微信access_token */
function* getAccesstoken(code) {
  try {
    const { appid } = yield select(state => state.app.wx)
    const { data } = yield call(api.getAccesstoken, appid, code)

    if (!data.openid) {
      throw new Error('failed to get access_token!')
    }

    /* 用code成功请求到 access_token后一起存在全局 */
    yield put({
      type: actionTypes.SAVE_WX,
      payload: Object.assign(data, { code })
    })

    return data
  } catch (e) {
    yield put({
      type: actionTypes.APP_ERROR_MSG,
      payload: '获取accesstoken失败!请重试'
    })
    return false
  }
}

/* app状态初始化逻辑 */
function* appStateInit() {
  const { openid } = yield select(state => state.app.wx)
  const { data } = yield call(api.checkUserBindState, openid)

  yield put({
    type: actionTypes.SET_USER_BIND_STATE,
    payload: data
  })

  if (data) {
    // yield call(getUserInfo)
  }

  return data
}

/* 获取用户信息 */
function* getUserInfo() {
  try {
    let userInfo = yield select(state => state.app.userInfo)
    
    if (!userInfo.Id) {
      const { data } = yield call(api.getUserInfo)
      if (data.code !== '000') {
        return yield put({ type: actionTypes.APP_ERROR_MSG, payload: data.msg })      
      }
      userInfo = data.data || {}
      console.log(userInfo);
      yield put({ type: actionTypes.USER_INFO, payload: userInfo})
      yield put({ type: actionTypes.GET_USER_SUCCESS, payload: data })
    }
  } catch (e) {
    yield put({ type: actionTypes.APP_ERROR_MSG, payload: e.message })
    yield put({ type: actionTypes.GET_USER_FAIL })
  }
}

/* 检查access_token是否过期 */
function* checkAccessToken() {
  const { access_token, openid } = yield select(state => state.app.wx)
  const { data } = yield call(api.checkAccessToken, access_token, openid)

  return data
}

/* 微信认证流程 */
function* wechatOAuth() {
  const runtime = yield select(state => state.app.runtime)
  const { openid, access_token } = yield select(state => state.app.wx)
  const code = parseQuery(window.location.search).code
  /* 如果不是微信环境 */
  if (runtime.appType !== APP_TYPE.wechat) {
    return
  }

  yield put({ type: actionTypes.SET_APP_STATUS, payload: true })

  /* 如果已缓存用户信息,进行验证 */
  if (openid && access_token) {
    const access_token_valid = yield call(checkAccessToken)

    if (access_token_valid) {
      yield call(appStateInit)
      yield put({ type: actionTypes.SET_APP_STATUS, payload: false })
      return
    }
  }

  let redirected = false
  const config = yield call(getWechatConfig)
  if (code) {
    const result = yield call(getAccesstoken, code)
    if (result) {
      yield call(appStateInit)
    } else {
      redirected = true
      yield call(toAuth, config)
    }
  } else {
    redirected = true
    yield call(toAuth, config)
  }

  if (!redirected) {
    //如果被重定向到授权页  保持initiating状态，避免看到渲染的页面
    yield put({ type: actionTypes.SET_APP_STATUS, payload: false })
  }
}

function* getJsSDKConfig(action){
  const url = action.payload || window.location.href
  const {data:sdkConfig} = yield call(api.getJsSDKConfig,url)

  yield put({type:actionTypes.SAVE_JS_SDK_CONFIG,payload:sdkConfig})
}

function* showErrorMessage() {
  yield put({ type: actionTypes.SHOW_ERROR_MSG })
  yield delay(4500)
  yield put({ type: actionTypes.HIDE_ERROR_MEG })
}

function* webAuth() {
  const refreshToken = localStore.get('refresh_token')
  const accessToken = yield call(aip.getToken, refreshToken)
  localStore.set('access_token', accessToken)
}

function* appInit() {
  yield takeLatest(actionTypes.WX_AUTH, wechatOAuth)
  yield takeEvery(actionTypes.GET_USER_INFO, getUserInfo)
  yield takeEvery(actionTypes.GET_JS_SDK_CONFIG,getJsSDKConfig)
  yield takeLatest(actionTypes.WEB_AUTH, webAuth)
  yield takeLatest(
    [actionTypes.APP_ERROR_MSG, actionTypes.APP_SUCCESS_MSG],
    showErrorMessage
  )
}


export { getUserInfo }
export default appInit
