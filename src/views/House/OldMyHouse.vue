/*
 * @Description: 我的房源
 * @Author: zhegu
 * @Date: 2019-04-24 10:19:15
 * @Last Modified by: zhegu
 * @Last Modified time: 2019-04-24 14:03:29
 */
<template>
    <section class="my-house">
        <section class="banner">
            <p>中粮香榭丽都1栋11单元11楼1101室</p>
            <p>合同周期：2017-04-17至2019-04-16</p>
        </section>
        <section class="type">
            <router-link v-for="(item,index) in typeList" :key="index" :to="item.to">
                <img :src="item.img"/>
                <span>{{item.name}}</span>
            </router-link>
        </section>
        <section class="income">
            <p>房源累计收入</p>
            <p>￥31100.50</p>
        </section>
        <section class="card">
            <van-swipe :width="300" :loop="false" :show-indicators="false">
                <van-swipe-item v-for="(item,index) in detailList" :key="index">
                    <section class="detail">
                        <h1>{{item.t || '无'}}</h1>
                        <p>{{item.name || '无'}}</p>
                        <p>{{item.sex === 1 ? '男' : '女'}}</p>
                        <p>{{item.age || '0'}}岁</p>
                        <p>租期：{{item.startTime || 'xxxx-xx-xx'}}至{{item.endTime || 'xxxx-xx-xx'}}</p>
                        <div class="avatar">
                            <img v-if="item.sex === 1" src="../../assets/images/icon_boy.png"/>
                            <img v-else src="../../assets/images/icon_girl.png"/>
                        </div>
                    </section>
                </van-swipe-item>
            </van-swipe>
        </section>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import { Swipe, SwipeItem } from 'vant';
import api from '@/api';

// 声明引入的组件
@Component({
  name: 'OldMyHouse',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  }
})
// 类方式声明当前组件
export default class OldMyHouse extends CommonMixins {
  private typeList: any[] = [
      {name: '房源账单', img: require('../../assets/images/icon/icon_bill.png'), to: '/'},
      {name: '房源合同', img: require('../../assets/images/icon/icon_bill.png'), to: '/'},
      {name: '房源照片', img: require('../../assets/images/icon/icon_photo.png'), to: '/'}
  ]; // 房源类型
  private detailList: any[] = [
      {t: '房间A', sex: 1, name: '张**', age: '23', startTime: '2018-01-01', endTime: '2019-02-01'},
      {t: '房间B', sex: 2, name: '王**', age: '23', startTime: '2018-01-01', endTime: '2019-02-01'},
  ]; // 房间详情
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/main.styl'
.my-house
    .banner
        width 100%
        height vw(150)
        padding-top vw(20)
        padding-left vw(25)
        background url("../../assets/images/myhouse_banner_bg.png") no-repeat center
        background-size cover
        p
          color #fff
          font-size 12px
          line-height 17px
          &:nth-child(1)
            font-size 20px
            line-height 28px
    .type
        display flex
        flex-direction row
        justify-content center
        padding vw(30) 0
        background #fff
        a
          display flex
          flex-direction column
          justify-content center
          &:nth-child(2)
            margin 0 vw(40)
          img
            width vw(80)
            height vw(80)
          span
            text-align center
            margin-top vw(10)
            font-size 15px
            color $text-color
            font-weight bold
    .income
        width vw(345)
        height vw(100)
        background #fff
        border-radius vw(5)
        margin vw(10) auto
        padding-top vw(20)
        padding-left vw(25)
        p
         &:nth-child(1)
           font-size 14px
           color $next-text-color
           line-height 20px
         &:nth-child(2)
            font-size 32px
            color $main-color
            line-height 39px
            font-weight bold
            margin-left -8px
    .card
        background #fff
        height vw(230)
        padding-top vw(25)
        .van-swipe-item
            height vw(180)!important
            padding-left vw(30)
        .detail
            width vw(275)
            height vw(180)
            border 1px solid #eaeaea
            border-radius 5px
            position relative
            h1
                height vw(45)
                line-height vw(45)
                background $border-color-light
                color $text-color
                padding-left vw(25)
                font-size 18px
                margin-bottom vw(15)
            p
                padding-left vw(25)
                margin-bottom vw(5)
                font-size 14px
            .avatar 
                width vw(60)
                height vw(60)
                border 2px solid #fff
                border-radius 50%
                position absolute
                right vw(25)
                top vw(25)
                img
                    display inline-block
                    width 100%
                    height 100%
</style>
