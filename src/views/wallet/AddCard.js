import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './AddCard.css'
import { connect } from 'react-redux'
import Button from '../../components/Button'
import { actions as appActions } from '../../reducers/app'
import { push } from 'connected-react-router'

let numDivide = function (num) {
    var str = '' ;
    var reg =   /\s/g; //加入正则，过滤掉字符串中的空格
    num.replace( reg, "").split('').map(function (item,index) {
      (index+1) % 4 === 0 ? str = str + item + ' ': str += item;
	})
	str = str.replace(/^\s*|\s*$/g,"") // 去除两头空格
    return str;
}

@CSSModules(styles, { allowMultiple: true })
class AddCard extends Component {
	state = {
		isStopped: true,
		val: ''
	}
	handleIdCardChange = (val) => {
		console.log(val)
	}
	handleChangeName = (e) => {
		this.setState({
			RealName: e.target.value
		})
	}
	getValue = (val) => {
		console.log(val.target.value)

	}
	cardNoStyle = (event) =>{
		// return val = numDivide(val)
		this.setState({
			val:numDivide(event.target.value)
		})
		
		let val = event.target.value
		if (val.lenth > 16 ) {
			this.props.getcardbin(val)
		}
	}
	submitForm = () => {
		let bankno = this.state.val.replace(/\s*/g,"") // 去除字符串所有得空格
		if (bankno === '') {
			this.props.showNotice ('请输入银行卡号', 'error')
			return false
		}

		if (bankno.length < 16 || bankno.length > 19) {
			this.props.showNotice ('银行卡号长度必须在16到19之间', 'error')
			return false
		}
		let reg = /^\d*$/; //全数字
		if(!reg.exec(bankno)) {
			this.props.showNotice("银行卡号必须全为数字", "error");
			return false;
		}

	}
	render() {
		const nickName = this.props.landlordInfo.Nickname || ''
		return (
			<div styleName="addCard">
				<div styleName="message">
					<span styleName="name">真实姓名：</span>
					<input placeholder="请输入真实姓名" onChange={this.handleChangeName} />
				</div>
				<div styleName="message">
					<span styleName="name">卡号：</span>
					<input placeholder="请输入银行卡号" type="tel" pattern="[0-9]*"  value={this.state.val}  onInput={this.getValue}  onChange={this.cardNoStyle} styleName="cardNo"/>
				</div>
				<div styleName="message">
					<span styleName="name">开户行：</span>
					<input placeholder="未能识别开户行" ref="bankCard" />
				</div>
				<div styleName="btn"><Button children="提交" onClick={this.submitForm}/></div>
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
	...appActions
})(AddCard)