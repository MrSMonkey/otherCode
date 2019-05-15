/*
 * @Description: linyu
 * @Author: linyu
 * @Date: 2019-04-26 15:25:38
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-29 14:41:20
 */

<template>
  <section class="service-tabs-title" ref="serviceTabsTitle">
    <van-tabs
      v-model="active"
      :line-width="lineWidth"
      :line-height="4"
      sticky
      @scroll="stickChange"
      @click="clickTabsTitle"
    >
      <van-tab v-for="(item, index) in tabsTitleData" :key="index">
        <div slot="title" :ref="'tabsPanel' + index">
          <div :class="['title-panel', active == index ? 'title-panel-active' : '', tabIsFixed ? 'tab-fixed' : '']">
            <div class="title-logo">
              <img :src="item.img"/>
            </div>
            <div class="title-text">{{item.serviceName}}</div>
            <div class="title-desc" :ref="'tabsDesc' + index">
              {{item.serviceDesc}}
            </div>
          </div>
        </div>
        <div class="tab-content" :style="[style1]">
          <slot :name="item.slotName"></slot>
        </div>
        <div class="white-space"></div>
      </van-tab>
    </van-tabs>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Tab, Tabs  } from 'vant';
import { transformVwToPx } from '@/utils/utils.ts';
import api from '@/api';
import { config } from '@vue/test-utils';

// 声明引入的组件
@Component({
  name: 'ServiceTabsTitle',
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab
  }
})
// 类方式声明当前组件
export default class ServiceTabsTitle extends CommonMixins {
  public $refs!: {
    [key: string]: any
  };

  @Prop({
    type: Array,
    default: []
  })
  private tabsTitleData: [];
  private active: number = 0; // 当前选中标签的索引
  private lineWidth: number = 0; // 激活样式的底部条宽度
  private tabIsFixed: boolean = false; // tabs菜单是否吸顶
  private tabsOffsetTop: number = 0; // 获取tab菜单距页面顶部的高度
  private style1: any = {
    marginTop: '149px'
  };

  private mounted() {
    this.lineWidth = transformVwToPx(0.84) / 3;
    this.$nextTick(() => {
      setTimeout(() => {
        const serviceTabsTitle = this.$refs.serviceTabsTitle;
        this.tabsOffsetTop = serviceTabsTitle.offsetTop - 1;
      }, 1000);
    });
  }

  /**
   * @description 吸顶事件是否
   * @v object { scrollTop: 距离顶部位置, isFixed: 是否吸顶 }
   * @isFixed Boolean 是否吸顶
   * @returns void
   * @author linyu
   */
  private stickChange(v: any): void {
    this.tabIsFixed = v.isFixed;
    if (v.scrollTop !== 0 && Math.abs(v.scrollTop - this.tabsOffsetTop) < 5) {
      this.tabIsFixed = true;
    }
    this.$nextTick(() => {
      const tabsHeight: any = this.$refs.tabsPanel1[0].clientHeight + transformVwToPx(0.05);
      this.style1.marginTop = (tabsHeight - 33) + 'px';
    });
  }

  /**
   * @description 点击tab菜单触发事件
   * @params index number 选中的tab标签索引
   * @params index string 选中的服务名称(此处结果始终是undefined)
   * @return string 选中的服务名称
   * @author linyu
   */
  @Emit('click')
  private clickTabsTitle(index: number, title: any): string {
    return this.tabsTitleData[index]['serviceName'];
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.service-tabs-title
  .title-panel
    padding vw(9.5)
    border-radius 5px
    box-shadow 0 0 5px 0 rgba(#000, 0.1)
    .title-logo
      line-height vw(35)
      margin-top vw(5)
      img
        width vw(35)
    .title-text
      font-weight 600
      text-align center
      font-size 16px
      line-height 24px
      color $text-color
    .title-desc
      margin-top vw(5)
      text-align left
      font-size 14px
      line-height 20px
      color $next-text-color
    &.title-panel-active
      box-shadow none
    &.tab-fixed
      .title-desc
        display none
  .white-space
    background transparent
    height 65px
    width 100%
  .van-tabs--line .van-tabs__wrap
    height auto
    padding 0 vw(15)
    background #ffffff
    &[class*=van-hairline]::after
      border none
  .van-tabs__nav--line
    padding-top vw(5)
  .van-tab:last-child
    margin 0
  .van-tab
    margin-right vw(15)
    padding 0
  .van-tabs__line
    bottom 0
</style>
