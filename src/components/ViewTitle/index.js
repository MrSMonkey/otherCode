import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './ViewTitle.css'

const ViewTitle = ({ title, desc }) => (
  <div styleName="view-title">
    <h1 styleName="tit">{title}</h1>
    <p styleName="desc">{desc}</p>
  </div>
)

const StyledViewTitle = CSSModules(ViewTitle, styles)

export default StyledViewTitle
