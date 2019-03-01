/*
 * @Description: 服务订单
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-20 17:59:00
 */

<template>
  <section>
    <section class="service-info" v-if="!bugVisible">
      <h2 class="serviceinfo-title">{{data.serviceName || '无'}}</h2>
      <div class="block">
        <span>产品单价：</span>
        <p>{{data && parseFloat(data.price).toFixed(2) || '0.00'}}元</p>
      </div>
      <div class="block">
        <span>服务产品：</span>
        <p v-for="(item, index) in data.productInfosBeans" :key="index">{{item.childProductName || '无'}}</p>
      </div>
      <div class="block">
        <span>咨询电话：</span>
        <p>{{data.phone || '无'}}</p>
      </div>
      <div class="block">
        <span>产品描述：</span>
        <p>{{data.desc || '无'}}</p>
      </div>
      <div class="block">
        <span>产品图片：</span>
        <p>&emsp;</p>
      </div>
      <div class="imgbox">
        <ImagePreview :imgagesArr="data.imgUrls"/>
      </div>
      <div class="service-footer">
        <van-button slot="button" size="large" type="default" class="service-btn" @click="buy">购买</van-button>
      </div>
    </section>
    <section v-else>
      <div class="buy-dialog">
        <div class="el-input">
          <van-field
            v-model="ownerName"
            required
            clearable
            label="联系人"
            input-align="right"
            placeholder="请输入联系人姓名"
            type="text"
          />
          <van-field
            v-model="ownerPhone"
            required
            clearable
            input-align="right"
            label="联系电话"
            placeholder="请输入联系人电话"
            type="number"
          />
          <van-field
            v-model="introducePhone"
            required
            clearable
            input-align="right"
            label="推荐人电话"
            placeholder="请输入推荐人电话"
            type="number"
          />
          <div class="dec">
            <p>备&emsp;&emsp;注</p>
            <van-field
              v-model="remark"
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
            <span>购买应付<span class="plot-price">¥{{parseFloat(data.price).toFixed(2)}}</span></span>
          </template>
        </confirmBtn>
        <!-- <section class="plot-footer">
          <van-button size="normal" type="default" @click="plotCancel">取消</van-button>
          <van-button size="normal" type="default"  @click="clickBuy" :loading="loading" loading-text="购买中">购买应付<span class="plot-price">¥{{parseFloat(data.price).toFixed(2)}}</span></van-button>
        </section> -->
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import ImagePreview from './components/ImagePreview/ImagePreview.vue';
import BuyModal from './components/service/BuyModal.vue';
import ConfirmBtn from '@/components/ConfirmBtn.vue';
import { STATUS_NAME } from '@/config/config';
import api from '@/api';

const namespace: string = 'global';

// 声明引入的组件
@Component({
  name: 'ServiceInfo',
  components: {
    ImagePreview,
    BuyModal,
    ConfirmBtn
  }
})
// 类方式声明当前组件
export default class ServiceInfo extends CommonMixins {
  private entrustId: string = ''; // 委托房源ID
  private serviceId: string = ''; // 服务包ID
  private data: any = {}; // 服务订单详情
  private ownerName: string = ''; // 联系人
  private ownerPhone: string = ''; // 手机号
  private remark: string = ''; // 备注
  private bugVisible: boolean = false; // 购买弹窗
  private loading: boolean = false; // 提交加载
  private showDialog: boolean = false; // 提交加载
  private isphoneErr: boolean = false;
  private isintroducePhoneErr: boolean = false;
  private introducePhone: string = ''; // 推荐人联系电话

  @Getter('getUserInfo', { namespace }) private userInfo: any;
  @Action('getUserInfo', { namespace }) private getUserInfo: any;

  // computed
  get isActive(): boolean {
    return !this.ownerName || !this.isphoneErr || !this.isintroducePhoneErr;
  }

  // Watch
  @Watch('ownerPhone')
  private handlerPhone(newVal: string) {
    if (newVal && /^1[345789]\d{9}$/.test(newVal)) {
      this.isphoneErr = true;
    } else {
      this.isphoneErr = false;
      // this.$refs.phoneErrorInfo.innerHTML = '请输入正确的手机号';
    }
  }

  @Watch('introducePhone')
  private handlerIntroducePhone(newVal: string) {
    if (newVal && /^1[345789]\d{9}$/.test(newVal)) {
      this.isintroducePhoneErr = true;
    } else {
      this.isintroducePhoneErr = false;
      // this.$refs.phoneErrorInfo.innerHTML = '请输入正确的手机号';
    }
  }

  private mounted() {
    this.entrustId = String(this.$route.query.entrustId);
    this.serviceId = String(this.$route.query.serviceId);
    this.getServiceDetils(this.serviceId); // 获取服务包详情
    this.getUserInfo(); // 获取用户信息
  }

  /**
   * @description 获取服务包详情
   * @params serviceId 服务包id
   * @returns void
   * @author chenmo
   */
  private async getServiceDetils(serviceId: string) {
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
    try {
      const res: any = await this.axios.get(api.getServiceDetils + `/${serviceId}`);
      if (res && res.code === '000') {
        this.data = res.data || [];
      } else {
        this.$toast.fail(`获取服务包详情失败`);
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
   * @description 关闭dialog
   * @returns string
   * @author chenmo
   */
  private cancel() {
    this.bugVisible = false;
  }

  /**
   * @description 购买
   * @returns string
   * @author chenmo
   */
  private buy() {
    this.bugVisible = true;
    console.log(this.userInfo);
    this.ownerName = this.userInfo.nickName;
    this.ownerPhone = this.userInfo.username;
  }

  /**
   * @description 购买
   * @returns void
   * @author chenmo
   */
  private clickBuy() {
    if (!this.ownerName) {
      this.$toast('请输入联系人姓名');
      return false;
    }
    if (!this.ownerPhone) {
      this.$toast('请输入联系人电话');
      return false;
    }
    if (!/^1[345789]\d{9}$/.test(this.ownerPhone)) {
      this.$toast('请输入正确的联系人电话');
      return false;
    }

    if (!/^1[345789]\d{9}$/.test(this.introducePhone)) {
      this.$toast('请输入正确的推荐人电话');
      return false;
    }

    this.submitData(this.ownerName, this.ownerPhone); // 提交数据
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
      ownerName: name,
      ownerPhone: phone,
      productId: this.serviceId,
      price: this.data.price,
      title: this.data.serviceName,
      remark: this.remark,
    };
    this.loading = true;
    try {
      const res: any = await this.axios.post(api.buyService, data);
      if (res && res.code === '000') {
        this.$toast.success('购买成功');
        this.bugVisible = false;
        setTimeout(() => {
          this.$router.push(`/myHouse?entrustId=${this.entrustId}`); // 跳转到房源列表
        }, 3000);
      } else {
        this.$toast.fail('购买失败，请重试');
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.loading = false;
    }
  }

  private plotCancel() {
    this.bugVisible = false;
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
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
      font-family: PingFangSC-Regular;
      padding vw(10) 0 0
      position relative
      span 
        position absolute
        top vw(10)
        left vw(15)
      p
        display inline-block
        margin-left vw(88)
        word-wrap break-word
        text-align justify
        width vw(240)
        max-height vw(100)
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
