import { combineReducers } from 'redux'
import app from './app'
import houseList from './houseList'
import myHouse from './myHouse'
import entrust from './entrust'
import houseBills from './houseBills'
import bind from './bind'
import housePicture from './housePicture'
import houseContract from './houseContract'
import bill from './bill'
import billList from './billList'
import fortune from './fortune'
import bankList from './bankList'
import myWallet from './myWallet'
import apply from './apply'
import balance from './balance'
import openWallet from './openWallet'
import modal from './modal'
import { loadingBarReducer } from 'react-redux-loading-bar'

const reducers = combineReducers({
  app,
  houseList,
  myHouse,
  entrust,
  houseBills,
  bind,
  housePicture,
  houseContract,
  bill,
  fortune,
  billList,
  bankList,
  myWallet,
  apply,
  balance,
  openWallet,
  modal,
  loadingBar: loadingBarReducer
})

export default reducers
