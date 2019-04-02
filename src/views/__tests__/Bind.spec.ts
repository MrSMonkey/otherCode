/*
 * @Description: 底部按钮单元组件测试
 * @Author: chenmo
 * @Date: 2019-03-26 15:28:22
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-03-27 11:51:02
 */

import Vue from 'vue';
import axios from 'axios';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Bind from '@/views/Bind.vue';

// 独立构建Vue构造函数
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const mockData = {
  data: {
    answer: 'mock_yes',
    image: 'mock.png'
  }
};
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve(mockData))
}));

describe('对Bind组件进行的单元测试', () => {
  let store: any;
  let wrapper: any;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        global: {}
      }
    });

    // 挂载组件
    wrapper = shallowMount(Bind, {
      store,
      localVue
    });

    // 来确保每次开始前都重置模块和mock依赖的状态
    jest.resetModules();
    jest.clearAllMocks();
  });

  afterEach(() => {
    // 销毁实例
    wrapper.destroy();
  });

  test('BottomBtn', () => {
    // 测试实例是Vue组件
    expect(wrapper.isVueInstance()).toBeTruthy();
    // 存在 BottomBtn 组件
    expect(wrapper.is(Bind)).toBeTruthy();
    // 验证组件是否渲染
    expect(wrapper.contains('.login')).toBeTruthy();
  });

  // // 点击按钮后调用了 getCode 方法
  // it('getCode Fn should be called', () => {
  //   const mockFn = jest.fn();
  //   wrapper.setMethods({getCode: mockFn});
  //   wrapper.find('.btn').trigger('click');
  //   expect(mockFn).toBeCalled();
  // });

  // // 可以用 Async/Await 测试 axios.get 方法返回值
  // it('Calls get promise result', async () => {
  //   const result = await wrapper.vm.getCode();
  //   expect(result).toEqual(mockData);
  // });
  // 生成测试快照
  test('create expected html structure', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
