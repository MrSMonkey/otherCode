import { getRuntimeInfo } from '../utils/index'
import { localStore } from '../utils'

const initialState = {
  isLogined: false,
  runtime: getRuntimeInfo(),
  noticeMsg: '',
  noticeType: '',
  showNotice: false,
  bindState: false,
  isInitiating: false,
  isLoadingUserInfo: false,
  isGettingJSSDK:false,
  wxJsSdk:{
    appId:null,
    timestamp:null,
    nonceStr:null,
    sgnature:null
  },
  wx: localStore.get('uoko.fd.wx') || {
    appid: '',
    access_token: '',
    openid: '',
    refresh_token: '',
    code: ''
  },
  landlordInfo: {},
  citys: [],
  userInfo: {}
}

export const actionTypes = {
  SAVE_WX: 'SAVE_WX',
  WX_AUTH: 'WX_AUTH' /* 调起微信授权流程 */,
  APP_ERROR_MSG: 'APP_ERROR_MSG',
  APP_SUCCESS_MSG: 'APP_SUCCESS_MSG',
  SET_USER_BIND_STATE: 'SET_USER_BIND_STATE',
  SET_APP_STATUS: 'SET_APP_STATUS',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAIL: 'GET_USER_FAIL',
  GET_USER_INFO: 'GET_USER_INFO',
  GET_CITYS_INFO: 'GET_CITYS_INFO',
  GET_CITYS_INFO_SUCCESS: 'GET_CITYS_INFO_SUCCESS',
  SHOW_ERROR_MSG: 'SHOW_ERROR_MSG',
  HIDE_ERROR_MEG: 'HIDE_ERROR_MEG',
  GET_JS_SDK_CONFIG:'GET_JS_SDK_CONFIG',
  SAVE_JS_SDK_CONFIG:'SAVE_JS_SDK_CONFIG',
  USER_INFO: 'USER_INFO',
  WEB_AUTH: 'WEB_AUTH',  //更新 token
}

export const actions = {
  saveUerInfo(info) {
    return {
      type: actionTypes.SAVE_USERINFO,
      payload: info
    }
  },
  getUserInfo() {
    return {
      type: actionTypes.GET_USER_INFO
    }
  },
  doWechatAuth() {
    return {
      type: actionTypes.WX_AUTH
    }
  },
  getCitys() {
    return {
      type: actionTypes.GET_CITYS_INFO
    }
  },
  getJSSDKConfig(url){
    return {
      type:actionTypes.GET_JS_SDK_CONFIG,
      payload:url
    }
  },
  showNotice(msg, msgType = 'error') {
    if (msgType === 'error') {
      return {
        type: actionTypes.APP_ERROR_MSG,
        payload: msg
      }
    }
    return {
      type: actionTypes.APP_SUCCESS_MSG,
      payload: msg
    }
  },
  refreshToken() {
    return {
      type: actionTypes.WEB_AUTH
    }
  },
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_WX:
      const wx = { ...state.wx, ...action.payload }
      localStore.set('uoko.fd.wx', wx)
      return {
        ...state,
        wx
      }
    case actionTypes.SET_USER_BIND_STATE:
      return {
        ...state,
        bindState: action.payload
      }
    case actionTypes.SET_APP_STATUS:
      return {
        ...state,
        isInitiating: action.payload
      }

    case actionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        landlordInfo: action.payload,
        isLoadingUserInfo: false
      }
    case actionTypes.GET_USER_FAIL:
      return {
        ...state,
        isLoadingUserInfo: false
      }
    case actionTypes.APP_ERROR_MSG:
      return {
        ...state,
        noticeMsg: action.payload,
        noticeType: 'error'
      }
    case actionTypes.APP_SUCCESS_MSG:
      return {
        ...state,
        noticeMsg: action.payload,
        noticeType: 'success'
      }
    case actionTypes.GET_CITYS_INFO_SUCCESS:
      return {
        ...state,
        citys: action.payload
      }
    case actionTypes.SHOW_ERROR_MSG:
      return {
        ...state,
        showNotice: true
      }
    case actionTypes.HIDE_ERROR_MEG:
      return {
        ...state,
        showNotice: false
      }
      case actionTypes.GET_JS_SDK_CONFIG:
      return {
        ...state,
        isGettingJSSDK:true
      }
    case actionTypes.SAVE_JS_SDK_CONFIG:
      return {
        ...state,
        isGettingJSSDK:false,
        wxJsSdk:{
          ...action.payload
        }
      }
    case actionTypes.USER_INFO: 
      return {
        ...state,
        userInfo: action.payload
      }
    default:
      return state
  }
}

export default reducer
