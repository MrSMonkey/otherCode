import { call, put, take } from 'redux-saga/effects'
import api from '../api'
import { actionTypes } from '../reducers/houseContract'
import { actionTypes as appActionTypes } from '../reducers/app'

function* getHouseContract(contractId) {
  try {
    const { data } = yield call(api.getLandLordContractInfoById, contractId)
    return data
  } catch (err) {
    yield put({ type: appActionTypes.APP_ERROR_MSG, payload: '获取房源合同信息错误！请重试' })
  }
}

function* getHouseContractFlow() {
  while (true) {
    const idType = yield take(actionTypes.GET_HOUSE_CONTRACT)
    const data = yield call(getHouseContract, idType.id)

    if (data) {
      yield put({ type: actionTypes.GET_HOUSE_CONTRACT_SUCCESS, payload: data })
    }
  }
}

export default getHouseContractFlow
