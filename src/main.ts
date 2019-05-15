import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Axios from './plugins/axios';
import Vueaxios from 'vue-axios';
import Footer from '@/components/Footer.vue';
import BehaviorInfoCollection from 'info-collection';
import { baseURL } from '@/config/baseURLConfig';
import api from '@/api';
import wx from 'weixin-js-sdk';
import Lottie from 'vue-lottie';
// import FastClick from 'fastclick';
// import VueLazyload from 'vue-lazyload';
import VueLazyComponent from '@xunlei/vue-lazy-component';
import {Toast, Picker, Popup, Lazyload, Button, Field, Loading, Row, Col, Icon, Dialog, Notify } from 'vant';
import 'vant/lib/index.css';


Vue.use(Lottie);
Vue.use(Toast);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Button);
Vue.use(Field);
Vue.use(Loading);
Vue.use(Row);
Vue.use(Col);
Vue.use(Icon);
Vue.use(Dialog);
Vue.use(Notify);
Vue.use(Lazyload, {
  lazyComponent: true,
  loading: require('./assets/images/icon_loading.png'),
  error: require('./assets/images/icon_error.png'),
});
// Intersection Observer polyfill
require('intersection-observer');

// // 解决点击延迟300ms的问题， 兼容 IOS
// if ('addEventListener' in document) {
//   document.addEventListener('DOMContentLoaded', () => {
//     (FastClick as any).attach(document.body);
//   }, false);
// }
// (FastClick as any).attach(document.body);

Vue.config.productionTip = false;

// 全局注册Axios 无需在组件中引入axios，直接使用 this.$axios
// Vue.prototype.$axios = Axios;
Vue.use(Vueaxios, Axios);
// Vue.use(VueLazyload, {
//   lazyComponent: true,
//   preLoad: 0.7
// });
Vue.use(VueLazyComponent);

// 全局注册页脚组件
Vue.component('Footer', Footer);
// 数据信息收集埋点
try {
  // 获取应用的版本号
  const packageInfo = require('../package.json');
  // 实例化信息采集实例
  const InfoCollectInstance = new BehaviorInfoCollection({
    startCollectionOfEnv: ['development', 'production'],  // 测试临时使用 默认只在生产环境下启用采集
    uploadInfoAddr: `${baseURL}${api.uploadInfoAddr}`,
    appVersion: packageInfo.version,
    appName: packageInfo.name,
  });
  // 获取需要上报的信息对象
  InfoCollectInstance.dataInfo().then((result: any) => {
    if (result) {
      // 上报信息
      InfoCollectInstance.pushInfoData(result);
    }
  });

  // 将实例对象挂载到 window对象上
  window.InfoCollectInstance = InfoCollectInstance || {};
} catch (e) {
  throw new Error(e || `BehaviorInfoCollection init failed!`);
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');

