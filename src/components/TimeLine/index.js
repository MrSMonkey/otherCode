import React from 'react'
import CSSModules from 'react-css-modules'
import style from './TimeLine.css'

/**
 * 时间线
 * @param {text: string, time: string} data 
 */

const Index = ({ data = [] }) => {
  return(
    <ul styleName="time-line">
    {
      data && data.map((item, index) => {
        return(
          <li key={index}>
            <div styleName="dot"></div>
            <p>{item.content}</p>
            <span>{item.createTime}</span>
          </li>
        )
      })
    }
    </ul>
  )
}
const TimeLine = CSSModules(Index, style)

export default TimeLine