/*
 * @Description: 账单详情
 * @Author: zhegu
 * @Date: 2019-04-24 10:19:15
 * @Last Modified by: zhegu
 * @Last Modified time: 2019-04-24 15:26:50
 */
<template>
    <section class="account-detail">
        <section  class="list">
            <h1>房源信息</h1>
            <section  class="detail">
                <span>房源信息：</span>
                <span>中粮香榭丽都1栋1单元11楼1101室</span>
            </section>
        </section>
        <section  class="list">
            <h1>账单概况</h1>
            <section  class="detail">
                <p>
                    <span>账单名称：</span>
                    <span>第一期房东账单</span>
                </p>
                <p>
                    <span>实收金额：</span>
                    <span>2000.00元</span>
                </p>
                <p>
                    <span>实收日期：</span>
                    <span>2018-04-18</span>
                </p>
                <p>
                    <span>账单周期：</span>
                    <span>2018-02-17 至 2018-05-16</span>
                </p>
            </section>
        </section>
        <section  class="list">
            <h1>账单明细</h1>
            <section  class="detail details-list">
                <p>
                    <span>账单项目：</span>
                    <span>押金</span>
                </p>
                <p>
                    <span>实收金额：</span>
                    <span>2000.00元</span>
                </p>
            </section>
            <section  class="detail details-list">
                <p>
                    <span>账单项目：</span>
                    <span>押金</span>
                </p>
                <p>
                    <span>实收金额：</span>
                    <span>2000.00元</span>
                </p>
            </section>
        </section>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'OldAccountDetail',
  components: {
  }
})
// 类方式声明当前组件
export default class OldAccountDetail extends CommonMixins {

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/main.styl'
.account-detail
    .list
        background #fff
        padding 0 vw(15)
        margin-bottom vw(10)
        h1,.detail
            width 100%
            font-size 15px
            color $text-color
        h1
            height vw(60)
            line-height vw(60)
            border-bottom 1px solid #eee 
        .detail
            p
                padding-top vw(15)
            &:last-child
                padding-bottom vw(15)
        .details-list
            padding-bottom vw(20)
            border-bottom 1px solid #eee
            &:last-child
                border 0
        &:nth-child(1)
            .detail
               height vw(60)
               line-height vw(60) 
</style>
