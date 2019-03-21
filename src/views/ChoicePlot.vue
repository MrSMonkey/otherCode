/*
 * @Description: 提交房源
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-18 11:28:30
 */

<template>
  <section class="plot">
    <section class="search">
      <van-field
        v-model="value"
        placeholder="请输入您爱屋所在的小区" 
        clearable
        @change="getPlotList"
      />
    </section>
    <main class="main">
      <ul class="list">
        <li v-for="item in tableList" :key="item.id" @click="selectItem(item)" :class="item.id === active ? 'active' : ''">
          <span>{{item.communityName}}</span>
          <img src="../assets/images/icon/icon_select.png" alt="" v-if="item.id === active"/>
        </li>
      </ul>
    </main>
    <section class="plot-footer">
      <!-- <a>返回</a> -->
      <a @click="onOk">确认</a>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { List, Cell } from 'vant';
import api from '@/api';

const namespace: string = 'global';

// 声明引入的组件
@Component({
  name: 'ChoicePlot',
  components: {
    [List.name]: List,
    [Cell.name]: Cell
  }
})
// 类方式声明当前组件
export default class ChoicePlot extends CommonMixins {
  private value: string = '';
  private cityId: string = '';
  private loading: boolean = false;
  private finished: boolean = false;
  private tableList: any[] = [];
  private active: number = 1;
  private communityId: string = '';
  private communityName: string = '';

  @Mutation('updateCommunityId', { namespace }) private updateCommunityId: any;
  @Mutation('updateCommunityName', { namespace }) private updateCommunityName: any;

  private mounted() {
    this.cityId = String(this.$route.query.cityId);
  }

  /**
   * @description 选择装修情况
   * @returns void
   * @author chenmo
   */
  private selectPlot(item: any) {
    this.active = item.id;
    this.communityId = item.id;
    this.communityName = item.communityName;
  }

  private async getPlotList() {
    if (this.value === '') {
      return false;
    }
    try {
      const res: any = await this.axios.get(api.getCommunityList + `/${this.cityId}/${this.value}`);
      if (res && res.code === '000') {
        this.tableList = res.data || [];
      } else {
        this.$toast(res.msg);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }

  /**
   * @description 确认选中
   * @returns void
   * @author chenmo
   */
  private onOk() {
    if (this.value === '') {
      this.$toast('请输入您爱屋所在的小区');
    } else {
      if (this.tableList.length === 0) {
        // 搜索的小区为[]
        this.updateCommunityId('');
        this.updateCommunityName(this.value);
      } else {
        if (this.communityId === '') {
          // 未选择
          this.$toast('请选择您爱屋所在的小区');
        } else {
          // 选择
          this.updateCommunityId(this.communityId);
          this.updateCommunityName(this.communityName);
          this.$router.push('/entrust');
        }
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
  .plot
    // height 100%
    // background $global-background
    .search
      height vw(55)
      background $global-background
      padding-top vw(5)
      border-bottom 1px solid #eee
      position absolute
      top 0
      left 0
      width 100%
      .van-field
        font-size 14px
    .main
      .list
        li
          background #fff
          height vw(45)
          width 100%
          line-height vw(45)
          color $text-color
          font-size 14px
          padding 0 vw(15)
          border-bottom 1px solid #eee
          display -webkit-flex
          display flex
          justify-content space-between
          align-items center
          img 
            display inline-block
            text-align right
            width vw(16)
            vertical-align middle
        .active
          // background $bg-color-default
          color $main-color
    .plot-footer
      position absolute
      bottom 0
      left 0
      display -webkit-flex
      display flex
      justify-content space-between
      width 100%
      height vw(46)
      align-items center
      a
        display inline-block
        width 100%
        font-size 14px
        text-align center
        height 100%
        line-height vw(46)
        &:nth-child(1)
          background $main-color
          color #fff
        &:nth-child(2)
          background $main-color
          color #fff
</style>
