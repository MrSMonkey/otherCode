/*
 * @Description: 全局信息配置文件
 * @Author: chenmo
 * @Date: 2019-02-15 10:52:27
 * @Last Modified by: zhegu
 * @Last Modified time: 2019-03-20 20:42:14
 */


 /* 定义首页星空图片 */
export const START_HOME_IMG: any[] = [
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

 /* 定义购买链接 */
export const SMART_LOCK_LINK: string =
`http://coupon.m.jd.com/coupons/show.action?key=58840135e3f64759b6e648de6c8190d5&roleId=13925125&to=item.jd.com/28149452434.html`;

 /* 定义路由 */
export const componentsList: any[] = [
  {
    path: 'home',
    title: '星空业主服务号'
  },
  {
    path: 'entrustPlan',
    title: '星级房屋托管计划'
  },
  {
    path: 'bind',
    title: '登录'
  },
  {
    path: 'entrust',
    title: '在线委托'
  },
  {
    path: 'perfect',
    title: '完善房源信息'
  },
  {
    path: 'house',
    title: '我的房源列表'
  },
  {
    path: 'myHouse',
    title: '房源详情'
  },
  {
    path: 'serviceOrder',
    title: '服务订单'
  },
  {
    path: 'serviceDetile',
    title: '订单详情'
  },
  {
    path: 'productDetile',
    title: '订单详情'
  },
  {
    path: 'purchase',
    title: '购买服务包'
  },
  {
    path: 'serviceInfo',
    title: '服务包详情'
  },
  {
    path: 'productInfo',
    title: '服务产品详情'
  },
  {
    path: 'serviceType',
    title: '选择服务类型'
  },
  {
    path: 'startService',
    title: '发起服务'
  },
  {
    path: 'choicePlot',
    title: '选择小区'
  },
  {
    path: '404',
    title: '404'
  },
  {
    path: 'maintainChecked',
    title: '确认验收'
  },
  {
    path: 'serviceRecord',
    title: '服务记录'
  },
  {
    path: 'confirmPay',
    title: '确认支付'
  },
  {
    path: 'serviceRecordLook',
    title: '服务记录'
  },
  {
    path: 'serviceOrderDetail',
    title: '服务详情'
  },
  {
    path: 'houseAppraise',
    title: '房屋估价',
    children: [
      {
        path: 'appraiseHouseInfo',
        title: '估价房屋信息'
      }
    ]
  }
];

/* 定义托管类型 */
export const RENT_TYPE: any = {
  0: '未知',
  1: '加盟托管',
  2: '非加盟托管',
  3: '自主管理',
};

/* 定义租赁类型 */
export const RENT_WAY: any = {
  0: '未知',
  1: '整租',
  2: '合租',
};

/* 定义房间朝向 */
export const TOWARDNAME: any = {
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
export const HOUSECONFIG: any = {
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
export const RENT_STATUS: any = {
  1: '待租中',
  2: '已出租',
  3: '已预订'
};

/* 定义服务订单状态 */
export const STATUS_NAME: string[] = ['', '待付款', '待服务' , '服务中', ' 待验收', '已完成待评价', '已完成已评价', '已关闭', ' 待处理', '验收不通过待服务', '尾款待支付', '尾款已支付', '尾款取消'];

/*步骤 */
export const STEP: any[] = [
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

/* 表格 */
export const TABLES: any[] = [
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
];

export const COLUMNS: any[] = [
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


export const BADGES: any[] = [
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
export const LIST: any = [
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
export const HOUSTFLOW: any = [
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
export const TYPELIST: any = [
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
export const TOWARDLIST: any[] = [
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

