/*
 * @Description: 用户 - 我的二维码
 * @Author: LongWei
 * @Date: 2019-04-23 15:46:54
 * @Last Modified by: LongWei
 * @Last Modified time: 2019-04-24 16:37:34
 */

<template>
  <section class="qrcode-main">
    <main class="qrcode-view">
      <div class="qrcode-box">
        <img src="@/assets/images/code.jpg" alt="crcode" />
        <p class="desc">长按二维码保存为图片</p>
        <router-link to="/oldMyBusinessCard" class="to-view-bc">
          制作名片
        </router-link>
      </div>
    </main>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';

// 声明引入的组件
@Component({
  name: 'OldMyQRecode',
})
// 类方式声明当前组件
export default class OldMyQRecode extends CommonMixins {
  private crcode: string = '';
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.qrcode-main
  height 100%
  width 100%
  .qrcode-view
    background-repeat no-repeat
    background-size cover
    background-image url('../../assets/images/my_qrcode_bg.jpg')
    width 100%
    height 100%
    overflow hidden
    .qrcode-box 
      width vw(280)
      box-sizing: border-box
      background-color #fff
      border-radius: 16px
      margin auto
      padding vw(35) vw(33) vw(20)
      margin-top vw(120)
      img 
        width vw(215)
        height vw(215)
    .desc 
      font-size 15px /* no */
      color $text-color
      text-align center
    .to-view-bc 
      display block
      width 100%
      height vw(40)
      line-height: vw(40)
      color #fff
      text-align: center
      font-size 16px /* no */
      background #ceb78f
      border-radius 100px
      margin-top vw(14)
</style>
