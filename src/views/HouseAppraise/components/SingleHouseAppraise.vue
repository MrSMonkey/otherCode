/*
 * @Description: 单个房屋估价结果展示组件
 * @Author: linyu
 * @Date: 2019-04-25 13:48:33
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-30 16:34:49
 */

<template>
  <section class="single-house-appraise">
    <div class="bg-panel">
      <img :src="imgUrl" alt="loading">
    </div>
    <div class="result-panel">
      <div class="result-top">
        <p class="price price-one">{{appraiseInfo.price}}</p>
        <p class="top-desc">出售估价参考（万元）</p>
      </div>
      <div class="result-middle">
        <p>可贷款金额参考（万元）</p>
        <p class="price price-two">{{appraiseInfo.loanSum}}</p>
        <p>(最终可贷金额以银行审批结果为准)</p>
      </div>
      <div class="result-bottom">
        <ul>
          <li>小区名称：{{appraiseInfo.communityName}}</li>
          <li>房屋均价：{{appraiseInfo.unitPrice}}元/平</li>
          <li>估价参考范围：{{(parseFloat(appraiseInfo.loanSum)*0.95).toFixed(2)}}万-{{(parseFloat(appraiseInfo.loanSum)*1.05).toFixed(2)}}万</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
// 声明引入的组件
@Component({
  name: 'SingleHouseAppraise'
})

// 类方式声明当前组件
export default class SingleHouseAppraise extends CommonMixins {
  @Prop({
    type: Object,
    default: {}
  })
  private appraiseInfo: any;
  private imgUrl: string = require('@/assets/images/bg_result.png');
}
</script>



<style lang="stylus" rel="stylesheet/stylus" scoped>
  .single-house-appraise
    position relative
    &::after
      display block
      content ""
      height 0
      clear both
      overflow hidden
      visibility hidden
    .bg-panel
      height 100%
      img
        display inline-block
        width 100%
    .result-panel
      position relative
      left 0
      top vw(-200)
      width 100%
      z-index 2
      .result-top
        margin vw(45) vw(15) vw(20)
        .top-desc
          margin-top vw(10)
          color #fafafa
          font-size 15px
          height vw(21)
          line-height vw(21)
      .result-middle
        padding vw(10) vw(15)
        background #ffffff
        margin 0 vw(15) vw(8)
        border-radius 8px
        p:first-child
          color $next-text-color
          font-size 14px
          height vw(20)
          line-height vw(20)
        p:last-child
          color $tip-text-color
          font-size 12px
          height vw(16)
          line-height vw(16)
      .result-bottom
        padding vw(10) vw(15)
        background #ffffff
        margin 0 vw(15) vw(8)
        border-radius 8px
      .price
        font-weight 600
        color $main-color
        font-family DIN-Bold
      .price-one
        color #ffffff
        font-size 44px
        height vw(36)
        line-height vw(36)
      .price-two
        font-size 24px
        height vw(54)
        line-height vw(54)
      li
        color $text-color
        font-size 15px
        height vw(32)
        line-height vw(32)
</style>

