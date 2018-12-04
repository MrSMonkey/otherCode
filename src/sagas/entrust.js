import { call, put, select, take } from 'redux-saga/effects'
import api from '../api'
import { push } from 'connected-react-router'
import { actionTypes as appActionType } from '../reducers/app'
import { actionTypes as entrustActionType } from '../reducers/entrust'

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

function* sublimtEntrustFlow() {
  while (true) {
    yield take(entrustActionType.SUBLIMT_FORM)
    yield put({ type: entrustActionType.CHANGE_ENTRUS_SUBLIMT_LODING, payload: true })
    const form = yield select(state => state.entrust.form)
    const isSuccess = yield call(sublimtEntrust, form)
    if (isSuccess) {
      yield put({type:appActionType.APP_SUCCESS_MSG,payload:'提交成功!'})
      yield put(push('/houses'))
    }
    yield put({ type: entrustActionType.CHANGE_ENTRUS_SUBLIMT_LODING, payload: false })
  }
}

export default sublimtEntrustFlow;
