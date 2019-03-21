/*
 * @Description: 服务产品订单详情
 * @Author: chenmo
 * @Date: 2019-03-14 20:26:26
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-03-21 17:28:55
 */

<template>
  <section class="order-detils">
    <div class="order-info">
      <div><h2>服务产品订单信息</h2></div>
      <div class='serviceName'>
        <span>服务产品名称：{{orderInfo.productName || '无'}}</span>
      </div>
      <div class='serviceName'>
        <span>服务产品订单号：{{orderInfo.orderTypeName || '无'}}</span>
      </div>
      <div class='serviceName'>
        <span>产品类型：{{orderInfo.orderType || '无'}}</span>
      </div>
      <div class='serviceName'>
        <span>下单时间：{{orderInfo.orderStartTime|| '无'}}</span>
      </div>
      <div class='serviceName'>
        <span>实付款：{{orderInfo.orderAmount || 0 }}元</span>
      </div>
    </div>
    <div class="order-info">
      <h2>其他信息</h2>
      <div class='serviceName'>
        <span>服务房源：{{orderInfo.productHouseName || '无'}}</span>
      </div>
      <div class='serviceName'>
        <span>联系人：{{orderInfo.buyersName || '无'}}</span>
      </div>
      <div class='serviceName'>
        <span>联系电话：{{orderInfo.buyersPhone|| '无'}}</span>
      </div>
      <div class='serviceName'>
        <span>备      注：{{orderInfo.buyersRemarks }}</span>
      </div>
    </div>
    <section>
      <van-button slot="button" size="large" type="default" class="entrust-btn" @click="pushRecord">查看服务历史</van-button>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { getQueryString } from '@/utils/utils';

import { STATUS_NAME } from '@/config/config';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'ProductDetile',
})
// 类方式声明当前组件
export default class ProductDetile extends CommonMixins {
  private orderId: string = ''; // 订单id
  private entrustId: string = ''; // 房源id
  private orderInfo: any = {}; // 服务订单详情

  private mounted() {
    this.orderId = String(this.$route.query.orderId);
    this.entrustId =  String(this.$route.query.entrustId);
    this.getServiceOrder(this.orderId); // 获取订单列表
  }

  /**
   * @description 获取订单详情
   * @params orderId 订单id
   * @returns void
   * @author chenmo
   */
  private async getServiceOrder(orderId: string) {
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
    try {
      const res: any = await this.axios.get(api.getProductOrderDetail + `/${orderId}`);
      if (res && res.code === '000') {
        this.orderInfo = res.data || [];
        const status: string = String(this.$route.query.orderId);
        if (status === '1') {
          // 1代表支付进入 2 代表从订单进入不需要弹窗
          this.$dialog.confirm({
            title: '提示',
            confirmButtonText: '是',
            cancelButtonText: '否',
            className: 'dialogTips',
            message: '是否立即发起本服务'
          }).then(() => {
            // on confirm
            this.$router.push(`/startService?productId=${res.data.productId}&entrustId=${this.entrustId}`); // 跳转到发起服务
          }).catch(() => {
            // on cancel 取消
          });
        }
      } else {
        this.$toast(`获取订单详情失败`);
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

  private pushRecord() {
    if (this.orderInfo.orderType === 4) {
      // 带看
      this.$router.push(`/serviceRecordLook?orderId=${this.orderId}`);
    } else {
      this.$router.push(`/serviceRecord?orderId=${this.orderId}`);
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
.order-detils
  .order-info
    padding 0 vw(15) vw(12)
    background $global-background
    margin-bottom vw(10)
  h2
    padding vw(12) 0
    font-size 16px
    color $text-color
    border-bottom 1px solid $border-color-light
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
</style>
