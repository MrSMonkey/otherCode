import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './BankDetail.css'
import { connect } from 'react-redux'
import Operate from '../../components/Operate';
import Button from '../../components/Button'
import { push } from 'connected-react-router'
const logo_bank = require('../../assets/imgs/logo_bank.png')

@CSSModules(styles, { allowMultiple: true })
class BankDetail extends Component {
	state = {
		isShow: false
	}
	componentDidMount() {
		
	}
	showDialg = () => {
		console.log(1)
		this.setState({
			isShow:  true
		})
	}
	hideDialog = () => {
		this.setState({
			isShow: false
		})
	}
	render() {
		const { bankCardDetail, redirect } = this.props
		return (
			<div styleName="bank-box">
				<div styleName="bank-card">
					<div styleName="bank-detile">
						<div styleName="bank">
							<img src={logo_bank} alt=""/>
						</div>
						<div styleName="bank-info">
							<p>{bankCardDetail.name}</p>
							<p>龙卡储蓄卡（银联卡）</p>
							<p><span>****</span>  <span>****</span>  <span>****</span> <span>1210</span></p>
						</div>
					</div>
				</div>
				<div styleName="bank-fun">
					<Operate name="提现" styleName="bank-card" handleClick={() => { redirect('/wallet/apply')}}/>
					<Operate name="解绑银行卡" styleName="bank-card" handleClick={this.showDialg}/>
				</div>
				{this.state.isShow ?< div styleName="errDialog">
					<div styleName="errMSG">
					<div styleName="phoneNum">
						确定解绑吗？
					</div>
					<div styleName="phoneOperate">
						<Button children="取消" onClick={this.hideDialog} />
					    <Button children="确定" />
					</div>
				</div>
			</div> : null}
				
			</div>
		)
	}
}

export default connect(
	state => ({
		bankCardDetail: {name: '中国银行'},
	}), {
		redirect: url => push(url)
	})(BankDetail)