/*
 * @Description: 购买服务包
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-10 11:47:55
 */

<template>
  <section class="service-info">
    <h2 class="serviceinfo-title">{{data.serviceName || '无'}}</h2>
    <div class="block">
      <span>产品单价：</span>
      <p>{{data && parseFloat(data.price).toFixed(2) || '0.00'}}元</p>
    </div>
    <div class="block">
      <span>服务产品：</span>
      <p v-for="(item, index) in data.productInfosBeans" :key="index">{{item.childProductName || '无'}}</p>
    </div>
    <div class="block">
      <span>咨询电话：</span>
      <p>{{data.phone || '无'}}</p>
    </div>
    <div class="block">
      <span>产品描述：</span>
      <p>{{data.desc || '无'}}</p>
    </div>
    <div class="block">
      <span>产品图片：</span>
      <p>&emsp;</p>
    </div>
    <div class="imgbox">
      <ImagePreview :imgagesArr="data.imgUrls"/>
    </div>
    <div class="service-footer">
      <van-button slot="button" size="large" type="default" class="service-btn" @click="buy">购买</van-button>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import ImagePreview from '@/components/ImagePreview.vue';
import BuyModal from './components/BuyModal.vue';
import ConfirmBtn from '@/components/ConfirmBtn.vue';
import { returnDomain } from '@/utils/utils';
import { STATUS_NAME } from '@/config/config';
import { handleWebStorage } from '@/utils/utils';
import api from '@/api';

const namespace: string = 'global';

// 声明引入的组件
@Component({
  name: 'ServiceInfo',
  components: {
    ImagePreview,
    BuyModal,
    ConfirmBtn
  }
})
// 类方式声明当前组件
export default class ServiceInfo extends CommonMixins {
  private entrustId: string = ''; // 委托房源ID
  private serviceId: string = ''; // 服务包ID
  private data: any = {}; // 服务订单详情

  @Getter('getUserInfo', { namespace }) private userInfo: any;


  private mounted() {
    this.entrustId = String(this.$route.query.entrustId) === 'undefined' ? '' : String(this.$route.query.entrustId);
    this.serviceId = handleWebStorage.getLocalData('serviceId', 'sessionStorage');
    this.getServiceDetils(this.serviceId); // 获取服务包详情
  }

  /**
   * @description 获取服务包详情
   * @params serviceId 服务包id
   * @returns void
   * @author chenmo
   */
  private async getServiceDetils(serviceId: string) {
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
    try {
      const res: any = await this.axios.get(api.getServiceDetils + `/${serviceId}`);
      if (res && res.code === '000') {
        this.data = res.data || [];
      } else {
        this.$toast(`获取服务包详情失败`);
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
   * @description 购买
   * @returns string
   * @author chenmo
   */
  private buy() {
    this.$router.push(`/packPayment?entrustId=${this.entrustId}&pre=serviceInfo`);
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/main.styl'
  .service-info
    padding 0 vw(0)
    width 100%
    height 100%
    background $global-background
    .serviceinfo-title
      font-size 16px
      color $text-color
      padding vw(12) vw(15)
      border-bottom: 1px solid $border-color-light
    .block
      font-size 15px
      color $text-color
      font-family: PingFangSC-Regular;
      padding vw(10) 0 0
      position relative
      span 
        position absolute
        top vw(10)
        left vw(15)
      p
        display inline-block
        margin-left vw(98)
        word-wrap break-word
        text-align justify
        width vw(240)
        max-height vw(100)
        overflow-y scroll
      img
        padding-bottom vw(20)
    .service-footer
      .service-btn
        width 100%
        position fixed
        bottom 0
        left 0
        background $main-color
        color #fff
  .buy-dialog
    height vw(300)
    .title
      display -webkit-flex
      display flex
      justify-content space-between
      align-items center
      padding vw(10)
      border-bottom: 1px solid $border-color-light
      .left
        img
          display inline-block
          width vw(18)
          padding-top vw(5)
      .content
        font-size 16px
        color $text-color
      .right
        color $main-color
        font-size 14px
    .el-input
      .van-field__label
        font-size 15px
        color $text-color
      input
        font-size 15px
        color $text-color
      .dec
        padding-top vw(15)
        background $global-background
        p
          padding-left vw(15)
          font-size 15px
          color $text-color
        .textarea
          textarea
            font-size 15px
            background #fafafa
            border-radius 4px
            padding vw(10)
            height vw(80)
    .plot-price
      display inline-block
      font-size 18px
      margin-left vw(6)
</style>
