<!--
  /*
  * @Description: 自定义时间轴组件
  * @Author: chenmo
  * @Date: 2018-09-17 17:20:01
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-04-11 14:27:54
  */
-->

<template>
  <ul class="time-line">
    <li v-for="item in timeLineData" :key="item.id">
      <div class="dot"></div>
      <p class="line-title">{{item.title}}</p>
      <div class="time-line-item-list" ref="timeLineItemList">
        <p v-for="(itemlist, itemIndex) in item.content" :key="itemIndex">{{itemIndex+1}}、{{itemlist}}</p>
        <div class="spread-line" ref="spreadLine"></div>
      </div>
    </li>
  </ul>
  <!-- <ul class="time-line main-wrapper">
    <li v-for="(item, index) in timeLineData" :key="index">
      <div class="time-line-item-title">
        <span class="title-icon"></span>
        <p class="title">{{item.title}}</p>
      </div>
      <div class="time-line-item-list" ref="timeLineItemList">
        <p v-for="(itemlist, itemIndex) in item.content" :key="itemIndex">{{itemIndex+1}}、{{itemlist}}</p>
        <div class="spread-line" ref="spreadLine"></div>
      </div>
    </li>
  </ul> -->
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';

// 声明引入的组件
@Component({
  name: 'TimeLine'
})
export default class TimeLine extends Vue {
  public $refs!: {
    spreadLine: HTMLFormElement
  };

  @Prop({ type: Array, default: () => [] })
  private timeLineData: any[];
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../assets/stylus/main.styl'
.time-line
  width 100%
  padding vw(20) vw(20) 0
  max-height vw(200)
  overflow-x hidden
  overflow-y scroll
  .viewImg
    margin-left vw(-20)
    padding-bottom vw(25)
  li
    position relative
    margin-left vw(6)
    padding-left vw(18)
    min-height 65px
    border-left 1px dashed $border-color-light
    .imgfoldView .img-box
      margin-right vw(4.5)
    .dot
      position: absolute
      top 0
      left -6px
      width 12px
      height 12px
      border-radius 50%
      background-color $disabled-color
    p
      vertical-align top
      line-height 1
      color $text-color
      font-size 14px
      margin-bottom vw(10)
    .line-title
      font-weight 700
      color #000
      font-size 15px
    span
      color $disabled-color
      font-size 12px /* no */
      line-height 3
    &:first-child
      .dot
        background-color $main-color
</style>
