<template>
  <section>
      <section class="area">
        <div class="city">
          <div class="label">小&emsp;&emsp;区*</div>
          <div class="village">
            <van-field
              v-model="communityName"
              placeholder="请选择您爱屋所在的小区"
              type="text"
              readonly
              right-icon="arrow"
              @click-right-icon="toPlot"
              @click="toPlot"
            />
          </div>
        </div>
        <div class="fixture">
          <div class="label">装修情况*</div>
          <div class="check">
            <span v-for="(item, index) in houseSetting" :key="index" :class="item.id === active ? 'active' : ''" @click="selectItem(item.id)"> {{item.name}} </span>
          </div>
        </div>
      </section>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Field, Row, Col, Button } from 'vant';

// 声明引入的组件
@Component({
  name: 'CityInput',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button
  }
})
// 类方式声明当前组件
export default class CityInput extends CommonMixins {

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../assets/stylus/main.styl'
  .area
    margin-bottom vw(10)
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
    .city
      background $global-background
      height vw(55)
      padding vw(20)
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
          // padding: 0 15px;
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
    .fixture
      background $global-background
      height vw(55)
      padding vw(20)
      border-bottom 1px solid $separate-line-color
      display -webkit-flex
      display flex
      justify-content flex-start
      align-items center
      .check
        border: 1px solid $tip-text-color
        border-radius 4px
        margin-left vw(6)
        span
          display inline-block
          width vw(65)
          height vw(30)
          line-height vw(30)
          text-align center
          font-size 12px
          color $text-color
        .active
          background $main-color
          color #fff
</style>


