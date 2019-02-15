import { call, put, take, select } from 'redux-saga/effects'
import api from '../api'
import { actionTypes } from '../reducers/serviceInfo'
import { actionTypes as appActionTypes } from '../reducers/app'
import Toast from 'antd-mobile/lib/toast';  // 加载 JS
import 'antd-mobile/lib/toast/style/css';        // 加载 CS
function* getServiceInfo(id) {
  try {
    const { data } = yield call(api.getServiceInfo, id)
    if (data.code === '000') {
     
      return data.data
    }
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: data.msg || data.message })
    return []
  } catch (err) {
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: '获取服务包失败！请重试' })
    yield put({ type: actionTypes.LOADING_SUCCESS});
  }
}

// 购买
function* bugService(params) {
  try {
    const { data } = yield call(api.buyService, params)
    if (data.code === '000') {
      Toast.success('购买成功', 2, () => {
        widow.loaction.href= `/serviceOrder/${params.entrustId}`
      });
      return data.data
    }
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: data.msg || data.message })
    return []
  } catch (err) {
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: '购买服务包失败！请重试' })
    yield put({ type: actionTypes.SUBMIT_FORM_SUCCESS});
  }
}

function* getServiceInfoFlow() {
  while (true) {
    const idType = yield take(actionTypes.GET_SERVICES_INFO)
    const data = yield call(getServiceInfo, idType.id)
    if (data) {
      yield put({ type: actionTypes.GET_SERVICES_INFO_SUCCESS, payload: data })
    }
  }
}

function * submitForm() {
  while (true) {
    // 购买
    const params = yield take(actionTypes.SUBMIT_FORM)
    const res = yield call(bugService, params.data)
    if (res) {
      yield put({ type: actionTypes.SUBMIT_FORM_SUCCESS, payload: res })
    } else {
      yield put({ type: actionTypes.SUBMIT_FORM_SUCCESS}); // 关闭laoding
    }
  }
}
export {
  submitForm
}

export default getServiceInfoFlow;
