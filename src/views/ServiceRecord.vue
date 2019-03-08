/*
 * @Description: 服务记录
 * @Author: zhegu
 * @Date: 2019-03-07 15:59:12
 * @Last Modified by: zhegu
 * @Last Modified time: 2019-03-08 15:28:22
*/

<template>
  <section class="service-record">
    <div class="order">
      <h1 class="title">订单信息</h1>
      <div class="info">
        <p>订单号：SN08982938356</p>
        <p>服务房源：中粮香颂丽都-1栋2单元505室</p>
        <p>产品名称：龟速带看</p>
        <p>订单状态：服务中</p>
        <p>开始日期：2018-09-10</p>
        <p>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：点名要带看团队最好看的小姐姐带看</p>
      </div>
    </div>
    <div class="log">
      <h1 class="title">订单日志</h1>
      <houseStatus :data="houseStatus"/>
    </div>
    <div class="btn">
      <van-button size="normal" type="default" @click="changeDecorateVisible(true)">验收通过</van-button>
      <van-button size="normal" type="default" @click="changeNopassVisible(true)">验收不通过</van-button>
    </div>
    <div class="mask" v-if="maskVisible" @click="changeNopassVisible(false)"></div>
    <div class="nopass-modal" v-if="nopassVisible">
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
        <span @click="changeNopassVisible(false)">取消</span>
        <span @click="changeNopassVisible(false)">确定</span>
      </div>
    </div>
    <div class="decorate-modal" v-if="decorateVisible">
      <van-icon class="icon-close" name="cross"  @click="changeDecorateVisible(false)"/>
      <h1>确认装修</h1>
      <div class="content">
        <p>装修项</p>
        <ul>
          <li>
            <span>装修施工报价</span>
            <span>￥1000.00元</span>
          </li>
          <li>
            <span>主体拆改费用</span>
            <span>￥1000.00元</span>
          </li>
        </ul>
        <div class="decorate-btn">
          <van-button size="normal" type="default" @click="changeDecorateVisible(false)">共计应付￥18000.00</van-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { solveScrollBug } from '@/utils/utils';
import ImagePreview from './components/ImagePreview/ImagePreview.vue';
import { Button, CellGroup, Field, Icon } from 'vant';
import HouseStatus from './components/house/HouseStatus.vue';
// 声明引入的组件
@Component({
  name: 'ServiceRecord',
  components: {
    ImagePreview,
    HouseStatus,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Icon.name]: Icon
  }
})
export default class ServiceRecord extends CommonMixins {
  private imgUrls: any[] = [
    'http://pic.58pic.com/58pic/15/68/59/71X58PICNjx_1024.jpg',
    'http://pic.58pic.com/58pic/15/68/59/71X58PICNjx_1024.jpg',
    'http://pic.58pic.com/58pic/15/68/59/71X58PICNjx_1024.jpg',
    'http://pic.58pic.com/58pic/15/68/59/71X58PICNjx_1024.jpg',
    'http://pic.58pic.com/58pic/15/68/59/71X58PICNjx_1024.jpg',
    'http://pic.58pic.com/58pic/15/68/59/71X58PICNjx_1024.jpg'
  ]; // 维修前照片
  private maskVisible: boolean = false; // 遮罩层
  private nopassVisible: boolean = false; // 不通过模态框
  private decorateVisible: boolean = false; // 装修模态框
  private desc: string = ''; // 不通过原因
  private houseStatus: any[] = [
    {content: '待确认验收'},
    {content: '2018-08-02 14:34 已支付待维修', createTime: '2018-08-02 14:34'},
    {content: '2018-08-02 14:34 已测量已设计', createTime: '2018-08-02 14:34'},
    {content: '2018-08-02 14:34 服务中', createTime: '2018-08-02 14:34'},
    {content: '2018-08-02 14:34 已接单待服务', createTime: '2018-08-02 14:34'},
  ]; // 维修日志
  /**
   * @description 不通过模态框显示/隐藏
   * @params boolean 布尔值
   * @returns void
   * @author zhegu
   */
  private  changeNopassVisible(visible: boolean) {
    this.maskVisible = visible;
    this.nopassVisible = visible;
    if (!visible) {
      this.decorateVisible = false;
    }
    solveScrollBug(visible);
  }
  /**
   * @description 装修模态框显示/隐藏
   * @params boolean 布尔值
   * @returns void
   * @author zhegu
   */
  private  changeDecorateVisible(visible: boolean) {
    this.maskVisible = visible;
    this.decorateVisible = visible;
    solveScrollBug(visible);
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
.service-record
  padding-bottom vw(70)
  .order,.log
    padding vw(15)
    background-color #fff
    color $text-color
    margin-bottom vw(10)
  .order
    .info 
      height vw(187)
      p
        font-size vw(15)
        line-height vw(21)
        margin-bottom vw(10)
  .btn
    position fixed
    bottom 0
    width 100%
    button 
      background-color $main-color
      color #fff
      height vw(50)
      width 50%
      font-size vw(17)
  .mask
    position fixed
    width 100%
    height 100%
    background: rgba(71,71,71,0.80);
    z-index 100
    top 0
  .nopass-modal
    width vw(270)
    min-height vw(194)
    border-radius vw(10)
    background-color #fff
    position fixed
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
      border: 1px solid #E7E7E7;
      border-radius vw(5)
      margin vw(15) auto
      padding vw(5)
    .modal-btn
      width 100%
      height vw(50)
      line-height vw(50)
      border-top 1px solid #e7e7e7
      span
        display inline-block
        width 50%
        text-align center
        font-size vw(17)
        &:nth-child(1)
          color #2c3d2e
        &:nth-child(2)
          color $main-color
  .decorate-modal
    position fixed
    bottom 0
    width 100%
    height vw(250)
    background #fff
    z-index 200
    .icon-close
      position absolute
      font-size vw(16)
      top vw(16)
      left vw(16)
      color #b8b8b8
    h1
      font-size vw(17)
      text-align center
      margin-top vw(11)
      padding-bottom vw(15)
      border-bottom 1px solid #e7e7e7
    .content
      padding vw(10) vw(15)
      p
        font-size vw(14)
        color #b8b8b8
      ul
        width 100%
        padding-bottom vw(17)
        li
          display flex
          flex-direction row
          justify-content space-between
          border-bottom 1px solid #e7e7e7
          padding vw(12) 0
          font-size vw(15)
          color #474747
      button
        width 100%
        background-color $main-color
        color #fff
        height vw(50)
        font-size vw(17)
        border 0
.title
  font-size vw(16)
  margin-bottom vw(10)
  border-bottom 1px solid #e7e7e7
  padding-bottom vw(10)
.service-record .van-cell:not(:last-child)::after
    border 0
</style>
