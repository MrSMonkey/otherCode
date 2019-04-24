/*
 * @Description: 服务列表组件
 * @Author: chenmo
 * @Date: 2019-02-20 14:20:54
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-03-14 20:19:38
 */



<template>
  <section>
    <div class="order-list" :key="index" v-for="(order, index) in tableData">
      <div class="list-title-box" @click="pushDetile(order.servicePackageId)">
        <!-- <router-link :to="'/serviceDetile?servicePackageId=' + order.servicePackageId"> -->
          <div>
            <div class='list-title'>
              <div><img src="@/assets/images/icon/icon_order.png" alt=""/><span>{{order.houseName}}</span></div>
              <div><img src="@/assets/images/icon/icon_arrow.png" alt="" class="icon-right"/></div>
            </div>
            <div class='serviceName'>
              <span>服务包名称：{{order.servicePackageName}}</span>
            </div>
            <div class='list-no'>
              <span>服务包订单号：{{order.servicePackageOrderNo}}</span>
            </div>
          </div>
          <!--  -->
        <!-- </router-link> -->
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
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit  } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { STATUS_NAME } from '@/config/config';

// 声明引入的组件
@Component({
  name: 'ServiceList',
})
// 类方式声明当前组件
export default class ServiceList extends CommonMixins {
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
   * @params servicePackageId id
   * @returns string
   * @author chenmo
   */
  private pushDetile(servicePackageId: string) {
    this.$router.push(`/serviceDetile?orderId=${servicePackageId}&entrustId=${this.entrustId}`);
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.order-list
  background #fff
  margin-bottom vw(10)
  .list-title-box
    padding vw(15)
    border-bottom 1px solid $border-color-light
    // display -webkit-flex
    // display flex
    // justify-content space-between
    // align-items center
    .icon-right
      display inline-block
      width vw(10)
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
    span
      display inline-block
      padding vw(8) 0
  .serviceName
    font-size 16px
    color: #474747;
  .list-main 
    padding 0px vw(15) vw(15)
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
      padding vw(12) 0 0
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
