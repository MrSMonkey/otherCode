import React, { Component, PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { actions as myHouseActions } from '../reducers/myHouse'
import { actions as modalAction } from '../reducers/modal'
import ReactLoading from 'react-loading'
import styles from './ServiceOrderDetile.css'
import Icon from '../components/Icon'
const imgs = {
  noHouse: require('../assets/imgs/banner.jpg')
}
const iconRight = require('../assets/imgs/icons/icon_right.png')
/**基本信息 */
const BsaeInfo = ({data = [], redirect}) => {
  return (
    <div>
      
    </div>
  )
}
const StyleBsaeInfo = CSSModules(BsaeInfo, styles)



@CSSModules(styles)
class ServiceOrderDetile extends Component {
  state = {
    tabsData: [{
      id: '1',
      name: 'houseInfo',
      text: '带看签约服务',
      href: `/houses/`,
      active: true
    }, {
      name: 'roomInfo',
      text: '装修服务',
      href: `/rooms/`,
      active: false
    }, {
      name: 'roomInfo',
      text: '保洁服务',
      href: `/rooms/`,
      active: false
    }, {
      name: 'photo',
      text: '维修服务',
      href: `/house-pic/`,
      active: false
    },
    {
      name: 'photo',
      text: '房屋写真服务',
      href: `/house-pic/`,
      active: false
    },
    {
      name: 'photo',
      text: '租住服务',
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
          id: '1111111',
          time: '2018-12-14 18:56:31',
          price: '1024',
          orderNo: 'SN1804193709900001',
          product: [
            {
              name: '英明商家都会买的服务包',
              type: '1',
              typeName: '待服务'
            },
            {
              name: '英明商家都会买的服务包',
              type: '2',
              typeName: '服务中'
            },
            {
              name: '英明商家都会买的服务包',
              type: '3',
              typeName: '已关闭'
            }
          ],
          title: '中粮香榭丽都-1栋1单元201号',
          name: '英明商家都会买的服务包',
        }, {
          id: '222222',
          time: '2018-12-14 18:56:31',
          price: '1024',
          orderNo: 'SN1804193709900001',
          product: [
            {
              name: '英明商家都会买的服务包',
              type: '1',
              typeName: '待服务'
            },
            {
              name: '英明商家都会买的服务包',
              type: '2',
              typeName: '服务中'
            },
            {
              name: '英明商家都会买的服务包',
              type: '3',
              typeName: '已关闭'
            }
          ],
          title: '中粮香榭丽都-1栋1单元201号',
          name: '英明商家都会买的服务包',
        }
      ]
    })
  }
  render() {
    const { redirect, houseInfo, timeLines, isHouseListLoading, } = this.props
    const { data } = this.state
    return (
      <div >
        <div styleName="ServiceOrderDetile">
          <div styleName="ServiceOrderInfo">
            <h2>服务包订单信息</h2>
            <div styleName='serviceName'>
              <span>服务包名称：英明房东都会选择的服务包</span>
            </div>
            <div styleName='serviceName'>
              <span>服务包订单号：SN1804193708800001</span>
            </div>
            <div styleName='serviceName'>
              <span>下单时间：2018-12-14 18:56:31</span>
            </div>
            <div styleName='serviceName'>
              <span>实付款：1024元</span>
            </div>
          </div>
          <div styleName="ServiceOrderInfo">
            <h2>服务包订单细项</h2>
            <div styleName="ServiceOrderType">
              <div styleName='serviceOrder-item'>
                <span>订单号：SN18121900282G62S</span>
                <div styleName='serviceOrder-item-type'>待服务</div>
              </div>
              <div styleName='serviceOrder-item'>
                <span>产品类型：带看</span>
              </div>
              <div styleName='serviceOrder-item'>
                <span>产品名称：光速带看出租</span>
              </div>
            </div>
            <div styleName="ServiceOrderType">
              <div styleName='serviceOrder-item'>
                <span>订单号：SN18121900282G62S</span>
                <div styleName='serviceOrder-item-type'>待服务</div>
              </div>
              <div styleName='serviceOrder-item'>
                <span>产品类型：带看</span>
              </div>
              <div styleName='serviceOrder-item'>
                <span>产品名称：光速带看出租</span>
              </div>
            </div>
            <div styleName="ServiceOrderType">
              <div styleName='serviceOrder-item'>
                <span>订单号：SN18121900282G62S</span>
                <div styleName='serviceOrder-item-type'>待服务</div>
              </div>
              <div styleName='serviceOrder-item'>
                <span>产品类型：带看</span>
              </div>
              <div styleName='serviceOrder-item'>
                <span>产品名称：光速带看出租</span>
              </div>
            </div>
          </div>
          <div styleName="ServiceOrderInfo">
            <h2>其他信息</h2>
            <div styleName='serviceName'>
              <span>服务房源：中粮香榭丽都-1栋1单元201号</span>
            </div>
            <div styleName='serviceName'>
              <span>联系人：王大锤</span>
            </div>
            <div styleName='serviceName'>
              <span>联系电话：19802910100</span>
            </div>
            <div styleName='block'>
              <span>备      注:</span>
              <p>不晓得好多字，反正如果字太多就换行呀反正如果字太多就换行呀反正如果字太多就换行呀反正如果字太多就换行呀反正如果字太多就换行呀</p>
            </div>
          </div>
        </div>
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
)(ServiceOrderDetile)
