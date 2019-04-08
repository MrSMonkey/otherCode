/*
 * @Description: Global模块主入口文件
 * @Author: LiuZhen
 * @Date: 2018-11-07 18:01:02
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-03-28 16:11:11
 */
import { Module, ActionTree, MutationTree, GetterTree } from 'vuex';
import { GlobalState } from './types';
import { RootState } from '../types';
import Vue from 'vue';
import router from '@/router';
import api from '@/api';
import { handleWebStorage, openPostWindow } from '@/utils/utils';

// 从本地获取token
const getTokenFromLocal = () => {
  const data: any = localStorage.getItem('siteToken');
  return data ? data : null;
};


// state
export const state: GlobalState = {
  token: getTokenFromLocal(),
  userInfo: {},
  communityId: '',
  communityName: '',
  keepAlive: 'Purchase,ServiceOrder',
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
