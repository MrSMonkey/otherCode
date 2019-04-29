/*
 * @Description: 多个房屋估价结果展示组件
 * @Author: linyu
 * @Date: 2019-04-25 13:48:33
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-25 13:50:25
 */

<template>
  <section class="loading-panel">
    <div class="loading-img">
      <img :src="imgUrl" alt="loading">
    </div>
    <div class="tip-text-panel">
      <span>估价师正在精确计算中…</span>
    </div>
    <div class="refresh-panel">
      <van-button class="refresh-btn" @click="refresh">刷新</van-button>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Emit} from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Button } from 'vant';

// 声明引入的组件
@Component({
  name: 'AppraiseLoading',
  components: {
    [Button.name]: Button
  }
})

// 类方式声明当前组件
export default class AppraiseLoading extends CommonMixins {
  private imgUrl: string = require('@/assets/images/illustration_blank.png');

  /**
   * @description 刷新按钮触发事件
   * @returns void
   * @author linyu
   */
  @Emit()
  private refresh() {
    return;
  }
}
</script>



<style lang="stylus" rel="stylesheet/stylus" scoped>
  .loading-panel
    height 100%
    display flex
    flex-direction column
    align-items center
    justify-content center
    &>div
      text-align center
    .loading-img
      margin-top vw(-200)
      img
        width  vw(170)
        max-width 100px
    .tip-text-panel
      color $text-color
      font-size 15px
      margin 15px 0
    .refresh-panel
      .refresh-btn
        font-size 15px
        background $main-color
        color #ffffff
        width vw(90)
        border-radius 5px
</style>

