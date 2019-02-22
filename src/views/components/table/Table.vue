/*
 * @Description: 购买弹窗
 * @Author: chenmo
 * @Date: 2019-02-20 14:20:54
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-20 15:43:10
 */



<template>
  <section class="tables">
    <div class="table-title" v-if="title">
      {{title}}
    </div>
    <table class="border-table">
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index">{{column.title}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tab, index) in tableData" :key="index">
          <td v-for="(column, idx) in columns" :key="idx">
            {{column.dataIndex === 'name' ? tab.name : ''}}
            <span v-if="column.dataIndex === 'owner'">
              <img src="../../../assets/images/icon/icon_no.png" alt="" v-if="!tab.owner"/>
              <img src="../../../assets/images/icon/icon_yes.png" alt="" v-else/>
            </span>
            <span v-if="column.dataIndex === 'uoko'">
              <img src="../../../assets/images/icon/icon_no.png" alt="" v-if="!tab.uoko"/>
              <img src="../../../assets/images/icon/icon_yes.png" alt="" v-else/>
            </span>
          </td>
        </tr>
    </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit  } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';

// 声明引入的组件
@Component({
  name: 'Table',
})
// 类方式声明当前组件
export default class Table extends CommonMixins {
  @Prop({ type: String, default: '' })
  private title: string;

  @Prop({ type: Array, default: () => [] })
  private columns: any;

  @Prop({ type: Array, default: () => [] })
  private tableData: any;
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../assets/stylus/main.styl'
.tables
  margin-bottom vw(20)
  .table-title
    padding vw(10) 0
    border 1px solid #e7e7e7 /* no */
    border-bottom 0
    font-size 15px /* no */
    font-weight bold
    text-align center
    color $text-color
  .border-table
    table-layout fixed
    width 100%
    border-collapse collapse
    font-size 13px
    th
      padding vw(6) vw(10)
      border 1px solid #e7e7e7 /* no */
      text-align left
      font-weight 500
    td
      padding vw(6) vw(10)
      border 1px solid #e7e7e7 /* no */
      img
        width vw(15)
</style>
