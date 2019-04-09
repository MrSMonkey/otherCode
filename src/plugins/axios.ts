/*
 * @Description: axios网络请求库二次封装
 * @Author: LiuZhen
 * @Date: 2018-09-18 11:49:38
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-09 15:29:08
 */
import axios from 'axios';
import store from '../store';
import router from '../router';
import Vue from 'vue';
const Axios = axios.create({
  timeout: 500000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// http request请求拦截器(所有请求发送都要执行的操作)
Axios.interceptors.request.use(
  (config: any) => {
    // 根据环境设置baseURL
    if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_TITLE === 'production') {  // 生产
      config.baseURL = 'https://api-gateway.uoko.com/';
    } else if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_TITLE === 'test') {  // 测试
      config.baseURL = 'http://api-gateway.testuoko.com/';
    } else if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_TITLE === 'pre-release') {  // pre
      config.baseURL = 'https://api-gateway-pre.uoko.com/';
    } else {
      // config.baseURL = 'http://front-end.testuoko.com:3000/mock/22/'; // mock地址
      // config.baseURL = 'http://192.168.200.44:7070/';
      // config.baseURL = 'http://api-gateway.testuoko.com/';
      config.baseURL = 'http://172.16.3.103:8008';
    }

    /*登录授权, 登录接口修改 Authorization */
    if (config.url.indexOf('/auth/asset/register_login/web/mobile') > -1
      || config.url.indexOf('/verification_code') > -1) {
      config.headers.Authorization = 'Basic b3duZXI6MTIzNDU2';
    } else {
      const token: string | null = localStorage.getItem('siteToken');
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
    // 这里可以做一些响应拦截的操作
    if (response.status === '401' || response.data.code === '70001' || response.data.code === '20001') {
      localStorage.removeItem('siteToken'); // 清除token
      localStorage.removeItem('userId'); // 清除userId
      router.push(`/bind?redirectUrl=${window.location.href.split('#')[1]}`);
    }
    return response.data;
  }, (error) => {
    // const config: any = error.config;
    const status: any = error.response.status || 500;
    if (status === 401) {
      Vue.prototype.$toast({
        duration: 3000,       // 持续展示 toast
        type: 'fail',
        message: `登录失效`
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
