/*
 * @Description: 我的房源详情
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-02 14:18:28
 */

<template>
  <section>
      <router-view></router-view>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'MyHouse'
})
// 类方式声明当前组件
export default class MyHouse extends CommonMixins {
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
</style>
