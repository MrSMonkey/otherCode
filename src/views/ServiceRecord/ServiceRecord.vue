/*
 * @Description: 服务记录
 * @Author: zhegu
 * @Date: 2019-03-07 15:59:12
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-03-28 16:33:59
*/

<template>
  <section class="service-record">
    <div class="order">
      <h1 class="title">订单信息</h1>
      <div class="info">
        <p>订单号：{{data.orderInfo && data.orderInfo.orderNum || '无'}}</p>
        <p>服务房源：{{data.orderInfo && data.orderInfo.productHouseName || '无'}}</p>
        <p>产品名称：{{data.orderInfo && data.orderInfo.productName || '无'}}</p>
        <p>订单状态：{{data.orderInfo && data.orderInfo.orderStatusName || '无'}}</p>
        <p>开始日期：{{data.orderInfo && data.orderInfo.orderStartTime || '无'}}</p>
        <p v-if="data.orderInfo && data.orderInfo.orderType != 9">服务人员姓名：{{data.orderInfo && data.orderInfo.serviceUserNickname || '无'}}</p>
        <p v-if="data.orderInfo && data.orderInfo.orderType != 9">服务人员电话：<a v-if="data.orderInfo" :href="'tel:'+data.orderInfo.serviceUserPhone">{{data.orderInfo && data.orderInfo.serviceUserPhone || '无'}}</a></p>
        <p>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：{{data.orderInfo && data.orderInfo.buyersRemarks || '无'}}</p>
      </div>
    </div>
    <div class="log">
      <h1 class="title">订单日志</h1>
      <houseStatus :data="houseStatus"/>
    </div>
    <div class="btn">
      <router-link v-if="data.orderInfo && data.orderInfo.orderType != 9  && data.orderInfo.orderType != 2 && data.orderInfo.orderStatus === 4" :to="'/maintainChecked?orderId=' + orderId">去验收</router-link>
      <router-link v-if="data.orderInfo && data.orderInfo.orderType != 9  && data.orderInfo.orderType != 2 && (data.orderInfo.orderStatus === 1 || data.orderInfo.orderStatus === 10)" :to="'/confirmPay?orderId=' + orderId">去支付</router-link>
      <van-button  v-if="data.orderInfo && data.orderInfo.orderType === 9 && data.orderInfo.orderStatus === 4 && data.orderInfo.decType === 1" size="normal" type="default" @click="createBuildOrder">确认装修并支付装修款</van-button>
      <van-button  v-if="data.orderInfo && data.orderInfo.orderType === 9 && (data.orderInfo.orderStatus === 2 || data.orderInfo.orderStatus === 3 || data.orderInfo.orderStatus === 4) && data.orderInfo.decType === 2 && data.orderInfo.houseId" size="normal" type="default" @click="buildPass">确认验收</van-button>
      <van-button  v-if="data.orderInfo && data.orderInfo.orderType === 2 && data.orderInfo.orderStatus === 4"  size="normal" type="default" @click="cleanPass">去验收</van-button>
    </div> 
    <transition name="van-fade">
      <div class="mask" v-show="maskVisible" @click="changebuildPayVisible(false)"></div>
    </transition>
    <transition name="van-slide-up">
      <div class="buildpay-modal" v-if="buildPayVisible">
        <van-icon class="icon-close" name="cross" @click="changebuildPayVisible(false)"/>
        <h1>确认装修</h1>
        <div class="content">
          <p>
            <span>装修总报价</span>
            <span>{{buildOrderDetail.amount && parseFloat(buildOrderDetail.amount).toFixed(2) || '0.00'}}元</span>
          </p>
        </div>
        <div class="pay-btn">
          <van-button size="normal" type="default" @click="submitPay"  :loading="loading">去支付<span class="price">￥{{buildOrderDetail.amount && parseFloat(buildOrderDetail.amount).toFixed(2) || '0.00'}}</span></van-button>
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
import { Button, CellGroup, Field, Icon} from 'vant';
import HouseStatus from '../HouseDetail/components/HouseStatus.vue';
import { STATUS_NAME } from '@/config/config';
import api from '@/api';
const namespace: string = 'global';

// 声明引入的组件
@Component({
  name: 'ServiceRecord',
  components: {
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
  private buildPayVisible: boolean = false; // 装修模态框
  private desc: string = ''; // 不通过原因
  private houseStatus: any[] = []; // 维修日志
  private orderId: string = ''; // 订单id
  private entrustId: string = ''; // 房源id
  private buildOrderDetail: any = {}; // 被创建装修订单详情
  private loading: boolean = false; // 按钮loading
  @Action('payment', { namespace }) private payment: any;

  private mounted() {
    this.orderId = String(this.$route.query.orderId).split('?')[0];
    this.entrustId = String(this.$route.query.entrustId).split('?')[0];
    this.getServiceRecord(this.orderId); // 获取服务记录详情
  }
  /**
   * @description 获取服务记录
   * @params orderId 订单id
   * @returns void
   * @author zhegu
   */
  private async getServiceRecord(orderId: string) {
    // 初始化日志列表，避免出现重复数据
    this.houseStatus = [];
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
    try {
      const res: any = await this.axios.get(api.getServiceRecord  + `/${orderId}`);
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

  /**
   * @description 装修模态框显示/隐藏
   * @params boolean 布尔值
   * @returns void
   * @author zhegu
   */
  private  changebuildPayVisible(visible: boolean) {
    this.maskVisible = visible;
    this.buildPayVisible = visible;
    solveScrollBug(visible);
  }
  /**
   * @description 返回订单状态名
   * @params string 订单状态枚举值
   * @returns string
   * @author zhegu
   */
  private  returnOrderStatus(status: number) {
    return STATUS_NAME[status];
  }
  /**
   * @description 创建装修订单
   * @returns void
   * @author zhegu
   */
  private  async createBuildOrder() {
    try {
      const res: any = await this.axios.post(api.creatBuildOrder + `/${this.orderId}`);
      if (res && res.code === '000') {
        this.buildOrderDetail = res.data;
        this.changebuildPayVisible(true);
      } else {
        this.$toast(res.msg);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      setTimeout(() => {
        this.$toast.clear();
      }, 1000);
    }
  }
  /**
   * @description 支付
   * @params orderId 订单id
   * @params entrustId 房源id
   * @returns void
   * @author zhegu
   */
  private async submitPay() {
    try {
      const data  = {
        orderId: this.buildOrderDetail.orderId,
        returnURL: returnDomain() + 'ServiceRecord?orderId=' +  `${this.orderId}`
      };
      this.payment(data);
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.$toast.clear();
    }
  }
  /**
   * @description 通过装修服务验收
   * @params orderId 订单id
   * @params entrustId 房源id
   * @returns void
   * @author zhegu
   */
  private async buildPass() {
    this.$dialog.confirm({
      title: '验收',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      className: 'dialogTips',
      message: '确认验收通过吗？'
    }).then(async () => {
        try {
          const res: any = await this.axios.put(api.buildPass + `/${this.entrustId}` + `/${this.orderId}`);
          if (res && res.code === '000') {
            this.$toast.success(`验收通过`);
            this.getServiceRecord(this.orderId);
          } else {
            this.$toast(res.msg);
          }
        } catch (err) {
          throw new Error(err || 'Unknow Error!');
        } finally {
          setTimeout(() => {
            this.$toast.clear();
          }, 1000);
        }
    }).catch(() => {
          // on cancel 取消
    });
  }
  /**
   * @description 保洁验收
   * @returns void
   * @author zhegu
   */
  private async cleanPass() {
    this.$dialog.confirm({
          title: '验收',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          className: 'dialogTips',
          message: '确认验收通过吗？'
    }).then(async () => {
          // on confirm
        try {
          const res: any = await this.axios.put(api.cleanPass + `/${this.orderId}`);
          if (res && res.code === '000') {
            this.$toast.success(`验收通过`);
            this.getServiceRecord(this.orderId);
          } else {
            this.$toast(res.msg);
          }
        } catch (err) {
          throw new Error(err || 'Unknow Error!');
        } finally {
          setTimeout(() => {
            this.$toast.clear();
          }, 1000);
        }
    }).catch(() => {
          // on cancel 取消
    });

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/main.styl'
.service-record
  padding-bottom vw(70)
  .order,.log
    padding vw(15)
    background-color #fff
    color $text-color
    margin-bottom vw(10)
  .order
    .info 
      min-height vw(187)
      p
        font-size 15px
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
      font-size 17px
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
      font-size 17px
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
        font-size 17px
        &:nth-child(1)
          color #2c3d2e
        &:nth-child(2)
          color $main-color
  .buildpay-modal
    position fixed
    bottom 0
    width 100%
    height vw(250)
    background #fff
    z-index 200
    color $text-color
    .icon-close
      position absolute
      font-size 16px
      top vw(16)
      left vw(16)
      color #b8b8b8
    h1
      font-size 17px
      text-align center
      margin-top vw(11)
      padding-bottom vw(15)
      border-bottom 1px solid #e7e7e7
    .content
      padding vw(10) vw(15)
      p
        font-size 15px
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
          font-size 15px
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
        font-size 14px
        border 0
        .price 
          font-size 17px
.title
  font-size 16px
  margin-bottom vw(10)
  border-bottom 1px solid #e7e7e7
  padding-bottom vw(10)
.service-record .van-cell:not(:last-child)::after
    border 0
</style>
