import { call, put, select, take, throttle } from 'redux-saga/effects'
import api from '../api'
import { push } from 'connected-react-router'
import { actionTypes as appActionType } from '../reducers/app'
import { actionTypes as entrustActionType } from '../reducers/entrust'

/**
 * 跟据关键字查询小区 
 */
function* sreachCommunity(cityId, key) {
  try {
    const data = yield call(api.getCommunityList, cityId, key)
    return data.data
  } catch (err) {
    // yield put({ type: appActionType.APP_ERROR_MSG, payload: '获取提交委托错误！请重试' })
    yield put({ type: entrustActionType.CHANGE_ENTRUS_SUBLIMT_LODING, payload: false })
  }
}

function* sreachCommunityFlow() {
  while (true) {
    yield take(entrustActionType.COMMUNITYKEY)
    const key = yield select(state => state.entrust.communityKey)
    const cityId = yield select(state => state.entrust.form.cityId)
    // const list = yield throttle(3000, entrustActionType.COMMUNITYKEY, sreachCommunity, cityId, key)
    console.log(key);
    if (!key) {
      return yield put({ type: entrustActionType.COMMUNITYLIST, payload: [] })
    }
    const data = yield call(sreachCommunity, cityId, key)
    if (data.code === '000') {
      yield put({ type: entrustActionType.COMMUNITYLIST, payload: data.data })
    } else {
      yield put({ type: appActionType.APP_ERROR_MSG, payload: data.msg })      
    }
  }
}

export default sreachCommunityFlow;
