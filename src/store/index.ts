/*
import Vue from 'vue';
import * as Vuex from 'vuex';
import VuePersistence, { VuexPersistence } from 'vuex-persist';
import global from './modules/global';
import echarts from './modules/echarts';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'prodection';

// store数据本地持久化方案
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  modules: {
    global,
    echarts
  },
  strict: debug,
  plugins: [vuexLocal.plugin]
});
*/



import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { global } from './global/index';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0'
  },
  modules: {
    global
  }
};

export default new Vuex.Store<RootState>(store);
