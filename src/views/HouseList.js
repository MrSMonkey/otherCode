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
        合同周期: {formartDate(data.StartDate)}至{formartDate(data.EndDate)}
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
    return houseList.lenght === 0 ? (
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
