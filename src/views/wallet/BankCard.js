import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './BankCard.css'
import { connect } from 'react-redux'
import Button from '../../components/Button';
import ReactLoading from 'react-loading'
import { push } from 'connected-react-router'
import { actions as bankListActions } from '../../reducers/bankList'

const logo_bank = require('../../assets/imgs/logo_bank.png')
const noCard = require('../../assets/imgs/no_card.png')
const icon_add = require('../../assets/imgs/icons/icon_add.png')

@CSSModules(styles, { allowMultiple: true })
class BankCard extends Component {
	state = {
		isStopped: true
	}
	componentDidMount() {
		this.props.getBankList()
	}
	addCard = () => {

	}
	render() {
		const { bankList, isBankListLoading, redirect } = this.props 
		console.log(bankList)
		if (isBankListLoading) {
			return (
				<div className="infinte-loader">
					<ReactLoading
						type="bubbles"
						className="inline-block"
						color="#C3AA82"
					/>
				</div>
			)	
		}
		return (
			<div styleName="bank-box">
				{bankList && bankList.length > 0 ? 
				<div styleName="bank-card">
					{bankList.map((ctx,index) =>
							<div styleName="bank-detile" key={index} onClick={() => { redirect('/wallet/bankDetails?id=' + ctx.CardId)}}>
							<div styleName="bank">
								<img src={logo_bank} alt=""/>
							</div>
							<div styleName="bank-info">
								<p>{ctx.BankName}</p>
								<p>龙卡储蓄卡（银联卡）</p>
								<p><span>****</span><span>****</span>  <span>****</span> <span>1210</span></p>
							</div>
						</div>
					)}
						<div styleName="card-btn-top"><Button onClick={() => {
							redirect('/wallet/addCard')
						}}><img src={icon_add} styleName="icon_add" alt="" />添加银行卡</Button></div>
				</div>
				: <div styleName="no-card">
				    <div><img src={noCard} alt=""/></div>
						<div styleName="card-btn"><Button onClick={()=>{redirect('/wallet/addCard')}}><img src={icon_add} styleName="icon_add" alt="" />添加银行卡</Button></div>
				</div>}
				
			</div>
		)
	}
}

export default connect(
	state => ({
		bankList: state.bankList.data,
		isBankListLoading: state.bankList.isBankListLoading
	}), {
		...bankListActions,
		redirect: url => push(url)
	})(BankCard)