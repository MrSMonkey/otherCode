/*
 * @Description: 小区选择输入框
 * @Author: linyu
 * @Date: 2019-04-22 17:38:57
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-23 15:25:29
 */

<template>
  <div class="input-panel">
    <div class="label">
      <slot>小&emsp;&emsp;区*</slot>
    </div>
    <div class="village">
      <van-field
        v-model="communityName"
        placeholder="请选择您爱屋所在的小区"
        type="text"
        readonly
        right-icon="arrow"
        :input-align="inputAlign"
        @click-right-icon="toCommunity"
        @click="toCommunity"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Field, Row, Col } from 'vant';

// 声明引入的组件
@Component({
  name: 'CommunityInput',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col
  }
})
// 类方式声明当前组件
export default class CommunityInput extends CommonMixins {
  @Prop({
    type: String,
    default: 'right'
  })
  private inputAlign: string;
  @Prop({
    type: String,
    default: ''
  })
  private communityName: string;

  /**
   * @description 选择城市确认
   * @returns void
   * @author linyu
   */
  @Emit()
  private toCommunity() {
    return;
  }
}
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
  .label
    display inline-block
    width 83px
    font-size 15px
    color $text-color
    padding-top vw(18)
    &::after
      content ''
      display inline-block
      width 100%
  .just
    text-align justify
  .input-panel
      background $global-background
      height vw(55)
      padding vw(15) vw(6) vw(20) vw(15)
      border-bottom 1px solid $bg-color-default
      display -webkit-flex
      display flex
      justify-content space-around
      align-items center
      .village
        width 90%
        .code-btn
          border 0
          font-size 15px
          color $tip-text-color
        .btn-active
          color $main-color
        .van-cell
          padding vw(10) vw(0) vw(10) vw(10) !important
          input
            font-size 15px
            color $text-color
            &::-webkit-input-placeholder
              color $disabled-color
          .van-field__label
            text-align justify
            span 
              display inline-block
              width 100%
              text-align justify
              color $text-color
              font-size 15px
</style>

