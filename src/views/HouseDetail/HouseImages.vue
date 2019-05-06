/*
 * @Description: 房源照片
 * @Author: zhegu
 * @Date: 2019-04-02 10:44:52
 * @Last Modified by: LongWei
 * @Last Modified time: 2019-05-06 17:52:24
 */


<template>
  <section class="house-images">
    <div class="t">
      <h1>天香 2栋3单元33楼3302号</h1>
      <p>2017-04-17&nbsp;至&nbsp;2019-01-01</p>
    </div>
    <article class="title">房源照片（装配前）</article>
    <div class="imgs">
      <ImagePreview :imgagesArr="imgUrls" :isFold="true" />
    </div>
    <article class="title">房源照片（装配后）</article>
    <div class="imgs">
      <ImagePreview :imgagesArr="imgUrls" :isFold="true" />
    </div>
    <article class="title">房东合同照片</article>
    <div class="imgs">
      <ImagePreview :imgagesArr="imgUrls" :isFold="true" />
    </div>   
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { solveScrollBug } from '@/utils/utils';
import ImagePreview from '@/components/ImagePreview.vue';
import api from '@/api';
import { Loading, ErrorMsg } from '@/utils/decorators';


// 声明引入的组件
@Component({
  name: 'HouseImages',
  components: {
    ImagePreview
  }
})
export default class MaintainChecked extends CommonMixins {
  private data: any = {}; // 维修服务验收详情
  private imgUrls: any[] = [
    'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1509234616,1418339855&fm=58&bpow=1920&bpoh=1080',
    'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1509234616,1418339855&fm=58&bpow=1920&bpoh=1080',
    'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1509234616,1418339855&fm=58&bpow=1920&bpoh=1080',
    'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1509234616,1418339855&fm=58&bpow=1920&bpoh=1080',
    'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1509234616,1418339855&fm=58&bpow=1920&bpoh=1080'
  ]; // 维修前照片
  private maskVisible: boolean = false; // 遮罩层
  private modalVisible: boolean = false; // 模态框
  private desc: string = ''; // 不通过原因
  private orderId: string = ''; // 订单id

  private mounted() {
    this.orderId = String(this.$route.query.orderId);
    this.getProductAcceptance(this.orderId); // 获取维修服务验收详情
  }
/**
 * @description 模态框显示/隐藏
 * @params boolean 布尔值
 * @returns void
 * @author zhegu
 */
  private  changeVisible(visible: boolean) {
    this.maskVisible = visible;
    this.modalVisible = visible;
    this.desc = '';
    solveScrollBug(visible);
  }
  /**
   * @description 获取维修服务验收详情
   * @params orderId 订单id
   * @returns void
   * @author zhegu
   */
  @Loading()
  @ErrorMsg('获取维修服务验收详情失败')
  private async getProductAcceptance(orderId: string) {
    try {
      const res: any = await this.axios.get(api.getProductAcceptance + `/${orderId}`);
      if (res && res.code === '000') {
        this.data = res.data || [];
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      // this.$toast.clear();
    }
  }

  /**
   * @description 拒绝通过维修服务验收
   * @params orderId 订单id
   * @params reason 拒绝原因
   * @returns void
   * @author zhegu
   */
  private async productRefuse() {
    if (!this.desc) {
      this.$toast(`请输入不通过原因`);
      return;
    }
    const data = {
      reason: this.desc
    };
    try {
      const res: any = await this.axios.put(api.productRefuse + `/${this.orderId}`, data);
      if (res && res.code === '000') {
        this.$toast.success(`提交成功`);
        setTimeout(() => {
          this.changeVisible(false);
        }, 500);
        setTimeout(() => {
          this.$router.push('/serviceRecord?orderId=' + this.orderId); // 跳转服务记录页
        }, 1500);
      } else {
        this.$toast(res.msg);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      setTimeout(() => {
        this.$toast.clear();
      }, 1000);
    }
  }
  /**
   * @description 通过维修服务验收
   * @params orderId 订单id
   * @returns void
   * @author zhegu
   */
  private async passService() {
    try {
      const res: any = await this.axios.put(api.passService + `/${this.orderId}`);
      if (res && res.code === '000') {
        this.$toast.success(`验收通过`);
        setTimeout(() => {
          this.$router.push('/serviceRecord?orderId=' + this.orderId); // 跳转服务记录页
        }, 1000);
      } else {
        this.$toast(res.msg);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    } finally {
      setTimeout(() => {
        this.$toast.clear();
      }, 1000);
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/main.styl'
.house-images
  // padding-bottom vw(70)
  .t,.imgs
    padding vw(15)
    background-color #fff
    color $text-color
  .t
    height vw(80)
    line-height vw(25)
    h1
      font-size 18px
    p
      color $next-text-color
      font-size 12px
  .imgs
    min-height vw(135)
    .imgfoldView .img-box
      width vw(105)
      height vw(105)
  .title
    font-size 14px
    color $next-text-color
    height vw(35)
    line-height vw(35)
    margin-left vw(15)
</style>
