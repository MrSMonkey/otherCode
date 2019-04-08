<template>
  <div class="fixture">
    <div class="label">装修情况*</div>
    <div class="check">
      <span v-for="(item, index) in houseSetting" :key="index" :class="item.id === active ? 'active' : ''" @click="selectItem(item.id)"> {{item.name}} </span>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';

// 声明引入的组件
@Component({
  name: 'HouseDecorationInfo'
})
// 类方式声明当前组件
export default class HouseDecorationInfo extends CommonMixins {
  private active: number = 1;
  private houseSetting: any[] = [
    {id: 1, name: '已装修'},
    {id: 0, name: '毛坯房'}
  ];

  /**
   * @description 装修信息变更回调事件
   * @returns void
   * @author linyu
   */
  @Emit('on-change')
  private selectItem(id: number) {
    this.active = id;
  }
}
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../assets/stylus/main.styl'
.area
  margin-bottom vw(10)
  .label
    display inline-block
    width 83px
    font-size 15px
    color $text-color
    padding-top vw(18)
    &::after
      content ''
      display inline-block
      width 100%
  .fixture
    background $global-background
    height vw(55)
    padding vw(20)
    border-bottom 1px solid $separate-line-color
    display -webkit-flex
    display flex
    justify-content flex-start
    align-items center
    .check
      border: 1px solid $tip-text-color
      border-radius 4px
      margin-left vw(6)
      span
        display inline-block
        width vw(65)
        height vw(30)
        line-height vw(30)
        text-align center
        font-size 12px
        color $text-color
      .active
        background $main-color
        color #fff
</style>
