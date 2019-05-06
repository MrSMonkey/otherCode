<!--
  /*
  * @Description: 首页
  * @Author: chenmo
  * @Date: 2018-09-17 17:20:01
 * @Last Modified by: LongWei
 * @Last Modified time: 2019-05-06 15:55:15
  */
-->

<template>
  <section class="home">
    <main class="home-comp_list">
      <!-- <section class="header-img">
        <img src="@/assets/images/home_bg.png" alt=""/>
        <div class="home-msg">
          <p class="asset-title">星空业主总资产（元）</p>
          <p class="asset-num">
            {{TotalAmount ? TotalAmount : '0'}}
          </p>
          <p class="house-title">当月新增资产</p>
          <p class="house-num">
           {{MonthTotalAmount ? MonthTotalAmount : '0'}}
          </p>
        </div>
        <div class="home-logoInfo">
           <div class="home-logo">
            <img src="@/assets/images/starhome_yezhu.png" alt="" v-if="!userLogoUrl"/>
            <img :src="userLogoUrl" alt="" v-else/>
          </div>
          <span>{{ nikeName ? nikeName : '星空房东'}}</span>
        </div>
      </section> -->
      <hr-title title="星空产品服务群"></hr-title>
      <section class="star-home">
        <img v-for="img in startHomeImg" :key="img.alt" alt="img.alt" :src="img.src"/>
      </section>
      <hr-title title="优客逸家" dec="连续四年最具影响力品牌"></hr-title>
      <UokoDetailPlant>
        <a href="tel:10105288">
          <div class="call-number">
            <span>1010-5288</span>
            <img  src="@/assets/images/icon/icon_call.png" alt="电话"/>
          </div>
        </a>
      </UokoDetailPlant>
      <hr-title title="智能硬件"></hr-title>
      <section class="smart-lock">
          <h3>UOKO | 智能门锁</h3>
          <p class="lock-dec">
            星空业主尊享
            <span>200元</span>
            优惠
          </p>
          <p class="lock-price">
            <i>￥</i>
            1299
            <span>￥1499</span>
          </p>
          <a :href="link">
            <button type="button">优惠购买</button>
          </a>
          <p class="lock-footer">
            高端精致 | 性能卓越 | 工艺精良 | 安全可靠 | 实用主义
          </p>
      </section>
    </main>
    <van-dialog
      v-model="show"
      title="版本更新记录"
      class="dialog"
    >
    <time-line :timeLineData="timeLineData"></time-line>
    </van-dialog>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Icon, Dialog } from 'vant';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import HrTitle from '@/components/HrTitle.vue';
import UokoDetailPlant from '@/components/UokoDetailPlant.vue';
import TimeLine from '@/components/TimeLine.vue';
import timeLineData from '../../../data/versions';
import {START_HOME_IMG, SMART_LOCK_LINK} from '@/config/config';
import api from '@/api';

const namespace: string = 'global';

// 声明引入的组件
@Component({
  name: 'Home',
  components: {
    [Icon.name]: Icon,
    HrTitle,
    UokoDetailPlant,
    TimeLine
  }
})
// 类方式声明当前组件
export default class Home extends CommonMixins {
  private startHomeImg: any[] = START_HOME_IMG;
  private link: string = SMART_LOCK_LINK;
  private show: boolean = false;
  private timeLineData: any = timeLineData;
  private TotalAmount: number = 0; // 业主总资产
  private MonthTotalAmount: number = 0; // 当月新增资产
  private nikeName: string = ''; // 房东姓名
  private userLogoUrl: string = ''; // 房东头像
  @State('version') private version: string;
  @Getter('getWxOAuth', { namespace }) private wxOAuth: any;

  private mounted() {
    // this.getUserInfo();
    // this.getUserAccountInfo();
  }

  // 获取 - 微信账号基本信息
  private async getUserInfo() {
    try {
      const openId = this.wxOAuth.openId || 'oI4Vdw5WOPIPSLMOrgvuLmnw61dM';
      const accessToken = this.wxOAuth.accessToken || '21_nzg6OHk2pP0tsWvfeezLcUblVafEKOf3M5528_YDn5PKFt7Pr4sZNKk6fkokiaMqDpFPKZwaytpr9mHGM80U0w';
      const res: any = await this.axios.get(`${api.getWXUserInfo}/${openId}/${accessToken}`);
      if (res.code === '000') {
        const data = res.data;
        this.nikeName = data.nickName;
        this.userLogoUrl = data.headImgUrl;
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }

  // 获取 - 房东累计收入
  private async getUserAccountInfo() {
    try {
      const res: any = await this.axios.get(`${api.getHousecount}`);
      if (res.code === '000') {
        const data = res.data;
        this.TotalAmount = data && data.totalAmount;
        this.MonthTotalAmount = data && data.monthTotalAmount;
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/main.styl'

.home
  .header-img
    position relative
    img 
      display inline-block
      width 100%
    .home-msg
      position relative
      height auto
      top vw(-150)
      z-index 1000
      color $border-color-light
      p
        position absolute
        left vw(30)
        letter-spacing 1px /* no */
      .asset-title 
        top vw(-6)
        font-size 12px /* no */
      .asset-num 
        top vw(20)
        font-size 32px /* no */
        font-weight lighter
      .house-title 
        top vw(70)
        font-size 12px /* no */
      .house-num 
        top vw(90)
        font-size 12px /* no */
    .home-logoInfo
      position absolute
      right vw(60)
      bottom vw(40)
      .home-logo
        width vw(38)
        height vw(38)
        border-radius 50%
        overflow hidden
        text-align center
        transform translateX(-50%)
        position relative
        top vw(10)
        img
          width 100%
          height 100%
          vertical-align middle 
      span 
        position relative
        top vw(-19)
        left vw(28)
        z-index 10000
        font-size 12px
        color $border-color-light
  .star-home
    padding vw(20)
    display flex
    flex-wrap wrap
    justify-content space-between
    img 
      margin-bottom 10px
      width vw(162)
      height 100px
      vertical-align bottom
  .smart-lock
    background-image url('../../assets/images/ad_bg.png');
    background-repeat no-repeat
    background-size cover
    background-position center
    width 100%
    height 595px
    margin-top vw(20)
    color #fff
    text-align: center;
    position relative
    h3
      font-size 28px /* no */
      line-height 60px
      background-image -webkit-gradient(
        linear,
        0 0,
        0 bottom,
        from(rgba(255, 255, 255, 1)),
        to(rgba(255, 255, 255, 0.2))
      )
      -webkit-background-clip text
      -webkit-text-fill-color transparent
    button
      width 100px
      height 30px
      margin vw(10) 0
      color #b8b8b8
      background-color transparent
      border 1px solid /* no */
      font-size 14px /* no */
    .lock-dec
      margin-top 10px
      color $color-gray-light
      font-size 12px /* no */
      font-weight lighter
      span
        color #fff
    .lock-price
      font-size 30px /* no */
      i
        position relative
        left 4px /* no */
        font-style normal
      span
        font-size 12px /* no */
        color $color-gray-light
        text-decoration line-through
    .lock-footer
      position: absolute
      left 50%
      bottom vw(10)
      width 100%
      font-size 10px /* no */
      color $next-text-color
      transform translateX(-50%)
  .dialog
    .van-dialog__header
      padding-top 15px !important
    .van-dialog__confirm, .van-dialog__confirm:active
      color $main-color
</style>
