/*
 * @Description: 服务产品支付页面
 * @Author: chenmo
 * @Date: 2019-04-09 14:23:57
 * @Last Modified by: LongWei
 * @Last Modified time: 2019-05-06 17:55:02
 */


<template>
  <section >
    <div class="buy-dialog">
      <!-- @params productId = 118062916141300008 工程维修产品 && 118062916145800009 家电维修产品
      @params typeId = 9 装修设计产品id -->
      <div class="tips" v-if="data.productId === '118062916141300008' || data.productId === '118062916145800009' || data.cid === '118062916141300008' || data.cid === '118062916145800009'">
        <p>{{tips}}</p>
      </div>
      <div class="tips" v-else-if="data.typeId === 9">
        <p>{{tipsTwo}}</p>
      </div>
      <div class="el-input">
        <van-field
          v-model="houseName"
          label="房源"
          required
          type="text"
          input-align="right"
          placeholder="请选择房源"
          readonly
          right-icon="arrow"
          @click-right-icon="toHouse"
          @click="toHouse"
          v-if="!(entrustId !== '' && pre === 'productInfo')"
        />
        <van-field
          v-model="buyersName"
          required
          clearable
          label="联系人"
          input-align="right"
          placeholder="请输入联系人姓名"
          type="text"
        />
        <van-field
          v-model="buyersPhone"
          required
          clearable
          input-align="right"
          label="联系电话"
          placeholder="请输入联系人电话"
          type="number"
        />
        <!-- productUnitId === 1（次） housesUnitId === 1 （间）-->
        <van-field
          v-model="rooms"
          required
          clearable
          input-align="right"
          label="房间数"
          placeholder="请输入房间数量"
          type="number"
          @change="changeRooms"
          v-if="data.productUnitId === '1' && data.housesUnitId === '1'"
        >
        <!-- <span slot="button" >㎡</span> -->
        </van-field>
        <!-- productUnitId === 2（面积） -->
        <van-field
          v-model="area"
          required
          clearable
          input-align="right"
          label="面积"
          placeholder="请输入房屋面积"
          type="number"
          @change="changeAcreage"
          v-if="data.productUnitId === '2'"
        >
        <span slot="button" >㎡</span>
        </van-field>
        <!-- productUnitId === 9（小时） -->
        <van-field
          v-model="serviceHour"
          required
          clearable
          input-align="right"
          label="服务时长"
          placeholder="请输入服务时长（小时）"
          type="number"
          @change="changeHour"
          v-if="data.productUnitId === '9'"
        >
        <!-- <span slot="button" >小时</span> -->
        </van-field>
        <!-- productUnitId === 7 || 项、台 -->
        <van-field
          v-model="serviceCount"
          required
          clearable
          input-align="right"
          label="购买数量"
          placeholder="请输入购买数量"
          type="number"
          @change="changeCount"
          v-if="data.productUnitId === '7' || data.productUnitId === '8'"
        >
        <!-- <span slot="button" >小时</span> -->
        </van-field>
        <van-field
          v-model="introducePhone"
          clearable
          input-align="right"
          label="推荐人电话"
          placeholder="请输入推荐人电话"
          type="number"
        />
        <div class="dec">
          <p>备&emsp;&emsp;注</p>
          <van-field
            v-model="buyersRemarks"
            class="textarea"
            input-align="left"
            placeholder="请输入20字以内的备注"
            type="textarea"
            maxlength="20"
          />
        </div>
      </div>
      <confirmBtn 
        loadingText="购买中"
        cancelText="取消"
        :loading="loading"
        @confirm="clickBuy"
        @plotCancel="plotCancel"
        :isActive="!isActive"
      >
        <template slot="confirm">
          <span>购买应付
            <!-- 带看 -->
            <span class="plot-price" v-if="data.typeId === 4">¥0.00</span>
            <span class="plot-price" v-else>
              <span v-if ="data.productUnitId === '1' && data.housesUnitId === '0'"> ¥{{(data.price).toFixed(2)}}</span>
              <span v-else>¥{{productPrice}}</span>
            </span>
          </span>
        </template>
      </confirmBtn>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import ImagePreview from '@/components/ImagePreview.vue';
import ConfirmBtn from '@/components/ConfirmBtn.vue';
import { returnDomain } from '@/utils/utils';
import { STATUS_NAME, TIPSONE, TIPSTWO } from '@/config/config';
import { handleWebStorage } from '@/utils/utils';
import api from '@/api';
import { Loading, ErrorMsg } from '@/utils/decorators';

const namespace: string = 'global';

// 声明引入的组件
@Component({
  name: 'ProductPayment',
  components: {
    ImagePreview,
    ConfirmBtn
  }
})
// 类方式声明当前组件
export default class ProductPayment extends CommonMixins {
  private entrustId: string = ''; // 委托房源ID
  private cityId: string = ''; // 城市Id
  private productId: string = ''; // 服务包ID
  private data: any = {}; // 服务订单详情
  private buyersName: string = ''; // 联系人
  private buyersPhone: string = ''; // 手机号
  private buyersRemarks: string = ''; // 备注
  private bugVisible: boolean = false; // 购买弹窗
  private loading: boolean = false; // 提交加载
  private showDialog: boolean = false; // 提交加载
  private isphoneErr: boolean = false;
  private isintroducePhoneErr: boolean = false;
  private introducePhone: string = ''; // 推荐人联系电话
  private tips: string = TIPSONE;
  private tipsTwo: string = TIPSTWO;
  private pre: string = ''; // 判断入口
  private houseInfo: any = {}; // 房源信息
  private houseName: string = ''; // 房源名称
  private area: string = ''; // 房屋面积
  private rooms: string = ''; // 房间数
  private serviceHour: string = ''; // 服务时长
  private serviceCount: string = ''; // 购买数量
  private needActivated: boolean = true; // 是否需要执行activated，默认第一次进来不需要执行是否需要执行activated，因为第一次进来只需要执行mounted
  private productPrice: string = '0.00'; // 服务产品购买价格
  private isAreaErr: boolean = false;
  private isHourErr: boolean = false;
  private isserviceCountErr: boolean = false;
  private isRoomsErr: boolean = false;

  @Getter('getUserInfo', { namespace }) private userInfo: any;
  @Action('payment', { namespace }) private payment: any;

  // computed
  get isActive(): boolean {
    return !this.buyersName || !this.isphoneErr || (!!this.introducePhone && !this.isintroducePhoneErr) || !this.entrustId || ((this.data.productUnitId === '2') && !this.isAreaErr)
    || ((this.data.productUnitId === '9') && !this.isHourErr) || ((this.data.productUnitId === '7' || this.data.productUnitId === '8') && !this.isserviceCountErr) ||
    ((this.data.productUnitId === '1' && this.data.housesUnitId === '1') && !this.isRoomsErr);
  }

  // Watch
  @Watch('buyersPhone')
  private handlerPhone(newVal: string) {
    if (newVal && /^1[345789]\d{9}$/.test(newVal)) {
      this.isphoneErr = true;
    } else {
      this.isphoneErr = false;
      // this.$refs.phoneErrorInfo.innerHTML = '请输入正确的手机号';
    }
  }

  @Watch('area')
  private handlerArea(newVal: string) {
    if (newVal && /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(newVal)) {
      if (parseFloat(newVal) === 0) {
        this.isserviceCountErr = false;
        return;
      }
      this.isAreaErr = true;
    } else {
      this.isAreaErr = false;
    }
  }

  @Watch('serviceHour')
  private handlerServiceHour(newVal: string) {
    if (newVal && /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,1})?$/.test(newVal)) {
      if (parseFloat(newVal) === 0) {
        this.isserviceCountErr = false;
        return;
      }
      this.isHourErr = true;
    } else {
      this.isHourErr = false;
    }
  }

  @Watch('serviceCount')
  private handlerServiceCount(newVal: string) {
    if (newVal && /^(0|[1-9][0-9]*)$/.test(newVal)) {
      if (parseFloat(newVal) === 0) {
        this.isserviceCountErr = false;
        return;
      }
      this.isserviceCountErr = true;
    } else {
      this.isserviceCountErr = false;
    }
  }

  @Watch('rooms')
  private handlerRooms(newVal: string) {
    if (newVal && /^(0|[1-9][0-9]*)$/.test(newVal)) {
      if (parseFloat(newVal) === 0) {
        this.isserviceCountErr = false;
        return;
      }
      this.isRoomsErr = true;
    } else {
      this.isRoomsErr = false;
    }
  }

  @Watch('introducePhone')
  private handlerIntroducePhone(newVal: string) {
    if (newVal && /^1[345789]\d{9}$/.test(newVal)) {
      this.isintroducePhoneErr = true;
    } else {
      this.isintroducePhoneErr = false;
    }
  }

  private mounted() {
    this.needActivated = false;
    this.entrustId = String(this.$route.query.entrustId) === 'undefined' ? '' : String(this.$route.query.entrustId);
    this.productId = handleWebStorage.getLocalData('productId', 'sessionStorage');
    this.cityId = handleWebStorage.getLocalData('cityId', 'sessionStorage');
    this.pre = String(this.$route.query.pre);
    this.getProductDetail(); // 获取服务包详情
    this.buyersName = this.userInfo.realName;
    this.buyersPhone = this.userInfo.username;
    if (this.entrustId !== '') {
      this.getHouserInfo(this.entrustId);
    }
  }

  private activated() {
    if (this.needActivated) {
      this.entrustId = String(this.$route.query.entrustId) === 'undefined' ? '' : String(this.$route.query.entrustId);
      this.productId = handleWebStorage.getLocalData('productId', 'sessionStorage');
      this.cityId = handleWebStorage.getLocalData('cityId', 'sessionStorage');
      this.pre = String(this.$route.query.pre);
      this.buyersName = this.userInfo.realName;
      this.buyersPhone = this.userInfo.username;
      this.getProductDetail(); // 获取服务产品详情
      if (this.entrustId !== '') {
        this.getHouserInfo(this.entrustId);
      }
    } else {
      this.needActivated = true;
    }
  }

  /**
   * @description 获取服务房源信息
   * @params entrustId 委托id
   * @returns void
   * @author chenmo
   */
  private async getHouserInfo(entrustId: string) {
    try {
      const res: any = await this.axios.get(api.getHouserInfo + `/${entrustId}`);
      if (res && res.code === '000') {
        this.houseName = res.data.houseName;
      } else {
        this.$toast( res.msg || `获取服务房源失败`);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }

  /**
   * @description 选择房源
   * @params productId 服务产品id
   * @returns void
   * @author linyu
   */
  private toHouse() {
    this.$router.push({
      path: '/choiceHouse'
    });
  }

  /**
   * @description 获取服务产品详情
   * @returns void
   * @author chenmo
   */
  @Loading()
  @ErrorMsg('获取服务产品详情失败')
  private async getProductDetail() {
    try {
      const res: any = await this.axios.get(api.getProductDetail + `/${this.productId}/${this.cityId}`);
      if (res && res.code === '000') {
        this.data = res.data || {};
        /**
         * @params productId = 118062916141300008 工程维修产品 && 118062916145800009 家电维修产品
         * @params typeId = 9 装修设计产品id
         */
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      // this.$toast.clear();
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
   * @description 购买
   * @returns void
   * @author chenmo
   */
  private clickBuy() {
    if (!this.buyersName) {
      this.$toast('请输入联系人姓名');
      return false;
    }
    if (!this.buyersPhone) {
      this.$toast('请输入联系人电话');
      return false;
    }
    if (!/^1[345789]\d{9}$/.test(this.buyersPhone)) {
      this.$toast('请输入正确的联系人电话');
      return false;
    }
    this.submitData(this.buyersName, this.buyersPhone); // 提交数据
  }

  /**
   * @description 提交数据
   * @params name 联系人姓名
   * @params phone 联系人电话
   * @returns void
   * @author chenmo
   */
  private async submitData(name: string, phone: string) {
    const data: any = {
      entrustId: this.entrustId,
      buyersName: name,
      buyersPhone: phone,
      cityId: this.cityId,
      productId: this.productId,
      productName: this.data.productName,
      buyersRemarks: this.buyersRemarks,
      introducePhone: this.introducePhone,
      roomQuantity: (this.data.productUnitId === '1' && this.data.housesUnitId === '1') ? this.rooms : null,
      hour: this.data.productUnitId === '9' ? this.serviceHour : null,
      purchaseQuantity: (this.data.productUnitId === '7' || this.data.productUnitId === '8') ? this.serviceCount : null,
      acreage: this.data.productUnitId === '2' ? this.area : null,
    };
    this.loading = true;
    try {
      const res: any = await this.axios.post(api.buyProduct, data);
      if (res && res.code === '000') {
        this.$destroy();
        if (this.data.typeId === 4) {
          // 带看
          this.$toast.success('购买成功');
          setTimeout(() => {
            this.bugVisible = false;
            this.$router.push(`/productDetile?entrustId=${this.entrustId}&orderId=${res.data}&status=1`); // 跳转到订单详情
          }, 2000);
        } else {
          // status === 1 表示是从支付进入详情，需要弹出发起服务弹窗?entrustId=${this.entrustId}&orderId=${res.data}&status=1
          const status: string = this.data.typeId === 9 ? '2' : '1'; // 装修不需要发起服务
          const data  = {
            orderId: res.data,
            returnURL: `${returnDomain()}productDetile?entrustId=${this.entrustId}&orderId=${res.data}&status=${status}`,
          };
          this.payment(data);
        }
      } else {
        this.$toast(res.msg || '购买失败，请重试');
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.loading = false;
    }
  }

  private plotCancel() {
    history.back();
  }

  /**
   * @description 计算产品价格
   * @params 参数
   * @returns void
   * @author chenmo
   */
  private async countPrice(params: any ) {
    const data = Object.assign(params, {cityId: this.cityId});
    try {
      const res: any = await this.axios.post(api.countPrice, data);
      if (res && res.code === '000') {
        this.productPrice = res.data;
      } else {
        this.$toast(res.msg || '获取数据失败');
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }
  /**
   * @description 房间数输入
   * @returns void
   * @author chenmo
   */
  private changeRooms() {
    if (!this.rooms) {
      this.$toast('请输入房间数量');
      return false;
    }
    if (this.rooms === '0') {
      this.$toast('输入房间数量不能为0');
      return false;
    }

    if (!(/^\d+$/.test(this.rooms))) {
      this.$toast('房间数只能输入正整数');
      return false;
    }
    const params: any = {
      productId: this.productId,
      roomQuantity: this.rooms
    };
    this.countPrice(params);
  }

  /**
   * @description 面积输入
   * @returns void
   * @author chenmo
   */
  private changeAcreage() {
    if (!this.area) {
      this.$toast('请输入面积');
      return false;
    }

    if (this.area === '0') {
      this.$toast('请输入正确的面积');
      return false;
    }

    if (!(/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/).test(this.area)) {
      this.$toast('请输入正数');
      return false;
    }
    if (!(/^-?\d+\.?\d{0,2}$/.test(this.area))) {
      this.$toast('面积只能输入两位小数');
      return false;
    }
    const params: any = {
      productId: this.productId,
      acreage: this.area
    };
    this.countPrice(params);
  }

  /**
   * @description 服务时长输入
   * @returns void
   * @author chenmo
   */
  private changeHour() {
    if (!this.serviceHour) {
      this.$toast('请输入服务时长');
      return false;
    }

    if (this.serviceHour === '0') {
      this.$toast('请输入正确的服务时长');
      return false;
    }

    if (!(/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/).test(this.serviceHour)) {
      this.$toast('请输入正数');
      return false;
    }
    if (!(/^-?\d+\.?\d{0,1}$/.test(this.serviceHour))) {
      this.$toast('服务时长只能输入一位小数');
      return false;
    }
    const params: any = {
      productId: this.productId,
      hour: this.serviceHour
    };
    this.countPrice(params);
  }

  private changeCount() {
    if (!this.serviceCount) {
      this.$toast('请输入购买数量');
      return false;
    }
    if (parseFloat(this.serviceCount) === 0) {
      this.$toast('请输入正确的购买数量');
      return false;
    }

    if (!(/^(0|[1-9][0-9]*)$/).test(this.serviceCount)) {
      this.$toast('请输入正整数');
      return false;
    }

    const params: any = {
      productId: this.productId,
      purchaseQuantity: this.serviceCount
    };
    this.countPrice(params);
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .service-info
    padding 0 vw(0)
    width 100%
    height 100%
    background $global-background
    .serviceinfo-title
      font-size 16px
      color $text-color
      padding vw(12) vw(15)
      border-bottom: 1px solid $border-color-light
    .block
      font-size 15px
      color $text-color
      font-family PingFangSC-Regular
      padding vw(10) 0 0
      position relative
      span 
        position absolute
        top vw(10)
        left vw(15)
      p
        display inline-block
        margin-left vw(98)
        word-wrap break-word
        text-align justify
        width vw(240)
        max-height vw(160)
        overflow-y scroll
      img
        padding-bottom vw(20)
    .service-footer
      .service-btn
        width 100%
        position fixed
        bottom 0
        left 0
        background $main-color
        color #fff
  .buy-dialog
    height vw(300)
    .tips
      width 100%
      // height vw(40)
      background #FFF5F5
      padding vw(5) vw(5) vw(5) vw(15)
      p
        text-align left
        display inline-block
        font-size 12px
        color #FF5252
    .title
      display -webkit-flex
      display flex
      justify-content space-between
      align-items center
      padding vw(10)
      border-bottom: 1px solid $border-color-light
      .left
        img
          display inline-block
          width vw(18)
          padding-top vw(5)
      .content
        font-size 16px
        color $text-color
      .right
        color $main-color
        font-size 14px
    .el-input
      .van-field__label
        font-size 15px
        color $text-color
      input
        font-size 15px
        color $text-color
      .dec
        padding-top vw(15)
        background $global-background
        p
          padding-left vw(15)
          font-size 15px
          color $text-color
        .textarea
          textarea
            font-size 15px
            background #fafafa
            border-radius 4px
            padding vw(10)
            height vw(80)
    .plot-price
      display inline-block
      font-size 18px
      margin-left vw(6)
</style>
