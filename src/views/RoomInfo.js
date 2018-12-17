import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { actions as myHouseActions } from '../reducers/myHouse'
import ReactLoading from 'react-loading'
import Tabs from '../components/Tabs'
import styles from './RoomInfo.css'


/**房间列表 */
const RoomList = ({ data = {}, isFull = fasle }) => {
  let toward = '';
  switch (data.toward) {
    case 1:
      toward = '东';
      break;
    case 2:
      toward = '南';
      break;
    case 3:
      toward = '西';
      break;
    case 4:
      toward = '北';
      break;
    case 5:
      toward = '东南';
      break;
    case 6:
      toward = '西北';
      break;
    case 7:
      toward = '东北';
      break;
    case 8:
      toward = '西北';
      break;
    case 9:
      toward = '南北';
      break;
    case 10:
      toward = '东西';
      break;
    case 11:
      toward = '暂无朝向';
      break;
    default:
      break;
  }

  let rentStatus = ''
  switch (data.rentStatus) {
    case 1:
      rentStatus = '待租中';
      break;
    case 2:
      rentStatus = '已出租';
      break;
    case 3:
      rentStatus = '已预订';
      break;
    default:
      break;
  }

  let onOff = '';
  switch (data.onOff) {
    case 1:
      onOff = '已上架';
      break;
    case 2:
      onOff = '已下架';
      break;
    default:
      break;
  }

  return(
    <div>
      <div styleName="room-item">
        <div styleName="item-tit">
          <h2>{data.isFull ? '' : '房间'}{data.roomName || ''}</h2>
          {rentStatus ? <i>{rentStatus}</i> : ''}
          {rentStatus && onOff ? <i>{onOff}</i> : ''}
        </div>
        <p styleName="item-desc">
          {isFull && data.isFull === 0 ? '' : <span>{data.rent || '？'}元/月<i> | </i></span>}
          {data.area || '？'}㎡<i> | </i>{toward}
        </p>
        <p styleName="item-desc">
          房间配置：{data.roomConfigNum || 0} <i></i> {data.publicAreaConfigNum ? `| 公区配置：${data.publicAreaConfigNum}` : ''}
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

    const isFull = roomList && roomList.filter((item) => {
      return item.isFull === 1
    });

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
            : roomList && roomList.map((i, index) => <StyleRoomList data={i} key={index} isFull={isFull.length > 0}/>)
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
