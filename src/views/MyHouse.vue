/*
 * @Description: 我的房源详情
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-20 11:26:55
 */

<template>
  <section class="house">
    <section class="house-tabs">
      <van-tabs @click="onClick">
        <van-tab title="房源信息">
          <!-- 房源基本信息 -->
         <houseInfo :houseInfo="houseInfo"></houseInfo>
         <!-- 房源动态 -->
         <section class="house-status">
          <p class="title">房源动态</p>
          <houseStatus :data="houseStatus"></houseStatus>
         </section>
         <BottomBtn :entrustId="entrustId" :cityId="houseInfo.cityId"></BottomBtn>
        </van-tab>
        <van-tab title="房间信息">
          <roomInfo :roomInfo="roomInfo"></roomInfo>
        </van-tab>
        <van-tab title="租赁信息">
          <section class="rent-info">
            <div class="rent-title">
              <span v-for="(rent, index) in rentInfo" :key="index" :class="active=== index ? 'active' : ''" @click="checkIndex(index, rent)">
                {{getName(rent.source, index)}}
              </span>
            </div>
          </section>
          <RentInfo :selectData="selectData"></RentInfo>
        </van-tab>
      </van-tabs>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Tab, Tabs } from 'vant';
import { getQueryString } from '@/utils/utils';
import HouseInfo from './components/house/HouseInfo.vue';
import HouseStatus from './components/house/HouseStatus.vue';
import RoomInfo from './components/house/RoomInfo.vue';
import RentInfo from './components/house/RentInfo.vue';
import BottomBtn from '../components/BottomBtn.vue';
import { ZCFU } from '@/config/config';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'MyHouse',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    HouseInfo,
    HouseStatus,
    RoomInfo,
    RentInfo,
    BottomBtn
  }
})
// 类方式声明当前组件
export default class Login extends CommonMixins {
  private houseInfo: any = {}; // 委托房源详情
  private entrustId: string = ''; // 委托房源ID
  private houseStatus: any[] = []; // 房源动态
  private roomInfo: any[] = []; // 房间配置信息
  private rentInfo: any[] = []; // 租赁信息
  private selectData: any = {}; // 当前的租赁信息
  private active: number = 0;

  private mounted() {
    this.entrustId = String(this.$route.query.entrustId);
    this.getHouseInfo(this.entrustId); // 获取房源详情
    this.getHouseStatus(this.entrustId); // 获取房源动态
  }

  /**
   * @description 获取房源详情
   * @params entrustId 委托id
   * @returns void
   * @author chenmo
   */
  private async getHouseInfo(entrustId: string) {
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
    try {
      const res: any = await this.axios.get(api.getHouseInfo + `/${entrustId}`);
      if (res && res.code === '000') {
        this.houseInfo = res.data || {};
      } else {
        this.$toast.fail(`获取房源详情失败`);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.$toast.clear();
    }
  }


  /**
   * @description 获取房源动态
   * @params entrustId 委托id
   * @returns void
   * @author chenmo
   */
  private async getHouseStatus(entrustId: string) {
    try {
      const res: any = await this.axios.get(api.getProcesses + `/${entrustId}`);
      if (res && res.code === '000') {
        this.houseStatus = res.data || {};
      } else {
        this.$toast.fail(`获取房源动态失败`);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }

  /**
   * @description 获取房源配置
   * @params entrustId 委托id
   * @returns void
   * @author chenmo
   */
  private async getHouseRoom(entrustId: string) {
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
    try {
      const res: any = await this.axios.get(api.getHouseRoom + `/${entrustId}`);
      if (res && res.code === '000') {
        this.roomInfo = res.data || [];
      } else {
        this.$toast.fail(`获取房间配置信息失败`);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.$toast.clear();
    }
  }

  /**
   * @description 获取房源配置
   * @params entrustId 委托id
   * @returns void
   * @author chenmo
   */
  private async getRentInfo(entrustId: string) {
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
    try {
      const res: any = await this.axios.get(api.getRentInfo + `/${entrustId}`);
      if (res && res.code === '000') {
        this.rentInfo = res.data || [];
        this.selectData = res.data[0].houseRoomCommonDTO; // 默认第一条
      } else {
        this.$toast.fail(`获取租赁信息失败`);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.$toast.clear();
    }
  }

  /**
   * @description 已上架的房源跳转到我的房源列表
   * @params house 房源信息
   * @returns null
   * @author chenmo
   */
  private linkTo(house: any) {
    if (house.handleStatus !== 1) {
      this.$router.push('/home');
    }
  }

  /**
   * @description tabs切换
   * @params index 当前tabs的索引值
   * @returns null
   * @author chenmo
   */
  private onClick(index: any) {
    console.log(index);
    if (index === 0) {
      this.getHouseInfo(this.entrustId);
      this.getHouseStatus(this.entrustId);
    } else if (index === 1) {
      this.getHouseRoom(this.entrustId);
    } else if (index === 2) {
      this.getRentInfo(this.entrustId);
    }
  }

  /**
   * @description 过滤朝向
   * @params type 类型
   * @returns string
   * @author chenmo
   */
  private getName(name: string, index: number) {
    if (name === 'ZC') {
      return ZCFU[name];
    } else {
      return ZCFU[name] + index;
    }
  }

  /**
   * @description 点击标题
   * @params index 当前点击的索引值
   * @params rent 当前选择的租赁信息
   * @returns null
   * @author chenmo
   */
  private checkIndex(index: number, rent: any) {
    this.active = index;
    this.selectData = rent.houseRoomCommonDTO; // 当前的租赁信息
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
.house
  .house-status
    margin-top vw(10)
    background-color $global-background
    margin-bottom vw(80)
    .title
      padding: 0 vw(20);
      height: 45px;
      font-size: 15px; /* no */
      font-weight: bold;
      line-height: 45px;
      color $text-color
      border-bottom: 1px solid $border-color-light;
  .rent-info
    border-top 1px solid $border-color-light
    padding 0 vw(15) vw(15)
    margin-bottom 1px
    background $global-background
    .rent-title
      width auto
      white-space nowrap
      overflow-x auto
      margin-top vw(10)
      span
        display inline-block
        font-size 14px
        padding 0px vw(16)
        height 30px
        line-height 30px
        border-radius 15px
        border 1px solid $disabled-color
        margin-right: vw(10)
        color $next-text-color
      .active
        background $main-color
        color #fff
</style>
