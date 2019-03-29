/*
 * @Description: 底部按钮单元组件测试
 * @Author: chenmo
 * @Date: 2019-03-26 15:28:22
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-03-27 11:51:02
 */

import Vue from 'vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import HrTitle from '@/components/HrTitle.vue';

// 独立构建Vue构造函数
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('对HrTitle组件进行的单元测试', () => {
  let store: any;
  let wrapper: any;
  let propsData: any;

  beforeEach(() => {
    propsData = {
      title: '标题',
      dec: '描述'
    };

    store = new Vuex.Store({
      state: {
        global: {}
      }
    });

    // 挂载组件
    wrapper = shallowMount(HrTitle, {
      store,
      propsData,
      localVue
    });
  });

  afterEach(() => {
    // 销毁实例
    wrapper.destroy();
  });

  test('BottomBtn', () => {
    // 测试实例是Vue组件
    expect(wrapper.isVueInstance()).toBeTruthy();
    // 存在 BottomBtn 组件
    expect(wrapper.is(HrTitle)).toBeTruthy();
    // 验证组件是否渲染
    expect(wrapper.contains('.hr-title')).toBeTruthy();
  });

  // 生成测试快照
  test('create expected html structure', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
