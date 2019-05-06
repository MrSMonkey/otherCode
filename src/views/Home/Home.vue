<!--
  /*
  * @Description: 首页
  * @Author: chenmo
  * @Date: 2018-09-17 17:20:01
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-04-11 14:47:15
  */
-->

<template>
  <section class="home">
    <main class="home-comp_list">
      <section class="header-img">
        <img src="@/assets/images/home_bg.png" alt=""/>
      </section>
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
  @State('version') private version: string;

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/main.styl'

.home
  .header-img
    img 
      display inline-block
      width 100%
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
