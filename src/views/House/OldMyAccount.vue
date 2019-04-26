/*
 * @Description: 我的账单
 * @Author: zhegu
 * @Date: 2019-04-24 10:19:15
 * @Last Modified by: zhegu
 * @Last Modified time: 2019-04-24 15:26:51
 */
<template>
  <section class="my-account">
    <div class="kefu">
      <img src="../../assets/images/icon_empty.png">
    </div>
    <section class="total">
      <p>30套房屋，累计收入</p>
      <p>￥336500.50</p>
    </section>
    <section class="tit">
      <span>已收账单</span>
    </section>
    <section class="table">
      <div class="tr">
        <span>账单名称</span>
        <span>实收款</span>
        <span>实收款日期</span>
      </div>
      <div class="tr" v-for="(item,index) in list" :key="index">
        <span>{{item.name}}</span>
        <span>¥{{item.price}}</span>
        <span>{{item.time}}</span>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'OldMyAccount',
  components: {}
})
// 类方式声明当前组件
export default class OldMyAccount extends CommonMixins {
  private list: any[] = [
    { name: '第四期房东账单', price: '2000.00', time: '2019-02-01' },
    { name: '第四期房东账单', price: '2000.00', time: '2019-02-01' },
    { name: '第四期房东账单', price: '2000.00', time: '2019-02-01' }
  ]; // 房间详情
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/main.styl';

.my-account {
  .kefu {
    position: fixed;
    right: vw(15);
    top: vw(15);

    img {
      display: inline-block;
      width: vw(60);
      height: vw(60);
    }
  }

  .total {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: vw(90);
    padding: 0 vw(15);
    background: #fff;
    font-size: 12px;
    color: $next-text-color;
    margin-bottom: vw(10);

    p {
      &:nth-child(2) {
        font-size: 21px;
        color: $text-color;
        line-height: 26px;
        font-weight: bold;
        margin-left: -4px;
        margin-top: 5px;
      }
    }
  }

  .tit {
    height: vw(60);
    line-height: vw(60);
    background: #fff;
    border-bottom: 1px solid #eee;

    span {
      display: inline-block;
      width: vw(90);
      height: 100%;
      font-size: 15px;
      color: $main-color;
      border-bottom: 3px solid $main-color;
      text-align: center;
    }
  }

  .table {
    background: #fff;

    .tr {
      display: flex;
      flex-direction: row;
      justify-content: center;
      height: vw(50);
      line-height: vw(50);
      border-bottom: 1px solid #eee;
      font-size: 15px;
      color: $text-color;
      padding: 0 vw(15);

      &:nth-child(1) {
        font-weight: bold;
      }

      span {
        display: inline-block;
        width: 33.33%;
        overflow: hidden;

        &:nth-child(2) {
          text-align: center;
        }

        &:nth-child(3) {
          text-align: right;
        }
      }
    }
  }
}
</style>
