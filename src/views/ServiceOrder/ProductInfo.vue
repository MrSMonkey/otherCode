/*
 * @Description: 购买服务产品
 * @Author: chenmo
 * @Date: 2019-03-15 15:05:49
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-10 11:47:02
 */


<template>
  <section class="service-info">
      <h2 class="serviceinfo-title">{{data.productName || '无'}}</h2>
      <div class="block" v-if="data.typeId === 4">
        <span>产品价格：</span>
        <p>每签约1单按原租金{{data.commission}}提成</p>
      </div>
      <div class="block" v-else>
        <span>产品单价：</span>
        <p>{{parseFloat(data.price).toFixed(2) || '0.00'}}{{data.unit}}</p>
      </div>
      <div class="block">
        <span>产品类型：</span>
        <p>{{data.typeName || '无'}}</p>
      </div>
      <div class="block">
        <span>服务总次数：
          <em v-if="data.typeId === 4 && data.serviceCount === 0">不限制次数</em>
          <em v-else>{{data.serviceCount}}</em>
        </span>
        <!-- <p v-if="data.typeId === 4 && data.serviceCount === 0" class="service-count">不限制次数</p>
        <p v-else class="service-count">{{data.serviceCount}}</p> -->
        <p>&emsp;</p>
      </div>
      <div class="block">
        <span>咨询电话：</span>
        <p>{{data.phone || '无'}}</p>
      </div>
      <div class="block">
        <span>产品描述：</span>
        <p>{{data.description || '无'}}</p>
      </div>
      <div class="block">
        <span>产品图片：</span>
        <p>&emsp;</p>
      </div>
      <div class="imgbox">
        <ImagePreview :imgagesArr="data.productImgs"/>
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
import ConfirmBtn from '@/components/ConfirmBtn.vue';
import { returnDomain } from '@/utils/utils';
import { STATUS_NAME, TIPSONE, TIPSTWO } from '@/config/config';
import { handleWebStorage } from '@/utils/utils';
import api from '@/api';

const namespace: string = 'global';

// 声明引入的组件
@Component({
  name: 'ProductInfo',
  components: {
    ImagePreview,
    ConfirmBtn
  }
})
// 类方式声明当前组件
export default class ProductInfo extends CommonMixins {
  private entrustId: string = ''; // 委托房源ID
  private cityId: string = ''; // 城市Id
  private productId: string = ''; // 服务包ID
  private data: any = {}; // 服务订单详情
  private buyersName: string = ''; // 联系人
  private buyersPhone: string = ''; // 手机号
  private buyersRemarks: string = ''; // 备注
  private bugVisible: boolean = false; // 购买弹窗
  private loading: boolean = false; // 提交加载
  private showDialog: boolean = false; // 提交加载
  private isphoneErr: boolean = false;
  private isintroducePhoneErr: boolean = false;
  private introducePhone: string = ''; // 推荐人联系电话
  private tips: string = TIPSONE;
  private tipsTwo: string = TIPSTWO;

  // computed
  get isActive(): boolean {
    return !this.buyersName || !this.isphoneErr || (!!this.introducePhone && !this.isintroducePhoneErr);
  }



  private mounted() {
    this.entrustId = String(this.$route.query.entrustId);
    this.cityId = String(this.$route.query.cityId) === 'undefined' ? '' : String(this.$route.query.cityId);
    this.productId = handleWebStorage.getLocalData('productId', 'sessionStorage');
    this.getProductDetail(this.productId, this.cityId); // 获取服务包详情
  }

  /**
   * @description 获取服务产品详情
   * @params productId 服务产品id
   * @params cityId 城市id
   * @returns void
   * @author chenmo
   */
  private async getProductDetail(productId: string, cityId: string) {
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
    try {
      const res: any = await this.axios.get(api.getProductDetail + `/${productId}/${cityId}`);
      if (res && res.code === '000') {
        this.data = res.data || {};

        /**
         * @params productId = 118062916141300008 工程维修产品 && 118062916145800009 家电维修产品
         * @params typeId = 9 装修设计产品id
         */
        // if (res.data.productId === '118062916141300008' || res.data.productId === '118062916145800009') {
        //   this.tips = TIPSONE;
        // } else if (res.data.typeId === 9) {
        //   this.tips = TIPSTWO;
        // }
      } else {
        this.$toast(`获取服务产品详情失败`);
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
   * @description 关闭dialog
   * @returns string
   * @author chenmo
   */
  private cancel() {
    this.bugVisible = false;
  }

  /**
   * @description 购买
   * @returns string
   * @author chenmo
   */
  private buy() {
    this.$router.push(`/productPayment?entrustId=${this.entrustId}&pre=productInfo`);
  }

  private plotCancel() {
    this.bugVisible = false;
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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
        max-height vw(160)
        overflow-y scroll
      .service-count
        // margin-left vw(115)
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
    .tips
      width 100%
      // height vw(40)
      background #FFF5F5
      padding vw(5) vw(5) vw(5) vw(15)
      p
        text-align left
        display inline-block
        font-size 12px
        color #FF5252
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
