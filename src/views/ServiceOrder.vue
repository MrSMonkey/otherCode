/*
 * @Description: 服务订单列表
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-03-14 16:54:51
 */

<template>
  <section class="service-order">
     <van-tabs @click="onClick">
      <van-tab title="服务包订单">
        <section class="background-tips" v-if="tableData.length === 0">
          <NoData tip="暂无服务包订单" :url="'/myHouse?entrustId=' + entrustId"/>
        </section>
        <section v-else>
          <ServiceList :tableData="tableData" :entrustId="entrustId"></ServiceList>
        </section>
      </van-tab>
      <van-tab title="服务产品订单">
        <section class="background-tips" v-if="tableProductData.length === 0">
          <NoData tip="暂无服务产品订单" :url="'/myHouse?entrustId=' + entrustId"/>
        </section>
        <section v-else>
          <ProductOrderList :tableData="tableProductData" :entrustId="entrustId"></ProductOrderList>
        </section>
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
import ProductOrderList from './components/service/ProductOrderList.vue';

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
    ServiceList,
    ProductOrderList
  }
})
// 类方式声明当前组件
export default class ServiceOrder extends CommonMixins {
  private entrustId: string = ''; // 委托房源ID
  private tableData: any[] = []; // 服务订单列表
  private tableProductData: any[] = []; // 服务产品订单列表
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
        this.$toast(`获取服务包订单列表失败`);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.$toast.clear();
    }
  }

  /**
   * @description 获取服务产品订单列表
   * @params entrustId 委托id
   * @returns void
   * @author chenmo
   */
  private async getProductOrderList(entrustId: string) {
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
    try {
      const res: any = await this.axios.get(api.getProductOrderList + `/${entrustId}`);
      if (res && res.code === '000') {
        this.tableProductData = res.data || [];
      } else {
        this.$toast(`获取服务产品订单列表失败`);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.$toast.clear();
    }
  }

  /**
   * @description tabs切换
   * @params index 当前tabs的索引值
   * @returns null
   * @author chenmo
   */
  private onClick(index: any) {
    if (index === 0) {
      this.getServiceOrder(this.entrustId); // 获取服务包订单列表
    } else if (index === 1) {
      this.getProductOrderList(this.entrustId); // 获取服务产品订单列表
    } else if (index === 2) {
      // this.getRentInfo(this.entrustId);
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
