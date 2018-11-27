import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import { actions as myHouseActions } from '../reducers/myHouse'
import { actions as billListAction } from '../reducers/billList'
import styles from './BillList.css'
import ReactLoading from 'react-loading'
import Table from '../components/Table'
import api from '../api'

const BillBrief = props => (
  <div styleName="bill-brief">
    <div styleName="brief-desc">
      {props.HouseCount}
      套房屋，累计收入
    </div>
    <div styleName="brief-num">¥{props.TotalAmount}</div>
  </div>
)

const BillTableTab = props => (
  <div styleName="bill-tabs">
    <span styleName="bill-tab">已收账单</span>
  </div>
)

const StyledBillBrief = CSSModules(BillBrief, styles)
const StyledBillTableTab = CSSModules(BillTableTab, styles)

@CSSModules(styles)
class BillList extends Component {
  componentDidMount() {
    // this.props.getMyBills()
    this.props.getIncome()
  }
  state = { hasMore: true }
  isLoading = false
  render() {
    const { hasMore } = this.state
    const { bills, phone, income, redirect, saveMyBills } = this.props
    const billsItems = bills.Items || []

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          if (this.isLoading) {
            return
          }

          const index = bills.PageIndex

          this.isLoading = true
          api
            .getLandlordBillListByPhone({
              phone: phone,
              page: index ? index + 1 : 1
            })
            .then(({ data }) => {
              let hasMore = data.PageIndex < data.PageAmount
              saveMyBills(data)
              this.isLoading = false
              this.setState({
                hasMore
              })
            })
            .catch(e => {
              console.log(e)
              this.isLoading = false
            })
        }}
        hasMore={hasMore}
        loader={
          <div className="infinte-loader" key="0.1">
            <ReactLoading
              type="bubbles"
              className="inline-block"
              color="#474747"
            />
          </div>
        }
        useWindow={false}
      >
        <React.Fragment>
          <StyledBillBrief {...income} />
          <div styleName="bills-main">
            <StyledBillTableTab />
            <Table
              dataSource={billsItems}
              onClick={data => redirect(`/bills/${data.HouseId}/${data.Id}`)}
            >
              <Table.Column dataIndex="BatchTitle" title="账单名称" />
              <Table.Column
                dataIndex="AmountPaid"
                title="实收款"
                render={text => `¥${text}`}
              />
              <Table.Column
                dataIndex="LastPayTime"
                title="实收款日期"
                render={text => text.replace('T', ' ').slice(0, 10)}
              />
            </Table>
            {!this.isLoading && billsItems.length === 0 ? (
              <div className="background-tips">暂无账单数据</div>
            ) : (
              ''
            )}
          </div>
        </React.Fragment>
      </InfiniteScroll>
    )
  }
}

export default connect(
  state => ({
    bills: state.billList.bills,
    income: state.myHouse.income,
    phone: state.app.landlordInfo.Phone
  }),
  {
    ...billListAction,
    ...myHouseActions,
    redirect: url => push(url)
  }
)(BillList)
