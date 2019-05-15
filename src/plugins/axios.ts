/*
 * @Description: axios网络请求库二次封装
 * @Author: LiuZhen
 * @Date: 2018-09-18 11:49:38
 * @Last Modified by: linyu
 * @Last Modified time: 2019-05-15 16:15:54
 */
import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import store from '../store';
import router from '../router';
import { NOT_TOKEN_URL } from '@/config/config';
import { baseURL } from '@/config/baseURLConfig';
import { getRedirectUrl } from '@/utils/utils';
import Vue from 'vue';
const Axios = axios.create({
  timeout: 500000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});
// 取消重复请求
// let pending: Array<{
//   url: string,
//   cancel: () => void
// }> = [];
// const cancelToken = axios.CancelToken;
// const removePending = (config: AxiosRequestConfig) => {
//   if (pending && pending.length > 0) {
//     pending = pending.filter( (value) => {
//       if (value.url === config.url + '&request_type=' + config.method) {
//         // 执行取消操作
//         console.log('cancel');
//         value.cancel();
//         return false;
//       }
//       return true;
//     });
//   }
//   console.log(pending);
// };
// http request请求拦截器(所有请求发送都要执行的操作)

/**
 * @description 判断不需要带token的请求地址
 * @params configUrl 当前请求的url
 * @return boolen
 * @author chemo
 */
const NotToken = (configUrl: string) => {
  return NOT_TOKEN_URL.some((item: any) => {
    return configUrl.indexOf(item) > -1;
  });
};

Axios.interceptors.request.use(
  (config: any) => {
    // 取消重复请求
    // removePending(config);
    // config.cancelToken = new cancelToken((c) => {
    //   console.log(config.url + '&request_type=' + config.method);
    //   pending.push({ url: config.url + '&request_type=' + config.method, cancel: c });
    // });
    // 根据环境设置baseURL
    config.baseURL = baseURL;

    /*登录授权, 登录接口修改 Authorization */
    if (NotToken(config.url)) {
      config.headers.Authorization = 'Basic b3duZXI6MTIzNDU2';
    } else {
      const token: string | null = localStorage.getItem('access_token');
      config.headers.Authorization = token !== null ? `Bearer ${ token}` : '';
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  }
);

// http response响应拦截器
Axios.interceptors.response.use(
  (response: any) => {
    const redirectUrl: string | null = getRedirectUrl();
    // 这里可以做一些响应拦截的操作
    if (response.status === '401' || response.data.code === '70001' || response.data.code === '20001') {
      localStorage.removeItem('access_token'); // 清除token
      localStorage.removeItem('userId'); // 清除userId
      router.push(`/bind?redirectUrl=${redirectUrl}`);
    }
    return response.data;
  }, (error) => {
    const redirectUrl: string | null = getRedirectUrl();
    const status: any = error.response.status || 500;
    if (status === 401) {
      localStorage.removeItem('access_token'); // 清除token
      localStorage.removeItem('userId'); // 清除userId
      Vue.prototype.$toast({
        duration: 3000,       // 持续展示 toast
        type: 'fail',
        message: `登录失效`
      });
      setTimeout(() => {
        router.push(`/bind?redirectUrl=${redirectUrl}`);
      }, 3000);
    } else {
      Vue.prototype.$toast({
        duration: 3000,       // 持续展示 toast
        type: 'fail',
        message: `服务器异常`
      });
    }
    // return Promise.reject(error);
  }
);

export default Axios;
