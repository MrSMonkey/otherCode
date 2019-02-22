/*
 * @Description: 房间配置信息
 * @Author: chenmo
 * @Date: 2019-02-19 11:12:50
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-19 12:02:50
 */
/*


<template>
  <section class="room-info">
    <section class="room-item" v-for="room in roomInfo" :key="room.Id">
      <div class="item-tit">
        <h2>{{room.roomType ? '' : '房间'}}{{room.roomName || ''}}</h2>
        <!-- <i v-if ="room.rentStatus"></i> -->
      </div>
      <p class="item-desc">
        {{room.area || '？'}}㎡<i> | </i>
        {{getToward(room.toward)}}
      </p>
      <p class="item-desc">
        房间配置：{{room.roomConfigNum || 0}} <i></i> {{room.houseConfigNum ? `| 公区配置：${room.houseConfigNum}` : ''}}
      </p>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop  } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { getQueryString } from '@/utils/utils';
import { TOWARDNAME } from '@/config/config';

// 声明引入的组件
@Component({
  name: 'RoomInfo',
})
// 类方式声明当前组件
export default class Login extends CommonMixins {
  @Prop({ type: Array, default: () => [] })
  private roomInfo: any;

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
.room-item
  padding vw(15)
  margin-bottom vw(10)
  background #fff
  border-top 1px solid #eaeaea
  .item-tit 
    h2 
      margin-right 10px
      font-size:16px /* no */
      line-height 47px
      display inline-block
      color $text-color
    i
      padding 2px 10px
      margin-right 10px
      background-color: #fff
      color $color-white
      font-size 10px /* no */
      font-style normal
      vertical-align middle
  .item-desc
    margin-bottom: 10px
    font-size 15px /* no */
    color $next-text-color
</style>
