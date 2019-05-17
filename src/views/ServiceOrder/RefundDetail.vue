/*
 * @Description: 退款订单详情
 * @Author: chenmo
 * @Date: 2019-03-14 20:26:26
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-05-08 11:35:51
 */

<template>
  <section class="order-detils">
    <div class="order-info">
      <div class="order-title"><h2>订单信息</h2></div>
      <div class='serviceName'>
        <span>订单号：{{orderInfo.orderNum || '无'}}</span>
      </div>
      <div class='serviceName'>
        <span>订单类型：{{orderInfo.orderTypeName || '无'}}</span>
      </div>
      <div class='serviceName'>
        <span>产品名称：{{orderInfo.productName || '无'}}</span>
      </div>
      <div class='serviceName'>
        <span>订单金额：{{orderInfo.orderAmount|| 0}}元</span>
      </div>
      <div class='serviceName'>
        <span>服务房源：{{orderInfo.productHouseName || '无' }}</span>
      </div>
    </div>
    <div class="order-info">
      <div class="order-title"><h2>退款信息</h2></div>
      <div class='serviceName'>
        <span>申请时间：{{orderInfo.applyTime || '无'}}</span>
      </div>
      <div class='serviceName'>
        <span>处理完成时间：{{orderInfo.refundTime || '无'}}</span>
      </div>
      <div class='serviceName'>
        <span>处理状态：{{orderInfo.refundStatusName|| '无'}}</span>
      </div>
      <div class='serviceName'>
        <span>退款原因：{{orderInfo.reason }}</span>
      </div>
      <div class='serviceName'>
        <span>退款金额：{{orderInfo.refundAmount }}元</span>
      </div>
    </div>
    <!-- <section>
      <van-button slot="button" size="large" type="default" class="entrust-btn" @click="paymentData" v-if ="orderInfo.orderType!==4 && orderInfo.orderStatus === 1">继续支付</van-button>
      <van-button slot="button" size="large" type="default" class="entrust-btn" @click="pushRecord" v-else>查看服务历史</van-button>
    </section> -->
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { getQueryString, returnDomain } from '@/utils/utils';
import { STATUS_NAME } from '@/config/config';
import api from '@/api';
import {Loading, ErrorMsg} from '@/utils/decorators';
const namespace: string = 'global';


// 声明引入的组件
@Component({
  name: 'RefundDetail',
})
// 类方式声明当前组件
export default class RefundDetail extends CommonMixins {
  private orderId: string = ''; // 订单id
  private entrustId: string = ''; // 房源id
  private orderInfo: any = {}; // 服务订单详情
  private refundOrderId: string = ''; // 退款id

  @Action('payment', { namespace }) private payment: any;

  private mounted() {
    this.orderId = String(this.$route.query.orderId).split('?')[0];
    this.refundOrderId = String(this.$route.query.refundOrderId).split('?')[0];
    this.entrustId =  String(this.$route.query.entrustId).split('?')[0];
    this.getServiceOrder(); // 获取订单列表
  }

  /**
   * @description 获取订单详情
   * @returns void
   * @author chenmo
   */
  @Loading()
  @ErrorMsg('获取订单详情失败')
  private async getServiceOrder() {
    try {
      const res: any = await this.axios.get(api.getRefundDetail + `/${this.orderId}/${this.refundOrderId}`);
      if (res && res.code === '000') {
        this.orderInfo = res.data || [];
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      // this.$toast.clear();
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

  private pushRecord() {
    if (this.orderInfo.orderType === 4) {
      // 带看
      this.$router.push(`/serviceRecordLook?orderId=${this.orderId}`);
    } else {
      this.$router.push(`/serviceRecord?orderId=${this.orderId}&entrustId=${this.entrustId}`);
    }
  }

  /**
   * @description 继续支付
   * @returns void
   * @author chenmo
   */
  private paymentData() {
    const status: string = this.orderInfo.orderType === 9 ? '2' : '1'; // 装修不需要发起服务
    const data  = {
      orderId: this.orderInfo.orderId,
      returnURL: `${returnDomain()}productDetile?entrustId=${this.entrustId}&orderId=${this.orderInfo.orderId}&status=${status}`,
    };
    this.payment(data); // 发起支付
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.order-detils
  .order-info
    padding 0 vw(15) vw(12)
    background $global-background
    margin-bottom vw(10)
  .order-title
    display -webkit-flex
    display flex
    justify-content space-between
    align-items center
    border-bottom 1px solid $border-color-light
    span
     color $main-color
     font-size 15px
  h2
    padding vw(12) 0
    font-size 16px
    color $text-color
  .serviceName
    font-size 15px
    color $text-color
    padding-top vw(10)
  .order-type
    padding-bottom vw(10)
    border-bottom 1px solid $bg-color-default
    .order-item
      display -webkit-flex /* Safari */
      display flex
      flex-direction row
      flex-wrap nowrap
      justify-content space-between
      align-items center
      font-size 15px
      color $text-color
      padding-top vw(10)
      .order-item-type
        color $main-color
      .check
        display inline-block
        font-size 12px
        border 1px solid $disabled-color
        border-radius 4px
        padding vw(2) vw(6) vw(2) vw(10)
        i 
          display inline-block
          color $text-color
          margin-top vw(1)
          font-size 15px
          vertical-align top
.dialogTips
  width 70%
  .van-dialog__header
    font-size 17px
    color #2C2D2E
    font-weight bold
  .van-dialog__message--has-title
    color #2C2D2E
    font-size 14px
.entrust-btn
  position fixed
  bottom 0
  left 0
  background $main-color
  color #fff
  z-index 10
</style>
