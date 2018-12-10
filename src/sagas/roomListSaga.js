import { call, put, take } from 'redux-saga/effects'
import api from '../api'
import { actionTypes } from '../reducers/myHouse'
import { actionTypes as appActionTypes } from '../reducers/app'

function* getRoomList(houseId) {
  try {
    const { data } = yield call(api.getRoomList, houseId)
    if (data.code === '000') {
      return data.data
    }
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: data.msg || data.message })
    return []
  } catch (err) {
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: '获取房间信息错误！请重试' })
  }
}

function* getRoomListFlow() {
  while (true) {
    const data = yield take(actionTypes.GET_ROOM_LIST)
    const roomList = yield call(getRoomList, data.id)
    yield put({ type: actionTypes.ROOM_LIST, payload: roomList})
  }
}

export default getRoomListFlow