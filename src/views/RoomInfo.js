import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { actions as myHouseActions } from '../reducers/myHouse'
import { actions as houseListActions } from '../reducers/houseList'
import ReactLoading from 'react-loading'
import Tabs from '../components/Tabs'
import styles from './RoomInfo.css'


/**房间列表 */
const RoomList = ({ data = {} }) => {
  return(
    <div>
      <div styleName="room-item">
        <div styleName="item-tit">
          <h2>房间A</h2>
          <i>待租中</i>
          <i>已上架</i>
        </div>
        <p styleName="item-desc">
          ？元/月 <i>|</i> ？㎡ <i>|</i> 南
        </p>
        <p styleName="item-desc">
          房间配置：3 <i>|</i> 公区配置：7
        </p>
      </div>
    </div>
  )
}

const StyleRoomList = CSSModules(RoomList, styles)


@CSSModules(styles)
class RoomInfo extends Component {
  state = {
  }
  componentDidMount() {
    const { match, getHouseList, getRoomList, getHouseIncome } = this.props
    const id = match.params.id
    getHouseList(id)
    getRoomList(id)
    getHouseIncome(id)
  }
  render() {
    const {
      tabsData,
      redirect,
      indexHouse
    } = this.props
    const { timeLines } = this.state
    return (
      <div>
        <Tabs data={tabsData} 
          houseInfo={indexHouse} 
          onClick={(data) => {
            console.log('~~~~~~~',data)
            if (data.href) { redirect(data.href) }
          }} 
        />
        {indexHouse.id ? (
          <div className="infinte-loader">
            <ReactLoading
              type="bubbles"
              className="inline-block"
              color="#474747"
            />
          </div>
        ) : (
          <StyleRoomList/>
        )}
      </div>
    )
  }
}

export default connect(
  state => ({
    landlordId: state.myHouse.landlordId,
    indexHouse: state.houseList.indexHouse,
    roomList: state.myHouse.roomList,
    roomListLoading: state.myHouse.roomListLoading,
    income: state.myHouse.houseIncome,
    incomeLoading: state.myHouse.incomeLoading,
    isHouseListLoading: state.houseList.isHouseListLoading,
    tabsData: state.myHouse.tabsData
  }),
  {
    ...myHouseActions,
    ...houseListActions,
    redirect: url => push(url)
  }
)(RoomInfo)
