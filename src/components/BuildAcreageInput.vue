/*
 * @Description: 房屋面积输入框
 * @Author: linyu
 * @Date: 2019-04-23 16:06:09
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-24 11:49:57
 */

<template>
  <div class="input-panel">
    <div class="label">
      <slot>面&emsp;&emsp;积</slot>
    </div>
    <div class="village">
      <van-field
        v-model="buildAcreage"
        placeholder="请输入产权面积"
        type="number"
        input-align="right"
      >
        <span slot="button" >平米</span>
      </van-field>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Field, Row, Col } from 'vant';

// 声明引入的组件
@Component({
  name: 'BuildAcreageInput',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col
  }
})
// 类方式声明当前组件
export default class BuildAcreageInput extends CommonMixins {
  @Prop({
    type: String,
    default: 'right'
  })
  private inputAlign: string;
  private buildAcreage: string | number = '';

  @Watch('buildAcreage', { immediate: true})
  private onPersonChanged(val: string | number, oldVal: string | number) {
    this.change(val);
  }
  /**
   * @description 面积输入
   * @params value 输入框当前值
   * @returns void
   * @author linyu
   */
  @Emit()
  private change(value: string | number) {
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

