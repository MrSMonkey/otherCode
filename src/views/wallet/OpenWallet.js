import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './OpenWallet.css'
import { connect } from 'react-redux'
import Button from '../../components/Button'
import verify from '../../utils/verify'
import { actions as appActions } from '../../reducers/app'
import { actions as openwalletActions } from '../../reducers/openWallet'
const ctx = require('../../assets/imgs/icon_arrow.png')


@CSSModules(styles, { allowMultiple: true })
class OpenWallet extends Component {
	state = {
		isStopped: true,
		flag: false,
		idCardNo: ''
	}
	closePage = () =>{
		console.log(1)
	}
	showDialog = () => {
		this.setState({
			flag: true
		})
	}
	hideDialog = () =>{
		this.setState({
			flag: false
		})
	}
	handleChange = (e) => {
		this.setState({
			idCardNo: e.target.value
		})
	}
	handleChangeName = (e) => {
		this.setState({
			RealName: e.target.value
		})
	}
	submitForm = () => {
		const msg = verify.idCard(this.state.idCardNo)
		if (!msg.success) {
			this.props.showNotice (msg.errorMsg, 'error')
		} else {
			let data = {
				landlordInfo: this.props.landlordInfo,
				idCardNo: this.state.idCardNo
			}
			this.props.changeFrom(data)
			this.props.submitForm()
		}
	}
	render() {
		// let flag = this.state.flag
		console.log(this.props.landlordInfo)
		return (
			<div styleName="wallet">
				<div styleName="message">
					<span styleName="name">真实姓名：</span>
					<input placeholder="请输入真实姓名" onChange={this.handleChangeName} />
					<img src={ctx} alt="" />
					<span styleName="msgErr" onClick={this.showDialog}>签约身份信息有误？</span>
				</div>
				<div styleName="message">
					<span styleName="name">身份证：</span>
					<input placeholder="请输入身份证号" type="tel"  onChange={this.handleChange} />
				</div>
				<p styleName="remark">*信息已加密处理，仅用于开通UOKO钱包</p>
				<div styleName="btn"><Button children="提交" onClick={this.submitForm}/></div>
				{this.state.flag ? <div styleName="errDialog">
					<div styleName="errMSG">
						<div styleName="phoneNum">
							028 68730946
						</div>
						<div styleName="phoneOperate">
							<Button children="取消" onClick={this.hideDialog}/>
							<a href="tel:028 68730946"><Button children="呼叫" /></a>
						</div>
					</div>
				</div > : <span></span>}
				
			</div>
		)
	}
}

// const OpenWallet = ({}) => {
// 	return <div></div>
// } 
export default connect(state => ({
	landlordInfo: state.app.landlordInfo
}), {
	...openwalletActions,
	...appActions
})(OpenWallet)