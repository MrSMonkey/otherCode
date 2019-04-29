/*
 * @Description: 房源照片
 * @Author: zhegu
 * @Date: 2019-04-24 15:31:41
 * @Last Modified by: LongWei
 * @Last Modified time: 2019-04-29 10:02:28
 */
<template>
  <section class="house-pic">
    <section class="header">
      <h1>{{oldHouseBaseInfo.communityName}} {{oldHouseBaseInfo.houseNumber}}</h1>
      <span>{{oldHouseBaseInfo.startDate | dateFilter}} 至 {{oldHouseBaseInfo.endDate | dateFilter}}</span>
    </section>
    <p class="title">房源照片（装配前）</p>
    <div class="list">
      <ImagePreview :imgagesArr="beforImg" :isFold="true"/>
    </div>
    <p class="title">房源照片（装配后）</p>
    <div class="list">
      <ImagePreview :imgagesArr="afterImg" :isFold="true"/>
    </div>
    <p class="title">房东合同照片</p>
    <div class="list constractImg">
      <ImagePreview :imgagesArr="contactImg" :isFold="true"/>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import ImagePreview from '@/components/ImagePreview.vue';
import api from '@/api';
import { State, Getter, Mutation, Action } from 'vuex-class';

const namespace: string = 'global';

// 声明引入的组件
@Component({
  name: 'OldHousePic',
  components: {
    ImagePreview
  },
  filters: {
    dateFilter(date: string) {
      if (date) {
        return date.slice(0, 10);
      }
    },
  },
})
export default class OldHousePic extends CommonMixins {
  @Getter('getOldHouseBaseInfo', { namespace }) private oldHouseBaseInfo: any;
  private houseId: string = ''; // 房源id
  private contractId: string = ''; // 合同id

  private afterImg: any[] = []; // 装修后照片
  private beforImg: any[] = []; // 装修前照片
  private contactImg: any[] = []; // 合同照片

  private created() {
    this.houseId = this.oldHouseBaseInfo.houseId;
    this.contractId = this.oldHouseBaseInfo.contractId;
  }

  private mounted() {
    this.getPicture();
  }

  // 获取 - 房间图片信息
  private async getPicture() {
    try {
      const res: any = await this.axios.get(`${api.getHousePictures}/${this.houseId}/${this.contractId}`);
      if (res.code === '000') {
        const data = res.data;
        this.contactImg = data.contactImg;
        this.afterImg = data.afterImg;
        this.beforImg = data.beforImg;
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/main.styl';

.house-pic {
  padding-bottom: vw(20);

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: vw(90);
    background: #fff;
    padding: 0 vw(15);

    h1 {
      font-size: 18px;
      color: $text-color;
      margin-bottom: vw(10);
    }

    span {
      font-size: 12px;
      color: $next-text-color;
    }
  }

  .list {
    padding: vw(15) 0 vw(15) vw(15);
    background-color: #fff;
    color: $text-color;
    .img-box {
      width: vw(105);
      height: vw(105);
      margin-right: vw(15);
    }
    .constractImg {
      .van-image-preview__image {
        transform: rotate(-90deg);
      }
    }
  }

  .title {
    color: $next-text-color;
    font-size: 14px;
    height: vw(35);
    line-height: vw(35);
    padding-left: vw(15);
  }
}
</style>
