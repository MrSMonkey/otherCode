import views from '../views'
/* react router 4 不建议做中心化配置，只配置一级菜单 */
const routes = [
  {
    path: '/',
    component: views.Home,
    exact: true,
    title: '星空业主服务号',
    metas: [
      {
        name: '星空业主服务号',
        content: 'content'
      }
    ]
  },
  {
    path: '/bind',
    component: views.Bind,
    title: '登录'
  },
  {
    path: '/houses',
    component: views.HouseList,
    exact: true,
    needBind: true,
    title: '我的房源列表'
  },
  {
    path: '/houses/:id',
    component: views.MyHouse,
    needBind: true,
    title: '房源详情'
  },
  {
    path: '/rooms/:id',
    component: views.RoomInfo,
    needBind: true,
    title: '房源详情'
  },
  {
    path: '/house-pic/:id',
    component: views.HousePicture,
    needBind: true,
    title: '房源照片'
  },
  {
    path: '/purchase/:cityId/:entrustId',
    component: views.PurchaseService,
    needBind: true,
    title: '购买服务'
  },
  {
    path: '/serviceInfo/:id/:entrustId',
    component: views.ServiceInfo,
    needBind: true,
    title: '服务包详情'
  },
  {
    path: '/serviceType/:id',
    component: views.ServiceType,
    needBind: true,
    title: '选择服务类型'
  },
  {
    path: '/serviceOrder',
    component: views.ServiceOrder,
    needBind: true,
    title: '服务订单'
  },
  {
    path: '/serviceDetile/:id',
    component: views.ServiceOrderDetile,
    needBind: true,
    title: '订单详情'
  },
  {
    path: '/startService/:id/:houserId',
    component: views.StartService,
    needBind: true,
    title: '发起服务'
  },
  {
    path: '/entrustplan',
    component: views.EntrustPlan,
    title: '星级房屋托管计划'
  },
  {
    path: '/entrust',
    component: views.Entrust,
    title: '在线委托'
  },
  {
    path: '/bills',
    component: views.BillList,
    exact: true,
    needBind: true,
    title: '我的账单'
  },
  {
    path: '/house-bills/:houseId/:contractId',
    component: views.HouseBillList,
    exact: true,
    needBind: true,
    title: '房源账单'
  },
  {
    path: '/contract/:contractId',
    component: views.HouseContract,
    needBind: true,
    title: '房源合同'
  },
  {
    path: '/bills/:houseId/:billId',
    component: views.BillDetail,
    needBind: true,
    title: '账单详情'
  },
  {
    path: '/user/qr',
    component: views.MyQRcode,
    needBind: true,
    title: '我的二维码'
  },
  {
    path: '/user/bc',
    component: views.MyBussinessCard,
    needBind: true,
    title: '我的名片'
  },
  {
    path: '/fortune',
    component: views.Fortune,
    exact: true,
    title: '星空财神'
  },
  {
    path: '/fortune/result/:money',
    component: views.FortuneResult,
    exact: true,
    title: '星空财神'
  },
  {
    path: '/fortune/law',
    component: views.FortuneLaw,
    exact: true,
    title: '4321定律'
  },
  {
    path: '/wallet/openWallet',
    component: views.OpenWallet,
    title: '开通钱包'
  },
  {
    path: '/wallet/myWallet',
    component: views.MyWallet,
    title: '我的钱包',
    exact: true,
    needBind: true,
  },
  {
    path: '/wallet/addCard',
    component: views.AddCard,
    title: '添加银行卡',
    exact: true,
    needBind: true
  },
  {
    path: '/wallet/apply',
    component: views.ApplyForward,
    title: '申请提现',
    exact: true,
    needBind: true
  },
  {
    path: '/wallet/bankCard',
    component: views.BankCard,
    title: '银行卡管理',
    exact: true,
    needBind: true,
  },
  {
    path: '/wallet/balance',
    component: views.Balance,
    title: '余额明细',
    exact: false,
    needBind: false
  },
  {
    path: '/wallet/bankDetails',
    component: views.BankDetail,
    title: '银行卡管理',
    exact: true,
    needBind: true
  },
  {
    path: '',
    component: views.NoMatch,
    title: '404'
  }
]

export default routes
