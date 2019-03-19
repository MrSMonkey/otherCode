/*
 * @Description: 带看服务记录
 * @Author: zhegu
 * @Date: 2019-03-15 10:23:57
 * @Last Modified by: zhegu
 * @Last Modified time: 2019-03-15 16:52:16
 */

<template>
  <section class="service-record-look">
    <div class="order">
      <h1 class="title">订单信息</h1>
      <div class="info">
        <p>订单号：{{data.orderInfo && data.orderInfo.orderId}}</p>
        <p>服务房源：{{data.orderInfo && data.orderInfo.productHouseName}}</p>
        <p>产品名称：{{data.orderInfo && data.orderInfo.productName}}</p>
        <p>订单状态：{{data.orderInfo && data.orderInfo.orderStatus}}</p>
        <p>开始日期：{{data.orderInfo && data.orderInfo.orderStartTime}}</p>
        <p>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：{{data.orderInfo && data.orderInfo.buyersRemarks}}</p>
      </div>
    </div>
    <div class="order-type">
      <van-tabs  @click="chooseType">
        <van-tab v-for="(index,key) in 4" :title="'标签 ' + index" :key="key">
          <ul class="order-list">
            <li v-for="(index,key) in 9" :title="'标签 ' + index" :key="key">
              <div class="list-detail" @click="toDetail">
                <div>
                  <span>房间A</span>
                  <span>服务中</span>
                  <span><img src="../assets/images/icon/icon_arrow2.png" alt="" class="icon-right"/></span>
                </div>
                <span class="timer">2018-11-11 10:30</span>
              </div>
              <div class="list-btn">
                <van-button size="normal" type="default" @click="handlePay(index)">支付</van-button>
              </div>
            </li>
          </ul>
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
            <span>360元</span>
          </p>
        </div>
        <div class="pay-btn">
          <van-button size="normal" type="default" >共计应付<span class="price">￥360.00</span></van-button>
        </div>
      </div>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { solveScrollBug } from '@/utils/utils';
import ImagePreview from './components/ImagePreview/ImagePreview.vue';
import { Button, CellGroup, Field, Icon, Tabs, Tab } from 'vant';
import HouseStatus from './components/house/HouseStatus.vue';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'ServiceRecord',
  components: {
    ImagePreview,
    HouseStatus,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab
  }
})
export default class ServiceRecord extends CommonMixins {
  private data: any = {}; // 服务记录详情
  private maskVisible: boolean = false; // 遮罩层
  private nopassVisible: boolean = false; // 不通过模态框
  private payVisible: boolean = false; // 支付模态框
  private desc: string = ''; // 不通过原因
  private houseStatus: any[] = []; // 维修日志
  private orderId: string = ''; // 订单id
  private entrustId: string = ''; // 房源id

  private mounted() {
    this.orderId = String(this.$route.query.orderId);
    this.entrustId = String(this.$route.query.entrustId);
    this.getServiceRecord(this.entrustId, this.orderId); // 获取服务记录详情
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
    console.log('index', index);
    console.log('title', title);
  }
  /**
   * @description 支付
   * @params orderId 订单id
   * @returns void
   * @author zhegu
   */
  private  handlePay(orderId: string) {
    this.changePayVisible(true);
    console.log('orderId', orderId);
  }
  /**
   * @description 支付
   * @params orderId 订单id
   * @returns void
   * @author zhegu
   */
  private  toDetail(orderId: string) {
    this.$router.push('/ServiceOrderDetail'); // 跳转到服务详情
  }
  /**
   * @description 获取服务记录
   * @params orderId 订单id
   * @params entrustId 订单id
   * @returns void
   * @author zhegu
   */
  private async getServiceRecord(entrustId: string, orderId: string) {
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
    try {
      const res: any = await this.axios.get(api.getServiceRecord + `/${entrustId}` + `/${orderId}`);
      if (res && res.code === '000') {
        this.data = res.data || [];
        this.data.records.forEach( (element: any) => {
          this.houseStatus.push({content: element.record, createTime: element.workTime});
        });
      } else {
        this.$toast(`获取服务记录详情失败`);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.$toast.clear();
    }
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
      height vw(187)
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
