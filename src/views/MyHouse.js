import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { actions as myHouseActions } from '../reducers/myHouse'
import { actions as houseListActions } from '../reducers/houseList'
import ReactLoading from 'react-loading'
import HeaderBanner from '../components/HeaderBanner'
import Icon from '../components/Icon'
import IncomePlant from '../components/IncomePlant'
import RoomCard from '../components/RoomCard'
import styles from './MyHouse.css'

const imgs = {
  banner: require('../assets/imgs/banner.jpg')
}

const formartDate = val => {
  return val ? val.slice(0, 10) : ''
}

/**banner */
const Banner = ({ data, loading }) => {
  return (
    <HeaderBanner img={imgs.banner}>
      <header styleName="banner-box">
        <p styleName="banner-title">
          {data.CommunityName
            ? `${data.CommunityName} ${data.HouseNumber}`
            : '--'}
        </p>
        <p styleName="banner-dec">
          合同周期：
          {formartDate(data.StartDate)}至{formartDate(data.EndDate)}
        </p>
      </header>
    </HeaderBanner>
  )
}
const StyleBanner = CSSModules(Banner, styles)

/**icon button */
const IconGroup = ({ houseInfo, redirect }) => {
  const iconBtn = [
    {
      name: 'bill',
      text: '房源账单',
      href: `/house-bills/${houseInfo.HouseId}/${houseInfo.ContractId}`
    },
    {
      name: 'contract',
      text: '房源合同',
      href: `/contract/${houseInfo.ContractId}`
    },
    {
      name: 'photo',
      text: '房源照片',
      href: `/house-pic/${houseInfo.HouseId}/${houseInfo.ContractId}`
    }
  ]
  return (
    <div styleName="icon-plant">
      {iconBtn.map((item, index) => {
        return (
          <div
            styleName="icon-box"
            key={index}
            onClick={() => {
              if (item.href) {
                redirect(item.href)
              }
            }}
          >
            <Icon name={item.name} width={120} height={120} />
            <p>{item.text}</p>
          </div>
        )
      })}
    </div>
  )
}
const StyleIconGroup = CSSModules(IconGroup, styles)

@CSSModules(styles)
class MyHouses extends Component {
  componentDidMount() {
    const { match, getHouseList, getRoomList, getHouseIncome } = this.props
    const id = match.params.id
    getHouseList(id)
    getRoomList(id)
    getHouseIncome(id)
  }
  render() {
    const {
      roomList,
      income,
      redirect,
      indexHouse,
      incomeLoading,
      roomListLoading
    } = this.props
    return (
      <div>
        <StyleBanner data={indexHouse} />
        <StyleIconGroup houseInfo={indexHouse} redirect={redirect} />
        <IncomePlant
          title="房源累计收入"
          income={income.TotalAmount.toFixed(2)}
          loading={incomeLoading}
        />
        {roomListLoading ? (
          <div className="infinte-loader">
            <ReactLoading
              type="bubbles"
              className="inline-block"
              color="#474747"
            />
          </div>
        ) : (
          <div styleName="room-block" className="bg-color-white">
            {roomList.map((item, index) => (
              <RoomCard data={item} key={index} />
            ))}
            <div className="background-tips">
              {roomList.lenght === 0 ? '暂无房间' : ''}
            </div>
          </div>
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
    isHouseListLoading: state.houseList.isHouseListLoading
  }),
  {
    ...myHouseActions,
    ...houseListActions,
    redirect: url => push(url)
  }
)(MyHouses)
