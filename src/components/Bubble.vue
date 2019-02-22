/*
 * @Description 顶部title
 * @Author: QingTong 
 * @Date: 2018-11-27 11:15:58 
 * @Last Modified by:   QingTong 
 * @Last Modified time: 2018-11-27 11:15:58 
 */
<template>
  <div class="top-title">
    {{title}}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class Bubble extends Vue {
  @Prop({ type: String, default: 'Title' })
  private title: string;
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../assets/stylus/main.styl'
  .top-title
    height vw(50)
    line-height vw(50)
    text-align center
    font-size vw(15)
    color #474747
    border-top 1px solid #f5f5f5
    border-bottom 1px solid #f5f5f5
    background #fff
    font-weight 600
</style>