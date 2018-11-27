import React from 'react'
import Icon from './Icon'

// 返回上一页
const closePage = () => {
  window.history.go(-1) // 返回上一页并刷新
}

export default props => (
  <header className="wallet-header">
    <div className="wallet-header-left" onClick={() => closePage()}><Icon name="clear_x"/></div>
    <div className="wallet-header-center">{props.children}</div>
    <div className="wallet-header-right">{props.right}</div>
  </header>
)
