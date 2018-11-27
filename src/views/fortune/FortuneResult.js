import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './FortuneResult.css'
import WxShareConfig from '../../components/WxShareConfig'
import {FORTUNE_SHARE_DATA} from '../../utils/const'

@CSSModules(styles)
class FortuneResult extends Component {
  getIncomePart(total, percent) {
    total = Number(total)
    if (isNaN(total)) {
      total = 0
    }
    return Math.floor(total * percent)
  }
  render() {
    const { money } = this.props.match.params

    return (
      <div styleName="result-box">
        <div styleName="title">
          <h2>【4321定律】</h2>
          <h2>财富自由第一定律</h2>
        </div>
        <div styleName="result-cont">
          <div styleName="p1">
            <p styleName="p-tit">投资理财</p>
            <p styleName="p-money">
              <span styleName="p-num">{this.getIncomePart(money, 0.4)}</span>元
            </p>
            <p styleName="p-desc">收入之40%用于投资理财、财富增值</p>
          </div>
          <div styleName="p2">
            <p styleName="p-tit">家庭开支</p>
            <p styleName="p-money">
              <span styleName="p-num">{this.getIncomePart(money, 0.3)}</span>元
            </p>
            <p styleName="p-desc">收入之30%用于家庭开支</p>
          </div>
          <div styleName="p3">
            <p styleName="p-tit">活期存款</p>
            <p styleName="p-money">
              <span styleName="p-num">{this.getIncomePart(money, 0.2)}</span>元
            </p>
            <p styleName="p-desc">收入之20%用于活期存款</p>
          </div>
          <div styleName="p4">
            <p styleName="p-tit">保险投资</p>
            <p styleName="p-money">
              <span styleName="p-num">{this.getIncomePart(money, 0.1)}</span>元
            </p>
            <p styleName="p-desc">收入之10%用于个人/家庭保险</p>
          </div>
          <Link to="/fortune/law" styleName="p-center">
            4321定律
          </Link>
        </div>

        <WxShareConfig  shareData={FORTUNE_SHARE_DATA}/>
      </div>
    )
  }
}  

export default connect(state => ({
  fortuneIncome: state.fortune.income
}))(FortuneResult)
