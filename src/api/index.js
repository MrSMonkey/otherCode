import axios from 'axios'
import store from '../Store'
import { actions as appActions } from '../reducers/app'
import { populateUrl } from '@/utils'
import appConfig from '@/appConfig'
import { localStore } from '@/utils'

const host = appConfig.host
axios.defaults.withCredentials = true
console.log(host.api)

const request = axios.create({
  // baseURL: host.api.replace(/\/+$/, ''),
  baseURL: 'http://172.16.10.119:7070/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

request.interceptors.request.use(
  config => {
    const date = new Date()
    const time = date.getTime()
    const indate = localStore.get('time')

    // 判断是否存在 token，如果存在的话，则每个http header都加上token
    if (indate && indate !== 'undefined' && time < indate) {  
      const accessToken = localStore.get('access_token')
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    if (config.url.indexOf('/auth/login/web/mobile') > -1 || config.url.indexOf('/verification_code') > -1) {
      /**登录授权 */
      config.headers.Authorization = 'Basic b3duZXI6MTIzNDU2'
    }
    config.url = populateUrl(config.url, config.urlKey)
    return config
  },
  err => {
    const status = err.response.status
    if (status === 401) {
      // return store.dispatch(appActions.refreshToken())
    }
    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  response => {
    return response
  },
  err => {
    const config = err.config
    const status = err.response.status
    const refreshToken = localStore.get('refresh_token')
    if (status === 401 && !config._retry && refreshToken) {
      config._retry = true
      return axios({
        baseURL: 'http://172.16.10.119:7070',
        url: `/auth/token/refresh_token/${refreshToken}`,
        method: 'post'
      }).then(({ data }) => {
        localStorage.set('access_token', data.access_token)
        localStorage.set('refresh_token', data.refresh_token)

        config.headers.Authorization = `Bearer ${data.refresh_token}`
        console.log(config)
        return axios(config)
      })
    }
    return Promise.reject(err)
  }
)

const api = {
  /**刷新 token */
  getToken(refreshToken) {
    return request.get(`/auth/token/refresh_token/${refreshToken}`)
  },
  /* 获取用户信息 */
  getUserInfo() {
    return request.get('/auth/user')
  },
  /**城市信息 */
  getCitys() {
    return request.get('/partner/common/city')
  },
  //根据当前城市和关键字查询小区
  getCommunityList(cityId, key){
    // console.log('发起请求: ', key)
    return request.get(`/partner/common/communitys/${cityId}/${key}`)
  },  
  /**绑定用户 */
  bindUser(data) {
    return request.post('/auth/login/web/mobile', data)
  },
  /* 生成验证码 */
  genValidateCode(mobile) {
    return request.post(`/auth/verification_code/${mobile}`)
  },
  /**提交委托 */
  postEntrust(form) {
    return request.post('/partner/owner/entrust', form)
  },
  /**房源列表 */
  getHouseList() {
    return request.get(`/partner/owner/entrust/list`)    
  },
  /**房源信息 */
  getHouseInfo(id) {
    return request.get(`/partner/house/info/base/${id}`)
  },
  /**房源动态 */
  getHouseTimeLine(id) {
    return request.get(`/partner/owner/processes/${id}`)
  },  
  /* 获取房间信息 */
  getRoomList(id) {
    return request.get(`/partner/house/room/list/${id}`)
  },
  /* 根据合同id获取图片信息 */
  getPictureList(houseId) {
    return request.get(`/partner/house/images/${houseId}`)
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

  /* 根据获取房源列表 */
  getLandlordHouseList() {
    return request.get(`/owner/entrust/list`)
  },

  /* 根据合同id获取房屋信息 */
  getHouseInfoByContractId(contractId, houseId) {
    return request.get(`/LandlordHouse/HoseInfo/${contractId}/${houseId}`)
  },

  /* 根据租客合同id获取房源合同详情 */
  getLandLordContractInfoById(contractId) {
    return request.get(`/LandlordHouse/landlordcontract/${contractId}`)
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

  /* 
  data :
    {
      phone,
      identifyingCode,
      openid,
      access_token
    }
 */

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
}

export default api
