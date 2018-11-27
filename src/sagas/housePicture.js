import { call, put, take } from 'redux-saga/effects'
import api from '../api'
import { actionTypes } from '../reducers/housePicture'
import { actionTypes as appActionTypes } from '../reducers/app'

function* getHousePicture(contractId, houseId) {
  try {
    const { data } = yield call(api.getPictureListByContractId, { contractId, houseId })
    return data
  } catch (err) {
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: '获取房源图片错误！请重试' })
  }
}

function* getHousePictureFlow() {
  while (true) {
    const idType = yield take(actionTypes.GET_HOUSE_PICTURE)
    const contractId = idType.parmas.contractId
    const houseId = idType.parmas.houseId
    const data = yield call(getHousePicture, contractId, houseId)
    if (data) {
      yield put({ type: actionTypes.GET_HOUSE_PICTURE_SUCCESS, payload: data })
    }
  }
}

export default getHousePictureFlow
