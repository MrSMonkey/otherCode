import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import CSSModules from 'react-css-modules'
import ReactLoading from 'react-loading'
import { actions as houseListActions } from '../reducers/houseList'
import styles from './HouseList.css'
import { localStore } from '@/utils'

const imgs = {
  noHouse: require('../assets/imgs/illustration_blank.png')
}

const HouseItem = ({ data, redirect }) => {
  const formartDate = val => {
    return val ? val.slice(0, 10) : ''
  }
  /**托管类型 */
  let rentType = ''
  switch (data.consociationType) {
    case 1:
      rentType = '直租';
      break;
    case 2:
      rentType = '直管加盟';
      break;
    case 3:
      rentType = '纯托管';
      break;
    case 4:
      rentType = '未知';
      break;
    default:
      rentType = '';
      break;
  }
  /**租赁类型 */
  let rentWay = ''
  switch(data.rentWay) {
    case 1:
      rentWay = '整租';
      break;
    case 2:
      rentWay = '合租';
      break;
    default:
      rentWay = '';
      break;
  }

  return (
    <div styleName="house-item"
      onClick={() => {
        if (data.handleStatus === 1) { return }
        redirect(`/houses/${data.houseId}`)
      }}>
      <h2 styleName="item-tit">
        {data.communityName}
        &nbsp;
        {
          data.handleStatus === 1 
            ? ''
            : `${data.building || ''}栋${data.unit || ' '}单元${data.floorNum || ' '}楼${data.number || ' '}号` 
        }
      </h2>
      <p styleName="item-desc">
        {
          data.handleStatus === 1
            ? `提交成功，请保持手机畅通，资产管家将尽快与您联系，您也可以直接拨打电话：${data.contact} 进行咨询`
            : `${rentType} | ${rentWay} | ${data.rentRoom ? '待租中' : `${data.roomTotal}个房间 ${data.rentRoom}个已出租`}`
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
      <div styleName="background-tips">
        <img src={imgs.noHouse}/>
        <p>
          您尚未提交意向资源，您可以
          <span onClick={() => redirect(`/entrust`)}>立即增加</span>
        </p>
      </div>
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
