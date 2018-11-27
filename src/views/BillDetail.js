import React, { Component } from 'react'
/* import CSSModules from 'react-css-modules' */
import { connect } from 'react-redux'
import { actions as billActions } from '../reducers/bill'
import { actions as houseListActions } from '../reducers/houseList'
import InfoSection from '../components/InfoSection'
import { InfoSectionItem } from '../components/InfoSection'

class BillDetail extends Component {   
  formartDate(val) {
    return val ? val.slice(0, 10) : ''
  }
  componentDidMount() {
    const params = this.props.match.params
    this.props.getHouseList(params.houseId)
    this.props.getBillInfo(params.billId)
  }
  render() {
    const { billInfo, indexHouse } = this.props
    return (
      <div>
        <InfoSection title="房源信息">
          <InfoSectionItem label="房源信息">
            {indexHouse.CommunityName} {indexHouse.HouseNumber}
          </InfoSectionItem>
        </InfoSection>

        <InfoSection title="账单概况">
          <InfoSectionItem label="账单名称">
            {billInfo.BatchTitle}
          </InfoSectionItem>
          <InfoSectionItem label="实收金额">
            {billInfo.AmountPaid}元
          </InfoSectionItem>
          <InfoSectionItem label="实收日期">
            {this.formartDate(billInfo.LastPayTime)}
          </InfoSectionItem>
        </InfoSection>

        <InfoSection title="账单明细">
          {billInfo.DetailList &&
            billInfo.DetailList.map(item => (
              <div key={item.CategoryCode}>
                <InfoSectionItem label="账单项目">
                  {item.CategoryName}
                </InfoSectionItem>
                <InfoSectionItem label="实收金额">
                  {item.AmountPaid} 元
                </InfoSectionItem>
                <InfoSectionItem label="账单周期">
                  {this.formartDate(item.BillCycleStart)} 至{' '}
                  {this.formartDate(item.BillCycleEnd)}
                </InfoSectionItem>
              </div>
            ))}
        </InfoSection>
      </div>
    )
  }
}

export default connect(
  state => ({
    billInfo: state.bill.billInfo,
    indexHouse: state.houseList.indexHouse
  }),
  {
    ...billActions,
    ...houseListActions
  }
)(BillDetail)
