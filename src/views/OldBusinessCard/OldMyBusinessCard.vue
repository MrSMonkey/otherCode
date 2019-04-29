/*
 * @Description: 星空财神 - 我的名片
 * @Author: LongWei
 * @Date: 2019-04-23 15:46:54
 * @Last Modified by: LongWei
 * @Last Modified time: 2019-04-29 11:19:44
 */

<template>
  <section class="my-card-main">
    <img crossOrigin="anonymous" :src="userLogoUrl" id="userLogo"   alt="user avatar" />
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
        <img crossOrigin="anonymous" :src="userLogoUrl" id="userLogo"   alt="user avatar" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import {START_MYCARD_IMG} from '@/config/config';
import html2canvas from 'html2canvas';
import { config } from '@vue/test-utils';
import { ImagePreview } from 'vant';
import api from '@/api';
import { State, Getter, Mutation, Action } from 'vuex-class';
Vue.use(ImagePreview);

const namespace: string = 'global';


// 声明引入的组件
@Component({
  name: 'OldMyBusinessCard',
})
// 类方式声明当前组件
export default class OldMyBusinessCard extends CommonMixins {
  public $refs: {
    [x: string]: any
  };
  @Getter('getWxOAuth', { namespace }) private wxOAuth: any;

  private bodyLoading: boolean = true;
  private myCardImg: any[] = START_MYCARD_IMG;
  private myCardImgPre: any[] = [];
  private index: number = 1;
  private show: boolean = false;
  private userName: string = '';
  private userLogoUrl: string = '';
  @Watch('userLogoUrl')
  private search(): void {
    if (this.userLogoUrl) {
      this.getCanvasDom();
    }
  }

  private  mounted() {
    this.getUserInfo();
    // this.getCanvasDom();
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
  }

  // 获取 - 微信账号基本信息
  private async getUserInfo() {
    try {
      const openId = this.wxOAuth.openId || 'oI4Vdw5WOPIPSLMOrgvuLmnw61dM';
      const accessToken = this.wxOAuth.accessToken || '21_nzg6OHk2pP0tsWvfeezLcUblVafEKOf3M5528_YDn5PKFt7Pr4sZNKk6fkokiaMqDpFPKZwaytpr9mHGM80U0w';
      const res: any = await this.axios.get(`${api.getWXUserInfo}/${openId}/${accessToken}`);
      if (res.code === '000') {
        const data = res.data;
        console.log(data);
        this.userName = data.nickName;
        this.userLogoUrl = 'data:image/jpeg;base64,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';
        console.log(this.userLogoUrl);
        this.$toast.clear();
        this.$nextTick(() => {
          this.getCanvasDom();
        });
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }

  // 转换 - canvas
  private  getCanvasDom() {
    html2canvas(document.getElementById('card1'), { useCORS: true, allowTaint: false  }).then((canvas: any) => {
      this.onTransformEnd(canvas);
      this.$toast.clear();
    });
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
