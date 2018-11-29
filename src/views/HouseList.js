import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import CSSModules from 'react-css-modules'
import ReactLoading from 'react-loading'
import { actions as houseListActions } from '../reducers/houseList'
import styles from './HouseList.css'

const HouseItem = ({ data, redirect }) => {
  const formartDate = val => {
    return val ? val.slice(0, 10) : ''
  }
  return (
    <div
      styleName="house-item"
      onClick={() => redirect(`/houses/${data.HouseId}`)}
    >
      <h2 styleName="item-tit">
        {data.CommunityName}
        &nbsp;
        {data.HouseNumber}
      </h2>
      <p styleName="item-desc">
      {
        data.isRegister
          ? '纯托管 | 整租 | 待租中' 
          : '提交成功，请保持手机畅通，资产管家将尽快与您联系，您也可以直接拨打电话：18301347349 进行咨询'
      }
      </p>
    </div>
  )
}

@CSSModules(styles)
class HouseList extends Component {
  componentDidMount() {
    this.props.getHouseList()
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
      houseList.map(h => (
        <StyledHouseItem key={h.HouseId} redirect={redirect} data={h} />
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
