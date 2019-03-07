/*
 * @Description: 提交房源
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-18 14:25:47
 */

<template>
  <section class="house" v-if="isData">
    <section v-if="tableData.length > 0">
      <div class="adver">
        <img  src="../assets/images/advertisement.png" alt="adver"/>
      </div>
      <div class="list" v-for="house in tableData" :key="house.entrustId" @click="linkTo(house)">
        <h2><span>{{house.districtName}}</span> {{house.communityName || ''}}&nbsp;{{house.handleStatus === 1 ? '' : `${house.building || '?'}栋${house.unit || '?'}单元${house.floorNum || '?'}楼${house.number || '?'}号` }}</h2>
        <div class="item-desc">
          <div v-if="house.handleStatus === 1" class="item-dec-ok">
            <div>已经成功通知到<span class="assetNum">{{house.assetNum}}</span>个资产管家，请保持手机畅通。</div>
            <div class="next">您还可以点击此处<a :href="'/#/perfect?entrustId=' + house.entrustId"><span class="active"><img class="call-icon" alt="waith" src="../assets/images/icon/write.png"/>补充或修改房源信息</span></a></div>
          </div>
          <div v-else class="set"> {{getRentType(house.consociationType)}} | {{getRentWay(house.rentWay)}} | {{house.rentRoom ? `${house.roomTotal}个房间 ${house.rentRoom}个已出租` : '待租中'}}</div>
        </div>
      </div>
    </section>
    <section class="no-house" v-else>
      <img src="../assets/images/illustration_blank.png" alt="图标"/>
      <p>您尚未提交意向资源，您可以<a href="/#/entrust">立即增加</a></p>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Field, Row, Col } from 'vant';
import { RENT_WAY, RENT_TYPE } from '@/config/config';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'House',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
  }
})
// 类方式声明当前组件
export default class House extends CommonMixins {
  private tableData: any[] = []; // 委托房源列表
  private isData: boolean = false; // 默认不显示
  private mounted() {
    this.getHouseList(); // 获取房源列表
  }

  /**
   * @description 获取列表
   * @returns void
   * @author chenmo
   */
  private async getHouseList() {
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
    this.isData = false;
    try {
      const res: any = await this.axios.get(api.getHouseList);
      if (res && res.code === '000') {
        this.tableData = res.data || [];
      } else {
        this.$toast(`获取房源失败`);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.isData = true;
      this.$toast.clear();
    }
  }

  /**
   * @description 过滤托管类型
   * @params type 类型
   * @returns string
   * @author chenmo
   */
  private getRentType(type: number) {
    return RENT_TYPE[type];
  }

  /**
   * @description 过滤托管类型
   * @params type 类型
   * @returns string
   * @author chenmo
   */
  private getRentWay(status: number) {
    return RENT_WAY[status];
  }

  /**
   * @description 已上架的房源跳转到我的房源列表
   * @params house 房源信息
   * @returns null
   * @author chenmo
   */
  private linkTo(house: any) {
    if (house.handleStatus !== 1) {
      this.$router.push('/myHouse?entrustId=' + house.entrustId);
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
.no-house
  text-align center
  img 
    display inline-block
    width 120px
    margin-top vw(100)
  p
    margin-top 20px
    font-size 14px
    color $text-color
    a
      display inline-block
      color $main-color
.house
  .adver
    img
      display inline-block
      width 100%
      vertical-align: top
  .list
    width 100%
    margin-bottom vw(15)
    background $global-background
    h2 
      font-size 16px
      border-bottom 1px solid $bg-color-default
      line-height 1.5
      padding vw(15)
      span 
        display inline-block
        &:nth-child(1)
          margin-right vw(8)
        &:nth-child(2)
          margin-left vw(8)
    .item-desc
      .item-dec-ok
        font-size 13px
        padding vw(15)
        color $next-text-color
        .assetNum
          display inline-block
          font-size 18px
          color $main-color
          margin 0 vw(3)
        .next
          margin-top vw(6)
          .active
            display inline-block
            color $main-color
      .set
        display inline-block
        padding vw(14)
        color $next-text-color
        font-size 13px
        line-height 1.5
      .call-icon
        display inline-block
        width 18px
        height 100%
        margin 0 vw(5) 0
        vertical-align: bottom
      .mobile
        display inline-block
        line-height 1.5
        color $main-color
        font-size 16px
</style>
