import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './FortuneLaw.css'
import WxShareConfig from '../../components/WxShareConfig'
import {FORTUNE_SHARE_DATA} from '../../utils/const'

@CSSModules(styles)
class FortuneLaw extends Component {
  render() {
    return (
      <div styleName="law">
        <section>
          <p>您知道</p>
          <p>巴菲特的早餐费，由什么决定吗？</p>
          <p>是的，由股票涨跌决定的~</p>
          <p>涨的时候吃3.27美元的早餐，跌的时候吃2.21美元的套餐</p>
          <p>巴菲特~美国最富有的人，是按照什么逻辑在安排这一切？</p>
          <p>这就是资产配置的核心-----比例投资法</p>
          <p>4321定律是其中最方便实用的收入分配法</p>
        </section>
        <section>
          <h2 styleName="tit">
            <i styleName="coin" />
            <span styleName="tit-text">举例：月可支配收入为10000元</span>
          </h2>
          <p>
            4000元：10000*
            <span styleName="text-spec">40%投资理财</span>
            ：比如投资股票、外汇、基金等有较高收益率的资产，也可以选择开放式基金定期定额投资。
          </p>
          <p>
            3000元：10000* <span styleName="text-spec">30%衣食住行</span>
            ：每月基本不可缺少的生活费用。吃饭穿衣费、手机费、交通、房租或按揭等。
          </p>
          <p>
            2000元: 10000*
            <span styleName="text-spec">20%储蓄备用</span>
            ：存为活期存款，在需要的时候可以方便的提出来，用于改善生活质量。相当于家庭备用金。
          </p>
          <p>
            1000元: 10000*
            <span styleName="text-spec">10%保险</span>
            ：投保是一种长远的安排，也是最容易忽略的投资方式，是对日后生活的负责和保障，尤其是预防家庭收入的主要创造者可能遇到的意外情况，以免对家庭经济造成重创。以保额（即出险后保险公司的赔付额）一般不低于年收入的10倍为合适。
          </p>
        </section>
        <WxShareConfig  shareData={FORTUNE_SHARE_DATA}/>
      </div>
    )
  }
}

export default FortuneLaw
