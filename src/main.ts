import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Axios from './plugins/axios';
import Vueaxios from 'vue-axios';
import Footer from '@/components/Footer.vue';
import lottie from 'vue-lottie';
// import FastClick from 'fastclick';
// import VueLazyload from 'vue-lazyload';
import VueLazyComponent from '@xunlei/vue-lazy-component';
import {Toast, Picker, Popup, Lazyload, Button, Field, Loading, Row, Col, Icon, Dialog } from 'vant';
import 'vant/lib/index.css';


Vue.use(lottie);
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

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');

