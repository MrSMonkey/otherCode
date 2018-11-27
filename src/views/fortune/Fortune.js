import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Fortune.css'
import { connect } from 'react-redux'
import Lottie from 'react-lottie'
import { push } from 'connected-react-router'
import * as animationData from '../../assets/json/fortune_anim.json'
import { actions as fortuneActions } from '../../reducers/fortune'
import { actions as appActions } from '../../reducers/app'
import WxShareConfig from '../../components/WxShareConfig'
import {FORTUNE_SHARE_DATA} from '../../utils/const'

const FortuneGodImg = require('../../assets/imgs/fortune/god.png')

@CSSModules(styles, { allowMultiple: true })
class Fortune extends Component {
  state = {
    isStopped: true
  }
  validateNumber(num) {
    if (num !== 0 && !num) {
      return false
    }
    num = Number(num)
    if (isNaN(num)) {
      return false
    }
    if (num <= 0) {
      return false
    }
    return true
  }
  calcResult = () => {
    const { incomeValue } = this.props
    if (!this.validateNumber(incomeValue)) {
      return this.props.showNotice('请输入大于0的数字!')
    }

    this.setState({
      isStopped: false
    })
  }
  render() {
    const { updateFortuneIncome, incomeValue, redirect } = this.props
    const { isStopped } = this.state

    this.currentInputValue = incomeValue

    return (
      <div>
        <div styleName="god-pic-box">
          <img src={FortuneGodImg} alt="星空财神" />
          <div>
            <p>每天早餐该花多少钱？</p>
            <p>每月收入该怎么分配？</p>
          </div>
        </div>
        <p styleName="words">
          <i styleName="coin" />
          <span styleName="text">财富自由第一定律 财神星马上告诉您</span>
          <i styleName="coin" />
        </p>
        <div styleName="income-input-box">
          <input
            styleName="income-input"
            placeholder="老板，请填写您的月可支配现金收入"
            onChange={e => updateFortuneIncome(e.target.value)}
            value={incomeValue}
          />

          <a onClick={this.calcResult} styleName="result-btn">
            请财神星掐指一算
          </a>
        </div>

        <div styleName={`anim-box ${isStopped ? '' : 'show'}`}>
          <Lottie
            options={{
              loop: true,
              autoplay: false,
              animationData
            }}
            eventListeners={[
              {
                eventName: 'loopComplete',
                callback: () => {
                  redirect(`/fortune/result/${this.currentInputValue}`)
                }
              }
            ]}
            isClickToPauseDisabled={true}
            isStopped={isStopped}
          />
        </div>
        <WxShareConfig  shareData={FORTUNE_SHARE_DATA}/>
      </div>
    )
  }
}

export default connect(
  state => ({ incomeValue: state.fortune.income }),
  {
    ...fortuneActions,
    redirect: url => push(url),
    showNotice: appActions.showNotice
  }
)(Fortune)
