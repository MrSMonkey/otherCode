/*
 * @Description: 星空财神
 * @Author: LongWei
 * @Date: 2019-04-23 15:46:54
 * @Last Modified by: LongWei
 * @Last Modified time: 2019-04-24 14:03:38
 */

<template>
  <section>
    <main class="fortune">
      <div class="god-pic-box">
        <img src="@/assets/images/god.png" alt="星空财神" />
        <div>
          <p>每天早餐该花多少钱？</p>
          <p>每月收入该怎么分配？</p>
        </div>
      </div>
      <p class="words">
        <i class="coin" />
        <span class="text">财富自由第一定律 财神星马上告诉您</span>
        <i class="coin" />
      </p>
      <div class="income-input-box">
        <van-field
          class="income-input"
          v-model="incomeValue"
          type="number"
          placeholder="老板，请填写您的月可支配现金收入" 
          clearable
        />

        <a @click="calcResult"  class="result-btn">
          请财神星掐指一算
        </a>
        </div>
        <div :class="isStopped ? 'anim-box' : 'anim-box show'">
          <Lottie :options="defaultOptions" v-on:animCreated="handleAnimation"  />
        </div>
    </main>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Field, Notify } from 'vant';
import Lottie from 'vue-lottie';
import getWXConfig from '@/config/wxConfig';
import wxShareConfig from '@/config/wxShareConfig';
import * as Anim from '../../assets/json/fortune_anim.json';
import { SHARE_API_LIST, FORTUNE_SHARE_DATA } from '@/config/config';

// 声明引入的组件
@Component({
  name: 'Fortune',
  components: {
    [Field.name]: Field,
    [Notify.name]: Notify,
    Lottie,
  }
})
// 类方式声明当前组件
export default class Fortune extends CommonMixins {
  private incomeValue: string = '';
  private isStopped: boolean = true;
  private defaultOptions: any = { animationData: Anim.default, loop: false, autoplay: false};
  private animationSpeed: number = 1;
  private anim: any = {};
  private shareList: any[] = SHARE_API_LIST;
  private shareData: any = FORTUNE_SHARE_DATA;
  private mounted() {
    this.anim.addEventListener('complete', () => {
      this.anim.stop();
      this.$router.push({
          path: '/oldFortuneResult',
          query: {
            money: this.incomeValue,
          }
        });
    });

    getWXConfig(this.shareList).then((res: any) => {
      wxShareConfig(this.shareData);
    });
  }

  // 是否是正整数
  private isInteger(num: string) {
    if (num !== '0' && !num) {
      return false;
    }
    const numberValue: number = Number(num);
    if (isNaN(numberValue)) {
      return false;
    }
    if (numberValue <= 0) {
      return false;
    }
    return true;
  }

  // 计算
  private calcResult() {
    if (!this.isInteger(this.incomeValue)) {
      Notify('请输入大于0的数字!');
    }
    this.isStopped = false;
    this.anim.play();
  }

  // 计算
  private handleAnimation(anim: any) {
    this.anim = anim;
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

.fortune
  .god-pic-box
    height vw(325)
    line-height 0
    position relative
    img 
      width 100%
    div
      position absolute
      top vw(17)
      left 0
      width 100%
      text-align center
      line-height 140%
      color #A58D68
      font-size 18px /* no */
      font-weight 600
  .words 
    font-size 16px /* no */
    color #c3aa82
    text-align center
    font-weight bold
    margin-top 25px
    margin-bottom 30px
    .coin 
      width vw(17)
      height vw(17)
      display inline-block
      line-height 1
      background-image url('../../assets/images/coin.png')
      background-repeat no-repeat;
      background-size contain
      vertical-align middle
    .text 
      margin 0 vw(5)
      display inline-block
      vertical-align middle
  .income-input-box 
    padding: 0 vw(27.5);
  .income-input 
    padding vw(10) vw(5)
    font-size:15px /* no */
    border 1px solid #d8d8d8 /* no */
    border-radius 8px
    -webkit-appearance none
    display block
    width 100%
    box-sizing border-box
    outline none
  .result-btn 
    display block
    width 100%
    height 44px
    line-height 44px
    font-size 0
    background-image linear-gradient(-270deg, #C3AA82 0%, #E2CBA7 100%)
    border-radius 8px
    overflow hidden
    text-align center
    margin-top vw(10)
    color #fff
    font-size 15px /* no */
    transition transform 0.05s ease
    &:active 
      transform: scale(0.98);
  .anim-box 
    height: 100%
    position absolute
    left 0
    right 0
    bottom 0
    top 0
    background: rgba(0, 0, 0, 0.7) url('../../assets/images/bg_light.png')  center/cover
    display: none
    &.show 
      display block
</style>
