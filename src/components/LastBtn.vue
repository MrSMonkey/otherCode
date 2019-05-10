<template>
  <div class="last-btn-panel">
    <van-button
      size="large" 
      :class="['last-btn', disabled ? 'disabled-last-btn' : '']"
      @click="click"
      :disabled="disabled"
    >{{buttonText}}</van-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Button } from 'vant';

@Component({
  name: 'LastBtn',
  components: {
    Button
  }
})

export default class LastBtn extends CommonMixins {
  @Prop({
    type: String,
    default: '按钮文本'
  })
  private buttonText: string;
  @Prop({
    type: Boolean,
    default: false
  })
  private disabled: boolean;

  /**
   * @description 点击按钮触发事件
   * @returns void
   * @author linyu
   */
  @Emit()
  private click() {
    return;
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.last-btn-panel
  padding 0 vw(7.3)
  .last-btn
    font-size 17px
    border-radius 5px
    background $main-color
    color #ffffff
  .disabled-last-btn
    opacity 1
    background $disabled-color  
</style>

