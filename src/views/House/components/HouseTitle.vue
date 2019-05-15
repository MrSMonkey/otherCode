/*
 * @Description: 房源列表标题
 * @Author: chenmo
 * @Date: 2019-04-09 13:36:28
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-23 14:11:43
 */

<template>
  <section class="house-title">
    <h2><span>{{house.districtName}}</span> {{house.communityName || ''}}&nbsp;{{house.handleStatus === 1 ? '' : `${house.building || '?'}栋${house.unit || '?'}单元${house.floorNum || '?'}楼${house.number || '?'}号` }}</h2>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit  } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';

// 声明引入的组件
@Component({
  name: 'HouseTitle',
})
// 类方式声明当前组件
export default class HouseTitle extends CommonMixins {
  @Prop({ type: Object, default: {} })
  private house: any;
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.house-title
  h2 
    font-size 16px
    border-bottom 1px solid $bg-color-default
    line-height 1.5
    padding vw(15)
    span 
      display inline-block
      &:nth-child(1)
        margin-right vw(8)
      &:nth-child(2)
        margin-left vw(8)
</style>
