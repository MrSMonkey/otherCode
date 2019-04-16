/*
 * @Description: 选择小区页面
 * @Author: linyu
 * @Date: 2019-04-09 12:40:00
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-04-15 14:56:23
 */

<template>
  <section class="community">
    <section class="search">
      <van-field
        v-model="searchInputValue"
        placeholder="请输入您爱屋所在的小区" 
        autofocus="true"
        clearable
      />
    </section>
    <main class="main">
      <div class="list-panel">
        <div class="text" v-if="tableList.length > 0">
          <span>请选择小区名称</span>
        </div>
        <div class="list">
          <van-pull-refresh
            v-model="refreshing"
            @refresh="getCommunityList(1)"
          >
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="getNearCommunityList"
              :immediate-check="true"
            >
              <van-cell
                v-for="item in tableList"
                :key="item.id"
                :border="false"
              >
                <template>
                  <div class="list-item-panel" @click="selectCommunity(item)" :class="item.id === plotAacive ? 'active' : ''">
                    <span class="community-name list-item">{{item.communityName}}</span>
                    <span class="address list-item">{{item.address}}</span>
                  </div>
                </template>
              </van-cell>
            </van-list>
          </van-pull-refresh>
          
        </div>
      </div>
      <div v-if="tableList.length === 0">
        <div class="noserch">未找到该小区，确认提交后工作人员会尽快为您处理！</div>
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
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Field, Row, Col, Cell, List, PullRefresh  } from 'vant';
import ConfirmBtn from '@/components/ConfirmBtn.vue';
import { getLocation } from '@/utils/utils';
import { MP } from '@/utils/map';
import { BAIDU_AK } from '@/config/config';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'Community',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    ConfirmBtn
  }
})

export default class Community extends CommonMixins {
  private searchInputValue: string = '';
  private cityId: string = '';
  private plotAacive: number = -1;
  private communityId: string = '';
  private communityName: string = '';
  private pushRouteName: string;
  private refreshing: boolean = false;
  private loading: boolean = false;
  private error: boolean = false;
  private finished: boolean = false;
  private tableList: any = [];
  private lon: number = 0; // 当前位置经度
  private lat: number = 0; // 当前位置纬度
  private baiduAk: string = BAIDU_AK; // 百度地图key
  private page: number = 1; // 当前请求页码
  private pageSize: number = 20; // 每页条数

  @Watch('searchInputValue')
  private handlerSearchInputValue(newVal: string) {
    this.tableList = [];
    this.page = 1;
    if (newVal !== '') {
      this.getKeyCommunityList(); // 请求小区数据
    }
  }
  private debounce(func: any, wait: number) {
    let timeout: any = null;
    let timeout2: any = 111;
    return () => {
        const args = arguments;
        console.log(timeout);
        console.log(timeout2);
        if (timeout) {
          clearTimeout(timeout);
          console.log('timeout');
        }
        timeout = setTimeout(() => {
          timeout2 = 4444;
          func.apply(this, args);
        }, wait);
    };
  }
  private getCommunityList(page?: number): void {
    if (page) {
      this.page = page;
      this.tableList = [];
    }
    if (this.searchInputValue === '') {
      this.getNearCommunityList();
    } else {
      this.getKeyCommunityList();
    }
  }
  /**
   * @description 获取小区(根据关键词)
   * @returns void
   * @author chenmo
   */
  private async getKeyCommunityList() {
    try {
      const res: any = await this.axios.post(api.getKeyCommunityList, {
        cityId: this.cityId,
        name: this.searchInputValue,
        page: this.page++,
        pageSize: 20
      });
      if (res && res.code === '000') {
        res.data.list.map((value: any) => {
          value.id += (String(Math.random() * 1000000000)).split('.')[0];
          return value;
        });
        this.tableList.push(...res.data.list);
        console.log(this.tableList);
      } else {
        this.$toast(res.msg);
      }
      this.loading = false;
      this.refreshing = false;
      if (this.tableList.length >= 40) {
        this.finished = true;
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }

  /**
   * @description 获取小区(根据当前定位)
   * @returns void
   * @author linyu
   */
  private async getNearCommunityList() {
    try {
      // 104.06858,30.591175
      const res: any = await this.axios.post(api.getNearCommunityList, {
        cityId: this.cityId,
        lat: '30.591175',
        lon: '104.06858',
        page: this.page++,
        pageSize: 20,
        scope: '2km'
      });
      if (res && res.code === '000') {
        res.data.list.map((value: any) => {
          value.id += (String(Math.random() * 1000000000)).split('.')[0];
          return value;
        });
        this.tableList.push(...res.data.list);
        console.log(this.tableList);
      } else {
        this.$toast(res.msg);
      }
      this.loading = false;
      this.refreshing = false;
      if (this.tableList.length >= 40) {
        this.finished = true;
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }
  /**
   * @description 选择小区
   * @returns void
   * @author chenmo
   */
  private selectCommunity(item: any) {
    this.plotAacive = item.id;
    this.communityId = item.id;
    this.communityName = item.communityName;
  }

  /**
   * @description 确认选中
   * @returns void
   * @author chenmo
   */
  private onOk() {
    if (this.searchInputValue === '') {
      this.$toast('请输入您爱屋所在的小区');
    } else {
        if (this.communityId === '') {
          // 未选择
          this.$toast('请选择您爱屋所在的小区');
        } else {
          // 跳转至enturst页面
          this.$router.push({
            name: this.pushRouteName,
            params: {
              communityId: this.communityId,
              communityName: this.communityName
            }
          });
        }
    }
  }

  /**
   * @description 取消按钮事件
   * @returns void
   * @author chenmo
   */
  private plotCancel() {
    this.$router.back();
  }
  private getBaiduLocation() {
    this.$nextTick(() => {
      MP(this.baiduAk).then((BMap: any) => {
        const getlocation = new BMap.Geolocation();
        getlocation.getCurrentPosition((r: any) => {
         this.lon = r.point.lng;
         this.lat = r.point.lat;
         console.log(this.lon, this.lat);
        });
      });
    });
  }
  private mounted() {
    this.cityId = String(this.$route.query.cityId);
    this.pushRouteName = String(this.$route.query.routeName);
    console.log(this.$refs.searchInput);
    this.getBaiduLocation();
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/main.styl'
  .community
    overflow auto
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
      margin-top vw(55)
      margin-bottom vw(70)
      .text
        height vw(40)
        line-height vw(40)
        padding 0 vw(15)
        font-size 14px
        color $tip-text-color
      .list
        height vw(520)
        overflow-y scroll
        .van-cell
          border-bottom 1px solid #eee
          padding 0
          .list-item-panel
            height vw(60)
            width 100%
            line-height vw(45)
            color $text-color
            font-size 14px
            padding vw(10) vw(15)
            display -webkit-flex
            display flex
            flex-direction column
            align-items center
            .list-item
              flex 0 1 auto
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              width 100%
            .community-name
              color $text-color
              height vw(23)
              line-height vw(20)
            .address
              font-size 12px
              height vw(17)
              line-height vw(16)
              color $tip-text-color
          .active
            background-color #fafafa
            .community-name
              color $main-color
      .noserch
        margin-top vw(55)
        height vw(40)
        line-height vw(40)
        padding 0 vw(15)
        font-size 14px
        color $tip-text-color
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


