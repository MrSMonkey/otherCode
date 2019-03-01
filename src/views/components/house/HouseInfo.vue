/*
 * @Description: 房间基本信息
 * @Author: chenmo
 * @Date: 2019-02-19 11:12:50
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-19 11:35:59
 */
/*


<template>
  <section class="house-info">
    <div class="base-info">
      <div class="block">
        <span>门牌号</span>
        <p>{{`${houseInfo.building || ' '}栋`}}{{`${houseInfo.unit || ' '}单元`}}{{`${houseInfo.number || ' '}室`}}</p>
      </div>
      <div class="block">
        <span>运营类型</span>
        <p>{{getRentType(houseInfo.consociationType)}}</p>
      </div>
    </div>
    <div class="detail-info">
      <div class="block">
        <label>小区名称：</label>
        <span>{{houseInfo.communityName}}</span>
      </div>
      <div class="block-secondary">
        <label>楼<span class="space-2"/>层：</label>
        <span>{{houseInfo.floorNum}}/{{houseInfo.floorTotality}}层</span>
      </div>
      <div class="block">
        <label>原始户型：</label>
        <span>{{houseInfo.roomNum}}室{{houseInfo.hallNum}}厅{{houseInfo.toiletNum}}卫</span>
      </div>
      <div class="block-secondary">
        <label>朝<span class="space-2"/>向：</label>
        <span>{{getToward(houseInfo.toward)}}</span>
      </div>
      <div class="block">
        <label>面<span class="space-2"/>积：</label>
        <span>{{houseInfo.buildAcreage}}㎡</span>
      </div>
      <div class="block-secondary">
        <label>装修情况：</label>
        <span>{{houseInfo.buildAcreage}}㎡</span>
      </div>
      <div class="block">
        <label>改造后房间数：</label>
        <span>{{houseInfo.roomNum}}间</span>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop  } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { getQueryString } from '@/utils/utils';
import { RENT_TYPE, TOWARDNAME} from '@/config/config';

// 声明引入的组件
@Component({
  name: 'HouseInfo',
})
// 类方式声明当前组件
export default class Login extends CommonMixins {
  @Prop({ type: Object, default: {} })
  private houseInfo: any;

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

<style lang="stylus" rel="stylesheet/stylus" >
@import '../../../assets/stylus/main.styl'
.house-info
  .base-info
    padding-top 18px
    padding-bottom 22px
    border-top 1px solid $border-color-light
    background-color $global-background
    .block 
      width: 50%
      display inline-block
      text-align center
      span 
        color $next-text-color
        font-size 14px
      p 
        margin-top 10px
        font-size 17px
        font-weight bold
      &:first-child
        border-right 1px solid  $border-color-light
  .detail-info
    padding 20px
    border-top 1px solid $border-color-light
    background-color $global-background
    font-size 14px /* no */
    .block
      width 55%
      display inline-block
      white-space nowrap
      text-overflow ellipsis
    .block-secondary
      padding-left: 10px
      width: 45%
      display inline-block
    div
      margin-bottom 10px
      overflow hidden
    label
      color $tip-text-color
      display: inline-block
    span
      max-width 480px
      vertical-align: top
      display inline-block
      coolor #000
    .space-2 
      width 28px /* no */
      height 1px
      display inline-block
</style>
