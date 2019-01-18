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
import sublimtEntrustFlow from './entrust'
import getMyBillsFlow from './billList'
import getBankList from './bankList'
import getWalletInfoFlow from './myWallet'
import watchApply from './applySaga'
import getRecord from './balance'
import watchAdd from './addCard'
import watchA from './openWallet'
import isShowModelFlow from './modal'
import sreachCommunityFlow from './sreachCommunity'
import houseInfoFlow from './houseInfo'
import getHouseTimeLineFlow from './houseTimeLine'
import getServiceList from './serviceOrder'
import getServiceListFlow from './purchase'
import getServiceInfoFlow from './serviceInfo'
import getServiceTypeListFlow from './serviceType'
import getServiceDetileFlow from './serviceOrderDetile'
import getServiceHouseFlow from './serviceHouse'
import pushServiceFlow from './pushService'

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
  yield fork(isShowModelFlow)
  yield fork(getMyBillsFlow)
  yield fork(getWalletInfoFlow)
  yield fork(watchApply)
  yield fork(getBankList)
  yield fork(getRecord)
  yield fork(watchAdd)
  yield fork(watchA)
  yield fork(isShowModelFlow)
  yield fork(sreachCommunityFlow)
  yield fork(houseInfoFlow)
  yield fork(getHouseTimeLineFlow)
  yield fork(getServiceList)
  yield fork(getServiceListFlow)
  yield fork(getServiceInfoFlow)
  yield fork(getServiceDetileFlow)
  yield fork(getServiceTypeListFlow)
  yield fork(getServiceHouseFlow)
  yield fork(pushServiceFlow)
}
