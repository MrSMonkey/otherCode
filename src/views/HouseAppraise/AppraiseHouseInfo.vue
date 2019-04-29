/*
 * @Description: 房屋估价信息录入
 * @Author: linyu
 * @Date: 2019-04-25 13:48:33
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-29 17:58:04
 */

<template>
  <section class="appraise">
    <section class="area">
      <CityInput @city-confirm="cityConfirm" :city-name="cityName" :star="true" :city-list="cityList"></CityInput>
      <CommunityInput :community-name="communityName" @to-community="toCommunity">小区名称</CommunityInput>
      <BuildAcreageInput @change="buildAcreageChange"></BuildAcreageInput>
      <HouseTypeInput
        :house-type-value="houseTypeValue"
        :kitchen="{show: false}"
        @house-type-confirm="houseTypeConfirm"
      ></HouseTypeInput>
      <div class="input-panel">
        <div class="label">楼&emsp;&emsp;层</div>
        <van-row type="flex" justify="end" class="village">
          <van-col span="6"><van-field
            v-model="floorNum"
            placeholder="第几层"
            input-align="center"
          /></van-col>
          <van-col span="6" class="house-info">
            <van-field
              v-model="floorTotality"
              placeholder="总楼层"
              input-align="center"
            />
          </van-col>
        </van-row>
      </div>
    </section>
    <section class="other">
      <div class="submit-btn-panel">
          <van-button
          size="large" 
          :class="['submit-btn', isActive ? 'disabled-btn' : '']"
          @click="submitData"
          :disabled="isActive"
        >查看评估结果</van-button>
      </div>
    </section>
  </section>  
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Field, Row, Col, Button } from 'vant';
import ConfirmBtn from '@/components/ConfirmBtn.vue';
import CityInput from '@/components/CityInput.vue';
import CommunityInput from '@/components/CommunityInput.vue';
import BuildAcreageInput from '@/components/BuildAcreageInput.vue';
import HouseTypeInput from '@/components/HouseTypeInput.vue';
import { TYPELIST, TOWARDLIST} from '@/config/config';
// import { HouseAppraiseForm } from '@/interface/perfectInterface';
import api from '@/api';
const namespace: string = 'global';
// 声明引入的组件
@Component({
  name: 'AppraiseHouseInfo',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    ConfirmBtn,
    CityInput,
    CommunityInput,
    BuildAcreageInput,
    HouseTypeInput
  }
})
// 类方式声明当前组件
export default class AppraiseHouseInfo extends CommonMixins {
  private type: string = '';
  private dong: string = '';
  private cityShow: boolean = false;
  private towardShow: boolean = false;
  private loading: boolean = false;
  private houseTypeValue: string = ''; // 户型选择结果
  private floorNum: string = '';  // 楼层
  private hallNum: string = ''; // 厅数
  private roomNum: string = ''; // 房间数
  private toiletNum: string = ''; // 房间数
  private communityName: string = '123';  // 小区名称
  private floorTotality: string = '';  // 总楼层
  private cityId: string = '510100';
  private cityName: string = '成都';
  private cityList: object[] = [
      {cityId: '510100', cityName: '成都'},
      {cityId: '', cityName: '敬请期待', disabled: true}
  ];
  private form: any = {
    buildAcreage: '', // 房屋建筑面积@
    communityId: '', // 小区id
  };
  // computed : 是否激活confirmBtn
  get isActive(): boolean {
    const result: boolean =  Boolean(this.form.buildAcreage)
      && Boolean(this.communityName)
      && Boolean(this.floorNum)
      && Boolean(this.floorTotality)
      && Boolean(this.houseTypeValue);
    return !result;
  }
  @Watch('floorNum')
  private onFloorNumChange (val: string, oldVal: string) {
    return 1;
  }
  // computed : 校验楼层数和总楼层
  get isFloorErr(): boolean {
    return true;
  }
  /**
   * @description keep-alive缓存载入钩子函数
   * @returns void
   * @author linyu
   */
  private activated() {
    // 获取小区信息
    if (this.$route.params.communityName || this.$route.params.communityId) {
      this.form.communityId = this.$route.params.communityId;
      this.communityName = this.$route.params.communityName;
    }
  }

  /**
   * @description 选择城市确认
   * @params item 选择的数
   * @params index 索引值
   * @returns void
   * @author linyu
   */
  private cityConfirm(item: any, index: number) {
    this.cityName = item.cityName;
    this.cityId = item.id;
  }

  /**
   * @description 跳转到小区选择页面
   * @return void
   * @author linyu
   */
  private toCommunity() {
    this.$router.push({
      path: '/appraiseCommunity'
    });
  }

  /**
   * @description 选择朝向确认
   * @params item 选择的数
   * @params index 索引值
   * @returns void
   * @author chenmo
   */
  private towrdConfirm(item: any, index: number) {
    this.towardShow = false;
  }

  /**
   * @description 输入面积
   * @params value 输入框当前值
   * @returns void
   * @author linyu
   */
  private buildAcreageChange(value: string | number) {
    this.form.buildAcreage = value;
  }

  /**
   * @description 户型选择确定时间
   * @params items 选中的item数组
   * @params indexs 选中的索引index数组
   * @params houseTypeResult 户型结果
   * @returns void
   * @author linyu
   */
  private houseTypeConfirm(houseTypeResult: any, items: string[], indexs: number[]) {
    this.hallNum = houseTypeResult.hallNum;
    this.roomNum = houseTypeResult.roomNum;
    this.toiletNum = houseTypeResult.toiletNum;
    this.houseTypeValue = items.join('');
  }

  /**
   * @description 提交完善房源数据
   * @returns void
   * @author chenmo
   */
  private async submitData() {
    const data = this.form;
    console.log(data);
    if (Number(this.toiletNum) === 0 && Number(this.hallNum) === 0 && Number(this.roomNum) === 0) {
      this.$toast('户型选择不正确');
      return false;
    }
    if (Math.abs(Number(this.floorNum)) >= Math.abs(Number(this.floorTotality))) {
      this.$toast('楼层输入有误');
      return false;
    }
    // if (this.isFloorErr) {
    //   this.$toast(`楼层数不能大于总楼层数`);
    //   return false;
    // }
    this.loading = true;
    try {
      const res: any = await this.axios.post(api.getSingleHouseValuation, data);
      if (res && res.code === '000') {
        this.$router.push({
          name: 'houseAppraise',
          params: res.data || {}
        });
      } else {
        this.$toast(res.msg || '房屋估价获取失败');
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.loading = false;
    }
  }

  private plotCancel() {
    window.location.href = '/#/house';
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/main.styl'
.pointer
  color red
  cursor pointer
.appraise
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
    .just
      text-align justify
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
        .house-info
          position: relative;
          &::before
            content ''
            width 1px
            height 15px
            border-left 1px solid $disabled-color
            position absolute
            top 14px
            left 6px
            z-index 1
            display block
      .van-field
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
  .other
    margin-top 15px
    .submit-btn-panel
    np
      padding 0 vw(7.3)
      .submit-btn
        font-size 17px
        border-radius 5px
        background $main-color
        color #ffffff
      .disabled-btn
        opacity 1
        background $disabled-color  
</style>