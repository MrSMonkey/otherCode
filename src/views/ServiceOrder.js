import React, { Component, PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { actions as serviceOrderActions } from '../reducers/serviceOrder'
import ReactLoading from 'react-loading'
import styles from './ServiceOrder.css'
import Icon from '../components/Icon'


/**基本信息 */
const BsaeInfo = ({data = [], redirect}) => {
  return (
    <div>
      {data && data.map((item, index) => {
        return (
          <div styleName="serviceOrder" key={index}>
            <div styleName="serviceOrder-title-box">
              <div styleName='serviceOrder-title'><Icon name="icon_order" /><span>{item.title}</span></div>
              <div styleName='serviceOrder-no'>
                <span>服务包订单号：{item.orderNo}</span>
                <div onClick={()=>{redirect(`serviceDetile/${item.id}`)}}><Icon name="icon_arrow"/></div>
              </div>
              <div styleName='serviceName'>
                <span>服务包名称：{item.name}</span>
              </div>
            </div>
            <div styleName="serviceOrder-main">
              {data && item.product.map((ctx, idx) => {
                return (
                  <div styleName='serviceOrder-item' key={idx}>
                    <span>产品名称：{ctx.name}</span>
                    <div styleName={ctx.type === '3' ? 'serviceOrder-item-close': 'serviceOrder-item-type'}>{ctx.typeName}</div>
                  </div>
                )
              })}
            </div>
            <div styleName="serviceOrder-footer">
              <span styleName="serviceOrder-footer-time">{item.time}</span>
              <div styleName="serviceOrder-footer-money">实付款：<span>{item.price}</span>元</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
const StyleBsaeInfo = CSSModules(BsaeInfo, styles)



@CSSModules(styles)
class ServiceOrder extends Component {
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
    const { match, getServiceList } = this.props
    const id = match.params.id
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    getServiceList(id)
    this.setState({
      data: [
        {
          id: '111111111',
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
          id: '2222222',
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
    const { redirect, serviceList } = this.props
    console.log(this.props)
    const { data } = this.state
    return (
      <div >
        <StyleBsaeInfo data={data} redirect={redirect}/>
      </div>
    )
  }
}

export default connect(
  state => ({
    serviceList: state.serviceOrder.serviceList,
  }),
  {
    ...serviceOrderActions,
    redirect: url => push(url)
  }
)(ServiceOrder)
