/*
 * @Description: 房屋估价信息录入
 * @Author: linyu
 * @Date: 2019-04-25 13:48:33
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-30 16:12:43
 */

<template>
  <section class="appraise">
    <section class="area">
      <CityInput @city-confirm="cityConfirm" :city-name="cityName" :star="true" :city-list="cityList"></CityInput>
      <CommunityInput :community-name="communityName" @to-community="toCommunity">小区名称</CommunityInput>
      <BuildAcreageInput @change="buildAcreageChange"></BuildAcreageInput>
      <HouseTypeInput
        :house-type-value="houseTypeText"
        :kitchen="{show: false}"
        @house-type-confirm="houseTypeConfirm"
      ></HouseTypeInput>
      <FloorInfoInput @floor-num-change="floorNumChange" @floor-totality-change="floorTotalityChange"></FloorInfoInput>
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
import FloorInfoInput from '@/components/FloorInfoInput.vue';
import { TYPELIST, TOWARDLIST} from '@/config/config';
// import { HouseAppraiseForm } from '@/interface/perfectInterface';
import api from '@/api';
import { returnDomain } from '../../utils/utils';
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
    HouseTypeInput,
    FloorInfoInput
  }
})
// 类方式声明当前组件
export default class AppraiseHouseInfo extends CommonMixins {
  private type: string = '';
  private dong: string = '';
  private cityShow: boolean = false;
  private towardShow: boolean = false;
  private loading: boolean = false;
  private houseTypeText: string = ''; // 户型选择结果
  private hallNum: string = ''; // 厅数
  private roomNum: string = ''; // 房间数
  private toiletNum: string = ''; // 房间数
  private communityName: string = '';  // 小区名称
  private floorTotality: string = '';  // 总楼层
  private floorNum: string = '';  // 楼层
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
      && Boolean(this.houseTypeText);
    return !result;
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
   * @description 房屋所在楼层变化触发事件
   * @returns void
   * @author linyu
   */
  private floorNumChange(floorNum: string): void {
    this.floorNum = floorNum;
  }
  /**
   * @description 总楼层变化触发事件
   * @returns void
   * @author linyu
   */
  private floorTotalityChange(floorTotality: string): void {
    this.floorTotality = floorTotality;
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
   * @description 面积值变化触发事件
   * @params value 输入框当前值
   * @returns void
   * @author linyu
   */
  private buildAcreageChange(value: string | number): void {
    this.form.buildAcreage = value;
  }

  /**
   * @description 户型选择确定触发事件
   * @params items Array 选中的item数组
   * @params houseType 户型选择结果
   * @returns void
   * @author linyu
   */
  private houseTypeConfirm(houseType: any, items: string[]): void {
    this.hallNum = houseType.hallNum;
    this.roomNum = houseType.roomNum;
    this.toiletNum = houseType.toiletNum;
    this.houseTypeText = items.join('');
  }

  /**
   * @description 表单验证
   * @returns void
   * @author linyu
   */
  private validForm() {
    const acreagePattern: any = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d(\d)?$)/;
    const digitPattern: any = /^\d{1,2}$/;
    if (!acreagePattern.test(this.form.buildAcreage)) {
      this.$toast('面积格式输入有误！');
      return false;
    }
    if (Number(this.toiletNum) === 0 && Number(this.hallNum) === 0 && Number(this.roomNum) === 0) {
      this.$toast('户型选择不正确');
      return false;
    }
    if (!digitPattern.test(this.floorNum)) {
      this.$toast('楼层输入格式有误');
      return false;
    }
    if (!digitPattern.test(this.floorTotality)) {
      this.$toast('总层数不能大于100');
      return false;
    }
    if (Math.abs(Number(this.floorNum)) > Math.abs(Number(this.floorTotality))) {
      this.$toast('房屋所在楼层数不能大于总楼层数');
      return false;
    }
    return true;
  }

  /**
   * @description 提交完善房源数据
   * @returns void
   * @author chenmo
   */
  private async submitData() {
    const data = this.form;
    if (!this.validForm()) {
      return;
    }
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