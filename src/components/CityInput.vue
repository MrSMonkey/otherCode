/*
 * @Description: 选择城市input组件
 * @Author: linyu
 * @Date: 2019-04-09 12:39:25
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-09 12:40:47
 */

<template>
  <section>
    <div class="city">
      <div class="label">城&emsp;&emsp;市*</div>
      <div class="village">
        <van-field
          v-model="cityName"
          :placeholder="placeholderText"
          type="text"
          right-icon="arrow"
          readonly
          @click="cityShow = true"
          @click-right-icon="cityShow = true"
        />
      </div>
    </div>
    <!-- 城市弹窗 -->
    <van-popup v-model="cityShow" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        :columns="cityList"
        @confirm="cityConfirm"
        @cancel="cityShow = false"
        title="选择城市"
      />
    </van-popup>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { CityItem } from '@/interface/configInterface.ts';
import { Field, Row, Col } from 'vant';

// 声明引入的组件
@Component({
  name: 'CityInput',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col
  }
})
// 类方式声明当前组件
export default class CityInput extends CommonMixins {
  @Prop({
    type: String,
    default: '请选择您爱屋所在城市'
  })
  private placeholderText: string;
  @Prop({
    type: Array,
    default: [],
    required: true
  })
  private cityList: CityItem[];
  private cityShow: boolean = false;
  private cityName: string = '成都市';
  /**
   * @description 选择城市确认
   * @returns void
   * @author linyu
   */

  @Emit()
  private cityConfirm(item: any, index: number) {
    this.cityName = item.text;
    this.cityShow = false;
  }
}
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../assets/stylus/main.styl'
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
</style>

