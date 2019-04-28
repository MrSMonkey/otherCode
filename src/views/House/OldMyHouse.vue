/*
 * @Description: 我的房源
 * @Author: zhegu
 * @Date: 2019-04-24 10:19:15
 * @Last Modified by: LongWei
 * @Last Modified time: 2019-04-28 17:44:11
 */
<template>
  <section class="my-house">
    <section class="banner">
      <p>{{houseBaseInfo && houseBaseInfo.communityName}}</p>
      <p>合同周期：{{houseBaseInfo && houseBaseInfo.startDate | dateFilter}}至{{houseBaseInfo && houseBaseInfo.endDate | dateFilter}}</p>
    </section>
    <section class="type">
      <div v-for="(item,index) in typeList" :key="index" @click="toLink(item.name)">
        <img :src="item.img">
        <span>{{item.name}}</span>
      </div>
    </section>
    <section class="income" >
      <p>房源累计收入</p>
      <p>￥{{totalAccount}}</p>
    </section>
    <section class="card">
      <van-swipe :width="300" :loop="false" :show-indicators="false">
        <van-swipe-item v-for="(item,index) in detailList" :key="index">
          <section class="detail">
            <h1>{{item.roomName }}</h1>
            <p>{{item.mainTenantName}}</p>
            <p>{{item.gender}}</p>
            <p>{{getAge(item.birthday)}}岁</p>
            <p>租期：{{item.contractBeginDate | dateFilter}}至{{item.contractEndDate | dateFilter}}</p>
            <div class="avatar">
              <template v-if="item.avatar">
                <img v-if="item.gender === '男'" :src="item.avatar">
              </template>
              <template v-else>
                <img v-if="item.gender === '男'" src="../../assets/images/icon_boy.png">
                <img v-else src="../../assets/images/icon_girl.png">
              </template>
            </div>
          </section>
        </van-swipe-item>
      </van-swipe>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { State, Getter, Mutation, Action } from 'vuex-class';
import { Swipe, SwipeItem } from 'vant';
import api from '@/api';
import { getAge } from '@/utils/utils';

const namespace: string = 'global';

// 声明引入的组件
@Component({
  name: 'OldMyHouse',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  filters: {
    dateFilter(date: string) {
      if (date) {
        return date.slice(0, 10);
      }
    },
  },
})
// 类方式声明当前组件
export default class OldMyHouse extends CommonMixins {
  @Mutation('updateOldHouseBaseInfo', { namespace }) private updateOldHouseBaseInfo: any;
  private hosueId: string = ''; // 房源id
  private typeList: any[] = [
    {
      name: '房源账单',
      img: require('../../assets/images/icon/icon_bill.png'),
      to: `/OldMyAccount?houseId=${this.hosueId}`,
    },
    {
      name: '房源合同',
      img: require('../../assets/images/icon/icon_bill.png'),
      to: '/'
    },
    {
      name: '房源照片',
      img: require('../../assets/images/icon/icon_photo.png'),
      to: '/'
    }
  ]; // 房源类型
  private detailList: any[] = [
    {
      t: '房间A',
      sex: 1,
      name: '张**',
      age: 23,
      startTime: '2018-01-01',
      endTime: '2019-02-01'
    },
    {
      t: '房间B',
      sex: 2,
      name: '王*',
      age: 23,
      startTime: '2018-01-01',
      endTime: '2019-02-01'
    }
  ]; // 房间详情
  private houseBaseInfo: any = {}; // 房源基本信息
  private getAge: any = '';
  private totalAccount: number = 0; // 房源累计收入

  private created() {
    this.getAge = getAge;
    if (this.$route.query.houseId) {
      this.hosueId = String(this.$route.query.houseId);
    } else {
      this.hosueId = 'EDD95BEF1BF8449C876C769EE714340C';
    }
    this.getHouseInfo();
    this.getHouseRoomsInfo();
    this.getHouseAccount();
  }

  // 获取 - 房源基本信息
  private async getHouseInfo() {
    try {
      const res: any = await this.axios.get(`${api.getOldHouseInfo}/${this.hosueId}`);
      if (res.code === '000') {
        this.houseBaseInfo = res.data;
        this.updateOldHouseBaseInfo(res.data); // 更新vuex中的旧业主房源信息 - 因为账单接口中没有房源基础信息 - 只能全局使用
      }
      console.log(res, '房源基本信息');
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }

  // 获取 - 房源信息 - 房间信息
  private async getHouseRoomsInfo() {
    try {
      const res: any = await this.axios.get(`${api.getOldHouseRoomsInfo}/${this.hosueId}`);
      if (res.code === '000') {
        this.detailList = res.data;
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }

  // 获取 - 房源累计收入
  private async getHouseAccount() {
    try {
      const res: any = await this.axios.get(`${api.getHouseTotalAccount}/${this.hosueId}`);
      if (res.code === '000') {
        this.totalAccount = res.data.totalAmount;
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }

  private toLink(name: any) {
    if (name === '房源账单') {
      this.$router.push(`/OldMyAccount?houseId=${this.hosueId}`);
    }
    if (name === '房源合同') {
      this.$router.push(`/OldHouseContract?contractId=${this.houseBaseInfo.contractId}`);
    }
    if (name === '房源照片') {
      this.$router.push('/OldHousePic');
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/main.styl';

.my-house {
  .banner {
    width: 100%;
    height: vw(150);
    padding-top: vw(20);
    padding-left: vw(25);
    background: url('../../assets/images/myhouse_banner_bg.png') no-repeat center;
    background-size: cover;

    p {
      color: #fff;
      font-size: 12px;
      line-height: 17px;

      &:nth-child(1) {
        font-size: 20px;
        line-height: 28px;
      }
    }
  }

  .type {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: vw(30) 0;
    background: #fff;

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;

      &:nth-child(2) {
        margin: 0 vw(40);
      }

      img {
        width: vw(80);
        height: vw(80);
      }

      span {
        text-align: center;
        margin-top: vw(10);
        font-size: 15px;
        color: $text-color;
        font-weight: bold;
      }
    }
  }

  .income {
    width: vw(345);
    height: vw(100);
    background: #fff;
    border-radius: vw(5);
    margin: vw(10) auto;
    padding-top: vw(20);
    padding-left: vw(25);

    p {
      &:nth-child(1) {
        font-size: 14px;
        color: $next-text-color;
        line-height: 20px;
      }

      &:nth-child(2) {
        font-size: 32px;
        color: $main-color;
        line-height: 39px;
        font-weight: bold;
        margin-left: -8px;
      }
    }
  }

  .card {
    background: #fff;
    height: vw(230);
    padding-top: vw(25);

    .van-swipe-item {
      height: vw(180) !important;
      padding-left: vw(30);
    }

    .detail {
      width: vw(275);
      height: vw(180);
      border: 1px solid #eaeaea;
      border-radius: 5px;
      position: relative;

      h1 {
        height: vw(45);
        line-height: vw(45);
        background: $border-color-light;
        color: $text-color;
        padding-left: vw(25);
        font-size: 18px;
        margin-bottom: vw(15);
      }

      p {
        padding-left: vw(25);
        margin-bottom: vw(5);
        font-size: 14px;
      }

      .avatar {
        width: vw(60);
        height: vw(60);
        border: 2px solid #fff;
        border-radius: 50%;
        position: absolute;
        right: vw(25);
        top: vw(25);

        img {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
