/*
 * @Description: 底部确认按钮单元组件测试
 * @Author: chenmo
 * @Date: 2019-03-26 15:28:22
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-03-27 11:51:02
 */

import Vue from 'vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ConfirmBtn from '@/components/ConfirmBtn.vue';

// 独立构建Vue构造函数
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('对ConfirmBtn组件进行的单元测试', () => {
  let store: any;
  let wrapper: any;
  let propsData: any;

  beforeEach(() => {
    propsData = {
      loadingText: '加载中',
      cancelText: '取消',
      confirmText: '确认',
      isActiveKey: false,
      loading: false,
      url: '/home'
    };

    store = new Vuex.Store({
      state: {
        global: {}
      }
    });

    // 挂载组件
    wrapper = shallowMount(ConfirmBtn, {
      store,
      propsData,
      localVue
    });
  });

  afterEach(() => {
    // 销毁实例
    wrapper.destroy();
  });

  test('ConfirmBtn', () => {
    // 测试实例是Vue组件
    expect(wrapper.isVueInstance()).toBeTruthy();
    // 存在 BottomBtn 组件
    expect(wrapper.is(ConfirmBtn)).toBeTruthy();
    // 验证组件是否渲染
    expect(wrapper.contains('.plot-footer')).toBeTruthy();
  });

  test('接收到了confirmText作为Props', () => {
    expect(wrapper.props().confirmText).toContain('确认');
  });

  // 生成测试快照
  test('create expected html structure', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
