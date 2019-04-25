import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home/Home.vue';
import store from '@/store';
import api from '@/api';

Vue.use(Router);

let router!: any;

const Bind = () => import(/* webpackChunkName: 'bind' */ '@/views/Login/Bind.vue');

const Entrust = () => import(/* webpackChunkName: 'entrust' */ '@/views/House/Entrust.vue');
const Perfect = () => import(/* webpackChunkName: 'perfect' */ '@/views/House/Perfect.vue');
const House = () => import(/* webpackChunkName: 'house' */ '@/views/House/House.vue');
const EntrustPlan = () => import(/* webpackChunkName: 'entrustPlan' */ '@/views/House/EntrustPlan.vue');
const ChoiceHouse = () => import(/* webpackChunkName: 'choiceHouse' */ '@/views/House/ChoiceHouse.vue');
const Community = () => import(/* webpackChunkName: 'community' */ '@/views/House/Community.vue');
const ServiceHouseInfo = () => import(/* webpackChunkName: 'ServiceHouseInfo' */ '@/views/House/ServiceHouseInfo.vue');

const MyHouse = () => import(/* webpackChunkName: 'myHouse' */ '@/views/HouseDetail/MyHouse.vue');
const HouseImages = () => import(/* webpackChunkName: 'houseImages' */ '@/views/HouseDetail/HouseImages.vue');

const ServiceOrder = () => import(/* webpackChunkName: 'serviceOrder' */ '@/views/ServiceOrder/ServiceOrder.vue');
const ServiceDetile = () => import(/* webpackChunkName: 'serviceDetile' */ '@/views/ServiceOrder/ServiceDetile.vue');
const ProductDetile = () => import(/* webpackChunkName: 'productDetile' */ '@/views/ServiceOrder/ProductDetile.vue');
const RefundDetail = () => import(/* webpackChunkName: 'RefundDetile' */ '@/views/ServiceOrder/RefundDetail.vue');

const ServiceOrderDetail = () => import(/* webpackChunkName: 'serviceOrderDetail' */ '@/views/ServiceOrder/ServiceOrderDetail.vue');
const ServiceInfo = () => import(/* webpackChunkName: 'serviceInfo' */ '@/views/ServiceOrder/ServiceInfo.vue');
const ProductInfo = () => import(/* webpackChunkName: 'productInfo' */ '@/views/ServiceOrder/ProductInfo.vue');

const Purchase = () => import(/* webpackChunkName: 'purchase' */ '@/views/Service/Purchase.vue');
const ServiceType = () => import(/* webpackChunkName: 'serviceType' */ '@/views/Service/ServiceType.vue');
const StartService = () => import(/* webpackChunkName: 'startService' */ '@/views/Service/StartService.vue');
const NotFoundComp = () => import(/* webpackChunkName: '404' */ '@/components/404.vue');

const MaintainChecked = () => import(/* webpackChunkName: 'maintainChecked' */ '@/views/ServiceRecord/MaintainChecked.vue');
const ServiceRecord = () => import(/* webpackChunkName: 'serviceRecord' */ '@/views/ServiceRecord/ServiceRecord.vue');
const ConfirmPay = () => import(/* webpackChunkName: 'confirmPay' */ '@/views/ServiceRecord/ConfirmPay.vue');
const ServiceRecordLook = () => import(/* webpackChunkName: 'serviceRecordLook' */ '@/views/ServiceRecord/ServiceRecordLook.vue');

// 房屋估价
const HouseAppraise = () => import(/* webpackChunkName: 'houseAppraise' */ '@/views/HouseAppraise/HouseAppraise.vue');
const AppraiseHouseInfo = () => import(/* webpackChunkName: 'appraiseHouseInfo' */ '@/views/HouseAppraise/AppraiseHouseInfo.vue');
const AppraiseCommunity = () => import(/* webpackChunkName: 'appraiseCommunity' */ '@/views/HouseAppraise/AppraiseCommunity.vue');

// 服务产品支付
const ProductPayment = () => import(/* webpackChunkName: 'productPayment' */ '@/views/Payment/ProductPayment.vue');

// 服务包购买
const PackPayment = () => import(/* webpackChunkName: 'packPayment' */ '@/views/Payment/PackPayment.vue');

// 星空财神(旧公众号)
const OldFortune = () => import(/* webpackChunkName: 'oldFortune' */ '@/views/Home/OldFortune.vue');
const OldFortuneResult = () => import(/* webpackChunkName: 'oldFortuneResult' */ '@/views/Home/OldFortuneResult.vue');
const OldFortuneLaw = () => import(/* webpackChunkName: 'oldFortuneLaw' */ '@/views/Home/OldFortuneLaw.vue');
const OldMyQRecode = () => import(/* webpackChunkName: 'oldMyQRecode' */ '@/views/OldBusinessCard/OldMyQRecode.vue');
const OldMyBusinessCard = () => import(/* webpackChunkName: 'oldMyBusinessCard' */ '@/views/OldBusinessCard/OldMyBusinessCard.vue');

// 旧公众号 我的房源
const OldMyHouse = () => import(/* webpackChunkName: 'packPayment' */ '@/views/House/OldMyHouse.vue');

// 旧公众号 我的账单
const OldMyAccount = () => import(/* webpackChunkName: 'packPayment' */ '@/views/House/OldMyAccount.vue');

// 旧公众号 账单详情
const OldAccountDetail = () => import(/* webpackChunkName: 'packPayment' */ '@/views/House/OldAccountDetail.vue');

// 旧公众号 账单详情
const OldHouseContract = () => import(/* webpackChunkName: 'packPayment' */ '@/views/House/OldHouseContract.vue');

// 旧公众号 房源照片
const OldHousePic = () => import(/* webpackChunkName: 'packPayment' */ '@/views/House/OldHousePic.vue');

router = new Router({
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'index', meta: {title: '星空业主服务号', requireAuth: false}, component: Home },
    { path: '/entrustPlan', name: 'entrustPlan', meta: {title: '星级房屋托管计划', requireAuth: false}, component: EntrustPlan},
    { path: '/bind', name: 'bind', meta: {title: '登录', requireAuth: false}, component: Bind},
    { path: '/entrust', name: 'entrust', meta: {title: '在线委托', requireAuth: false}, component: Entrust},
    { path: '/perfect', name: 'perfect', meta: {title: '完善房源信息', requireAuth: true}, component: Perfect},
    { path: '/house', name: 'house', meta: {title: '我的房源列表', requireAuth: true}, component: House},
    { path: '/choiceHouse', name: 'choiceHouse', meta: {title: '选择房源', requireAuth: true}, component: ChoiceHouse},
    { path: '/myHouse', name: 'myHouse', meta: {title: '房源详情', requireAuth: true}, component: MyHouse},
    { path: '/serviceOrder', name: 'serviceOrder', meta: {title: '服务订单', requireAuth: true}, component: ServiceOrder},
    { path: '/serviceDetile', name: 'serviceDetile', meta: {title: '订单详情', requireAuth: true}, component: ServiceDetile},
    { path: '/productDetile', name: 'productDetile', meta: {title: '订单详情', requireAuth: true}, component: ProductDetile},
    { path: '/purchase', name: 'purchase', meta: {title: '购买服务包', requireAuth: true}, component: Purchase},
    { path: '/serviceInfo', name: 'serviceInfo', meta: {title: '服务包详情', requireAuth: true}, component: ServiceInfo},
    { path: '/productInfo', name: 'productInfo', meta: {title: '服务产品详情', requireAuth: true}, component: ProductInfo},
    { path: '/refundDetail', name: 'refundDetail', meta: {title: '退款/售后详情', requireAuth: true}, component: RefundDetail},
    { path: '/serviceType', name: 'serviceType', meta: {title: '选择服务类型', requireAuth: true}, component: ServiceType},
    { path: '/startService', name: 'startService', meta: {title: '发起服务', requireAuth: true}, component: StartService},
    { path: '/maintainChecked', name: 'maintainChecked', meta: {title: '确认验收', requireAuth: true}, component: MaintainChecked},
    { path: '/serviceRecord', name: 'serviceRecord', meta: {title: '服务记录', requireAuth: true}, component: ServiceRecord},
    { path: '/confirmPay', name: 'confirmPay', meta: {title: '确认支付', requireAuth: true}, component: ConfirmPay},
    { path: '/serviceRecordLook', name: 'serviceRecordLook', meta: {title: '服务记录', requireAuth: true}, component: ServiceRecordLook},
    { path: '/serviceOrderDetail', name: 'serviceOrderDetail', meta: {title: '服务详情', requireAuth: true}, component: ServiceOrderDetail},
    { path: '/houseImages', name: 'houseImages', meta: {title: '房源照片', requireAuth: true}, component: HouseImages},
    { path: '/productPayment', name: 'productPayment', meta: {title: '购买信息', requireAuth: true}, component: ProductPayment},
    { path: '/packPayment', name: 'packPayment', meta: {title: '购买信息', requireAuth: true}, component: PackPayment},
    {
      path: '/houseAppraise',
      name: 'houseAppraise',
      meta: {title: '房屋估价', requireAuth: false},
      component: HouseAppraise,
      beforeEnter: (to, from, next) => {
        const token: any = store.getters['global/getToken'];
        if (!token) {
          next('/appraiseHouseInfo');
        }
        next();
      }
    },
    { path: '/appraiseHouseInfo', name: 'appraiseHouseInfo', meta: {title: '估价房屋信息', requireAuth: false}, component: AppraiseHouseInfo},
    { path: '/appraiseCommunity', name: 'appraiseCommunity', meta: {title: '选择小区', requireAuth: false}, component: AppraiseCommunity},
    // { path: '/fortune', name: 'fortune', meta: {title: '星空财神', requireAuth: false}, component: Fortune},
    { path: '/oldMyHouse', name: 'OldMyHouse', meta: {title: '我的房源', requireAuth: false}, component: OldMyHouse},
    { path: '/oldMyAccount', name: 'OldMyAccount', meta: {title: '我的账单', requireAuth: false}, component: OldMyAccount},
    { path: '/OldAccountDetail', name: 'OldAccountDetail', meta: {title: '账单详情', requireAuth: false}, component: OldAccountDetail},
    { path: '/OldHouseContract', name: 'OldHouseContract', meta: {title: '房源合同', requireAuth: false}, component: OldHouseContract},
    { path: '/OldHousePic', name: 'OldHousePic', meta: {title: '房源照片', requireAuth: false}, component: OldHousePic},

    // 老公众号
    { path: '/oldFortune', name: 'oldFortune', meta: {title: '星空财神', requireAuth: false}, component: OldFortune},
    { path: '/oldFortuneResult', name: 'oldFortuneResult', meta: {title: '星空财神', requireAuth: false}, component: OldFortuneResult},
    { path: '/oldFortuneLaw', name: 'oldFortuneLaw', meta: {title: '4321定律', requireAuth: false}, component: OldFortuneLaw},
    { path: '/oldMyQRecode', name: 'oldMyQRecode', meta: {title: '我的二维码', requireAuth: false}, component: OldMyQRecode},
    { path: '/oldMyBusinessCard', name: 'oldMyBusinessCard', meta: {title: '我的名片', requireAuth: false}, component: OldMyBusinessCard},
    // {
    //   path: '/houseAppraise',
    //   name: 'houseAppraise',
    //   meta: '房屋估价',git
    //   component: HouseAppraise,
    //   children: [
    //     {path: 'appraiseHouseInfo', name: 'appraiseHouseInfo', meta: '估价房屋信息', component: AppraiseHouseInfo }
    //   ]
    // },
    { path: '/community', name: 'community', meta: {title: '选择小区', requireAuth: false}, component: Community},
    { path: '/serviceHouseInfo', name: 'serviceHouseInfo', meta: {title: '新增房源', requireAuth: true},  component: ServiceHouseInfo},
    { path: '/404', name: '404', meta: {title: '404', requireAuth: false}, component: NotFoundComp}
  ]
});

router.beforeEach((to: any, from: any, next: any) => {
  /* 路由发生变化修改页面title */
  if (to.meta) {
    document.title = to.meta.title;
  }

  // 未匹配到任何页面, 跳转到404页面
  if (to.matched.length === 0) {
    router.push('/404');
  }
  if (to.path === '/404') {
    next();
    return;
  }
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    const token: any = store.getters['global/getToken'];
    if (token) {
      // 通过封装好的vux读取token，如果存在，name接下一步如果不存在，那跳转回登录页
      const userInfo = store.getters['global/getUserInfo'];
      if (!userInfo) {
        // 不存在用户信息，查询用户信息
        Vue.axios.get(api.getUserInfo).then((res: any) => {
          if (res && res.code === '000') {
            store.commit('global/updateUserInfo', res.data); // 设置用户信息
          } else {
            Vue.prototype.$toast(`获取用户信息失败`);
          }
          next(); // 不要在next里面加"path:/",会陷入死循环
        }).catch((err: any) => {
          Vue.prototype.$toast(`获取用户信息失败`);
          next(); // 不要在next里面加"path:/",会陷入死循环
        });
      } else {
        next();
      }
    } else {
      next({
        path: '/bind',
        query: {redirectUrl: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    const token: any = store.getters['global/getToken'];
    if (token) {
      // 通过封装好的vux读取token，如果存在，name接下一步如果不存在，那跳转回登录页
      const userInfo = store.getters['global/getUserInfo'];
      if (!userInfo) {
        // 不存在用户信息，查询用户信息
        Vue.axios.get(api.getUserInfo).then((res: any) => {
          if (res && res.code === '000') {
            store.commit('global/updateUserInfo', res.data); // 设置用户信息
          } else {
            Vue.prototype.$toast(`获取用户信息失败`);
          }
          next(); // 不要在next里面加"path:/",会陷入死循环
        }).catch((err: any) => {
          Vue.prototype.$toast(`获取用户信息失败`);
          next(); // 不要在next里面加"path:/",会陷入死循环
        });
      } else {
        next();
      }
    } else {
      next();
    }
  }
});

export default router;

