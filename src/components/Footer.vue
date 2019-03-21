/*
 * @Description: 脚部
 * @Author: LiuZhen
 * @Date: 2018-09-20 09:48:29
 * @Last Modified by: LiuZhen
 * @Last Modified time: 2018-10-25 11:13:47
 */
<template>
  <footer class="footer">UOKO Mobile WebApp Beta v_{{version}}</footer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component({
  name: 'Footer'
})
export default class Footer extends Vue {
  @State('version') private version: string;
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/index.styl'

.footer
  margin-top vw(20)
  text-align right
  border-top 1px solid #e5e5e5
  height vw(40)
  line-height vw(40)
  color $tip-text-color
  padding-right vw(20)
  font-size vw(12)
</style>
