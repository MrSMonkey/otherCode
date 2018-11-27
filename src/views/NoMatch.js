import React from 'react'
import { Link } from 'react-router-dom'

const NoMatch = () => (
  <div className="no-match-page">
    <h1>404</h1>
    <p>您迷路了</p>

    <div className="btn-box">
      <Link className="inline-btn" to="/">
        返回首页
      </Link>
    </div>
  </div>
)

export default NoMatch
