/*
 * @Description: 委托房源
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-04-04 13:57:46
 */

<template>
  <section>
    <section class="entrust" v-if="!showPlot">
      <section class="area">
        <div class="city">
          <div class="label">城&emsp;&emsp;市*</div>
          <div class="village">
            <van-field
              v-model="cityName"
              placeholder="请选择您爱屋所在城市"
              type="text"
              right-icon="arrow"
              readonly
              @click="cityShow = true"
              @click-right-icon="cityShow = true"
            />
          </div>
        </div>
        <div class="city">
          <div class="label">小&emsp;&emsp;区*</div>
          <div class="village">
            <van-field
              v-model="communityName"
              placeholder="请选择您爱屋所在的小区"
              type="text"
              readonly
              right-icon="arrow"
              @click-right-icon="toPlot"
              @click="toPlot"
            />
          </div>
        </div>
        <div class="fixture">
          <div class="label">装修情况*</div>
          <div class="check">
            <span v-for="(item, index) in houseSetting" :key="index" :class="item.id === active ? 'active' : ''" @click="selectItem(item.id)"> {{item.name}} </span>
          </div>
        </div>
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
    <section class="plot" v-else>
      <section class="search" v-if="showPlot">
        <van-field
          v-model="value"
          placeholder="请输入您爱屋所在的小区" 
          clearable
        />
      </section>
      <main class="main">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="item in list"
            :key="item"
            :title="item"
          />
        </van-list>
        <ul class="list" v-if="tableList.length > 0">
          <li v-for="item in tableList" :key="item.id" @click="selectPlot(item)" :class="item.id === plotAacive ? 'active' : ''">
            <span>{{item.communityName}}({{item.address}})</span>
            <img src="@/assets/images/icon/icon_select.png" alt="" v-if="item.id === plotAacive"/>
          </li>
        </ul>
        <div v-if="tableList.length === 0 && isGetPlot">
          <div class="noserch">
            <p class="noserch-title">未找到您输入的小区</p>
            <p class="tips">快速咨询，请点击拨打：10105288</p>
            <a href="tel:10105288">快速委托</a>
          </div>
        </div>
      </main>
      <confirmBtn 
        loadingText="保存中"
        cancelText="返回"
        @confirm="onOk"
        @plotCancel="plotCancel"
        :isActive="tableList.length > 0"
      >
        <template slot="confirm">
          <span>确认</span>
        </template>
      </confirmBtn>
      <!-- <section class="plot-footer">
        <a @click="plotCancel">返回</a>
        <a @click="onOk">确认</a>
      </section> -->
    </section>
    <!-- 城市弹窗 -->
    <van-popup v-model="cityShow" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        :columns="cityList"
        @confirm="cityConfirm"
        @cancel="cityShow = false"
        title="选择城市"
      />
    </van-popup>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Field, Row, Col, Button, List, Cell } from 'vant';
import HrTitle from '@/components/HrTitle.vue';
import ConfirmBtn from '@/components/ConfirmBtn.vue';
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
    [List.name]: List,
    [Cell.name]: Cell,
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
  private cityList: string[] = [];
  private active: number = 1;
  private plotAacive: number = -1;
  private houstFlow: any = HOUSTFLOW;
  private plot: string = ''; // 选择小区
  private showPlot: boolean = false;
  private value: string = '';
  private loading: boolean = false;
  private finished: boolean = false;
  private isLogin: boolean = false;
  private tableList: any[] = [];
  private communityId: string = '';
  private communityName: string = '';
  private selectData: any = {};
  private ownerName: string = '';
  private ownerPhone: string = '';
  private isphoneErr: boolean = false; // 校验手机号
  private isDisabledVerfiyCodeBtn: boolean = false; // 验证码是否发送
  private time: number = 60;
  private varityCold: string = '';
  private isCodeErr: boolean = false; // 校验验证码
  private isGetPlot: boolean = false; // 判断是否请求了小区
  private sourceId: any = ''; // 来源渠道id
  private list: any[] = [];
  private houseSetting: any[] = [
    {
      id: 1,
      name: '已装修',
    },
    {
      id: 0,
      name: '毛坯房',
    }
  ];

  @Mutation('updateToken', { namespace }) private updateToken: any;
  @Getter('getUserInfo', { namespace }) private userInfo: any;
  @Action('getUserInfo', { namespace }) private getUserInfo: any;

  private mounted() {
    this.sourceId = this.$route.query.sourceId;
    this.getCitys(); // 获取城市
    const token: string = String(localStorage.getItem('siteToken'));
    this.isLogin = !!localStorage.getItem('siteToken');
    if (this.isLogin) {
      this.getUserInfo();
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
    this.value = '';
    this.tableList = [];
    this.selectData = {};
    this.communityId = '';
    this.communityName = '';
    this.plotAacive = -1;
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
   * @description 获取城市列表
   * @returns void
   * @author chenmo
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

  private toPlot() {
    // this.$router.push(`/choicePlot?cityId=${this.cityId}`);
    // this.tableList = []; // 清空
    // this.value = '';
    this.showPlot = true;
  }

  /**
   * @description 获取小区
   * @returns void
   * @author chenmo
   */
  private async getPlotList() {
    if (this.value === '') {
      return false;
    }
    try {
      const res: any = await this.axios.get(api.getCommunityList + `/${this.cityId}/${this.value}`);
      if (res && res.code === '000') {
        this.tableList = res.data || [];
        this.isGetPlot = true; // 请求成功
      } else {
        this.$toast(res.msg);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }

  /**
   * @description 确认选中
   * @returns void
   * @author chenmo
   */
  private onOk() {
    if (this.value === '') {
      this.$toast('请输入您爱屋所在的小区');
    } else {
        if (Object.keys(this.selectData).length === 0) {
          // 未选择
          this.$toast('请选择您爱屋所在的小区');
        } else {
          // 选择
          this.communityId = this.selectData.id;
          this.communityName = this.selectData.communityName;
          this.showPlot = false;
        }
      // if (this.tableList.length === 0) {
      //   // 搜索的小区为[]
      //   this.communityId = '';
      //   this.communityName = this.value;
      //   this.showPlot = false;
      // } else {
      // }
    }
  }

  /**
   * @description 选择小区
   * @returns void
   * @author chenmo
   */
  private selectPlot(item: any) {
    this.plotAacive = item.id;
    this.selectData = item;
  }

  private plotCancel() {
    this.showPlot = false;
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
    try {
      const res: any = await this.axios.post(api.pushEntrust, data);
      if (res && res.code === '000') {
        this.$router.push('/house');
      } else {
        this.$toast(res.msg || '委托失败，请重试！');
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.loading = false;
    }
  }
  // Watch
  @Watch('ownerPhone')
  private handlerPhone(newVal: string) {
    if (newVal && /^1[345789]\d{9}$/.test(newVal)) {
      // this.$refs.phoneErrorInfo.innerHTML = '';
      this.isphoneErr = true;
    } else {
      this.isphoneErr = false;
     // this.$refs.phoneErrorInfo.innerHTML = '请输入正确的手机号';
    }
  }

  @Watch('varityCold')
  private handlerCode(newVal: string) {
    if (newVal && /^\d{6}$/ .test(newVal)) {
      // this.$refs.codeErrorInfo.innerHTML = '';
      this.isCodeErr = true;
    } else {
      this.isCodeErr = false;
      // this.$refs.codeErrorInfo.innerHTML = '请输入6位手机验证码';
    }
  }

  @Watch('value')
  private handlerValue(newVal: string) {
    if (newVal !== '') {
      // this.$refs.codeErrorInfo.innerHTML = '';
      // this.isCodeErr = true;
      this.getPlotList(); // 请求小区数据
    } else {
      this.isCodeErr = false;
      this.isGetPlot = false;
      this.tableList = []; // 清空查询
      this.plotAacive = -1;
      this.selectData = {};
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
    .fixture
      background $global-background
      height vw(55)
      padding vw(20)
      border-bottom 1px solid $separate-line-color
      display -webkit-flex
      display flex
      justify-content flex-start
      align-items center
      .check
        border: 1px solid $tip-text-color
        border-radius 4px
        margin-left vw(6)
        span
          display inline-block
          width vw(65)
          height vw(30)
          line-height vw(30)
          text-align center
          font-size 12px
          color $text-color
        .active
          background $main-color
          color #fff
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
 .plot
    // height 100%
    // background $global-background
    .search
      height vw(55)
      background $global-background
      padding-top vw(5)
      border-bottom 1px solid #eee
      position absolute
      top 0
      left 0
      width 100%
      z-index 1000
      .van-field
        font-size 14px
    .main
      margin-top vw(75)
      margin-bottom vw(70)
      .list
        margin-top vw(20)
        height vw(520)
        overflow-y scroll
        li
          background #fff
          height vw(45)
          width 100%
          line-height vw(45)
          color $text-color
          font-size 14px
          padding 0 vw(15)
          border-bottom 1px solid #eee
          display -webkit-flex
          display flex
          justify-content space-between
          align-items center
          span  
            width vw(320)
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
          img 
            display inline-block
            text-align right
            width vw(16)
            vertical-align middle
        .active
          // background $bg-color-default
          color $main-color
      .noserch
        margin-top vw(200)
        text-align center
        .noserch-title
          font-size 16px
          color $text-color
        .tips
          font-size 14px
          color $tip-text-color
          margin-top vw(20)
        a
          display inline-block
          border 1px solid $main-color
          color $main-color
          font-size 14px
          padding vw(5) vw(20)
          border-radius vw(4)
          margin-top vw(20)
    .plot-footer
      position absolute
      bottom 0
      left 0
      display -webkit-flex
      display flex
      justify-content space-between
      width 100%
      height vw(46)
      align-items center
      a
        display inline-block
        width 100%
        font-size 14px
        text-align center
        height 100%
        line-height vw(46)
        &:nth-child(1)
          background #fff
          color $main-color
        &:nth-child(2)
          background $main-color
          color #fff
</style>
