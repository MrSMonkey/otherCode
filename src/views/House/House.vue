/*
 * @Description: 提交房源
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-23 14:04:34
 */

<template>
  <section class="house" v-if="isData">
    <section v-if="tableData.length > 0">
      <div class="adver">
        <img  src="@/assets/images/advertisement.png" alt="adver"/>
      </div>
      <HouseList :tableData="tableData" @get-stewards="getStewards"></HouseList>
      <StewardChoose :pickerShow="stewardChooseShow" :steward-list="stewardList" @cancel-choose="cancelChoose" @steward-change="stewardChange"></StewardChoose>
    </section>
    <section v-else>
      <NoHouseList url="entrust"/>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Field, Row, Col } from 'vant';
import { StewardItem } from '@/interface/configInterface.ts';
import StewardChoose from '@/views/House/components/StewardChoose.vue';
import HouseList from '@/views/House/components/HouseList.vue';
import NoHouseList from '@/views/House/components/NoHouseList.vue';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'House',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
    HouseList,
    NoHouseList,
    StewardChoose
  }
})
// 类方式声明当前组件
export default class House extends CommonMixins {
  private tableData: any[] = []; // 委托房源列表
  private isData: boolean = false; // 默认不显示
  private stewardChooseShow: boolean = false; // 是否显示管家选择列表
  private stewardList: StewardItem[] = []; // 管家列表
  private selectedTableDataIndex: number; // 选中房源的房源列表的索引
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
   * @description 获取管家列表并保存选中房源的房源列表tableData中的索引
   * @params id 房源ID
   * @params selectedIndex 选中房源的房源列表的索引
   * @returns void
   * @author linyu
   */
  private async getStewards(id: string | number, selectedIndex: number) {
    try {
      const res: any = await this.axios.get(`${api.getStewards}/${id}`);
      if (res && res.code === '000') {
        if (!res.data.length) {
          this.$dialog.alert({
            title: '提示',
            confirmButtonText: '我知道了',
            className: 'dialogTips',
            message: '当前小区未分配资产管家！<br/>工作人员会尽快联系您'
          });
        } else {
          this.stewardList = res.data;
          this.selectedTableDataIndex = selectedIndex;
          this.stewardChooseShow = true;
        }
      } else {
        this.$toast(res.msg || '获取管家失败');
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }

  /**
   * @description 取消选择资产管家
   * @author linyu
   */
  private cancelChoose() {
    this.stewardChooseShow = false;
  }

  /**
   * @description 资产管家选择确定按钮
   * @params item 选中的资产管家信息item
   * @author linyu
   */
  private async stewardChange(item: StewardItem) {
    try {
      const entrustId = this.tableData[this.selectedTableDataIndex].entrustId; // 房源ID
      const res: any = await this.axios.get(`${api.setAgency}/${entrustId}/${item.assetUserId}`);
      if (res && res.code === '000') {
        this.tableData[this.selectedTableDataIndex].allotAgency = true;
      } else {
        this.$toast(res.msg || '设置资产代理管家失败');
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.stewardChooseShow = false;
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/main.styl'
.house
  height 100%;
  overflow-y scroll
  .adver
    img
      display inline-block
      width 100%
      vertical-align: top
</style>
