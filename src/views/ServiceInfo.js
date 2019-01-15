import React, { Component, PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { actions as myHouseActions } from '../reducers/myHouse'
import { actions as modalAction } from '../reducers/modal'
import ReactLoading from 'react-loading'
import styles from './ServiceInfo.css'
import Button from '@/components/Button'
import Modal from '../components/Modal'
import StyledViewImg from '@/components/ViewImg';
import Form, { FormItem, Input, Select, Textarea } from '../components/Form'
import { addClass, hasClass, removeClass } from '../utils'

const imgs = {
  noHouse: require('../assets/imgs/banner.jpg')
}


let imgArray = [
	'http://i3.17173cdn.com/2fhnvk/YWxqaGBf/cms3/tUcIQCbjFFjdgfr.jpg',
	'http://i3.17173cdn.com/2fhnvk/YWxqaGBf/cms3/tUcIQCbjFFjdgfr.jpg',
	'http://i3.17173cdn.com/2fhnvk/YWxqaGBf/cms3/tUcIQCbjFFjdgfr.jpg',
	'http://n.sinaimg.cn/games/transform/20160722/6sHg-fxuhukz0771063.jpg',
  'http://n.sinaimg.cn/games/transform/20160722/6sHg-fxuhukz0771063.jpg',
  'http://n.sinaimg.cn/games/transform/20160722/6sHg-fxuhukz0771063.jpg',
  'http://n.sinaimg.cn/games/transform/20160722/6sHg-fxuhukz0771063.jpg',
]
/**基本信息 */
const BsaeInfo = ({data = [], redirect}) => {
  console.log(data)
  return (
    <div>
      
    </div>
  )
}
const StyleBsaeInfo = CSSModules(BsaeInfo, styles)

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
  }
  componentDidMount() {
    const { match, getHouseInfo, gethouseTimeLine } = this.props
    const id = match.params.id
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    getHouseInfo(id)
    gethouseTimeLine(id)
    this.setState({
      data: [
        {
          price: '1000',
          title: '英明房东都会选择的服务包如果呀字太多请换行哈哈哈哈',
          img: imgs.noHouse,
        }, {
          price: '1200',
          title: '英明房东都会选择的服务包如果呀字太多请换行哈哈哈哈',
          img: imgs.noHouse,
        }, {
          price: '800',
          title: '英明房东都会选择的服务包如果呀字太多请换行哈哈哈哈',
          img: imgs.noHouse,
        }
      ]
    })
  }
  turnPopLayer = () => {
    // console.log(hasClass(document.documentElement, 'poplayer-show'))
    const val = hasClass(document.documentElement, 'poplayer-show');
    const { showModle } = this.props;
    if(val) {
      removeClass(document.documentElement, 'poplayer-show');
    } else {
      addClass(document.documentElement, 'poplayer-show');
    }
    showModle();
  }
  render() {
    // const { redirect, houseInfo, timeLines, isHouseListLoading, } = this.props
    const { isShow, titleArr, activeStatus } = this.state
    return (
      <div >
        <div styleName="serviceinfo">
          <h2 styleName="serviceinfo-title">英明房东都会选择的服务包</h2>
          <div styleName="block">
            <span>产品单价：</span>
            <p>999.00元</p>
          </div>
          <div styleName="block">
            <span>服务产品：</span>
            <p>带看/光速出租</p>
            <p>保洁/开荒保洁100平以上</p>
            <p>装修/龙鼎装饰优客标准装100平</p>
          </div>
          <div styleName="block">
            <span>产品描述：</span>
            <p>坑你没商量，买带看送保洁装修坑你没商量，买带看送保洁装修</p>
          </div>
          <div styleName="block">
            <span>产品图片：</span>
            <p>&emsp;</p>
          </div>
          <div styleName="block">
            
          </div>
        </div>
        <StyledViewImg images={imgArray}/>
        <div styleName="service-footer">
          <Button onClick={this.turnPopLayer}>立即购买</Button>
        </div>
        <Modal>
        <PurchaseModal 
          close={(val) => {
          this.turnPopLayer()
          }}
        />
        </Modal>
      </div>
    )
  }
}

export default connect(
  state => ({
    houseInfo: state.myHouse.houseInfo,
    roomList: state.myHouse.roomList,
    isHouseListLoading: state.houseList.isHouseListLoading,
    timeLines: state.myHouse.timeLines
  }),
  {
    ...myHouseActions,
    ...modalAction,
    redirect: url => push(url)
  }
)(ServiceInfo)
