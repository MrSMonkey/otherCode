import { call, put, take } from 'redux-saga/effects'
import api from '../api'
import { actionTypes } from '../reducers/housePicture'
import { actionTypes as appActionTypes } from '../reducers/app'

function* getHousePicture(houseId) {
  try {
    const { data } = yield call(api.getPictureList, houseId)
    if (data.code === '000') {
      return data.data
    }
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: data.msg })
    return []
  } catch (err) {
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: '获取房源图片错误！请重试' })
  }
}

function* getHousePictureFlow() {
  while (true) {
    const idType = yield take(actionTypes.GET_HOUSE_PICTURE)
    const data = yield call(getHousePicture, idType.id)
    if (data) {
      yield put({ type: actionTypes.GET_HOUSE_PICTURE_SUCCESS, payload: data })
    }
  }
}

export default getHousePictureFlow
