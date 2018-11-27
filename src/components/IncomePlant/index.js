import React from 'react'
import CSSModules from 'react-css-modules'
import style from './IncomePlant.css'

const IncomePlant = (props) => {
  return (
    <div styleName="plant">
      <p styleName="title">{props.title}</p>
      <p styleName="price">￥{props.loading ? '--' : props.income}</p>
    </div>
  )
}

export default CSSModules(IncomePlant, style);