<template>
  <section class="house-appraise">
    <AppraiseLoading v-show="loading" @refresh="refresh"></AppraiseLoading>
    <section v-show="!loading">
      <SingleHouseAppraise
        v-if="isFromAppraiseHOuseInfo || appraiseResult.length <= 1"
        :appraise-info="appraiseResult"
      ></SingleHouseAppraise>
      <MultiHouseAppraise
        :appraise-info="appraiseResult"
        v-else 
      ></MultiHouseAppraise>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import MultiHouseAppraise from '@/views/HouseAppraise/components/MultiHouseAppraise.vue';
import SingleHouseAppraise from '@/views/HouseAppraise/components/SingleHouseAppraise.vue';
import AppraiseLoading from '@/views/HouseAppraise/components/AppraiseLoading.vue';
import { debounce } from '@/utils/utils.ts';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'HouseAppraise',
  components: {
    MultiHouseAppraise,
    SingleHouseAppraise,
    AppraiseLoading
  }
})

// 类方式声明当前组件
export default class HouseAppraise extends CommonMixins {
  private loading: boolean = false; // 请求接口过程中为true
  private isFromAppraiseHOuseInfo: boolean = false; // 从AppraiseHOuseInfo页面跳转过来时为true
  private appraiseResult: any = {}; // 估价结果
  private async mounted() {
    if (this.$route.params.communityId) { // 判断是否是从AppraiseHOuseInfo页面跳转过来
      this.isFromAppraiseHOuseInfo = true;
      this.appraiseResult = this.$route.params;
      console.log(this.$route);
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

  private async getHouseValuation() {
    try {
      this.loading = true;
      const res: any = await this.axios.get(api.getAppraiseList);
      if (res && res.code === '000') {
        if (res.data.valuationDetail && res.data.valuationDetail.length !== 0) {
          if (res.data.valuationDetail.length === 1)  {
            this.appraiseResult = res.data.valuationDetail[0];
          } else {
            this.appraiseResult = res.data.valuationDetail;
          }
        }
        this.loading = false;
        console.log(res);
      } else {
        this.$toast(res.msg || '房屋估价获取失败');
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.loading = false;
    }
  }
}
</script>



<style lang="stylus" rel="stylesheet/stylus" scoped>
  .house-appraise
    height 100%
</style>

