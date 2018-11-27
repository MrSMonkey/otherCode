import { select, put, call, takeLatest,take } from 'redux-saga/effects'
import { actionTypes as appActionType } from '../reducers/app'
import { actionTypes as balanceActionType } from '../reducers/balance'
import { getUserInfo } from './appSaga'
import api from '../api'

function* getList() {
  try {
    
    let match = window.location.pathname // 获取页面路由
    let items = yield select(state=> state.balance.data)
    let pageIndex = yield select(state=> state.balance.params.pageIndex)
    yield put ({type: balanceActionType.SHOW_LOADING})
    
    yield put({type:balanceActionType.GET_RECORD_LIST_SUCCESS,payload: {
      data:items.concat([11,12,13,14,15,16,17,18]),
      pageIndex:pageIndex + 1,
      pageSize:10
    }})
  } catch (err) {
    yield put({ type: appActionType.APP_ERROR_MSG, payload: '获取银行卡信息错误！请重试' })
  }
}
function* getRecord() {
  yield takeLatest(balanceActionType.GET_RECORD, getList)
}
export default getRecord


