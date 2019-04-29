<template>
  <section class="house-appraise">
    <AppraiseLoading v-show="loading" @refresh="refresh"></AppraiseLoading>
    <section v-show="!loading">
      <MultiHouseAppraise v-if="appraiseResult.projectPrices && appraiseResult.projectPrices.length>1"  :appraise-info="appraiseResult"></MultiHouseAppraise>
      <SingleHouseAppraise v-else  :appraise-info="appraiseResult"></SingleHouseAppraise>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import MultiHouseAppraise from '@/views/HouseAppraise/components/MultiHouseAppraise.vue';
import SingleHouseAppraise from '@/views/HouseAppraise/components/SingleHouseAppraise.vue';
import AppraiseLoading from '@/views/HouseAppraise/components/AppraiseLoading.vue';
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
  private loading: boolean = true; // 请求接口过程中为true
  private appraiseResult: any = {}; // 估价结果
  private async mounted() {
    this.getHouseValuation();
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
      const res: any = await this.axios.get(api.getSingleHouseValuation);
      if (res && res.code === '000') {
        this.appraiseResult = res;
        this.loading = false;
        console.log(res);
      } else {
        this.loading = true;
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }
}
</script>



<style lang="stylus" rel="stylesheet/stylus" scoped>
  .house-appraise
    height 100%
</style>

