<!--
  /*
  * @Description: 自定义时间轴组件
  * @Author: chenmo
  * @Date: 2018-09-17 17:20:01
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-04-11 10:54:23
  */
-->

<template>
  <ul class="time-line main-wrapper">
    <li v-for="(item, index) in timeLineData" :key="index">
      <div class="time-line-item-title">
        <span class="title-icon"></span>
        <span class="title">{{item.title}}</span>
      </div>
      <div class="time-line-item-list" ref="timeLineItemList">
        <p v-for="(itemlist, itemIndex) in item.content" :key="itemIndex">{{itemIndex+1}}、{{itemlist}}</p>
        <div class="spread-line" ref="spreadLine"></div>
      </div>
    </li>
  </ul>
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

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
ul.time-line
  max-height vw(200)
  overflow-x hidden
  overflow-y scroll
  li 
    .time-line-item-title 
      .title 
        margin-left 12px
        font-weight: 700
      .title-icon
        display: inline-block;
        width: 9px;
        height: 9px;
        border: 1px solid $main-color;
        border-radius: 50%;
    .time-line-item-list 
      position relative
      font-size 14px;
      width 100%
      height auto
      padding 15px 25px
      .spread-line
        display inline-block
        width: 1px
        height: 100%
        border-left 1px solid #e5e5e5
        position absolute
        top: 0
        left 4px
      p
        &:not(:last-child)
          margin-bottom: 10px;
</style>
