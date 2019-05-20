/*
 * @Description: 全局信息配置文件
 * @Author: chenmo
 * @Date: 2019-02-15 10:52:27
 * @Last Modified by: linyu
 * @Last Modified time: 2019-05-17 16:48:15
 */

import * as confInterface from '@/interface/configInterface';

 /* 定义首页星空图片 */
export const START_HOME_IMG: confInterface.StartHomeImgInterface[] = [
  {
    alt: '星空',
    src: require('../assets/images/starhome01.png')
  },
  {
    alt: '星空家盟',
    src: require('../assets/images/starhome02.png')
  },
  {
    alt: '星空有客',
    src: require('../assets/images/starhome03.png')
  },
  {
    alt: '星空业主',
    src: require('../assets/images/starhome04.png')
  }
];

/* 定义我的名片列表图片 */
export const START_MYCARD_IMG: confInterface.StartHomeImgInterface[] = [
  {
    alt: '名片1',
    src: require('../assets/images/card_1.jpg')
  },
  {
    alt: '名片2',
    src: require('../assets/images/card_2.jpg')
  },
  {
    alt: '名片3',
    src: require('../assets/images/card_3.jpg')
  },
  {
    alt: '名片4',
    src: require('../assets/images/card_4.jpg')
  },
  {
    alt: '名片5',
    src: require('../assets/images/card_5.jpg')
  },
  {
    alt: '名片6',
    src: require('../assets/images/card_6.jpg')
  },
];

 /* 定义购买链接 */
export const SMART_LOCK_LINK: string =
`http://coupon.m.jd.com/coupons/show.action?key=58840135e3f64759b6e648de6c8190d5&roleId=13925125&to=item.jd.com/28149452434.html`;

/* 定义托管类型 */
export const RENT_TYPE: confInterface.EnumInterface = {
  0: '未知',
  1: '加盟托管',
  2: '非加盟托管',
  3: '自主管理',
  4: '优客自营',
};

/* 定义租赁类型 */
export const RENT_WAY: confInterface.EnumInterface = {
  0: '未知',
  1: '整租',
  2: '合租',
};

/* 定义房间朝向 */
export const TOWARDNAME: confInterface.EnumInterface = {
  1: '东',
  2: '南',
  3: '西',
  4: '北',
  5: '东南',
  6: '西南',
  7: '东北',
  8: '西北',
  9: '南北',
  10: '东西'
};

/* 定义房间配置 */
export const HOUSECONFIG: confInterface.EnumInterface = {
  1: '床',
  2: '衣柜',
  3: '书桌',
  4: '椅子',
  5: '空调',
  6: '电视',
  7: '阳台',
  8: '独卫'
};

/* 定义租赁信息服务商title */
export const ZCFU: any = {
  ZC: '资产管家',
  FW: '服务商'
};

/* 定义房间状态 */
export const RENT_STATUS: confInterface.EnumInterface = {
  1: '待租中',
  2: '已出租',
  3: '已预订'
};

/* 定义服务订单状态 */
export const STATUS_NAME: string[] = ['', '待付款', '待服务' , '服务中', ' 待验收', '已完成待评价', '已完成已评价', '已关闭', ' 待处理', '验收不通过待服务', '尾款待支付', '尾款已支付', '尾款取消'];

/* 步骤 */
export const STEP: confInterface.StepInterface = [
  {
    src: require('../assets/images/icon/consult.png'),
    text: '咨询'
  },
  {
    src: require('../assets/images/icon/check.png'),
    text: '实勘'
  },
  {
    src: require('../assets/images/icon/edit.png'),
    text: '签约'
  },
  {
    src: require('../assets/images/icon/money.png'),
    text: '收租'
  }
];

/* 加盟托管表格 */
export const JMTG_TABLES: any = [
  {
    data: [
      [{text: '合作方式', rowspan: 2}, '方式一', '方式二'],
      ['租金保底', '租金分成']
    ]
  },
  {
    title: '加盟优客逸家，出租快，租金高',
    data: [
      ['装修标准', {text: '优客逸家提供租金溢价最高的装修方案及装修标准', rowspan: 4}],
      ['改造标准'],
      ['家电配置标准'],
      ['软装标准']
    ],
    extra: true
  },
  {
    title: '托管给星空，业主省心，更放心',
    data: [
      ['房屋写真', {text: '全部托管，业主很省心', rowspan: 9}],
      ['租客审核'],
      ['带看签约'],
      ['费用催缴'],
      ['专人管家'],
      ['定期保洁'],
      ['24小时维修'],
      ['租后服务'],
      ['退租服务']
    ]
  }
];

/* 租务托管表格 */
export const ZWTG_TABLES: any = [
  {
    data: [
      [{text: '合作方式', rowspan: 2}, '方式一', '方式二'],
      ['租金保底', '租金分成']
    ]
  },
  {
    title: '什么样的装修能出租最快？租金最高？',
    data: [
      ['改造费', {text: '优客逸家提供租金溢价最高的装修方案及装修标准', rowspan: 2}],
      ['家电增配费']
    ],
    extra: true
  },
  {
    title: '托管给星空，业主省心，更放心',
    data: [
      ['房屋写真', {text: '全部托管，业主很省心', rowspan: 9}],
      ['租客审核'],
      ['带看签约'],
      ['费用催缴'],
      ['专人管家'],
      ['定期保洁'],
      ['24小时维修'],
      ['租后服务'],
      ['退租服务']
    ]
  }
];

/* 自主管理表格 */
export const ZZGL_TABLES: any = [
  {
    title: '平台保障业主权益',
    data: [
      ['一件招租', {text: '在线一键采购，业主更安心', rowspan: 11}],
      ['一键带看'],
      ['一键拍照'],
      ['一键装修'],
      ['一键装配'],
      ['一键保洁'],
      ['一键维修'],
      ['一键跑腿'],
      ['一键搬家'],
      ['一键贷款'],
      ['一键采购智能门锁']
    ]
  }
];

/* 加盟托管服务介绍 */
export const JMTG_DESC: any = {
  title: '加盟托管',
  titleDesc: '加盟优客逸家 托管全部租务',
  questions: [
    {
      question: 'Q：什么房屋适合加盟托管？',
      answer: 'A：毛坯房、简单装修房'
    },
    {
      question: 'Q：什么业主适合加盟托管？',
      answer: 'A：房源自持几年后售卖增值，平常无暇打理，但希望有租金收入'
    }
  ],
  linkText: '加盟品牌：优客逸家'
};

/* 租务托管服务介绍 */
export const ZWTG_DESC: any = {
  title: '租务托管',
  titleDesc: '保持房屋原貌 托管全服务',
  questions: [
    {
      question: 'Q：什么房屋适合租务托管？',
      answer: 'A：已装修房'
    },
    {
      question: 'Q：什么业主适合租务托管？',
      answer: 'A：已自费装修房屋，但无暇打理繁杂租务'
    }
  ],
  linkText: '托管品牌：星空好房'
};

/* 自主管理服务介绍 */
export const ZZGL_DESC: any = {
  title: '自主管理',
  titleDesc: '业主自己当房东 按需轻松采集服务',
  questions: [
    {
      question: 'Q：什么房屋适合自主管理？',
      answer: 'A：北京、成都、武汉、杭州所有类型房屋'
    },
    {
      question: 'Q：什么业主适合自主管理？',
      answer: 'A：有时间有精力，通过采购服务，可随时应对租客的各种难题'
    }
  ]
};

export const COLUMNS: confInterface.ColumnsInterface = [
  {
    dataIndex: 'name',
    title: '',
  },
  {
    dataIndex: 'owner',
    title: '业主'
  },
  {
    dataIndex: 'uoko',
    title: '优客逸家'
  },
];


export const BADGES: confInterface.BadgesInterface = [
  {
    img: require('../assets/images/badge_brand.png'),
    text: '明星企业',
    dec: '品牌保障'
  },
  {
    img: require('../assets/images/rent.png'),
    text: '6年经营',
    dec: '租金保障'
  },
  {
    img: require('../assets/images/baozhang.png'),
    text: '专业团队',
    dec: '品质保障'
  },
  {
    img: require('../assets/images/rent_people.png'),
    text: '三证合一',
    dec: '租客保障'
  }
];

/* 资产列表*/
export const LIST: confInterface.ListInterface = [
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
];

/* 定义线上提交流程*/
export const HOUSTFLOW: confInterface.HoustFlowInterface = [
  {
    img: require('../assets/images/icon_submit.png'),
    text: '线上提交',
  },
  {
    img: require('../assets/images/icon_tel.png'),
    text: '电话核检',
  },
  {
    img: require('../assets/images/icon_sale.png'),
    text: '房源上架'
  }
];

/* 定义线上运营类型*/
export const TYPELIST: confInterface.TypeListInterface = [
  {
    value: 1,
    text: '加盟托管',
  },
  {
    value: 2,
    text: '非加盟托管',
  },
  {
    value: 3,
    text: '自主管理'
  }
];

/* 定义房间朝向枚举 */
export const TOWARDLIST: confInterface.TowardListInterface = [
  {
    text: '东',
    value: '1'
  },
  {
    text: '南',
    value: '2'
  },
  {
    text: '西',
    value: '3'
  },
  {
    text: '北',
    value: '4'
  },
  {
    text: '东南',
    value: '5'
  },
  {
    text: '西南',
    value: '6'
  },
  {
    text: '东北',
    value: '7'
  },
  {
    text: '西北',
    value: '8'
  },
  {
    text: '南北',
    value: '9'
  },
  {
    text: '东西',
    value: '10'
  }
];

// 装修购买提示
export const TIPSONE: string = `注：本次支付仅支付上门检测费，具体维修项费用需在确认维修后支付！`;

// 维修购买提示
export const TIPSTWO: string = `注：本次支付仅支付装修设计费，装修工程费用需在确认装修后支付！`;


// 百度地图ak
export const BAIDU_AK: string = `e0dzZmaImw9rUXxWyPBGgs78ZXoAfwhS`;

/* 运行环境. */
export const APP_TYPE: confInterface.AppType = {
  wechat: 'wechat',
  weibo: 'weibo',
  qq: 'qq',
  unknown: 'unknown'
};

// 设备系统
export const APP_DEVICE: confInterface.AppDevice = {
  android: 'android',
  ios: 'ios',
  unknown: 'unknown'
};

// 微信分享接口
export const SHARE_API_LIST: string[] = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'];

// 微信分享内容
export const FORTUNE_SHARE_DATA: confInterface.ShareData = {
  title: '星空财神',
  link: `${window.location.protocol}//${window.location.host}/fortune`,
  desc: '财富自由第一定律,财神星马上告诉您',
  imgUrl: 'http://ooydngjcf.bkt.clouddn.com/WaterElectricGas.22AF1BA1.wechat_img_left.png'
};

// 不需要带token的
export const NOT_TOKEN_URL: string[] = [
  '/auth/asset/register_login/web/mobile2wechat',
  '/verification_code',
  '/partner/star/owner/config/get_config',
  '/partner/star/owner/config/get_token',
  '/partner/star/owner/config/get_jssdk_config',
  '/partner/star/owner/config/check_token',
  '/partner/star/owner/config/get_wechat_user_info',
  '/partner/star/owner/config/get_xiaoneng_config',
  'price/facing/pricing/community',
  'price/facing/pricing/house/valuation_id',
  'netflow/client/netflow_trace'
];
