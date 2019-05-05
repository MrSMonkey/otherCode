/*
 * @Description: 我的账单
 * @Author: zhegu
 * @Date: 2019-04-24 10:19:15
 * @Last Modified by: LongWei
 * @Last Modified time: 2019-04-29 15:05:43
 */
<template>
  <section class="my-account">
    <div class="kefu">
      <router-link to="/customerService">
        <img src="../../assets/images/kefu.png">
      </router-link>
    </div>
    <section class="total">
      <p>{{houseCount}}套房屋，累计收入</p>
      <p>￥{{totalAmount}}</p>
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
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          v-show="list && list.length" 
        >
          <div class="tr" v-for="(item,index) in list" :key="index" @click="toLink(item.id)">
            <span>{{item.batchTitle}}</span>
            <span>¥{{item.amountPaid}}</span>
            <span>{{item.lastPayTime | dateFilter}}</span>
          </div>
        </van-list>
        <div v-show="list && list.length===0" class="no-account">
          暂无账单数据
        </div>
      </section>
   
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import api from '@/api';
import { List } from 'vant';
import { State, Getter, Mutation, Action } from 'vuex-class';
import { config } from '@vue/test-utils';

const namespace: string = 'global';

Vue.use(List);

// 声明引入的组件
@Component({
  name: 'OldMyAccount',
  components: {},
  filters: {
    dateFilter(date: string) {
      if (date) {
        return date.slice(0, 10);
      }
    },
  },
})
// 类方式声明当前组件
export default class OldMyAccount extends CommonMixins {
  private hosueId: string = ''; // 房源id
  private pageIndex: number = 1;
  private pageSize: number = 10;
  private finished: boolean = false;
  private loading: boolean = false;
  private list: any[] = []; // 房间详情
  private userPhone: string = ''; // 房东电话
  private houseCount: number = 0; // 房东房屋数
  private totalAmount: number = 0; // 房东实际收入
  private url: string = ''; // api地址

  private created() {
    console.log(this.$route.query.houseId, '11111111111');
    this.getAccountList();
    this.getUserHousecount();
  }

  // 获取 - 房源基本信息
  private async getAccountList() {
    if (this.$route.query.houseId) { // 房源账单列表
      this.hosueId = String(this.$route.query.houseId);
      this.url = `${api.geLandlordBillList}/${this.hosueId}/${this.pageIndex}/${this.pageSize}`;
    } else { // 房东账单列表
      this.url = `${api.getLandlordList}/${this.pageIndex}/${this.pageSize}`;
    }
    try {
      const res: any = await this.axios.get(this.url);
      if (res.code === '000') {
        const data = res.data;
        this.list = this.list.concat(data.items);
        if (this.pageIndex === data.pageAmount) {
          this.finished = true;
        }
        this.loading = false;
      }
      console.log(res, '房源基本信息');
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }

  // 获取 - 房间数和总收入
  private async getUserHousecount() {
    try {
      const res: any = await this.axios.get(`${api.getHousecount}`);
      if (res.code === '000') {
        const data = res.data;
        this.totalAmount = data ? data.totalAmount : 0;
        this.houseCount = data ? data.houseCount : 0;
      }
      console.log(res, '房东房源数和账单收入');
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }

  // 滚到底部加载更多
  private onLoad() {
    this.pageIndex++;
    this.getAccountList();
  }

  private toLink(id: string) {
    this.$router.push(`/OldAccountDetail?id=${id}`);
  }
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
  .no-account {
    text-align : center;
    padding :  vw(15) 0;
    font-size : 12px;
    color: $next-text-color;
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
