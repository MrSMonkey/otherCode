/*
 * @Description: 通用的装饰器集合
 * @Author: zhegu
 * @Date: 2019-04-02 15:58:51
 * @Last Modified by: zhegu
 * @Last Modified time: 2019-04-02 15:58:51
 */

import Vue from 'vue';
import { getErrorMessage } from './utils';

/**
 * 给异步方法添加loading效果
 * @param  {any} options
 */
export function Loading(options: any) {
  return (target: any, name: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const originalCb = descriptor.value;
    descriptor.value = function() {
      return new Promise(async (resolve, reject) => {
        Vue.prototype.$toast.loading({
          duration: 200,
          mask: true,
          loadingType: 'spinner',
          message: '加载中...'
        });
        try {
          resolve(await originalCb.apply(this, arguments));
        } catch (e) {
          reject(e);
        } finally {
          // Vue.prototype.$toast.clear();
        }
      });
    };
    return descriptor;
  };
}

/**
 * 给异步方法添加reject状态时的提示信息,
 * 被装饰的异步方法内部不可以使用try-catch捕获错误，否则不起作用
 * @param  {string} defaultMsg? 默认的提示信息，接口有返回Message时覆盖此信息
 */
export function ErrorMsg(defaultMsg?: string) {
  return (target: any, name: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const originalCb = descriptor.value;
    descriptor.value = function() {
      return new Promise(async (resolve, reject) => {
        try {
          resolve(await originalCb.apply(this, arguments));
        } catch (e) {
          Vue.prototype.$toast(getErrorMessage(e, defaultMsg));
          reject(e);
        }
      });
    };
    return descriptor;
  };
}
