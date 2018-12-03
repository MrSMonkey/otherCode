import { call, put, select, take } from 'redux-saga/effects'
import { actionTypes as modalActionType } from '../reducers/modal'

/**控制弹框显示 */
function* isShowModelFlow() {
  while (true) {
    yield take(modalActionType.CHANGE_MOLDE_SHOW)
    const status = yield select(state => state.modal.status)
    const timeOut = (time) => {
      return new Promise((res) => {
        setTimeout(() => {
          res()
        }, time)
      })
    }
    if (status) {
      yield put({ type: modalActionType.IS_MODLE, payload: false })
      yield call(timeOut, 500)
      yield put({ type: modalActionType.IS_SHOW, payload: false })
    } else {
      yield put({ type: modalActionType.IS_SHOW, payload: true })
      yield call(timeOut, 100)
      yield put({ type: modalActionType.IS_MODLE, payload: true })
    }
    yield put({ type: modalActionType.STATUS, payload: !status })
  }
}

export default isShowModelFlow;