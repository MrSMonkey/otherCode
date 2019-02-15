// import React from 'react'
// import Loadable from 'react-loadable'
// import Loading from 'react-loading'

// /* TODOS:
//   - add Error Component
//   - add Timeout Component
// */
// const loadingTheme = {
//   width: 50,
//   height: 50,
//   color: '#ab8850',
//   type: 'spokes'
// }
// const LoadingComponent = ({ error, timedOut, pastDelay }) => {
//   console.log(error, pastDelay)
//   // if (error) return <div>Error !</div>

//   // if (timedOut) return <div>Time out</div>

//   return <Loading className="global-loading" {...loadingTheme} />

//   return null
// }

// const makeLoadable = loader =>
//   Loadable({
//     loader,
//     loading: LoadingComponent,
//     timeout: 10000, //timeout 10sec
//     delay: 200 //avoid loading flash
//   })


// export default {
  //   Home: makeLoadable(() => import('./Home')),
  //   NoMatch: makeLoadable(() => import('./NoMatch')),
  //   HouseList: makeLoadable(() => import('./HouseList')),
  //   MyHouse: makeLoadable(() => import('./MyHouse')),
  //   BillList: makeLoadable(() => import('./BillList')),
  //   BillDetail: makeLoadable(() => import('./BillDetail')),
  //   HouseContract: makeLoadable(() => import('./HouseContract')),
  //   HouseBillList: makeLoadable(() => import('./HouseBillList')),
  //   EntrustPlan: makeLoadable(() => import('./EntrustPlan')),
  //   HousePicture: makeLoadable(() => import('./HousePicture')),
  //   Bind: makeLoadable(() => import('./auth/Bind')),
  //   Entrust: makeLoadable(() => import('./Entrust')),
  //   MyQRcode: makeLoadable(() => import('./user/MyQRcode')),
  //   MyBussinessCard: makeLoadable(() => import('./user/MyBussinessCard')),
  //   Fortune: makeLoadable(() => import('./fortune/Fortune')),
  //   FortuneResult: makeLoadable(() => import('./fortune/FortuneResult')),
  //   FortuneLaw: makeLoadable(() => import('./fortune/FortuneLaw')),
  //   OpenWallet: makeLoadable(() => import('./wallet/OpenWallet')),
  //   MyWallet: makeLoadable(() => import('./wallet/MyWallet')),
  //   AddCard: makeLoadable(() => import('./wallet/AddCard')),
  //   ApplyForward: makeLoadable(() => import('./wallet/ApplyForward')),
  //   BankCard: makeLoadable(() => import('./wallet/BankCard')),
  //   BankDetail: makeLoadable(() => import('./wallet/BankDetail')),
  //   Balance: makeLoadable(() => import('./wallet/Balance')),
  //   RoomInfo: makeLoadable(() => import('./RoomInfo')),
// }


import Home from './Home'
import NoMatch from './NoMatch'
import HouseList from './HouseList'
import MyHouse from './MyHouse'
import RoomInfo from './RoomInfo'
import EntrustPlan from './EntrustPlan'
import Entrust from './Entrust'
import HousePicture from './HousePicture'
import Bind from './auth/Bind'
import PurchaseService from './PurchaseService'
import ServiceInfo from './ServiceInfo'
import ServiceType from './ServiceType'
import ServiceOrder from './ServiceOrder'
import ServiceOrderDetile from './ServiceOrderDetile'
import StartService from './StartService'

export default {
  NoMatch,
  Home,
  Bind,
  EntrustPlan,
  Entrust,
  HouseList,
  MyHouse,
  RoomInfo,
  HousePicture,
  PurchaseService,
  ServiceInfo,
  ServiceType,
  ServiceOrder,
  ServiceOrderDetile,
  StartService
}
