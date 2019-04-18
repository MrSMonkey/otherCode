/*
 * @Description: 首页表格组件
 * @Author: chenmo
 * @Date: 2019-02-20 14:20:54
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-20 15:43:10
 */



<template>
  <section class="house-list">
    <section class="list" v-for="house in tableData" :key="house.entrustId" @click="linkHouseInfoTo(house)">
      <HouseTitle :house="house"></HouseTitle>
      <div class="item-desc">
        <div v-if="house.handleStatus === 1" class="item-dec-ok">
          <div>已经成功通知到<span class="assetNum">{{house.assetNum}}</span>个资产管家，请保持手机畅通。</div>
          <div class="next">您还可以点击此处<a @click="linkTo(house)"><span class="active"><img class="call-icon" alt="waith" src="@/assets/images/icon/write.png"/>补充或修改房源信息</span></a></div>
        </div>
        <section v-else>
          <HouseAttribute :house="house"></HouseAttribute>
        </section>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit  } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { RENT_WAY, RENT_TYPE } from '@/config/config';
import HouseTitle from './HouseTitle.vue';
import HouseAttribute from './HouseAttribute.vue';

// 声明引入的组件
@Component({
  name: 'HouseList',
  components: {
    HouseTitle,
    HouseAttribute
  }
})
// 类方式声明当前组件
export default class HouseList extends CommonMixins {
  @Prop({ type: Array, default: () => [] })
  private tableData: any;

  /**
   * @description 已上架的房源跳转到我的房源列表
   * @params house 房源信息
   * @returns null
   * @author chenmo
   */
  private linkHouseInfoTo(house: any) {
    if (house.handleStatus !== 1) {
      this.$router.push('/myHouse?entrustId=' + house.entrustId);
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
      this.$router.push(`/perfect?entrustId=${house.entrustId}`);
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../assets/stylus/main.styl'
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
