/*
 * @Description: 选择小区页面
 * @Author: linyu
 * @Date: 2019-04-09 12:40:00
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-23 14:41:39
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
      <div class="text">
        <span>{{listTopTip}}</span>
      </div>
      <div class="list" v-if="tableList.length > 0">
        <van-pull-refresh
          v-model="refreshing"
          @refresh="getCommunityList(1)"
        >
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            error-text="请求失败，点击重新加载"
            @load="getCommunityList"
            :immediate-check="false"
          >
            <van-cell
              v-for="item in tableList"
              :key="item.id"
              :border="false"
              class="list-cell "
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
    </main>
    <section class="community-footer">
      <confirmBtn 
        loadingText="保存中"
        cancelText="返回"
        @confirm="onOk"
        @plotCancel="plotCancel"
        :isActive="isActive"
      >
        <template slot="confirm">
          <span>确认</span>
        </template>
      </confirmBtn>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { State, Getter, Mutation, Action } from 'vuex-class';
import { Field, Row, Col, Cell, List, PullRefresh  } from 'vant';
import ConfirmBtn from '@/components/ConfirmBtn.vue';
import { debounce } from '@/utils/utils';
import { BAIDU_AK } from '@/config/config';
import api from '@/api';
import { Point } from '@/interface/utilInterface';
import { config } from '@vue/test-utils';
const namespace: string = 'global';

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
  private searchInputValue: string = ''; // 搜索关键词
  private listTopTip: string = '请选择小区名称';
  private cityId: string = '';
  private plotAacive: number = -1; // 选中的样式激活的ID
  private communityId: string = '';
  private communityName: string = '';
  private pushRouteName: string; // 上一个页面的路由地址，即点击页面确认按钮以后回跳的页面
  private refreshing: boolean = false; // 刷新请求是否完成，完成时值为false
  private loading: boolean = false; // 加载更多请求是否完成，完成时值为false
  private finished: boolean = false; // 是否还有下一页；有下一页时值为false
  private tableList: any = []; // 小区列表
  private lon: number = 0; // 当前位置经度
  private lat: number = 0; // 当前位置纬度
  private debounceGetCommunityList: any = debounce(() => { // 防抖处理
    this.getCommunityList(1); // 请求小区数据
  }, 1000);
  private page: number = 1; // 当前请求页码
  private pageSize: number = 20; // 每页条数
  private point: any = {
    lat: '',
    lon: ''
  };
  @Watch('searchInputValue')
  private handlerSearchInputValue(newVal: string) {
    this.debounceGetCommunityList();
  }
  // computed
  get isActive(): boolean {
    return (this.searchInputValue === '' && this.communityId !== '') || this.searchInputValue !== '';
  }
  private mounted() {
    // this.getBaiduLocation();
    this.getLocation();
    this.cityId = String(this.$route.query.cityId);
    this.pushRouteName = String(this.$route.query.routeName);
  }

  /**
   * @description 定位成功
   * @params position 当前位置信息
   * @return 当前位置经纬度
   * @author chemo
   */
  private getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        const point: Point = {
          lat: String(position.coords.latitude), // 纬度
          lon: String(position.coords.longitude) // 经度
        };
        this.point = point;
        // console.log(this.point);
        this.getCommunityList(1);
      }, (error: any) => {
        /**
         * @description 定位抛出异常
         * @params error 错误信息
         * @return nulll
         * @author chemo
         */
        this.listTopTip = '未找到附近小区';
        switch (error.code) {
          case error.PERMISSION_DENIED:
          alert('定位失败,用户拒绝请求地理定位');
          break;
          case error.POSITION_UNAVAILABLE:
          alert('定位失败,位置信息是不可用');
          break;
          case error.TIMEOUT:
          alert('定位失败,请求获取用户位置超时');
          break;
          case error.UNKNOWN_ERROR:
          alert('定位失败,定位系统失效');
          break;
        }
      }, {
        enableHighAccuracy: true, // 是否要求高精度的地理位置信息
        timeout: 10000, // 对地理位置信息的获取操作做超时限制，如果再该事件内未获取到地理位置信息，将返回错误
        maximumAge: 60 * 1000 // 设置缓存有效时间，在该时间段内，获取的地理位置信息还是设置此时间段之前的那次获得的信息，超过这段时间缓存的位置信息会被废弃
      });
    } else {
      alert('您当前使用的浏览器不支持地理定位服务');
    }
  }

  /**
   * @description 获取小区
   * @params page 非必需，当刷新页面或者下拉刷新或者是搜索关键词发生改变时应传1，反之则不传
   * @returns void
   * @author linyu
   */
  private getCommunityList(page?: number): void {
    if (this.searchInputValue === '') {
      this.getNearCommunityList(page);
    } else {
      this.getKeyCommunityList(page);
    }
  }

  /**
   * @description 根据关键词获取小区
   * @params page 非必需，当刷新页面或者下拉刷新或者是搜索关键词发生改变时应传1，反之则不传
   * @returns void
   * @author chenmo
   */
  private async getKeyCommunityList(page?: number) {
    if (page) { // 如果是下拉刷新或者是搜索关键词发生改变先重置page为1
      this.page = page;
    }
    try {
      const res: any =  await this.axios.post(api.getKeyCommunityList, {
        cityId: this.cityId,
        name: this.searchInputValue,
        page: this.page++,
        pageSize: 20
      });
      this.updateSomeData(res, page);
      if (this.tableList.length) {
        this.listTopTip = '请选择小区名称';
      } else {
        this.listTopTip = '未找到该小区，确认提交后工作人员会尽快为您处理！';
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }

  /**
   * @description 根据当前定位获取小区
   * @params page 非必需，当刷新页面或者下拉刷新或者是搜索关键词发生改变时应传1，反之则不传
   * @returns void
   * @author linyu
   */
  private async getNearCommunityList(page?: number) {
    if (page) { // 如果是下拉刷新发生改变先重置page为1
      this.page = page;
    }
    try {
      // 104.06858,30.591175
      const res: any = await this.axios.post(api.getNearCommunityList, {
        cityId: this.cityId,
        lat: this.point.lat || '',
        lon: this.point.lon  || '',
        page: this.page ++,
        pageSize: 20,
        scope: '2km'
      });
      this.updateSomeData(res, page);
      if (this.tableList.length) {
        this.listTopTip = '请选择小区名称';
      } else {
        this.listTopTip = '未找到附近小区';
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }

  /**
   * @description 请求完成后更新数据
   * @params respData 必需，本次请求的响应结果
   * @params page 非必需，当刷新页面或者下拉刷新或者是搜索关键词发生改变时应传1，反之则不传
   * @returns void
   * @author linyu
   */
  private updateSomeData(respData: any, page?: number) {
    if (page) { // 如果是下拉刷新或者是搜索关键词发生改变先重置data属性
      this.tableList = [];
      this.finished = false;
      this.communityId = '';
      this.communityName = '';
      this.plotAacive = -1;
    }
    if (respData && respData.code === '000') {
      this.tableList.push(...respData.data.list);
    } else {
      this.$toast(respData.msg);
    }
    this.loading = false;
    this.refreshing = false;
    if (respData.data.totalPage < this.page) {
      this.finished = true;
    }
  }

  /**
   * @description 选择小区
   * @params item <object> 选中小区的item
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
    if (this.searchInputValue !== '' && this.tableList.length && this.communityId === '') {
      this.communityName = this.searchInputValue;
      this.$dialog.confirm({
        title: '提示',
        confirmButtonText: '是的',
        cancelButtonText: ' 重新选',
        className: 'dialogTips',
        message: `您未选中任何目标，是否搜索结果中没有您想要的？`
      }).then(() => {
        this.$router.push({
          name: this.pushRouteName,
          params: {
            communityId: this.communityId,
            communityName: this.communityName
          }
        });
      }).catch(() => {
        this.$dialog.close();
      });
    } else {
      if (this.searchInputValue !== '' && this.tableList.length <= 0) {
        this.communityName = this.searchInputValue;
      }
      this.$router.push({
        name: this.pushRouteName,
        params: {
          communityId: this.communityId,
          communityName: this.communityName
        }
      });
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

  // private getBaiduLocation() {
  //   MP(this.baiduAk).then((BMap: any) => {
  //     const getlocation = new BMap.Geolocation();
  //     getlocation.getCurrentPosition((r: any) => {
  //       this.lon = r.point.lng;
  //       this.lat = r.point.lat;
  //     });
  //   });
  // }

}
</script>

<style lang="stylus" scoped>
  .community
    // overflow auto
    display flex
    flex-direction column
    height 100%
    .search
      height vw(55)
      background $global-background
      padding-top vw(5)
      border-bottom 1px solid #eee
      width 100%
      .van-field
        font-size 14px
    .main
      flex-grow 1
      display flex
      flex-direction column
      overflow-y scroll
      .text
        height vw(40)
        line-height vw(40)
        padding 0 vw(15)
        font-size 14px
        color $tip-text-color
      .list
        flex-grow 2
        overflow-y scroll
        margin-bottom vw(46)
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
</style>


