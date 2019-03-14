<!--
  /*
  * @Description: 星级房屋托管计划
  * @Author: chenmo
  * @Date: 2018-09-17 17:20:01
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-03-11 14:49:00
  */
-->

<template>
  <section class="entrust-plan">
    <section class="header-img">
      <img src="../assets/images/plan_banner.png" alt=""/>
    </section>
    <section class="map-img">
      <img src="../assets/images/map.png" alt="6年，4城，服务13000个业主，10万租客"/>
    </section>
    <section class="step-guide">
      <HrTitle title="爱屋交给星空只需四步"></HrTitle>
      <div class="step-plant">
        <div v-for="(item, index) in step" :key="index" >
          <div class="icon-box">
            <img :src="item.src" alt=""/>
            <p>{{item.text}}</p>
          </div>
          <div class="step-line" v-if="index !== 0"></div>
        </div>
      </div>
    </section>
    <UokoDetailPlant>
      <section v-for="(item, index) in tables" :key="index">
        <Table :tableData="item.data" :title="item.title" :columns="columns"></Table>
      </section>
      <p class="tips">*具体费用以签订合同为准</p>
      <p class="footer-text">
        <img src="../assets/images/icon/icon_big_tick.png" alt=""/>
        <span>业主每月轻松收房租</span>
      </p>
    </UokoDetailPlant>
    <HrTitle title="星空业主，四大保障"></HrTitle>
    <section class="bage-plant">
      <div class="badge-box" v-for="(item, index) in badges" :key="index">
        <img :src="item.img" :alt="item.text"/>
        <p>{{item.text}} <br/> {{item.dec}}</p>
      </div>
      <div class="across-line" />
      <div class="vertical-line" />
    </section>
    <section class="plant">
      <ul class="info-list">
        <li v-for="(item, index) in list" :key="index">
          <img src="../assets/images/icon/icon_point.png" alt=""/>
          <span>{{item.title}}</span>
          <p>{{item.text}}</p>
        </li>
      </ul>
    </section>
    <section>
      <van-button slot="button" size="large" type="default" class="entrust-btn" @click="gotoEntrust">在线委托</van-button>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Icon } from 'vant';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import HrTitle from '@/components/HrTitle.vue';
import UokoDetailPlant from '@/components/UokoDetailPlant.vue';
import Table from './components/table/Table.vue';
import { STEP,  TABLES, COLUMNS, BADGES, LIST} from '@/config/config';

// 声明引入的组件
@Component({
  name: 'EntrustPlan',
  components: {
    [Icon.name]: Icon,
    HrTitle,
    UokoDetailPlant,
    Table
  }
})
// 类方式声明当前组件
export default class EntrustPlan extends CommonMixins {
  private step: any[] = STEP;
  private tables: any[] = TABLES;
  private columns: any[] = COLUMNS;
  private badges: any[] = BADGES;
  private list: any[] = LIST;
  private sourceId: any = ''; // 来源渠道id

  private mounted() {
    this.sourceId = this.$route.query.sourceId;
  }

  private gotoEntrust() {
    if (typeof(this.sourceId) === 'undefined') {
      this.$router.push(`/entrust`); // 跳转到在线委托页
      window.location.href = `/#/entrust`;
    } else {
      window.location.href = `/#/entrust?sourceId=${this.sourceId}`; // 跳转到在线委托页
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
.entrust-plan
  .header-img
    img 
      display inline-block
      width 100%
  .map-img
    padding: vw(20) 0
    width 100%
    background-color $global-background
    text-align center
    img
      display inline-block
      width vw(294)
      height vw(138)
  .step-guide
    margin-top vw(10)
    padding vw(20) 0
    background-color $global-background
    .step-plant
      position relative
      margin-top vw(32)
      display flex
      justify-content: space-around;
      .icon-box
        position relative
        text-align center
        img
          width vw(30)
        p
          color $main-color
          font-size 15px /* no */
          font-weight bold
      .step-line
        position relative
        right vw(46)
        bottom vw(30)
        width vw(30)
        border-top 1px solid $main-color /* no */
  .tips
    text-align right 
    font-size 12px
    color $disabled-color
    margin-top vw(-15)
  .footer-text
    margin-top vw(25)
    padding-bottom vw(20)
    font-size 18px
    font-weight bold
    text-align center
    vertical-align middle
    img 
      display inline-block
      margin-right vw(10)
      width vw(20)
  .bage-plant
    position relative
    margin vw(10) vw(15) 0
    border-radius 4px
    background-color $global-background
    text-align center
    .badge-box
      position relative
      padding vw(23) 0
      width vw(157)
      display inline-block
      text-align center
      img
        width vw(60)
      p
        margin-top vw(13)
        font-size 15px /* no */
        font-weight bold
        color $text-color
    .across-line
      position absolute
      top vw(155)
      left vw(75)
      width vw(195)
      height 0
      border 1px solid #eee
    .vertical-line 
      position absolute
      top vw(52)
      left vw(170)
      width 0
      height vw(195)
      border 1px solid #eee
  .plant
    position relative
    margin 0 vw(15) vw(80)
    padding-left vw(15)
    padding-right vw(15)
    border-radius 4px
    background-color $global-background
    .info-list
      position relative
      margin-top vw(10)
      padding-top 1px/* no */
      padding-bottom vw(33)
      list-style none
      color $text-color
      li
        margin-top vw(20)
        img
          width vw(15)
        span 
          margin-left vw(8)
          font-size 18px /* no */
          font-weight bold
          line-height vw(25)
          vertical-align middle
        p
          margin-top vw(5)
          margin-left vw(21)
          margin-right vw(5)
          font-size: 13px; /* no */
          line-height vw(18)
          text-align justify
          color $next-text-color
          letter-spacing 1px
  .entrust-btn
    position fixed
    bottom 0
    left 0
    background $main-color
    color #fff
</style>
