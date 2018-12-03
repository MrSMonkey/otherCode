import axios from 'axios'
import store from '../Store'
import { actions as appActions } from '../reducers/app'
import { populateUrl } from '@/utils'
import appConfig from '@/appConfig'

const host = appConfig.host
axios.defaults.withCredentials = true

/**临时登录授权 */
axios.defaults.headers.common['Authorization'] = 'Basic b3duZXI6MTIzNDU2';

const request = axios.create({
  baseURL: host.api.replace(/\/+$/, ''),
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

request.interceptors.request.use(
  config => {
    config.url = populateUrl(config.url, config.urlKey)
    return config
  },
  err => {
    const status = err.response.status
    if (status === 401 || status === 404) {
      return store.dispatch(appActions.doWechatAuth())
    }
    return Promise.reject(err)
  }
)

const api = {
  getHouseList(cityId) {
    return request.get(`/room/recommand/${cityId}/1`)
  },

  /* 检查手机号是否存在 */
  checkPhoneAccountExist(phone) {
    return request.get('/login/check', {
      params: {
        phone
      }
    })
  },
  /* 房源账单(根据房东合同Id获取已打款账单列表) */
  getLandlordHouseBillList({ houseId, page = 1, pageSize = 20 }) {
    return request.get(`/landlordBill/list/${houseId}/${page}/${pageSize}`)
  },
  /* 账单详情(根据账单批次Id获取账单详情) */
  getLandlordBillDetailById(id) {
    return request.get(`/landlordBill/detail/${id}`)
  },

  /* 房东账单累计收入(根据房东手机号获取全部已打款账单总计) */
  getLandlordBalanceByPhone(phone) {
    return request.get(`/landlordBill/totalAmount/${phone}`)
  },

  /* 我的账单(根据房东手机号获取改房东下所有房源的已打款账单列表) */
  getLandlordBillListByPhone({ phone, page, pageSize = 20 }) {
    return request.get(`/landlordBill/myList/${phone}/${page}/${pageSize}`)
  },

  /* 根据房东id获取房源列表 */
  getLandlordHouseList(landlordId) {
    return request.get(`/LandlordHouse/gethouses/${landlordId}`)
  },

  /* 获取房间信息 */
  getHouseInfoByHouseId(houseId) {
    return request.get(`/LandlordHouse/roomdetail/${houseId}`)
  },

  /* 根据合同id获取房屋信息 */
  getHouseInfoByContractId(contractId, houseId) {
    return request.get(`/LandlordHouse/HoseInfo/${contractId}/${houseId}`)
  },

  /* 根据租客合同id获取房源合同详情 */
  getLandLordContractInfoById(contractId) {
    return request.get(`/LandlordHouse/landlordcontract/${contractId}`)
  },

  /* 根据合同id获取图片信息 */
  getPictureListByContractId({ contractId, houseId }) {
    return request.get(
      `/LandlordHouse/landlordcontract/${contractId}/${houseId}`
    )
  },
  /* 获取w微信配置 （认证跳转路由、appid,scope等）*/
  getWechatConfig() {
    return request.get('login/getconfig')
  },
  /* 通过code换取网页授权 */
  getAccesstoken(appid, code) {
    return request.get('/login/gettoken', {
      params: {
        appid,
        code
      }
    })
  },
  checkUserBindState(openId) {
    return request.get('/login/isbindingwxchat', {
      params: {
        openId
      }
    })
  },
  checkAccessToken(token, openId) {
    return request.get('/login/checktoken', {
      params: {
        token,
        openId
      }
    })
  },
  /* 获取用户信息 */
  getUserInfo(openId, accessToken) {
    return request.get('/login/getuserinfo', {
      params: {
        openId,
        accessToken
      }
    })
  },
  /* 
  data :
    {
      phone,
      identifyingCode,
      openid,
      access_token
    }
 */
  bindUser(data) {
    return request.post('/user/mobile/login', data)
  },
  /**城市信息 */
  getCitys() {
    return request.get('/common/city')
  },
  /* 生成验证码 */
  genValidateCode(mobile) {
    return request.post(`/user/verification_code/${mobile}`)
  },
  /**提交委托 */
  postEntrust(form) {
    return request.post('/owner/entrust', form)
  },
  /* 获取单个房源的收入 */
  getHouseIncomeById(houseId) {
    return request.get(`/landlordBill/houseTotalAmount/${houseId}`)
  },
  /* 获取js-sdk配置 */
  getJsSDKConfig(url){
    return request.get(`/login/getjssdkconfig`,{
      params:{
        url
      }
    })
  },
  /* 获取银行卡列表 */
  getBankList(params){
    return request.get(`/wallet/getbankcards`, {
      params: params
    })
  },
  /* 获取钱包信息 */
  getwalletinfo(landlordId){
    return request.get(`/wallet/getwalletinfo`, {
      params:{
        loginId: landlordId
      }
    })
  },
  /* 获取钱包记录 */
  getrecord(params){
    return request.get(`/wallet/getrecord`, {
      params: params
    })
  },
  // 激活钱包
  activatewallet(params){
    return request.post(`/wallet/activatewallet`, params)
  },
  // 绑定银行卡
  bindbankcard(params){
    return request.post(`/wallet/bindbankcard`, params)
  },
  // 提现
  withdrawcash(params){
    return request.post(`/wallet/withdrawcash`, params)
  },
  // 查询银行卡BIN
  getcardbin(params){
    return request.get(`/wallet/getcardbin`, {
      params: params
    })
  },

  // 获取钱包状态【是否激活，激活才能提现】
  getwalletstate(params){
    return request.get(`/wallet/getwalletstate`, {
      params: params
    })
  },

  //根据当前城市和关键字查询小区
  getCommunityList(cityId, key){
    // console.log('发起请求: ', key)
    return request.get(`/common/communitys/${cityId}/${key}`)
  },
}

export default api
