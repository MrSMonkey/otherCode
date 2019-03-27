/*
 * @Description: 服务类型
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-20 09:27:42
 */

<template>
  <section>
    <section class="service-type" v-if="tableData.length > 0">
      <div class="list" v-for="(item, index) in tableData" :key="index" @click="selectPro(item)">
        <h2>{{item.serviceTypeName}}</h2>
        <div class="serviceType-right"><img src="../assets/images/icon/icon_arrow.png" alt="" class="icon-right"/></div>
      </div>
      <!-- 选择产品弹窗 -->
      <van-popup v-model="proShow" position="bottom" :overlay="true">
        <van-picker
          show-toolbar
          :columns="columns"
          title="选择产品"
          @confirm="cityConfirm"
          @cancel="proShow = false"
        />
      </van-popup>
    </section>
    <section v-else>
      <NoData tip="暂无服务类型" :url="'/myHouse?entrustId=' + entrustId"/>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import NoData from '@/components/NoData.vue';
import CommonMixins from '@/utils/mixins/commonMixins';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'ServiceType',
  components: {
    NoData
  }
})
// 类方式声明当前组件
export default class ServiceType extends CommonMixins {
  private entrustId: string = ''; // 委托房源ID
  private tableData: any[] = []; // 服务类型列表
  private proShow: boolean = false; // 选择产品弹窗
  private columns: any[] = []; // 产品数组
  private mounted() {
    this.entrustId = String(this.$route.query.entrustId);
    this.getServiceType(this.entrustId); // 获取订单列表
  }

  /**
   * @description 获取服务类型
   * @params entrustId 委托id
   * @returns void
   * @author chenmo
   */
  private async getServiceType(entrustId: string) {
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
    try {
      const res: any = await this.axios.get(api.getServiceType + `/${entrustId}`);
      if (res && res.code === '000') {
        this.tableData = res.data || [];
      } else {
        this.$toast(res.msg || `获取服务类型失败`);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.$toast.clear();
    }
  }

  /**
   * @description 选择产品
   * @params status 产品
   * @returns void
   * @author chenmo
   */
  private selectPro(item: any) {
    if (item.ownerServiceTypes.length === 0) {
      // 没有服务产品
      this.$toast('未找到有效订单，请先购买服务后发起');
      return false;
    }
    // const arr: any[] = item.ownerServiceTypes.map((ctx: any) => {
    //   return {
    //     text: ctx.label,
    //     value: ctx.value
    //   };
    // });
    this.columns = item.ownerServiceTypes.map((item: any) => {
      return {
        text: item.status === 1 ? `${item.text}(已使用)` : item.text,
        value: item.value,
        disabled: item.status === 1 ? true : false
      };
    });
    this.proShow = true;
  }

  /**
   * @description 弹窗确定
   * @item 当前选中的值
   * @index 当前选中的索引值
   * @returns void
   * @author chenmo
   */
  private cityConfirm(item: any, index: number) {
    if (item.disabled) {
      // 已使用
      return false;
    }
    this.proShow = false;
    this.$router.push(`/startService?productId=${item.value}&entrustId=${this.entrustId}`);
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
.service-type
  .list
    display -webkit-flex /* Safari */
    display flex
    flex-direction row
    flex-wrap nowrap
    justify-content space-between
    align-items center
    border-bottom 1px solid $border-color-light
    height vw(49)
    background $global-background
    padding 0 vw(15)
    margin-bottom vw(10)
    h2
      font-size 16px
      color $text-color
    .icon-right
      display inline-block
      width 8px
</style>
