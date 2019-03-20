/*
 * @Description: 带看服务记录
 * @Author: zhegu
 * @Date: 2019-03-15 10:23:57
 * @Last Modified by: zhegu
 * @Last Modified time: 2019-03-20 20:57:13
 */

<template>
  <section class="service-record-look">
    <div class="order">
      <h1 class="title">订单信息</h1>
      <div class="info">
        <p>订单号：{{orderInfo && orderInfo.orderId}}</p>
        <p>服务房源：{{orderInfo && orderInfo.productHouseName}}</p>
        <p>产品名称：{{orderInfo && orderInfo.productName}}</p>
        <p>订单状态：{{orderInfo && returnOrderStatus(orderInfo.orderStatus)}}</p>
        <p>开始日期：{{orderInfo && orderInfo.orderStartTime}}</p>
        <p>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：{{orderInfo && orderInfo.buyersRemarks}}</p>
      </div>
    </div>
    <div class="order-type">
      <van-tabs  @click="chooseType">
        <van-tab v-for="(item,index) in workOrderStatusList" :title="item.msg" :key="index">
          <ul class="order-list" v-if="data.length > 0">
            <li v-for="(child,key) in data" :title="item.roomNumName" :key="key" @click="toDetail(child,key)">
              <div class="list-detail">
                <div>
                  <span>{{child.roomNumName}}</span>
                  <span>{{child.workOrderStatusName}}</span>
                  <span><img src="../assets/images/icon/icon_arrow2.png" alt="" class="icon-right"/></span>
                </div>
                <span class="timer">{{child.workTime}}</span>
              </div>
              <div v-if="child.workOrderStatus === 4" class="list-btn">
                <van-button size="normal" type="default" @click="handlePay($event,child)">支付</van-button>
              </div>
            </li>
          </ul>
          <section v-else>
            <NoData tip="暂无数据" />
          </section>
        </van-tab>
      </van-tabs>
    </div>
    <transition name="van-fade">
      <div class="mask" v-show="maskVisible" @click="changePayVisible(false)"></div>
    </transition>
    <transition name="van-slide-up">
      <div class="pay-modal" v-show="payVisible">
        <van-icon class="icon-close" name="cross" @click="changePayVisible(false)"/>
        <h1>支付</h1>
        <div class="content">
          <p>
            <span>应付金额</span>
            <span>{{orderInfo.orderAmount && parseFloat(orderInfo.orderAmount).toFixed(2) || '0.00'}}元</span>
          </p>
        </div>
        <div class="pay-btn">
          <van-button size="normal" type="default" @click="submitPay">共计应付<span class="price">￥{{orderInfo.orderAmount && parseFloat(orderInfo.orderAmount).toFixed(2) || '0.00'}}</span></van-button>
        </div>
      </div>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { handleWebStorage, solveScrollBug,  returnDomain } from '@/utils/utils';
import ImagePreview from './components/ImagePreview/ImagePreview.vue';
import { Button, CellGroup, Field, Icon, Tabs, Tab } from 'vant';
import HouseStatus from './components/house/HouseStatus.vue';
import NoData from '@/components/NoData.vue';
import api from '@/api';
import { SERVICE_ORDER_STATUS } from '@/config/config';
const namespace: string = 'global';

// 声明引入的组件
@Component({
  name: 'ServiceRecord',
  components: {
    ImagePreview,
    HouseStatus,
    NoData,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab
  }
})
export default class ServiceRecord extends CommonMixins {
  private data: any = []; // 服务记录详情
  private orderInfo: any = {}; // 服务记录详情
  private workOrderStatusList: any = {}; // 工单状态
  private maskVisible: boolean = false; // 遮罩层
  private nopassVisible: boolean = false; // 不通过模态框
  private payVisible: boolean = false; // 支付模态框
  private desc: string = ''; // 不通过原因
  private houseStatus: any[] = []; // 维修日志
  private orderId: string = ''; // 订单id
  private rowId: string = ''; // 当前服务订单id
  private statusId: string = '-1034'; // 当前服务类型id 默认全部
  private entrustId: string = ''; // 房源id
  @Action('payment', { namespace }) private payment: any;

  private mounted() {
    this.orderId = String(this.$route.query.orderId);
    this.entrustId = String(this.$route.query.entrustId);
    this.ServiceRecordLook(this.orderId); // 获取服务记录详情
  }
  /**
   * @description 获取服务记录
   * @params orderId 订单id
   * @params entrustId 订单id
   * @returns void
   * @author zhegu
   */
  private async ServiceRecordLook(orderId: string, workOrderStatus?: string) {
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
    try {
      let res: any = [];
      // 根据订单状态获取订单列表数据
      if (!workOrderStatus) {
        res = await this.axios.get(api.ServiceRecordLook  + `/${orderId}`);
      } else {
        res = await this.axios.get(api.ServiceRecordLook  + `/${orderId}` + `/${workOrderStatus}`);
      }
      if (res && res.code === '000') {
        // 判断是否 进行Tab切换操作
        if (!workOrderStatus) {
          // 设置订单信息
          this.orderInfo = res.data.orderInfo || {};
          // 对后天返回的订单状态顺序重组
          this.workOrderStatusList = res.data.workOrderStatusList.slice(0, 3);
          this.workOrderStatusList.unshift(res.data.workOrderStatusList[3]);
        }
        // 设置订单列表数据
        this.data = res.data.logList;
      } else {
        this.$toast(`获取服务记录失败`);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.$toast.clear();
    }
  }
  /**
   * @description 支付模态框显示/隐藏
   * @params boolean 布尔值
   * @returns void
   * @author zhegu
   */
  private  changePayVisible(visible: boolean) {
    this.maskVisible = visible;
    this.payVisible = visible;
    solveScrollBug(visible);
  }
  /**
   * @description 切换标签页
   * @params index 标签索引
   * @params title 标签标题
   * @returns void
   * @author zhegu
   */
  private  chooseType(index: string, title: string) {
    // 保存订单状态值
    this.statusId = this.workOrderStatusList[index].status;
    // 切换Tab时，重新请求订单列表数据
    this.ServiceRecordLook(this.orderId, this.workOrderStatusList[index].status);
  }
  /**
   * @description 显示支付模态框
   * @params orderId 订单id
   * @returns void
   * @author zhegu
   */
  private  handlePay(e: any, orderId: string) {
    e.stopPropagation();
    this.changePayVisible(true);
  }
  /**
   * @description 进入服务订单详情
   * @params item 服务订单信息
   * @returns void
   * @author zhegu
   */
  private  toDetail(item: string, index: string) {
    // 保存订单行列表索引
    this.rowId = index;
    // 跳转到服务订单详情
    this.$router.push('/ServiceOrderDetail?orderId=' + this.orderId + '&statusId=' + this.statusId + '&rowId=' + index);
  }
  /**
   * @description 支付
   * @params orderId 订单id
   * @params entrustId 订单id
   * @returns void
   * @author zhegu
   */
  private async submitPay() {
    try {
      const res: any = await this.axios.post(api.payment + `/${this.rowId}`);
      if (res && res.code === '000') {
        const data  = {
          orderId: res.data.orderId,
          productURL: returnDomain() + 'ServiceRecordLook?orderId=' +  `/${this.orderId}`
        };
        this.payment(data);
      } else {
        this.$toast(res.message);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.$toast.clear();
    }
  }
  /**
   * @description 返回订单状态名
   * @params string 订单状态枚举值
   * @returns string
   * @author zhegu
   */
  private  returnOrderStatus(status: number) {
    return SERVICE_ORDER_STATUS[status];
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
.service-record-look
  padding-bottom vw(10)
  display: flex;
  flex-direction: column;
  min-height: 100%
  .order
    padding vw(15)
    background-color #fff
    color $text-color
    margin-bottom vw(10)
  .order
    .info 
      min-height vw(187)
      p
        font-size vw(15)
        line-height vw(21)
        margin-bottom vw(10)
  .btn
    position fixed
    bottom 0
    width 100%
    button,a
      display inline-block
      background-color $main-color
      color #fff
      height vw(50)
      line-height vw(50)
      text-align center
      width 100%
      font-size vw(17)
    button
      border 0
  .order-type
    background-color #fff
    flex 1
    .van-tab span
      font-size vw(15)
    .order-list
      li
        display flex
        flex-direction row
        justify-content space-between
        padding vw(12) vw(15)
        border-bottom 1px solid #e7e7e7
        &:last-child
          border 0 
        .list-detail
          display flex
          flex-direction column
          font-size vw(15)
          color #474747
          .timer
            font-size vw(12)
            color #b8b8b8
            margin-top vw(5)
          img 
            display inline-block
            width vw(7)
            height vw(10)
            margin-left vw(6)
          span:first-child
            margin-right vw(6)
        .list-btn
          display flex
          flex-direction column
          justify-content flex-end
        button
          width vw(70)
          height vw(30)
          line-height vw(30)
          background-color $main-color
          border 0
          color #fff
          font-size vw(15)
  .mask
    position fixed
    width 100%
    height 100%
    background: rgba(71,71,71,0.80);
    z-index 100
    top 0
  .pay-modal
    position fixed
    bottom 0
    width 100%
    height vw(250)
    background #fff
    z-index 200
    color $text-color
    .icon-close
      position absolute
      font-size vw(16)
      top vw(16)
      left vw(16)
      color #b8b8b8
    h1
      font-size vw(17)
      text-align center
      margin-top vw(11)
      padding-bottom vw(15)
      border-bottom 1px solid #e7e7e7
    .content
      padding vw(10) vw(15)
      p
        font-size vw(15)
        display flex
        flex-direction row
        justify-content space-between
        border-bottom 1px solid #e7e7e7
        padding-bottom vw(12)
      ul
        width 100%
        padding-bottom vw(17)
        li
          display flex
          flex-direction row
          justify-content space-between
          border-bottom 1px solid #e7e7e7
          padding vw(12) 0
          font-size vw(15)
          color #474747
    .pay-btn
      position absolute
      bottom vw(10)
      left 0
      width 100%
      padding 0 vw(15)
      button
        width 100%
        background-color $main-color
        color #fff
        height vw(50)
        font-size vw(14)
        border 0
        .price 
          font-size vw(17)
.title
  font-size vw(16)
  margin-bottom vw(10)
  border-bottom 1px solid #e7e7e7
  padding-bottom vw(10)
.service-record .van-cell:not(:last-child)::after
    border 0
</style>
