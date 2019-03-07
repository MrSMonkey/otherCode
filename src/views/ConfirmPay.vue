/*
 * @Description: 确认支付
 * @Author: zhegu
 * @Date: 2019-03-07 17:56:23
 * @Last Modified by: zhegu
 * @Last Modified time: 2019-03-07 19:36:35
 */

<template>
  <section class="confirm-pay">
    <div class="list" v-for="(item,index) in data" :key="index">
      <h1>{{item.title}}</h1>
      <p v-for="(child,childIndex) in item.child" :key="childIndex">
        <span>{{child.title}}</span>
        <span>{{child.cost}}元</span>
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import ImagePreview from './components/ImagePreview/ImagePreview.vue';
import { Button, CellGroup, Field, Icon } from 'vant';
import  HouseStatus  from './components/house/HouseStatus.vue'
// 声明引入的组件
@Component({
  name: 'ConfirmPay',
  components: {
    ImagePreview,
    HouseStatus,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Icon.name]: Icon
  }
})
export default class ConfirmPay extends CommonMixins {
  private data: any[] = [
    { title: '上门检查', child:[
      { title: '上门师傅检查问题', cost: '30.00'}
    ]},
    { title: '电热水器', child:[
      { title: '换电板', cost: '40.00'},
      { title: '更换控制板', cost: '40.00'}
    ]},
    { title: '费用结算', child:[
      { title: '上门检查费扣除', cost: '-30.00'},
      { title: '支付总金额', cost: '110.00'},
      { title: '还需支付金额', cost: '80.00'}
    ]}
  ]; // 支付数据
  
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/main.styl'
.confirm-pay
  width 100%
  padding vw(12.5) vw(15)
  background-color #fff
  color $text-color
  .list 
    padding-bottom vw(15)
    border-bottom 1px solid #e7e7e7
    margin-bottom vw(12.5)
    &:last-child
      border 0
      margin-bottom 0
      padding 0
    h1
      font-size vw(16)
      margin-bottom vw(10)
    p
      display flex
      flex-direction row
      justify-content space-between
      span 
        font-size vw(15)
        &:nth-child(2)
          font-weight bold
</style>
