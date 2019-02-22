/*
 * @Description: Header公共组件
 * @Author: LiuZhen
 * @Date: 2018-09-18 16:19:09
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-15 10:28:48
 */
<template>
  <header class="header" ref="header">{{title}}
    <router-link to="/">
      <van-icon name="arrow-left" class="return-arrow" />
    </router-link>
  </header>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Icon } from 'vant';

@Component({
  name: 'Header',
  components: {
    [Icon.name]: Icon
  }
})
export default class Header extends Vue {
  @Prop({ type: String, default: 'Title' })
  private title: any;
  @Prop({ type: Number, default: 40 })
  private height: any;
  @Prop({ type: String, default: '#fff' })
  private backgroundColor: any;

  private mounted() {
    (this.$refs.header as HTMLElement).style.height = `${this.height}px`;
    (this.$refs.header as HTMLElement).style.lineHeight = `${this.height}px`;
    (this.$refs.header as HTMLElement).style.backgroundColor = this.backgroundColor;
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/index.styl'

.header
  position relative
  width 100%
  text-align center
  font-size vw(14)
  .return-arrow
    position absolute
    top 50%
    left vw(20)
    transform translate3d(0, -50%, 0)
    font-size vw(14)
</style>
