import React, { Component } from 'react'
import { connect } from 'react-redux'
// import CSSModules from 'react-css-modules'
import { actions as houseContract } from '../reducers/houseContract'
import ReactLoading from 'react-loading'
import InfoSection, { InfoSectionItem } from '../components/InfoSection'
import ViewTitle from '../components/ViewTitle'

class HouseContract extends Component {
  formDate(val) {
    return val ? val.slice(0, 10) : ''
  }
  componentDidMount() {
    const params = this.props.match.params
    this.props.getHousecontract(params.contractId)
  }
  render() {
    const { contractInfo, contractInfoLoading } = this.props
    if (contractInfoLoading) {
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
    return (
      <div>
        <ViewTitle
          title={contractInfo.HouseDesc}
          desc={`${this.formDate(contractInfo.StartDate)} 至 ${this.formDate(
            contractInfo.EndDate
          )}`}
        />

        <InfoSection title="房东基础信息">
          <InfoSectionItem label="房东姓名">
            {contractInfo.LandlordInfo.LandlordName}
          </InfoSectionItem>
          <InfoSectionItem label="联系电话">
            {contractInfo.LandlordInfo.Mobile}
          </InfoSectionItem>
          <InfoSectionItem label="房东邮箱">
            {contractInfo.LandlordInfo.LandlordEmail}
          </InfoSectionItem>
          <InfoSectionItem label="身份证号">
            {contractInfo.LandlordInfo.IdcNum}
          </InfoSectionItem>
          <InfoSectionItem label="房源编号">
            {contractInfo.HouseAlias}
          </InfoSectionItem>
          <InfoSectionItem label="房源地址">
            {contractInfo.HouseDesc}
          </InfoSectionItem>
          <InfoSectionItem label="通讯地址">
            {contractInfo.LandlordInfo.Address}
          </InfoSectionItem>
          <InfoSectionItem label="紧急联系人名称">
            {contractInfo.LandlordInfo.EmergencyPersonName}
          </InfoSectionItem>
          <InfoSectionItem label="紧急联系人电话">
            {contractInfo.LandlordInfo.EmergencyPersonPhone}
          </InfoSectionItem>
          <InfoSectionItem label="共有产权">
            {contractInfo.PropertyShare ? '是' : '否'}
          </InfoSectionItem>
          <InfoSectionItem label="有无代理人">
            {contractInfo.LandlordInfo.IsAgent ? '有' : '无'}
          </InfoSectionItem>
        </InfoSection>
        {contractInfo.PropertyShare ? <InfoSection title="共有产权人信息">
          <InfoSectionItem label="房东姓名">
            {contractInfo.PropertyInfo.Name}
          </InfoSectionItem>
          <InfoSectionItem label="联系电话">
            {contractInfo.PropertyInfo.Phone}
          </InfoSectionItem>
          <InfoSectionItem label="身份证号">
            {contractInfo.PropertyInfo.IDCNum}
          </InfoSectionItem>
          <InfoSectionItem label="通讯地址">
            {contractInfo.PropertyInfo.Address}
          </InfoSectionItem>
        </InfoSection>: null}
        {contractInfo.LandlordInfo.IsAgent ? <InfoSection title="代理人信息">
          <InfoSectionItem label="代理人姓名">
            {contractInfo.LandlordInfo.AgentName}
          </InfoSectionItem>
          <InfoSectionItem label="联系电话">
            {contractInfo.LandlordInfo.AgentPMoblie}
          </InfoSectionItem>
          <InfoSectionItem label="代理人邮箱">
            {contractInfo.LandlordInfo.AgentEmail}
          </InfoSectionItem>
          <InfoSectionItem label="身份证号">
            {contractInfo.LandlordInfo.AgentIdCard}
          </InfoSectionItem>
          <InfoSectionItem label="通讯地址">
            {contractInfo.LandlordInfo.AgentAddress}
          </InfoSectionItem>
        </InfoSection>: null}
        <InfoSection title="房源信息">
          <InfoSectionItem label="房源户型">
            {contractInfo.InitRoomNum}室{contractInfo.HallNum}厅
            {contractInfo.ToileNum}卫{contractInfo.BuildAcreage}
            m²
          </InfoSectionItem>
          <InfoSectionItem label="证件类型">
            {contractInfo.PropertyRightDes}
          </InfoSectionItem>
          <InfoSectionItem label="证件编号">
            {contractInfo.PropertyRightCode}
          </InfoSectionItem>
          <InfoSectionItem label="产权地址">
            {contractInfo.PropertyAddress}
          </InfoSectionItem>
          <InfoSectionItem label="抵押情况">
            {contractInfo.IsMortgage ? '有抵押' : '无抵押'}
          </InfoSectionItem>
        </InfoSection>

        <InfoSection title="付款规则">
          <InfoSectionItem label="交付日期">
            {this.formDate(contractInfo.StartDate)}
          </InfoSectionItem>
          <InfoSectionItem label="装修期">
            {contractInfo.DecorationDay} 天
          </InfoSectionItem>
          <InfoSectionItem label="房东产品">
            {contractInfo.LandlordProductName}
          </InfoSectionItem>
          <InfoSectionItem label="计租期">
            {contractInfo.RentalPeriod} 月
          </InfoSectionItem>
          <InfoSectionItem label="支付周期">
            {contractInfo.PayModeDes}
          </InfoSectionItem>
          <InfoSectionItem label="空置期">
            满 {contractInfo.RentalMonths} 计租月，空置期{' '}
            {contractInfo.VacantMonths} 月
          </InfoSectionItem>
          <InfoSectionItem label="空置总月数">
            {contractInfo.VacantTotal}
          </InfoSectionItem>
          <InfoSectionItem label="支付金额">
            <ul>
              {contractInfo.ContractTimeRangeList &&
                contractInfo.ContractTimeRangeList.map(item => (
                  <li key={item.Id}>
                    第 {item.StartYear} 年至第 {item.EndYear} 年&nbsp;
                    {item.Rent && `保底 ${item.Rent} 元/月`}
                    {item.SplitPaymentRate &&
                      `分账比例 ${item.SplitPaymentRate} %`}
                  </li>
                ))}
            </ul>
          </InfoSectionItem>
          <InfoSectionItem label="押金">
            {contractInfo.Deposit} 元
          </InfoSectionItem>
          <InfoSectionItem label="首次付款日期">
            {this.formDate(contractInfo.FirstPaymentDate)}
          </InfoSectionItem>
          <InfoSectionItem label="合同起始日期">
            {this.formDate(contractInfo.StartDate)} 至{' '}
            {this.formDate(contractInfo.EndDate)}
          </InfoSectionItem>
        </InfoSection>

        <InfoSection title="支付账户">
          <InfoSectionItem label="开户银行">
            {contractInfo.BankName}
          </InfoSectionItem>
          <InfoSectionItem label="开户银行支行">
            {contractInfo.BankBranch}
          </InfoSectionItem>
          <InfoSectionItem label="开户人姓名">
            {contractInfo.Receivables}
          </InfoSectionItem>
          <InfoSectionItem label="银行卡号">
            {contractInfo.Account}
          </InfoSectionItem>
        </InfoSection>
      </div>
    )
  }
}

export default connect(
  state => state.houseContract,
  houseContract
)(HouseContract)
