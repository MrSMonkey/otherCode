/*
 * @Description: 两侧带横线的标题组件
 * @Author: chenmo
 * @Date: 2019-02-15 10:27:12
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-15 11:15:42
 */

<template>
  <section class="hr-title" ref="header">
    <span class="line"></span>
    <h2 class="content">
      {{title}}
      <span>{{dec}}</span>
    </h2>
    <span class="line"></span>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'HrTitle',
})
export default class HrTitle extends Vue {
  @Prop({ type: String, default: 'Title' })
  private title: string;
  @Prop({ type: String, default: '' })
  private dec: string;
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/index.styl'

.hr-title
  width 100%
  height 36px
  text-align center
  display flex
  justify-content: space-between
  align-items center
  padding 0 vw(20)
  .content
    font-size 16px
    color $text-color
    span {
      display block
      font-size 12px
      font-weight lighter
      color $next-text-color
    }
  .line 
    display  inline-block
    width vw(80)
    border-top 1px solid $disabled-color
</style>
