/*
 * @Description: 星空财神 - 我的名片
 * @Author: LongWei
 * @Date: 2019-04-23 15:46:54
 * @Last Modified by: LongWei
 * @Last Modified time: 2019-04-24 17:37:37
 */

<template>
  <section class="my-card">
    <div class="card-box" v-for="(card, index) in myCardImg" :key="index" >
      <!-- <div class="card-msg" v-if="index === 0">
        <div class="shot-text">
          <p>
            我是
            {{ userName }}
          </p>
          <p>我为星空业主代言</p>
        </div>
        <div class="shot-avatar">
          <img :src="userLogoUrl" alt="user avatar" />
        </div>
      </div> -->
      <div class="card-img">
        <img :src="card.src" :alt="card.alt"  />
      </div>
      <p class="card-title">{{card.alt}}</p>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import {START_MYCARD_IMG} from '@/config/config';


// 声明引入的组件
@Component({
  name: 'OldMyBusinessCard',
})
// 类方式声明当前组件
export default class OldMyBusinessCard extends CommonMixins {
  private myCardImg: any[] = START_MYCARD_IMG;
  private userName: string = '哈哈哈哈';
  private userLogoUrl: string = 'https://826327700.github.io/vue-photo-preview/demo/1.jpg';
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

.my-card
  background-color $bg-color-default
  width 100%
  height 100%
  padding vw(15)
  display -webkit-flex
  display flex
  flex-wrap wrap
  justify-content space-between
  .card-box
    overflow hidden
    height vw(277)
    position relative
    .card-msg
      width vw(105)
      height vw(186)
      position absolute
      .shot-text 
        position absolute
        color #fff
        font-size vw(1)
        text-align right
        width 100%
        // right vw(58)
        // top vw(69)
      .shot-avatar 
        width vw(30)
        height vw(30)
        border-radius 50%
        overflow hidden
        text-align center
        line-height 0
        position absolute
        // top 369px
        // left 50%
        transform: translateX(-50%)
        img 
          width 100%
          height 100%
          vertical-align middle
    .card-img
      width vw(105)
      height vw(186)
      img
        width 100%
        height 100%
  .card-title
    font-family PingFang-SC-Medium
    font-size vw(15)
    color $text-color
    letter-spacing 0
    margin-top vw(5)

</style>
