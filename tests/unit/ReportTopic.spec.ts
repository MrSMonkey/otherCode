/*
 * @Description: ReportTopic组件单元测试
 * @Author: LiuZhen
 * @Date: 2018-10-10 17:35:09
 * @Last Modified by: LiuZhen
 * @Last Modified time: 2019-01-22 18:08:22
 */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import router from 'vue-router';
import Vuex from 'vuex';
import ReportTopic from '@/views/ReportTopic.vue';

// 独立构建Vue构造函数
const localVue = createLocalVue();
localVue.use(router);
localVue.use(Vuex);

describe('对ReportTopic组件进行的单元测试', () => {
  let store: any;
  let wrapper: any;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        global: {}
      }
    });

    // 挂载组件
    wrapper = shallowMount(ReportTopic, { store, localVue });
  });

  afterEach(() => {
    // 销毁实例
    wrapper.destroy();
  });

  test('ReportTopic', () => {
    // 测试 ReportToopic 是一个Vue组件
    expect(wrapper.isVueInstance()).toBeTruthy();
    // 存在ReportTopic组件
    expect(wrapper.is(ReportTopic)).toBeTruthy();
    // 测试节点被正确挂载
    expect(wrapper.find('.theme-bj').exists()).toBeTruthy();
    // 测试数据 routeLists 的类型为数组
    expect(wrapper.vm.routeLists instanceof Array).toBeTruthy();
    // 测试数据 routeLists 的长度不为0
    expect(wrapper.vm.routeLists.length > 0).toBeTruthy();
  });

  // 测试 scrollToTop 方法被调用，页面 scrollTop的值为0
  test('scrollToTop method', () => {
    wrapper.vm.scrollToTop();
    expect(document.documentElement!.scrollTop === 0).toBeTruthy();
  });

  // 生成测试快照
  test('create expected html structure', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
