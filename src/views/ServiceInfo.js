import React, { Component, PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { actions as serviceInfoActions } from '../reducers/serviceInfo'
import { actions as appAction } from '../reducers/app'
import Modal from 'antd-mobile/lib/modal';
import 'antd-mobile/lib/modal/style/css';
import ReactLoading from 'react-loading'
import styles from './ServiceInfo.css'
import Button from '@/components/Button'
import StyledViewImg from '@/components/ViewImg';
import Form, { FormItem, Input, Select, Textarea } from '../components/Form'
import { localStore } from '../utils'

const imgs = {
  noHouse: require('../assets/imgs/banner.jpg')
}


let imgArray = [
  require('../assets/imgs/noimg.png'),
  require('../assets/imgs/noimg.png'),
  require('../assets/imgs/noimg.png'),
  require('../assets/imgs/noimg.png')
]

@CSSModules(styles)
class PurchaseModal extends PureComponent {  
 
  state = {
    itemList: [],
    activeId: ''
  }

  
  render() {
    const {close } = this.props;
    return (
      <div styleName="modal">
        <header styleName="header">
          <div styleName="text-button" onClick={close}>取消</div>
          <div styleName="header-title">购买信息</div>
          <div styleName="text-button-primary">&emsp;</div>
        </header>
        <div>
          <div styleName="purchase-modal">
            <div styleName="message">
              <span styleName="name">联系人*</span>
              <Input placeholder="请输入联系人姓名" />
            </div>
            <div styleName="message">
              <span styleName="name">联系电话*</span>
              <input placeholder="请输入联系人电话" type="tel" />
            </div>
            <div styleName="message">
              <span styleName="name">备注</span>
              <div style={{marginRight: 20}}>
                <Textarea placeholder="请输入20字以内的备注"  rows={4}/>
              </div>
            </div>
            <div styleName="btn"><Button children="购买" /></div>
          </div>
        </div>
      </div>
    )
  }
}


@CSSModules(styles)
class ServiceInfo extends Component {
  state = {
    tabsData: [{
      name: 'houseInfo',
      text: '房源信息',
      href: `/houses/`,
      active: true
    }, {
      name: 'roomInfo',
      text: '房间信息',
      href: `/rooms/`,
      active: false
    }, {
      name: 'photo',
      text: '房源照片',
      href: `/house-pic/`,
      active: false
    }],
    isShow: false,
    visible: false,
    remark: '',
    ownerName: '',
    ownerPhone: ''
  }
  componentDidMount() {
    const { match } = this.props
    const id = match.params.id
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    const isLogin = !!localStore.get('userId')
    if (isLogin) {
      this.props.getUserInfo()
      this.props.getServiceInfo(id)
    }
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
  showModal = (key, item) => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  textAreaChange = (value) => {
    this.setState({
      remark: value
    })
  }
  ownerNameChange = (value) => {
    this.props.userInfo.nickName = null
    this.setState({
      ownerName: value
    })
  }
  ownerPhoneChange = (value) => {
    this.props.userInfo.username = null
    this.setState({
      ownerPhone: value || ''
    })
  }
  submitForm = () => {
    const data = {
      "entrustId": this.props.match.params.entrustId || '',
      "ownerName": this.props.userInfo.nickName !== null ? this.props.userInfo.nickName : this.state.ownerName,
      "ownerPhone": this.props.userInfo.username !== null ? this.props.userInfo.username : this.state.ownerPhone,
      "productId": this.props.match.params.id || '',
      "remark": this.state.remark
    }
    this.props.submitForm(data); // 提交
  }
  render() {
    const { redirect, data, loading, userInfo, comfirmLoading} = this.props
    const imgs = data && data.imgUrls
    return (
      <div >
        {loading? <div className="infinte-loader">
              <ReactLoading
                type="bubbles"
                className="inline-block"
                color="#474747"
              />
          </div>: <div>
          <div styleName="serviceinfo">
            <h2 styleName="serviceinfo-title">{data && data.serviceName || '无'}</h2>
            <div styleName="block">
              <span>产品单价：</span>
              <p>{data && parseFloat(data.price).toFixed(2) || '0.00'}元</p>
            </div>
            <div styleName="block">
              <span>服务产品：</span>
              {data && data.productInfosBeans ? data.productInfosBeans.map((ctx, idx) => {
                return (
                  <p key={idx}>{ctx.childProductName || '无'}</p>
                )
              }): <p>无</p>}
            </div>
            <div styleName="block">
              <span>产品描述：</span>
              <p>{data && data.desc || '无'}</p>
            </div>
            <div styleName="block">
              <span>产品图片：</span>
              <p>&emsp;</p>
            </div>
            <div styleName="block">
              
            </div>
          </div>
          <StyledViewImg images={imgs ? imgs : imgArray}/>
          <div styleName="service-footer">
            <Button onClick={this.showModal('visible')}>立即购买</Button>
          </div>
            </div>}
        <Modal
           popup
           visible={this.state.visible}
           onClose={this.onClose('visible')}
           animationType="slide-up"
           afterClose={() => { }}
           styleName="modal-box"
        >
          <div styleName="modal-title">
            <span onClick={this.onClose('visible')}>取消</span>
            <span>购买信息</span>
            <span >&emsp;</span>
          </div>
          <div styleName="modal">
            <div styleName="purchase-modal">
              <div styleName="message">
                <span styleName="name">联系人*</span>
                <Input placeholder="请输入联系人姓名" value ={ userInfo && userInfo.nickName || this.state.ownerName} onChange={this.ownerNameChange}/>
              </div>
              <div styleName="message">
                <span styleName="name">联系电话*</span>
                <Input placeholder="请输入联系人电话" onChange={this.ownerPhoneChange} value={ userInfo && userInfo.username || this.state.ownerPhone} />
              </div>
              <div styleName="message">
                <span styleName="name">备注</span>
                <div style={{marginRight: 20}}>
                  <Textarea placeholder="请输入20字以内的备注"  rows={4} onChange={this.textAreaChange} maxLength={20}/>
                </div>
              </div>
              <div styleName="btn">
                {comfirmLoading ? <Button children="购买中" disabled/>:
                <Button children="购买" onClick={this.submitForm} disabled ={(!userInfo.nickName && !this.state.ownerName) || (!userInfo.username && !this.state.ownerPhone)}/>}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default connect(
  state => ({
    data: state.serviceInfo.serviceInfoData,
    loading: state.serviceInfo.loading,
    userInfo: state.app.userInfo,
    comfirmLoading: state.serviceInfo.comfirmLoading,
  }),
  {
    ...serviceInfoActions,
    ...appAction,
    redirect: url => push(url)
  }
)(ServiceInfo)
