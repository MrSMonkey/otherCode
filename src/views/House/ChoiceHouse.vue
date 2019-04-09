/*
 * @Description: 提交房源
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-09 18:00:48
 */

<template>
  <section class="house" v-if="isData">
    <section v-if="tableData.length > 0">
      <ChoiceHouseList :tableData="tableData" @click-item="clickItem"></ChoiceHouseList>
      <section class="house-add" @click="addHouse">
        <img src="@/assets/images/icon_add.png" alt=""/><span>添加房源</span>
      </section>
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
import ChoiceHouseList from './components/ChoiceHouseList.vue';
import NoHouseList from './components/NoHouseList.vue';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'ChoiceHouse',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
    ChoiceHouseList,
    NoHouseList
  }
})
// 类方式声明当前组件
export default class ChoiceHouse extends CommonMixins {
  private addHouseUrl: string = 'serviceHouseInfo'; // 新增房源跳转地址
  private tableData: any[] = []; // 委托房源列表
  private isData: boolean = false; // 默认不显示
  private mounted() {
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
  
  /**
   * @description 选择房源
   * @returns void
   * @author chenmo
   */
  private clickItem(houseItem: any) {
    console.log(houseItem);
  }

  /**
   * @description 选择房源
   * @returns void
   * @author chenmo
   */
  private addHouse() {
    this.$router.push(this.addHouseUrl);
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
  .house-add
    height vw(49)
    line-height vw(47)
    border 2px dashed $disabled-color
    margin-left vw(10)
    margin-right vw(10)
    border-radius 4px
    margin-bottom vw(20)
    text-align center
    color $main-color
    img
      display inline-block
      vertical-align: middle
      width vw(16)
      margin-top -1px
    span
      display inline-block
      font-size 16px
      margin-left vw(10)
</style>
