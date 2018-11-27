import React from 'react'

export default props => (
  <header className="app-header">
    <div className="app-header-left">{props.left}</div>
    <div className="app-header-center">{props.children}</div>
    <div className="app-header-right">{props.right}</div>
  </header>
)
