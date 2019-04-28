/*
 * @Description: 账单详情
 * @Author: zhegu
 * @Date: 2019-04-24 10:19:15
 * @Last Modified by: LongWei
 * @Last Modified time: 2019-04-28 16:55:04
 */
<template>
  <section class="account-detail">
    <section  class="list">
      <h1>房源信息</h1>
      <section  class="detail">
        <span>房源信息：</span>
        <span>{{oldHouseBaseInfo.communityName}}{{oldHouseBaseInfo.houseNumber}}</span>
      </section>
    </section>
    <section  class="list">
      <h1>账单概况</h1>
      <section  class="detail">
        <p>
          <span>账单名称：</span>
          <span>{{accountDetail && accountDetail.batchTitle}}</span>
        </p>
        <p>
          <span>实收金额：</span>
          <span>{{accountDetail && accountDetail.amountPaid}}元</span>
        </p>
        <p>
          <span>实收日期：</span>
          <span>{{accountDetail && accountDetail.lastPayTime | dateFilter}}</span>
        </p>
        </section>
    </section>
    <section  class="list">
      <h1>账单明细</h1>
      <section  class="detail details-list" v-for="(item, index) in accountDetailList" :key="index">
        <p>
          <span>账单项目：</span>
          <span>{{item.categoryName}}</span>
        </p>
        <p>
          <span>实收金额：</span>
          <span>{{item.amountPaid}}元</span>
        </p>
        <p>
          <span>账单周期：</span>
          <span>{{ item.billCycleStart | dateFilter}} 至 {{ item.billCycleEnd | dateFilter}}</span>
        </p>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import api from '@/api';
import { State, Getter, Mutation, Action } from 'vuex-class';
import { config } from '@vue/test-utils';

const namespace: string = 'global';

// 声明引入的组件
@Component({
  name: 'OldAccountDetail',
  components: {
  },
  filters: {
    dateFilter(date: string) {
      if (date) {
        return date.slice(0, 10);
      }
    },
  },
})
// 类方式声明当前组件
export default class OldAccountDetail extends CommonMixins {
  @Getter('getOldHouseBaseInfo', { namespace }) private oldHouseBaseInfo: any;
  private id: string = ''; // 账单详情
  private accountDetail: any = {};
  private accountDetailList: any[] = []; // 账单明细

  private created() {
    console.log(this.oldHouseBaseInfo, '旧房源基础信息');
    if (this.$route.query.id) {
      this.id = String(this.$route.query.id);
    }
    this.getAccountDetail();
  }

  // 获取 - 账单基本信息
  private async getAccountDetail() {
    if (!this.id) {
      return;
    }
    try {
      const res: any = await this.axios.get(`${api.getAccountDetail}/${this.id}`);
      if (res.code === '000') {
        const data = res.data;
        this.accountDetail = data;
        this.accountDetailList = data.detailList || [];
      }
      console.log(res, '账单基本信息');
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/main.styl'
.account-detail
  .list
    background #fff
    padding 0 vw(15)
    margin-bottom vw(10)
    h1,.detail
      width 100%
      font-size 15px
      color $text-color
    h1
      height vw(60)
      line-height vw(60)
      border-bottom 1px solid #eee 
    .detail
      p
        padding-top vw(15)
      &:last-child
        padding-bottom vw(15)
    .details-list
      padding-bottom vw(20)
      border-bottom 1px solid #eee
      &:last-child
        border 0
    &:nth-child(1)
      .detail
        height vw(60)
        line-height vw(60) 
</style>
