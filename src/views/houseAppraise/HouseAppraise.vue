<template>
  <section class="appraise">
    <div @click="testClick">123123</div>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
  </section>  
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import api from '@/api';

const namespace: string = 'global';

// 声明引入的组件
@Component({
  name: 'HouseAppraise'
})
// 类方式声明当前组件
export default class HouseAppraise extends CommonMixins {
  private testClick(): void {
    this.$router.push({
      path: 'houseAppraise/appraiseHouseInfo'
    });
  }
}
</script>

