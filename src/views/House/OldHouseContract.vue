/*
 * @Description: 房源合同
 * @Author: zhegu
 * @Date: 2019-04-24 10:19:15
 * @Last Modified by: LongWei
 * @Last Modified time: 2019-05-06 11:59:01
 */
<template>
  <section class="house-contract">
    <section class="header">
      <h1>{{contractInfo.houseDesc}}</h1>
      <span>{{contractInfo.startDate && contractInfo.startDate.slice(0,10)}} 至 {{contractInfo.endDate && contractInfo.endDate.slice(0,10)}}</span>
    </section>
    <section class="list">
      <h1>房东基础信息</h1>
      <section class="detail">
        <p>
          <span>房东姓名：</span>
          <span>{{contractInfo.landlordInfo ? contractInfo.landlordInfo.landlordName : ''}}</span>
        </p>
        <p>
          <span>联系电话：</span>
          <span>{{contractInfo.landlordInfo ? contractInfo.landlordInfo.mobile : ''}}</span>
        </p>
        <p>
          <span>房东邮箱：</span>
          <span>{{contractInfo.landlordInfo ? contractInfo.landlordInfo.landlordEmail : ''}}</span>
        </p>
        <p>
          <span>身份证号：</span>
          <span>{{contractInfo.landlordInfo ? contractInfo.landlordInfo.idcNum : ''}}</span>
        </p>
        <p>
          <span>房源编号：</span>
          <span>{{contractInfo.houseAlias}}</span>
        </p>
        <p>
          <span>房源地址：</span>
          <span>{{contractInfo.houseDesc}}</span>
        </p>
        <p>
          <span>通讯地址：</span>
          <span>{{contractInfo.landlordInfo ? contractInfo.landlordInfo.address : ''}}</span>
        </p>
        <p>
          <span>紧急联系人名称：</span>
          <span>{{contractInfo.landlordInfo ? contractInfo.landlordInfo.emergencyPersonName : ''}}</span>
        </p>
        <p>
          <span>紧急联系人电话：</span>
          <span>{{contractInfo.landlordInfo ? contractInfo.landlordInfo.emergencyPersonPhone : ''}}</span>
        </p>
        <p>
          <span>共有产权：</span>
          <span>{{contractInfo.propertyShare ? '是' : '否'}}</span>
        </p>
        <p>
          <span>有无代理人：</span>
          <span>{{contractInfo.landlordInfo && contractInfo.landlordInfo.isAgent ? '有' : '无'}}</span>
        </p>
      </section>
    </section>
    <section class="list" v-if="contractInfo.propertyShare">
      <h1>共有产权人信息</h1>
      <section class="detail">
        <p>
          <span>房东姓名：</span>
          <span>{{contractInfo.propertyInfo.name}}</span>
        </p>
        <p>
          <span>联系电话：</span>
          <span>{{contractInfo.propertyInfo.phone}}</span>
        </p>
        <p>
          <span>身份证号：</span>
          <span>{{contractInfo.propertyInfo.idcnum}}</span>
        </p>
        <p>
          <span>通讯地址：</span>
          <span>{{contractInfo.propertyInfo.address}}</span>
        </p>
      </section>
    </section>
    <section class="list" v-if="contractInfo.landlordInfo && contractInfo.landlordInfo.isAgent">
      <h1>代理人信息</h1>
      <section class="detail">
        <p>
          <span>代理人姓名：</span>
          <span>{{contractInfo.landlordInfo.agentName}}</span>
        </p>
        <p>
          <span>联系电话：</span>
          <span>{{contractInfo.landlordInfo.agentPMoblie}}</span>
        </p>
        <p>
          <span>代理人邮箱：</span>
          <span>{{contractInfo.landlordInfo.agentEmail}}</span>
        </p>
        <p>
          <span>身份证号：</span>
          <span>{{contractInfo.landlordInfo.agentIdCard}}</span>
        </p>
        <p>
          <span>通讯地址：</span>
          <span>{{contractInfo.landlordInfo.agentAddress}}</span>
        </p>
      </section>
    </section>
    <section class="list">
      <h1>房源信息</h1>
      <section class="detail">
        <p>
          <span>房源户型：</span>
          <span>{{contractInfo.initRoomNum}}室{{contractInfo.hallNum}}厅{{contractInfo.toileNum}}卫{{contractInfo.buildAcreage}}m²</span>
        </p>
        <p>
          <span>证件类型：</span>
          <span>{{contractInfo.propertyRightDes}}</span>
        </p>
        <p>
          <span>证件编号：</span>
          <span>{{contractInfo.propertyRightCode}}</span>
        </p>
        <p>
          <span>产权地址：</span>
          <span>{{contractInfo.propertyAddress}}</span>
        </p>
        <p>
          <span>抵押情况：</span>
          <span>{{contractInfo.isMortgage ? '有抵押' : '无抵押'}}</span>
        </p>
      </section>
    </section>
    <section class="list">
      <h1>付款规则</h1>
      <section class="detail">
        <p>
          <span>交付日期：</span>
          <span>{{contractInfo.startDate && contractInfo.startDate.slice(0,10)}}</span>
        </p>
        <p>
          <span>装修期：</span>
          <span>{{contractInfo.decorationDay}}天</span>
        </p>
        <p>
          <span>房东产品：</span>
          <span>{{contractInfo.landlordProductName}}</span>
        </p>
        <p>
          <span>计租期：</span>
          <span>{{contractInfo.rentalPeriod}}月</span>
        </p>
        <p>
          <span>支付周期：</span>
          <span>{{contractInfo.payModeDes}}</span>
        </p>
        <p>
          <span>空置期：</span>
          <span>
            满 {{contractInfo.rentalMonths}} 计租月，
            空置期 {{contractInfo.vacantMonths}} 月
          </span>
        </p>
        <p>
          <span>空置总月数：</span>
          <span>{{contractInfo.vacantTotal}}月</span>
        </p>
        <p>
          <span>支付金额：</span>
          <span>
            <ul>
              <li v-for="(item, index) in contractInfo.contractTimeRangeList" :key="index">
                第 {{item.startYear}} 年至第 {{item.endYear}} 年&nbsp;
                {{item.rent && `保底 ${item.rent} 元/月`}}
                {{item.splitPaymentRate && `分账比例 ${item.splitPaymentRate} %`}}
              </li>
            </ul>
          </span>
        </p>
        <p>
          <span>押 金：</span>
          <span>{{contractInfo.deposit}}元</span>
        </p>
        <p>
          <span>首次付款日期：</span>
          <span>{{contractInfo.firstPaymentDate && contractInfo.firstPaymentDate.slice(0,10)}}</span>
        </p>
        <p>
          <span>合同起始日期：</span>
          <span>
            {{contractInfo.startDate && contractInfo.startDate.slice(0,10)}}
            至
            {{contractInfo.endDate && contractInfo.endDate.slice(0,10)}}
          </span>
        </p>
      </section>
    </section>
    <section class="list">
      <h1>支付账户</h1>
      <section class="detail">
        <p>
          <span>开户银行：</span>
          <span>{{contractInfo.bankName}}</span>
        </p>
        <p>
          <span>开户银行支行：</span>
          <span>{{contractInfo.bankBranch}}</span>
        </p>
        <p>
          <span>开户人姓名：</span>
          <span>{{contractInfo.receivables}}</span>
        </p>
        <p>
          <span>银行卡号：</span>
          <span>{{contractInfo.account}}</span>
        </p>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import api from '@/api';
import { Loading } from '@/utils/decorators';

// 声明引入的组件
@Component({
  name: 'OldHouseContract'
})
// 类方式声明当前组件
export default class OldHouseContract extends CommonMixins {
  private contractInfo: any = {};

  private async mounted() {
    this.getContractInfo();
  }

  // 获取合同详情
  @Loading()
  private async getContractInfo() {
    const contractId: string = String(this.$route.query.contractId);
    try {
      const res: any = await this.axios.get(`${api.getContractInfo}/${contractId}`);
      if (res && res.code === '000') {
        this.contractInfo = res.data || {};
        console.log(this.contractInfo);
      } else {
        this.$toast(res.msg || '合同详情获取失败，请重试！');
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.house-contract
  .header
    display flex
    flex-direction column
    justify-content center
    height vw(90)
    background #fff
    padding 0 vw(15)
    margin-bottom vw(10)
    h1
      font-size 18px
      color $text-color
      margin-bottom vw(10)
    span
      font-size 12px
      color $next-text-color
  .list
    background #fff
    padding 0 vw(15)
    margin-bottom vw(10)
    h1, .detail
      width 100%
      font-size 15px
      color $text-color
    h1
      height vw(60)
      line-height vw(60)
      border-bottom 1px solid #eee
    .detail
      font-family: PingFangSC-Regular;
      
      p
        padding-top vw(15)
        &:last-child
          padding-bottom vw(15)
        span
          font-size vw(15)
          color $text-color
</style>
