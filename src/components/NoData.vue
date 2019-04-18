<!--
  /*
  * @Description: 404
  * @Author: chenmo
  * @Date: 2018-09-17 17:20:01
 * @Last Modified by: zhegu
 * @Last Modified time: 2019-03-20 16:48:13
  */
-->

<template>
  <section class="no-match-page">
    <div class="img">
      <img src="../assets/images/404.png" alt="404"/>
    </div>
    <p>{{tip}}</p>
    <!-- <div v-if="url" class="btn-box">
      <router-link class="inline-btn" :to="url">
        返回上一页
      </router-link>
    </div> -->
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';

// 声明引入的组件
@Component({
  name: 'NoData'
})
export default class NoData extends CommonMixins {
  @Prop({ type: String, default: '' })
  private url: string;

  @Prop({ type: String, default: '' })
  private tip: string;
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
.no-match-page
  text-align center
  padding vw(100) 0
  color #bbb
  .btn-box
    margin-top vw(40)
    a
      background $main-color
      color #fff
      font-size 14px
      padding vw(10) vw(20)
      border-radius 4px
  img
    display inline-block
    width vw(150)
  p
    font-size 15px
    margin-top vw(10)
</style>
