import React from 'react'
import CSSModules from 'react-css-modules'
import getAge from '../../utils/computedAge.js'
import style from './RoomCard.css'

const imgs = {
  boy: require('../../assets/imgs/icons/boy.png'),
  girl: require('../../assets/imgs/icons/girl.png'),
  empty: require('../../assets/imgs/icons/empty.png')
}

const formartDate = val => {
  return val ? val.slice(0, 10) : ''
}

const RoomCard = props => {
  const data = props.data
  let headImg = ''
  if (data.Gender === '男') {
    headImg = imgs.boy
  } else if (data.Gender === '女') {
    headImg = imgs.girl
  } else {
    headImg = imgs.empty
  }

  return (
    <div styleName="card">
      <div styleName="card-header">
        <h3>{data.RoomName}</h3>
        <img src={data.Avatar || headImg} alt={data.MainTenantName} />
      </div>
      <div styleName="card-info">
        <p>{data.MainTenantName}</p>
        <p>{data.Gender}</p>
        <p>{data.Birthday ? `${getAge(data.Birthday)}岁` : ''}</p>
        <p style={{ display: data.ContractBeginDate ? 'block' : 'none' }}>
          租期：
          {formartDate(data.ContractBeginDate)}至
          {formartDate(data.ContractEndDate)}
        </p>
        <p>{data.ifrent ? '' : '未出租'}</p>
      </div>
    </div>
  )
}

export default CSSModules(RoomCard, style)

/**
 * gender: 1 男； 0 女
 * name
 * age
 * startDate
 * endDate
 */
