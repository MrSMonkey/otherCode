/*
 * @Description: linyu
 * @Author: linyu
 * @Date: 2019-04-25 13:48:33
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-25 13:49:01
 */

<template>
  <section class="multi-house-appraise">
    <div class="appraise-item">
      <div class="item-header">
        <p class="title">保利星座</p>
        <p class="header-desc">12栋2单元6楼602</p>
      </div>
      <div class="item-footer">
        <div class="footer-left">
          <div>
            <p class="price price-one">299.8</p>
            <p class="footer-desc">出售估价参考（万元）</p>
          </div>
          <div>
            <p class="unit">14838元/平</p>
            <p class="footer-desc">房屋均价</p>
          </div>
        </div>
        <div class="footer-right">
          <div>
            <p class="price price-two">299.8</p>
            <p class="footer-desc">可贷款金额参考(万元)</p>
          </div>
          <div>
            <p class="unit">280万-310万</p>
            <p class="footer-desc">估价参考范围</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
// 声明引入的组件
@Component({
  name: 'MultiHouseAppraise'
})

// 类方式声明当前组件
export default class MultiHouseAppraise extends CommonMixins {
  @Prop({
    type: Boolean,
    default: false
  })
  private star: boolean;
}
</script>



<style lang="stylus" rel="stylesheet/stylus" scoped>
  .multi-house-appraise
    .appraise-item
      padding 15px 0
      background #ffffff
      .item-header
        margin  0 vw(15)
        padding-bottom vw(12)
        border-bottom 1px solid $separate-line-color
        .title
          color $text-color
          height vw(24)
          line-height vw(24)
          font-size 17px
        .header-desc
          height vw(20)
          line-height vw(20)
          font-size 14px
          color $tip-text-color
      .item-footer
        padding-top vw(10)
        display flex
        justify-content space-between
        align-items flex-end
        .price
          font-weight 600
          color $main-color
          font-family DIN-Bold
        .price-one
          height vw(42)
          line-height vw(42)
          font-size 34px
        .price-two
          height vw(26)
          line-height vw(26)
          font-size 22px
          margin-bottom vw(5)
        .footer-desc
          height vw(16)
          line-height vw(16)
          color $tip-text-color
          font-size 12px
        .unit
          color $text-color
          font-family PingFang-SC-Medium
          height vw(21)
          line-height vw(21)
          font-size 15px
          margin-bottom 5px
        .footer-left
          position relative
          &::after
            position absolute
            content ''
            display block
            top vw(31)
            right 1px
            height vw(70)
            width 1px
            background #e7e7e7
        &>div
          flex-grow 1
          padding vw(10) vw(15) 0
          div:last-child
            margin-top 15px
            

</style>

