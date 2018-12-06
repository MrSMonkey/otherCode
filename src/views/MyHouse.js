import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { actions as myHouseActions } from '../reducers/myHouse'
import ReactLoading from 'react-loading'
import Tabs from '../components/Tabs'
import TimeLine from '../components/TimeLine'
import styles from './MyHouse.css'

/**房源基本信息 */
const BsaeInfo = ({data = {}}) => {
  return (
    <div>
      <div styleName="base-info">
        <div styleName="block">
          <span>门牌号</span>
          <p>{data.building || ' '}栋{data.unit || ' '}单元{data.number || ' '}室</p>
        </div>
        <div styleName="block">
          <span>运营类型</span>
          <p>{data.consociationTypeName}</p>
        </div>
      </div>

      <div styleName="detail-info">
        <div styleName="block">
          <label>小区名称：</label>
          <span>{data.communityName}</span>
        </div>
        <div styleName="block-secondary">
          <label>楼<span styleName="space-2"/>层：</label>
          <span>{data.floorNum}/{data.floorTotality}层</span>
        </div>
        <div styleName="block">
          <label>原始户型：</label>
          <span>{data.initRoomNum}室{data.initHallNum}厅{data.initToiletNum}卫</span>
        </div>
        <div styleName="block-secondary">
          <label>朝<span styleName="space-2"/>向：</label>
          <span>{data.towardName}</span>
        </div>
        <div styleName="block">
          <label>面<span styleName="space-2"/>积：</label>
          <span>{data.buildAcreage}㎡</span>
        </div>
        <div styleName="block-secondary">
          <label>改造户型：</label>
          <span>{data.roomNum}间</span>
        </div>
        <div>
          <label>房东姓名：</label>
          <span>{data.ownerName}</span>
        </div>
        <div>
          <label>房东电话：</label>
          <span>{data.ownerPhone}</span>
        </div>
        <div>
          <label>备<span styleName="space-2"/>注：</label>
          <span>{data.remark}</span>
        </div>
      </div>
    </div>
  )
}
const StyleBsaeInfo = CSSModules(BsaeInfo, styles)

/**房源动态 */
const HouseStatus = ({data}) => {
  return(
    <div styleName="house-status">
      <div styleName="info-header">房源动态</div>
      <div styleName="info-content">
        <TimeLine data={data}/>
      </div>
    </div>
  )
}
const StyleHouseStatus = CSSModules(HouseStatus, styles)


@CSSModules(styles)
class MyHouses extends Component {
  state = {
    tabsData: [{
      name: 'houseInfo',
      text: '房源信息',
      href: `/parthner/houses/`,
      active: true
    }, {
      name: 'roomInfo',
      text: '房间信息',
      href: `/parthner/rooms/`,
      active: false
    }, {
      name: 'photo',
      text: '房源照片',
      href: `/parthner/house-pic/`,
      active: false
    }]
  }
  componentDidMount() {
    const { match, getHouseInfo, gethouseTimeLine } = this.props
    const id = match.params.id
    getHouseInfo(id)
    gethouseTimeLine(id)
    this.setState({
      tabsData: [
        {
          name: 'houseInfo',
          text: '房源信息',
          href: `/parthner/houses/${id}`,
          active: true
        }, {
          name: 'roomInfo',
          text: '房间信息',
          href: `/parthner/rooms/${id}`,
          active: false
        }, {
          name: 'photo',
          text: '房源照片',
          href: `/parthner/house-pic/${id}`,
          active: false
        }
      ]
    })
  }
  render() {
    const { redirect, houseInfo, timeLines, isHouseListLoading } = this.props
    const { tabsData } = this.state
    return (
      <div>
        <Tabs data={tabsData} 
          houseInfo={houseInfo} 
          onClick={(data) => {
            if (data.href) { redirect(data.href) }
          }} 
        />
        {
          isHouseListLoading
            ? <div className="infinte-loader">
              <ReactLoading
                type="bubbles"
                className="inline-block"
                color="#474747"
              />
          </div>
            : <div>
              <StyleBsaeInfo data={houseInfo}/>
              <StyleHouseStatus data={timeLines}/>
            </div>
        }
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
)(MyHouses)
