/*
 * @Description: 房屋估价选择小区页面
 * @Author: linyu
 * @Date: 2019-04-09 12:40:00
 * @Last Modified by: linyu
 * @Last Modified time: 2019-05-14 16:33:28
 */

<template>
  <section class="appraise-community">
    <section class="search">
      <van-field
        v-model="searchInputValue"
        placeholder="请输入您爱屋所在的小区" 
        autofocus="true"
        clearable
      />
    </section>
    <main class="main">
      <div class="text">
        <span>{{listTopTip}}</span>
      </div>
      <div class="list" v-if="tableList.length > 0">
        <van-pull-refresh
          v-model="refreshing"
          @refresh="getCommunityList"
        >
          <van-list
            v-model="loading"
            :finished="true"
            finished-text="没有更多了"
            error-text="请求失败，点击重新加载"
            @load="getCommunityList"
            :immediate-check="false"
          >
            <van-cell
              v-for="item in tableList"
              :key="item.id"
              :border="false"
              class="list-cell "
            >
              <template>
                <div class="list-item-panel" @click="selectCommunity(item)" :class="item.id === plotAacive ? 'active' : ''">
                  <span class="community-name list-item">{{item.communityName}}</span>
                  <span class="address list-item">{{item.address}}</span>
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </div>
    </main>
    <section class="community-footer">
      <confirmBtn 
        loadingText="保存中"
        cancelText="返回"
        @confirm="onOk"
        @plotCancel="plotCancel"
        :isActive="isActive"
      >
        <template slot="confirm">
          <span>确认</span>
        </template>
      </confirmBtn>
    </section>
    <van-dialog
      v-model="dialogShow"
      title="提示"
      confirm-button-text="保存"
      show-cancel-button
      class="appraise-dialog"
      :before-close="beforeClose"
    >
      <div class="dialog-content">
        <div class="dialog-text-panel">您爱屋所在的小区名未找到，评估师将通过人工方式为您评估价格后反馈给您。</div>
        <div class="form-panel">
          <van-field
            v-model="username"
            label="称呼："
            placeholder="请输入您的称呼"
            autofocus
          />
          <van-field
            v-model="phone"
            type="tel"
            label="电话："
            placeholder="请输入您的联系方式"
          />
        </div>
      </div>
    </van-dialog>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop, Emit } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { State, Getter, Mutation, Action } from 'vuex-class';
import { Field, Row, Col, Cell, List, PullRefresh  } from 'vant';
import ConfirmBtn from '@/components/ConfirmBtn.vue';
import { BAIDU_AK } from '@/config/config';
import api from '@/api';
import { Point } from '@/interface/utilInterface';
import { config } from '@vue/test-utils';
import { debounce } from '@/utils/utils';
const namespace: string = 'global';

// 声明引入的组件
@Component({
  name: 'AppraiseCommunity',
  components: {
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    ConfirmBtn
  }
})

export default class AppraiseCommunity extends CommonMixins {
  private searchInputValue: string = ''; // 搜索关键词
  private listTopTip: string = '暂无小区可选';
  private cityId: string = '510100';
  private plotAacive: number = -1; // 选中的样式激活的ID
  private communityId: string = '';
  private communityName: string = '';
  private refreshing: boolean = false; // 刷新请求是否完成，完成时值为false
  private username: string = ''; // 称呼
  private phone: string = ''; // 电话
  private loading: boolean = false; // 加载更多请求是否完成，完成时值为false
  private dialogShow: boolean = false; // 是否显示dialog
  private debounceGetCommunityList: any = debounce(() => { // 防抖处理
    this.getCommunityList(); // 请求小区数据
  }, 1000);
  private tableList: any = []; // 小区列表
  private point: any = {
    lat: '', // 维度
    lon: ''  // 经度
  };
  @Watch('searchInputValue')
  private handlerSearchInputValue(newVal: string) {
    this.debounceGetCommunityList();
  }
  @Watch('username')
  private handlerUsername(newVal: string) {
    if (newVal.length > 20) {
      this.username = newVal.substr(0, 20);
    }
  }
  // computed
  get isActive(): boolean {
    return (this.searchInputValue === '' && this.communityId !== '') || this.searchInputValue !== '';
  }

  /**
   * @description 表单验证
   * @returns void
   * @author linyu
   */
  private validForm(): boolean {
    const usernamePattern = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/g;
    const PhonePattern = /^(\d{11})|(\d{7,8})$/g;
    if (!this.username) {
      this.$toast('请输入称呼');
      return false;
    }
    if (!this.phone) {
      this.$toast('请输入手机号');
      return false;
    }
    if (usernamePattern.test(this.username)) {
      this.$toast('输入的称呼格式有误');
      return false;
    }
    return true;
  }
  /**
   * @description 获取小区
   * @returns void
   * @author linyu
   */
  private async getCommunityList() {
    if (this.searchInputValue !== '') {
      try {
        const res: any =  await this.axios.get(`${api.getAppraiseCommunityList}/${this.searchInputValue}/20`);
        this.updateSomeData(res);
      } catch (err) {
        throw new Error(err || 'Unknow Error!');
      }
    }
  }

  /**
   * @description 请求完成后更新数据
   * @params respData 必需，本次请求的响应结果
   * @returns void
   * @author linyu
   */
  private updateSomeData(respData: any) {
    this.tableList = [];
    this.communityId = '';
    this.communityName = '';
    this.plotAacive = -1;
    if (respData && respData.code === '000') {
      this.tableList.push(...respData.data);
      if (this.tableList.length) {
        this.listTopTip = '请选择小区名称';
      } else {
        this.listTopTip = '未找到该小区，确认提交后工作人员会尽快为您处理！';
      }
    } else {
      console.log(respData);
      this.$toast(respData.msg);
    }
    this.loading = false;
    this.refreshing = false;
  }

  /**
   * @description 选择小区
   * @returns void
   * @author chenmo
   */
  private selectCommunity(item: any) {
    this.plotAacive = item.id;
    this.communityId = item.id;
    this.communityName = item.communityName;
  }

  /**
   * @description 确认选中
   * @returns void
   * @author chenmo
   */
  private onOk() {
    if ((this.searchInputValue !== '' && this.tableList.length && this.communityId === '')
      || (this.searchInputValue !== '' && this.tableList.length <= 0)) {
        this.dialogShow = true;
    } else {
      this.$router.push({
        name: 'appraiseHouseInfo',
        params: {
          communityId: this.communityId,
          communityName: this.communityName
        }
      });
    }
  }

  /**
   * @description 取消按钮事件
   * @returns void
   * @author chenmo
   */
  private plotCancel() {
    this.$router.back();
  }

  private async beforeClose(action: any, done: any) {
    if (action === 'confirm') {
      if (!this.validForm()) {
        done(false);
        return false;
      }
      await this.postMail();
      done();
    } else {
      done();
    }
  }

  /**
   * @description 为找到小区发送email
   * @returns void
   * @author chenmo
   */
  private async postMail() {
    try {
      const res: any = await this.axios.post(api.sendMail, {
        cityId: '278',
        cityName: '成都市',
        communityName: this.searchInputValue,
        ownerName: this.username,
        ownerPhone: this.phone,
        remark: '',
        source: '星空业主服务号'
      });
      if (res && res.code === '000') {
        this.$dialog.alert({
          title: '提示',
          confirmButtonText: '确定',
          className: 'dialogTips',
          message: `提交成功！我们的工作人员会尽快联系您！`
        }).then(() => {
          this.$dialog.close();
        });
        this.username = '';
        this.phone = '';
      } else {
        this.$toast(res.msg);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }
}
</script>

<style lang="stylus" scoped>
  .appraise-community
    display flex
    flex-direction column
    height 100%
    .search
      height vw(55)
      background $global-background
      padding-top vw(5)
      border-bottom 1px solid #eee
      width 100%
      .van-field
        font-size 14px
    .main
      flex-grow 1
      display flex
      flex-direction column
      overflow-y scroll
      .text
        height vw(40)
        line-height vw(40)
        padding 0 vw(15)
        font-size 14px
        color $tip-text-color
      .list
        flex-grow 2
        overflow-y scroll
        margin-bottom vw(46)
        .van-cell
          border-bottom 1px solid #eee
          padding 0
          .list-item-panel
            height vw(60)
            width 100%
            line-height vw(45)
            color $text-color
            font-size 14px
            padding vw(10) vw(15)
            display -webkit-flex
            display flex
            flex-direction column
            align-items center
            .list-item
              flex 0 1 auto
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
              width 100%
            .community-name
              color $text-color
              height vw(23)
              line-height vw(20)
            .address
              font-size 12px
              height vw(17)
              line-height vw(16)
              color $tip-text-color
          .active
            background-color #fafafa
            .community-name
              color $main-color
    .appraise-dialog
      font-size 18px
    .dialog-content
      margin 0 vw(15)
      .dialog-text-panel
        margin vw(15) 0
        color $text-color
        font-size 14px
        text-align center
      .form-panel
        border 1px solid $border-color-light
        border-radius 5px
        margin-bottom vw(10)
        .van-cell.van-field
          border-radius 5px
        .van-cell:not(:last-child)::after
          left 0
          right 0
.dialogTips
  .van-dialog__content
    color #2C2D2E !important
</style>


