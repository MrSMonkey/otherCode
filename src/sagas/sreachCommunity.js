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
    const { data } = yield call(api.getCommunityList, cityId, key)
    if (data.code === '000') {
      return data.data || []
    }     
    yield put({ type: appActionType.APP_ERROR_MSG, payload: data.msg }) 
    return []
  } catch (err) {
    // yield put({ type: appActionType.APP_ERROR_MSG, payload: '获取提交委托错误！请重试' })
    yield put({ type: entrustActionType.CHANGE_ENTRUS_SUBLIMT_LODING, payload: false })
  }
}

function* sreachCommunityFlow() {
  while (true) {
    const { val } = yield take(entrustActionType.COMMUNITYKEY)
    const cityId = yield select(state => state.entrust.form.cityId)
    console.log('val~~~~~~~~', val);
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
