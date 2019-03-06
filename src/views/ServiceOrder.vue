/*
 * @Description: 服务订单列表
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-20 09:27:42
 */

<template>
  <section class="service-order">
    <section class="background-tips" v-if="tableData.length === 0">
      <NoData tip="暂无订单" :url="'/myHouse?entrustId=' + entrustId"/>
    </section>
    <section v-else>
      <div class="order-list" :key="index" v-for="(order, index) in tableData">
        <div class="list-title-box">
          <router-link :to="'/serviceDetile?servicePackageId=' + order.servicePackageId">
            <div class='list-title'><img src="../assets/images/icon/icon_order.png" alt=""/><span>{{order.houseName}}</span></div>
            <div class='list-no'>
              <span>服务包订单号：{{order.servicePackageOrderNo}}</span>
              <div><img src="../assets/images/icon/icon_arrow.png" alt="" class="icon-right"/></div>
            </div>
            <div class='serviceName'>
              <span>服务包名称：{{order.servicePackageName}}</span>
            </div>
          </router-link>
        </div>
        <div class="list-main">
            <div class='list-item' v-for="(pro, index) in order.serviceItems" :key="index">
              <span>产品名称：{{pro.serviceName}}</span>
              <div :class="pro.status === '7' ? 'list-item-close' : 'list-item-type'">
                {{getOrderStatusName(pro.status)}}
              </div>
            </div>
        </div>
        <div class="list-footer">
          <span class="list-footer-time">{{order.createTime}}</span>
          <div class="list-footer-money">实付款：<span>{{order.price}}</span>元</div>
        </div>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import NoData from '@/components/NoData.vue';
import { getQueryString } from '@/utils/utils';

import { STATUS_NAME } from '@/config/config';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'ServiceOrder',
  components: {
    NoData
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

  /**
   * @description 获取订单状态
   * @params status 状态枚举
   * @returns string
   * @author chenmo
   */
  private getOrderStatusName(status: number) {
    return STATUS_NAME[status];
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
.order-list
  background #fff
  margin-bottom 20px
  .list-title-box
    padding vw(15)
    border-bottom 1px solid $border-color-light
  .list-title
    img
      display inline-block
      width vw(20)
      vertical-align middle
    span
      padding-left 12px
      font-weight bold
      color $text-color
  .list-no
    display -webkit-flex /* Safari */
    display flex
    flex-direction row
    flex-wrap nowrap
    justify-content space-between
    align-items center
    font-size 13px
    color $tip-text-color
    .icon-right
      display inline-block
      width 8px
    span
      display inline-block
      padding 6px 0
  .serviceName
    font-size 16px
    color: #474747;
  .list-main 
    padding 0px vw(15)
    .list-item
      display -webkit-flex /* Safari */
      display flex
      flex-direction: row
      flex-wrap nowrap
      justify-content space-between
      align-items center
      font-size 14px
      color $text-color
      padding vw(12) 0
      border-bottom 1px solid #f5f6f7
      .list-item-type
        color $main-color
      .list-item-close
        color $disabled-color
  .list-footer
    padding vw(15)
    display -webkit-flex /* Safari */
    display flex
    flex-direction row
    flex-wrap nowrap
    justify-content space-between
    align-items center
    .list-footer-time 
      font-size 14px
      color $tip-text-color
    .list-footer-money 
      font-size 14px
      color $text-color
      span 
        display inline-block
        padding-right vw(5)
        font-size 16px
        color #000
        font-weight bold
</style>
