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

const CONSOCIATIONTYPENAME = {
  1: '星空家盟直租',
  2: '优客逸家加盟',
  3: '优客逸家自营',
  4: '星空家盟加盟'
}

// const
const TOWARDNAME = {
  "1": "东",
  "2": "南",
  "3": "西",
  "4": "北",
  "5": "东南",
  "6": "西南",
  "7": "东北",
  "8": "西北",
  "9": "南北",
  "10": "东西"
}

const HOUSECONFIG = {
  "1": "床",
  "2": "衣柜",
  "3": "书桌",
  "4": "椅子",
  "5": "空调",
  "6": "电视",
  "7": "阳台",
  "8": "独卫"
}
export { APP_TYPE, APP_DEVICE, APP_ENV, BUSSINESS_CARD_STATIC, SMART_LOCK_LINK ,FORTUNE_SHARE_DATA, CONSOCIATIONTYPENAME, TOWARDNAME, HOUSECONFIG}
