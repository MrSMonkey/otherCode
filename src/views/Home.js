import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import { actions as myHouseActions } from '../reducers/myHouse'
import styles from './Home.css'
import HeaderBanner from '../components/HeaderBanner'
import HrTitle from '../components/HrTitle'
import UokoDetailPlant from '../components/UokoDetailPlant'
import Icon from '../components/Icon'
import { SMART_LOCK_LINK } from '../utils/const'

const imgs = {
  homeBg: require('../assets/imgs/home_bg.jpg'),
  lock: require('../assets/imgs/smart_lock.jpg'),
  xingkong: require('../assets/imgs/starhome_xingkong.png'),
  jiameng: require('../assets/imgs/starhome_jiameng.png'),
  youke: require('../assets/imgs/starhome_youke.png'),
  userAvatarDefault: require('../assets/imgs/profileimg.png'),
  yezhu: require('../assets/imgs/starhome_yezhu.png')
}

/**头图 */

const Banner = ({ data, loading, user }) => {
  return (
    <HeaderBanner img={imgs.homeBg}>
      <header styleName="banner">
      </header>
    </HeaderBanner>
  )
}
const StyleBanner = CSSModules(Banner, styles)

/**品牌群 */
const Products = props => {
  const starHomesImg = [
    {
      alt: '星空',
      src: imgs.xingkong
    },
    {
      alt: '星空家盟',
      src: imgs.jiameng
    },
    {
      alt: '星空有客',
      src: imgs.youke
    },
    {
      alt: '星空业主',
      src: imgs.yezhu
    }
  ]
  return (
    <div styleName="star-home">
      {starHomesImg.map((item, index) => {
        return <img src={item.src} alt={item.alt} key={index} />
      })}
    </div>
  )
}
const StyleProducts = CSSModules(Products, styles)

/**智能硬件 */
const SmartLock = () => {
  return (
    <div
      styleName="smart-lock"
      className="bg-img-full"
      style={{ backgroundImage: `url(${imgs.lock})` }}
    >
      <h3>UOKO | 智能门锁</h3>
      <p styleName="lock-dec">
        星空业主尊享
        <span>200元</span>
        优惠
      </p>
      <p styleName="lock-price">
        <i>￥</i>
        1299
        <span>￥1499</span>
      </p>
      <a href={SMART_LOCK_LINK}>
        <button type="button">优惠购买</button>
      </a>
      <p styleName="lock-footer">
        高端精致 | 性能卓越 | 工艺精良 | 安全可靠 | 实用主义
      </p>
    </div>
  )
}
const StyleSmartLock = CSSModules(SmartLock, styles)

@CSSModules(styles)
class Home extends Component {
  render() {
    const { income, incomeLoading, user } = this.props
    return (
      <div>
        <StyleBanner user={user} data={income} loading={incomeLoading} />
        <div styleName="hr-title">
          <HrTitle title="uoko星空产品服务群" data={income} />
        </div>
        <StyleProducts />
        <div styleName="hr-title">
          <HrTitle title="优客逸家" dec="连续4年最具影响力品牌" />
        </div>
        <UokoDetailPlant>
          <a href="tel:10105288">
            <div styleName="call-number">
              <span>1010-5288</span>
              <Icon name="call" width={32} height={41} />
            </div>
          </a>
        </UokoDetailPlant>
        <div styleName="hr-title">
          <HrTitle title="智能硬件" />
        </div>
        <StyleSmartLock />
      </div>
    )
  }
}

export default connect(
  state => ({
    income: state.myHouse.income,
    incomeLoading: state.myHouse.incomeLoading,
    user: state.app.landlordInfo
  }),
  myHouseActions
)(Home)
