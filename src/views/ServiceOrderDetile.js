import React, { Component, PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { actions as serviceOrderDetileActions } from '../reducers/serviceOrderDetile'
import { actions as modalAction } from '../reducers/modal'
import ReactLoading from 'react-loading'
import styles from './ServiceOrderDetile.css'

const statusName = ['', '待付款', '待服务' , '服务中', ' 待验收', '待评价', '已评价', '已关闭', ' 待处理', '验收不通过']


@CSSModules(styles)
class ServiceOrderDetile extends Component {
  state = {
  }
  componentDidMount() {
    const { match, getServiceOrderList, } = this.props
    const id = match.params.id
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    getServiceOrderList(id)
   
  }
  render() {
    const { data, loading } = this.props;
    return (
      <div >
        {loading ? <div className="infinte-loader">
              <ReactLoading
                type="bubbles"
                className="inline-block"
                color="#474747"
              />
          </div>: <div styleName="ServiceOrderDetile">
          <div styleName="ServiceOrderInfo">
            <h2>服务包订单信息</h2>
            <div styleName='serviceName'>
              <span>服务包名称：{data && data.servicePackage || '无'}</span>
            </div>
            <div styleName='serviceName'>
              <span>服务包订单号：{data && data.servicePackageOrderNo || '无'}</span>
            </div>
            <div styleName='serviceName'>
              <span>下单时间：{data && data.createTime|| '无'}</span>
            </div>
            <div styleName='serviceName'>
              <span>实付款：{data && data.price || 0}元</span>
            </div>
          </div>
          <div styleName="ServiceOrderInfo">
            <h2>服务包订单细项</h2>
            {data && data.serviceItems && data.serviceItems.map((item, idx) => {
              return(
                <div styleName="ServiceOrderType" key={idx}>
                  <div styleName='serviceOrder-item'>
                    <span>订单号：{item.orderNo || '无'}</span>
                    <div styleName='serviceOrder-item-type'>{statusName[item.status]}</div>
                  </div>
                  <div styleName='serviceOrder-item'>
                    <span>产品类型：{item.serviceType || '无'}</span>
                  </div>
                  <div styleName='serviceOrder-item'>
                    <span>产品名称：{item.serviceName || '无'}</span>
                  </div>
                </div>
              )
            })}
            {/* <div styleName="ServiceOrderType">
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
            </div> */}
          </div>
          <div styleName="ServiceOrderInfo">
            <h2>其他信息</h2>
            <div styleName='serviceName'>
              <span>服务房源：{data && data.serviceHouseName || '无'}</span>
            </div>
            <div styleName='serviceName'>
              <span>联系人：{data && data.houseContact || '无'}</span>
            </div>
            <div styleName='serviceName'>
              <span>联系电话：{data && data.houseContactPhone || '无'}</span>
            </div>
            <div styleName='block'>
              <span>备      注:</span>
              <p>{data && data.remark || '无'}</p>
            </div>
          </div>
        </div>}
        
      </div>
    )
  }
}

export default connect(
  state => ({
    data: state.serviceOrderDetile.data,
    loading: state.serviceOrderDetile.loading,
  }),
  {
    ...serviceOrderDetileActions,
    ...modalAction,
    redirect: url => push(url)
  }
)(ServiceOrderDetile)
