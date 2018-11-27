import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import CSSModules from 'react-css-modules'
import styles from './EntrustPlan.css'
import HeaderBanner from '../components/HeaderBanner'
import HrTitle from '../components/HrTitle'
import Icon from '../components/Icon'
import UokoDetailPlant from '../components/UokoDetailPlant'
import Table from '../components/Table'
import Button from '../components/Button'

const imgs = {
  bg: require('../assets/imgs/plan_banner_bg.jpg'),
  map: require('../assets/imgs/map.png'),
  line: require('../assets/imgs/line.png'),
  brand: require('../assets/imgs/badge_brand.png'),
  quality: require('../assets/imgs/badge_quality.png'),
  rent: require('../assets/imgs/badge_rent.png'),
  tenants: require('../assets/imgs/badge_tenants.png')
}

/**头图 */
const Banner = props => (
  <HeaderBanner img={imgs.bg}>
    <header styleName="header-banner">
      <p>
        我是业主
        <br />
        只想轻松收房租
        <br />
        其他交给星空
        <br />
      </p>
      <img src={imgs.line} alt="" />
    </header>
  </HeaderBanner>
)
const StyleBanner = CSSModules(Banner, styles)

/**步骤 */
const Step = props => {
  const step = [
    {
      name: 'consult',
      text: '咨询'
    },
    {
      name: 'check',
      text: '实勘'
    },
    {
      name: 'edit',
      text: '签约'
    },
    {
      name: 'money',
      text: '收租'
    }
  ]
  return (
    <div styleName="step-plant">
      {step.map((item, index) => {
        return (
          <div key={index}>
            <div styleName="icon-box">
              <Icon name={item.name} width={60} height={60} />
              <p>{item.text}</p>
            </div>
            <div
              styleName="step-line"
              style={{ display: index === 0 ? 'none' : 'block' }}
            />
          </div>
        )
      })}
    </div>
  )
}
const StyleStep = CSSModules(Step, styles)

/**表格 */
const Tables = props => {
  const tables = [
    {
      title: '租前及租中费用承担表',
      data: [
        { name: '装修费用', owner: false, uoko: true },
        { name: '改造费', owner: false, uoko: true },
        { name: '家电采购费', owner: false, uoko: true },
        { name: '软装费', owner: false, uoko: true },
        { name: '招租带看签约服务', owner: false, uoko: true }
      ]
    },
    {
      title: '租后费用承担表',
      data: [
        { name: '物业费', owner: false, uoko: true },
        { name: '水电气', owner: false, uoko: true },
        { name: '保洁', owner: false, uoko: true },
        { name: '非甲方原因维修', owner: false, uoko: true },
        { name: '租客服务', owner: false, uoko: true },
        { name: '招租退租', owner: false, uoko: true }
      ]
    }
  ]
  return (
    <div>
      {tables.map((item, index) => (
        <div styleName="table" key={index}>
          <Table dataSource={item.data} title={item.title} border={true}>
            <Table.Column dataIndex="name" title="" width={300} />
            <Table.Column
              dataIndex="owner"
              title="业主"
              render={val => {
                return <Icon name={val ? 'yes' : 'no'} width={30} height={30} />
              }}
            />
            <Table.Column
              dataIndex="uoko"
              title="优客逸家"
              render={val => {
                return <Icon name={val ? 'yes' : 'no'} width={30} height={30} />
              }}
            />
          </Table>
        </div>
      ))}
    </div>
  )
}
const StyleTables = CSSModules(Tables, styles)

/**badge */
const Badge = props => {
  const badges = [
    {
      img: imgs.brand,
      text: '明星企业',
      text2: '品牌保障'
    },
    {
      img: imgs.rent,
      text: '6年经营',
      text2: '租金保障'
    },
    {
      img: imgs.quality,
      text: '专业团队',
      text2: '品质保障'
    },
    {
      img: imgs.tenants,
      text: '三证合一',
      text2: '租客保障'
    }
  ]
  return (
    <div styleName="bage-plant">
      {badges.map((item, index) => (
        <div styleName="badge-box" key={index}>
          <img src={item.img} alt={item.text} />
          <p>
            {item.text}
            <br />
            {item.text2}
          </p>
        </div>
      ))}
      <div styleName="across-line" />
      <div styleName="vertical-line" />
    </div>
  )
}
const StyleBadge = CSSModules(Badge, styles)

/**badge */
const Info = props => {
  const list = [
    {
      title: '资产管家',
      text: '为您指派专业资产管家，为您提供专业、专属的托管服务'
    },
    {
      title: '专属方案',
      text: '为您提供专属、共赢的房屋托管方案'
    },
    {
      title: '设计装修',
      text: '品质设计、专业装修、美容改造、让您的房屋品相更好、更好出租'
    },
    {
      title: '租客严选',
      text: '三证合一，京东、芝麻信用严选，让您的爱屋拥有最好的租客'
    },
    {
      title: '保洁维修',
      text: '专业维修团队、及时响应、为租客提供更好的租住体验，为爱屋保驾护航'
    }
  ]
  return (
    <div styleName="plant">
      <ul styleName="info-list">
        {list.map((item, index) => (
          <li key={index}>
            <Icon name="icon_point" width={30} height={30} />
            <span>{item.title}</span>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
const StyleInfo = CSSModules(Info, styles)

@CSSModules(styles)
class EntrustPlan extends Component {
  render() {
    const { dispatch } = this.props
    return (
      <div styleName="view">
        <StyleBanner />
        <div styleName="map-img">
          <img src={imgs.map} alt="6年，4城，服务13000个业主，10万租客" />
        </div>
        <div styleName="step-guide">
          <div styleName="hr-title">
            <HrTitle title="把爱屋交给星空只需四步" />
          </div>
          <StyleStep />
        </div>
        <UokoDetailPlant>
          <StyleTables />
          <p styleName="tips">*具体费用以签订合同为准</p>
          <p styleName="footer-text">
            <Icon name="big_tick" width={46} height={46} />
            业主每月轻松收房租
          </p>
        </UokoDetailPlant>
        <div styleName="hr-title-top-60">
          <HrTitle title="星空业主，四大保障" />
        </div>
        <StyleBadge />
        <StyleInfo />

        <footer styleName="footer">
          <div>
            <Button
              type="Default"
              onClick={() => (window.location.href = 'tel:10105288')}
            >
              轻松咨询
            </Button>
          </div>
          <div>
            <Button type="Primary" onClick={() => dispatch(push('/entrust'))}>
              在线委托
            </Button>
          </div>
        </footer>
      </div>
    )
  }
}

export default connect()(EntrustPlan)
