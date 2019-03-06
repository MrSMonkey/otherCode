/*
 * @Description: 服务包列表
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
            <div v-for="(item, index) in list" :key="index" class="tree-left-item">
              <p :class="item.id === isActive ? 'cname-active cname' : 'cname'" @click="checkActive(item)">{{item.name}}</p>
              <transition name="van-slide-down">
                <section v-if="item.id === isActive">
                  <div v-for="(ctx, idx) in item.children" :key="idx" class="next-item" @click="checkChildrenActive(ctx)">
                    <p :class="ctx.id === isActiveChildrenOne ? 'active' : ''">{{ctx.name}}</p>
                  </div>
                </section>
              </transition>
              
            </div>
          </div>
          <div class="tree-right">
            11
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
  private isActive: number = 1; // 默认选择第一项
  private isActiveChildrenOne: string = '11'; // 默认选择第一项
  private list: any[] = [{
    id: 1,
    name: '带看带看',
    children: [
      {
        gid: '11',
        name: '龟速带看带看'
      },
      {
        gid: '22',
        name: '光速带看'
      }
    ]
  }, {
    id: 2,
    name: '装修',
    children: [
      {
        gid: '11',
        name: '龟速带看'
      },
      {
        gid: '22',
        name: '光速带看'
      }
    ]
  }, {
    id: 3,
    name: '保洁',
    children: [
      {
        gid: '11',
        name: '龟速带看'
      },
      {
        gid: '22',
        name: '光速带看'
      }
    ]
  }];

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

  /**
   * @description 选择tree
   * @params item 当前选择的item
   * @returns null
   * @author chenmo
   */
  private checkActive(item: any) {
    this.isActive = item.id;
  }

  /**
   * @description 选择tree子选项
   * @params ctx 当前选择的item
   * @returns null
   * @author chenmo
   */
  private checkChildrenActive(ctx: any) {
    this.isActiveChildrenOne = ctx.id;
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
  .tree
    display -webkit-flex
    display flex
    justify-content space-between
    .tree-left
      width vw(80)
      .tree-left-item
        color $text-color
        font-size 14px
        text-align center
        position relative
        .cname
          color $text-color
          width vw(30)
          height vw(60)
          margin 0 auto
          display -webkit-flex
          display flex
          justify-content center
          align-items center
        .cname-active
          font-weight bold
          &::before
            position absolute
            top 0px
            left 0px
            width vw(4)
            height vw(60)
            content ""
            background $main-color
        .next-item
          background $global-background
          p
            color $text-color
            width vw(30)
            height vw(60)
            margin 0 auto
            display -webkit-flex
            display flex
            justify-content center
            align-items center
          .active
            color $main-color
    .tree-right
      width 100%
      background #fff
</style>
