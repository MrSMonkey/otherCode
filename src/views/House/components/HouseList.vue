/*
 * @Description: 首页表格组件
 * @Author: chenmo
 * @Date: 2019-02-20 14:20:54
 * @Last Modified by: LongWei
 * @Last Modified time: 2019-04-28 12:01:05
 */

<template>
  <section class="house-list">
    <section class="list" v-for="(house, index) in tableData" :key="house.houseId" @click="linkHouseInfoTo(house)">
      <HouseTitle :house="house"></HouseTitle>
      <div class="item-desc">
        <section class="item-dec-ok" v-if="house.handleStatus === 1">
          <div>委托成功，请保持手机畅通。</div>
          <div class="next">
            <van-button
              v-show="false"
              @click.stop="getStewards(house.houseId, index)"
              size="mini"
              :class="['steward-choose-btn', house.allotAgency ? 'active' : '']"
              :disabled="house.allotAgency ? true : false"
            >{{house.allotAgency ? "已选择" : "选择管家"}}</van-button>
            <div @click="linkTo(house)" class="add-info">
              <img class="call-icon" alt="waith" src="@/assets/images/icon/write.png"/>补充或修改房源信息
            </div>
          </div>
        </section>
        <section class="item-dec-ok" v-else>
          <van-button
            v-show="false"
            @click.stop="getStewards(house.houseId, index)"
            size="mini"
            :class="['steward-choose-btn', house.allotAgency ? 'active' : '']"
            :disabled="house.allotAgency ? true : false"
          >{{house.allotAgency ? "已选择" : "选择管家"}}</van-button>
          <div class="set">
            <span>{{getRentType(house.consociationType)}}</span> | 
            <span>{{getRentWay(house.rentWay)}} </span> | 
            <span v-if="house.rentWay === 2">{{house.rentRoom ? `${house.roomTotal}个房间 ${house.rentRoom}个已出租` : '待租中'}}</span>
            <span v-else>{{house.rentRoom ? `已出租` : '待租中'}}</span>
          </div>
        </section>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit  } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { RENT_WAY, RENT_TYPE } from '@/config/config';
import { StewardItem } from '@/interface/configInterface.ts';
import HouseTitle from './HouseTitle.vue';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'HouseList',
  components: {
    HouseTitle
  }
})
// 类方式声明当前组件
export default class HouseList extends CommonMixins {
  @Prop({ type: Array, default: () => [] })
  private tableData: any; // 房源列表

  /**
   * @description 已上架的房源跳转到我的房源列表
   * @params house 房源信息
   * @returns null
   * @author chenmo
   */
  private linkHouseInfoTo(house: any) {
    if (house.consociationType === 4) { // 优客自营的房源跳转到旧业主的我的房源页面
      this.$router.push('/oldMyHouse?houseId=' + house.houseId);
      return;
    }
    if (house.handleStatus !== 1) {
      this.$router.push('/myHouse?entrustId=' + house.houseId);
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
   * @description 判断房源详情
   * @params type 类型
   * @returns string
   * @author chenmo
   */
  private linkTo(house: any) {
    /**
     * @params applyStatus 1 待审核，2 审核通过，3 审核驳回
     * @author chenmo
     */
    if (house.applyStatus === 1) {
      this.$toast('小区审核中，暂无法修改!');
      return;
    } else if (house.applyStatus === 3) {
      this.$toast('小区审核不通过，暂无法修改!');
      return;
    } else {
      this.$router.push(`/perfect?entrustId=${house.houseId}`);
    }
  }

  /**
   * @description 获取管家列表
   * @params id 房源ID
   * @params selectedIndex 选中房源的房源列表tableData中的索引
   * @returns void
   * @author linyu
   */
  @Emit()
  private getStewards(id: string | number, selectedIndex: number) {
    return;
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
        .add-info
          width auto
          margin-right 80px
          color $main-color
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
      .set
        margin-right 80px
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
  .steward-choose-btn
    color #ffffff
    float right
    text-align center
    border none
    width 65px;
    background $main-color
    border-radius 3px
    height 22px
    line-height 22px
    font-size 14px
  .active
    background $disabled-color
    opacity 1
</style>
