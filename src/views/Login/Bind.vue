/*
 * @Description: 登陆页面
 * @Author: chenmo
 * @Date: 2019-02-15 13:42:19
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-20 15:58:52
 */
<template>
  <section class="login">
    <h1>登录</h1>
    <section class="el-input">
      <p class="tip">手机号<span>(*新用户初次登录将自动注册)</span></p>
      <div style="marginBottom: 20px" class="phone">
        <van-field
          v-model="phone"
          placeholder="请输入手机号"
          type="text"
          clearable
        />
        <p class="error-info" ref="phoneErrorInfo"></p>
      </div>
      <p class="tip">验证码</p>
      <section>
        <section class="code-box">
          <div class="code">
            <van-field
              v-model="code"
              type="text"
              placeholder="验证码"
              clearable
            />
            <p class="error-info" ref="codeErrorInfo"></p>
          </div>
          <div>
            <van-button slot="button" size="normal" type="default" class="btn" v-if="!isphoneErr">获取验证码</van-button>
            <span v-else>
              <van-button slot="button" size="normal" type="default" class="btn" v-if="isDisabledVerfiyCodeBtn">重发({{time}})</van-button>
              <van-button slot="button" size="normal" type="default" class="btn active" v-else @click="getCode">获取验证码</van-button>
            </span>
          </div>
        </section>
        
      </section>
      <van-button slot="button" size="large" type="default" class="login-btn" v-if="!isphoneErr || !isCodeErr">登录</van-button>
      <van-button slot="button" size="large" type="default" class="login-btn-active" v-else @click="submitLogin" loading-text="登录中..." :loading="loading">登录</van-button>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { handleWebStorage } from '@/utils/utils';
import { Field, Row, Col, Button } from 'vant';
import api from '@/api';
// global vuex
const namespace: string = 'global';
// 声明引入的组件
@Component({
  name: 'Bind',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
  }
})
// 类方式声明当前组件
export default class Bind extends CommonMixins {
   public $refs!: {
    [key: string]: any,
    phoneErrorInfo: HTMLFormElement,
  };

  @Mutation('updateToken', { namespace }) private updateToken: any;

  private phone: string = '';
  private code: string = '';
  private isphoneErr: boolean = false; // 校验手机号
  private isCodeErr: boolean = false; // 校验验证码
  private loading: boolean = false; // 登陆按钮loading
  private time: number = 60;
  private isDisabledVerfiyCodeBtn: boolean = false; // 验证码是否发送

  /**
   * @description 获取验证码
   * @returns void
   * @author chenmo
   */
  private async getCode() {
    try {
      const res: any = await this.axios.post(api.getCode + `/${this.phone}`);
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
   * @description 登录
   * @return void
   * @author chenmo
   */
  private async submitLogin() {
    try {
      const res: any = await this.axios.post(api.login, {
        mobile: this.phone,
        verificationCode: this.code,
        registerSource: 1
      });
      this.loading = true;
      if (res && res.code === '000') {
        handleWebStorage.setLocalData('siteToken', res.data.access_token); // 本地存储token
        handleWebStorage.setLocalData('userId', res.data.userId); // 本地存储userId
        this.updateToken(res.data.access_token);
        this.$router.push('/house'); // 跳转到房源列表
      } else {
        this.$toast(res.msg || '登录失败');
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.loading = false;
    }
  }
  // Watch
  @Watch('phone')
  private handlerPhone(newVal: string) {
    if (newVal && /^1[345789]\d{9}$/.test(newVal)) {
      this.$refs.phoneErrorInfo.innerHTML = '';
      this.isphoneErr = true;
    } else {
      this.isphoneErr = false;
      this.$refs.phoneErrorInfo.innerHTML = '请输入正确的手机号';
    }
  }

  @Watch('code')
  private handlerCode(newVal: string) {
    if (newVal && /^\d{6}$/ .test(newVal)) {
      this.$refs.codeErrorInfo.innerHTML = '';
      this.isCodeErr = true;
    } else {
      this.isCodeErr = false;
      this.$refs.codeErrorInfo.innerHTML = '请输入6位手机验证码';
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/main.styl'
.login
  padding vw(20)
  min-height 100%
  background $global-background
  h1
    font-size 34px
    color $next-text-color
    margin-bottom vw(20)
  .el-input
    .tip
      font-family PingFang-SC-Medium
      font-size 12px
      color $tip-text-color
      margin-bottom 6px
      span
        color $main-color
    .error-info
      color $warning-color
      font-size 12px
      margin-top vw(6)
    .phone
      flex 1
      -webkit-appearance none
      border none
      outline none
      height 56px
      font-size 14px /* no */
      color #474747
      background #f8f8f8
      border 1px solid #f8f8f8
      padding-top vw(5) 
      width 100%
      border-radius 4px
      .van-field 
        background #f8f8f8
        &::after
          border-bottom: 0 !important
    .code-box
      display -webkit-flex
      display flex
      justify-content space-between
      .code
        flex 1
        -webkit-appearance none
        border none
        outline none
        height 56px
        font-size 14px /* no */
        color #474747
        background #f8f8f8
        border 1px solid #f8f8f8
        padding-top vw(5) 
        border-radius 4px
        margin-right vw(20)
        width 50%
        .van-field 
          background #f8f8f8
          display inline-block
          &::after
            border-bottom: 0 !important
      .btn 
        height 56px
        line-height 56px
        color #fff
        background-color rgb(216, 216, 216)
        border-radius 4px
        padding 0 30px
      .active
        background $main-color
    .login-btn
      color #fff
      background rgb(216, 216, 216)
      border-radius 4px
      margin-top vw(20)
    .login-btn-active
      color #fff
      background $main-color
      border-radius 4px
      margin-top vw(20)
</style>
