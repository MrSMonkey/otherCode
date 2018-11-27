import { fork } from 'redux-saga/effects'
import getHouseListFlow from './houseListSaga'
import getRoomListFlow from './roomListSaga'
import appSaga from './appSaga'
import bindSaga from './bindSaga'
import getHouseBillsFlow from './houseBillsSaga'
import { getIncomeFlow, getHouseIncomeFlow } from './income'
import getHousePictureFlow from './housePicture'
import getHouseContractFlow from './houseContract'
import getBillFlow from './bill'
import getCtiysFlow from './ctiys'
import sublimtEntrustFlow from './sublimtEntrust'
import getMyBillsFlow from './billList'
import getBankList from './bankList'
import getWalletInfoFlow from './myWallet'
import watchApply from './applySaga'
import getRecord from './balance'
import watchAdd from './addCard'
import watchA from './openWallet'

export default function* rootSaga() {
  yield fork(getHouseListFlow)
  yield fork(getRoomListFlow)
  yield fork(appSaga)
  yield fork(getHouseBillsFlow)
  yield fork(bindSaga)
  yield fork(getIncomeFlow)
  yield fork(getHouseIncomeFlow)
  yield fork(getHousePictureFlow)
  yield fork(getHouseContractFlow)
  yield fork(getBillFlow)
  yield fork(getCtiysFlow)
  yield fork(sublimtEntrustFlow)
  yield fork(getMyBillsFlow)
  yield fork(getWalletInfoFlow)
  yield fork(watchApply)
  yield fork(getBankList)
  yield fork(getRecord)
  yield fork(watchAdd)
  yield fork(watchA)
}
