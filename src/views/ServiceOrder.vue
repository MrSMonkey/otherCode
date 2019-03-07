/*
 * @Description: 服务订单列表
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-20 09:27:42
 */

<template>
  <section class="service-order">
     <van-tabs>
      <van-tab title="服务包订单">
        <section class="background-tips" v-if="tableData.length === 0">
          <NoData tip="暂无订单" :url="'/myHouse?entrustId=' + entrustId"/>
        </section>
        <section v-else>
          <ServiceList :tableData="tableData"></ServiceList>
        </section>
      </van-tab>
      <van-tab title="服务产品订单">
        <ServiceList :tableData="tableData"></ServiceList>
      </van-tab>
    </van-tabs>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import NoData from '@/components/NoData.vue';
import ServiceList from './components/service/ServiceList.vue';
import { getQueryString } from '@/utils/utils';
import { Tab, Tabs } from 'vant';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'ServiceOrder',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    NoData,
    ServiceList
  }
})
// 类方式声明当前组件
export default class ServiceOrder extends CommonMixins {
  private entrustId: string = ''; // 委托房源ID
  private tableData: any[] = []; // 服务订单列表

  private mounted() {
    this.entrustId = String(this.$route.query.entrustId);
    this.getServiceOrder(this.entrustId); // 获取订单列表
  }

  /**
   * @description 获取订单列表
   * @params entrustId 委托id
   * @returns void
   * @author chenmo
   */
  private async getServiceOrder(entrustId: string) {
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
    try {
      const res: any = await this.axios.get(api.getServiceOrder + `/${entrustId}`);
      if (res && res.code === '000') {
        this.tableData = res.data || [];
      } else {
        this.$toast(`获取房源详情失败`);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.$toast.clear();
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
.background-tips
  position relative
  top 10px
  text-align center
  font-size 15px /* no */
  img
    width vw(120)
    height auto
  p
    color $text-color
    font-size 14px

</style>
