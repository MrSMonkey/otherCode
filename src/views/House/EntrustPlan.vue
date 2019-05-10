/*
 * @Description: 星级房屋托管计划
 * @Author: chenmo
 * @Date: 2019-04-29 11:05:14
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-29 11:37:00
 */


<template>
  <section class="entrust-plan">
    <section class="header-img">
      <img src="@/assets/images/plan_banner.png" alt=""/></section>
    <section class="step-guide">
      <HrTitle title="轻松收租只需三步"></HrTitle>
      <div class="step-plant">
        <div v-for="(item, index) in step" :key="index" >
          <div class="icon-box">
            <img :src="item.img" alt=""/>
            <p>{{item.text}}</p>
          </div>
          <div class="step-line" v-if="index !== 0"></div>
        </div>
      </div>
    </section>
    <section class="main-content">
      <div>
        <HrTitle title="三种方式供您选择"></HrTitle>
      </div>
      <div>
        <ServiceTabsTitle :tabs-title-data="serviceType">
          <ServiceTabsContent :service-desc-data="jmtgServiceDesc" :table-data="jmtgTableData" slot="jiamengtuoguan"></ServiceTabsContent>
          <ServiceTabsContent :service-desc-data="zwtgServiceDesc" :table-data="zwtgTableData" slot="zuwutuoguan"></ServiceTabsContent>
          <ServiceTabsContent :service-desc-data="zzglServiceDesc" :table-data="zzglTableData" slot="zizhuguanli"></ServiceTabsContent>
        </ServiceTabsTitle>
      </div>
    </section>
    <section>
      <van-button slot="button" size="large" type="default" class="entrust-btn" @click="gotoEntrust">一键加盟托管</van-button>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Icon} from 'vant';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import HrTitle from '@/components/HrTitle.vue';
import UokoDetailPlant from '@/components/UokoDetailPlant.vue';
import ServiceTabsTitle from '@/views/House/components/ServiceTabsTitle.vue';
import ServiceTabsContent from '@/views/House/components/ServiceTabsContent.vue';
import { HOUSTFLOW, JMTG_TABLES, ZWTG_TABLES, ZZGL_TABLES, JMTG_DESC, ZWTG_DESC, ZZGL_DESC, BADGES, LIST} from '@/config/config';
import { BadgesInterface, ListInterface} from '@/interface/configInterface';


// 声明引入的组件
@Component({
  name: 'EntrustPlan',
  components: {
    [Icon.name]: Icon,
    HrTitle,
    UokoDetailPlant,
    ServiceTabsTitle,
    ServiceTabsContent
  }
})
// 类方式声明当前组件
export default class EntrustPlan extends CommonMixins {
  private step: any = HOUSTFLOW;
  private jmtgTableData: any = JMTG_TABLES;
  private zzglTableData: any = ZZGL_TABLES;
  private zwtgTableData: any = ZWTG_TABLES;
  private jmtgServiceDesc: any = JMTG_DESC;
  private zzglServiceDesc: any = ZZGL_DESC;
  private zwtgServiceDesc: any = ZWTG_DESC;
  private badges: BadgesInterface = BADGES;
  private list: ListInterface = LIST;
  private sourceId: any = ''; // 来源渠道id
  private serviceType: any[] = [  // 服务种类tab的title数据
    {
      img: require('@/assets/images/icon/icon_jiamengtuoguan.png'),
      serviceName: '加盟托管',
      serviceDesc: '主加盟优客逸家，托管全部租务',
      slotName: 'jiamengtuoguan'
    }, {
      img: require('@/assets/images/icon/icon_zuwutuoguan.png'),
      serviceName: '租务托管',
      serviceDesc: '繁杂租务全部托管，只需收租',
      slotName: 'zuwutuoguan'
    }, {
      img: require('@/assets/images/icon/icon_zizhuguanli.png'),
      serviceName: '自主管理',
      serviceDesc: '业主自己当房东，按需采购服务',
      slotName: 'zizhuguanli'
    }
  ];

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

<style lang="stylus" rel="stylesheet/stylus" scoped>
.entrust-plan
  .header-img
    img 
      display block
      width 100%
  .step-guide
    padding vw(10) 0 vw(20)
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
  .main-content
    margin vw(10) 0 65px
    &>div:first-child
      padding vw(10) 0
      background #fff
  .entrust-btn
    position fixed
    bottom 0
    left 0
    background $main-color
    color #fff
    z-index: 100;
</style>
