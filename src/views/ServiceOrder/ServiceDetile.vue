/*
 * @Description: 服务包订单详情
 * @Author: chenmo
 * @Date: 2019-02-20 09:29:37
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-03-21 18:47:13
 */

<template>
  <section class="order-detils">
    <section class="order">
      <div class="order-info">
        <h2>服务包订单信息</h2>
        <div class='serviceName'>
          <span>服务包名称：{{orderInfo.servicePackage || '无'}}</span>
        </div>
        <div class='serviceName'>
          <span>服务包订单号：{{orderInfo.servicePackageOrderNo || '无'}}</span>
        </div>
        <div class='serviceName'>
          <span>下单时间：{{orderInfo.createTime|| '无'}}</span>
        </div>
        <div class='serviceName'>
          <span>实付款：{{orderInfo.price || 0 }}元</span>
        </div>
      </div>
      <div class="order-info">
        <h2>服务包订单信息</h2>
        <div class='order-type' v-for="(item, index) in orderInfo.serviceItems" :key="index">
          <div class="order-item">
            <span>订单号：{{item.orderNo || '无'}}</span>
            <div :class="item.status === 7 ? '' : 'order-item-type'">{{getOrderStatusName(item.status)}}</div>
          </div>
          <div class="order-item">
            <span>产品类型：{{item.serviceType || '无'}}</span><span class="check" @click="checkout(item.serviceId, item.orderType)" v-if="orderInfo.orderStatus !==1">查看服务记录<van-icon name="arrow" /></span>
          </div>
          <div class="order-item">
            <span>产品名称：{{item.serviceName || '无'}}</span>
          </div>
        </div>
      </div>
      <div class="order-info">
        <h2>其他信息</h2>
        <div class='serviceName'>
          <span>服务房源：{{orderInfo.serviceHouseName || '无'}}</span>
        </div>
        <div class='serviceName'>
          <span>联系人：{{orderInfo.houseContact || '无'}}</span>
        </div>
        <div class='serviceName'>
          <span>联系电话：{{orderInfo.houseContactPhone|| '无'}}</span>
        </div>
        <div class='serviceName'>
          <span>备      注：{{orderInfo.remark }}</span>
        </div>
      </div>
    </section>
    <section>
      <van-button slot="button" size="large" type="default" class="entrust-btn" @click="paymentData" v-if ="orderInfo.orderStatus === 1">继续支付</van-button>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { getQueryString, returnDomain } from '@/utils/utils';
import { STATUS_NAME } from '@/config/config';
import api from '@/api';
const namespace: string = 'global';

// 声明引入的组件
@Component({
  name: 'ServiceDetile',
})
// 类方式声明当前组件
export default class ServiceDetile extends CommonMixins {
  private servicePackageId: string = ''; // 订单id
  private entrustId: string = ''; // 房源id
  private orderInfo: any = {}; // 服务订单详情

  @Action('payment', { namespace }) private payment: any;

  private mounted() {
    this.servicePackageId = String(this.$route.query.orderId).split('?')[0];
    this.entrustId =  String(this.$route.query.entrustId).split('?')[0];
    this.getServiceOrder(this.servicePackageId); // 获取订单列表
  }

  /**
   * @description 获取订单详情
   * @params servicePackageId 订单id
   * @returns void
   * @author chenmo
   */
  private async getServiceOrder(servicePackageId: string) {
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
    try {
      const res: any = await this.axios.get(api.getOrderDetils + `/${servicePackageId}`);
      if (res && res.code === '000') {
        this.orderInfo = res.data || [];
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

  /**
   * @description 跳转服务记录
   * @params orderId 订单id
   * @params orderType 订单类型
   * @returns string
   * @author chenmo
   */
  private checkout(orderId: string, orderType: number) {
    if (orderType === 4) {
      this.$router.push(`/serviceRecordLook?orderId=${orderId}`);
    } else {
      this.$router.push(`/serviceRecord?orderId=${orderId}`);
    }
  }

  /**
   * @description 继续支付
   * @returns void
   * @author chenmo
   */
  private paymentData() {
    const data  = {
      orderId: this.orderInfo.servicePackageId,
      returnURL: `${returnDomain()}serviceDetile?entrustId=${this.entrustId}&orderId=${this.orderInfo.servicePackageId}`
    };
    this.payment(data); // 发起支付
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/main.styl'
.order-detils
  height auto
  .order
    margin-bottom vw(80)
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
  .entrust-btn
    position fixed !important
    bottom 0
    left 0
    background $main-color
    color #fff
.dialogTips
  width 70%
  .van-dialog__header
    font-size 17px
    color #2C2D2E
    font-weight bold
  .van-dialog__message--has-title
    color #2C2D2E
    font-size 14px

</style>
