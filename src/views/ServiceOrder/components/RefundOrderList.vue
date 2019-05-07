/*
 * @Description: 退款订单列表
 * @Author: chenmo
 * @Date: 2019-04-23 10:10:40
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-04-23 10:21:43
 */




<template>
  <section>
    <div class="order-list" :key="index" v-for="(order, index) in tableData">
      <div class="list-title-box" @click="pushDetile(order.orderId)">
        <div class='list-title'>
          <div><img src="@/assets/images/icon/icon_order.png" alt=""/><span>{{order.productHouseName}}</span></div>
          <div><img src="@/assets/images/icon/icon_arrow.png" alt="" class="icon-right"/></div>
        </div>
        <div class='list-no'>
          <span>{{order.orderNum}}</span>
          <span class="list-refund-status">{{order.refundStatusName}}</span>
          <!-- <div><img src="@/assets/images/icon/icon_arrow.png" alt="" class="icon-right"/></div> -->
        </div>
      </div>
      <div class="list-main">
          <div class='list-item'>
            <span class="list-item-name">产品名称：{{order.productName}}</span>
            <div :class="order.orderStatus === '7' ? 'list-item-close' : 'list-item-type'">
              {{getOrderStatusName(order.orderStatus)}}
            </div>
          </div>
      </div>
      <div class="list-footer">
        <span class="list-footer-time">{{order.orderStartTime}}</span>
        <div class="list-footer-money">实付款：<span>{{order.orderAmount}}</span>元</div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit  } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { STATUS_NAME } from '@/config/config';

// 声明引入的组件
@Component({
  name: 'RefundOrderList',
})
// 类方式声明当前组件
export default class RefundOrderList extends CommonMixins {
  @Prop({ type: Array, default: () => [] })
  private tableData: any[];

  @Prop({ type: String, default: '' })
  private entrustId: string;

  /**
   * @description 获取订单状态
   * @params status 状态枚举
   * @returns string
   * @author chenmo
   */
  private getOrderStatusName(status: number) {
    return STATUS_NAME[status];
  }

  /**
   * @description 跳转到详情
   * @params orderId id
   * @returns string
   * @author chenmo
   */
  private pushDetile(orderId: string) {
    // status === 2 表示不是从支付进入详情，不需要弹出发起服务弹窗
    this.$router.push(`/refundDetail?orderId=${orderId}&entrustId=${this.entrustId}&status=2`);
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.order-list
  background #fff
  margin-bottom vw(10)
  .list-title-box
    padding vw(10)
    border-bottom 1px solid $border-color-light
  .list-title
    display flex
    flex-direction row
    flex-wrap nowrap
    justify-content space-between
    align-items center
    margin-bottom vw(10)
    img
      display inline-block
      width vw(20)
      vertical-align middle
    span
      padding-left 12px
      font-weight bold
      color $text-color
    .icon-right
      display inline-block
      width vw(8)
  .list-no
    display -webkit-flex /* Safari */
    display flex
    flex-direction row
    flex-wrap nowrap
    justify-content space-between
    align-items center
    font-size 15px
    color $tip-text-color
    .list-refund-status
      color $main-color
      font-size 14px
    .icon-right
      display inline-block
      width vw(8)
    span
      display inline-block
      padding 6px 0
  .serviceName
    font-size 16px
    color: #474747;
  .list-main 
    padding 0px vw(15)
    border-bottom 1px solid $border-color-light
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
      .list-item-name
        width vw(300)
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
