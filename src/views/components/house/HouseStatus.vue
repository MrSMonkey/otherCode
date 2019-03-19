/*
 * @Description: 房间基本信息
 * @Author: chenmo
 * @Date: 2019-02-19 11:12:50
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-19 11:52:03
 */
/*


<template>
  <ul class="time-line">
    <li v-for="item in data" :key="item.id">
      <div class="dot"></div>
      <p>{{item.content}}</p>
      <span>{{item.createTime}}</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop  } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { getQueryString } from '@/utils/utils';
import { RENT_TYPE, TOWARDNAME} from '@/config/config';

// 声明引入的组件
@Component({
  name: 'HouseStatus',
})
// 类方式声明当前组件
export default class HouseStatus extends CommonMixins {
  @Prop({ type: Array, default: () => [] })
  private data: any;

  /**
   * @description 过滤托管类型
   * @params type 类型
   * @returns string
   * @author chenmo
   */
  private getRentType(type: number) {
    return RENT_TYPE[type];
  }

  /**
   * @description 过滤朝向
   * @params type 类型
   * @returns string
   * @author chenmo
   */
  private getToward(toward: number) {
    return TOWARDNAME[toward];
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../assets/stylus/main.styl'
.time-line
  width 100%
  padding vw(20) vw(20) 0
  li
    position relative
    margin-left vw(6)
    padding-left vw(18)
    height 65px
    border-left 1px dashed $border-color-light
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
    span
      color $disabled-color
      font-size 12px /* no */
      line-height 3
    &:first-child
      .dot
        background-color $main-color
    &:last-child
      border 0
</style>
