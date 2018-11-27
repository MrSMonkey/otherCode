import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './HrTitle.css'

const HrTitle = (props) => (
  <div styleName="hr-title">
    <div styleName="hr-line"></div>
    <h2>
      {props.title}
      <span>{props.dec}</span>
    </h2>
    <div styleName="hr-line"></div>
  </div>
)

export default CSSModules(HrTitle, styles);