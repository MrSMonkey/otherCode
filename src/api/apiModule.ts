/*
 * @Description: api地址
 * @Author: chenmo
 * @Date: 2019-03-14 15:29:27
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-03-19 11:14:30
 */

export default {
  /*获取委托房源*/
  getHouseList: '/partner/owner/entrust/list',

  /*获取验证码*/
  getCode: '/auth/verification_code',

  /*登录*/
  login: '/auth/asset/register_login/web/mobile',

  /*获取房源信息*/
  getHouseInfo: '/partner/owner/entrust',

  /*获取房源信息*/
  getProcesses: '/partner/owner/processes',

  /*获取房间信息*/
  getHouseRoom: '/partner/owner/entrust/room',

  /*获取租赁信息*/
  getRentInfo: '/partner/owner/entrust/rent_info',

  /*获取服务包列表*/
  getServiceOrder: '/partner/owner/service_orders',

  /*获取服务包详情*/
  getOrderDetils: '/partner/owner/service_order_details',

  /*获取订单列表*/
  getServiceList: '/partner/owner/services',

  /*获取订单详情*/
  getServiceDetils: '/partner/owner/services_details',

  /*获取用户信息*/
  getUserInfo: '/auth/user',

  /*购买服务包*/
  buyService: '/partner/owner/buy_service',

  /*获取服务类型*/
  getServiceType: '/partner/owner/service_types',

  /*获取服务房源信息*/
  getHouserInfo: '/partner/owner/house_info',

  /*发起服务*/
  pushService: '/partner/owner/launch_service',

  /*获取小区*/
  getCommunityList: '/partner/common/communitys',

  /*获取城市列表*/
  getCitys: '/partner/common/city',

  /*完善房源*/
  pushEntrust: '/partner/owner/entrust',

  /*获取服务产品列表*/
  getProductList: '/partner/owner/product/list',

  /*获取服务产品订单列表*/
  getProductOrderList: '/partner/owner/product/order/list',

  /*获取服务产品详情*/
  getProductDetail: '/partner/owner/product/detail',

  /*购买服务产品*/
  buyProduct: '/partner/owner/product',

  /*服务产品--订单详情*/
  getProductOrderDetail: '/partner/owner/product/order/detail',

  /*支付*/
  payment: '/house/pay/owner',

  /*服务记录*/
  getServiceRecord: '/partner/owner/product/service_record',

  /*维修服务支付详情*/
  getServiceRepair: '/partner/owner/product/service/repair/pay',

  /*维修服务验收详情*/
  getProductAcceptance: '/partner/owner/product/service/repair/acceptance',

  /*通过维修服务验收*/
  passService: '/partner/owner/product/service/repair/pass',

  /*拒绝通过维修服务验收*/
  productRefuse: '/partner/owner/product/service/repair/refuse',

  /*带看记录*/
  ServiceRecordLook: '/partner/owner/product/look/service_record'
};
