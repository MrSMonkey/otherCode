/*
 * @Description: 服务订单
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-20 13:49:42
 */

<template>
  <section class="purchase">
    <!-- 房源基本信息 -->
    
    <van-tabs @click="onClick">
      <van-tab title="服务包">
        <section v-if="tableData.length > 0">
          <div class="purchase-item" v-for="(item, index) in tableData" :key="index">
            <router-link :to="'/serviceInfo?serviceId=' + item.serviceId + '&entrustId=' + entrustId">
              <div class="purchase-left" :style="{backgroundImage: 'url(' + (item.imgUrls[0] ? item.imgUrls[0] : '') + ')'}">
                <!-- <img :src="item.imgUrls[0]" alt=""/> -->
              </div>
              <p  class="purchase-title">{{item.serviceName|| 1}}</p>
              <p class="purchase-money"><span>{{item.price || 0}}</span>元</p>
            </router-link>
          </div>
        </section>
        <section v-else>
          <NoData tip="暂无服务产品" :url="'/myHouse?entrustId=' + entrustId"/>
        </section>
      </van-tab>
      <van-tab title="服务产品">
        <section class="tree">
          <div class="tree-left">
            <ul>
              <li>带看</li>
              <li>保洁</li>
            </ul>
          </div>
          <div class="tree-right">
          </div>
        </section>
        <!-- <section v-if="tableData.length > 0">
          <div class="purchase-item" v-for="(item, index) in tableData" :key="index">
            <router-link :to="'/serviceInfo?serviceId=' + item.serviceId + '&entrustId=' + entrustId">
              <div class="purchase-left" :style="{backgroundImage: 'url(' + (item.imgUrls[0] ? item.imgUrls[0] : '') + ')'}">
              </div>
              <p  class="purchase-title">{{item.serviceName|| 1}}</p>
              <p class="purchase-money"><span>{{item.price || 0}}</span>元</p>
            </router-link>
          </div>
        </section>
        <section v-else>
          <NoData tip="暂无服务产品" :url="'/myHouse?entrustId=' + entrustId"/>
        </section> -->
      </van-tab>
    </van-tabs>
      
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import NoData from '@/components/NoData.vue';
import { getQueryString } from '@/utils/utils';
import { Tab, Tabs } from 'vant';
import { STATUS_NAME } from '@/config/config';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'Purchase',
   components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    NoData
  }
})
// 类方式声明当前组件
export default class Purchase extends CommonMixins {
  private entrustId: string = ''; // 委托房源ID
  private cityId: string = ''; // 城市ID
  private tableData: any[] = []; // 服务包列表

  private mounted() {
    this.entrustId = String(this.$route.query.entrustId);
    this.cityId = String(this.$route.query.cityId);
    this.getServiceList(this.cityId); // 获取服务包列表
  }

  /**
   * @description 获取服务包列表
   * @params cityId 城市id
   * @returns void
   * @author chenmo
   */
  private async getServiceList(cityId: string) {
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
    try {
      const res: any = await this.axios.get(api.getServiceList + `/${cityId}`);
      if (res && res.code === '000') {
        this.tableData = res.data || [];
      } else {
        this.$toast(`获取服务包列表失败`);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.$toast.clear();
    }
  }

  /**
   * @description 获取订单状态
   * @params status 状态枚举
   * @returns string
   * @author chenmo
   */
  private getOrderStatusName(status: number) {
    return STATUS_NAME[status];
  }

  /**
   * @description tabs切换
   * @params index 当前tabs的索引值
   * @returns null
   * @author chenmo
   */
  private onClick(index: any) {
    if (index === 0) {
      // this.getHouseInfo(this.entrustId);
      // this.getHouseStatus(this.entrustId);
    } else if (index === 1) {
      // this.getHouseRoom(this.entrustId);
    } else if (index === 2) {
      // this.getRentInfo(this.entrustId);
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
  .purchase
    .purchase-item
      background $global-background
      padding vw(15)
      border-bottom 1px solid $bg-color-default
      position relative
      width 100%
      top 0px
      height vw(120)
      .purchase-title
        padding-left vw(120)
        font-size 15px
        font-weight 500
        font-family PingFang-SC-Medium
        color $text-color
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 3
        overflow hidden
      .purchase-money
        text-align right
        padding-top vw(15)
        font-size 12px
        span
          color $text-color
          font-family PingFangSC-Semibold
          font-size 18px
          font-weight bold
          display inline-block
          padding-right 10px
      .purchase-left
        position absolute
        top vw(15)
        left vw(15)
        background-repeat no-repeat
        background-size cover
        width vw(110)
        border-radius 2px
        height vw(90)
        background-position center center
        img 
          width vw(110)
          border-radius: 2px
</style>
