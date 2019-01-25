import { call, put, take } from 'redux-saga/effects'
import api from '../api'
import { actionTypes } from '../reducers/pushService'
import { actionTypes as appActionTypes } from '../reducers/app'
import Toast from 'antd-mobile/lib/toast';  // 加载 JS
import 'antd-mobile/lib/toast/style/css';        // 加载 CS

function* pushService(params) {
  try {
    const { data } = yield call(api.pushService, params)
    if (data.code === '000') {
      Toast.success('发起成功', 2, () => {
        window.location.href= `/serviceOrder`
      });
      return data.data
    }
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: data.msg || data.message })
    return []
  } catch (err) {
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: '发起服务失败！请重试' })
  }
}

function* pushServiceFlow() {
  while (true) {
    const params = yield take(actionTypes.PUSH_SERVICE)
    const data = yield call(pushService, params.data)
    if (data) {
      yield put({ type: actionTypes.PUSH_SERVICE_SUCCESS, payload: data })
    } else {
      yield put({ type: actionTypes.LOADING_SUCCESS }); // 关闭loading
    }
  }
}

export default pushServiceFlow
