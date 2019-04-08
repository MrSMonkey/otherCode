<template>
    <section>
        <div class="city">
          <div class="label">城&emsp;&emsp;市*</div>
          <div class="village">
            <van-field
              v-model="cityName"
              placeholder="请选择您爱屋所在城市"
              type="text"
              right-icon=""
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
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Field, Row, Col, Button } from 'vant';
import ConfirmBtn from '@/components/ConfirmBtn.vue';
import { handleWebStorage } from '@/utils/utils';
import api from '@/api';

// 声明引入的组件
@component({
  name: 'HouseBasicInfo',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    ConfirmBtn
  }
})

// 类方式声明当前组件
export default class HouseBasicInfo extends CommonMixins {
  private cityName: string = '成都市';
  private cityId: string = '510100';
  private code: string = '';
  private cityShow: boolean = false;
  private cityList: string[] = [];
  private active: number = 1;
  private plotAacive: number = -1;
  private plot: string = ''; // 选择小区
  private showPlot: boolean = false;
  private value: string = '';
  private loading: boolean = false;
  private finished: boolean = false;
  private isLogin: boolean = false;
  private tableList: any[] = [];
  private communityId: string = '';
  private communityName: string = '';
  private isGetPlot: boolean = false; // 判断是否请求了小区
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
    
</style>

