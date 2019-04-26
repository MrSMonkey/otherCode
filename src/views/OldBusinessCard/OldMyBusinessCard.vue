/*
 * @Description: 星空财神 - 我的名片
 * @Author: LongWei
 * @Date: 2019-04-23 15:46:54
 * @Last Modified by: LongWei
 * @Last Modified time: 2019-04-25 15:05:23
 */

<template>
  <section class="my-card-main">
    <div class="my-card">
      <div class="card-box" v-for="(card, index) in myCardImg" :key="index" >
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
      </van-image-preview>
    </div>
    <div class="shot-box" id="card1" ref="card1">
      <div class="shot-text">
        <p>
          我是{{userName}}
        </p>
        <p>我为星空业主代言</p>
      </div>
      <div class="shot-avatar">
        <img crossorigin="anonymous" :src="userLogoUrl" id="userLogo"   alt="user avatar" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import {START_MYCARD_IMG} from '@/config/config';
import html2canvas from 'html2canvas';
import { config } from '@vue/test-utils';
import { ImagePreview } from 'vant';
Vue.use(ImagePreview);

const api = {
  userInfo: '/partner/star/owner/get_wechat_user_info/', // 无需登录
};
// 声明引入的组件
@Component({
  name: 'OldMyBusinessCard',
})
// 类方式声明当前组件
export default class OldMyBusinessCard extends CommonMixins {
  public $refs: {
    [x: string]: any
  };

  private bodyLoading: boolean = true;
  private myCardImg: any[] = START_MYCARD_IMG;
  private myCardImgPre: any[] = [];
  private index: number = 1;
  private show: boolean = false;
  private userName: string = '哈哈哈哈';
  private userLogoUrl: string = require('@/assets/images/boy.png');

  private created() {
    // 111
    // this.getImage(this.userLogoUrl, 'userLogo');
    this.getUserInfo();
    // console.log(this.$store.state);
  }

  private mounted() {
    this.getCanvas();
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
  }

  // 转换 - canvas
  private async getCanvas() {
    await this.getImage(this.userLogoUrl, 'userLogo');
  }

   // 获取 - 微信账号基本信息
  private async getUserInfo() {
    try {
      const openId = this.$store.state.global.wxOAuth.openId;
      const accessToken = this.$store.state.global.wxOAuth.accessToken;
      const {data} = await this.axios.get(`${api.userInfo + openId}/${accessToken}`);
      console.log(data, '用户微信信息');
      if (data.code === '000') {
        this.userName = data.data.nickName;
        this.userLogoUrl = data.data.headImgUrl;
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }

  private  getCanvasDom() {
    html2canvas(document.querySelector('#card1'), { useCORS: true }).then(async (canvas: any) => {
     await this.onTransformEnd(canvas);
     this.$toast.clear();
    });
  }

  // 转成 - blob文件
  private getImage(url: string, imgId: string) {
    const that = this;
    const xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'blob';
    xhr.onload = function() {
        if (this.status === 200) {
          const imgDom: any = document.getElementById(imgId);
          imgDom.src =  URL.createObjectURL(this.response);
          console.log(imgDom.src, '222222');
          that.getCanvasDom();
        }
    };
    xhr.send();
  }

  // 图片- 预览
  private showImagePreview(position: any): void {
    const images: any[] = this.myCardImg.map((item: any) => {
      return `${item.src}`;
    });
    this.myCardImgPre = images;
    this.show = true;
    this.index = position;
  }

  private onTransformEnd(canvas: any) {
    console.log(canvas);
    let canvasUrl;
    try {
      canvasUrl = canvas.toDataURL('image/jpg');
    } catch (e) {
      alert(e.message);
    }

    this.myCardImg.splice(0, 1, {
      alt: '名片1',
      src: canvasUrl
    });
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

.my-card-main
  height 100%
  width 100%
  overflow hidden
  .my-card
    background-color $bg-color-default
    width 100%
    height 100%
    padding vw(15) 0 vw(15) vw(15)
    .card-box
      position relative
      width vw(105)
      margin-right vw(15)
      float left
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
      margin-bottom vw(15)
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
  .shot-box 
    position relative
    width vw(375)
    height vw(667)
    background-image url('../../assets/images/card_1_container.jpg')
    position relative
    background-size cover
    background-repeat no-repeat
    margin-top 2000px
  .shot-text 
    position absolute
    color #fff
    font-size vw(25)
    text-align right
    width 100%
    right vw(58)
    top vw(66)
  .shot-avatar 
    width vw(140)
    height vw(140)
    border-radius 50%
    overflow hidden
    text-align center
    line-height 0
    position absolute
    top vw(185)
    left 50%
    transform translateX(-50%)
    img
      width 100%
      height 100%
      vertical-align middle
  
</style>
