/*
 * @Description: axios网络请求库二次封装
 * @Author: LiuZhen
 * @Date: 2018-09-18 11:49:38
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-20 18:02:17
 */
import axios from 'axios';
import store from '../store';
import router from '../router';
import Vue from 'vue';
const Axios = axios.create({
  timeout: 20000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// http request请求拦截器(所有请求发送都要执行的操作)
Axios.interceptors.request.use(
  (config: any) => {
    // 根据环境设置baseURL
    if (process.env.NODE_ENV === 'production') {
      config.baseURL = 'http://api-gateway.uoko.com/';
      // config.baseURL = 'http://bi.uoko.com:9999/app/webapi/';
    } else if (process.env.NODE_ENV === 'test') {
      config.baseURL = 'http://192.168.200.120:7070/';
    } else {
      config.baseURL = 'http://192.168.200.120:7070/';
    }
    /*登录授权, 登录接口修改 Authorization */
    if (config.url.indexOf('/auth/login/web/mobile') > -1 || config.url.indexOf('/verification_code') > -1) {
      config.headers.Authorization = 'Basic b3duZXI6MTIzNDU2';
    } else {
      config.headers.Authorization = `Bearer ${localStorage.getItem('siteToken')}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  }
);

// http response响应拦截器
Axios.interceptors.response.use(
  (response: any) => {
    // 这里可以做一些响应拦截的操作
    if (response.status === '401') {
      router.push({
        path: '/bind'
      });
    }
    return response.data;
  }, (error) => {
    // const config: any = error.config;
    const status: any = error.response.status || 500;
    if (status === 401) {
      Vue.prototype.$toast({
        duration: 3000,       // 持续展示 toast
        type: 'fail',
        message: `登陆失效`
      });
      setTimeout(() => {
        router.push({
          path: '/bind'
        });
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
