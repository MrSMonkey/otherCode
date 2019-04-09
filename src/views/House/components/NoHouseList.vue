/*
 * @Description: 首页表格组件
 * @Author: chenmo
 * @Date: 2019-02-20 14:20:54
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-20 15:43:10
 */



<template>
  <section class="no-house">
    <img src="@/assets/images/illustration_blank.png" alt="图标"/>
    <p>您尚未提交意向资源，您可以<a :href="'/#/' + url">立即增加</a></p>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit  } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';

// 声明引入的组件
@Component({
  name: 'NoHouseList',
})
// 类方式声明当前组件
export default class NoHouseList extends CommonMixins {
  @Prop({ type: String, default: '' })
  private url: string;
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../assets/stylus/main.styl'
.no-house
  text-align center
  img 
    display inline-block
    width 120px
    margin-top vw(100)
  p
    margin-top 20px
    font-size 14px
    color $text-color
    a
      display inline-block
      color $main-color
</style>
