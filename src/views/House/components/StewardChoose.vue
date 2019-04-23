/*
 * @Description: 资产管家选择picker
 * @Author: linyu
 * @Date: 2019-04-19 14:19:27
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-23 14:04:45
 */

<template>
  <section>
    <van-popup v-model="pickerShow" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        :columns="stewardList"
        @confirm="stewardChange"
        @cancel="cancelChoose"
        value-key="assetUserName"
        title="请选择您爱屋的资产管家"
      />
    </van-popup>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { StewardItem } from '@/interface/configInterface.ts';
import { Field, Row, Col } from 'vant';

// 声明引入的组件
@Component({
  name: 'StewardChoose',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col
  }
})
// 类方式声明当前组件
export default class StewardChoose extends CommonMixins {
  @Prop({
    type: Array,
    default: [],
    required: true
  })
  private stewardList: StewardItem[];  // 管家列表
  @Prop({
    type: Boolean,
    default: false,
    required: true
  })
  private pickerShow: boolean;  // 是否显示

  /**
   * @description 选择管家确认
   * @params item 选中的管家信息item
   * @index index item在stewardList中的索引
   * @returns void
   * @author linyu
   */
  @Emit()
  private stewardChange(item: any, index: number) {
    return;
  }

  /**
   * @description 选择管家取消
   * @returns void
   * @author linyu
   */
  @Emit()
  private cancelChoose() {
    return;
  }
}
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
  .button-panel
    background $main-color
    display inline-block
</style>

