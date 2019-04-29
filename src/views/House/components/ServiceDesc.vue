/*
 * @Description: linyu
 * @Author: linyu
 * @Date: 2019-04-28 14:23:31
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-28 15:16:39
 */

<template>
  <section class="service-desc">
    <div class="info-header">
      <span>{{serviceDescData.title}}</span>
      <span>{{serviceDescData.titleDesc}}</span>
    </div>
    <ul class="info-body">
      <li v-for="(item, index) in serviceDescData.questions" :key="index">
        <h4>{{item.question}}</h4>
        <p>{{item.answer}}</p>
      </li>
    </ul>
    <div class="info-footer" v-if="serviceDescData.linkText">
      <span>{{serviceDescData.title}}</span>
      <span>
        <img :src="require('@/assets/images/icon/icon_arrow2.png')"/>
        <img :src="require('@/assets/images/icon/icon_arrow2.png')"/>
      </span>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  @Component({
    name: 'ServiceDesc'
  })
  export default class ServiceDesc extends Vue {
    @Prop({
      type: Object,
      default: {}
    })
    private serviceDescData: any;
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.info-plant
  margin vw(20) 0 vw(20)
  padding 0 vw(20)
  .info-panel
    background-color: $global-background;
    border-radius 8px/* no */
    margin-bottom 10px
  .top-panel
    .info-header
      width 100%
      padding 13px 15px
      background $main-color
      background -ms-linear-gradient(left ,$main-color 0%, $color-main-light 100%)
      background -webkit-linear-gradient(left ,$main-color 0%, $color-main-light 100%)
      font-family PingFangSC-Semibold
      color #FFFFFF
      display flex
      justify-content flex-start
      align-items flex-end
      span:first-child
        font-size vw(21)
        font-weight 600
      span:last-child
        font-size vw(14)
        margin-left vw(15)
    .info-body
      padding vw(20)
      border-radius 8px/* no */
      li
        &:first-child
          margin-bottom 10px
        h4
          font-size 15px; /* no */
          line-height 40px
        p
          color $next-text-color
          font-size 13px /* no */
          line-height 18px
          letter-spacing 1px /* no */
    .info-footer
      padding: 0 vw(20)
      border-top 1px solid $bg-color-default /* no */  
      display flex
      justify-content: space-between
      align-items center
      span
        color: $main-color
        font-size 15px /* no */
        font-weight 600
        line-height 44px
        img
          display inline-block
          height 14px
          &:first-child
            opacity 0.2
            margin-right -2px
          &:last-child
            opacity 0.5
  .table-panel
    padding 10px 15px  
</style>
