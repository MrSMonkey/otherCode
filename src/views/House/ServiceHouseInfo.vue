/*
 * @Description: 购买服务包时，没有房源时，可跳转至此页面新增房源
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: linyu
 * @Last Modified time: 2019-05-14 15:06:19
 */

<template>
  <section>
    <section class="serviceHouseInfo">
      <section class="area">
        <CityInput :city-name="cityName" :is-select="false" @city-confirm="cityConfirm" :city-list="cityList"></CityInput>
        <div class="input-panel">
          <div class="label">小&emsp;&emsp;区*</div>
          <div class="village">
            <van-field
              v-model="communityName"
              placeholder="请选择您爱屋所在的小区"
              type="text"
              readonly
              right-icon="arrow"
              input-align="right"
              @click-right-icon="toCommunity"
              @click="toCommunity"
            />
          </div>
        </div>
        <HouseDecorationInfo :alignRight="true" @on-change="selectItem"></HouseDecorationInfo>
      </section>
      <section>
        <van-button slot="button" size="large" type="default" class="entrust-btn bg-active" v-if="!communityName">立即提交</van-button>
        <van-button slot="button" size="large" type="default" class="entrust-btn" v-else @click="getSubmitData" :loading="loading" loading-text="提交中">立即提交</van-button>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Field, Row, Col, Button, List, Cell } from 'vant';
import HrTitle from '@/components/HrTitle.vue';
import ConfirmBtn from '@/components/ConfirmBtn.vue';
import CityInput from '@/components/CityInput.vue';
import HouseDecorationInfo from '@/views/House/components/HouseDecorationInfo.vue';
import { handleWebStorage } from '@/utils/utils';
import api from '@/api';

const namespace: string = 'global';

// 声明引入的组件
@Component({
  name: 'ServiceHouseInfo',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    CityInput,
    HouseDecorationInfo,
    [List.name]: List,
    [Cell.name]: Cell,
    HrTitle,
    ConfirmBtn
  }
})
// 类方式声明当前组件
export default class ServiceHouseInfo extends CommonMixins {
  private cityName: string = '';
  private cityId: string = '';
  private code: string = '';
  private cityShow: boolean = false;
  private cityList: string[] = [];
  private active: number = 1;
  private loading: boolean = false;
  private finished: boolean = false;
  private communityId: string = '';
  private communityName: string = '';
  private routeName: string;  // 保存当前页面路由的名字
  private sourceId: any = ''; // 来源渠道id
  private list: any[] = [];

  @Mutation('updateToken', { namespace }) private updateToken: any;
  @Getter('getUserInfo', { namespace }) private userInfo: any;

  private mounted() {
    this.sourceId = this.$route.query.sourceId;
    this.routeName = String(this.$route.name);
    if (handleWebStorage.getLocalData('cityId', 'sessionStorage')) {
      this.cityId = handleWebStorage.getLocalData('cityId', 'sessionStorage');
      this.cityName = handleWebStorage.getLocalData('cityName', 'sessionStorage');
    } else {
      this.$toast('获取当前城市失败');
    }
    this.getCitys(); // 获取城市
  }

  /**
   * @description keep-alive缓存载入钩子函数
   * @returns void
   * @author linyu
   */
  private activated() {
    // 获取小区信息
    if (this.$route.params.communityName || this.$route.params.communityId) {
      this.communityId = this.$route.params.communityId;
      this.communityName = this.$route.params.communityName;
    }
  }

  /**
   * @description 选择城市确认
   * @returns void
   * @author chenmo
   */
  private cityConfirm(item: any, index: number) {
    this.cityName = item.cityName;
    this.cityId = item.id;
    this.communityId = '';
    this.communityName = '';
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
   * @description 装修信息变更回调事件
   * @returns void
   * @author linyu
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
          item.disabled = item.id !== '510100';
          return item;
        });
      } else {
        this.$toast(res.msg || '获取城市失败');
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }

  /**
   * @description 跳转到小区选择页面
   * @return void
   * @author linyu
   */
  private toCommunity() {
    this.$router.push({
      path: '/community',
      query: {
        cityId: this.cityId,
        routeName: this.routeName
      }
    });
  }

  /**
   * @description 立即提交
   * @return void
   * @author chenmo
   */
  private getSubmitData() {
    if (!this.communityName) {
      this.$toast('请选择您爱屋所在的小区');
      return false;
    }
    this.submitData();
  }

  private async submitData() {
    this.loading = true;
    const data: any = {
      cityId: this.cityId,
      cityName: this.cityName,
      communityId: this.communityId,
      communityName: this.communityName,
      decorationStatus: this.active,
      ownerUserId: localStorage.getItem('userId'),
      source: typeof(this.sourceId) === undefined ? '' : this.sourceId
    };
    try {
      const res: any = await this.axios.post(api.pushEntrust, data);
      if (res && res.code === '000') {
        this.$router.push('/choiceHouse');
        this.$destroy();
      } else {
        this.$toast(res.msg || '新增失败，请重试！');
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/main.styl'
.serviceHouseInfo
  .area
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
    .input-panel
      background $global-background
      height vw(55)
      padding vw(15) vw(6) vw(20) vw(15)
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
  .entrust-btn
    position absolute
    bottom 0
    left 0
    background $main-color
    color #fff
  .bg-active
    background $disabled-color
    color #fff
</style>
