import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './ApplyForward.css'
import { connect } from 'react-redux'
import { Input } from '../../components/Form'
import Button from '../../components/Button'
import Icon from '../../components/Icon'
import { push } from 'connected-react-router'
import Operate from '../../components/Operate'
import { actions as applyActions } from '../../reducers/apply'
import verify from '../../utils/verify'

const logo_bank = require('../../assets/imgs/logo_bank.png')
const iconRight = require('../../assets/imgs/icons/icon_right.png')

@CSSModules(styles, { allowMultiple: true })
class ApplyForward extends Component {
	state = {
		isStopped: true,
		money: ''
	}
	componentDidMount() {
		console.log('1',this.props)
		this.props.getBankList()
	}
	onChange = (val) => {
		if (val) {
			this.setState({
				money: val,
				isStopped: false
			})
		} else {
			this.setState({
				money: '',
				isStopped: true
			})
		}
	}

	showModal = () => {
		let btnNode = this.refs.myFooter
		btnNode.style.display = 'block'
	}

	closeModal = () => {
		let btnNode = this.refs.myFooter
		btnNode.style.display = 'none'
	}
	render() {
		const { redirect, usbaleAmount} = this.props
 		return (
			<div styleName="apply">
				<div styleName="apply-select">
					<div styleName="bank">
						<img src={logo_bank} alt=""/>
					</div>
					<div styleName="bank-info">
						<p>中国银行</p>
						<p>尾号-9930</p>
					</div>
					<div styleName="bank-right" onClick={this.showModal}>
						<img src={iconRight} alt=""/>
					</div>
				</div>
				<div styleName="bank-input">
					<input placeholder="请输入提现金额" onChange={this.onChange} type="number" pattern="[0-9]{*}[\\.]"/>
				</div>
				<div styleName="bank-balance">
					<span>可用余额：</span>
					<span>{verify.returnFloat(usbaleAmount)}</span>
				</div>
				<div styleName="bank-btn">
					<Button type="Primary" disabled={this.state.isStopped}>提交</Button>
				</div>
				<div styleName="bank-footet-content" ref="myFooter">
					<div styleName="bank-footer">
						<div styleName="bank-footer-tilte">
							<div styleName="bank-footer-left" onClick={this.closeModal}><Icon name="clear_x" /></div>
							<div styleName="bank-footer-center">选择银行卡</div>
							<div styleName="bank-footer-right"></div>
						</div>
						<div>
							<div styleName="apply-select">
								<div styleName="bank">
									<img src={logo_bank} alt=""/>
								</div>
								<div styleName="bank-info">
									<p>中国银行</p>
									<p>尾号-9930</p>
								</div>
							</div>
							<div styleName="bank-select-add">
									<Operate name="增加银行卡" handleClick={() => { redirect('/wallet/addCard') }}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


export default connect(
	state => ({
		bankCardDetail: { name: '中国银行' },
		usbaleAmount: state.apply.UsableAmount
	}), {
		...applyActions,
		redirect: url => push(url)
	})(ApplyForward)