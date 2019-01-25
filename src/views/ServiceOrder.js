import React, { Component, PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { actions as serviceOrderActions } from '../reducers/serviceOrder'
import ReactLoading from 'react-loading'
import styles from './ServiceOrder.css'
import Icon from '../components/Icon'

const noSearch = require('../assets/imgs/no_search.png');

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
                <span>服务包名称：{item && item.servicePackageName}</span>
              </div>
            </div>
            <div styleName="serviceOrder-main">
              {item && item.serviceItems && item.serviceItems.length >0 && item.serviceItems.map((ctx, idx) => {
                return (
                  <div styleName='serviceOrder-item' key={idx}>
                    <span>产品名称：{ctx.serviceName}</span>
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
      }): <div></div>}
    </div>
  )
}
const StyleBsaeInfo = CSSModules(BsaeInfo, styles)

const NoOrderList = () => {
  return (
    <div styleName="background-tips">
      <img src={noSearch}/>
      <p>
        未找到订单
      </p>
    </div>
  )
}
const StylesNoOrderList = CSSModules(NoOrderList, styles)
@CSSModules(styles)
class ServiceOrder extends Component {
  state = {
    
  }
  componentDidMount() {
    this.props.getServiceOrderList()
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }
  render() {
    const { redirect, serviceList, loading } = this.props
    return (
      <div >
        {loading ? <div className="infinte-loader">
              <ReactLoading
              type="bubbles"
              className="inline-block"
              color="#474747"
              />
            </div>:<div>
            {serviceList && serviceList.length > 0 ? <StyleBsaeInfo data={serviceList && serviceList || []} redirect={redirect}/> : <StylesNoOrderList />}
              </div>}
      </div>
    )
  }
}

export default connect(
  state => ({
    serviceList: state.serviceOrder.serviceList || [],
    loading: state.serviceOrder.loading
  }),
  {
    ...serviceOrderActions,
    redirect: url => push(url)
  }
)(ServiceOrder)
