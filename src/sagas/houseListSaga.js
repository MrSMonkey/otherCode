import { call, put, select, take } from 'redux-saga/effects'
import api from '../api'
import { actionTypes } from '../reducers/houseList'
import { actionTypes as appActionTypes } from '../reducers/app'

function* getHouseList(id) {
  try {
    const { data } = yield call(api.getLandlordHouseList, id)
    return data
  } catch (err) {
    yield put({ type: actionTypes.GET_HOUSE_LIST_FAIL })
    yield put({
      type: appActionTypes.APP_ERROR_MSG,
      payload: '获取房源列表错误！请重试'
    })
  }
}

function* getHouseListFlow() {
  while (true) {
    const actionData = yield take(actionTypes.GET_HOUSE_LIST)
    let houseData = yield select(state => state.houseList.data)
    // console.log(houseData)
    if (houseData.length === 0) {
      const id = yield select(state => state.app.landlordInfo.Id)
      houseData = yield call(getHouseList, id)
      if (houseData) {
        yield put({
          type: actionTypes.GET_HOUSE_LIST_SUCCESS,
          payload: houseData
        })
      }
    }

    let indexHouse = {}
    houseData &&
      houseData.some(house => {
        if (house.HouseId === actionData.indexHouseId) {
          indexHouse = house
          return true
        }
        return false
      })
    yield put({ type: actionTypes.INDEX_HOUSE_INFO, payload: indexHouse })
    yield put({
      type: actionTypes.CHANGE_HOUSE_LIST_LOADING,
      payload: indexHouse
    })
  }
}

export default getHouseListFlow
