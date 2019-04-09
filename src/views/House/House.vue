/*
 * @Description: 提交房源
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-09 16:57:59
 */

<template>
  <section class="house" v-if="isData">
    <section v-if="tableData.length > 0">
      <div class="adver">
        <img  src="@/assets/images/advertisement.png" alt="adver"/>
      </div>
      <HouseList :tableData="tableData"></HouseList>
    </section>
    <section v-else>
      <NoHouseList :url="addHouseUrl"/>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Field, Row, Col } from 'vant';
import HouseList from './components/HouseList.vue';
import NoHouseList from './components/NoHouseList.vue';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'House',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
    HouseList,
    NoHouseList
  }
})
// 类方式声明当前组件
export default class House extends CommonMixins {
  private addHouseUrl: string; // 新增房源时跳转的url
  private tableData: any[] = []; // 委托房源列表
  private isData: boolean = false; // 默认不显示
  private mounted() {
    console.log(this.$route.query.nextUrl);
    this.$route.query.nextUrl
    ? this.addHouseUrl = String(this.$route.query.nextUrl)
    : this.addHouseUrl = 'entrust';
    console.log(this.addHouseUrl);
    this.getHouseList(); // 获取房源列表
  }

  /**
   * @description 获取列表
   * @returns void
   * @author chenmo
   */
  private async getHouseList() {
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
    this.isData = false;
    try {
      const res: any = await this.axios.get(api.getHouseList);
      if (res && res.code === '000') {
        this.tableData = res.data || [];
      } else {
        this.$toast(`获取房源失败`);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.isData = true;
      this.$toast.clear();
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/main.styl'
.house
  .adver
    img
      display inline-block
      width 100%
      vertical-align: top
</style>
