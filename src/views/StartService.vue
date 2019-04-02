/*
 * @Description: 发起服务
 * @Author: chenmo
 * @Date: 2019-02-15 14:43:22
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-20 09:27:42
 */

<template>
  <section class="start-service">
    <van-field
      v-model="houseName"
      disabled
      label="服务房源"
      input-align="right"
      placeholder="请输入服务房源"
      type="text"
    />
    <!-- <van-field
      v-model="rooms"
      required
      disabled
      clearable
      label="服务房间"
      input-align="right"
      placeholder="整套"
      type="text"
      v-if="data.houseType === 1"

    />
    <van-field
      v-model="rooms"
      required
      label="服务房间"
      input-align="right"
      placeholder="请选择房间"
      type="text"
      @click="roomShow = true"
      readonly
      v-else
    /> -->
    <van-field
      v-model="startTime"
      required
      input-align="right"
      label="预约服务时间"
      placeholder="请选择时间"
      @click="timeShow = true"
      type="text"
      readonly
    />
    <div class="dec">
      <p>备注</p>
      <van-field
        v-model="remark"
        class="textarea"
        input-align="left"
        placeholder="请输入50字以内的备注"
        type="textarea"
        :autosize="autosize"
        maxlength="50"
      />
    </div>
    <van-field
      v-model="ownerName"
      required
      label="联系人"
      input-align="right"
      placeholder="请输入联系人姓名"
      type="text"
    />
    <van-field
      v-model="ownerPhone"
      required
      clearable
      label="联系电话"
      input-align="right"
      placeholder="请输入联系人电话"
      type="text"
    />
    <div class="service-footer">
      <van-button slot="button" size="large" type="default" class="service-btn" @click="startService" :loading="loading" loading-text="发起中...">发起</van-button>
    </div>
    <!-- 房间弹窗 -->
    <van-popup v-model="roomShow" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        title="选择房间"
        @confirm="roomConfirm"
        @cancel="roomShow = false"
      />
    </van-popup>
    <!-- 时间选择 -->
    <van-popup v-model="timeShow" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        title='选择时间'
        :min-date="minDate"
        @confirm="confirmTime"
        @cancel="timeShow = false"
        :formatter="formatter"
      /> 
    </van-popup>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action } from 'vuex-class';
import CommonMixins from '@/utils/mixins/commonMixins';
import { DatetimePicker } from 'vant';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'StartService',
  components: {
    [DatetimePicker.name]: DatetimePicker,
  }
})
// 类方式声明当前组件
export default class StartService extends CommonMixins {
  private entrustId: string = ''; // 委托房源ID
  private productId: string = ''; // 服务产品ID
  private ownerName: string = ''; // 联系人
  private rooms: string = ''; // 房间
  private roomId: string = ''; // 房间Id
  private startTime: string = ''; // 选择额时间
  private roomShow: boolean = false; // 选择房间
  private ownerPhone: string = ''; // 手机号
  private houseName: string = ''; // 房源名称
  private data: any = {}; // 服务类型列表
  private remark: string = ''; // 备注
  private timeShow: boolean = false; // 选择产品弹窗
  private columns: any[] = []; // 房间数组
  private currentDate: any = new Date(); // 当前时间
  private minDate: any = new Date(); // 最小时间
  private loading: boolean = false; // loading
  private autosize: any = {
    minHeight: 116
  };

  private mounted() {
    this.entrustId = String(this.$route.query.entrustId);
    this.productId = String(this.$route.query.productId);
    this.getHouserInfo(this.entrustId);
  }

  /**
   * @description 获取服务类型
   * @params entrustId 委托id
   * @returns void
   * @author chenmo
   */
  private async getHouserInfo(entrustId: string) {
    this.$toast.loading({
      duration: 0,
      mask: true,
      loadingType: 'spinner',
      message: '加载中...'
    });
    try {
      const res: any = await this.axios.get(api.getHouserInfo + `/${entrustId}`);
      if (res && res.code === '000') {
        this.data = res.data;
        this.houseName = res.data.houseName;
        this.ownerName = res.data.assetName;
        this.ownerPhone = res.data.assetPhone;
        if (res.data.houseType === 1) {
          this.rooms = '整套';
        } else {
          // 遍历房间
          const roomArr: any = res.data.rooms.map((item: any) => {
            return {
              text: item.roomName,
              value: item.roomId
            };
          });
          this.columns = roomArr;
        }
      } else {
        this.$toast(`获取服务类型失败`);
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
    const arr: any[] = item.ownerServiceTypes.map((ctx: any) => {
      return {
        text: ctx.label,
        value: ctx.value
      };
    });
    this.columns = arr;
    this.timeShow = true;
  }

  /**
   * @description 时间弹窗确定
   * @value 当前选中的值
   * @returns void
   * @author chenmo
   */
  private confirmTime(value: any) {
    const time: string = value.toLocaleDateString().replace(/\//g, '-') + ' ' + value.toTimeString().substr(0, 5);
    this.startTime = time;
    this.timeShow = false;
  }

  /**
   * @description 时间弹窗确定
   * @item 当前选中的值
   * @returns void
   * @author chenmo
   */
  private roomConfirm(item: any) {
    this.rooms = item.text;
    this.roomId = item.value;
    this.roomShow = false;
  }

  /**
   * @description 发起服务
   * @returns void
   * @author chenmo
   */
  private startService() {
    // if (this.data.houseType === 0 && !this.roomId) {
    //   this.$toast(`请选择房间`);
    //   return false;
    // }
    if (!this.startTime) {
      this.$toast(`请选择时间`);
      return false;
    }
    if (!this.ownerName) {
      this.$toast(`请输入联系人`);
      return false;
    }
    if (!this.ownerPhone) {
      this.$toast(`请输入联系人电话`);
      return false;
    }
    this.submitData(); // 提交数据
  }

  /**
   * @description 提交数据
   * @returns void
   * @author chenmo
   */
  private async submitData() {
    const data: any = {
      entrustId: this.entrustId,
      orderId: this.productId,
      ownerName: this.ownerName,
      remark: this.remark,
      roomId: this.entrustId,
      roomName: '整套',
      subscribeTime: this.startTime,
      ownerPhone: this.ownerPhone
    };
    this.loading = true;
    try {
      const res: any = await this.axios.post(api.pushService, data);
      if (res && res.code === '000') {
        this.$toast.success('发起成功');
        setTimeout(() => {
          this.$router.push(`/myHouse?entrustId=${this.entrustId}`); // 跳转到房源列表
        }, 2000);
      } else {
        this.$toast(res.msg || '发起失败，请重试！');
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      this.loading = false; // 关闭loading
    }
  }

  /**
   * @description 显示时间格式化
   * @params type 时间是时分秒年月日
   * @params value 当前选择的时间
   * @returns time
   * @author chenmo
   */
  private formatter(type: any, value: any) {
    if (type === 'year') {
      return `${value}年`;
    } else if (type === 'month') {
      return `${value}月`;
    } else if (type === 'day') {
      return `${value}日`;
    } else if (type === 'hour') {
      return `${value}时`;
    } else if (type === 'minute') {
      return `${value}分`;
    }
    return value;
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
.start-service
  margin 0 0
  .dec
    background $global-background
    padding-top vw(15)
    margin-bottom vw(10)
    p
      padding-left vw(15)
      font-size 15px
      color $text-color
    .textarea
      textarea
        font-size 15px
        background #fafafa
        border-radius 4px
        padding vw(10)
  .service-footer
    .service-btn
      width 100%
      position absolute
      bottom 0
      left 0
      background $main-color
      color #fff
</style>
