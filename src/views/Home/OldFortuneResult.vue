/*
 * @Description: 星空财神 - 4321定律中间页
 * @Author: LongWei
 * @Date: 2019-04-23 15:46:54
 * @Last Modified by: LongWei
 * @Last Modified time: 2019-04-24 14:05:07
 */

<template>
  <section>
    <main class="result-box">
      <div class="title">
        <h2>【4321定律】</h2>
        <h2>财富自由第一定律</h2>
      </div>
      <div class="result-cont">
        <div class="p1">
          <p class="p-tit">投资理财</p>
          <p class="p-money">
            <span class="p-num">{{ getIncomePart(money, 0.4)}}</span>元
          </p>
          <p class="p-desc">收入之40%用于投资理财、财富增值</p>
        </div>
        <div class="p2">
          <p class="p-tit">家庭开支</p>
          <p class="p-money">
            <span class="p-num">{{ getIncomePart(money, 0.3)}}</span>元
          </p>
          <p class="p-desc">收入之30%用于家庭开支</p>
        </div>
        <div class="p3">
          <p class="p-tit">活期存款</p>
          <p class="p-money">
            <span class="p-num">{{ getIncomePart(money, 0.2)}}</span>元
          </p>
          <p class="p-desc">收入之20%用于活期存款</p>
        </div>
        <div class="p4">
          <p class="p-tit">保险投资</p>
          <p class="p-money">
            <span class="p-num">{{ getIncomePart(money, 0.1)}}</span>元
          </p>
          <p class="p-desc">收入之10%用于个人/家庭保险</p>
        </div>
        <router-link to="/oldFortuneLaw" class="p-center">
          4321定律
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
  name: 'FortuneResult',
})
// 类方式声明当前组件
export default class FortuneResult extends CommonMixins {
  private money: string = '';

  private mounted() {
    this.money = String(this.$route.query.money);
  }

  // 计算百分比
  private getIncomePart(total: string, percent: number) {
    let totalNum: number = Number(total);
    if (isNaN(totalNum)) {
      totalNum = 0;
    }
    return Math.floor(totalNum * percent);
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

.result-box
  padding-top vw(20)
  background: $bg-color-default;
  .title 
    h2 
      font-size 24px /* no */
      text-align center
      color #b89e75
  .result-cont 
    margin 0 auto
    padding vw(20)
    overflow hidden
    position relative
    .p1,.p2,.p3,.p4 
      width vw(162.5)
      height vw(210)
      background-size cover
      background-repeat no-repeat
      color #fff
      float left
      margin-bottom vw(10)
      box-sizing border-box
      padding vw(15)
      &:nth-of-type(2n+1)
        margin-right vw(10)
      &:nth-of-type(2n+2)
        text-align right
    .p1
      background-image url('../../assets/images/p1.png')
    .p2 
      background-image url('../../assets/images/p2.png')
    .p3
      background-image url('../../assets/images/p3.png')
    .p4
      background-image url('../../assets/images/p4.png')
    .p-tit 
      font-size 18px /* no */
    .p-money 
      font-size 18px/* no */
      margin-bottom vw(14)
      margin-top vw(3.5)
    .p-num 
      font-weight bold
      font-size 30px /* no */
    .p-desc 
      font-size 14px /* no */
      text-align left
    .p-center 
      position absolute
      width vw(116.5)
      height vw(116.5)
      background-image url('../../assets/images/btn_center.png')
      background-size contain
      overflow hidden
      left 0
      top vw(-18)
      right 0
      bottom 0
      margin auto
      font-size 0
      &:active
        transform  scale(0.98)
</style>
