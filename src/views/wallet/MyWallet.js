import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './MyWallet.css'
import { connect } from 'react-redux'
import Operate from '../../components/Operate'
import Button from '../../components/Button'
import { push } from 'connected-react-router'
import { actions as myWalletActions } from '../../reducers/myWallet'
import verify from '../../utils/verify'

const ctx1 = require('../../assets/imgs/money.png')
const ctx2 = require('../../assets/imgs/illustration_wallet.png')
@CSSModules(styles, { allowMultiple: true })
class MyWallet extends Component {
	state = {
		isStopped: true
	}
	componentDidMount() {
		console.log(this.props)
	    this.props.getWalletInfo()
	}
	render() {
		const {isFrozen, redirect, walletInfo} = this.props
		console.log("walletInfo",walletInfo)
		return (
			<div styleName="myWallet">
				{isFrozen ? <div styleName="unFreeze">
					<div styleName="wallet-panel">
						<img styleName="money" src={ctx1} alt=""/>
						<span styleName="wallet-panel-top">总资产</span>
						<span styleName=" wallet-panel-top-right" onClick={() => {redirect('/wallet/balance?walletId=' + walletInfo.walletId)}}>明细</span>
						<h3 styleName="wallet-panel-middle">￥{verify.returnFloat(walletInfo.Amount)}</h3>
						<div styleName="wallet-panel-bottom">
							<div styleName="wallet-panel-bottom-left">
								<h3>￥{verify.returnFloat(walletInfo.UsableAmount)}</h3>
								<p>可用余额</p>
							</div>
							<span styleName="line"></span>
							<div styleName="wallet-panel-bottom-right">
								<h3>￥{verify.returnFloat(walletInfo.FreezeAmount)}</h3>
								<p>冻结资金</p>
							</div>
						</div>
					</div>
					<div styleName="operate">
						{/* <Operate name="充值" /> */}
						<Operate name="提现" handleClick={()=>{redirect('/wallet/apply')}}/>
					</div>
					<div styleName="managerCard">
						<a onClick={()=>{redirect('/wallet/bankCard')}}>管理银行卡</a>
					</div>
				</div> : <div styleName="freeze-all">
					<div styleName="freeze">
						<img src={ctx2} alt=""/>
						<h3>钱包已被冻结</h3>
						<p>请联系客服：400-000-4170</p>
						<div styleName="btn"><Button children="确定" /></div>
						
					</div>
				</div>}
			</div>
		)
	}
}

// const OpenWallet = ({}) => {
// 	return <div></div>
// } 
export default connect(
	state => ({
		isFrozen: state.myWallet.isFrozen,
		walletInfo: state.myWallet.data
	}), {
		...myWalletActions,
		redirect: url => push(url)
	})(MyWallet)