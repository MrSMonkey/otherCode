/*
 * @Description: 首页表格组件
 * @Author: chenmo
 * @Date: 2019-02-20 14:20:54
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-28 15:15:57
 */



<template>
  <section class="tables">
    <div class="table-title" v-if="title">
      {{title}}
    </div>
    <table class="border-table">
      <tbody>
        <tr v-for="(trItem, trIndex) in tableData" :key="trIndex">
          <td
            v-for="(tdItem, tdIndex) in trItem"
            :class="extra ? 'extra-class' : ''"
            :key="tdIndex"
            :rowspan="tdItem.rowspan ? tdItem.rowspan: ''"
          >
            {{tdItem.text ? tdItem.text : tdItem}} 
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop  } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';

// 声明引入的组件
@Component({
  name: 'Table',
})
// 类方式声明当前组件
export default class Table extends CommonMixins {
  @Prop({ type: Boolean, default: false })
  private extra: string;

  @Prop({ type: String, default: '' })
  private title: string;

  @Prop({ type: Array, default: () => [] })
  private tableData: any;
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.tables
  padding vw(10) 0
  .table-title
    padding vw(10)
    border 1px solid #e7e7e7 /* no */
    border-bottom 0
    font-size vw(15) /* no */
    font-weight bold
    text-align left
    color $text-color
  .border-table
    table-layout fixed
    width 100%
    border-collapse collapse
    font-size 13px
    td
      font-size vw(13)
      color $next-text-color
      padding vw(6) vw(10)
      border 1px solid #e7e7e7 /* no */
      &:first-child
        width vw(105) 
      &.extra-class
        padding vw(14) vw(10)
</style>
