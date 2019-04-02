/*
 * @Description: 房间配置信息
 * @Author: chenmo
 * @Date: 2019-02-19 11:12:50
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-03-08 17:01:06
 */
/*


<template>
  <section>
    <div class="detail-info">
      <div class="block">
        <label>出租方式：</label>
        <p>{{getRentWay(selectData.rentType) || ''}}</p>
      </div>
      <!-- 合租  -->
      <section v-if="selectData.rentType === 2 && selectData.houseRentRoomDTO.length > 0">
        <div class="block" v-for="(ctx, index) in selectData.houseRentRoomDTO" :key="index" >
          <label>房&nbsp;&nbsp;间&nbsp;&nbsp;&nbsp;{{ctx.roomName}}：</label>
          <p>{{ ctx.rent || '0.00'}} 元/月 | {{getRentStatus(ctx.rentStatus)}} | 押{{ctx.prepayNumber}}付{{ctx.afterpayNumber}} | 中介费{{ctx.agencyFee}}%</p>
        </div>
      </section>
       <!-- 整租  -->
      <section v-if="selectData.rentType === 1 && selectData.houseRentRoomDTO.length > 0">
        <div class="block" >
          <label>出租价格：</label>
          <p>{{selectData.houseRentRoomDTO[0].rent || '0.00' }}元/月 | {{getRentStatus(selectData.houseRentRoomDTO[0].rentStatus)}} | 押{{selectData.houseRentRoomDTO[0].prepayNumber}}付{{selectData.houseRentRoomDTO[0].afterpayNumber}} | 中介费{{selectData.houseRentRoomDTO[0].agencyFee}}%</p>
        </div>
      </section>
      <div class="block">
        <label>标&emsp;&emsp;题：</label>
        <p>{{selectData.title || '无'}}</p>
      </div>
      <div class="block">
        <label>描&emsp;&emsp;述：</label>
        <p class="desc">{{selectData.desc || '无'}}</p>
      </div>
    </div>
    <div class="roomPic">
      <div v-for="(room, index) in selectData.houseRentRoomDTO" :key="index">
        <div class="room-name">房间{{room.roomName}}</div>
        <ImagePreview :imgagesArr="getImages(room.roomImages)"> </ImagePreview>
      </div>
      <!-- 公区照片 -->
      <section>
        <div class="room-name">公区照片</div>
        <ImagePreview :imgagesArr="getImages(selectData.housePublicImages)"> </ImagePreview>
      </section>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop  } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { getQueryString } from '@/utils/utils';
import { RENT_WAY, ZCFU, RENT_STATUS} from '@/config/config';
import ImagePreview from '@/components/ImagePreview.vue';

// 声明引入的组件
@Component({
  name: 'RentInfo',
  components: {
    ImagePreview
  }
})
// 类方式声明当前组件
export default class RentInfo extends CommonMixins {
  @Prop({ type: Object, default: {} })
  private selectData: any;

  /**
   * @description 房间状态
   * @params type 类型
   * @returns string
   * @author chenmo
   */
  private getRentStatus(status: number) {
    return RENT_STATUS[status];
  }

  /**
   * @description 出租方式
   * @params type 类型
   * @returns string
   * @author chenmo
   */
  private getRentWay(type: number) {
    return RENT_WAY[type];
  }

  /**
   * @description 将图片转化成图片字符串
   * @params type 类型
   * @returns string
   * @author chenmo
   */
  private getImages(images: any[]) {
    const arr: any[] = images && images.map((item, index) => {
      return `${item.imageUrl}`;
    });
    return arr;
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../../assets/stylus/main.styl'
  .detail-info
    padding 10px
    // border-top 1px solid $border-color-light
    background-color $global-background
    font-size 14px /* no */
    .block
      display inline-block
      position relative
      padding vw(10) 0 0
      width 100%
      p
        display inline-block
        margin-left vw(88)
        vertical-align top
      .block-secondary
        padding-left: 10px
        width: 45%
        display inline-block
      label
        color $tip-text-color
        display: inline-block
        // width vw(70)
        position absolute
        top vw(10)
        left vw(15)
        text-align justify
        font-size 14px
        &::after
          content ""
          display inline-block
          width 100%
      span
        vertical-align: top
        display inline-block
        color #000
        font-size 14px
      .space-2 
        width 28px /* no */
        height 1px
        display inline-block
      .desc
        max-width  vw(288)
        line-height 1.8
        text-align justify
  .roomPic
    border-top 1px solid $border-color-light
    .room-name
      color $text-color
      font-size 16px
      background $global-background
      font-weight bold
      padding vw(20) vw(20) 0
</style>
