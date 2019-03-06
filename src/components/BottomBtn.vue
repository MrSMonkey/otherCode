/*
 * @Description 底部按钮
 * @Author: QingTong 
 * @Date: 2018-11-27 11:15:10 
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-20 11:49:57
 */
<template>
  <div class="bottom-btn">
    <router-link :to="'/serviceOrder?entrustId=' + entrustId" class="btn-order">
      <img src="../assets/images/icon/icon_detail.png" alt="" class="order-icon"/>
      <p>查看订单</p>
    </router-link>
    <router-link :to="'/purchase?cityId=' + cityId + '&entrustId=' + entrustId" class="btn">
      购买服务
    </router-link>
    <router-link :to="'/serviceType?entrustId=' + entrustId" class="btn">
      发起服务
    </router-link>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  @Component({
    name: 'BottomBtn'
  })
  export default class BottomBtn extends Vue {
    @Prop({ type: String, default: '' })
    private cityId: string;

    @Prop({ type: String, default: '' })
    private entrustId: string;
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../assets/stylus/main.styl'
  .uk-icon-sm
    width vw(23)
    height vw(23)
    display block
    margin vw(6) auto vw(2) auto
    background-size cover
    background-repeat no-repeat
  .bottom-btn
    position fixed
    bottom 0
    left 0
    width 100%
    height vw(54)
    color #fff
    font-size vw(14)
    z-index 999
    background #fff
    cursor pointer
    display -webkit-flex
    display flex
    justify-content space-around
    align-items center
    .btn-order
      text-align center
      p
        color $main-color
        font-size 12px
      .order-icon
        width 20px
        height 20px
        vertical-align middle
        display inline-block
        margin-top -1px
        margin-right 2px
    a
      color #5d656b
    .btn
      background $main-color
      color #fff
      padding vw(10) vw(20)
      border-radius 4px
</style>