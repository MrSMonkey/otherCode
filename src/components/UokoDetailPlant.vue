<!--
/*
 * @Description 房源类型说明组件
 * @Author: chemo 
 * @Date: 2018-11-27 11:18:16 
 * @Last Modified by: chemo
 * @Last Modified time: 2019-01-23 11:43:12
 */
-->
<template>
 <section class="info-plant">
      <div class="info-header">
        <img class="logo" src="../assets/images/uoko.png" alt="优客逸家"/>
        <img class="right-icon" src="../assets/images/icon/arrow.png" alt="right"/>
      </div>
      <div class="info-body">
        <h4>房源类型&委托服务</h4>
        <p>
          如果您有一套毛坯、老旧、简单装修的房子<br/>
          准备自持几年后售卖增值<br/>
          或一直出租收取令人愉快的租金<br/>
          最省心、简单的变现方式<br/>
          就是交给优客逸家<br/>
        </p>
      </div>
      <div class="info-footer">
        <slot></slot>
      </div>
    </section>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  @Component({
    name: 'UokoDetailPlant'
  })
  export default class UokoDetailPlant extends Vue {
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../assets/stylus/main.styl'
  .info-plant
    margin vw(20) 0 vw(20)
    padding 0 vw(20)
    .info-header
      width 100%
      padding 13px 15px
      border-radius 8px 8px 0 0 /* no */
      background $main-color
      background: -ms-linear-gradient(left ,$main-color 0%, $color-main-light 100%);
      background: -webkit-linear-gradient(left ,$main-color 0%, $color-main-light 100%);
      display flex
      justify-content space-between
      align-items center
      .logo
        display inline-block
        width 76px
        height 48px
      .right-icon
        display inline-block
        width 16px
    .info-body
      padding vw(20)
      background-color: $global-background
      h4
        font-size 16px; /* no */
        line-height 42px
      p
        margin-top 4px
        color $next-text-color
        font-size 13px /* no */
        line-height 18px
        letter-spacing 1px /* no */
    .info-footer
      padding: 0 vw(20)
      background-color: $global-background;
      border-top 1px solid $bg-color-default /* no */  
      border-radius 0 0 8px 8px /* no */
      .call-number
        color: $main-color
        font-size 15px /* no */
        line-height 44px
        display flex
        justify-content: space-between
        align-items center
        img
          display inline-block
          width 24px
</style>