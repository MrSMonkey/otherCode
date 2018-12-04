import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import CSSModules from 'react-css-modules'
import ReactLoading from 'react-loading'
import { actions as houseListActions } from '../reducers/houseList'
import styles from './HouseList.css'
import { localStore } from '@/utils'

const HouseItem = ({ data, redirect }) => {
  const formartDate = val => {
    return val ? val.slice(0, 10) : ''
  }
  const rentType = () => {
    switch (data.rentType) {
      case 1:
        return '直租';
      case 1:
        return '直管加盟';
      case 1:
        return '纯托管';
      case 1:
        return '未知';
      default:
        return '';
    }
  }

  const rentWay = data.rentWay === 1 ? '整租' : '合租'
  return (
    <div
      styleName="house-item"
      onClick={() => {
        if (data.houseId) { redirect(`/houses/${data.houseId}`) }
      }}>
      <h2 styleName="item-tit">
        {data.communityName}
        &nbsp;
        {data.houseId ? `${data.building}栋${data.houseId}单元${floorNum}楼${number}号` : ''}
      </h2>
      <p styleName="item-desc">
      {
        data.houseId
          ? `${rentType} | ${rentWay} | ${data.rentRoom ? '待租中' : `${data.roomTotal}个房间 ${data.rentRoom}个已出租`}`
          : '提交成功，请保持手机畅通，资产管家将尽快与您联系，您也可以直接拨打电话：18301347349 进行咨询'
      }
      </p>
    </div>
  )
}

@CSSModules(styles)
class HouseList extends Component {
  componentDidMount() {
    const accessToken = localStore.get('access_token')
    const refreshToken = localStore.get('refresh_token')
    // console.log(accessToken);
    this.props.getHouseList(accessToken)
  }
  render() {
    const { houseList, styles, redirect, isHouseListLoading } = this.props
    const StyledHouseItem = CSSModules(HouseItem, styles)
    if (isHouseListLoading) {
      return (
        <div className="infinte-loader">
          <ReactLoading
            type="bubbles"
            className="inline-block"
            color="#474747"
          />
        </div>
      )
    }
    return houseList.length === 0 ? (
      <div className="background-tips">暂无房源数据</div>
    ) : (
      houseList.map((h, index) => (
        <StyledHouseItem key={index} redirect={redirect} data={h} />
      ))
    )
  }
}

export default connect(
  state => ({
    houseList: state.houseList.data,
    isHouseListLoading: state.houseList.isHouseListLoading
  }),
  {
    ...houseListActions,
    redirect: url => push(url)
  }
)(HouseList)
