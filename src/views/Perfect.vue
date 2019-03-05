/*
 * @Description: 提交房源
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-18 11:28:30
 */

<template>
  <section class="perfect">
    <section class="area mr-b10">
      <div class="perfect-input">
        <div class="label">运营类型*</div>
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
    </section>
    <section class="area">
      <div class="perfect-input">
        <div class="label">门牌号码*</div>
        <van-row type="flex" justify="end" class="village">
          <van-col span="4"><van-field
            v-model="form.building"
            placeholder="几栋"
            type="number"
            input-align="center"
          /></van-col>
          <van-col span="6" class="house-info">
            <van-field
              v-model="form.unit"
              placeholder="几单元"
              type="number"
              input-align="center"
            />
          </van-col>
          <van-col span="4" class="house-info">
            <van-field
              v-model="form.number"
              placeholder="几号"
              type="number"
              input-align="center"
            />
          </van-col>
          <!--  -->
        </van-row>
      </div>
    </section>
    <section class="area">
      <div class="perfect-input">
        <div class="label">楼&emsp;&emsp;层*</div>
        <van-row type="flex" justify="end" class="village">
          <van-col span="6"><van-field
            v-model="form.floorNum"
            placeholder="第几层"
            type="text"
            input-align="center"
          /></van-col>
          <van-col span="6" class="house-info">
            <van-field
              v-model="form.floorTotality"
              placeholder="总楼层"
              type="text"
              input-align="center"
            />
          </van-col>
        </van-row>
      </div>
    </section>
    <section class="area">
      <div class="perfect-input">
        <div class="label">原始户型*</div>
        <van-row type="flex" justify="end" class="village">
          <van-col span="4"><van-field
            v-model="form.roomNum"
            placeholder="几室"
            type="text"
            input-align="center"
          /></van-col>
          <van-col span="4" class="house-info">
            <van-field
              v-model="form.hallNum"
              placeholder="几厅"
              type="text"
              input-align="center"
            />
          </van-col>
          <van-col span="4" class="house-info">
            <van-field
              v-model="form.kitchenNum"
              placeholder="几厨"
              type="text"
              input-align="center"
            />
          </van-col>
          <van-col span="4" class="house-info">
            <van-field
              v-model="form.toiletNum"
              placeholder="几卫"
              type="text"
              input-align="center"
            />
          </van-col>
        </van-row>
      </div>
    </section>
    <section class="area">
      <div class="perfect-input">
        <div class="label">朝&emsp;&emsp;向*</div>
        <div class="village">
          <van-field
            v-model="form.towardName"
            placeholder="请选择"
            type="text"
            right-icon="arrow"
            readonly
            input-align="right"
            @click="towardShow = true"
            @click-right-icon="towardShow = true"
          />
        </div>
      </div>
    </section>
    <section class="area">
      <div class="perfect-input">
        <div class="label">面&emsp;&emsp;积*</div>
        <div class="village">
          <van-field
            v-model="form.buildAcreage"
            placeholder="请输入产权面积"
            type="text"
            input-align="right"
          >
          <span slot="button" >平米</span>
          </van-field>
        </div>
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
    <!-- <section class="plot-footer">
      <van-button size="normal" type="default" url="/house">取消</van-button>
      <van-button size="normal" type="default"  v-if="!isActive" @click="submitData" :loading="loading" loading-text="保存中" class="plot-active">保存</van-button>
      <van-button size="normal" type="default" url="/house" v-else>保存</van-button>
    </section> -->
    <!-- 运营类型 -->
    <van-popup v-model="cityShow" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        :columns="typeList"
        @confirm="cityConfirm"
        @cancel="cityShow = false"
        title="选择运营类型"
      />
    </van-popup>
    <!-- 选择朝向 -->
    <van-popup v-model="towardShow" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        :columns="twordList"
        @confirm="towrdConfirm"
        @cancel="towardShow = false"
        title="选择朝向"
      />
    </van-popup>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Field, Row, Col, Button } from 'vant';
import HrTitle from '@/components/HrTitle.vue';
import ConfirmBtn from '@/components/ConfirmBtn.vue';
import { TYPELIST, TOWARDLIST} from '@/config/config';
import { PerfectForm } from '@/interface/perfectInterface';
import api from '@/api';

const namespace: string = 'global';

// 声明引入的组件
@Component({
  name: 'Perfect',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    HrTitle,
    ConfirmBtn
  }
})
// 类方式声明当前组件
export default class Perfect extends CommonMixins {
  private type: string = '';
  private dong: string = '';
  private cityId: string = '510100';
  private cityShow: boolean = false;
  private towardShow: boolean = false;
  private loading: boolean = false;
  private isFloorErr: boolean = false; // 校验楼层数和楼层
  private typeList: any[] = TYPELIST;
  private entrustId: string = ''; // 委托房源ID
  private twordList: any[] = TOWARDLIST; // 朝向
  private form: PerfectForm = {
    buildAcreage: '', // 房屋建筑面积
    building: '', // 楼栋
    consociationType: '', // 运营类型[1加盟托管 2非加盟托管 3自主管理]
    consociationTypeName: '', // 运营类型[1加盟托管 2非加盟托管 3自主管理]
    floorNum: '',  // 楼层
    floorTotality: '', // 总楼层
    hallNum: '', // 厅数
    kitchenNum: '', // 厨房数
    number: '', // 门牌号
    roomNum: '', // 房间数
    toiletNum: '', // 卫生间数
    toward: '', // 房源朝向
    towardName: '', // 房源朝向
    unit: '' // 单元
  };

  // computed
  get isActive(): boolean {
    return (!this.form.buildAcreage && !this.form.building && !this.form.consociationType && !this.form.floorNum &&
    !this.form.floorTotality && !this.form.hallNum && !this.form.kitchenNum && !this.form.number && !this.form.roomNum
    && !this.form.toiletNum && !this.form.toward  && !this.form.unit) || this.isFloorErr;
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
    this.form.consociationType = item.value;
    this.form.consociationTypeName = item.text;
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
    this.form.toward = item.value;
    this.form.towardName = item.text;
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

  // Watch
  @Watch('form.floorNum')
  private handlerFloorNum(newVal: string) {
    if (newVal && this.form.floorTotality) {
      if (parseFloat(newVal) > parseFloat(this.form.floorTotality)) {
        this.$toast(`楼层数不能大于总楼层数`);
        this.isFloorErr = true;
      } else {
        this.isFloorErr = false;
      }
    }
  }

  @Watch('form.floorTotality')
  private handlerFloorTotality(newVal: string) {
    if (newVal && this.form.floorNum) {
      if (parseFloat(newVal) < parseFloat(this.form.floorNum)) {
        this.$toast(`楼层数不能大于总楼层数`);
        this.isFloorErr = true;
      } else {
        this.isFloorErr = false;
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
.perfect
  .area
    // margin-bottom vw(10)
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
    .perfect-input
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
</style>
