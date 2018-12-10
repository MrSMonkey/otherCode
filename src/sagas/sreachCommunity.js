import { call, put, select, take } from 'redux-saga/effects'
import api from '../api'
import { actionTypes as appActionType } from '../reducers/app'
import { actionTypes as entrustActionType } from '../reducers/entrust'

/**
 * 跟据关键字查询小区 
 */
function* sreachCommunity(cityId, key) {
  try {
    const { data } = yield call(api.getCommunityList, cityId, key)
    if (data.code === '000') { return data.data || [] }     
    yield put({ type: appActionType.APP_ERROR_MSG, payload: data.msg || data.message }) 
    return []
  } catch (err) {
    yield put({ type: entrustActionType.CHANGE_ENTRUS_SUBLIMT_LODING, payload: false })
  }
}

function* sreachCommunityFlow() {
  while (true) {
    yield take(entrustActionType.SEARCHCOMMUNITY)
    const cityId = yield select(state => state.entrust.form.cityId)
    const val = yield select(state => state.entrust.communityKey)
    if (val) {
      const list = yield call(sreachCommunity, cityId, val)
      // const data = yield throttle(3000, entrustActionType.COMMUNITYKEY, sreachCommunity, cityId, key)
      if (list) {
        yield put({ type: entrustActionType.COMMUNITYLIST, payload: list })
      }
    } else {
      yield put({ type: entrustActionType.COMMUNITYLIST, payload: [] })
    }
  }
}

export default sreachCommunityFlow;
