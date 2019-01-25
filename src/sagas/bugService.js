import { call, put, take, select } from 'redux-saga/effects'
import api from '../api'
import { actionTypes } from '../reducers/serviceInfo'
import { actionTypes as appActionTypes } from '../reducers/app'
import Toast from 'antd-mobile/lib/toast';  // 加载 JS
import 'antd-mobile/lib/toast/style/css';        // 加载 CS

// 购买
function* bugService(params) {
  try {
    const { data } = yield call(api.buyService, params)
    if (data.code === '000') {
      Toast.success('购买成功', 2, () => {
        window.location.href= `/houses/${params.entrustId}`
      });
      return data.data
    }
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: data.msg || data.message })
  } catch (err) {
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: '购买服务包失败！请重试' })
    yield put({ type: actionTypes.SUBMIT_FORM_SUCCESS});
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

export default submitForm;
