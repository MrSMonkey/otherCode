/*
 * @Description: 房源照片
 * @Author: zhegu
 * @Date: 2019-04-24 15:31:41
 * @Last Modified by: zhegu
 * @Last Modified time: 2019-04-24 16:12:01
 */
<template>
  <section class="house-pic">
    <section class="header">
        <h1>天香 2栋3单元33楼3302号</h1>
        <span>2017-04-17 至 2019-04-16</span>
    </section>
    <p class="title">房源照片（装配前）</p>
    <div class="list">
      <ImagePreview :imgagesArr="imgUrls" :isFold="true" />
    </div>
    <p class="title">房源照片（装配后）</p>
    <div class="list">
      <ImagePreview :imgagesArr="imgUrls" :isFold="true" />
    </div>
    <p class="title">房东合同照片</p>
    <div class="list">
      <ImagePreview :imgagesArr="imgUrls" :isFold="true" />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import ImagePreview from '@/components/ImagePreview.vue';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'OldHousePic',
  components: {
    ImagePreview,
  }
})
export default class OldHousePic extends CommonMixins {
  private imgUrls: any[] = [
    'http://www.youtu9.com/pic/uploadimg/2019-3/201931220263134659.jpg',
    'http://www.youtu9.com/pic/uploadimg/2019-3/201931220263134659.jpg',
    'http://www.youtu9.com/pic/uploadimg/2019-3/201931220263134659.jpg',
    'http://www.youtu9.com/pic/uploadimg/2019-3/201931220263134659.jpg',
    'http://www.youtu9.com/pic/uploadimg/2019-3/201931220263134659.jpg',
  ]; // 照片
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/main.styl'
.house-pic
    padding-bottom vw(20)
    .header
        display flex
        flex-direction column
        justify-content center
        height vw(90)
        background #fff
        padding 0 vw(15)
        h1
            font-size 18px
            color $text-color
            margin-bottom vw(10)
        span
            font-size 12px
            color $next-text-color
    .list
        padding vw(15)
        background-color #fff
        color $text-color
    .title
        color $next-text-color
        font-size 14px
        height vw(35)
        line-height vw(35)
        padding-left vw(15)
</style>
