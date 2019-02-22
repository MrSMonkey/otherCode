/*
 * @Description: 提交房源
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-18 11:28:30
 */

<template>
  <section class="entrust">
    <section class="title">
      <h2>添加房屋信息</h2>
      <p>添加爱屋信息，更好地对房屋实施评估</p>
    </section>
    <section class="houseInfo">
      <van-field
        v-model="city"
        label="城市"
        placeholder="请选择城市"
        @click="cityShow = true"
      />
      <van-field
        v-model="code"
        label="小区名称"
        placeholder="请输入您爱屋所在的小区"
      />
    </section>
    <section class="title">
      <h2>留下联系方式</h2>
      <p>提交成功后，可以使用这个手机号登录查看房源动态</p>
    </section>
    <section class="houseInfo">
      <van-field
        v-model="city"
        label="姓名"
        placeholder="请输入您的称呼"
      />
      <!-- <van-field
        v-model="code"
        label="手机号"
        placeholder="请输入您的手机号码"
      />
      <van-field
        v-model="code"
        label="验证码"
        placeholder="请输入验证码"
      >
      <van-button slot="button" size="small" type="default" class="code-btn">获取验证码</van-button>
      </van-field> -->
    </section>
    <section class="title">
      <h2>其他联系方式（选填）</h2>
      <p>可以让资产管家更容易与您取得联系</p>
    </section>
    <section class="houseInfo">
      <van-field
        v-model="city"
        label="姓名"
        placeholder="请输入您的称呼"
      />
      <van-field
        v-model="code"
        label="手机号"
        placeholder="请输入您的手机号码"
      />
    </section>
    <section class="submit-btn">
      <van-button slot="button" size="large" type="default" class="code-btn">提交</van-button>
    </section>
    <!-- 城市弹窗 -->
    <van-popup v-model="cityShow" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="cityConfirm"
        @cancel="cityShow = false"
      />
    </van-popup>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Field, Row, Col, Button } from 'vant';
import {START_HOME_IMG} from '@/config/config';

// 声明引入的组件
@Component({
  name: 'entrust',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
  }
})
// 类方式声明当前组件
export default class Entrust extends CommonMixins {
  private city: string = '';
  private code: string = '';
  private cityShow: boolean = false;
  private columns: string[] = ['成都', '杭州', '武汉', '北京'];

  /**
   * @description 选择城市确认
   * @returns void
   * @author chenmo
   */
  private cityConfirm(value: any, index: number) {
    this.city = value;
    this.cityShow = false;
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
.entrust
  .title
    text-align center
    margin-top vw(27)
    h2
      font-size 18px
      color $text-color
    p
      color $next-text-color
      font-size 12px
      margin-top vw(5)
      font-weight lighter
  .houseInfo
    margin vw(30)
    .van-field__label
      color $text-color
      font-size 14px
      font-weight bold
      &::after
        content ''
        width 1px
        height 20px
        border-left 1px solid #f0f0f0
        position absolute
        top 13px
        left 88px
        z-index 1
        display block
    .van-field__body
      input
        color $text-color
        font-size 14px
        font-weight lighter
    .code-btn
      border 0 !important
      color $tip-text-color
      font-weight bold
      font-size 14px
  .submit-btn
    button
      background $main-color
      color #fff
</style>
