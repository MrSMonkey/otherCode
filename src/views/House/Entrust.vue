/*
 * @Description: 委托房源
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-09 14:52:19
 */

<template>
  <section>
    <section class="entrust">
      <section class="area">
        <CityInput @city-confirm="cityConfirm" :city-list="cityList"></CityInput>
        <div class="city">
          <div class="label">小&emsp;&emsp;区*</div>
          <div class="village">
            <van-field
              v-model="communityName"
              placeholder="请选择您爱屋所在的小区"
              type="text"
              readonly
              right-icon="arrow"
              @click-right-icon="toCommunity"
              @click="toCommunity"
            />
          </div>
        </div>
        <HouseDecorationInfo @on-change="selectItem"></HouseDecorationInfo>
      </section>
      <section class="area">
        <div class="city">
          <div class="label">您的称呼*</div>
          <div class="village">
            <van-field
              v-model="ownerName"
              placeholder="如何称呼您"
              type="text"
              clearable
            />
          </div>
        </div>
        <div class="city" v-if="!isLogin">
          <div class="label">联系方式*</div>
          <div class="village">
            <van-field
              v-model="ownerPhone"
              placeholder="您的联系电话"
              type="number"
              clearable
            />
          </div>
        </div>
        <div class="city" v-if="!isLogin">
          <div class="label just">验证码*</div>
          <div class="village">
            <van-field
              v-model="varityCold"
              placeholder="请输入验证码"
              type="number"
              clearable
            >
            <van-button slot="button" size="small" type="default" class="code-btn" v-if="!isphoneErr">获取验证码</van-button>
            <van-button slot="button" size="small" type="default" class="code-btn" v-if="isphoneErr && isDisabledVerfiyCodeBtn">重发({{time}})</van-button>
            <van-button slot="button" size="small" type="default" class="code-btn btn-active" v-if="isphoneErr && !isDisabledVerfiyCodeBtn" @click="getCode">获取验证码</van-button>
            </van-field>
          </div>
        </div>
      </section>
      <section class="step-guide">
        <HrTitle title="爱屋发布流程"></HrTitle>
        <div class="step-plant">
          <div v-for="(item, index) in houstFlow" :key="index" >
            <div class="icon-box">
              <img :src="item.img" :alt="item.text"/>
              <p>{{item.text}}</p>
            </div>
            <div class="step-line" v-if="index !== 0"></div>
          </div>
        </div>
      </section>
      <section>
        <van-button slot="button" size="large" type="default" class="entrust-btn bg-active" v-if="!isLogin && !isphoneErr || !ownerName || !isLogin && !isCodeErr || !communityName">立即提交</van-button>
        <van-button slot="button" size="large" type="default" class="entrust-btn" v-else @click="getSubmitData" :loading="loading" loading-text="提交中">立即提交</van-button>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Field, Row, Col, Button, List, Cell, Dialog } from 'vant';
import HrTitle from '@/components/HrTitle.vue';
import ConfirmBtn from '@/components/ConfirmBtn.vue';
import CityInput from '@/components/CityInput.vue';
import HouseDecorationInfo from '@/views/House/components/HouseDecorationInfo.vue';
import { handleWebStorage } from '@/utils/utils';
import {HOUSTFLOW} from '@/config/config';
import api from '@/api';

const namespace: string = 'global';

// 声明引入的组件
@Component({
  name: 'Entrust',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    CityInput,
    HouseDecorationInfo,
    [List.name]: List,
    [Cell.name]: Cell,
    [Dialog .name]: Dialog,
    HrTitle,
    ConfirmBtn
  }
})
// 类方式声明当前组件
export default class Entrust extends CommonMixins {
  private cityName: string = '成都市';
  private cityId: string = '510100';
  private code: string = '';
  private cityShow: boolean = false;
  private cityList: string[] = []; // 城市列表
  private active: number = 1; // 装修信息选中索引值
  private houstFlow: any = HOUSTFLOW;
  private loading: boolean = false;
  private finished: boolean = false;
  private isLogin: boolean = false; // 当前用户登录状态，true表示已登录
  private communityId: string = '';
  private communityName: string = '';
  private ownerName: string = ''; // 您的称呼
  private ownerPhone: string = ''; // 联系方式
  private isphoneErr: boolean = false; // 校验手机号
  private isDisabledVerfiyCodeBtn: boolean = false; // 验证码是否发送
  private time: number = 60;
  private routeName: string; // 保存当前页面路由的名字
  private varityCold: string = '';
  private isCodeErr: boolean = false; // 校验验证码
  private isGetPlot: boolean = false; // 判断是否请求了小区
  private sourceId: any = ''; // 来源渠道id
  private list: any[] = [];

  @Mutation('updateToken', { namespace }) private updateToken: any;
  @Getter('getUserInfo', { namespace }) private userInfo: any;

  private mounted() {
    this.sourceId = this.$route.query.sourceId;
    this.routeName = String(this.$route.name);
    this.getCitys(); // 获取城市
    const token: string = String(localStorage.getItem('siteToken'));
    this.isLogin = !!localStorage.getItem('siteToken');
  }

  /**
   * @description keep-alive缓存载入钩子函数
   * @returns void
   * @author linyu
   */
  private activated() {
    // 获取小区信息
    if (this.$route.params.communityId) {
      this.communityId = this.$route.params.communityId;
      this.communityName = this.$route.params.communityName;
    }
  }

  /**
   * @description 选择城市确认
   * @returns void
   * @author chenmo
   */
  private cityConfirm(item: any, index: number) {
    this.cityName = item.text;
    this.cityId = item.value;
    this.communityId = '';
    this.communityName = '';
    this.isGetPlot = false;
    this.cityShow = false;
  }

  private onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    }
  /**
   * @description 装修信息变更回调事件
   * @returns void
   * @author linyu
   */
  private selectItem(id: number) {
    this.active = id;
  }

  /**
   * @description 获取城市列表
   * @returns void
   * @author chenmo
   */
  private async getCitys() {
    try {
      const res: any = await this.axios.get(api.getCitys);
      if (res && res.code === '000') {
        this.cityList = res.data && res.data.map((item: any) => {
          return {
            text: item.cityName,
            value: item.id
          };
        });
      } else {
        this.$toast(res.msg || '获取城市失败');
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }

  private toCommunity() {
    this.$router.push({
      path: '/community',
      query: {
        cityId: this.cityId,
        routeName: this.routeName
      }
    });
  }

  /**
   * @description 获取验证码
   * @returns void
   * @author chenmo
   */
  private async getCode() {
    try {
      const res: any = await this.axios.post(api.getCode + `/${this.ownerPhone}`);
      if (res && res.code === '000') {
        this.startCountdown(); // 开始倒计时
      } else {
        this.$toast('获取验证码失败');
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }

  /**
   * @description // 显示倒计时
   * @params phone 手机号
   * @return void
   * @author chenmo
   */
  private startCountdown() {
    this.isDisabledVerfiyCodeBtn = true;
    const timer = setInterval(() => {
      this.time--;
      if (this.time === 0) {
        this.isDisabledVerfiyCodeBtn = false;
        this.time = 60;
        clearInterval(timer);
      }
    }, 1000);
  }

  /**
   * @description // 立即提交
   * @return void
   * @author chenmo
   */
  private getSubmitData() {
    if (!this.communityName) {
      this.$toast('请选择您爱屋所在的小区');
      return false;
    }

    if (!this.ownerName) {
      this.$toast('请输入您的姓名');
      return false;
    }

    // if (!this.ownerPhone) {
    //   this.$toast('请输入您的手机号');
    //   return false;
    // }
    if (this.isLogin) {
      this.submitData();
    } else {
      // 未登录先登录注册
      this.submitLogin();
    }
  }

  /**
   * @description 登录
   * @return void
   * @author chenmo
   */
  private async submitLogin() {
    try {
      const res: any = await this.axios.post(api.login, {
        mobile: this.ownerPhone,
        verificationCode: this.varityCold,
        registerSource: 1
      });
      this.loading = true;
      if (res && res.code === '000') {
        handleWebStorage.setLocalData('siteToken', res.data.access_token); // 本地存储token
        handleWebStorage.setLocalData('userId', res.data.userId); // 本地存储userId
        this.updateToken(res.data.access_token);
        this.submitData(); // 登录后提交房源信息
      } else {
        this.$toast(res.msg || '登录失败');
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.loading = false;
    }
  }

  private async submitData() {
    this.loading = true;
    const data: any = {
      cityId: this.cityId,
      cityName: this.cityName,
      communityId: this.communityId,
      communityName: this.communityName,
      decorationStatus: this.active,
      ownerName: this.ownerName,
      ownerPhone: this.isLogin ? (this.userInfo && this.userInfo.username) : this.ownerPhone,
      ownerUserId: localStorage.getItem('userId'),
      source: typeof(this.sourceId) === undefined ? '' : this.sourceId
    };
    this.$dialog.confirm({
          title: '提示',
          confirmButtonText: '立即查看',
          cancelButtonText: '暂不选择',
          className: 'dialogTips',
          message: `提交成功！资产管家会尽快与您联系，您可以在【我的房源】中选择资产管家`
        }).then(() => {
          // on confirm
          this.$router.push(`/house`); // 跳转到房源列表
        }).catch(() => {
          // on cancel 取消
          window.location.reload(); // 取消刷新页面
        });
    // try {
    //   const res: any = await this.axios.post(api.pushEntrust, data);
    //   if (res && res.code === '000') {
       
    //   } else {
    //     this.$toast(res.msg || '委托失败，请重试！');
    //   }
    // } catch (err) {
    //   throw new Error(err || 'Unknow Error!');
    // } finally {
    //   this.loading = false;
    // }
  }
  // Watch
  @Watch('ownerPhone')
  private handlerPhone(newVal: string) {
    if (newVal && /^1[345789]\d{9}$/.test(newVal)) {
      this.isphoneErr = true;
    } else {
      this.isphoneErr = false;
    }
  }

  @Watch('varityCold')
  private handlerCode(newVal: string) {
    if (newVal && /^\d{6}$/ .test(newVal)) {
      this.isCodeErr = true;
    } else {
      this.isCodeErr = false;
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/main.styl'
.entrust
  .area
    margin-bottom vw(10)
    .label
      display inline-block
      width 83px
      font-size 15px
      color $text-color
      padding-top vw(18)
      &::after
        content ''
        display inline-block
        width 100%
    .just
      text-align justify
    .city
      background $global-background
      height vw(55)
      padding vw(20)
      border-bottom 1px solid $bg-color-default
      display -webkit-flex
      display flex
      justify-content space-around
      align-items center
      .village
        width 90%
        .code-btn
          border 0
          font-size 15px
          color $tip-text-color
        .btn-active
          color $main-color
        .van-cell
          // padding: 0 15px;
          padding vw(10) vw(0) vw(10) vw(10) !important
          input
            font-size 15px
            color $text-color
            &::-webkit-input-placeholder
              color $disabled-color
          .van-field__label
            text-align justify
            span 
              display inline-block
              width 100%
              text-align justify
              color $text-color
              font-size 15px
  .step-guide
    margin-top vw(10)
    padding vw(20) 0
    background-color $global-background
    .step-plant
      position relative
      margin-top vw(32)
      display flex
      justify-content: space-around;
      .icon-box
        position relative
        text-align center
        img
          width vw(30)
        p
          color $main-color
          font-size 15px /* no */
          font-weight bold
      .step-line
        position relative
        right vw(46)
        bottom vw(30)
        width vw(30)
        border-top 1px solid $main-color /* no */
  .entrust-btn
    position absolute
    bottom 0
    left 0
    background $main-color
    color #fff
  .bg-active
    background $disabled-color
    color #fff
.dialogTips
  .van-dialog__content
    color #2C2D2E !important
</style>
