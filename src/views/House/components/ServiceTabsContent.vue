/*
 * @Description: linyu
 * @Author: linyu
 * @Date: 2019-04-28 14:23:31
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-28 15:16:39
 */

<template>
  <section class="info-plant">
    <section class="info-panel top-panel">
      <ServiceDesc :service-desc-data="serviceDescData"></ServiceDesc>
    </section>
    <section class="info-panel table-panel">
      <div v-for="(item, index) in tableData" :key="index">
        <Table
          :tableData="item.data"
          :title="item.title ? item.title : ''"
          :extra="item.extra"
        ></Table>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import Table from '@/views/House/components/Table.vue';
  import ServiceDesc from '@/views/House/components/ServiceDesc.vue';
  @Component({
    name: 'ServiceTabsContent',
    components: {
      Table,
      ServiceDesc
    }
  })
  export default class ServiceTabsContent extends Vue {
    @Prop({
      type: Object,
      default: {}
    })
    private serviceDescData: any;
    @Prop({
      type: Array,
      default: []
    })
    private tableData: any;
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.info-plant
  margin vw(20) 0 0
  padding 0 vw(20)
  .top-panel
    background-color: $global-background;
    border-radius 8px/* no */
    margin-bottom 10px
  .info-panel
    background-color: $global-background;
    border-radius 8px/* no */
  .table-panel
    padding 10px 15px  
</style>
