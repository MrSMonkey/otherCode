/*
 * @Description: Global模块主入口文件
 * @Author: LiuZhen
 * @Date: 2018-11-07 18:01:02
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-04-09 19:36:26
 */
import { Module, ActionTree, MutationTree, GetterTree } from 'vuex';
import { GlobalState } from './types';
import { RootState } from '../types';
import Vue from 'vue';
import router from '@/router';
import api from '@/api';
import { handleWebStorage, openPostWindow } from '@/utils/utils';
import { Point } from '@/interface/utilInterface';

// 从本地获取token
const getTokenFromLocal = () => {
  const data: any = localStorage.getItem('siteToken');
  return data ? data : null;
};

// state
export const state: GlobalState = {
  token: getTokenFromLocal(),
  userInfo: null,
  communityId: '',
  communityName: '',
  keepAlive: 'Purchase,ServiceOrder,Entrust,ProductPayment,PackPayment,ServiceHouseInfo',
  point: {
    lat: '', // 经度
    lon: ''  // 纬度
  },
  isGainPoint: false,
};

// getters
export const getters: GetterTree<GlobalState, RootState> = {
  getToken(state: GlobalState): string {
    return state.token;
  },
  getUserInfo(state: GlobalState): any {
    return state.userInfo;
  },
  getCommunityId(state: GlobalState): any {
    return state.communityId;
  },
  getCommunityName(state: GlobalState): any {
    return state.communityName;
  },
  getKeepAlive(state: GlobalState): any {
    return state.keepAlive;
  },
  getPoint(state: GlobalState): any {
    return state.point;
  },
  getIsGainPoint(state: GlobalState): any {
    return state.isGainPoint;
  },
};

// mutations
export const mutations: MutationTree<GlobalState> = {
  // 修改Token
  updateToken: (state, data: string) => {
    state.token = data;
  },
  updateUserInfo: (state, data: any) => {
    state.userInfo = data;
  },
  updateCommunityId: (state, data: string) => {
    state.communityId = data;
  },
  updateCommunityName: (state, data: string) => {
    state.communityName = data;
  },
  updateKeepAlive: (state, data: string) => {
    state.keepAlive = data;
  },
  updatePoint: (state, data: Point) => {
    state.point = data;
  },
  updateIsGainPoint: (state, data: boolean) => {
    state.isGainPoint = data;
  },
};

// actions
export const actions: ActionTree<GlobalState, RootState> = {
  async getUserInfo({commit}) {
    try {
      const res: any = await Vue.axios.get(api.getUserInfo);
      if (res && res.code === '000') {
        commit('updateUserInfo', res.data);
      } else {
        Vue.prototype.$toast(`获取用户信息失败`);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  },
  async payment({commit}, data) {
    try {
      const res: any = await Vue.axios.get(api.payment + '/' + data.orderId, {
        params: {
          order: data.orderId,
          returnURL: data.returnURL,
          workId: data.workId ? data.workId : null
        }
      });
      if (res && res.code === '000') {
        // 支付接口回调
        openPostWindow(res.data.toPayUrl, res.data.payParams);
      } else {
        Vue.prototype.$toast(`支付失败：${res.msg}` || `支付失败`);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  },
  // 获取经纬度
  async getLocation({ commit }) {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition((position: any) => {
        /**
         * @description 定位成功
         * @params position 当前位置信息
         * @return 当前位置经纬度
         * @author chemo
         */
        const point: Point = {
          lat: String(position.coords.latitude), // 纬度
          lon: String(position.coords.longitude) // 经度
        };
        console.log(point);
        commit('updatePoint', point); // 更新经纬度
        commit('updateIsGainPoint', true); // 经纬度获取成功
      }, (error: any) => {
        /**
         * @description 定位抛出异常
         * @params error 错误信息
         * @return nulll
         * @author chemo
         */
        commit('updateIsGainPoint', false); // 经纬度获取失败
        switch (error.code) {
          case error.PERMISSION_DENIED:
          alert('定位失败,用户拒绝请求地理定位');
          break;
          case error.POSITION_UNAVAILABLE:
          alert('定位失败,位置信息是不可用');
          break;
          case error.TIMEOUT:
          alert('定位失败,请求获取用户位置超时');
          break;
          case error.UNKNOWN_ERROR:
          alert('定位失败,定位系统失效');
          break;
        }
      }, {
        enableHighAccuracy: true, // 是否要求高精度的地理位置信息
        timeout: 1000, // 对地理位置信息的获取操作做超时限制，如果再该事件内未获取到地理位置信息，将返回错误
        maximumAge: 60 * 1000 // 设置缓存有效时间，在该时间段内，获取的地理位置信息还是设置此时间段之前的那次获得的信息，超过这段时间缓存的位置信息会被废弃
      });
    } else {
      alert('您当前使用的浏览器不支持地理定位服务');
    }
  }
};

const namespaced: boolean = true;

export const global: Module<GlobalState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
