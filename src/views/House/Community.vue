<template>
  <section class="plot">
    <section class="search">
      <van-field
        v-model="value"
        placeholder="请输入您爱屋所在的小区" 
        clearable
      />
    </section>
    <main class="main">
      <ul class="list" v-if="tableList.length > 0">
        <li v-for="item in tableList" :key="item.id" @click="selectCommunity(item)" :class="item.id === plotAacive ? 'active' : ''">
          <span>{{item.communityName}}({{item.address}})</span>
          <img src="@/assets/images/icon/icon_select.png" alt="" v-if="item.id === plotAacive"/>
        </li>
      </ul>
      <div v-if="tableList.length === 0 && isGetPlot">
        <div class="noserch">
          <p class="noserch-title">未找到您输入的小区</p>
          <p class="tips">快速咨询，请点击拨打：10105288</p>
          <a href="tel:10105288">快速委托</a>
        </div>
      </div>
    </main>
    <confirmBtn 
      loadingText="保存中"
      cancelText="返回"
      @confirm="onOk"
      @plotCancel="plotCancel"
      :isActive="tableList.length > 0"
    >
      <template slot="confirm">
        <span>确认</span>
      </template>
    </confirmBtn>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Field, Row, Col } from 'vant';
import ConfirmBtn from '@/components/ConfirmBtn.vue';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'Community',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
    ConfirmBtn
  }
})

export default class Community extends CommonMixins {
  private value: string = '';
  private cityId: string = '';
  private plotAacive: number = -1;
  private communityId: string = '';
  private communityName: string = '';
  private tableList: any[] = [];
  private isGetPlot: boolean = false; // 判断是否请求了小区

  @Watch('value')
  private handlerValue(newVal: string) {
    if (newVal !== '') {
      this.getPlotList(); // 请求小区数据
    } else {
      this.isGetPlot = false;
      this.tableList = []; // 清空查询
    }
  }

  /**
   * @description 获取小区
   * @returns void
   * @author chenmo
   */
  private async getPlotList() {
    if (this.value === '') {
      return false;
    }
    try {
      const res: any = await this.axios.get(api.getCommunityList + `/${this.cityId}/${this.value}`);
      if (res && res.code === '000') {
        this.tableList = res.data || [];
        this.isGetPlot = true; // 请求成功
      } else {
        this.$toast(res.msg);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }

  /**
   * @description 选择小区
   * @returns void
   * @author chenmo
   */
  private selectCommunity(item: any) {
    this.plotAacive = item.id;
    this.communityId = item.id;
    this.communityName = item.communityName;
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
        if (this.communityId === '') {
          // 未选择
          this.$toast('请选择您爱屋所在的小区');
        } else {
          console.log(this.communityId);
          console.log(this.communityName);
          // 跳转至enturst页面
          this.$router.push({
            name: 'entrust',
            params: {
              communityId: this.communityId,
              communityName: this.communityName
            }
          });
        }
    }
  }

  /**
   * @description 取消按钮事件
   * @returns void
   * @author chenmo
   */
  private plotCancel() {
    this.$router.back();
  }

  private mounted() {
    this.cityId = this.$route.params.cityId;
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/main.styl'
 .plot
    .search
      height vw(55)
      background $global-background
      padding-top vw(5)
      border-bottom 1px solid #eee
      position absolute
      top 0
      left 0
      width 100%
      z-index 1000
      .van-field
        font-size 14px
    .main
      margin-top vw(75)
      margin-bottom vw(70)
      .list
        margin-top vw(20)
        height vw(520)
        overflow-y scroll
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
          span  
            width vw(320)
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
          img 
            display inline-block
            text-align right
            width vw(16)
            vertical-align middle
        .active
          // background $bg-color-default
          color $main-color
      .noserch
        margin-top vw(200)
        text-align center
        .noserch-title
          font-size 16px
          color $text-color
        .tips
          font-size 14px
          color $tip-text-color
          margin-top vw(20)
        a
          display inline-block
          border 1px solid $main-color
          color $main-color
          font-size 14px
          padding vw(5) vw(20)
          border-radius vw(4)
          margin-top vw(20)
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
          background #fff
          color $main-color
        &:nth-child(2)
          background $main-color
          color #fff

</style>


