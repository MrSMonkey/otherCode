/*
 * @Description: 房间基本信息
 * @Author: chenmo
 * @Date: 2019-02-19 11:12:50
 * @Last Modified by: zhegu
 * @Last Modified time: 2019-03-22 09:38:04
 */
/*


<template>
  <ul class="time-line">
    <li v-for="item in data" :key="item.id">
      <div class="dot"></div>
      <p>【{{item.roomName}}】&nbsp;&nbsp;{{item.record}}</p>
      <span>{{item.workTime}}</span>
      <ImagePreview v-if="item.imgs" :imgagesArr="item.imgs" :isFold="true" />
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop  } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { getQueryString } from '@/utils/utils';
import { RENT_TYPE, TOWARDNAME} from '@/config/config';
import ImagePreview from '../ImagePreview/ImagePreview.vue';

// 声明引入的组件
@Component({
  name: 'HouseStatus',
  components: {
    ImagePreview
  }
})
// 类方式声明当前组件
export default class HouseStatus extends CommonMixins {
  @Prop({ type: Array, default: () => [] })
  private data: any;
  /**
   * @description 过滤托管类型
   * @params type 类型
   * @returns string
   * @author chenmo
   */
  private images: any[] = [
    'http://img5.imgtn.bdimg.com/it/u=4060543606,3642835235&fm=26&gp=0.jpg',
    'http://img5.imgtn.bdimg.com/it/u=4060543606,3642835235&fm=26&gp=0.jpg',
    'http://img5.imgtn.bdimg.com/it/u=4060543606,3642835235&fm=26&gp=0.jpg',
    'http://img5.imgtn.bdimg.com/it/u=4060543606,3642835235&fm=26&gp=0.jpg'
  ];
  private getRentType(type: number) {
    return RENT_TYPE[type];
  }

  /**
   * @description 过滤朝向
   * @params type 类型
   * @returns string
   * @author chenmo
   */
  private getToward(toward: number) {
    return TOWARDNAME[toward];
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../assets/stylus/main.styl'
.time-line
  width 100%
  padding vw(20) vw(20) 0
  .viewImg
    margin-left vw(-20)
    padding-bottom vw(25)
  li
    position relative
    margin-left vw(6)
    padding-left vw(18)
    min-height 65px
    border-left 1px dashed $border-color-light
    .imgfoldView .img-box
      margin-right vw(4.5)
    .dot
      position: absolute
      top 0
      left -6px
      width 12px
      height 12px
      border-radius 50%
      background-color $disabled-color
    p
      vertical-align top
      line-height 1
      color $text-color
      font-size 14px
    span
      color $disabled-color
      font-size 12px /* no */
      line-height 3
    &:first-child
      .dot
        background-color $main-color
    &:last-child
      border 0
</style>
