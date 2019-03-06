<!--
 * @Description: 底部确认按钮
 * @Author: chenmo
 * @LastEditors: chenmo
 * @Date: 2019-02-28 13:56:48
 * @LastEditTime: 2019-03-04 16:15:02
 -->

<template>
  <section class="plot-footer">
    <van-button size="normal" type="default" @click="plotCancel">{{cancelText}}</van-button>
    <van-button size="normal" type="default"  @click="confirm" :loading="loading" v-if="isActiveKey" :loading-text="loadingText" class="plot-active">
      <slot name="confirm"></slot>
    </van-button>
    <van-button size="normal" type="default" :url="url" v-else><slot name="confirm"></slot></van-button>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';

@Component({
  name: 'ConfirmBtn'
})
export default class ConfirmBtn extends Vue {
  @Prop({type: Boolean, default: false})
  private loading: boolean;

  @Prop({type: Boolean, default: false})
  private isActive: boolean;

  @Prop({ type: String, default: '' })
  private url: string;

  @Prop({ type: String, default: '加载中' })
  private loadingText: string;

  @Prop({ type: String, default: '取消' })
  private cancelText: string;

  @Prop({ type: String, default: '确认' })
  private confirmText: string;

  private isActiveKey: boolean = false;

  private mounted() {
    this.isActiveKey = this.isActive;
  }

  @Emit('confirm')
  private confirm() {
    return;
  }

  @Emit('plotCancel')
  private plotCancel() {
    return;
  }

  @Watch('isActive')
  private handlerisActive(newVal: boolean) {
    this.isActiveKey = newVal;
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
.plot-footer
  position absolute
  bottom 0
  left 0
  display -webkit-flex
  display flex
  justify-content space-between
  width 100%
  height vw(46)
  align-items center
  z-index 1000
  button
    display inline-block
    width 100%
    font-size 14px
    text-align center
    height 100%
    border-radius 0
    &:nth-child(1)
      background #fff
      color $main-color
      border 1px solid #fff
    &:nth-child(2)
      background $disabled-color
      color #fff
      border 1px solid $disabled-color
  .plot-active
    background $main-color !important
    border 1px solid $main-color !important
</style>