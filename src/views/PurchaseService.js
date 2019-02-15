import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { actions as myPurchaseActions } from '../reducers/purchase'
import ReactLoading from 'react-loading'
import styles from './PurchaseService.css'
import {getQueryString} from '../utils'
const imgs = {
  default: require('../assets/imgs/noimg.png')
}
/**基本信息 */
const BsaeInfo = ({data = [], redirect, entrustId}) => {
  // console.log(data)
  return (
    <div>
      {data && data.map((item, index) => {
        return (
          <div styleName="purchase" key={index} onClick={()=> {redirect(`/serviceInfo/${item.serviceId}/${entrustId}`)}}>
            <div styleName="purchase-left">
              <img src={item.imgUrls && item.imgUrls.length > 0 ? item.imgUrls[0]: imgs.default}/>
            </div>
            <p  styleName="purchase-title">{item.serviceName}</p>
            <p styleName="purchase-money"><span>{item.price}</span>元</p>
          </div>
        )
      })}
    </div>
  )
}
const StyleBsaeInfo = CSSModules(BsaeInfo, styles)

@CSSModules(styles)
class PurchaseService extends Component {
  state = {
  }
  componentDidMount() {
    const id = this.props.match.params.cityId
    this.props.getServiceList(id)
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }
  render() {
    const { redirect, Loading, serviceList } = this.props
    return (
      <div>
        {Loading ? <div className="infinte-loader">
              <ReactLoading
                type="bubbles"
                className="inline-block"
                color="#474747"
              />
          </div>: <StyleBsaeInfo data={serviceList} redirect={redirect} entrustId={this.props.match.params.entrustId}/>}
      </div>
    )
  }
}

export default connect(
  state => ({
    serviceList: state.purchase.serviceList,
    Loading: state.purchase.Loading,
  }),
  {
    ...myPurchaseActions,
    redirect: url => push(url)
  }
)(PurchaseService)
