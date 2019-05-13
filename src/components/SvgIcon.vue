

<!--
 * @Description: svg解决方案
 * @Author: chenmo
 * @Date: 2019-05-10 14:26:53
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-05-10 14:27:14
 -->
<template>
  <svg :class='svgClass' aria-hidden='true'>
    <use :xlink:href='iconName'></use>
  </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'SvgIcon'
})
export default class SvgIcon extends Vue {
  @Prop({ type: String, required: true})
  private iconClass: string;
  @Prop({ type: String})
  private className: string;

  get iconName(): string {
    return `#icon-${this.iconClass}`;
  }

  get svgClass(): string {
    if (this.className) {
      return `svg-icon ${this.className}`;
    }
    return `svg-icon`;
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.svg-icon
  width 20px
  height 20px
  fill currentColor
  overflow hidden
}
</style>
