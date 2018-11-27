import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { actions as houseBillsActions } from '../reducers/houseBills'
import { actions as houseListActions } from '../reducers/houseList'
import CSSModules from 'react-css-modules'
import ReactLoading from 'react-loading'
import InfiniteScroll from 'react-infinite-scroller'
import styles from './BillList.css'
import ViewTitle from '../components/ViewTitle'
import Table from '../components/Table'
import api from '../api'

const BillTableTab = props => (
  <div styleName="bill-tabs">
    <span styleName="bill-tab">已收账单</span>
  </div>
)

const StyledBillTableTab = CSSModules(BillTableTab, styles)

@CSSModules(styles)
class HouseBillList extends Component {
  formDate(val) {
    if (val) {
      return val.slice(0, 10)
    } else {
      return ''
    }
  }
  state = { hasMore: true }
  isLoading = false
  componentDidMount() {
    const params = this.props.match.params

    this.props.getHouseList(params.houseId)
  }
  componentWillUnmount() {
    this.props.initHouseListData()
  }
  render() {
    const { hasMore } = this.state
    const params = this.props.match.params
    const {
      houseBillsInfo,
      saveHouseBills,
      houseInfo,
      redirect,
      bills
    } = this.props
    const houseId = this.props.match.params.houseId

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={() => {
          if (this.isLoading) {
            return
          }

          const index = houseBillsInfo.PageIndex
          this.isLoading = true
          api
            .getLandlordHouseBillList({
              houseId: params.houseId,
              page: index ? index + 1 : 1
            })
            .then(({ data }) => {
              let hasMore = data.PageIndex < data.PageAmount
              saveHouseBills(data)
              this.setState({
                hasMore
              })
              this.isLoading = false
            })
            .catch(e => (this.isLoading = false))
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
        <div>
          <ViewTitle
            title={`${houseInfo.CommunityName ||
              '--'} ${houseInfo.HouseNumber || ''}`}
            desc={`${this.formDate(houseInfo.StartDate)} 至 ${this.formDate(
              houseInfo.EndDate
            )}`}
          />
          <div styleName="bills-main">
            <StyledBillTableTab />
            <Table
              dataSource={bills}
              onClick={data => redirect(`/bills/${houseId}/${data.Id}`)}
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
                render={text => {
                  return this.formDate(text)
                }}
              />
            </Table>
            {!this.isLoading && bills.length === 0 ? (
              <div className="background-tips">暂无账单数据</div>
            ) : (
              ''
            )}
          </div>
        </div>
      </InfiniteScroll>
    )
  }
}

export default connect(
  state => ({
    bills: state.houseBills.houseBills.Items || [],
    houseBillsInfo: state.houseBills.houseBills,
    houseInfo: state.houseList.indexHouse
  }),
  {
    ...houseBillsActions,
    ...houseListActions,
    redirect: url => push(url)
  }
)(HouseBillList)
