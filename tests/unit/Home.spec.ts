/*
 * @Description: Home组件单元测试
 * @Author: LiuZhen
 * @Date: 2018-10-10 17:35:09
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-03-26 16:03:04
 */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import router from 'vue-router';
import Vuex from 'vuex';
import Home from '@/views/Home.vue';

// 独立构建Vue构造函数
const localVue = createLocalVue();
localVue.use(router);
localVue.use(Vuex);

describe('对Home组件进行的单元测试', () => {
  let store: any;
  let wrapper: any;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        global: {}
      }
    });

    // 挂载组件
    wrapper = shallowMount(Home, {
      store,
      localVue,
    });
  });

  afterEach(() => {
    // 销毁实例
    wrapper.destroy();
  });

  test('home', () => {
    // 测试实例是Vue组件
    expect(wrapper.isVueInstance()).toBeTruthy();
    // 验证是否挂载了Home组件
    expect(wrapper.is(Home)).toBeTruthy();
    // 验证内容被渲染
    expect(wrapper.contains('.home-comp_list')).toBeTruthy();
  });

  // 生成测试快照
  // test('create expected html structure', () => {
  //   expect(wrapper.element).toMatchSnapshot();
  // });
});
