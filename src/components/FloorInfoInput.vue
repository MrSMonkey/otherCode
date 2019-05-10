/*
 * @Description: 楼层信息输入框
 * @Author: linyu
 * @Date: 2019-04-30 14:51:24
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-30 15:15:19
 */
 
<template>
  <div class="input-panel">
    <div class="label">
      <slot>楼&emsp;&emsp;层</slot>
    </div>
    <van-row type="flex" :justify="inputAlign === 'right' ? 'end' : 'start'" class="village">
      <van-col span="6">
        <van-field
          v-model="floorNumText"
          placeholder="第几层"
          input-align="center"
          @focus="resetText('floorNumText')"
        />
      </van-col>
      <van-col span="6" class="house-info">
        <van-field
          v-model="floorTotalityText"
          placeholder="总楼层"
          input-align="center"
          @focus="resetText('floorTotalityText')"
        />
      </van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Field, Row, Col } from 'vant';

// 声明引入的组件
@Component({
  name: 'FloorInfoInput',
  components: {
    Field,
    Row,
    Col
  }
})
// 类方式声明当前组件
export default class FloorInfoInput extends CommonMixins {
  @Prop({
    type: String,
    default: 'right'
  })
  private inputAlign: string;
  private floorTotality: string = '';  // 总楼层
  private floorNum: string = '';  // 楼层
  private floorNumText: string = ''; // 楼层文本总楼层文本
  private floorTotalityText: string = ''; // 总楼层文本

  @Watch('floorNumText')
  private onFloorNumChange(val: string, oldVal: string) {
    const num: RegExpExecArray | null = /(\d+)/g.exec(this.floorNumText);
    this.floorNum = num ? num[0] : '';
    this.floorNumChange();
    setTimeout(() => {
      this.floorNumText = num ? `第${num[0]}层` : '';
    }, 800);
  }
  @Watch('floorTotalityText')
  private onFloorTotalityChange(val: string, oldVal: string) {
    const num: RegExpExecArray | null = /(\d+)/g.exec(this.floorTotalityText);
    this.floorTotality = num ? num[0] : '';
    this.floorTotalityChange();
    setTimeout(() => {
      this.floorTotalityText = num ? `共${num[0]}层` : '';
    }, 800);
  }

  /**
   * @description 重置输入框内容
   * @returns void
   * @author linyu
   */
  private resetText(propName: 'floorNumText' | 'floorTotalityText') {
    this[propName] = '';
  }

  /**
   * @description 房屋所在楼层变化触发事件
   * @returns String 输入的最新楼层
   * @author linyu
   */
  @Emit()
  private floorNumChange(): string {
    return this.floorNum;
  }

  /**
   * @description 总楼层变化触发事件
   * @returns String 输入的最新总楼层
   * @author linyu
   */
  @Emit()
  private floorTotalityChange(): string {
    return this.floorTotality;
  }
}
</script>


<style lang="stylus" rel="stylesheet/stylus">
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
        .van-cell
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

