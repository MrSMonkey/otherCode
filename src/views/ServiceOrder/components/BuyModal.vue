/*
 * @Description: 购买弹窗
 * @Author: chenmo
 * @Date: 2019-02-20 14:20:54
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-20 15:43:10
 */



<template>
  <van-popup v-model="buyShow" position="bottom" @click-overlay="cancel">
    <div class="buy-dialog">
      <div class="title">
        <div class="left" @click="cancel">
          <img src="@/assets/images/icon/icon_close.png" alt=""/>
        </div>
        <div class="content">
          购买信息
        </div>
        <div class="right">
          <span>购买</span>
        </div>
      </div>
      <div>
        <van-field
          required
          clearable
          label="联系人*"
          input-align="right"
          placeholder="请输入联系人姓名"
          type="number"
        />
        <van-field
          required
          clearable
          input-align="right"
          label="联系电话*"
          placeholder="请输入联系人电话"
          type="number"
        />
        <div>
          <p>备注</p>
          <van-field
            clearable
            input-align="left"
            placeholder="请输入20字以内的备注"
            type="textarea"
          />
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit  } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { getQueryString } from '@/utils/utils';

// 声明引入的组件
@Component({
  name: 'BuyModal',
})
// 类方式声明当前组件
export default class BuyModal extends CommonMixins {
  @Prop({ type: Boolean, default: false })
  private buyShow: boolean;

  /**
   * @description 点击确定事件
   * @returns void
   * @author chenmo
   */
  private confirm(): void {
    this.$emit('confirmEvent');
  }

  private cancel() {
    this.$emit('cancelEvent');
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../assets/stylus/main.styl'
.buy-dialog
  height vw(300)
  .title
    display -webkit-flex
    display flex
    justify-content space-between
    align-items center
    padding vw(10)
    border-bottom: 1px solid $border-color-light
    .left
      img
        display inline-block
        width vw(18)
        padding-top vw(5)
    .content
      font-size 16px
      color $text-color
    .right
      color $main-color
      font-size 14px
</style>
