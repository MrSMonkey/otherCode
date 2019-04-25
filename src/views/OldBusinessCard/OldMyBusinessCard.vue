/*
 * @Description: 星空财神 - 我的名片
 * @Author: LongWei
 * @Date: 2019-04-23 15:46:54
 * @Last Modified by: LongWei
 * @Last Modified time: 2019-04-25 11:56:28
 */

<template>
  <section class="my-card">
    <div class="card-box" v-for="(card, index) in myCardImg" :key="index" >
      <!-- <div class="card-msg" v-if="index === 0">
        <div class="shot-text">
          <p>
            我是
            {{ userName }}
          </p>
          <p>我为星空业主代言</p>
        </div>
        <div class="shot-avatar">
          <img :src="userLogoUrl" alt="user avatar" />
        </div>
      </div> -->
      <div class="card-img">
        <img :src="card.src"  :alt="card.alt" @click="showImagePreview(index)" />
      </div>
      <p class="card-title">{{card.alt}}</p>
    </div>
    <van-image-preview
      v-model="show"
      :images="myCardImgPre"
      :startPosition="index"
    >
      <template v-slot:index>第{{ index }}页</template>
    </van-image-preview>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import {START_MYCARD_IMG} from '@/config/config';
import { ImagePreview } from 'vant';
import html2canvas from 'html2canvas';

Vue.use(ImagePreview);


// 声明引入的组件
@Component({
  name: 'OldMyBusinessCard',
})
// 类方式声明当前组件
export default class OldMyBusinessCard extends CommonMixins {
  private myCardImg: any[] = START_MYCARD_IMG;
  private myCardImgPre: any[] = [];
  private index: number = 1;
  private show: boolean = false;
  private userName: string = '哈哈哈哈';
  private userLogoUrl: string = 'https://826327700.github.io/vue-photo-preview/demo/1.jpg';

  // 图片- 预览
  private showImagePreview(position: any, timer: any): void {
    const images: any[] = this.myCardImg.map((item: any) => {
      return `${item.src}?imageView2/2/w/320`;
    });
    this.myCardImgPre = images;
    this.show = true;
    this.index = position;
  }

  // 获取 - blob对象
  private getBlob(canvas: any) {
    let data = canvas.toDataURL('image/jpeg', 1);
    data = data.split(',')[1];
    data = window.atob(data);
    const ia = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
      ia[i] = data.charCodeAt(i);
    }
    return new Blob([ia], {
      type: 'image/jpeg'
    });
  }

  // 生成 - 图片
  private setImage() {
    const that = this;
    if (event) {
       event.preventDefault();
    }
    const canvas2 = document.createElement('canvas');
    const canvasDiv: any = document.getElementById('newImg');
    const w = Number(window.getComputedStyle(canvasDiv).width);
    const h = Number(window.getComputedStyle(canvasDiv).height);

    // 将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
    canvas2.width = w * 2;
    canvas2.height = h * 2;
    canvas2.style.width = w + 'px';
    canvas2.style.height = h + 'px';
    // 可以按照自己的需求，对context的参数修改,translate指的是偏移量
    //  var context = canvas.getContext("2d");
    //  context.translate(0,0);
    const context = canvas2.getContext('2d');
    if (context) {
      context.scale(2, 2);
    }
    html2canvas(document.getElementById('newImg'), {
      canvas: canvas2
    }).then((canvas: any) => {
      const blob = that.getBlob(canvas);
      const oMyForm = new FormData();
      const fileName = 'mobile' + '.jpg';
      oMyForm.append('file', blob, fileName);
      // oMyForm.append("fileName", fileName);
      oMyForm.append('fileType', 'image');
      oMyForm.append('user_id', that.global.company.id);
      that.uploadFile(that.global.ossservice + '/oss/uploadorgFile', oMyForm).then((res: any) => {
        if (res.data.errorCode !== '00') {
          that.$message.error(res.data.errorMsg);
          return;
        }
        return res.data.sprbody.urlAddress;
      });

    });
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

.my-card
  background-color $bg-color-default
  width 100%
  height 100%
  padding vw(15)
  display -webkit-flex
  display flex
  flex-wrap wrap
  justify-content space-between
  .red 
    position relative
    z-index 100000
    color #f00
  .card-box
    overflow hidden
    height vw(277)
    position relative
    .card-msg
      width vw(105)
      height vw(186)
      position absolute
      .shot-text 
        position absolute
        color #fff
        font-size vw(1)
        text-align right
        width 100%
        // right vw(58)
        // top vw(69)
      .shot-avatar 
        width vw(30)
        height vw(30)
        border-radius 50%
        overflow hidden
        text-align center
        line-height 0
        position absolute
        // top 369px
        // left 50%
        transform: translateX(-50%)
        img 
          width 100%
          height 100%
          vertical-align middle
    .card-img
      width vw(105)
      height vw(186)
      img
        width 100%
        height 100%
  .card-title
    font-family PingFang-SC-Medium
    font-size vw(15)
    color $text-color
    letter-spacing 0
    margin-top vw(5)
  .van-swipe__track
    ::before
      content '长按图片保存'
      position absolute
      bottom 0
      width 100%
      background-color rgba(0, 0, 0, 0.2)
      color #fff
      font-size 15px
      line-height vw(30)
      text-align center 
      z-index 3000
  .van-image-preview__index
    -z-index 3000

</style>
