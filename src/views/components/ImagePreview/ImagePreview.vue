/*
 * @Description: 图片预览组件
 * @Author: chenmo
 * @Date: 2019-02-19 14:43:28
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-19 16:02:51
 */

<template>
  <section class="imgView">
    <div>
      <div>
        <ul class="viewImg">
          <li><div class="img-box" v-for="(img, index) in imgagesArr" :key="index" v-lazy:background-image="img+'?imageView2/1/w/100/h/100'" @click="showImagePreview(index)"></div></li>
        </ul>
      </div>
    </div>
    
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop  } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { ImagePreview } from 'vant';

const images: string[] = [
  require('../../../assets/images/ccc.jpg'),
  'https://img.yzcdn.cn/upload_files/2017/03/14/FmTPs0SeyQaAOSK1rRe1sL8RcwSY.jpeg',
  'https://img.yzcdn.cn/upload_files/2017/03/15/FvexrWlG_WxtCE9Omo5l27n_mAG_.jpeg',
  'https://img.yzcdn.cn/upload_files/2017/03/14/FmTPs0SeyQaAOSK1rRe1sL8RcwSY.jpeg'
];
// 声明引入的组件
@Component({
  name: 'ImagePreview'
})
// 类方式声明当前组件
export default class ImagePreviewPage extends CommonMixins {
  @Prop({ type: Array, default: () => [] })
  private imgagesArr: any;
  // private imagesA: any[] = images;
  /**
   * @description 预览图片
   * @params position 位置
   * @timer timer
   * @returns void
   * @author chenmo
   */
  private showImagePreview(position: any, timer: any): void {
    const images: any[] = this.imgagesArr;
    const instance = ImagePreview({
      images,
      startPosition: typeof position === 'number' ? position : 0,
      lazyLoad: true
    });

    if (timer) {
      setTimeout(() => {
        instance.close();
      }, timer);
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../assets/stylus/main.styl'
.imgView
  background $global-background
  padding vw(20) 0 vw(20) vw(20)
  height 140px
  width 100%
  float left
  .viewImg
    display -webkit-flex
    display flex
    padding 0
    overflow-x auto
    li
      padding-right 2px
      flex-shrink 0
      list-style none
      vertical-align middle
      overflow hidden 
      position relative
    &::-webkit-scrollbar
      display none
    .img-box
      display inline-block
      width 100px
      height 100px
      background-repeat no-repeat
      background-size cover
      background-position center center
      margin-right vw(10)
</style>
