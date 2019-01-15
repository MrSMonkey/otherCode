import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { actions as myHouseActions } from '../reducers/myHouse'
import ReactLoading from 'react-loading'
import styles from './PurchaseService.css'

const imgs = {
  noHouse: require('../assets/imgs/banner.jpg')
}
/**基本信息 */
const BsaeInfo = ({data = [], redirect}) => {
  console.log(data)
  return (
    <div>
      {data && data.map((item, index) => {
        return (
          <div styleName="purchase" key={index} onClick={()=> {redirect(`/serviceInfo/${item.id}`)}}>
            <div styleName="purchase-left">
              <img src={item.img}/>
            </div>
            <p  styleName="purchase-title">{item.title}</p>
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
          id:'1',
          price: '1000',
          title: '英明房东都会选择的服务包如果呀字太多请换行哈哈哈哈',
          img: imgs.noHouse,
        }, {
          id:'2',
          price: '1200',
          title: '英明房东都会选择的服务包如果呀字太多请换行哈哈哈哈',
          img: imgs.noHouse,
        }, {
          id:'3',
          price: '800',
          title: '英明房东都会选择的服务包如果呀字太多请换行哈哈哈哈',
          img: imgs.noHouse,
        }
      ]
    })
  }
  render() {
    const { redirect, houseInfo, timeLines, isHouseListLoading, } = this.props
    const { data, titleArr, activeStatus } = this.state
    return (
      <div>
        <StyleBsaeInfo data={data} redirect={redirect}/>
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
    redirect: url => push(url)
  }
)(PurchaseService)
