<template>
  <section class="house-appraise">
    <AppraiseLoading v-show="loading" @refresh="refresh"></AppraiseLoading>
    <section class="result-panel" v-show="!loading">
      <div class="zero-result" v-if=" isLogin && (!isFromAppraiseHOuseInfo && appraiseResult.length === 0)">
        <div>
          你所在小区房屋暂时无法估价，请敬请期待！
          <br/>
          <span @click="toAppraiseHouseInfo">点击查看</span> 其它房源估价
        </div>
      </div>
      <SingleHouseAppraise
        v-if="isFromAppraiseHOuseInfo || appraiseResult.length === 1"
        :appraiseInfo="appraiseOneResult"
      >
        <div class="btn-panel">
          <LastBtn button-text="查看其它房屋估价" @click="toAppraiseHouseInfo"></LastBtn>
        </div>
      </SingleHouseAppraise>
      <MultiHouseAppraise
        :appraiseInfo="appraiseResult"
        v-if=" isLogin && !isFromAppraiseHOuseInfo && appraiseResult.length > 1" 
      >
        <div class="btn-panel">
          <LastBtn button-text="查看其它房屋估价" @click="toAppraiseHouseInfo"></LastBtn>
        </div>
      </MultiHouseAppraise>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import store from '@/store';
import LastBtn from '@/components/LastBtn.vue';
import MultiHouseAppraise from '@/views/HouseAppraise/components/MultiHouseAppraise.vue';
import SingleHouseAppraise from '@/views/HouseAppraise/components/SingleHouseAppraise.vue';
import AppraiseLoading from '@/views/HouseAppraise/components/AppraiseLoading.vue';
import { debounce } from '@/utils/utils.ts';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'HouseAppraise',
  components: {
    LastBtn,
    MultiHouseAppraise,
    SingleHouseAppraise,
    AppraiseLoading
  }
})

// 类方式声明当前组件
export default class HouseAppraise extends CommonMixins {
  private loading: boolean = false; // 请求接口过程中为true
  private isLogin: boolean = false; // 默认值为未登录
  private isFromAppraiseHOuseInfo: boolean = false; // 从AppraiseHOuseInfo页面跳转过来时为true
  private appraiseOneResult: any = {}; // 单个估价结果
  private appraiseResult: any[] = []; // 多个估价结果
  private async mounted() {
    await this.getIsLogin(); // 获取登录状态
    if (this.$route.params.communityId) { // 判断是否是从AppraiseHOuseInfo页面跳转过来
      this.isFromAppraiseHOuseInfo = true;
      this.appraiseOneResult = this.$route.params;
      window.InfoCollectInstance.handleEventReport({ // 信息采集
        eventId: 'CH002-ConclusionOfValue-detailview'
      }, 'detailview');
    } else {
      this.getHouseValuation();
    }
  }
  /**
   * @description 刷新按钮触发事件
   * @returns void
   * @author linyu
   */
  private refresh() {
    this.getHouseValuation();
  }
  /**
   * @description 获取登录状态
   * @returns void
   * @author linyu
   */
  private getIsLogin() {
    const token: any = store.getters['global/getToken'];
    this.isLogin = token ? true : false;
  }
  /**
   * @description 已有房源直接获取估价结果
   * @returns void
   * @author linyu
   */
  private async getHouseValuation() {
    try {
      if (!this.isLogin) { // 用户未登录系统
        await window.InfoCollectInstance.handleEventReport({ // 信息采集
          eventId: 'CH002-housesourceestimate-menuswitch'
        }, 'menuswitch');
        this.toAppraiseHouseInfo(); // 跳转
      } else {
        this.loading = true;
        const res: any = await this.axios.get(api.getAppraiseList);
        if (res && res.code === '000') {
          if (res.data.houseCount === 0) {
            await window.InfoCollectInstance.handleEventReport({ // 信息采集
              eventId: 'CH002-housesourceestimate-menuswitch'
            }, 'menuswitch');
            // 房源数量为0
            this.toAppraiseHouseInfo(); // 跳转
          } else {
            if (res.data.valuationDetail && res.data.valuationDetail.length !== 0) {
              if (res.data.valuationDetail.length === 1)  {
                this.appraiseResult = res.data.valuationDetail;
                this.appraiseOneResult = res.data.valuationDetail[0];
              } else {
                this.appraiseResult = res.data.valuationDetail;
              }
              await window.InfoCollectInstance.handleEventReport({ // 信息采集
                eventId: 'CH002-ConclusionOfValue-detailview'
              }, 'detailview');
            } else {
              this.appraiseResult = [];
            }
          }
          this.loading = false;
        } else if (res && res.code === '40001') {
          this.$toast(res.msg || '系统繁忙，请稍后重试');
        } else{
          this.$toast(res.msg || '房屋估价获取失败');
        }
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }

  /**
   * @description 跳转到录入房屋估价信息页面
   * @returns void
   * @author linyu
   */
  private async toAppraiseHouseInfo() {
    await window.InfoCollectInstance.handleEventReport({ // 信息采集
      eventId: 'CH002-OtherSuite-click'
    }, 'click');
    this.$router.push('/appraiseHouseInfo');
  }
}
</script>



<style lang="stylus" rel="stylesheet/stylus" scoped>
  .house-appraise
    height 100%
    .result-panel
      height 100%
      .zero-result
        height 100%
        display flex
        align-items center
        justify-content center
        line-height 24px
        text-align center
        color $next-text-color
        font-size vw(14)
        span 
          color $main-color
      .btn-panel
        margin-top vw(15)
</style>
</style>

