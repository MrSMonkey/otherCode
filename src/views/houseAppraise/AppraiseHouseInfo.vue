<template>
  <section class="appraise">
      
    <section class="area">
      <div class="appraise-input">
        <div class="label">城&emsp;&emsp;市</div>
        <div class="village">
          <van-field
            v-model="form.cityName"
            placeholder="请选择"
            type="text"
            right-icon="arrow"
            readonly
            input-align="right"
            @click="cityShow = true"
            @click-right-icon="cityShow = true"
          />
        </div>
      </div>
      <div class="appraise-input">
        <div class="label">小区名称</div>
        <div class="village">
          <van-field
            v-model="form.consociationTypeName"
            placeholder="请选择"
            type="text"
            right-icon="arrow"
            readonly
            input-align="right"
            @click="cityShow = true"
            @click-right-icon="cityShow = true"
          />
        </div>
      </div>
      <div class="appraise-input">
        <div class="label">面&emsp;&emsp;积</div>
        <div class="village">
          <van-field
            v-model="form.buildAcreage"
            placeholder="请输入产权面积"
            type="number"
            input-align="right"
          >
          <span slot="button" >平米</span>
          </van-field>
        </div>
      </div>
      <div class="appraise-input">
        <div class="label">户&emsp;&emsp;型</div>
        <van-row type="flex" justify="end" class="village">
          <van-col span="4"><van-field
            v-model="form.roomNum"
            placeholder="几室"
            type="number"
            input-align="center"
          /></van-col>
          <van-col span="4" class="house-info">
            <van-field
              v-model="form.hallNum"
              placeholder="几厅"
              type="number"
              input-align="center"
            />
          </van-col>
          <van-col span="4" class="house-info">
            <van-field
              v-model="form.kitchenNum"
              placeholder="几厨"
              type="number"
              input-align="center"
            />
          </van-col>
          <van-col span="4" class="house-info">
            <van-field
              v-model="form.toiletNum"
              placeholder="几卫"
              type="number"
              input-align="center"
            />
          </van-col>
        </van-row>
      </div>
      <div class="appraise-input">
        <div class="label">楼&emsp;&emsp;层</div>
        <van-row type="flex" justify="end" class="village">
          <van-col span="6"><van-field
            v-model="form.floorNum"
            placeholder="第几层"
            type="number"
            input-align="center"
          /></van-col>
          <van-col span="6" class="house-info">
            <van-field
              v-model="form.floorTotality"
              placeholder="总楼层"
              type="number"
              input-align="center"
            />
          </van-col>
        </van-row>
      </div>
    </section>
    <confirmBtn 
      loadingText="保存中"
      cancelText="取消"
      :loading="loading"
      @confirm="submitData"
      @plotCancel="plotCancel"
      :isActive="!isActive"
    >
      <template slot="confirm">
        <span>保存</span>
      </template>
    </confirmBtn>
    <!-- 城市弹窗 -->
    <van-popup v-model="cityShow" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        :columns="cityList"
        @confirm="cityConfirm"
        value-key="cityName"
        @cancel="cityShow = false"
        title="选择城市"
      />
    </van-popup>
  </section>  
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Field, Row, Col, Button } from 'vant';
import ConfirmBtn from '@/components/ConfirmBtn.vue';
import { TYPELIST, TOWARDLIST} from '@/config/config';
import { HouseAppraiseForm } from '@/interface/perfectInterface';
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
    ConfirmBtn
  }
})
// 类方式声明当前组件
export default class AppraiseHouseInfo extends CommonMixins {
  private type: string = '';
  private dong: string = '';
  private cityShow: boolean = false;
  private towardShow: boolean = false;
  private loading: boolean = false;
  private entrustId: string = ''; // 委托房源ID
  private cityList: object[] = [
      {cityId: 1, cityName: '成都'},
      {cityId: '', cityName: '敬请期待'}
  ];
  private form: HouseAppraiseForm = {
    buildAcreage: '', // 房屋建筑面积@
    cityId: '', // 城市id
    cityName: '', // 城市
    floorNum: '',  // 楼层
    floorTotality: '', // 总楼层
    hallNum: '', // 厅数
    roomNum: '', // 房间数
    toiletNum: '', // 卫生间数
  };

  // computed
  get isActive(): boolean { // 是否激活confirmBtn
    return !this.form.buildAcreage && !this.form.floorNum && !this.form.floorTotality
    && !this.form.hallNum && !this.form.roomNum && !this.form.toiletNum;
  }
  get isFloorErr(): boolean { // 校验楼层数和总楼层
    return true;
  }

  private mounted() {
    this.entrustId =  String(this.$route.query.entrustId); // 获取委托Id
  }
  /**
   * @description 选择运营类型确认
   * @params item 选择的数
   * @params index 索引值
   * @returns void
   * @author chenmo
   */
  private cityConfirm(item: any, index: number) {
    this.cityShow = false;
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
   * @description 提交完善房源数据
   * @returns void
   * @author chenmo
   */
  private async submitData() {
    const data = this.form;
    Object.assign(data, {
      entrustId: this.entrustId
    });
    if (!this.form.floorNum && !this.form.floorTotality) {
      const floorNum: any = this.form.floorNum;
      const floorTotality: any = this.form.floorTotality;
      if (parseFloat(floorNum) > parseFloat(floorTotality)) {
        this.$toast(`楼层数不能大于总楼层数`);
        return false;
      }
    }
    this.loading = true;
    try {
      const res: any = await this.axios.put(api.getHouseInfo, data);
      if (res && res.code === '000') {
        this.$toast.success(`保存成功`);
        setTimeout(() => {
          window.location.href = '/#/house';
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
    .appraise-input
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
</style>