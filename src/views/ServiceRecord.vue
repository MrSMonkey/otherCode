/*
 * @Description: 服务记录
 * @Author: zhegu
 * @Date: 2019-03-07 15:59:12
 * @Last Modified by: zhegu
 * @Last Modified time: 2019-03-14 20:06:33
*/

<template>
  <section class="service-record">
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
    <div class="log">
      <h1 class="title">订单日志</h1>
      <houseStatus :data="houseStatus"/>
    </div>
    <div class="btn">
      <router-link  :to="'/maintainChecked?orderId=' + orderId">去验收</router-link>
      <router-link  :to="'/confirmPay?orderId=' + orderId">去支付</router-link>
      <van-button size="normal" type="default" >确认支付</van-button>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { solveScrollBug } from '@/utils/utils';
import ImagePreview from './components/ImagePreview/ImagePreview.vue';
import { Button, CellGroup, Field, Icon } from 'vant';
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
    [Icon.name]: Icon
  }
})
export default class ServiceRecord extends CommonMixins {
  private data: any = {}; // 服务记录详情
  private maskVisible: boolean = false; // 遮罩层
  private nopassVisible: boolean = false; // 不通过模态框
  private decorateVisible: boolean = false; // 装修模态框
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
   * @description 不通过模态框显示/隐藏
   * @params boolean 布尔值
   * @returns void
   * @author zhegu
   */
  private  changeNopassVisible(visible: boolean) {
    this.maskVisible = visible;
    this.nopassVisible = visible;
    if (!visible) {
      this.decorateVisible = false;
    }
    solveScrollBug(visible);
  }
  /**
   * @description 装修模态框显示/隐藏
   * @params boolean 布尔值
   * @returns void
   * @author zhegu
   */
  private  changeDecorateVisible(visible: boolean) {
    this.maskVisible = visible;
    this.decorateVisible = visible;
    solveScrollBug(visible);
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
.service-record
  padding-bottom vw(70)
  .order,.log
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
  .mask
    position fixed
    width 100%
    height 100%
    background: rgba(71,71,71,0.80);
    z-index 100
    top 0
  .nopass-modal
    width vw(270)
    min-height vw(194)
    border-radius vw(10)
    background-color #fff
    position fixed
    top vw(230)
    left 0
    right 0
    margin auto
    z-index 200
    h1
      font-size vw(17)
      text-align center
      margin-top vw(15)
    .text
      width 90%
      background-color transparent
      border: 1px solid #E7E7E7;
      border-radius vw(5)
      margin vw(15) auto
      padding vw(5)
    .modal-btn
      width 100%
      height vw(50)
      line-height vw(50)
      border-top 1px solid #e7e7e7
      span
        display inline-block
        width 50%
        text-align center
        font-size vw(17)
        &:nth-child(1)
          color #2c3d2e
        &:nth-child(2)
          color $main-color
  .decorate-modal
    position fixed
    bottom 0
    width 100%
    height vw(250)
    background #fff
    z-index 200
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
        font-size vw(14)
        color #b8b8b8
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
      button
        width 100%
        background-color $main-color
        color #fff
        height vw(50)
        font-size vw(17)
        border 0
.title
  font-size vw(16)
  margin-bottom vw(10)
  border-bottom 1px solid #e7e7e7
  padding-bottom vw(10)
.service-record .van-cell:not(:last-child)::after
    border 0
</style>
