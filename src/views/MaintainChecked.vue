/*
 * @Description: 维修验证
 * @Author: zhegu
 * @Date: 2019-03-07 11:47:40
 * @Last Modified by: zhegu
 * @Last Modified time: 2019-03-08 15:29:07
*/

<template>
  <section class="maintain-checked">
    <div class="total">
      <h1 class="title">费用结算</h1>
      <p class="cost">
        <span>维修总金额</span>
        <span>110.00元</span>
      </p>
    </div>
    <div class="before">
      <h1 class="title">维修前照片</h1>
      <ImagePreview :imgagesArr="imgUrls" :isFold="true" />
    </div>
    <div class="after">
      <h1 class="title">维修后照片</h1>
      <ImagePreview :imgagesArr="imgUrls" :isFold="true" />
    </div>
    <div class="btn">
      <van-button size="normal" type="default">验收通过</van-button>
      <van-button size="normal" type="default" @click="changeVisible(true)">验收不通过</van-button>
    </div>
    <transition name="van-fade">
      <div class="mask" v-show="maskVisible" @click="changeVisible(false)"></div>
    </transition>
    <transition name="van-fade">
      <div v-show="modalVisible" class="modal">
        <h1>不通过原因</h1>
        <van-field
          class="text"
          v-model="desc"
          type="textarea"
          placeholder="请输入50字以内的不通过原因描述"
          rows="3"
          autosize
        />
        <div class="modal-btn">
          <span @click="changeVisible(false)">取消</span>
          <span @click="changeVisible(false)">确定</span>
        </div>
      </div>
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { solveScrollBug } from '@/utils/utils';
import ImagePreview from './components/ImagePreview/ImagePreview.vue';
import { Button, CellGroup, Field } from 'vant';

// 声明引入的组件
@Component({
  name: 'MaintainChecked',
  components: {
    ImagePreview,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field
  }
})
export default class MaintainChecked extends CommonMixins {
  private imgUrls: any[] = [
    'http://pic.58pic.com/58pic/15/68/59/71X58PICNjx_1024.jpg',
    'http://pic.58pic.com/58pic/15/68/59/71X58PICNjx_1024.jpg',
    'http://pic.58pic.com/58pic/15/68/59/71X58PICNjx_1024.jpg',
    'http://pic.58pic.com/58pic/15/68/59/71X58PICNjx_1024.jpg',
    'http://pic.58pic.com/58pic/15/68/59/71X58PICNjx_1024.jpg',
    'http://pic.58pic.com/58pic/15/68/59/71X58PICNjx_1024.jpg'
  ]; // 维修前照片
  private maskVisible: boolean = false; // 遮罩层
  private modalVisible: boolean = false; // 模态框
  private desc: string = ''; // 不通过原因
/**
 * @description 模态框显示/隐藏
 * @params boolean 布尔值
 * @returns void
 * @author zhegu
 */
  private  changeVisible(visible: boolean) {
    this.maskVisible = visible;
    this.modalVisible = visible;
    solveScrollBug(visible);
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
.maintain-checked
  padding-bottom vw(70)
  .total,.before,.after
    padding vw(15)
    background-color #fff
    color $text-color
    margin-bottom vw(10)
  .total
    height vw(80)
    .cost 
      display flex
      flex-direction row
      justify-content space-between
      font-size vw(15)
      span
      &:nth-child(2)
        font-weight bolder
  .before
    min-height vw(145)
  .btn
    position absolute
    bottom 0
    width 100%
    button 
      background-color $main-color
      color #fff
      height vw(50)
      width 50%
      font-size vw(17)
  .mask
    position absolute
    width 100%
    height 100%
    background rgba(71,71,71,0.80)
    z-index 100
    top 0
  .modal
    position absolute
    width vw(270)
    min-height vw(194)
    border-radius vw(10)
    background-color #fff
    top vw(230)
    left 0
    right 0
    margin auto
    z-index 200
    h1
      font-size vw(17)
      text-align center
      margin-top vw(15)
    .text
      width 90%
      background-color transparent
      border 1px solid #E7E7E7
      border-radius vw(5)
      margin vw(15) auto
      padding vw(5)
    .modal-btn
      width 100%
      height vw(50)
      line-height vw(50)
      border-top 1px solid #eee
      span
        display inline-block
        width 50%
        text-align center
        font-size vw(17)
        &:nth-child(1)
          color #2c3d2e
        &:nth-child(2)
          color $main-color
.title
  font-size vw(16)
  margin-bottom vw(10)
.maintain-checked .van-cell:not(:last-child)::after
    border 0
</style>
