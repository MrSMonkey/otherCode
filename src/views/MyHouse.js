import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { actions as myHouseActions } from '../reducers/myHouse'
import { actions as houseListActions } from '../reducers/houseList'
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
          <p>21栋1单元1101室</p>
        </div>
        <div styleName="block">
          <span>运营类型</span>
          <p>直租</p>
        </div>
      </div>

      <div styleName="detail-info">
        <div styleName="block">
          <label>小区名称：</label>
          <span>中粮香颂丽都</span>
        </div>
        <div styleName="block-secondary">
          <label>楼<span styleName="space-2"/>层：</label>
          <span>5/24层</span>
        </div>
        <div styleName="block">
          <label>原始户型：</label>
          <span>3室2厅2卫</span>
        </div>
        <div styleName="block-secondary">
          <label>朝<span styleName="space-2"/>向：</label>
          <span>东南</span>
        </div>
        <div styleName="block">
          <label>面<span styleName="space-2"/>积：</label>
          <span>180.66㎡</span>
        </div>
        <div styleName="block-secondary">
          <label>改造户型：</label>
          <span>㎡</span>
        </div>
        <div>
          <label>房东姓名：</label>
          <span>王大锤</span>
        </div>
        <div>
          <label>房东电话：</label>
          <span>17745454545</span>
        </div>
        <div>
          <label>备<span styleName="space-2"/>注：</label>
          <span>备注备注备注备注文案占位用生命占位备注备注备注备注文案占位用生命占位备注备注备注备注文案占位用生命占位备注备注备注备注文案占位用生命占位</span>
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
    tabsData: [
      {
        name: 'bill',
        text: '房源信息',
        herf: '/',
        active: true
      }, {
        name: 'contract',
        text: '房源合同',
        herf: '/',
        active: false
      }, {
        name: 'photo',
        text: '房源照片',
        herf: '/',
        active: false
      }
    ],
    timeLines: [{
      text: '完成带看一次，客户未签约',
      time: '2019-04-19 17:01:38'
    }, {
      text: '上架推广',
      time: '2019-01-19 17:01:38'
    }, {
      text: '提交意向房源',
      time: '2019-01-19 17:01:38'
    }]
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
      roomList,
      income,
      redirect,
      indexHouse,
      incomeLoading,
      roomListLoading
    } = this.props
    const { tabsData, timeLines } = this.state
    return (
      <div>
        <Tabs data={tabsData} houseInfo={indexHouse} redirect={redirect} />
        {indexHouse.id ? (
          <div className="infinte-loader">
            <ReactLoading
              type="bubbles"
              className="inline-block"
              color="#474747"
            />
          </div>
        ) : (
          <div>
            <StyleBsaeInfo data={indexHouse}/>
            <StyleHouseStatus data={timeLines}/>
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
