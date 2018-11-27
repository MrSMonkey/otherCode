/* eg. */
const APP_TYPE = {
  wechat: 'wechat',
  weibo: 'weibo',
  qq: 'qq',
  unknown: 'unknown'
}

const APP_DEVICE = {
  android: 'android',
  ios: 'ios',
  unknown: 'unknown'
}

const APP_ENV = {
  development: 'development',
  production: 'production'
}

const SMART_LOCK_LINK =
  'http://coupon.m.jd.com/coupons/show.action?key=58840135e3f64759b6e648de6c8190d5&roleId=13925125&to=item.jd.com/28149452434.html'

const BUSSINESS_CARD_STATIC = [
  {
    src: require('../assets/imgs/bussiness_card/card_1.jpg'),
    title: '名片1'
  },
  {
    src: require('../assets/imgs/bussiness_card/card_2.jpg'),
    title: '名片2'
  },
  {
    src: require('../assets/imgs/bussiness_card/card_3.jpg'),
    title: '名片3'
  },
  {
    src: require('../assets/imgs/bussiness_card/card_4.jpg'),
    title: '名片4'
  },
  {
    src: require('../assets/imgs/bussiness_card/card_5.jpg'),
    title: '名片5'
  },
  {
    src: require('../assets/imgs/bussiness_card/card_6.jpg'),
    title: '名片6'
  }
]

const FORTUNE_SHARE_DATA = {
  title:'星空财神',
  link:`${window.location.protocol}//${window.location.host}/fortune`,
  desc:'财富自由第一定律,财神星马上告诉您',
  imgUrl:'http://ooydngjcf.bkt.clouddn.com/WaterElectricGas.22AF1BA1.wechat_img_left.png'
}

export { APP_TYPE, APP_DEVICE, APP_ENV, BUSSINESS_CARD_STATIC, SMART_LOCK_LINK ,FORTUNE_SHARE_DATA}
