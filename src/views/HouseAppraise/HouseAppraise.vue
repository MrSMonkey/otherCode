<template>
  <section class="house-appraise">
    <!-- <MultiHouseAppraise v-show="false"></MultiHouseAppraise>
    <SingleHouseAppraise v-show="false"></SingleHouseAppraise> -->
    <AppraiseLoading></AppraiseLoading>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import MultiHouseAppraise from '@/views/HouseAppraise/components/MultiHouseAppraise.vue';
import SingleHouseAppraise from '@/views/HouseAppraise/components/SingleHouseAppraise.vue';
import AppraiseLoading from '@/views/HouseAppraise/components/AppraiseLoading.vue';

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
  @Prop({
    type: Boolean,
    default: false
  })
  private star: boolean;

}
</script>



<style lang="stylus" rel="stylesheet/stylus" scoped>
  .house-appraise
    height 100%
</style>

