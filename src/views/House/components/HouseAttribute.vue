/*
 * @Description: 房源属性
 * @Author: chenmo
 * @Date: 2019-04-09 13:36:57
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-04-09 13:37:28
 */

<template>
  <section>
    <div class="set">
      <span>{{getRentType(house.consociationType)}}</span> | 
      <span>{{getRentWay(house.rentWay)}} </span> | 
      <span v-if="house.rentWay === 2">{{house.rentRoom ? `${house.roomTotal}个房间 ${house.rentRoom}个已出租` : '待租中'}}</span>
      <span v-else>{{house.rentRoom ? `已出租` : '待租中'}}</span>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit  } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { RENT_WAY, RENT_TYPE } from '@/config/config';

// 声明引入的组件
@Component({
  name: 'HouseAttribute'
})
// 类方式声明当前组件
export default class HouseAttribute extends CommonMixins {
  @Prop({ type: Object, default: {} })
  private house: any;

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
   * @description 过滤托管类型
   * @params type 类型
   * @returns string
   * @author chenmo
   */
  private getRentWay(status: number) {
    return RENT_WAY[status];
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../assets/stylus/main.styl'
.set
  display inline-block
  padding vw(14)
  color $next-text-color
  font-size 13px
  line-height 1.5
</style>
