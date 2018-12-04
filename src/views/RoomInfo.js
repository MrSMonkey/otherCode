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
    tabsData: []
  }
  componentDidMount() {
    const { match, getRoomList} = this.props
    const id = match.params.id
    getRoomList(id)
    this.setState({
      tabsData: [
        {
          name: 'houseInfo',
          text: '房源信息',
          href: `/houses/${id}`,
          active: false
        }, {
          name: 'roomInfo',
          text: '房间信息',
          href: `/rooms/${id}`,
          active: true
        }, {
          name: 'photo',
          text: '房源照片',
          href: `/house-pic/${id}`,
          active: false
        }
      ]
    })
  }
  render() {
    const {
      roomList,
      redirect,
      roomListLoading
    } = this.props
    const { tabsData } = this.state
    return (
      <div>
        <Tabs data={tabsData} 
          onClick={(data) => {
            if (data.href) { redirect(data.href) }
          }} 
        />
        {
          roomListLoading
            ? <div className="infinte-loader">
              <ReactLoading
              type="bubbles"
              className="inline-block"
              color="#474747"
              />
            </div>
            : <StyleRoomList data={roomList}/>
        }
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
    redirect: url => push(url)
  }
)(RoomInfo)
