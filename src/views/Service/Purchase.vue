/*
 * @Description: 服务包列表
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-24 20:50:24
 */

<template>
  <section class="purchase">
    <!-- 房源基本信息 -->
    <van-tabs @click="onClick" :sticky="true" @scroll="tabScroll">
      <van-tab title="服务产品">
        <section class="tree">
          <div class="tree-left">
            <div v-for="(item, index) in productData" :key="index" class="tree-left-item">
              <p :class="index === isActive ? 'cname-active cname' : 'cname'" @click="checkActive(index, item)">{{item.typeName}}</p>
              <transition name="uokodown">
                <section v-if="index === isSlide" class="childrenItem" ref="childrenItem">
                  <div v-for="(ctx, idx) in item.children" :key="idx" class="next-item" @click="checkChildrenActive(idx, ctx)">
                    <div><span :class="idx === isActiveChildrenOne ? 'circle-active' : ''"></span><p :class="idx === isActiveChildrenOne ? 'active' : ''">{{ctx.typeName}}</p></div>
                  </div>
                </section>
              </transition>
            </div>
          </div>
          <div class="tree-right">
            <transition name="van-slide-down">
              <section class="toast-box" v-if="showDialog">
                <div class="toast-content">
                  <div class="toast-title">
                    <span>全部分类</span>
                    <img src="@/assets/images/buyservice_icon_close.png" alt="" class="meun-icon" @click="closeDialog"/>
                  </div>
                  <div class="toast-main">
                  <span v-for="(meum, idx) in productThreeMeum" :key="idx" :class="isTreeMeumActive === idx ? 'three-active' : ''" @click="clickMeum(meum, idx)">{{meum.typeName}}</span>
                  </div>
                </div>
              </section>
            </transition>
            <section>
              <section class="product-name" v-if="productThreeMeum.length > 0">
                <div ref="typePanel">
                  <span
                    v-for="(meum, idx) in productThreeMeum"
                    :key="idx" :class="isTreeMeumActive === idx ? 'three-active' : ''"
                    @click="clickThreeMeum($event, meum, idx)"
                    :ref="'type' + idx"
                  >{{meum.typeName}}</span>
                </div>
                <img src="@/assets/images/buyservice_icon_more.png" alt="" class="meun-icon" @click="openDialog"/>
              </section>
              <section v-if="productItemData.length > 0">
                <div class="purchase-item" v-for="(item, index) in productItemData" :key="index">
                  <a @click="goodsClick('product', item.productId)">
                    <div class="purchase-left" v-lazy:background-image="item.productImgs && item.productImgs[0]">
                    </div>
                    <p  class="purchase-title">{{item.productName|| ''}}</p>
                    <p class="purchase-money" v-if ="item.typeId === 4">提成<span>{{item.commission}}</span></p>
                    <p class="purchase-money" v-else><span>{{item.price || 0}}</span>元</p>
                  </a>
                </div>
              </section>
              <section v-else class="list-no">
                <img src="@/assets/images/404.png" alt=""/>
                <p>暂无服务产品</p>
              </section>
            </section>
          </div>
        </section>
      </van-tab>
      <van-tab title="服务包">
        <section v-if="tableData.length > 0">
          <div class="purchase-item" v-for="(item, index) in tableData" :key="index">
            <a @click="goodsClick('pack', item.serviceId)">
              <div class="purchase-left" v-lazy:background-image="item.imgUrls && item.imgUrls[0]">
                <!-- <img :src="item.imgUrls[0]" alt=""/> -->
              </div>
              <p  class="purchase-title">{{item.serviceName|| 1}}</p>
              <p class="purchase-money"><span>{{item.price || 0}}</span>元</p>
            </a>
          </div>
        </section>
        <section v-else>
          <NoData tip="暂无服务包" :url="'/myHouse?entrustId=' + entrustId"/>
        </section>
      </van-tab>
      <van-tab disabled>
        <div slot="title" @click="chooseCity" class="pisition-tab">
          <span class="pisition">
            <van-icon :name="produciconLocationtName" size="16px"/> {{cityName}}
          </span>
        </div>
      </van-tab>
    </van-tabs>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import NoData from '@/components/NoData.vue';
import { getQueryString, addClass } from '@/utils/utils';
import { Tab, Tabs } from 'vant';
import { STATUS_NAME } from '@/config/config';
import { handleWebStorage } from '@/utils/utils';
import api from '@/api';
import { config } from '@vue/test-utils';

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
  public $refs!: {
    [key: string]: any,
    childrenItem: HTMLFormElement,
    typePanel: HTMLFormElement
  };

  private entrustId: string = ''; // 委托房源ID
  private cityId: string = '510100'; // 城市ID
  private cityName: string = '成都';
  private tableData: any[] = []; // 服务包列表
  private productData: any[] = []; // 服务产品列表
  private isActive: number = 0; // 默认选择第一项
  private isSlide: number = -1; // 默认不展开
  private needActivated: boolean = true; // 是否需要执行activated，默认第一次进来不需要执行是否需要执行activated，因为第一次进来只需要执行mounted
  private isActiveChildrenOne: number = -1; // 无默认选择
  private productItemData: any[] = []; // 分类下的服务产品
  private productName: string = ''; // 当前选中的二级name
  private produciconLocationtName: string = require('@/assets/images/icon/icon_location.png');
  private productThreeMeum: any[] = [];
  private showDialog: boolean = false; // 弹窗显示
  private isTreeMeumActive: number = -1; // 第三级菜单选中

  private mounted() {
    this.needActivated = false;
    this.entrustId = String(this.$route.query.entrustId)  === 'undefined' ? '' : String(this.$route.query.entrustId); // 无房源进入购买页面默认空
    this.cityId = String(this.$route.query.cityId) === 'undefined' ? '510100' : String(this.$route.query.cityId); // 默认成都市
    this.getProductList(this.cityId); // 获取服务包列表
  }
  private activated() {
    if (this.needActivated) {
      this.entrustId = String(this.$route.query.entrustId)  === 'undefined' ? '' : String(this.$route.query.entrustId); // 无房源进入购买页面默认空
      this.cityId = String(this.$route.query.cityId) === 'undefined' ? '510100' : String(this.$route.query.cityId); // 默认成都市
      this.getProductList(this.cityId); // 获取服务包列表
    } else {
      this.needActivated = true;
    }
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
   * @description 获取服务产品列表
   * @params cityId 城市id
   * @returns void
   * @author chenmo
   */
  private async getProductList(cityId: string) {
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
    try {
      const res: any = await this.axios.get(api.getProductList + `/${cityId}`);
      if (res && res.code === '000') {
        let firstProducts: any[] = []; // 初始化全部的服务产品
        this.productData = res.data;
        firstProducts = await this.traversal(res.data);
        this.productData.unshift({
          typeName: '全部',
          typeId: 0,
          products: firstProducts,
          children: []
        });
        // console.log(this.productData)
        this.isActive = 0; // 默认值
        this.isSlide = -1; // 收起
        this.productItemData = firstProducts; // 进入页面默认第一级全部
        // this.productName = res.data[0].productDetails.length > 0 ? res.data[0].productDetails[0].typeName : ''; // 默认第一条的name
      } else {
        this.$toast(`获取服务产品列表失败`);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.$toast.clear();
    }
  }

  /**
   * @description 循环递归取出全部服务产品
   * @params arr 传入的数组
   * @returns array
   * @author chenmo
   */
  private traversal(arr: any[]) {
    const product: any[] = [];
    for (const item of arr) {
     if (item.products.length > 0) {
      product.unshift(...item.products);
     }
    }
    return product;
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
   * @description 选择城市
   * @author linyu
   */
  private chooseCity() {
    console.log('城市选择暂未开放。');
  }

  /**
   * @description tabs切换
   * @params index 当前tabs的索引值
   * @returns null
   * @author chenmo
   */
  private onClick(index: any) {
    if (index === 0) {
      this.getProductList(this.cityId); // 获取服务产品
    } else if (index === 1) {
      this.getServiceList(this.cityId); // 获取服务包
    } else if (index === 2) {
      // this.getRentInfo(this.entrustId);
    }
  }

  /**
   * @description 选择tree
   * @params item 当前选择的item
   * @params index 当前选择的index
   * @returns null
   * @author chenmo
   */
  private checkActive(index: any, item: any) {
    this.isTreeMeumActive = -1; // 重置
    this.productThreeMeum = []; // 重置
    this.isActiveChildrenOne = -1; // 重置
    if (index === 0) {
      // 全部
      this.isSlide = index; // 展开
      this.isActive = index;
      this.productItemData = item.products;
    } else {
      if (index === this.isSlide) {
        this.isSlide = -1; // 再次点击收起
        this.productItemData = item.products.length > 0 ? item.products : []; // 当前选中的产品
        return false;
      } else {
        this.isSlide = index; // 展开
        this.isActive = index;
        this.productItemData = item.products && item.products.length > 0 ? item.products : []; // 当前选中的产品
        // this.productName = item.productDetails.length > 0 ? item.productDetails[0].typeName : '';
      }
    }
  }

  /**
   * @description 选择tree子选项
   * @params ctx 当前选择的index
   * @params item 当前选中的item
   * @returns null
   * @author chenmo
   */
  private checkChildrenActive(ctx: any, item: any) {
    this.isActiveChildrenOne = ctx;
    this.productItemData = item.products; // 当前选中的产品
    this.productName = item.typeName;
    this.productThreeMeum = item.children && item.children.length > 0 ? item.children : [];
    this.isTreeMeumActive = -1;
    // console.log(this.productThreeMeum);
  }

  /**
   * @description 滚动页面
   * @params scrollTop  距离顶部位置
   * @params isFixed 是否吸顶
   * @returns null
   * @author chenmo
   */
  private tabScroll(scrollTop: any, isFixed: any) {
    return {
      scrollTop: 0,
      isFixed : true
    };
  }

  /**
   * @description 选中服务包或者服务产品回调事件
   * @params serviceType  服务类型：product：服务产品；pack： 服务包
   * @params goodsId  服务包或者服务产品id
   * @returns null
   * @author chenmo
   */
  private goodsClick(serviceType: string, goodsId: string) {
    if (serviceType === 'pack') {
      handleWebStorage.setLocalData('serviceId', goodsId, 'sessionStorage');
      handleWebStorage.removeLocalData('productId', 'sessionStorage');
      this.$router.push('/serviceInfo?entrustId=' + this.entrustId);
    } else {
      handleWebStorage.setLocalData('productId', goodsId, 'sessionStorage');
      handleWebStorage.removeLocalData('serviceId', 'sessionStorage');
      this.$router.push('/productInfo?entrustId=' + this.entrustId);
    }
  }

  /**
   * @description 打开三级菜单dialog
   * @returns null
   * @author chenmo
   */
  private openDialog() {
    this.showDialog = true;
  }

  /**
   * @description 关闭三级菜单dialog
   * @returns null
   * @author chenmo
   */
  private closeDialog() {
    this.showDialog = false;
  }

  /**
   * @description 点击三级菜单
   * @params item  当前选中的三级菜单
   * @params idx 当前选中的三级菜单索引值
   * @params e
   * @returns null
   * @author chenmo
   */
  private clickThreeMeum(e: any, item: any, idx: number) {
    this.isTreeMeumActive = idx;
    this.productItemData = item.products || []; // 当前选中的产品
    this.showDialog = false;
  }

  /**
   * @description 点击三级菜单
   * @params item  当前选中的三级菜单
   * @params idx 当前选中的三级菜单索引值
   * @params e
   * @returns null
   * @author chenmo
   */
  private clickMeum(item: any, idx: number) {
    this.isTreeMeumActive = idx;
    this.productItemData = item.products || []; // 当前选中的产品
    this.showDialog = false;
    this.scrollTo(this.$refs[`type${idx}`][0].offsetLeft - 15);
  }

  /**
   * @description 滚动到某个位置
   * @params offsetLeft  偏移量
   * @returns null
   * @author chenmo
   */
  private scrollTo(offsetLeft: number) {
    this.$refs.typePanel.scrollTo(offsetLeft, 0);
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.purchase
  .purchase-item
    background $global-background
    padding vw(15) vw(15) 0
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
      min-height vw(50)
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 3
      overflow hidden
    .purchase-money
      text-align right
      padding-top vw(5)
      font-size 12px
      span
        color $text-color
        font-family PingFangSC-Semibold
        font-size 18px
        font-weight bold
        display inline-block
        padding-right vw(4)
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
      // .childrenItem
      //   overflow: hidden;
      //   max-height: 0;
      //   -webkit-transition: max-height .3s ease-in-out;
      //   transition: max-height .3s ease-in-out;
      .uokodown-enter-active
        transition: transform .3s
      .uokodown-enter
        transform: translate3d(0,-100%,0);
      .tree-left-item
        color $text-color
        font-size 14px
        // text-align center
        position relative
        .cname
          color $text-color
          // width vw(30)
          height vw(60)
          // margin 0 auto
          margin-left vw(10)
          display -webkit-flex
          display flex
          // justify-content center
          align-items center
        .cname-active
          font-weight bold
          color $main-color
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
          div
            height vw(60)
            color $text-color
            margin-left vw(10)
            display -webkit-flex
            display flex
            align-items center
            span
              display inline-block
              width vw(5)
              height vw(5)
              border-radius 50%
              background $disabled-color
              margin-right vw(5)
            .circle-active
              background $main-color
            p
              width vw(60)
              // height vw(40)
              display -webkit-box
              -webkit-box-orient vertical
              -webkit-line-clamp 2
              overflow hidden
            .active
              color $main-color       
    .tree-right
      max-height 100%
      overflow-y scroll
      position fixed
      top 44px
      left vw(80)
      right 0
      bottom 0
      margin-bottom vw(0)
      // background #fff
      .toast-box
        width 100%
        height 100%
        position fixed
        top 0
        left vw(80)
        background rgba(0,0,0,0.3)
        z-index 100
        .toast-content
          width 100% 
          position absolute
          top 44px
          right 0
          left 0
          background-color #fff
          .toast-title
            width 80%
            display flex
            justify-content space-between
            align-items center
            span
              font-size 15px
              color #000
              margin vw(10)
            img 
              display inline-block
              width vw(15)
              height 100%
              margin-right vw(15)
          .toast-main
            width 80%
            span
              display inline-block
              height vw(30)
              line-height vw(30)
              background #FAFAFA
              color $tip-text-color
              font-size 14px
              margin vw(10) vw(10)
              padding 0 vw(20)
              border-radius 4px
              text-align center
            .three-active
              background #FAF6F0
              color $main-color
      .product-name
        background #fff
        padding vw(15) 0 vw(15)
        padding-left vw(15)
        display flex
        align-items center
        // border-bottom 1px solid $tip-text-color
        div
          width vw(250)
          white-space nowrap
          overflow-x auto
          display inline-block
          span
            font-size 15px
            display inline-block
            color $tip-text-color
            margin-right vw(15)
          .three-active
            color $main-color
        .meun-icon
          display inline-block
          width vw(15)
          height 100%
          margin-right vw(15)
      .list-no
        text-align center
        margin-top vw(100)
        img
          display inline-block
          width vw(120)
        p
          color $text-color
          font-size 14px
  .van-tab--disabled
    max-width 23% !important
  .pisition-tab
    position relative
    &::after
      position absolute
      content ''
      display block
      top 11px
      left 0px
      height 21px
      width 1px
      background #e7e7e7
    i
      top 2px
</style>
