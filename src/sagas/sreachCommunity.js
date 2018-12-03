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
    yield call(api.getCommunityList, cityId, key)
    return []
  } catch (err) {
    // yield put({ type: appActionType.APP_ERROR_MSG, payload: '获取提交委托错误！请重试' })
    yield put({ type: entrustActionType.CHANGE_ENTRUS_SUBLIMT_LODING, payload: false })
  }
}

function* sreachCommunityFlow() {
  while (true) {
    yield take(entrustActionType.COMMUNITYKEY)
    // yield put({ type: entrustActionType.CHANGE_ENTRUS_SUBLIMT_LODING, payload: true })
    const key = yield select(state => state.entrust.communityKey)
    const cityId = yield select(state => state.entrust.form.CityId)
    // const list = yield throttle(3000, entrustActionType.COMMUNITYKEY, sreachCommunity, cityId, key)
    const list = yield call(sreachCommunity, cityId, key)
    if (list) {
      yield put({ type: entrustActionType.COMMUNITYLIST, payload: list })
      // yield put({type:appActionType.APP_SUCCESS_MSG,payload:'提交成功!'})
      // yield put(push('/'))
    }
  }
}

export default sreachCommunityFlow;
