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
const BsaeInfo = ({data, redirect}) => {
  const statusName = ['', '待付款', '待服务' , '服务中', ' 待验收', '待评价', '已评价', '已关闭', ' 待处理', '验收不通过']
  const arr = [data && data[0], data && data[1], data && data[2], data && data[3], data && data[4]]
  return (
    <div>
      {arr && arr.length> 0 ? arr.map((item, index) => {
        return (
          <div styleName="serviceOrder" key={index}>
            <div styleName="serviceOrder-title-box">
              <div styleName='serviceOrder-title'><Icon name="icon_order" /><span>{item && item.houseName}</span></div>
              <div styleName='serviceOrder-no'>
                <span>服务包订单号：{item && item.servicePackageOrderNo}</span>
                <div onClick={()=>{redirect(`serviceDetile/${item.servicePackageId}`)}}><Icon name="icon_arrow"/></div>
              </div>
              <div styleName='serviceName'>
                <span>服务包名称：{item && item.name}</span>
              </div>
            </div>
            <div styleName="serviceOrder-main">
              {item && item.serviceItems && item.serviceItems.length >0 && item.serviceItems.map((ctx, idx) => {
                return (
                  <div styleName='serviceOrder-item' key={idx}>
                    <span>产品名称：{ctx.serviceTypeName}</span>
                    <div styleName={ctx.status === '7' ? 'serviceOrder-item-close': 'serviceOrder-item-type'}>
                    {statusName[ctx.status]}
                    </div>
                  </div>
                )
              })}
            </div>
            <div styleName="serviceOrder-footer">
              <span styleName="serviceOrder-footer-time">{item && item.createTime}</span>
              <div styleName="serviceOrder-footer-money">实付款：<span>{item && item.price}</span>元</div>
            </div>
          </div>
        )
      }): <div>1111</div>}
    </div>
  )
}
const StyleBsaeInfo = CSSModules(BsaeInfo, styles)



@CSSModules(styles)
class ServiceOrder extends Component {
  state = {
    
  }
  componentDidMount() {
    this.props.getServiceOrderList()
    document.documentElement.scrollTop = document.body.scrollTop = 0;
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
    return (
      <div >
        {serviceList && serviceList.length > 0 ? <StyleBsaeInfo data={serviceList && serviceList || []} redirect={redirect}/> : null}
        
      </div>
    )
  }
}

export default connect(
  state => ({
    serviceList: state.serviceOrder.serviceList || [],
  }),
  {
    ...serviceOrderActions,
    redirect: url => push(url)
  }
)(ServiceOrder)
