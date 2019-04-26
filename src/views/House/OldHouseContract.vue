/*
 * @Description: 房源合同
 * @Author: zhegu
 * @Date: 2019-04-24 10:19:15
 * @Last Modified by: zhegu
 * @Last Modified time: 2019-04-24 15:47:52
 */
<template>
  <section class="house-contract">
    <section class="header">
      <h1>天香 2栋3单元33楼3302号</h1>
      <span>2017-04-17 至 2019-04-16</span>
    </section>
    <section class="list">
      <h1>房东基础信息</h1>
      <section class="detail">
        <p>
          <span>房东姓名：</span>
          <span>吴美丽</span>
        </p>
        <p>
          <span>联系电话：</span>
          <span>13541053121</span>
        </p>
        <p>
          <span>房东邮箱：</span>
          <span>41671052@qq.com</span>
        </p>
        <p>
          <span>身份证号：</span>
          <span>51098019960129990</span>
        </p>
        <p>
          <span>房源编号：</span>
          <span>FY1804172BG2T01</span>
        </p>
        <p>
          <span>房源地址：</span>
          <span>天香2栋三单元33楼3302号</span>
        </p>
        <p>
          <span>通讯地址：</span>
          <span>吧啦啦啦啦阿</span>
        </p>
        <p>
          <span>有无代理人：</span>
          <span>无</span>
        </p>
      </section>
    </section>
    <section class="list">
      <h1>房源信息</h1>
      <section class="detail">
        <p>
          <span>房源户型：</span>
          <span>2室1厅1卫6</span>
        </p>
        <p>
          <span>证件类型：</span>
          <span>房产证</span>
        </p>
        <p>
          <span>证件编号：</span>
          <span>679320283-032-3329</span>
        </p>
        <p>
          <span>产权地址：</span>
          <span>天香3栋3单元33楼3302号</span>
        </p>
        <p>
          <span>抵押情况：</span>
          <span>有抵押</span>
        </p>
      </section>
    </section>
    <section class="list">
      <h1>付款规则</h1>
      <section class="detail">
        <p>
          <span>交付日期：</span>
          <span>2017-04-1</span>
        </p>
        <p>
          <span>装修期：</span>
          <span>30天</span>
        </p>
        <p>
          <span>房东产品：</span>
          <span>1002保底自定义</span>
        </p>
        <p>
          <span>计租期：</span>
          <span>22月</span>
        </p>
        <p>
          <span>支付周期：</span>
          <span>季付</span>
        </p>
        <p>
          <span>空置期：满</span>
          <span>满11计租月，空置期1月</span>
        </p>
        <p>
          <span>空置总月数：</span>
          <span>2月</span>
        </p>
        <p>
          <span>支付金额：</span>
          <span>第1年至第2年 保底1000元/月</span>
        </p>
        <p>
          <span>押 金：</span>
          <span>1000元</span>
        </p>
        <p>
          <span>首次付款日期：</span>
          <span>2018-04-17</span>
        </p>
        <p>
          <span>合同起始日期：</span>
          <span>2019-04-17</span>
        </p>
      </section>
    </section>
    <section class="list">
      <h1>支付账户</h1>
      <section class="detail">
        <p>
          <span>开户银行：</span>
          <span>中国银行</span>
        </p>
        <p>
          <span>开户银行支行：</span>
          <span>吧啦啦啦啦</span>
        </p>
        <p>
          <span>开户人姓名：</span>
          <span>二妮</span>
        </p>
        <p>
          <span>银行卡号：</span>
          <span>1212121212121212121</span>
        </p>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'OldHouseContract',
  components: {}
})
// 类方式声明当前组件
export default class OldHouseContract extends CommonMixins {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/main.styl';

.house-contract {
  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: vw(90);
    background: #fff;
    padding: 0 vw(15);
    margin-bottom: vw(10);

    h1 {
      font-size: 18px;
      color: $text-color;
      margin-bottom: vw(10);
    }

    span {
      font-size: 12px;
      color: $next-text-color;
    }
  }

  .list {
    background: #fff;
    padding: 0 vw(15);
    margin-bottom: vw(10);

    h1, .detail {
      width: 100%;
      font-size: 15px;
      color: $text-color;
    }

    h1 {
      height: vw(60);
      line-height: vw(60);
      border-bottom: 1px solid #eee;
    }

    .detail {
      p {
        padding-top: vw(15);
      }

      &:last-child {
        padding-bottom: vw(15);
      }
    }
  }
}
</style>
