/*
 * @Description: 选择户型input组件
 * @Author: linyu
 * @Date: 2019-04-09 12:39:25
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-30 16:05:54
 */

<template>
  <section>
    <div class="input-panel">
      <div class="label">户&emsp;&emsp;型</div>
      <div class="village">
        <van-field
          v-model="houseTypeValue"
          :placeholder="placeholderText"
          type="text"
          right-icon="arrow"
          readonly
          :input-align="inputAlign"
          @click="pickerShow = true"
          @click-right-icon="pickerShow = true"
        />
      </div>
    </div>
    <!-- 户型picker -->
    <van-popup v-model="pickerShow" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        :columns="houseTypeCloumns"
        @confirm="houseTypeConfirm"
        @cancel="pickerShow = false"
        title="选择城市"
      />
    </van-popup>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { HouseTypeInputProp, HouseTypeInputOpts } from '@/interface/configInterface.ts';
import { Field, Row, Col } from 'vant';
import { throttle } from '@/utils/utils';

// 声明引入的组件
@Component({
  name: 'HouseTypeInput',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col
  }
})
// 类方式声明当前组件
export default class HouseTypeInput extends CommonMixins {
  @Prop({
    type: Object,
    default: () => {
      return {
        max: 9,
        show: true
      };
    }
  })
  private room: HouseTypeInputProp;
  @Prop({
    type: Object,
    default: () => {
      return {
        max: 5,
        show: true
      };
    }
  })
  private hall: HouseTypeInputProp;
  @Prop({
    type: Object,
    default: () => {
      return {
        max: 5,
        show: true
      };
    }
  })
  private kitchen: HouseTypeInputProp;
  @Prop({
    type: Object,
    default: () => {
      return {
        max: 5,
        show: true
      };
    }
  })
  private toilet: HouseTypeInputProp;
  @Prop({
    type: String,
    default: '请选择户型'
  })
  private placeholderText: string;
  @Prop({
    type: String,
    default: ''
  })
  private houseTypeValue: string;
  @Prop({
    type: String,
    default: 'right'
  })
  private inputAlign: string;
  private houseType: HouseTypeInputOpts[] = [];
  private houseTypeCloumns: any = [];
  private pickerShow: boolean = false;

  private mounted() {
    if (this.room.show) {
      const roomOptions = Object.assign({}, {show: true, max: 9, unit: '室', className: 'room'}, this.room);
      this.houseType.push(roomOptions);
    }
    if (this.hall.show) {
      const hallOptions = Object.assign({}, {show: true, max: 5, unit: '厅', className: 'hall'}, this.hall);
      this.houseType.push(hallOptions);
    }
    if (this.kitchen.show) {
      const kitchenOptions = Object.assign({}, {show: true, max: 5, unit: '厨', className: 'kitchen'}, this.kitchen);
      this.houseType.push(kitchenOptions);
    }
    if (this.toilet.show) {
      const toiletOptions = Object.assign({}, {show: true, max: 5, unit: '卫', className: 'toilet'}, this.toilet);
      this.houseType.push(toiletOptions);
    }
    this.createCloumns();
  }
  /**
   * @description Picker选项对象生成函数
   * @author linyu
   */
  private createCloumns() {
    this.houseTypeCloumns = this.houseType.map((pValue, index) => {
      const options = {
        values: Array.from({length: pValue.max + 1}).map((cValue, index) => {
          return `${index}${pValue.unit}`;
        }),
        className: pValue.className
      };
      return options;
    });
  }
  /**
   * @description 户型选择确定触发事件
   * @params items Array 选中的item数组
   * @params indexs Array 选中的索引index数组
   * @returns houseType 户型选择结果的文本内容
   * @author linyu
   */
  @Emit()
  private houseTypeConfirm(items: any, indexs: number[]) {
    const houseType: any = {};
    let ind: number = 0;
    if (this.room.show) {
      houseType.roomNum = indexs[ind++];
    }
    if (this.hall.show) {
      houseType.hallNum = indexs[ind++];
    }
    if (this.kitchen.show) {
      houseType.kitchenNum = indexs[ind++];
    }
    if (this.toilet.show) {
      houseType.toiletNum = indexs[ind++];
    }
    this.pickerShow = false;
    return houseType;
  }
}
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
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
</style>

