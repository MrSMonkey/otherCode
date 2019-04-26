/*
 * @Description: 房屋估价信息录入
 * @Author: linyu
 * @Date: 2019-04-25 13:48:33
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-25 13:49:47
 */

<template>
  <section class="appraise">
    <section class="area">
      <CityInput @city-confirm="cityConfirm" :city-name="form.cityName" :star="true" :city-list="cityList"></CityInput>
      <CommunityInput :community-name="form.communityName" @to-community="toCommunity">小区名称</CommunityInput>
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
            type="number"
            input-align="center"
          /></van-col>
          <van-col span="6" class="house-info">
            <van-field
              v-model="floorTotality"
              placeholder="总楼层"
              type="number"
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
          class="submit-btn"
          @click="submitData"
          :isActive="isActive"
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
  private floorNum: number = NaN;
  private floorTotality: number = NaN;
  private cityList: object[] = [
      {cityId: '510100', cityName: '成都'},
      {cityId: '', cityName: '敬请期待', disabled: true}
  ];
  private form: any = {
    buildAcreage: '', // 房屋建筑面积@
    cityId: '510100', // 城市id
    communityName: '', // 小区名称
    communityId: '', // 小区id
    cityName: '成都', // 城市
    floorNum: '',  // 楼层
    floorTotality: '', // 总楼层
    hallNum: '', // 厅数
    roomNum: '', // 房间数
    toiletNum: '', // 卫生间数
  };
  // computed : 是否激活confirmBtn
  get isActive(): boolean {
    // console.log(this.form.buildAcreage, Boolean(this.form.buildAcreage));
    // console.log(this.form.floorNum, Boolean(this.form.floorNum));
    // console.log(this.form.floorTotality, Boolean(this.form.floorTotality));
    // console.log(this.form.hallNum, Boolean(this.form.hallNum));
    // console.log(this.form.roomNum, Boolean(this.form.roomNum===''));
    // console.log(this.form.toiletNum, Boolean(this.form.toiletNum));
    return Boolean(this.form.buildAcreage)
      && Boolean(this.form.floorNum)
      && Boolean(this.form.floorTotality)
      && (this.form.hallNum === 0 || Boolean(this.form.hallNum))
      && (this.form.roomNum === 0 || Boolean(this.form.roomNum))
      && (this.form.toiletNum === 0 || Boolean(this.form.toiletNum));
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
      this.form.communityName = this.$route.params.communityName;
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
    this.form.cityName = item.cityName;
    this.form.cityId = item.id;
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
    for (const x in houseTypeResult) {
      if (houseTypeResult.hasOwnProperty(x)) {
        this.form[x] = houseTypeResult[x];
      }
    }
    this.houseTypeValue = items.join('');
  }

  /**
   * @description 提交完善房源数据
   * @returns void
   * @author chenmo
   */
  private async submitData() {
    const data = this.form;
    if (this.form.toiletNum === 0 && this.form.hallNum === 0 && this.form.roomNum === 0) {
      this.$toast('户型选择不正确');
      return false;
    }
    if (this.isFloorErr) {
        this.$toast(`楼层数不能大于总楼层数`);
        return false;
    }
    if (this.form.communityId === '') {
      this.$dialog.confirm({
        confirmButtonText: '保存',
        cancelButtonText: '提交',
        className: 'dialogTips',
        message: `提交成功！资产管家会尽快与您联系，您可以在【我的房源】中选择资产管家`
      }).then(() => {
        // on confirm
        this.$router.push(`/house`); // 跳转到房源列表
      }).catch(() => {
        // on cancel 取消
        window.location.reload(); // 取消刷新页面
      });
    }
    this.loading = true;
    try {
      const res: any = await this.axios.put(api.getHouseInfo, data);
      if (res && res.code === '000') {
        setTimeout(() => {
          window.location.href = '/#/houseApppraise';
        }, 2000);
      } else {
        this.$toast(res.msg);
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
</style>