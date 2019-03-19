/*
 * @Description: 确认支付
 * @Author: zhegu
 * @Date: 2019-03-07 17:56:23
 * @Last Modified by: zhegu
 * @Last Modified time: 2019-03-14 20:49:18
 */

<template>
  <section class="confirm-pay">
    <section class="confirm-pay-main">
      <div class="list" v-for="(item,index) in data.repairItemInfos" :key="index">
        <h1>{{item.goodName}}</h1>
        <p v-for="(child,childIndex) in item.details" :key="childIndex">
          <span>{{child.itemName}}</span>
          <span>{{child.price && parseFloat(child.price).toFixed(2) || '0.00'}}元</span>
        </p>
      </div>
      <div class="list">
        <h1>费用结算</h1>
        <p>
          <span>上门检查费扣除</span>
          <span>{{data.yetPrice && parseFloat(data.yetPrice).toFixed(2) || '0.00'}}元</span>
        </p>
        <p>
          <span>支付总金额</span>
          <span>{{data.totalPrice && parseFloat(data.totalPrice).toFixed(2) || '0.00'}}元</span>
        </p>
        <p>
          <span>还需支付金额</span>
          <span>{{data.needPrice && parseFloat(data.needPrice).toFixed(2) || '0.00'}}元</span>
        </p>
      </div>
    </section>
    <div class="pay-footer">
      <span>
        <span>需支付：</span>
        <span class="price">￥{{data.needPrice && parseFloat(data.needPrice).toFixed(2) || '0.00'}}</span>
      </span>
      <span class="btn" @click="submitPay">确认支付</span>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import ImagePreview from './components/ImagePreview/ImagePreview.vue';
import { Button, CellGroup, Field, Icon } from 'vant';
import HouseStatus from './components/house/HouseStatus.vue';
import api from '@/api';
import { returnDomain } from '@/utils/utils';
const namespace: string = 'global';

// 声明引入的组件
@Component({
  name: 'ConfirmPay',
  components: {
    ImagePreview,
    HouseStatus,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Icon.name]: Icon
  }
})
export default class ConfirmPay extends CommonMixins {
  private data: any[] = []; // 支付数据
  private orderId: string = ''; // 订单id
  @Action('payment', { namespace }) private payment: any;

  private mounted() {
    this.orderId = String(this.$route.query.orderId);
    this.getServiceRepair(this.orderId); // 获取维修服务验收详情\
    console.log('returnDomain', returnDomain());
  }
  /**
   * @description 维修服务支付详情
   * @params orderId 订单id
   * @returns void
   * @author zhegu
   */
  private async getServiceRepair(orderId: string) {
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
    try {
      const res: any = await this.axios.get(api.getServiceRepair + `/${orderId}`);
      if (res && res.code === '000') {
        this.data = res.data || [];
      } else {
        this.$toast(`获取维修服务支付详情失败`);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.$toast.clear();
    }
  }
  /**
   * @description 支付
   * @returns void
   * @author zhegu
   */
  private async submitPay() {
    try {
      const res: any = await this.axios.post(api.payment + `/${this.orderId}`);
      if (res && res.code === '000') {
        const data  = {
          orderId: res.data.orderId,
          productURL: returnDomain() + 'ServiceRecord?orderId=' +  `/${this.orderId}`
        };
        this.payment(data);
      } else {
        this.$toast(res.message);
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
.confirm-pay
  .confirm-pay-main
    width 100%
    padding vw(12.5) vw(15)
    background-color #fff
    color $text-color
    .list 
      padding-bottom vw(15)
      border-bottom 1px solid #e7e7e7
      margin-bottom vw(12.5)
      &:last-child
        border 0
        margin-bottom 0
        padding 0
      h1
        font-size vw(16)
        margin-bottom vw(10)
      p
        display flex
        flex-direction row
        justify-content space-between
        span 
          font-size vw(15)
          &:nth-child(2)
            font-weight bold
  .pay-footer
    display flex
    flex-direction row
    justify-content space-between
    position fixed
    left 0
    bottom 0
    width 100%
    height vw(49)
    line-height vw(49)
    background #fff
    box-shadow 0 -1px 10px 0 rgba(0,0,0,0.05)
    padding-left vw(20)
    font-size vw(14)
    .price
      font-size vw(16)
      color $main-color
    .btn
      display inline-block
      width vw(110)
      height 100%
      background-color $main-color
      color #fff
      font-size vw(17)
      text-align center
</style>
