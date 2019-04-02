import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
Vue.use(Router);

let router!: any;
const EntrustPlan = () => import(/* webpackChunkName: 'entrustPlan' */ '@/views/EntrustPlan.vue');
const Bind = () => import(/* webpackChunkName: 'bind' */ '@/views/Bind.vue');
const Entrust = () => import(/* webpackChunkName: 'entrust' */ '@/views/Entrust.vue');
const Perfect = () => import(/* webpackChunkName: 'perfect' */ '@/views/Perfect.vue');
const House = () => import(/* webpackChunkName: 'house' */ '@/views/House.vue');
const MyHouse = () => import(/* webpackChunkName: 'myHouse' */ '@/views/MyHouse.vue');
const ServiceOrder = () => import(/* webpackChunkName: 'serviceOrder' */ '@/views/ServiceOrder.vue');
const ServiceDetile = () => import(/* webpackChunkName: 'serviceDetile' */ '@/views/ServiceDetile.vue');
const ProductDetile = () => import(/* webpackChunkName: 'productDetile' */ '@/views/ProductDetile.vue');
const Purchase = () => import(/* webpackChunkName: 'purchase' */ '@/views/Purchase.vue');
const ServiceInfo = () => import(/* webpackChunkName: 'serviceInfo' */ '@/views/ServiceInfo.vue');
const ProductInfo = () => import(/* webpackChunkName: 'productInfo' */ '@/views/ProductInfo.vue');
const ServiceType = () => import(/* webpackChunkName: 'serviceType' */ '@/views/ServiceType.vue');
const StartService = () => import(/* webpackChunkName: 'startService' */ '@/views/StartService.vue');
const ChoicePlot = () => import(/* webpackChunkName: 'choicePlot' */ '@/views/ChoicePlot.vue');
const NotFoundComp = () => import(/* webpackChunkName: '404' */ '@/components/404.vue');
const MaintainChecked = () => import(/* webpackChunkName: 'maintainChecked' */ '@/views/MaintainChecked.vue');
const ServiceRecord = () => import(/* webpackChunkName: 'serviceRecord' */ '@/views/ServiceRecord.vue');
const ConfirmPay = () => import(/* webpackChunkName: 'confirmPay' */ '@/views/ConfirmPay.vue');
const ServiceRecordLook = () => import(/* webpackChunkName: 'serviceRecordLook' */ '@/views/ServiceRecordLook.vue');
const ServiceOrderDetail = () => import(/* webpackChunkName: 'serviceOrderDetail' */ '@/views/ServiceOrderDetail.vue');
const HouseAppraise = () => import(/* webpackChunkName: 'houseAppraise' */ '@/views/HouseAppraise.vue');
const AppraiseHouseInfo = () => import(/* webpackChunkName: 'houseAppraise' */ '@/views/houseAppraise/AppraiseHouseInfo.vue');
const HouseImages = () => import(/* webpackChunkName: 'houseImages' */ '@/views/HouseImages.vue');
router = new Router({
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'index', component: Home, meta: '星空业主服务号' },
    { path: '/entrustPlan', name: 'entrustPlan', meta: '星级房屋托管计划', component: EntrustPlan},
    { path: '/bind', name: 'bind', meta: '登录', component: Bind},
    { path: '/entrust', name: 'entrust', meta: '在线委托', component: Entrust},
    { path: '/perfect', name: 'perfect', meta: '完善房源信息', component: Perfect},
    { path: '/house', name: 'house', meta: '我的房源列表', component: House},
    { path: '/myHouse', name: 'myHouse', meta: '房源详情', component: MyHouse},
    { path: '/serviceOrder', name: 'serviceOrder', meta: '服务订单', component: ServiceOrder},
    { path: '/serviceDetile', name: 'serviceDetile', meta: '订单详情', component: ServiceDetile},
    { path: '/productDetile', name: 'productDetile', meta: '订单详情', component: ProductDetile},
    { path: '/purchase', name: 'purchase', meta: '购买服务包', component: Purchase},
    { path: '/serviceInfo', name: 'serviceInfo', meta: '服务包详情', component: ServiceInfo},
    { path: '/productInfo', name: 'productInfo', meta: '服务产品详情', component: ProductInfo},
    { path: '/serviceType', name: 'serviceType', meta: '选择服务类型', component: ServiceType},
    { path: '/startService', name: 'startService', meta: '发起服务', component: StartService},
    { path: '/choicePlot', name: 'choicePlot', meta: '选择小区', component: ChoicePlot},
    { path: '/404', name: '404', meta: '404', component: NotFoundComp},
    { path: '/maintainChecked', name: 'maintainChecked', meta: '确认验收', component: MaintainChecked},
    { path: '/serviceRecord', name: 'serviceRecord', meta: '服务记录', component: ServiceRecord},
    { path: '/confirmPay', name: 'confirmPay', meta: '确认支付', component: ConfirmPay},
    { path: '/serviceRecordLook', name: 'serviceRecordLook', meta: '服务记录', component: ServiceRecordLook},
    { path: '/serviceOrderDetail', name: 'serviceOrderDetail', meta: '服务详情', component: ServiceOrderDetail},
    { path: '/serviceOrderDetail', name: 'serviceOrderDetail', meta: '服务详情', component: ServiceOrderDetail},
    { path: '/houseImages', name: 'houseImages', meta: '房源照片', component: HouseImages},
    {
      path: '/houseAppraise',
      name: 'houseAppraise',
      meta: '房屋估价',
      component: HouseAppraise,
      children: [
        {path: 'appraiseHouseInfo', name: 'appraiseHouseInfo', meta: '估价房屋信息', component: AppraiseHouseInfo }
      ]
    }
  ]
});

router.beforeEach((to: any, from: any, next: any) => {
  /* 路由发生变化修改页面title */
  if (to.meta) {
    document.title = to.meta;
  }

  // 未匹配到任何页面, 跳转到404页面
  if (to.matched.length === 0) {
    router.push('/404');
  }
  if (to.path === '/404') {
    next();
    return;
  }

  // const token: any = localStorage.getItem('siteToken');
  // if (!token) {
  //   // 非登陆状态
  //   if (to.path !== '/bind' && to.path !== '/entrust' && to.path !== '/entrustPlan' && to.path !== '/') {
  //     // 除了登录页 && 在线委托页 && 星级房屋托管计划，其他将跳转到登陆页
  //     router.push('/bind');
  //   }
  //   next();
  // }
  next();
});

export default router;

